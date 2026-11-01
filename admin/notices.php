<?php
/**
 * Admin Notices Management (Add, Edit, Delete CRUD)
 * Shaheed Darshan Singh Pheruman Memorial College
 */
require_once __DIR__ . '/header.php';

$successMsg = '';
$errorMsg = '';
$action = $_GET['action'] ?? 'list';
$editId = (int)($_GET['id'] ?? 0);

// Handle Delete Notice
if ($action === 'delete' && $editId > 0) {
    try {
        $delStmt = $pdo->prepare("DELETE FROM notices WHERE id = :id");
        $delStmt->execute([':id' => $editId]);
        $successMsg = "Notice deleted successfully.";
        $action = 'list';
    } catch (Exception $e) {
        $errorMsg = "Unable to delete notice.";
        $action = 'list';
    }
}

// Handle Add / Edit Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $category = trim($_POST['category'] ?? 'General');
    $noticeDate = trim($_POST['notice_date'] ?? date('Y-m-d'));
    $content = trim($_POST['content'] ?? '');
    $attachment = trim($_POST['attachment_url'] ?? '');
    $isActive = isset($_POST['is_active']) ? 1 : 0;
    $postedBy = trim($_POST['posted_by'] ?? 'Principal Office');

    if (empty($title) || empty($content)) {
        $errorMsg = "Title and Content are required fields.";
    } else {
        if (!empty($_POST['notice_id'])) {
            // Update
            $nId = (int)$_POST['notice_id'];
            try {
                $upStmt = $pdo->prepare("UPDATE notices SET title = :title, category = :cat, notice_date = :ndate, content = :content, attachment_url = :att, is_active = :active, posted_by = :posted_by WHERE id = :id");
                $upStmt->execute([
                    ':title' => $title,
                    ':cat' => $category,
                    ':ndate' => $noticeDate,
                    ':content' => $content,
                    ':att' => !empty($attachment) ? $attachment : null,
                    ':active' => $isActive,
                    ':posted_by' => $postedBy,
                    ':id' => $nId
                ]);
                $successMsg = "Notice updated successfully. Reflecting on public notice board.";
                $action = 'list';
            } catch (Exception $e) {
                $errorMsg = "Failed to update notice.";
            }
        } else {
            // Add New
            try {
                $insStmt = $pdo->prepare("INSERT INTO notices (title, category, notice_date, content, attachment_url, is_active, posted_by) VALUES (:title, :cat, :ndate, :content, :att, :active, :posted_by)");
                $insStmt->execute([
                    ':title' => $title,
                    ':cat' => $category,
                    ':ndate' => $noticeDate,
                    ':content' => $content,
                    ':att' => !empty($attachment) ? $attachment : null,
                    ':active' => $isActive,
                    ':posted_by' => $postedBy
                ]);
                $successMsg = "New notice posted successfully. Appears live immediately.";
                $action = 'list';
            } catch (Exception $e) {
                $errorMsg = "Failed to post notice.";
            }
        }
    }
}

// Fetch notice if editing
$editNotice = null;
if ($action === 'edit' && $editId > 0) {
    $eStmt = $pdo->prepare("SELECT * FROM notices WHERE id = :id");
    $eStmt->execute([':id' => $editId]);
    $editNotice = $eStmt->fetch();
}

