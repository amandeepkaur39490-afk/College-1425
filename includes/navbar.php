<?php
/**
 * Navigation Bar Component
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<nav class="navbar navbar-expand-lg navbar-sdspm sticky-top">
    <div class="container">
        <a class="navbar-brand" href="index.php">
            <div class="college-logo-badge">
                <i class="bi bi-mortarboard-fill"></i>
            </div>
            <div>
                <div class="college-brand-title fs-5 mb-0 leading-tight">SDSPM College for Women</div>
                <div class="text-muted small d-none d-sm-block" style="font-size: 0.72rem;">Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya</div>
            </div>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#sdspmNavbar" aria-controls="sdspmNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="sdspmNavbar">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
                <li class="nav-item">
                    <a class="nav-link <?php echo $currentPage == 'index.php' ? 'active' : ''; ?>" href="index.php">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $currentPage == 'about.php' ? 'active' : ''; ?>" href="about.php">About Us</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $currentPage == 'courses.php' ? 'active' : ''; ?>" href="courses.php">Courses</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $currentPage == 'departments.php' ? 'active' : ''; ?>" href="departments.php">Departments</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $currentPage == 'faculty.php' ? 'active' : ''; ?>" href="faculty.php">Faculty</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $currentPage == 'gallery.php' ? 'active' : ''; ?>" href="gallery.php">Gallery</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $currentPage == 'notices.php' ? 'active' : ''; ?>" href="notices.php">Notices</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link <?php echo $currentPage == 'contact.php' ? 'active' : ''; ?>" href="contact.php">Contact Us</a>
                </li>
                <li class="nav-item ms-lg-2 mt-2 mt-lg-0">
                    <?php if(isset($_SESSION['student_id'])): ?>
                        <a href="user/index.php" class="btn btn-sm btn-college-primary">Dashboard</a>
                    <?php elseif(isset($_SESSION['admin_id'])): ?>
                        <a href="admin/index.php" class="btn btn-sm btn-college-primary">Admin CMS</a>
                    <?php else: ?>
                        <a href="login.php" class="btn btn-sm btn-college-outline">Student Portal</a>
                    <?php endif; ?>
                </li>
            </ul>
        </div>
    </div>
</nav>
