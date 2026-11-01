<?php
/**
 * Admin Student Accounts Management
 * Shaheed Darshan Singh Pheruman Memorial College
 */
require_once __DIR__ . '/header.php';

$successMsg = '';
$errorMsg = '';
$action = $_GET['action'] ?? 'list';
$studentId = (int)($_GET['id'] ?? 0);

// Handle Status Toggle or Deletion
if ($action === 'toggle_status' && $studentId > 0) {
    $newStatus = $_GET['status'] === 'Active' ? 'Suspended' : 'Active';
    try {
        $tStmt = $pdo->prepare("UPDATE students SET status = :status WHERE id = :id");
        $tStmt->execute([':status' => $newStatus, ':id' => $studentId]);
        $successMsg = "Student status updated to $newStatus.";
    } catch (Exception $e) {
        $errorMsg = "Unable to update student status.";
    }
}

if ($action === 'delete' && $studentId > 0) {
    try {
        $delStmt = $pdo->prepare("DELETE FROM students WHERE id = :id");
        $delStmt->execute([':id' => $studentId]);
        $successMsg = "Student account deleted successfully.";
    } catch (Exception $e) {
        $errorMsg = "Unable to delete student record.";
    }
}

// Fetch all students
try {
    $sStmt = $pdo->query("SELECT s.*, c.course_name, c.course_code FROM students s LEFT JOIN courses c ON s.course_id = c.id ORDER BY s.id DESC");
    $students = $sStmt->fetchAll();
} catch (Exception $e) {
    $students = [];
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <div>
            <h4 class="fw-bold text-navy mb-1"><i class="bi bi-people-fill text-primary me-2"></i>Student Accounts Management</h4>
            <p class="text-muted small mb-0">Review student enrollments, assign statuses, and monitor academic records.</p>
        </div>
        <div>
            <span class="badge bg-primary fs-6 px-3 py-2">Total Students: <?php echo count($students); ?></span>
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

<div class="card card-college p-4 border bg-white">
    <div class="table-responsive">
        <table class="table table-hover align-middle small mb-0">
            <thead class="table-light">
                <tr>
                    <th>Roll No</th>
                    <th>Student Name</th>
                    <th>Email & Contact</th>
                    <th>Enrolled Course</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Registered On</th>
                    <th class="text-end">Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if(empty($students)): ?>
                    <tr><td colspan="8" class="text-center py-4 text-muted">No student accounts registered yet.</td></tr>
                <?php else: ?>
                    <?php foreach($students as $s): ?>
                        <tr>
                            <td><span class="badge bg-light text-dark border"><?php echo htmlspecialchars($s['roll_no']); ?></span></td>
                            <td><strong><?php echo htmlspecialchars($s['full_name']); ?></strong></td>
                            <td>
                                <div><?php echo htmlspecialchars($s['email']); ?></div>
                                <small class="text-muted"><i class="bi bi-phone me-1"></i><?php echo htmlspecialchars($s['phone']); ?></small>
                            </td>
                            <td>
                                <span class="badge bg-secondary-subtle text-secondary">
                                    <?php echo htmlspecialchars($s['course_name'] ?? 'Not Assigned'); ?>
                                </span>
                            </td>
                            <td><?php echo htmlspecialchars($s['gender']); ?></td>
                            <td>
                                <?php if($s['status'] === 'Active'): ?>
                                    <span class="badge bg-success-subtle text-success">Active</span>
                                <?php elseif($s['status'] === 'Suspended'): ?>
                                    <span class="badge bg-danger-subtle text-danger">Suspended</span>
                                <?php else: ?>
                                    <span class="badge bg-warning-subtle text-dark">Pending</span>
                                <?php endif; ?>
                            </td>
                            <td><?php echo date('d M Y', strtotime($s['created_at'])); ?></td>
                            <td class="text-end">
                                <a href="students.php?action=toggle_status&id=<?php echo $s['id']; ?>&status=<?php echo $s['status']; ?>" class="btn btn-sm btn-outline-secondary py-0 px-2" title="Toggle Status">
                                    <?php echo $s['status'] === 'Active' ? 'Suspend' : 'Activate'; ?>
                                </a>
                                <a href="students.php?action=delete&id=<?php echo $s['id']; ?>" class="btn btn-sm btn-outline-danger py-0 px-2 confirm-delete ms-1" title="Delete Account">
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

<?php require_once __DIR__ . '/footer.php'; ?>
