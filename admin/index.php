<?php
/**
 * Administrator Dashboard Overview
 * Shaheed Darshan Singh Pheruman Memorial College
 */
require_once __DIR__ . '/header.php';

// Fetch key dashboard statistics
try {
    $totalStudents = $pdo->query("SELECT COUNT(*) FROM students")->fetchColumn();
    $totalCourses = $pdo->query("SELECT COUNT(*) FROM courses")->fetchColumn();
    $totalNotices = $pdo->query("SELECT COUNT(*) FROM notices WHERE is_active = 1")->fetchColumn();
    $pendingEnquiries = $pdo->query("SELECT COUNT(*) FROM enquiries WHERE status = 'New'")->fetchColumn();

    // Recent 5 Students
    $sStmt = $pdo->query("SELECT s.*, c.course_name FROM students s LEFT JOIN courses c ON s.course_id = c.id ORDER BY s.id DESC LIMIT 5");
    $recentStudents = $sStmt->fetchAll();

    // Recent 5 Enquiries
    $eStmt = $pdo->query("SELECT * FROM enquiries ORDER BY id DESC LIMIT 5");
    $recentEnquiries = $eStmt->fetchAll();
} catch (Exception $e) {
    $totalStudents = 0;
    $totalCourses = 0;
    $totalNotices = 0;
    $pendingEnquiries = 0;
    $recentStudents = [];
    $recentEnquiries = [];
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
            <h4 class="fw-bold text-navy mb-1">Administrative Operations Console</h4>
            <p class="text-muted small mb-0">Managing SDSPM College academic catalogs, public announcements, and student registrations.</p>
        </div>
        <div class="d-flex gap-2">
            <a href="courses.php?action=add" class="btn btn-sm btn-dark"><i class="bi bi-plus-circle me-1"></i> Add Course</a>
            <a href="notices.php?action=add" class="btn btn-sm btn-college-primary"><i class="bi bi-plus-circle me-1"></i> Post Notice</a>
        </div>
    </div>
</div>

<!-- Stats Ribbon -->
<div class="row g-3 mb-4">
    <div class="col-md-3 col-6">
        <div class="card card-college p-3 border bg-white">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="text-muted small text-uppercase fw-semibold" style="font-size: 0.75rem;">Total Students</span>
                    <h3 class="fw-bold mb-0 text-navy"><?php echo $totalStudents; ?></h3>
                </div>
                <div class="p-3 bg-primary-subtle text-primary rounded-3 fs-4"><i class="bi bi-people-fill"></i></div>
            </div>
            <a href="students.php" class="small text-decoration-none mt-2 d-inline-block">Manage Directory &rarr;</a>
        </div>
    </div>

    <div class="col-md-3 col-6">
        <div class="card card-college p-3 border bg-white">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="text-muted small text-uppercase fw-semibold" style="font-size: 0.75rem;">Active Courses</span>
                    <h3 class="fw-bold mb-0 text-navy"><?php echo $totalCourses; ?></h3>
                </div>
                <div class="p-3 bg-success-subtle text-success rounded-3 fs-4"><i class="bi bi-journal-check"></i></div>
            </div>
            <a href="courses.php" class="small text-decoration-none mt-2 d-inline-block">View Courses &rarr;</a>
        </div>
    </div>

    <div class="col-md-3 col-6">
        <div class="card card-college p-3 border bg-white">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="text-muted small text-uppercase fw-semibold" style="font-size: 0.75rem;">Published Notices</span>
                    <h3 class="fw-bold mb-0 text-navy"><?php echo $totalNotices; ?></h3>
                </div>
                <div class="p-3 bg-warning-subtle text-dark rounded-3 fs-4"><i class="bi bi-megaphone-fill"></i></div>
            </div>
            <a href="notices.php" class="small text-decoration-none mt-2 d-inline-block">Notice Board &rarr;</a>
        </div>
    </div>

    <div class="col-md-3 col-6">
        <div class="card card-college p-3 border bg-white">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <span class="text-muted small text-uppercase fw-semibold" style="font-size: 0.75rem;">New Enquiries</span>
                    <h3 class="fw-bold mb-0 text-danger"><?php echo $pendingEnquiries; ?></h3>
                </div>
                <div class="p-3 bg-danger-subtle text-danger rounded-3 fs-4"><i class="bi bi-envelope-exclamation-fill"></i></div>
            </div>
            <a href="enquiries.php" class="small text-decoration-none mt-2 d-inline-block">Respond Now &rarr;</a>
        </div>
    </div>
</div>

<div class="row g-4">
    <!-- Recent Students Table -->
    <div class="col-lg-7">
        <div class="card card-college p-4 border bg-white h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold text-navy mb-0">Newly Registered Students</h5>
                <a href="students.php" class="small text-decoration-none">View All</a>
            </div>

            <div class="table-responsive">
                <table class="table table-hover align-middle small mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>Roll No</th>
                            <th>Student Name</th>
                            <th>Course</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if(empty($recentStudents)): ?>
                            <tr><td colspan="4" class="text-center py-3 text-muted">No students enrolled yet.</td></tr>
                        <?php else: ?>
                            <?php foreach($recentStudents as $s): ?>
                                <tr>
                                    <td><span class="badge bg-light text-dark border"><?php echo htmlspecialchars($s['roll_no']); ?></span></td>
                                    <td>
                                        <strong><?php echo htmlspecialchars($s['full_name']); ?></strong><br>
                                        <small class="text-muted"><?php echo htmlspecialchars($s['email']); ?></small>
                                    </td>
                                    <td><?php echo htmlspecialchars($s['course_name'] ?? 'Not Assigned'); ?></td>
                                    <td><span class="badge bg-success-subtle text-success"><?php echo htmlspecialchars($s['status']); ?></span></td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Recent Inquiries -->
    <div class="col-lg-5">
        <div class="card card-college p-4 border bg-white h-100">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold text-navy mb-0">Recent Public Enquiries</h5>
                <a href="enquiries.php" class="small text-decoration-none">View All</a>
            </div>

            <div class="d-flex flex-column gap-3">
                <?php if(empty($recentEnquiries)): ?>
                    <p class="text-muted small">No enquiries received yet.</p>
                <?php else: ?>
                    <?php foreach($recentEnquiries as $enq): ?>
                        <div class="p-3 bg-light rounded-2 border">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <strong class="small text-navy"><?php echo htmlspecialchars($enq['name']); ?></strong>
                                <span class="badge <?php echo $enq['status'] === 'New' ? 'bg-danger' : 'bg-success'; ?> small" style="font-size: 0.7rem;">
                                    <?php echo htmlspecialchars($enq['status']); ?>
                                </span>
                            </div>
                            <div class="small fw-semibold text-dark mb-1"><?php echo htmlspecialchars($enq['subject']); ?></div>
                            <p class="text-muted mb-1" style="font-size: 0.8rem;"><?php echo htmlspecialchars(substr($enq['message'], 0, 85)) . '...'; ?></p>
                            <small class="text-muted"><i class="bi bi-clock me-1"></i><?php echo date('d M Y, h:i A', strtotime($enq['created_at'])); ?></small>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
