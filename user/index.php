<?php
/**
 * Student Dashboard Home
 */
require_once __DIR__ . '/header.php';

// Fetch latest 3 notices
try {
    $nStmt = $pdo->query("SELECT * FROM notices WHERE is_active = 1 ORDER BY notice_date DESC LIMIT 3");
    $recentNotices = $nStmt->fetchAll();
} catch (Exception $e) {
    $recentNotices = [];
}

// Fetch student enquiries
try {
    $eStmt = $pdo->prepare("SELECT * FROM enquiries WHERE email = :email ORDER BY created_at DESC LIMIT 3");
    $eStmt->execute([':email' => $currentUser['email']]);
    $myEnquiries = $eStmt->fetchAll();
} catch (Exception $e) {
    $myEnquiries = [];
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h4 class="fw-bold text-navy mb-1">Welcome back, <?php echo htmlspecialchars($currentUser['full_name']); ?>!</h4>
            <p class="text-muted small mb-0">
                Academic Session 2026-2027 · Affiliated with Guru Nanak Dev University (GNDU)
            </p>
        </div>
        <div>
            <span class="badge bg-primary-subtle text-primary border px-3 py-2 fs-6">
                <i class="bi bi-person-vcard me-1"></i> Roll No: <?php echo htmlspecialchars($currentUser['roll_no']); ?>
            </span>
        </div>
    </div>
</div>

<!-- Overview Metric Cards -->
<div class="row g-3 mb-4">
    <div class="col-md-4">
        <div class="card card-college p-3 border bg-white h-100">
            <div class="d-flex align-items-center gap-3">
                <div class="p-3 bg-primary-subtle text-primary rounded-3 fs-3">
                    <i class="bi bi-mortarboard-fill"></i>
                </div>
                <div>
                    <small class="text-muted text-uppercase fw-semibold" style="font-size: 0.75rem;">Enrolled Program</small>
                    <h6 class="fw-bold mb-0 text-navy"><?php echo htmlspecialchars($currentUser['course_name'] ?? 'General / Not Assigned'); ?></h6>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card card-college p-3 border bg-white h-100">
            <div class="d-flex align-items-center gap-3">
                <div class="p-3 bg-success-subtle text-success rounded-3 fs-3">
                    <i class="bi bi-shield-check"></i>
                </div>
                <div>
                    <small class="text-muted text-uppercase fw-semibold" style="font-size: 0.75rem;">Enrollment Status</small>
                    <h6 class="fw-bold mb-0 text-navy"><?php echo htmlspecialchars($currentUser['status']); ?></h6>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-4">
        <div class="card card-college p-3 border bg-white h-100">
            <div class="d-flex align-items-center gap-3">
                <div class="p-3 bg-warning-subtle text-dark rounded-3 fs-3">
                    <i class="bi bi-bell-fill"></i>
                </div>
                <div>
                    <small class="text-muted text-uppercase fw-semibold" style="font-size: 0.75rem;">Active Notices</small>
                    <h6 class="fw-bold mb-0 text-navy"><?php echo count($recentNotices); ?> Available</h6>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row g-4">
    <!-- Enrolled Program Details -->
    <div class="col-lg-6">
        <div class="card card-college p-4 border bg-white h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold text-navy mb-0"><i class="bi bi-journal-check text-primary me-2"></i>My Program Details</h5>
                <a href="courses.php" class="small text-decoration-none">View Details</a>
            </div>

            <?php if (!empty($currentUser['course_name'])): ?>
                <div class="bg-light p-3 rounded-3 mb-3">
                    <div class="fs-5 fw-bold text-dark"><?php echo htmlspecialchars($currentUser['course_name']); ?></div>
                    <div class="text-muted small">Course Code: <strong><?php echo htmlspecialchars($currentUser['course_code']); ?></strong></div>
                </div>
                <ul class="list-group list-group-flush small">
                    <li class="list-group-item d-flex justify-content-between px-0">
                        <span class="text-muted">Duration:</span>
                        <strong><?php echo htmlspecialchars($currentUser['duration']); ?></strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0">
                        <span class="text-muted">Affiliated Body:</span>
                        <strong>Guru Nanak Dev University, Amritsar</strong>
                    </li>
                    <li class="list-group-item d-flex justify-content-between px-0">
                        <span class="text-muted">Annual Fee:</span>
                        <strong>&#8377;<?php echo number_format((float)($currentUser['annual_fee'] ?? 0), 2); ?></strong>
                    </li>
                </ul>
            <?php else: ?>
                <div class="alert alert-warning small mb-0">
                    No specific course selected yet. You can submit an enquiry or update your course choice in your profile.
                </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Latest Official Circulars -->
    <div class="col-lg-6">
        <div class="card card-college p-4 border bg-white h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold text-navy mb-0"><i class="bi bi-megaphone text-danger me-2"></i>Latest Announcements</h5>
                <a href="notices.php" class="small text-decoration-none">All Notices</a>
            </div>

            <div class="d-flex flex-column gap-3">
                <?php if(!empty($recentNotices)): ?>
                    <?php foreach($recentNotices as $n): ?>
                        <div class="p-3 bg-light rounded-2 border-start border-3 border-primary">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="badge bg-secondary-subtle text-secondary small"><?php echo htmlspecialchars($n['category']); ?></span>
                                <span class="text-muted" style="font-size: 0.75rem;"><?php echo date('d M Y', strtotime($n['notice_date'])); ?></span>
                            </div>
                            <div class="fw-semibold text-dark small mb-1"><?php echo htmlspecialchars($n['title']); ?></div>
                            <p class="text-muted mb-0" style="font-size: 0.8rem;">
                                <?php echo htmlspecialchars(substr($n['content'], 0, 95)) . '...'; ?>
                            </p>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p class="text-muted small mb-0">No notices posted recently.</p>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
