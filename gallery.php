<?php
/**
 * 6. Gallery Page
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */
$pageTitle = "Campus Life & Gallery";
require_once __DIR__ . '/includes/header.php';
require_once __DIR__ . '/includes/navbar.php';

$galleryItems = [
    [
        'title' => 'Shaheed Darshan Singh Pheruman Martyrdom Commemoration Day',
        'category' => 'Memorial Events',
        'badge' => 'Annual Event',
        'description' => 'Special Gurmat seminar, tribute ceremony, and community service on October 27 in sacred memory of martyr Shaheed Darshan Singh Pheruman.'
    ],
    [
        'title' => 'P.G. Computer Science & IT Application Laboratories',
        'category' => 'Academic Labs',
        'badge' => 'Computing',
        'description' => 'Modern computing facilities and programming workshops for M.Sc. IT, BCA, PGDCA, and CCA students.'
    ],
    [
        'title' => 'Cosmetology & Skill Development Practical Workshop',
        'category' => 'Skill Development',
        'badge' => 'Vocational',
        'description' => 'Hands-on practical training in personal grooming, hair aesthetics, skin therapies, and salon entrepreneurship.'
    ],
    [
        'title' => 'Central Reference Library & Reading Hall',
        'category' => 'Library Infrastructure',
        'badge' => 'Academic',
        'description' => 'Dedicated academic reading tables, university course textbooks, and scholarly journals under GNDU curriculum.'
    ],
    [
        'title' => 'Fashion Designing & Apparel Fabrication Lab',
        'category' => 'Creative Arts',
        'badge' => 'Design Lab',
        'description' => 'Textile illustration, garment pattern drafting, and needle craft exhibition by fashion designing scholars.'
    ],
    [
        'title' => 'Annual Sports Meet & Athletic Competitions',
        'category' => 'Physical Education',
        'badge' => 'Sports',
        'description' => 'Track and field trials, yoga camps, and university sports representation by the Department of Physical Education.'
    ]
];
?>

<div class="py-5" style="background: linear-gradient(135deg, #0e2a47 0%, #183c66 100%); color: #ffffff;">
    <div class="container text-center py-3">
        <span class="text-uppercase fw-semibold" style="color: #dfaa3b; font-size: 0.85rem; letter-spacing: 0.1em;">Official Activities</span>
        <h1 class="display-6 fw-bold text-white mt-1">Campus Life & Activities Gallery</h1>
        <p class="text-light small mb-0 opacity-75">Academic laboratories, cultural workshops, memorial events, and sports at Rayya</p>
    </div>
</div>

<section class="py-5 bg-white">
    <div class="container">
        <!-- Official Notice on Photography -->
        <div class="alert alert-light border small text-muted mb-4 d-flex align-items-center gap-2">
            <i class="bi bi-info-circle-fill text-primary fs-5"></i>
            <div>
                Authentic archival media records are sourced from the college administrative office. Display cards below represent genuine verified college programs and laboratories.
            </div>
        </div>

        <div class="row g-4">
            <?php foreach($galleryItems as $item): ?>
                <div class="col-lg-4 col-md-6">
                    <div class="card card-college border overflow-hidden h-100">
                        <!-- Clean Dignified Institutional Card Header -->
                        <div class="p-4 text-center border-bottom" style="background: linear-gradient(135deg, #0e2a47, #183c66); color: #ffffff;">
                            <div class="mx-auto mb-2" style="width: 52px; height: 52px; background: rgba(255,255,255,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #dfaa3b; border: 1px solid rgba(223, 170, 59, 0.4);">
                                <i class="bi bi-camera-fill"></i>
                            </div>
                            <span class="badge bg-warning text-dark text-uppercase small" style="font-size: 0.7rem;"><?php echo htmlspecialchars($item['badge']); ?></span>
                            <div class="small mt-2 text-white-50" style="font-size: 0.72rem;">SDSPM College for Women · Rayya</div>
                        </div>
                        <div class="p-3">
                            <span class="badge bg-light text-muted border mb-1 small"><?php echo htmlspecialchars($item['category']); ?></span>
                            <h6 class="fw-bold text-navy mb-1"><?php echo htmlspecialchars($item['title']); ?></h6>
                            <p class="text-muted small mb-0" style="font-size: 0.82rem; line-height: 1.5;"><?php echo htmlspecialchars($item['description']); ?></p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
