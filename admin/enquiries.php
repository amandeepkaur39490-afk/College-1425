<?php
/**
 * Admin Enquiries Management
 * Shaheed Darshan Singh Pheruman Memorial College
 */
require_once __DIR__ . '/header.php';

$successMsg = '';
$errorMsg = '';
$action = $_GET['action'] ?? 'list';
$enquiryId = (int)($_GET['id'] ?? 0);

// Handle Status or Reply update
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_enquiry'])) {
    $eId = (int)$_POST['enquiry_id'];
    $status = trim($_POST['status'] ?? 'In Review');
    $reply = trim($_POST['admin_reply'] ?? '');

    try {
        $stmt = $pdo->prepare("UPDATE enquiries SET status = :status, admin_reply = :reply WHERE id = :id");
        $stmt->execute([':status' => $status, ':reply' => $reply, ':id' => $eId]);
        $successMsg = "Enquiry status and reply updated successfully.";
    } catch (Exception $e) {
        $errorMsg = "Unable to update enquiry.";
    }
}

// Handle Delete
if ($action === 'delete' && $enquiryId > 0) {
    try {
        $delStmt = $pdo->prepare("DELETE FROM enquiries WHERE id = :id");
        $delStmt->execute([':id' => $enquiryId]);
        $successMsg = "Enquiry removed.";
    } catch (Exception $e) {
        $errorMsg = "Unable to delete enquiry.";
    }
}

// Fetch all enquiries
try {
    $eStmt = $pdo->query("SELECT * FROM enquiries ORDER BY id DESC");
    $enquiries = $eStmt->fetchAll();
} catch (Exception $e) {
    $enquiries = [];
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <div>
            <h4 class="fw-bold text-navy mb-1"><i class="bi bi-envelope-check-fill text-danger me-2"></i>Contact Enquiries & Helpdesk</h4>
            <p class="text-muted small mb-0">Review questions submitted by prospective students, parents, and enrolled candidates.</p>
        </div>
        <div>
            <span class="badge bg-secondary fs-6 px-3 py-2">Total Queries: <?php echo count($enquiries); ?></span>
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

<div class="row g-4">
    <?php if(empty($enquiries)): ?>
        <div class="col-12">
            <div class="card p-5 text-center text-muted bg-white border">
                <i class="bi bi-inbox fs-1 mb-2 text-secondary"></i>
                <h6>No enquiries currently in queue.</h6>
            </div>
        </div>
    <?php else: ?>
        <?php foreach($enquiries as $enq): ?>
            <div class="col-12">
                <div class="card card-college p-4 border bg-white">
                    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-2 mb-2">
                        <div>
                            <span class="badge <?php echo $enq['status'] === 'New' ? 'bg-danger' : ($enq['status'] === 'In Review' ? 'bg-warning text-dark' : 'bg-success'); ?> me-2">
                                <?php echo htmlspecialchars($enq['status']); ?>
                            </span>
                            <strong class="fs-6 text-navy"><?php echo htmlspecialchars($enq['subject']); ?></strong>
                        </div>
                        <div class="small text-muted">
                            <i class="bi bi-clock me-1"></i><?php echo date('d M Y, h:i A', strtotime($enq['created_at'])); ?>
                        </div>
                    </div>

                    <div class="row g-2 mb-3 small text-muted">
                        <div class="col-sm-4"><i class="bi bi-person me-1"></i> <strong>From:</strong> <?php echo htmlspecialchars($enq['name']); ?></div>
                        <div class="col-sm-4"><i class="bi bi-envelope me-1"></i> <strong>Email:</strong> <?php echo htmlspecialchars($enq['email']); ?></div>
                        <div class="col-sm-4"><i class="bi bi-phone me-1"></i> <strong>Phone:</strong> <?php echo htmlspecialchars($enq['phone']); ?></div>
                    </div>

                    <div class="p-3 bg-light rounded-2 mb-3 small" style="line-height: 1.6;">
                        <strong>Enquiry Message:</strong><br>
                        <?php echo nl2br(htmlspecialchars($enq['message'])); ?>
                    </div>

                    <!-- Admin Response & Status Form -->
                    <form action="enquiries.php" method="POST" class="p-3 border rounded-2 bg-white">
                        <input type="hidden" name="update_enquiry" value="1">
                        <input type="hidden" name="enquiry_id" value="<?php echo $enq['id']; ?>">

                        <div class="row g-3 align-items-center">
                            <div class="col-md-3">
                                <label class="form-label small fw-semibold mb-1">Update Status</label>
                                <select name="status" class="form-select form-select-sm">
                                    <option value="New" <?php echo $enq['status'] === 'New' ? 'selected' : ''; ?>>New</option>
                                    <option value="In Review" <?php echo $enq['status'] === 'In Review' ? 'selected' : ''; ?>>In Review</option>
                                    <option value="Resolved" <?php echo $enq['status'] === 'Resolved' ? 'selected' : ''; ?>>Resolved</option>
                                </select>
                            </div>
                            <div class="col-md-7">
                                <label class="form-label small fw-semibold mb-1">Administrative Note / Reply</label>
                                <input type="text" name="admin_reply" class="form-control form-control-sm" placeholder="Add resolution note or response sent to applicant..." value="<?php echo htmlspecialchars($enq['admin_reply'] ?? ''); ?>">
                            </div>
                            <div class="col-md-2 text-md-end mt-md-4">
                                <button type="submit" class="btn btn-sm btn-dark w-100">Save</button>
                            </div>
                        </div>
                    </form>

                    <div class="text-end mt-2">
                        <a href="enquiries.php?action=delete&id=<?php echo $enq['id']; ?>" class="text-danger small confirm-delete text-decoration-none">
                            <i class="bi bi-trash me-1"></i> Delete Enquiry
                        </a>
                    </div>
                </div>
            </div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
