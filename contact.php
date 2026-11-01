<?php
/**
 * 8. Contact Us & Enquiry Submission Page
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */
$pageTitle = "Contact Us";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

$successMsg = '';
$errorMsg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $subject = trim($_POST['subject'] ?? '');
    $message = trim($_POST['message'] ?? '');

    if (empty($name) || empty($email) || empty($phone) || empty($subject) || empty($message)) {
        $errorMsg = "Please fill in all mandatory fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMsg = "Please enter a valid email address.";
    } else {
        try {
            $stmt = $pdo->prepare("INSERT INTO enquiries (name, email, phone, subject, message, status) VALUES (:name, :email, :phone, :subject, :message, 'New')");
            $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':phone' => $phone,
                ':subject' => $subject,
                ':message' => $message
            ]);
            $successMsg = "Thank you! Your enquiry has been submitted. The college administrative office will review your query shortly.";
        } catch (Exception $e) {
            $errorMsg = "Unable to submit your enquiry at this moment. Please call the college office directly at " . COLLEGE_PHONE . ".";
        }
    }
}
?>

<div class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #183c66 100%); color: #ffffff;">
    <div class="container text-center py-3">
        <span class="text-uppercase fw-semibold" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">Admissions Desk & Office</span>
        <h1 class="display-6 fw-bold text-white mt-1">Contact SDSPM College for Women</h1>
        <p class="text-light small mb-0 opacity-75">Connect with the principal's office, admission counselors, and student welfare desk</p>
    </div>
</div>

<section class="py-5 bg-white">
    <div class="container">
        <div class="row g-5">
            <!-- Contact Details Column -->
            <div class="col-lg-5">
                <span class="badge bg-light text-primary border mb-2">Campus Office</span>
                <h3 class="fw-bold mb-3 text-navy">Verified Contact Details</h3>
                <p class="text-muted small">
                    Prospective students and guardians are welcome to visit our administrative branch on Grand Trunk Road, Rayya during official working hours (Monday to Saturday: 9:00 AM – 3:30 PM).
                </p>

                <div class="d-flex flex-column gap-3 mt-4">
                    <div class="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border">
                        <div class="fs-4 text-primary"><i class="bi bi-geo-alt-fill"></i></div>
                        <div>
                            <strong class="d-block text-dark">Postal Address</strong>
                            <span class="text-muted small"><?php echo COLLEGE_ADDRESS; ?></span>
                        </div>
                    </div>

                    <div class="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border">
                        <div class="fs-4 text-primary"><i class="bi bi-telephone-fill"></i></div>
                        <div>
                            <strong class="d-block text-dark">Office Landline</strong>
                            <span class="text-muted small"><?php echo COLLEGE_PHONE; ?></span>
                        </div>
                    </div>

                    <div class="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border">
                        <div class="fs-4 text-primary"><i class="bi bi-phone-fill"></i></div>
                        <div>
                            <strong class="d-block text-dark">Helpline Numbers</strong>
                            <span class="text-muted small"><?php echo COLLEGE_MOBILE; ?></span>
                        </div>
                    </div>

                    <div class="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border">
                        <div class="fs-4 text-primary"><i class="bi bi-envelope-fill"></i></div>
                        <div>
                            <strong class="d-block text-dark">Email Inquiries</strong>
                            <span class="text-muted small"><?php echo COLLEGE_EMAIL; ?></span>
                        </div>
                    </div>

                    <div class="d-flex align-items-start gap-3 p-3 bg-light rounded-3 border">
                        <div class="fs-4 text-primary"><i class="bi bi-globe"></i></div>
                        <div>
                            <strong class="d-block text-dark">Official College Website</strong>
                            <span class="text-muted small"><a href="<?php echo COLLEGE_WEB; ?>" target="_blank" class="text-primary"><?php echo COLLEGE_WEB; ?></a></span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Enquiry Form Column -->
            <div class="col-lg-7">
                <div class="card card-college p-4 p-md-5 border shadow-sm">
                    <h4 class="fw-bold text-navy mb-1">Submit Student / Admission Enquiry</h4>
                    <p class="text-muted small mb-4">Complete this form. Enquiries are automatically routed to the college administrative console.</p>

                    <?php if(!empty($successMsg)): ?>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="bi bi-check-circle-fill me-2"></i> <?php echo $successMsg; ?>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    <?php endif; ?>

                    <?php if(!empty($errorMsg)): ?>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <i class="bi bi-exclamation-triangle-fill me-2"></i> <?php echo $errorMsg; ?>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    <?php endif; ?>

                    <form action="contact.php" method="POST" class="needs-validation" novalidate>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Student / Guardian Name <span class="text-danger">*</span></label>
                                <input type="text" name="name" class="form-control" placeholder="e.g. Jasleen Kaur" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Contact Mobile <span class="text-danger">*</span></label>
                                <input type="tel" name="phone" class="form-control" placeholder="10-digit mobile number" required>
                            </div>
                            <div class="col-12">
                                <label class="form-label small fw-semibold">Email Address <span class="text-danger">*</span></label>
                                <input type="email" name="email" class="form-control" placeholder="name@example.com" required>
                            </div>
                            <div class="col-12">
                                <label class="form-label small fw-semibold">Course / Subject of Interest <span class="text-danger">*</span></label>
                                <input type="text" name="subject" class="form-control" placeholder="e.g., Certificate in Cosmetology or BCA eligibility" required>
                            </div>
                            <div class="col-12">
                                <label class="form-label small fw-semibold">Query Message <span class="text-danger">*</span></label>
                                <textarea name="message" class="form-control" rows="4" placeholder="Write your questions regarding admission, transport, or scholarships..." required></textarea>
                            </div>
                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-college-primary w-100 py-2">
                                    <i class="bi bi-send-fill me-2"></i> Submit Enquiry
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
