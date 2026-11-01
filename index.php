<?php
/**
 * 1. Home Page
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */
$pageTitle = "Home";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

// Fetch latest active notices
try {
    $stmt = $pdo->query("SELECT * FROM notices WHERE is_active = 1 ORDER BY notice_date DESC LIMIT 4");
    $recentNotices = $stmt->fetchAll();
} catch (Exception $e) {
    $recentNotices = [];
}

// Fetch featured courses (strictly from verified database courses)
try {
    $stmtCourses = $pdo->query("SELECT c.*, d.name as department_name FROM courses c LEFT JOIN departments d ON c.department_id = d.id LIMIT 6");
    $featuredCourses = $stmtCourses->fetchAll();
} catch (Exception $e) {
    $featuredCourses = [];
}
?>

<!-- Hero Banner Section -->
<section class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #153860 100%); color: #ffffff;">
    <div class="container py-lg-4">
        <div class="row align-items-center g-5">
            <div class="col-lg-7">
                <span class="text-uppercase fw-semibold tracking-wide" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">
                    Estd. 1974 · Affiliated with Guru Nanak Dev University (GNDU), Amritsar
                </span>
                <h1 class="display-6 fw-bold text-white mt-2 mb-3">
                    Shaheed Darshan Singh Pheruman Memorial College for Women
                </h1>
                <p class="lead text-light mb-4" style="font-size: 1.05rem; opacity: 0.92; line-height: 1.6;">
                    Rayya, District Amritsar. A pioneer rural institution dedicated to women's empowerment through value-based higher education, academic excellence, self-reliance, and vocational competencies.
                </p>
                <div class="d-flex flex-wrap gap-3">
                    <a href="courses.php" class="btn btn-college-gold">Academic Courses</a>
                    <a href="about.php" class="btn btn-outline-light">College History & Vision</a>
                    <a href="register.php" class="btn btn-light text-dark fw-semibold">New Student Admission</a>
                </div>
                <div class="mt-4 pt-3 border-top border-secondary d-flex flex-wrap gap-4 text-light small">
                    <div><i class="bi bi-award text-warning me-1"></i> GNDU Amritsar Affiliated</div>
                    <div><i class="bi bi-shield-check text-warning me-1"></i> UGC 2(f) & 12(B) Approved</div>
                    <div><i class="bi bi-person-check text-warning me-1"></i> Rural Women's Empowerment</div>
                </div>
            </div>
            <div class="col-lg-5">
                <!-- Clean Authentic Institutional Graphic Placeholder -->
                <div class="card border-0 shadow-lg overflow-hidden rounded-3 bg-white text-dark">
                    <div class="p-4 text-center border-bottom" style="background: #f8fafc;">
                        <div class="mx-auto mb-3" style="width: 72px; height: 72px; background: #0e2a47; color: #c59323; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; border: 2px solid #c59323;">
                            <i class="bi bi-mortarboard-fill"></i>
                        </div>
                        <h5 class="fw-bold text-navy mb-1">SDSPM College for Women</h5>
                        <p class="text-muted small mb-0">Grand Trunk (G.T.) Road, Rayya, Amritsar – 143112</p>
                    </div>
                    <div class="p-3 bg-light text-center small text-muted">
                        <span class="badge bg-warning-subtle text-dark border me-1"><i class="bi bi-shield-lock me-1"></i>Official Institutional Campus</span>
                        <div class="mt-2 text-dark font-monospace" style="font-size: 0.78rem;">
                            Officiating Principal: <strong>Dr. (Mrs.) Anu Kapil</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Latest Notices Ticker Bar -->