// Fetch all notices for table
try {
    $noticesStmt = $pdo->query("SELECT * FROM notices ORDER BY notice_date DESC, id DESC");
    $allNotices = $noticesStmt->fetchAll();
} catch (Exception $e) {
    $allNotices = [];
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <div class="d-flex justify-content-between align-items-center">
        <div>
            <h4 class="fw-bold text-navy mb-1"><i class="bi bi-megaphone-fill text-warning me-2"></i>Official Notice Board Management</h4>
            <p class="text-muted small mb-0">Publish examination datesheets, circulars, and notifications visible on the public website.</p>
        </div>
        <div>
            <?php if ($action === 'list'): ?>
                <a href="notices.php?action=add" class="btn btn-sm btn-dark"><i class="bi bi-plus-lg me-1"></i> Post New Notice</a>
            <?php else: ?>
                <a href="notices.php" class="btn btn-sm btn-outline-secondary"><i class="bi bi-arrow-left me-1"></i> Back to Notices</a>
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

<?php if ($action === 'add' || ($action === 'edit' && $editNotice)): ?>
    <!-- Notice Form (Add / Edit) -->
    <div class="card card-college p-4 border bg-white">
        <h5 class="fw-bold text-navy mb-3"><?php echo $action === 'edit' ? 'Edit Notice' : 'Post New Official Notice'; ?></h5>

        <form action="notices.php" method="POST">
            <?php if ($action === 'edit'): ?>
                <input type="hidden" name="notice_id" value="<?php echo $editNotice['id']; ?>">
            <?php endif; ?>

            <div class="row g-3">
                <div class="col-md-8">
                    <label class="form-label small fw-semibold">Notice Title / Subject <span class="text-danger">*</span></label>
                    <input type="text" name="title" class="form-control form-control-sm" placeholder="e.g. GNDU Odd Semester Examination Schedule" value="<?php echo htmlspecialchars($editNotice['title'] ?? ''); ?>" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label small fw-semibold">Category</label>
                    <select name="category" class="form-select form-select-sm">
                        <?php foreach(['Academic', 'Examination', 'Admissions', 'Sports', 'General'] as $cat): ?>
                            <option value="<?php echo $cat; ?>" <?php echo (isset($editNotice['category']) && $editNotice['category'] == $cat) ? 'selected' : ''; ?>><?php echo $cat; ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>

                <div class="col-md-4">
                    <label class="form-label small fw-semibold">Notice Date</label>
                    <input type="date" name="notice_date" class="form-control form-control-sm" value="<?php echo htmlspecialchars($editNotice['notice_date'] ?? date('Y-m-d')); ?>" required>
                </div>
                <div class="col-md-4">
                    <label class="form-label small fw-semibold">Issuing Authority / Branch</label>
                    <input type="text" name="posted_by" class="form-control form-control-sm" placeholder="e.g. Principal Office / Examination Cell" value="<?php echo htmlspecialchars($editNotice['posted_by'] ?? 'College Principal Office'); ?>">
                </div>
                <div class="col-md-4">
                    <label class="form-label small fw-semibold">Attachment File Name (Optional)</label>
                    <input type="text" name="attachment_url" class="form-control form-control-sm" placeholder="e.g. datesheet_nov_2026.pdf" value="<?php echo htmlspecialchars($editNotice['attachment_url'] ?? ''); ?>">
                </div>

                <div class="col-12">
                    <label class="form-label small fw-semibold">Detailed Notice Body <span class="text-danger">*</span></label>
                    <textarea name="content" class="form-control form-control-sm" rows="5" placeholder="Write full text of the circular, dates, and instructions for students..." required><?php echo htmlspecialchars($editNotice['content'] ?? ''); ?></textarea>
                </div>

                <div class="col-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="is_active" id="isActive" <?php echo (!isset($editNotice) || $editNotice['is_active'] == 1) ? 'checked' : ''; ?>>
                        <label class="form-check-label small" for="isActive">
                            Make this notice active and immediately visible to students and visitors.
                        </label>
                    </div>
                </div>

                <div class="col-12 mt-3">
                    <button type="submit" class="btn btn-sm btn-dark py-2 px-4">
                        <i class="bi bi-save me-1"></i> <?php echo $action === 'edit' ? 'Update Notice' : 'Publish Notice to Board'; ?>
                    </button>
                    <a href="notices.php" class="btn btn-sm btn-light border ms-2">Cancel</a>
                </div>
            </div>
        </form>
    </div>
<?php else: ?>
    <!-- Notices Table View -->
    <div class="card card-college p-4 border bg-white">
        <div class="table-responsive">
            <table class="table table-hover align-middle small mb-0">
                <thead class="table-light">
                    <tr>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Notice Title</th>
                        <th>Issued By</th>
                        <th>Status</th>
                        <th class="text-end">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(empty($allNotices)): ?>
                        <tr><td colspan="6" class="text-center py-4 text-muted">No notices found. Post your first notice above.</td></tr>
                    <?php else: ?>
                        <?php foreach($allNotices as $n): ?>
                            <tr>
                                <td><?php echo date('d M Y', strtotime($n['notice_date'])); ?></td>
                                <td><span class="badge bg-secondary-subtle text-secondary"><?php echo htmlspecialchars($n['category']); ?></span></td>
                                <td>
                                    <strong><?php echo htmlspecialchars($n['title']); ?></strong>
                                    <?php if(!empty($n['attachment_url'])): ?>
                                        <i class="bi bi-paperclip text-primary ms-1" title="<?php echo htmlspecialchars($n['attachment_url']); ?>"></i>
                                    <?php endif; ?>
                                </td>
                                <td><?php echo htmlspecialchars($n['posted_by']); ?></td>
                                <td>
                                    <?php if($n['is_active']): ?>
                                        <span class="badge bg-success-subtle text-success">Active</span>
                                    <?php else: ?>
                                        <span class="badge bg-secondary-subtle text-secondary">Draft</span>
                                    <?php endif; ?>
                                </td>
                                <td class="text-end">
                                    <a href="notices.php?action=edit&id=<?php echo $n['id']; ?>" class="btn btn-sm btn-outline-primary py-0 px-2" title="Edit">
                                        <i class="bi bi-pencil-square"></i>
                                    </a>
                                    <a href="notices.php?action=delete&id=<?php echo $n['id']; ?>" class="btn btn-sm btn-outline-danger py-0 px-2 confirm-delete ms-1" title="Delete">
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
