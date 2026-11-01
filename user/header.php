<?php
/**
 * Student Dashboard Header
 */
require_once __DIR__ . '/../config/database.php';

// Auth Protection: Student must be logged in
if (!isset($_SESSION['student_id'])) {
    header("Location: ../login.php");
    exit;
}

// Fetch current student profile
$studentId = $_SESSION['student_id'];
$stmt = $pdo->prepare("SELECT s.*, c.course_name, c.course_code, c.duration, c.annual_fee FROM students s LEFT JOIN courses c ON s.course_id = c.id WHERE s.id = :id");
$stmt->execute([':id' => $studentId]);
$currentUser = $stmt->fetch();

if (!$currentUser) {
    session_destroy();
    header("Location: ../login.php");
    exit;
}

$userCurrentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Portal | <?php echo COLLEGE_SHORT_NAME; ?></title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body class="bg-light">

<!-- Top Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-navy" style="background-color: #0e2a47; border-bottom: 2px solid #c59323;">
    <div class="container-fluid px-lg-4">
        <a class="navbar-brand d-flex align-items-center gap-2" href="index.php">
            <span class="badge bg-warning text-dark fw-bold">STUDENT</span>
            <span class="fw-bold">SDSPM College for Women Portal</span>
        </a>
        <div class="d-flex align-items-center gap-3">
            <a href="../index.php" class="btn btn-sm btn-outline-light d-none d-md-inline-block"><i class="bi bi-globe me-1"></i> Public Website</a>
            <span class="text-light small d-none d-sm-inline">
                <i class="bi bi-person-circle me-1 text-warning"></i> <?php echo htmlspecialchars($currentUser['full_name']); ?> (<?php echo htmlspecialchars($currentUser['roll_no']); ?>)
            </span>
            <a href="../logout.php" class="btn btn-sm btn-danger"><i class="bi bi-box-arrow-right me-1"></i> Logout</a>
        </div>
    </div>
</nav>

<div class="container-fluid px-lg-4 py-4">
    <div class="row g-4">
        <!-- Sidebar Navigation -->
        <div class="col-lg-3 col-md-4">
            <div class="card card-college p-3 border">
                <div class="text-center py-3 border-bottom mb-3">
                    <div class="mx-auto mb-2 text-white bg-primary rounded-circle d-flex align-items-center justify-content-center" style="width: 64px; height: 64px; font-size: 1.5rem;">
                        <i class="bi bi-person-fill"></i>
                    </div>
                    <h6 class="fw-bold mb-0 text-navy"><?php echo htmlspecialchars($currentUser['full_name']); ?></h6>
                    <small class="text-muted d-block"><?php echo htmlspecialchars($currentUser['roll_no']); ?></small>
                    <span class="badge bg-success-subtle text-success mt-1"><?php echo htmlspecialchars($currentUser['status']); ?> Student</span>
                </div>

                <div class="nav flex-column nav-pills gap-1">
                    <a href="index.php" class="nav-link py-2 px-3 rounded <?php echo $userCurrentPage == 'index.php' ? 'active bg-primary text-white' : 'text-dark'; ?>">
                        <i class="bi bi-speedometer2 me-2"></i> Dashboard Overview
                    </a>
                    <a href="courses.php" class="nav-link py-2 px-3 rounded <?php echo $userCurrentPage == 'courses.php' ? 'active bg-primary text-white' : 'text-dark'; ?>">
                        <i class="bi bi-journal-bookmark me-2"></i> My Enrolled Course
                    </a>
                    <a href="notices.php" class="nav-link py-2 px-3 rounded <?php echo $userCurrentPage == 'notices.php' ? 'active bg-primary text-white' : 'text-dark'; ?>">
                        <i class="bi bi-bell me-2"></i> Official Notices
                    </a>
                    <a href="enquiry.php" class="nav-link py-2 px-3 rounded <?php echo $userCurrentPage == 'enquiry.php' ? 'active bg-primary text-white' : 'text-dark'; ?>">
                        <i class="bi bi-chat-left-text me-2"></i> Student Helpdesk
                    </a>
                    <a href="profile.php" class="nav-link py-2 px-3 rounded <?php echo $userCurrentPage == 'profile.php' ? 'active bg-primary text-white' : 'text-dark'; ?>">
                        <i class="bi bi-person-gear me-2"></i> My Profile & Contact
                    </a>
                </div>
            </div>
        </div>

        <!-- Main Content Area -->
        <div class="col-lg-9 col-md-8">
