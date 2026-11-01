<?php
/**
 * 7. Notices & Announcements Page
 * Shaheed Darshan Singh Pheruman Memorial College
 */
$pageTitle = "Notices & Announcements";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

$categoryFilter = isset($_GET['cat']) ? trim($_GET['cat']) : '';
$searchQuery = isset($_GET['q']) ? trim($_GET['q']) : '';

try {
    $sql = "SELECT * FROM notices WHERE is_active = 1";
    $params = [];

    if (!empty($categoryFilter) && in_array($categoryFilter, ['Academic', 'Examination', 'Admissions', 'Sports', 'General'])) {
        $sql .= " AND category = :cat";
        $params[':cat'] = $categoryFilter;
    }

    if (!empty($searchQuery)) {
        $sql .= " AND (title LIKE :q OR content LIKE :q)";
        $params[':q'] = "%$searchQuery%";
    }

    $sql .= " ORDER BY notice_date DESC, id DESC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $notices = $stmt->fetchAll();
} catch (Exception $e) {
    $notices = [];
}
?>

<div class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #183c66 100%); color: #ffffff;">
    <div class="container text-center py-3">
        <span class="text-uppercase fw-semibold" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">Official Bulletins</span>
        <h1 class="display-6 fw-bold text-white mt-1">Notices & Announcements</h1>
        <p class="text-light small mb-0 opacity-75">Examinations, GNDU datesheets, admission schedules, and collegiate circulars</p>
    </div>
</div>

<section class="py-5 bg-white">
    <div class="container">
        <!-- Search and Filter Bar -->
        <div class="row g-3 mb-4 justify-content-between align-items-center">
            <div class="col-md-6">
                <div class="d-flex flex-wrap gap-2">
                    <a href="notices.php" class="btn btn-sm <?php echo empty($categoryFilter) ? 'btn-college-primary' : 'btn-outline-secondary'; ?>">All</a>
                    <a href="notices.php?cat=Academic" class="btn btn-sm <?php echo $categoryFilter == 'Academic' ? 'btn-college-primary' : 'btn-outline-secondary'; ?>">Academic</a>
                    <a href="notices.php?cat=Examination" class="btn btn-sm <?php echo $categoryFilter == 'Examination' ? 'btn-college-primary' : 'btn-outline-secondary'; ?>">Examination</a>
                    <a href="notices.php?cat=Admissions" class="btn btn-sm <?php echo $categoryFilter == 'Admissions' ? 'btn-college-primary' : 'btn-outline-secondary'; ?>">Admissions</a>
                    <a href="notices.php?cat=Sports" class="btn btn-sm <?php echo $categoryFilter == 'Sports' ? 'btn-college-primary' : 'btn-outline-secondary'; ?>">Sports</a>
                </div>
            </div>
            <div class="col-md-4">
                <form action="notices.php" method="GET" class="d-flex">
                    <input type="text" name="q" class="form-control form-control-sm me-2" placeholder="Search notices..." value="<?php echo htmlspecialchars($searchQuery); ?>">
                    <button type="submit" class="btn btn-sm btn-college-outline">Search</button>
                </form>
            </div>
        </div>

        <?php if(empty($notices)): ?>
            <div class="text-center py-5 bg-light rounded-3 border">
                <i class="bi bi-bell-slash fs-1 text-muted"></i>
                <h5 class="mt-3 text-muted">No notices found matching your criteria.</h5>
                <a href="notices.php" class="btn btn-sm btn-outline-primary mt-2">Clear Filter</a>
            </div>
        <?php else: ?>
            <div class="row g-3">
                <?php foreach($notices as $notice): ?>
                    <div class="col-12">
                        <div class="card card-college p-4 border bg-white">
                            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-2">
                                <div>
                                    <span class="badge bg-primary-subtle text-primary border me-2"><?php echo htmlspecialchars($notice['category']); ?></span>
                                    <span class="text-muted small"><i class="bi bi-calendar3 me-1"></i><?php echo date('d F Y', strtotime($notice['notice_date'])); ?></span>
                                </div>
                                <span class="badge bg-light text-secondary border small">Posted by: <?php echo htmlspecialchars($notice['posted_by']); ?></span>
                            </div>

                            <h4 class="fw-bold text-navy mb-2"><?php echo htmlspecialchars($notice['title']); ?></h4>
                            <p class="text-muted mb-3" style="font-size: 0.95rem; line-height: 1.6;">
                                <?php echo nl2br(htmlspecialchars($notice['content'])); ?>
                            </p>

                            <?php if(!empty($notice['attachment_url'])): ?>
                                <div class="pt-2 border-top d-flex align-items-center gap-2">
                                    <span class="text-muted small"><i class="bi bi-paperclip me-1"></i>Attachment:</span>
                                    <span class="badge bg-light text-dark border">
                                        <i class="bi bi-file-earmark-pdf text-danger me-1"></i><?php echo htmlspecialchars($notice['attachment_url']); ?>
                                    </span>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
