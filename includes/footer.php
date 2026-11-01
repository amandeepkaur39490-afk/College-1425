<?php
/**
 * Common Footer Component
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */
?>
<footer class="footer-sdspm">
    <div class="container">
        <div class="row g-4">
            <div class="col-lg-4 col-md-6">
                <h5><?php echo COLLEGE_NAME; ?></h5>
                <p class="text-secondary small mb-3">
                    Established in 1974 in sacred memory of martyr Shaheed Darshan Singh Pheruman. Dedicated to rural women's empowerment through holistic, value-based higher education under Guru Nanak Dev University (GNDU), Amritsar.
                </p>
                <div class="small text-secondary">
                    <div><strong class="text-white">Principal:</strong> <?php echo COLLEGE_PRINCIPAL; ?></div>
                    <div><strong class="text-white">Affiliation:</strong> Guru Nanak Dev University (GNDU), Amritsar</div>
                    <div><strong class="text-white">Recognition:</strong> UGC Act 1956 Under Section 2(f) & 12(B)</div>
                </div>
            </div>
            
            <div class="col-lg-2 col-md-6">
                <h5>Quick Links</h5>
                <ul class="list-unstyled small">
                    <li class="mb-2"><a href="about.php">About College & History</a></li>
                    <li class="mb-2"><a href="courses.php">Academic Courses</a></li>
                    <li class="mb-2"><a href="departments.php">Departments</a></li>
                    <li class="mb-2"><a href="faculty.php">Faculty Directory</a></li>
                    <li class="mb-2"><a href="gallery.php">Campus Gallery</a></li>
                    <li class="mb-2"><a href="notices.php">Notices & Circulars</a></li>
                </ul>
            </div>

            <div class="col-lg-3 col-md-6">
                <h5>Student & Staff</h5>
                <ul class="list-unstyled small">
                    <li class="mb-2"><a href="login.php"><i class="bi bi-box-arrow-in-right me-1"></i> Student Login Portal</a></li>
                    <li class="mb-2"><a href="register.php"><i class="bi bi-person-plus me-1"></i> New Student Registration</a></li>
                    <li class="mb-2"><a href="admin-login.php"><i class="bi bi-shield-lock me-1"></i> Administrator Access</a></li>
                    <li class="mb-2"><a href="contact.php"><i class="bi bi-envelope me-1"></i> Admission Helpdesk / Enquiry</a></li>
                </ul>
            </div>

            <div class="col-lg-3 col-md-6">
                <h5>Verified Contact</h5>
                <div class="small text-secondary">
                    <p class="mb-2"><i class="bi bi-geo-alt-fill text-warning me-2"></i> <?php echo COLLEGE_ADDRESS; ?></p>
                    <p class="mb-2"><i class="bi bi-telephone-fill text-warning me-2"></i> Tel: <?php echo COLLEGE_PHONE; ?></p>
                    <p class="mb-2"><i class="bi bi-phone-fill text-warning me-2"></i> Mob: <?php echo COLLEGE_MOBILE; ?></p>
                    <p class="mb-2"><i class="bi bi-envelope-fill text-warning me-2"></i> Email: <?php echo COLLEGE_EMAIL; ?></p>
                    <p class="mb-0"><i class="bi bi-globe text-warning me-2"></i> Official Web: <a href="<?php echo COLLEGE_WEB; ?>" target="_blank" class="text-warning"><?php echo COLLEGE_WEB; ?></a></p>
                </div>
            </div>
        </div>

        <div class="footer-bottom text-center">
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
                <div>&copy; <?php echo date('Y'); ?> <?php echo COLLEGE_NAME; ?>. All rights reserved.</div>
                <div class="mt-2 mt-sm-0 text-secondary">Official Reference: <a href="https://sdspmcollege.org/" target="_blank" class="text-secondary text-decoration-underline">sdspmcollege.org</a></div>
            </div>
        </div>
    </div>
</footer>

<!-- Bootstrap 5 Bundle JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<!-- Project Main JS -->
<script src="assets/js/main.js"></script>
</body>
</html>
