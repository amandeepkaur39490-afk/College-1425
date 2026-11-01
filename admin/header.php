<?php
/**
 * Administrator Console Header
 */
require_once __DIR__ . '/../config/database.php';

// Auth Protection: Admin must be logged in
if (!isset($_SESSION['admin_id'])) {
    header("Location: ../admin-login.php");
    exit;
}

$adminCurrentPage = basename($_SERVER['PHP_SELF']);
$adminName = $_SESSION['admin_name'] ?? 'Administrator';
$adminRole = $_SESSION['admin_role'] ?? 'Super Admin';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin CMS | <?php echo COLLEGE_SHORT_NAME; ?></title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body class="bg-light">

<!-- Top Admin Bar -->
<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #081a2d; border-bottom: 2px solid #c59323;">
    <div class="container-fluid px-lg-4">
        <a class="navbar-brand d-flex align-items-center gap-2" href="index.php">
            <span class="badge bg-warning text-dark fw-bold">ADMIN</span>
            <span class="fw-bold">SDSPM College for Women CMS</span>
        </a>
        <div class="d-flex align-items-center gap-3">
            <a href="../index.php" class="btn btn-sm btn-outline-light d-none d-md-inline-block" target="_blank">
                <i class="bi bi-box-arrow-up-right me-1"></i> Public Website
            </a>
            <span class="text-light small d-none d-sm-inline">
                <i class="bi bi-shield-check text-warning me-1"></i> <?php echo htmlspecialchars($adminName); ?> (<?php echo htmlspecialchars($adminRole); ?>)
            </span>
            <a href="logout.php" class="btn btn-sm btn-danger"><i class="bi bi-box-arrow-right me-1"></i> Logout</a>
        </div>
    </div>
</nav>

<div class="container-fluid px-lg-4 py-4">
    <div class="row g-4">
        <!-- Admin Navigation Sidebar -->
        <div class="col-lg-2 col-md-3">
            <div class="card card-college p-3 border">
                <div class="text-center py-2 border-bottom mb-3">
                    <div class="mx-auto mb-2 text-white bg-dark rounded-circle d-flex align-items-center justify-content-center" style="width: 52px; height: 52px; font-size: 1.3rem;">
                        <i class="bi bi-person-gear text-warning"></i>
                    </div>
                    <h6 class="fw-bold mb-0 text-navy" style="font-size: 0.9rem;"><?php echo htmlspecialchars($adminName); ?></h6>
                    <small class="text-muted d-block" style="font-size: 0.75rem;">System Controller</small>
                </div>

                <div class="nav flex-column nav-pills gap-1">
                    <a href="index.php" class="nav-link py-2 px-3 rounded <?php echo $adminCurrentPage == 'index.php' ? 'active bg-dark text-white' : 'text-dark'; ?>">
                        <i class="bi bi-speedometer2 me-2"></i> Dashboard
                    </a>
                    <a href="courses.php" class="nav-link py-2 px-3 rounded <?php echo $adminCurrentPage == 'courses.php' ? 'active bg-dark text-white' : 'text-dark'; ?>">
                        <i class="bi bi-journal-plus me-2"></i> Manage Courses
                    </a>
                    <a href="notices.php" class="nav-link py-2 px-3 rounded <?php echo $adminCurrentPage == 'notices.php' ? 'active bg-dark text-white' : 'text-dark'; ?>">
                        <i class="bi bi-megaphone me-2"></i> Manage Notices
                    </a>
                    <a href="students.php" class="nav-link py-2 px-3 rounded <?php echo $adminCurrentPage == 'students.php' ? 'active bg-dark text-white' : 'text-dark'; ?>">
                        <i class="bi bi-people me-2"></i> Student Accounts
                    </a>
                    <a href="enquiries.php" class="nav-link py-2 px-3 rounded <?php echo $adminCurrentPage == 'enquiries.php' ? 'active bg-dark text-white' : 'text-dark'; ?>">
                        <i class="bi bi-envelope-paper me-2"></i> Enquiries & Leads
                    </a>
                </div>
            </div>
        </div>

        <!-- Admin Main Content Area -->
        <div class="col-lg-10 col-md-9">
