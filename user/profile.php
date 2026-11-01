<?php
/**
 * Student Profile Page
 */
require_once __DIR__ . '/header.php';

$successMsg = '';
$errorMsg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $phone = trim($_POST['phone'] ?? '');
    $address = trim($_POST['address'] ?? '');
    $newPassword = $_POST['new_password'] ?? '';

    if (empty($phone)) {
        $errorMsg = "Phone number is mandatory.";
    } else {
        try {
            if (!empty($newPassword)) {
                if (strlen($newPassword) < 6) {
                    $errorMsg = "Password must be at least 6 characters.";
                } else {
                    $hash = password_hash($newPassword, PASSWORD_BCRYPT);
                    $stmt = $pdo->prepare("UPDATE students SET phone = :phone, address = :address, password = :password WHERE id = :id");
                    $stmt->execute([':phone' => $phone, ':address' => $address, ':password' => $hash, ':id' => $studentId]);
                    $successMsg = "Profile and password updated successfully.";
                }
            } else {
                $stmt = $pdo->prepare("UPDATE students SET phone = :phone, address = :address WHERE id = :id");
                $stmt->execute([':phone' => $phone, ':address' => $address, ':id' => $studentId]);
                $successMsg = "Contact details updated successfully.";
            }

            // Reload user record
            $stmt = $pdo->prepare("SELECT s.*, c.course_name, c.course_code FROM students s LEFT JOIN courses c ON s.course_id = c.id WHERE s.id = :id");
            $stmt->execute([':id' => $studentId]);
            $currentUser = $stmt->fetch();
        } catch (Exception $e) {
            $errorMsg = "Failed to update profile.";
        }
    }
}
?>

<div class="card card-college p-4 border bg-white mb-4">
    <h4 class="fw-bold text-navy mb-1"><i class="bi bi-person-circle text-primary me-2"></i>My Student Profile</h4>
    <p class="text-muted small mb-0">View your verified enrollment record and maintain active contact information.</p>
</div>

<div class="row g-4">
    <div class="col-lg-7">
        <div class="card card-college p-4 border bg-white">
            <h5 class="fw-bold text-navy mb-3">Update Contact Information</h5>

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

            <form action="profile.php" method="POST">
                <div class="mb-3">
                    <label class="form-label small fw-semibold">Full Legal Name</label>
                    <input type="text" class="form-control form-control-sm bg-light" value="<?php echo htmlspecialchars($currentUser['full_name']); ?>" readonly>
                    <small class="text-muted" style="font-size: 0.75rem;">Name changes require verification from the college registrar office.</small>
                </div>

                <div class="mb-3">
                    <label class="form-label small fw-semibold">College Roll Number</label>
                    <input type="text" class="form-control form-control-sm bg-light" value="<?php echo htmlspecialchars($currentUser['roll_no']); ?>" readonly>
                </div>

                <div class="mb-3">
                    <label class="form-label small fw-semibold">Registered Email</label>
                    <input type="email" class="form-control form-control-sm bg-light" value="<?php echo htmlspecialchars($currentUser['email']); ?>" readonly>
                </div>

                <div class="mb-3">
                    <label class="form-label small fw-semibold">Active Phone Number <span class="text-danger">*</span></label>
                    <input type="tel" name="phone" class="form-control form-control-sm" value="<?php echo htmlspecialchars($currentUser['phone']); ?>" required>
                </div>

                <div class="mb-3">
                    <label class="form-label small fw-semibold">Permanent Postal Address</label>
                    <textarea name="address" class="form-control form-control-sm" rows="3"><?php echo htmlspecialchars($currentUser['address'] ?? ''); ?></textarea>
                </div>

                <hr class="my-4">

                <div class="mb-3">
                    <label class="form-label small fw-semibold">Change Password (optional)</label>
                    <input type="password" name="new_password" class="form-control form-control-sm" placeholder="Leave empty to keep current password">
                </div>

                <button type="submit" class="btn btn-sm btn-college-primary py-2 px-4">
                    <i class="bi bi-check2-circle me-1"></i> Save Profile Changes
                </button>
            </form>
        </div>
    </div>

    <div class="col-lg-5">
        <div class="card card-college p-4 border bg-white">
            <h5 class="fw-bold text-navy mb-3">Institutional Status</h5>
            <div class="p-3 bg-light rounded-3 mb-3 small">
                <div class="mb-2"><strong>Affiliated College:</strong><br><?php echo COLLEGE_NAME; ?></div>
                <div class="mb-2"><strong>University:</strong><br>Guru Nanak Dev University, Amritsar</div>
                <div class="mb-2"><strong>Enrolled Program:</strong><br><?php echo htmlspecialchars($currentUser['course_name'] ?? 'General Arts / Science'); ?></div>
                <div><strong>Registration Date:</strong><br><?php echo date('d M Y', strtotime($currentUser['created_at'])); ?></div>
            </div>
            <div class="alert alert-info small mb-0">
                <i class="bi bi-shield-lock me-1"></i> Student credentials are encrypted with secure salted hashing. Only you have access to your portal.
            </div>
        </div>
    </div>
</div>

<?php require_once __DIR__ . '/footer.php'; ?>
