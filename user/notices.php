<?php
/**
 * Student Notices Page
 */
require_once __DIR__ . '/header.php';

try {
    $stmt = $pdo->query("SELECT * FROM notices WHERE is_active = 1 ORDER BY notice_date DESC");
    $notices = $stmt->fetchAll();
} catch (Exception $e) {
    $notices = [];
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <h4 class="fw-bold text-navy mb-1"><i class="bi bi-bell-fill text-warning me-2"></i>Official Student Circulars & Notices</h4>
    <p class="text-muted small mb-0">Examination timetables, GNDU updates, academic deadlines, and campus events.</p>
</div>

<div class="row g-3">
    <?php if(empty($notices)): ?>
        <div class="col-12">
            <div class="card p-4 text-center text-muted border">No notices available at this moment.</div>
        </div>
    <?php else: ?>
        <?php foreach($notices as $n): ?>
            <div class="col-12">
                <div class="card card-college p-4 border bg-white">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <span class="badge bg-primary-subtle text-primary border"><?php echo htmlspecialchars($n['category']); ?></span>
                        <span class="text-muted small"><i class="bi bi-calendar3 me-1"></i><?php echo date('d F Y', strtotime($n['notice_date'])); ?></span>
                    </div>
                    <h5 class="fw-bold text-navy mb-2"><?php echo htmlspecialchars($n['title']); ?></h5>
                    <p class="text-muted mb-3 small" style="line-height: 1.6;">
                        <?php echo nl2br(htmlspecialchars($n['content'])); ?>
                    </p>
                    <div class="d-flex justify-content-between align-items-center pt-2 border-top small text-muted">
                        <span>Issued by: <strong><?php echo htmlspecialchars($n['posted_by']); ?></strong></span>
                        <?php if(!empty($n['attachment_url'])): ?>
                            <span class="badge bg-light text-dark border">
                                <i class="bi bi-paperclip me-1 text-danger"></i><?php echo htmlspecialchars($n['attachment_url']); ?>
                            </span>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
