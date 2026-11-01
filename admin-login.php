<?php
/**
 * 10. Admin Login Page
 * Shaheed Darshan Singh Pheruman Memorial College
 */
$pageTitle = "Admin Portal Login";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

// Redirect if already logged in as admin
if (isset($_SESSION['admin_id'])) {
    header("Location: admin/index.php");
    exit;
}

$errorMsg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($username) || empty($password)) {
        $errorMsg = "Please enter both administrator username and password.";
    } else {
        try {
            $stmt = $pdo->prepare("SELECT * FROM admins WHERE username = :username OR email = :username LIMIT 1");
            $stmt->execute([':username' => $username]);
            $admin = $stmt->fetch();

            if ($admin && password_verify($password, $admin['password'])) {
                session_regenerate_id(true);
                $_SESSION['admin_id'] = $admin['id'];
                $_SESSION['admin_username'] = $admin['username'];
                $_SESSION['admin_name'] = $admin['full_name'];
                $_SESSION['admin_role'] = $admin['role'];

                header("Location: admin/index.php");
                exit;
            } else {
                $errorMsg = "Invalid administrator credentials. Access denied.";
            }
        } catch (Exception $e) {
            $errorMsg = "Database error. Please try again.";
        }
    }
}
?>

<div class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #081a2d 100%); color: #ffffff;">
    <div class="container text-center py-3">
        <span class="text-uppercase fw-semibold" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">Management & CMS</span>
        <h1 class="display-6 fw-bold text-white mt-1">Administrator Portal</h1>
        <p class="text-light small mb-0 opacity-75">Secured access for SDSPM College academic administrators and examination controllers</p>
    </div>
</div>

<section class="py-5 bg-white">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-7 col-lg-5">
                <div class="card card-college p-4 p-md-5 border shadow-sm">
                    <div class="text-center mb-4">
                        <div class="college-logo-badge mx-auto mb-2" style="width: 56px; height: 56px; background: #081a2d; font-size: 1.3rem;">
                            <i class="bi bi-shield-lock text-warning"></i>
                        </div>
                        <h4 class="fw-bold text-navy mb-0">Admin Authentication</h4>
                        <small class="text-muted">SDSPM College Management Console</small>
                    </div>

                    <?php if(!empty($errorMsg)): ?>
                        <div class="alert alert-danger py-2 small" role="alert">
                            <i class="bi bi-shield-x me-1"></i> <?php echo htmlspecialchars($errorMsg); ?>
                        </div>
                    <?php endif; ?>

                    <form action="admin-login.php" method="POST" class="needs-validation" novalidate>
                        <div class="mb-3">
                            <label class="form-label small fw-semibold">Admin Username or Email</label>
                            <div class="input-group">
                                <span class="input-group-text bg-light text-muted"><i class="bi bi-person-badge"></i></span>
                                <input type="text" name="username" class="form-control" placeholder="admin" required>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label small fw-semibold">Secure Password</label>
                            <div class="input-group">
                                <span class="input-group-text bg-light text-muted"><i class="bi bi-key"></i></span>
                                <input type="password" name="password" class="form-control" placeholder="••••••••" required>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-dark w-100 py-2 mt-2" style="background-color: #081a2d;">
                            <i class="bi bi-box-arrow-in-right me-1"></i> Authorize & Enter CMS
                        </button>
                    </form>

                    <!-- Default Demonstration Credentials -->
                    <div class="mt-4 p-3 bg-light rounded text-start small border">
                        <div class="fw-bold text-dark mb-1"><i class="bi bi-info-circle-fill text-primary me-1"></i> Default Administrator Credentials:</div>
                        <div class="text-muted">Username: <code>admin</code></div>
                        <div class="text-muted">Password: <code>password123</code></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
