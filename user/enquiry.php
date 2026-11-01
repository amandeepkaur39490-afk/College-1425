<?php
/**
 * Student Helpdesk & Enquiries
 */
require_once __DIR__ . '/header.php';

$successMsg = '';
$errorMsg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($subject) || empty($message)) {
        $errorMsg = "Please enter both subject and message.";
    } else {
        try {
            $stmt = $pdo->prepare("INSERT INTO enquiries (name, email, phone, subject, message, status) VALUES (:name, :email, :phone, :subject, :message, 'New')");
            $stmt->execute([
                ':name' => $currentUser['full_name'],
                ':email' => $currentUser['email'],
                ':phone' => $currentUser['phone'],
                ':subject' => "[Student " . $currentUser['roll_no'] . "] " . $subject,
                ':message' => $message
            ]);
            $successMsg = "Your support enquiry has been sent to college administration.";
        } catch (Exception $e) {
            $errorMsg = "Unable to submit enquiry. Please try again.";
        }
    }
}

// Fetch student's submitted queries
try {
    $qStmt = $pdo->prepare("SELECT * FROM enquiries WHERE email = :email ORDER BY created_at DESC");
    $qStmt->execute([':email' => $currentUser['email']]);
    $myQueries = $qStmt->fetchAll();
} catch (Exception $e) {
    $myQueries = [];
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <h4 class="fw-bold text-navy mb-1"><i class="bi bi-chat-dots-fill text-primary me-2"></i>Student Helpdesk & Academic Enquiries</h4>
    <p class="text-muted small mb-0">Submit queries to the principal's office, examination branch, or scholarship counter.</p>
</div>

<div class="row g-4">
    <!-- Submit Form -->
    <div class="col-lg-5">
        <div class="card card-college p-4 border bg-white">
            <h5 class="fw-bold text-navy mb-3">Submit New Query</h5>

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

            <form action="enquiry.php" method="POST">
                <div class="mb-3">
                    <label class="form-label small fw-semibold">Subject</label>
                    <input type="text" name="subject" class="form-control form-control-sm" placeholder="e.g. Roll Number Slip / Fee Receipt Query" required>
                </div>
                <div class="mb-3">
                    <label class="form-label small fw-semibold">Query Details</label>
                    <textarea name="message" class="form-control form-control-sm" rows="4" placeholder="Explain your query clearly..." required></textarea>
                </div>
                <button type="submit" class="btn btn-sm btn-college-primary w-100 py-2">
                    <i class="bi bi-send-fill me-1"></i> Send to Administration
                </button>
            </form>
        </div>
    </div>

    <!-- History / Responses -->
    <div class="col-lg-7">
        <div class="card card-college p-4 border bg-white">
            <h5 class="fw-bold text-navy mb-3">My Submitted Enquiries</h5>

            <?php if(empty($myQueries)): ?>
                <div class="text-center py-4 text-muted small">
                    <i class="bi bi-inbox fs-2 d-block text-secondary mb-2"></i>
                    You have not submitted any queries yet.
                </div>
            <?php else: ?>
                <div class="d-flex flex-column gap-3">
                    <?php foreach($myQueries as $q): ?>
                        <div class="p-3 bg-light rounded-3 border">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="fw-bold text-navy small"><?php echo htmlspecialchars($q['subject']); ?></span>
                                <span class="badge <?php echo $q['status'] === 'Resolved' ? 'bg-success' : ($q['status'] === 'In Review' ? 'bg-warning text-dark' : 'bg-secondary'); ?> small">
                                    <?php echo htmlspecialchars($q['status']); ?>
                                </span>
                            </div>
                            <p class="text-muted small mb-2"><?php echo htmlspecialchars($q['message']); ?></p>
                            <div class="text-muted" style="font-size: 0.75rem;">Submitted on <?php echo date('d M Y, h:i A', strtotime($q['created_at'])); ?></div>

                            <?php if(!empty($q['admin_reply'])): ?>
                                <div class="mt-2 p-2 bg-white rounded border-start border-3 border-success small">
                                    <strong class="text-success d-block"><i class="bi bi-reply-fill me-1"></i>Admin Response:</strong>
                                    <span class="text-dark"><?php echo htmlspecialchars($q['admin_reply']); ?></span>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
