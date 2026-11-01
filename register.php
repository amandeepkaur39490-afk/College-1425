<?php
/**
 * Student Registration Page
 * Shaheed Darshan Singh Pheruman Memorial College
 */
$pageTitle = "Student Registration";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

$successMsg = '';
$errorMsg = '';

// Load active courses for dropdown
try {
    $stmtC = $pdo->query("SELECT id, course_name, course_code FROM courses ORDER BY course_name ASC");
    $availableCourses = $stmtC->fetchAll();
} catch (Exception $e) {
    $availableCourses = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = trim($_POST['full_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $courseId = !empty($_POST['course_id']) ? (int)$_POST['course_id'] : null;
    $gender = trim($_POST['gender'] ?? 'Female');
    $address = trim($_POST['address'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirm_password'] ?? '';

    if (empty($fullName) || empty($email) || empty($phone) || empty($password)) {
        $errorMsg = "Please fill in all mandatory fields.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMsg = "Please enter a valid email address.";
    } elseif (strlen($password) < 6) {
        $errorMsg = "Password must be at least 6 characters long.";
    } elseif ($password !== $confirmPassword) {
        $errorMsg = "Passwords do not match.";
    } else {
        try {
            // Check if email already registered
            $checkStmt = $pdo->prepare("SELECT id FROM students WHERE email = :email");
            $checkStmt->execute([':email' => $email]);
            if ($checkStmt->fetch()) {
                $errorMsg = "An account with this email address already exists. Please login instead.";
            } else {
                // Generate a collegiate roll number, e.g. SDSPM-2026-XXX
                $countStmt = $pdo->query("SELECT COUNT(*) FROM students");
                $totalExisting = $countStmt->fetchColumn();
                $rollNo = "SDSPM-2026-" . str_pad($totalExisting + 1, 3, '0', STR_PAD_LEFT);

                // Hash password securely
                $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

                $insertStmt = $pdo->prepare("INSERT INTO students (roll_no, full_name, email, phone, password, course_id, gender, address, status) VALUES (:roll_no, :full_name, :email, :phone, :password, :course_id, :gender, :address, 'Active')");
                $insertStmt->execute([
                    ':roll_no' => $rollNo,
                    ':full_name' => $fullName,
                    ':email' => $email,
                    ':phone' => $phone,
                    ':password' => $hashedPassword,
                    ':course_id' => $courseId,
                    ':gender' => $gender,
                    ':address' => $address
                ]);

                $successMsg = "Registration successful! Your official College Roll Number is: <strong>$rollNo</strong>. You can now log in.";
            }
        } catch (Exception $e) {
            $errorMsg = "Registration failed due to a system error. Please try again. (" . htmlspecialchars($e->getMessage()) . ")";
        }
    }
}
?>

<div class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #183c66 100%); color: #ffffff;">
    <div class="container text-center py-3">
        <span class="text-uppercase fw-semibold" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">Admissions</span>
        <h1 class="display-6 fw-bold text-white mt-1">Student Registration</h1>
        <p class="text-light small mb-0 opacity-75">Create your student profile for the academic session at SDSPM College</p>
    </div>
</div>

<section class="py-5 bg-white">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card card-college p-4 p-md-5 border shadow-sm">
                    <h4 class="fw-bold text-navy mb-1">New Student Enrollment</h4>
                    <p class="text-muted small mb-4">Complete the enrollment form. Once registered, you will be allocated a student roll number.</p>

                    <?php if(!empty($successMsg)): ?>
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <i class="bi bi-check-circle-fill me-2"></i> <?php echo $successMsg; ?>
                            <div class="mt-2">
                                <a href="login.php" class="btn btn-sm btn-success">Proceed to Login</a>
                            </div>
                        </div>
                    <?php endif; ?>

                    <?php if(!empty($errorMsg)): ?>
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <i class="bi bi-exclamation-triangle-fill me-2"></i> <?php echo htmlspecialchars($errorMsg); ?>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    <?php endif; ?>

                    <form action="register.php" method="POST" class="needs-validation" novalidate>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Full Legal Name <span class="text-danger">*</span></label>
                                <input type="text" name="full_name" class="form-control" placeholder="As per matriculation certificate" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Email Address <span class="text-danger">*</span></label>
                                <input type="email" name="email" class="form-control" placeholder="name@example.com" required>
                            </div>

                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Contact Mobile <span class="text-danger">*</span></label>
                                <input type="tel" name="phone" class="form-control" placeholder="10-digit mobile number" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Gender</label>
                                <select name="gender" class="form-select">
                                    <option value="Female" selected>Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div class="col-12">
                                <label class="form-label small fw-semibold">Intended Course / Program</label>
                                <select name="course_id" class="form-select">
                                    <option value="">-- Select Degree or Diploma Program --</option>
                                    <?php foreach($availableCourses as $course): ?>
                                        <option value="<?php echo $course['id']; ?>">
                                            <?php echo htmlspecialchars($course['course_name']); ?> (<?php echo htmlspecialchars($course['course_code']); ?>)
                                        </option>
                                    <?php endforeach; ?>
                                </select>
                            </div>

                            <div class="col-12">
                                <label class="form-label small fw-semibold">Residential Postal Address</label>
                                <textarea name="address" class="form-control" rows="2" placeholder="House/Village, Post Office, Tehsil, District, PIN"></textarea>
                            </div>

                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Create Password <span class="text-danger">*</span></label>
                                <input type="password" name="password" class="form-control" placeholder="Minimum 6 characters" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Confirm Password <span class="text-danger">*</span></label>
                                <input type="password" name="confirm_password" class="form-control" placeholder="Re-enter password" required>
                            </div>

                            <div class="col-12 mt-4">
                                <button type="submit" class="btn btn-college-primary w-100 py-2">
                                    <i class="bi bi-person-check-fill me-1"></i> Complete Student Registration
                                </button>
                            </div>
                        </div>
                    </form>

                    <div class="mt-4 pt-3 border-top text-center small text-muted">
                        Already have an account? <a href="login.php" class="fw-semibold text-primary">Sign In here</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
