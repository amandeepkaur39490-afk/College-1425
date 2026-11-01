<?php
/**
 * Admin Course Management (Add, Edit, Delete CRUD)
 * Shaheed Darshan Singh Pheruman Memorial College
 */
require_once __DIR__ . '/header.php';

$successMsg = '';
$errorMsg = '';
$action = $_GET['action'] ?? 'list';
$editId = (int)($_GET['id'] ?? 0);

// Load all departments for dropdown selection
try {
    $dStmt = $pdo->query("SELECT id, name FROM departments ORDER BY name ASC");
    $departments = $dStmt->fetchAll();
} catch (Exception $e) {
    $departments = [];
}

// Handle Delete Course
if ($action === 'delete' && $editId > 0) {
    try {
        $delStmt = $pdo->prepare("DELETE FROM courses WHERE id = :id");
        $delStmt->execute([':id' => $editId]);
        $successMsg = "Course record deleted successfully from database.";
        $action = 'list';
    } catch (Exception $e) {
        $errorMsg = "Unable to delete course. It may be referenced by existing student records.";
        $action = 'list';
    }
}

// Handle Add or Edit Course Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $courseName = trim($_POST['course_name'] ?? '');
    $courseCode = trim($_POST['course_code'] ?? '');
    $departmentId = !empty($_POST['department_id']) ? (int)$_POST['department_id'] : null;
    $duration = trim($_POST['duration'] ?? '');
    $eligibility = trim($_POST['eligibility'] ?? '');
    $seats = (int)($_POST['seats'] ?? 60);
    $annualFee = (float)($_POST['annual_fee'] ?? 0.00);
    $description = trim($_POST['description'] ?? '');

    if (empty($courseName) || empty($courseCode) || empty($duration) || empty($eligibility)) {
        $errorMsg = "Please fill in all required course fields.";
    } else {
        if (!empty($_POST['course_id'])) {
            // Update Existing Course
            $cId = (int)$_POST['course_id'];
            try {
                $upStmt = $pdo->prepare("UPDATE courses SET course_name = :name, course_code = :code, department_id = :dept_id, duration = :duration, eligibility = :eligibility, seats = :seats, annual_fee = :fee, description = :desc WHERE id = :id");
                $upStmt->execute([
                    ':name' => $courseName,
                    ':code' => $courseCode,
                    ':dept_id' => $departmentId,
                    ':duration' => $duration,
                    ':eligibility' => $eligibility,
                    ':seats' => $seats,
                    ':fee' => $annualFee,
                    ':desc' => $description,
                    ':id' => $cId
                ]);
                $successMsg = "Course details updated successfully. Changes are now live on public website.";
                $action = 'list';
            } catch (Exception $e) {
                $errorMsg = "Error updating course: " . htmlspecialchars($e->getMessage());
            }
        } else {
            // Add New Course
            try {
                $insStmt = $pdo->prepare("INSERT INTO courses (course_name, course_code, department_id, duration, eligibility, seats, annual_fee, description) VALUES (:name, :code, :dept_id, :duration, :eligibility, :seats, :fee, :desc)");
                $insStmt->execute([
                    ':name' => $courseName,
                    ':code' => $courseCode,
                    ':dept_id' => $departmentId,
                    ':duration' => $duration,
                    ':eligibility' => $eligibility,
                    ':seats' => $seats,
                    ':fee' => $annualFee,
                    ':desc' => $description
                ]);
                $successMsg = "New course added successfully! It is now visible on the public courses page.";
                $action = 'list';
            } catch (Exception $e) {
                $errorMsg = "Error adding course: " . htmlspecialchars($e->getMessage());
            }
        }
    }
}

// Fetch single course if editing
$editCourse = null;
if ($action === 'edit' && $editId > 0) {
    $eStmt = $pdo->prepare("SELECT * FROM courses WHERE id = :id");
    $eStmt->execute([':id' => $editId]);
    $editCourse = $eStmt->fetch();
}

