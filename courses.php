<?php
/**
 * 3. Courses Page
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */
$pageTitle = "Courses & Academic Programs";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

// Filter by department if passed
$selectedDept = isset($_GET['dept']) ? (int)$_GET['dept'] : 0;

try {
    // Get all departments for filter tabs
    $deptStmt = $pdo->query("SELECT * FROM departments ORDER BY name ASC");
    $departments = $deptStmt->fetchAll();

    // Query courses (verified from official website)
    if ($selectedDept > 0) {
        $stmt = $pdo->prepare("SELECT c.*, d.name as department_name FROM courses c LEFT JOIN departments d ON c.department_id = d.id WHERE c.department_id = :dept_id ORDER BY c.id ASC");
        $stmt->execute([':dept_id' => $selectedDept]);
    } else {
        $stmt = $pdo->query("SELECT c.*, d.name as department_name FROM courses c LEFT JOIN departments d ON c.department_id = d.id ORDER BY c.id ASC");
    }
    $courses = $stmt->fetchAll();
} catch (Exception $e) {
    $departments = [];
    $courses = [];
}
?>

<div class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #183c66 100%); color: #ffffff;">
    <div class="container text-center py-3">
        <span class="text-uppercase fw-semibold" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">Official Curriculum</span>
        <h1 class="display-6 fw-bold text-white mt-1">Academic Courses Offered</h1>
        <p class="text-light small mb-0 opacity-75">Verified Degree, Diploma & Certificate Programs under Guru Nanak Dev University (GNDU), Amritsar</p>
    </div>
</div>

<section class="py-5 bg-white">
    <div class="container">
        <!-- Verification Banner -->
        <div class="alert alert-light border small text-muted mb-4 d-flex align-items-center gap-2">
            <i class="bi bi-patch-check-fill text-success fs-5"></i>
            <div>
                All courses listed below are verified against the official academic roster of <strong>Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya</strong> (<a href="https://sdspmcollege.org/" target="_blank" class="text-primary text-decoration-underline">sdspmcollege.org</a>).
            </div>
        </div>

        <!-- Department Filter Buttons -->
        <div class="d-flex flex-wrap gap-2 justify-content-center mb-5">
            <a href="courses.php" class="btn btn-sm <?php echo $selectedDept == 0 ? 'btn-college-primary' : 'btn-outline-secondary'; ?>">
                All Programs (<?php echo count($courses); ?>)
            </a>
            <?php foreach($departments as $dept): ?>
                <a href="courses.php?dept=<?php echo $dept['id']; ?>" class="btn btn-sm <?php echo $selectedDept == $dept['id'] ? 'btn-college-primary' : 'btn-outline-secondary'; ?>">
                    <?php echo htmlspecialchars($dept['name']); ?>
                </a>
            <?php endforeach; ?>
        </div>

        <?php if(empty($courses)): ?>
            <div class="text-center py-5">
                <i class="bi bi-journal-x fs-1 text-muted"></i>
                <h5 class="mt-3 text-muted">No courses found for this category.</h5>
                <a href="courses.php" class="btn btn-sm btn-outline-primary mt-2">View All Courses</a>
            </div>
        <?php else: ?>
            <div class="row g-4">
                <?php foreach($courses as $course): ?>
                    <div class="col-lg-6">
                        <div class="card card-college p-4 h-100 border">
                            <div class="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                    <span class="badge bg-secondary-subtle text-secondary mb-1"><?php echo htmlspecialchars($course['department_name'] ?? 'General'); ?></span>
                                    <h4 class="fw-bold mb-1 text-navy"><?php echo htmlspecialchars($course['course_name']); ?></h4>
                                    <span class="text-muted small">Course Code: <strong><?php echo htmlspecialchars($course['course_code']); ?></strong></span>
                                </div>
                                <span class="badge bg-warning-subtle text-dark border px-2 py-1">
                                    <i class="bi bi-clock me-1"></i><?php echo htmlspecialchars($course['duration']); ?>
                                </span>
                            </div>

                            <p class="text-muted small mb-3">
                                <?php echo htmlspecialchars($course['description'] ?? ''); ?>
                            </p>

                            <div class="bg-light p-3 rounded-2 mb-3 small">
                                <div class="mb-1"><strong><i class="bi bi-check2-circle text-success me-1"></i> Eligibility:</strong> <?php echo htmlspecialchars($course['eligibility']); ?></div>
                                <div class="d-flex justify-content-between pt-2 border-top mt-2 text-muted">
                                    <span>Sanctioned Seats: <strong><?php echo $course['seats']; ?></strong></span>
                                    <span>Affiliation: <strong>GNDU Amritsar</strong></span>
                                </div>
                            </div>

                            <div class="mt-auto pt-2 d-flex justify-content-between align-items-center">
                                <div>
                                    <?php if($course['annual_fee'] > 0): ?>
                                        <small class="text-muted">Est. Annual Fee: </small>
                                        <span class="fw-bold text-dark">&#8377;<?php echo number_format($course['annual_fee'], 2); ?></span>
                                    <?php else: ?>
                                        <small class="text-muted">Fee: As per Punjab Govt / GNDU norms</small>
                                    <?php endif; ?>
                                </div>
                                <div>
                                    <a href="register.php?course=<?php echo urlencode($course['course_name']); ?>" class="btn btn-sm btn-college-primary">Enroll Online</a>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>

        <!-- Official Add-On Courses Note -->
        <div class="mt-5 p-4 border rounded-3 bg-light">
            <h5 class="fw-bold"><i class="bi bi-info-circle-fill text-primary me-2"></i> UGC-Supported & Career-Oriented Skill Add-On Programs</h5>
            <p class="small text-muted mb-2">
                In addition to conventional degree courses (BCA, B.Sc. Economics, B.Com, BBA, BA), SDSPM College for Women provides UGC-supported Add-On / Career-Oriented certificate courses such as <strong>CCA (Certificate in Computer Applications)</strong> and <strong>Certificate in Cosmetology</strong> to ensure students develop professional and vocational competencies alongside their degrees.
            </p>
            <p class="small text-muted mb-0">
                School Wing (Collegiate School) offers 10+1 and 10+2 education in Arts, Commerce, and Science under Punjab School Education Board (PSEB).
            </p>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