<section class="bg-light border-bottom py-3">
    <div class="container">
        <div class="row align-items-center">
            <div class="col-auto">
                <span class="badge bg-danger text-uppercase px-3 py-2 fw-bold"><i class="bi bi-megaphone-fill me-1"></i> Notice Board</span>
            </div>
            <div class="col">
                <div class="d-flex flex-wrap gap-4 align-items-center text-truncate">
                    <?php if (!empty($recentNotices)): ?>
                        <?php foreach($recentNotices as $notice): ?>
                            <a href="notices.php" class="text-decoration-none text-dark small fw-medium">
                                <span class="text-muted">[<?php echo date('d M Y', strtotime($notice['notice_date'])); ?>]</span>
                                <?php echo htmlspecialchars($notice['title']); ?>
                            </a>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <span class="small text-muted">No notices at this moment. Check back soon.</span>
                    <?php endif; ?>
                </div>
            </div>
            <div class="col-auto">
                <a href="notices.php" class="text-decoration-none small fw-semibold text-primary">All Notices <i class="bi bi-arrow-right"></i></a>
            </div>
        </div>
    </div>
</section>

<!-- Institutional Core Pillars -->
<section class="py-5 bg-white">
    <div class="container">
        <div class="text-center max-w-xl mx-auto mb-5">
            <span class="text-uppercase fw-semibold text-muted small">Academic Infrastructure & Pedagogy</span>
            <h2 class="fw-bold mt-1">Institutional Facilities at Rayya</h2>
            <p class="text-muted small">Providing holistic facilities designed for academic excellence and women's self-reliance.</p>
        </div>

        <div class="row g-4">
            <div class="col-md-4">
                <div class="card card-college p-4 h-100 border">
                    <div class="fs-1 text-primary mb-3"><i class="bi bi-laptop"></i></div>
                    <h5 class="fw-bold">P.G. Computer Science & IT Labs</h5>
                    <p class="text-muted small">
                        State-of-the-art computing laboratories equipped with high-speed Internet, software programming environments for M.Sc. IT, BCA, PGDCA, and CCA.
                    </p>
                    <a href="departments.php" class="text-decoration-none small fw-semibold mt-auto">Department Details &rarr;</a>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card card-college p-4 h-100 border">
                    <div class="fs-1 text-primary mb-3"><i class="bi bi-scissors"></i></div>
                    <h5 class="fw-bold">Cosmetology & Skill Development</h5>
                    <p class="text-muted small">
                        Specialized vocational laboratory offering hands-on training in beauty aesthetics, skin wellness, and cosmetology fostering self-employment.
                    </p>
                    <a href="courses.php" class="text-decoration-none small fw-semibold mt-auto">Certificate in Cosmetology &rarr;</a>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card card-college p-4 h-100 border">
                    <div class="fs-1 text-primary mb-3"><i class="bi bi-book-half"></i></div>
                    <h5 class="fw-bold">Central Library & Reading Hall</h5>
                    <p class="text-muted small">
                        Extensive collection of syllabi textbooks, reference volumes, research journals, periodicals, and newspapers under GNDU curriculum.
                    </p>
                    <a href="about.php" class="text-decoration-none small fw-semibold mt-auto">Campus Facilities &rarr;</a>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Featured Courses (Strictly from verified database) -->
<section class="py-5 bg-light">
    <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-4">
            <div>
                <span class="text-uppercase fw-semibold text-muted small">Programs Offered</span>
                <h2 class="fw-bold mt-1">Academic Degree & Certificate Courses</h2>
            </div>
            <a href="courses.php" class="btn btn-college-outline btn-sm">All Courses</a>
        </div>

        <div class="row g-4">
            <?php foreach($featuredCourses as $course): ?>
                <div class="col-lg-4 col-md-6">
                    <div class="card card-college h-100 p-4 border bg-white">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <span class="badge bg-light text-dark border"><?php echo htmlspecialchars($course['course_code']); ?></span>
                            <span class="small text-muted"><i class="bi bi-clock me-1"></i><?php echo htmlspecialchars($course['duration']); ?></span>
                        </div>
                        <h5 class="fw-bold mb-2 text-navy"><?php echo htmlspecialchars($course['course_name']); ?></h5>
                        <p class="text-muted small mb-3"><?php echo htmlspecialchars(substr($course['description'] ?? '', 0, 110)) . '...'; ?></p>
                        <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center small">
                            <span class="text-muted">Seats: <strong><?php echo $course['seats']; ?></strong></span>
                            <a href="courses.php" class="fw-semibold text-decoration-none">Details &rarr;</a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
