<?php
/**
 * Common Header File
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */
require_once __DIR__ . '/../config/database.php';
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($pageTitle) ? htmlspecialchars($pageTitle) . ' | ' . COLLEGE_SHORT_NAME : COLLEGE_NAME; ?></title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <!-- Custom Unified Stylesheet -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

<!-- Top Information Ribbon -->
<div class="top-bar-utility">
    <div class="container d-flex flex-wrap justify-content-between align-items-center">
        <div>
            <span class="me-3"><i class="bi bi-geo-alt me-1"></i> G.T. Road, Rayya, Amritsar (Punjab) - 143112</span>
            <span class="d-none d-md-inline"><i class="bi bi-telephone me-1"></i> <?php echo COLLEGE_PHONE; ?></span>
        </div>
        <div class="d-flex align-items-center gap-3">
            <span class="d-none d-lg-inline text-warning"><i class="bi bi-award me-1"></i> Affiliated with GNDU Amritsar (Estd. 1974)</span>
            <?php if(isset($_SESSION['student_id'])): ?>
                <a href="user/index.php" class="text-white"><i class="bi bi-person-circle me-1"></i> Student Portal</a>
                <a href="logout.php"><i class="bi bi-box-arrow-right me-1"></i> Logout</a>
            <?php elseif(isset($_SESSION['admin_id'])): ?>
                <a href="admin/index.php" class="text-white"><i class="bi bi-speedometer2 me-1"></i> Admin CMS</a>
                <a href="admin/logout.php"><i class="bi bi-box-arrow-right me-1"></i> Logout</a>
            <?php else: ?>
                <a href="login.php"><i class="bi bi-box-arrow-in-right me-1"></i> Student Login</a>
                <span class="text-secondary">|</span>
                <a href="admin-login.php"><i class="bi bi-shield-lock me-1"></i> Admin Portal</a>
            <?php endif; ?>
        </div>
    </div>
</div>
