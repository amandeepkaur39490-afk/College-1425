<?php
/**
 * 4. Departments Page
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */
$pageTitle = "Academic Departments";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

try {
    $stmt = $pdo->query("SELECT d.*, COUNT(c.id) as total_courses FROM departments d LEFT JOIN courses c ON d.id = c.department_id GROUP BY d.id ORDER BY d.id ASC");
    $departments = $stmt->fetchAll();
} catch (Exception $e) {
    $departments = [];
}
?>

<div class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #183c66 100%); color: #ffffff;">
    <div class="container text-center py-3">
        <span class="text-uppercase fw-semibold" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">Academic Framework</span>
        <h1 class="display-6 fw-bold text-white mt-1">College Departments</h1>
        <p class="text-light small mb-0 opacity-75">Specialized academic departments at SDSPM College for Women verified from sdspmcollege.org</p>
    </div>
</div>

<section class="py-5 bg-white">
    <div class="container">
        <div class="row g-4">
            <?php foreach($departments as $dept): ?>
                <div class="col-lg-6">
                    <div class="card card-college p-4 h-100 border">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <span class="badge bg-primary-subtle text-primary mb-1">Code: <?php echo htmlspecialchars($dept['code']); ?></span>
                                <h4 class="fw-bold text-navy mb-1"><?php echo htmlspecialchars($dept['name']); ?></h4>
                            </div>
                            <span class="badge bg-light text-dark border">
                                <?php echo $dept['total_courses']; ?> Program<?php echo $dept['total_courses'] != 1 ? 's' : ''; ?>
                            </span>
                        </div>
                        
                        <p class="text-muted small mb-3">
                            <?php echo htmlspecialchars($dept['description'] ?? ''); ?>
                        </p>

                        <div class="mt-auto pt-3 border-top d-flex flex-wrap justify-content-between align-items-center small">
                            <div>
                                <i class="bi bi-person-badge text-muted me-1"></i>
                                <span class="text-muted">Head / In-charge: </span>
                                <strong><?php echo htmlspecialchars($dept['head_of_department'] ?? 'Department Faculty'); ?></strong>
                            </div>
                            <div class="mt-2 mt-sm-0">
                                <a href="courses.php?dept=<?php echo $dept['id']; ?>" class="btn btn-sm btn-outline-secondary">View Courses &rarr;</a>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
