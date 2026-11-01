<?php
/**
 * 5. Faculty Directory Page
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */
$pageTitle = "Faculty Directory";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

try {
    $stmt = $pdo->query("SELECT f.*, d.name as department_name FROM faculty f LEFT JOIN departments d ON f.department_id = d.id ORDER BY f.id ASC");
    $faculties = $stmt->fetchAll();
} catch (Exception $e) {
    $faculties = [];
}
?>

<div class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #183c66 100%); color: #ffffff;">
    <div class="container text-center py-3">
        <span class="text-uppercase fw-semibold" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">Teaching Faculty</span>
        <h1 class="display-6 fw-bold text-white mt-1">Faculty & Academic Mentors</h1>
        <p class="text-light small mb-0 opacity-75">Verified teaching staff and academic leadership of SDSPM College for Women (source: sdspmcollege.org)</p>
    </div>
</div>

<section class="py-5 bg-white">
    <div class="container">
        <!-- Principal Highlight Card -->
        <div class="card card-college p-4 p-md-5 border mb-5 bg-light">
            <div class="row align-items-center g-4">
                <div class="col-md-3 text-center">
                    <div class="mx-auto" style="width: 90px; height: 90px; border-radius: 50%; background: #0e2a47; color: #c59323; display: flex; align-items: center; justify-content: center; font-size: 2.2rem; border: 2px solid #c59323;">
                        <i class="bi bi-person-fill"></i>
                    </div>
                </div>
                <div class="col-md-9">
                    <span class="badge bg-primary text-uppercase mb-1">College Leadership</span>
                    <h3 class="fw-bold text-navy mb-1">Dr. (Mrs.) Anu Kapil</h3>
                    <div class="text-primary fw-semibold mb-2">Officiating Principal & Associate Professor in Economics</div>
                    <div class="small text-muted mb-2">
                        <strong>Qualifications:</strong> M.Sc. (Hons.), Ph.D., UGC NET
                    </div>
                    <p class="text-muted small mb-0" style="line-height: 1.6;">
                        "Welcome to Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya. Our aim is to foster holistic character development, academic dedication, and vocational independence among our young women scholars."
                    </p>
                </div>
            </div>
        </div>

        <!-- Faculty Directory Cards -->
        <h4 class="fw-bold text-navy mb-3"><i class="bi bi-people-fill text-primary me-2"></i>Departmental Teaching Roster</h4>
        <div class="row g-4">
            <?php foreach($faculties as $fac): ?>
                <div class="col-lg-3 col-md-6">
                    <div class="card card-college p-4 h-100 border text-center">
                        <div class="mx-auto mb-3" style="width: 64px; height: 64px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #0e2a47;">
                            <i class="bi bi-person"></i>
                        </div>
                        <h6 class="fw-bold mb-1 text-navy"><?php echo htmlspecialchars($fac['name']); ?></h6>
                        <div class="text-primary small fw-semibold mb-1" style="font-size: 0.8rem;"><?php echo htmlspecialchars($fac['designation']); ?></div>
                        <div class="text-muted small mb-2" style="font-size: 0.75rem;"><?php echo htmlspecialchars($fac['department_name'] ?? 'Faculty'); ?></div>
                        
                        <div class="mt-auto pt-3 border-top small text-muted text-start" style="font-size: 0.75rem;">
                            <div><i class="bi bi-mortarboard me-1 text-primary"></i> <?php echo htmlspecialchars($fac['qualification']); ?></div>
                            <?php if(!empty($fac['experience'])): ?>
                                <div class="mt-1"><i class="bi bi-briefcase me-1 text-secondary"></i> <?php echo htmlspecialchars($fac['experience']); ?></div>
                            <?php endif; ?>
                            <?php if(!empty($fac['email'])): ?>
                                <div class="mt-1 text-truncate"><i class="bi bi-envelope me-1 text-secondary"></i> <?php echo htmlspecialchars($fac['email']); ?></div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
