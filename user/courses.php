<?php
/**
 * Student Courses Page
 */
require_once __DIR__ . '/header.php';

try {
    $stmtAll = $pdo->query("SELECT c.*, d.name as department_name FROM courses c LEFT JOIN departments d ON c.department_id = d.id ORDER BY c.course_name ASC");
    $allCourses = $stmtAll->fetchAll();
} catch (Exception $e) {
    $allCourses = [];
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <h4 class="fw-bold text-navy mb-1"><i class="bi bi-journal-text text-primary me-2"></i>Course Curriculum & Offerings</h4>
    <p class="text-muted small mb-0">Browse all approved academic courses offered by SDSPM College affiliated with GNDU Amritsar.</p>
</div>

<!-- Enrolled Banner -->
<?php if(!empty($currentUser['course_name'])): ?>
    <div class="card border-primary border-2 p-4 bg-white mb-4">
        <span class="badge bg-primary text-uppercase align-self-start mb-2 px-3 py-1">Your Enrolled Program</span>
        <h3 class="fw-bold text-navy mb-1"><?php echo htmlspecialchars($currentUser['course_name']); ?></h3>
        <p class="text-muted small mb-3">Course Code: <strong><?php echo htmlspecialchars($currentUser['course_code']); ?></strong> | Duration: <strong><?php echo htmlspecialchars($currentUser['duration']); ?></strong></p>
        <div class="p-3 bg-light rounded text-muted small">
            <div><i class="bi bi-check-circle-fill text-success me-1"></i> Examination Body: Guru Nanak Dev University (GNDU), Amritsar</div>
            <div class="mt-1"><i class="bi bi-calendar-check me-1"></i> Current Status: Verified Regular Student (Session 2026-27)</div>
        </div>
    </div>
<?php endif; ?>

<h5 class="fw-bold text-navy mb-3">All Degree & Diploma Courses</h5>
<div class="row g-3">
    <?php foreach($allCourses as $c): ?>
        <div class="col-md-6">
            <div class="card card-college p-3 border bg-white h-100">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <span class="badge bg-light text-dark border small"><?php echo htmlspecialchars($c['course_code']); ?></span>
                        <h6 class="fw-bold text-navy mb-0 mt-1"><?php echo htmlspecialchars($c['course_name']); ?></h6>
                    </div>
                    <span class="badge bg-secondary-subtle text-secondary small"><?php echo htmlspecialchars($c['duration']); ?></span>
                </div>
                <p class="text-muted small mb-2"><?php echo htmlspecialchars($c['description'] ?? ''); ?></p>
                <div class="mt-auto pt-2 border-top small text-muted d-flex justify-content-between">
                    <span>Department: <strong><?php echo htmlspecialchars($c['department_name'] ?? 'General'); ?></strong></span>
                    <span>Seats: <strong><?php echo $c['seats']; ?></strong></span>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