// Fetch all courses for list view
try {
    $coursesListStmt = $pdo->query("SELECT c.*, d.name as department_name FROM courses c LEFT JOIN departments d ON c.department_id = d.id ORDER BY c.id DESC");
    $courses = $coursesListStmt->fetchAll();
} catch (Exception $e) {
    $courses = [];
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <div>
            <h4 class="fw-bold text-navy mb-1"><i class="bi bi-mortarboard-fill text-primary me-2"></i>Manage Courses & Curriculum</h4>
            <p class="text-muted small mb-0">Create, edit, and organize academic degree and diploma programs under GNDU Amritsar.</p>
        </div>
        <div>
            <?php if ($action === 'list'): ?>
                <a href="courses.php?action=add" class="btn btn-sm btn-dark"><i class="bi bi-plus-lg me-1"></i> Add New Course</a>
            <?php else: ?>
                <a href="courses.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i> Back to Courses List</a>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php if(!empty($successMsg)): ?>
    <div class="alert alert-success alert-dismissible fade show small" role="alert">
        <i class="bi bi-check-circle-fill me-1"></i> <?php echo $successMsg; ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<?php if(!empty($errorMsg)): ?>
    <div class="alert alert-danger alert-dismissible fade show small" role="alert">
        <i class="bi bi-exclamation-triangle-fill me-1"></i> <?php echo $errorMsg; ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
<?php endif; ?>

<?php if ($action === 'add' || ($action === 'edit' && $editCourse)): ?>
    <!-- Course Form (Add / Edit) -->
    <div class="card card-college p-4 border bg-white">
        <h5 class="fw-bold text-navy mb-3"><?php echo $action === 'edit' ? 'Edit Course: ' . htmlspecialchars($editCourse['course_name']) : 'Add New Academic Course'; ?></h5>

        <form action="courses.php" method="POST">
            <?php if ($action === 'edit'): ?>
                <input type="hidden" name="course_id" value="<?php echo $editCourse['id']; ?>">
            <?php endif; ?>

            <div class="row g-3">
                <div class="col-md-8">
                    <label class="form-label small fw-semibold">Course Full Title <span class="text-danger">*</span></label>
                    <input type="text" name="course_name" class="form-control form-control-sm" placeholder="e.g. Bachelor of Computer Applications (BCA)" value="<?php echo htmlspecialchars($editCourse['course_name'] ?? ''); ?>" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label small fw-semibold">Course Code <span class="text-danger">*</span></label>
                    <input type="text" name="course_code" class="form-control form-control-sm" placeholder="e.g. BCA-101" value="<?php echo htmlspecialchars($editCourse['course_code'] ?? ''); ?>" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label small fw-semibold">Academic Department</label>
                    <select name="department_id" class="form-select form-select-sm">
                        <option value="">-- General / Independent --</option>
                        <?php foreach($departments as $d): ?>
                            <option value="<?php echo $d['id']; ?>" <?php echo (isset($editCourse['department_id']) && $editCourse['department_id'] == $d['id']) ? 'selected' : ''; ?>>
                                <?php echo htmlspecialchars($d['name']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <div class="col-md-6">
                    <label class="form-label small fw-semibold">Duration & Semesters <span class="text-danger">*</span></label>
                    <input type="text" name="duration" class="form-control form-control-sm" placeholder="e.g. 3 Years (6 Semesters)" value="<?php echo htmlspecialchars($editCourse['duration'] ?? ''); ?>" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label small fw-semibold">Sanctioned Seats</label>
                    <input type="number" name="seats" class="form-control form-control-sm" value="<?php echo htmlspecialchars($editCourse['seats'] ?? 60); ?>">
                </div>
                <div class="col-md-6">
                    <label class="form-label small fw-semibold">Est. Annual Fee (&#8377;)</label>
                    <input type="number" step="0.01" name="annual_fee" class="form-control form-control-sm" value="<?php echo htmlspecialchars($editCourse['annual_fee'] ?? '0.00'); ?>">
                </div>

                <div class="col-12">
                    <label class="form-label small fw-semibold">Eligibility Criteria <span class="text-danger">*</span></label>
                    <textarea name="eligibility" class="form-control form-control-sm" rows="2" placeholder="e.g. 10+2 in any stream with minimum 40% aggregate marks" required><?php echo htmlspecialchars($editCourse['eligibility'] ?? ''); ?></textarea>
                </div>

                <div class="col-12">
                    <label class="form-label small fw-semibold">Course Description</label>
                    <textarea name="description" class="form-control form-control-sm" rows="3" placeholder="Overview of curriculum, subject modules, and career pathways"><?php echo htmlspecialchars($editCourse['description'] ?? ''); ?></textarea>
                </div>

                <div class="col-12 mt-3">
                    <button type="submit" class="btn btn-sm btn-dark py-2 px-4">
                        <i class="bi bi-save me-1"></i> <?php echo $action === 'edit' ? 'Update Course Record' : 'Save & Publish Course'; ?>
                    </button>
                    <a href="courses.php" class="btn btn-sm btn-light border ms-2">Cancel</a>
                </div>
            </div>
        </form>
    </div>
<?php else: ?>
    <!-- Courses Table List View -->
    <div class="card card-college p-4 border bg-white">
        <div class="table-responsive">
            <table class="table table-hover align-middle small mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Code</th>
                        <th>Course Title</th>
                        <th>Department</th>
                        <th>Duration</th>
                        <th>Seats</th>
                        <th>Annual Fee</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(empty($courses)): ?>
                        <tr><td colspan="7" class="text-center py-4 text-muted">No courses found. Click "Add New Course" above.</td></tr>
                    <?php else: ?>
                        <?php foreach($courses as $c): ?>
                            <tr>
                                <td><span class="badge bg-light text-dark border"><?php echo htmlspecialchars($c['course_code']); ?></span></td>
                                <td>
                                    <strong><?php echo htmlspecialchars($c['course_name']); ?></strong>
                                </td>
                                <td><?php echo htmlspecialchars($c['department_name'] ?? 'General'); ?></td>
                                <td><?php echo htmlspecialchars($c['duration']); ?></td>
                                <td><?php echo $c['seats']; ?></td>
                                <td>&#8377;<?php echo number_format($c['annual_fee'], 2); ?></td>
                                <td class="text-end">
                                    <a href="courses.php?action=edit&id=<?php echo $c['id']; ?>" class="btn btn-sm btn-outline-primary py-0 px-2" title="Edit Course">
                                        <i class="bi bi-pencil-square"></i>
                                    </a>
                                    <a href="courses.php?action=delete&id=<?php echo $c['id']; ?>" class="btn btn-sm btn-outline-danger py-0 px-2 confirm-delete ms-1" title="Delete Course">
                                        <i class="bi bi-trash"></i>
                                    </a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
<?php endif; ?>

<?php require_once __DIR__ . '/footer.php'; ?>
