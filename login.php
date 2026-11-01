<?php
/**
 * 9. Student Login Page
 * Shaheed Darshan Singh Pheruman Memorial College
 */
$pageTitle = "Student Login";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

// Redirect if already logged in as student
if (isset($_SESSION['student_id'])) {
    header("Location: user/index.php");
    exit;
}

$errorMsg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $identifier = trim($_POST['identifier'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($identifier) || empty($password)) {
        $errorMsg = "Please enter your Roll Number / Email and password.";
    } else {
        try {
            // Find by roll_no or email
            $stmt = $pdo->prepare("SELECT * FROM students WHERE roll_no = :id OR email = :id LIMIT 1");
            $stmt->execute([':id' => $identifier]);
            $student = $stmt->fetch();

            if ($student && password_verify($password, $student['password'])) {
                if ($student['status'] === 'Suspended') {
                    $errorMsg = "Your student account is currently suspended. Please contact the college administrative office.";
                } else {
                    // Regenerate session ID for security
                    session_regenerate_id(true);
                    $_SESSION['student_id'] = $student['id'];
                    $_SESSION['student_name'] = $student['full_name'];
                    $_SESSION['student_roll'] = $student['roll_no'];
                    $_SESSION['student_email'] = $student['email'];

                    header("Location: user/index.php");
                    exit;
                }
            } else {
                $errorMsg = "Invalid Roll Number/Email or Password. Please check your credentials.";
            }
        } catch (Exception $e) {
            $errorMsg = "Database error. Please try again later.";
        }
    }
}
?>

<div class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #183c66 100%); color: #ffffff;">
    <div class="container text-center py-3">
        <span class="text-uppercase fw-semibold" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">Student Portal</span>
        <h1 class="display-6 fw-bold text-white mt-1">Student Login</h1>
        <p class="text-light small mb-0 opacity-75">Access your academic records, notices, enrolled courses, and college helpdesk</p>
    </div>
</div>

<section class="py-5 bg-white">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-7 col-lg-5">
                <div class="card card-college p-4 p-md-5 border shadow-sm">
                    <div class="text-center mb-4">
                        <div class="college-logo-badge mx-auto mb-2" style="width: 56px; height: 56px; font-size: 1.3rem;">SD</div>
                        <h4 class="fw-bold text-navy mb-0">Sign In to Student Portal</h4>
                        <small class="text-muted">SDSPM College Management System</small>
                    </div>

                    <?php if(!empty($errorMsg)): ?>
                        <div class="alert alert-danger py-2 small" role="alert">
                            <i class="bi bi-exclamation-triangle-fill me-1"></i> <?php echo htmlspecialchars($errorMsg); ?>
                        </div>
                    <?php endif; ?>

                    <form action="login.php" method="POST" class="needs-validation" novalidate>
                        <div class="mb-3">
                            <label class="form-label small fw-semibold">College Roll No. or Email</label>
                            <div class="input-group">
                                <span class="input-group-text bg-light text-muted"><i class="bi bi-person"></i></span>
                                <input type="text" name="identifier" class="form-control" placeholder="e.g., SDSPM-2026-001 or email" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label small fw-semibold">Password</label>
                            <div class="input-group">
                                <span class="input-group-text bg-light text-muted"><i class="bi bi-lock"></i></span>
                                <input type="password" name="password" class="form-control" placeholder="Enter your password" required>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-college-primary w-100 py-2 mt-2">
                            <i class="bi bi-box-arrow-in-right me-1"></i> Log In to Dashboard
                        </button>
                    </form>

                    <div class="mt-4 pt-3 border-top text-center small text-muted">
                        Don't have an enrolled account?  
                        <a href="register.php" class="fw-semibold text-primary">Register Here</a>
                    </div>

                    <!-- Demo credentials box -->
                    <div class="mt-3 p-3 bg-light rounded text-start small border">
                        <div class="fw-bold text-dark mb-1"><i class="bi bi-key-fill text-warning me-1"></i> Demo Student Login:</div>
                        <div class="text-muted">Roll No: <code>SDSPM-2026-001</code></div>
                        <div class="text-muted">Password: <code>password123</code></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
