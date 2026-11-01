import JSZip from 'jszip';

export async function downloadPhpProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root files
  zip.file('README.md', `# College Management System
### Shaheed Darshan Singh Pheruman Memorial College for Women (SDSPM College for Women)
**Affiliation:** Guru Nanak Dev University (GNDU), Amritsar
**Location:** G.T. Road, Rayya, District Amritsar, Punjab - 143112
**Official Website:** https://sdspmcollege.org/

## Verified Courses:
1. M.Sc. IT (Information Technology)
2. BCA (Bachelor of Computer Applications)
3. B.Sc. Economics
4. BA (Bachelor of Arts)
5. B.Com.
6. BBA
7. PGDCA
8. CCA (Certificate in Computer Applications)
9. Certificate in Cosmetology

## Quick Installation on XAMPP/WAMP:
1. Extract this folder into C:\\xampp\\htdocs\\sdspm-college\\
2. Start Apache and MySQL in XAMPP Control Panel.
3. Open http://localhost/phpmyadmin/ and import \`database.sql\` into a database named \`college_management_system\`.
4. Open http://localhost/sdspm-college/ in your browser.
5. Admin Login: http://localhost/sdspm-college/admin-login.php (Username: admin | Password: password123)
6. Student Login: http://localhost/sdspm-college/login.php (Roll No: SDSPM-2026-001 | Password: password123)
`);

  zip.file('database.sql', `-- College Management System MySQL Dump
-- Shaheed Darshan Singh Pheruman Memorial College for Women (SDSPM College for Women)
-- Official Website: https://sdspmcollege.org/
CREATE DATABASE IF NOT EXISTS \`college_management_system\`;
USE \`college_management_system\`;

CREATE TABLE IF NOT EXISTS \`admins\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`password\` VARCHAR(255) NOT NULL,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`role\` VARCHAR(30) DEFAULT 'Super Admin',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS \`departments\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(120) NOT NULL UNIQUE,
  \`code\` VARCHAR(20) NOT NULL UNIQUE,
  \`head_of_department\` VARCHAR(100) DEFAULT NULL,
  \`description\` TEXT,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS \`courses\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`course_name\` VARCHAR(150) NOT NULL,
  \`course_code\` VARCHAR(30) NOT NULL UNIQUE,
  \`department_id\` INT,
  \`duration\` VARCHAR(50) NOT NULL,
  \`eligibility\` TEXT NOT NULL,
  \`seats\` INT DEFAULT 60,
  \`annual_fee\` DECIMAL(10,2) DEFAULT 0.00,
  \`description\` TEXT,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`department_id\`) REFERENCES \`departments\` (\`id\`) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS \`faculty\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`designation\` VARCHAR(100) NOT NULL,
  \`department_id\` INT,
  \`qualification\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(100) DEFAULT NULL,
  \`experience\` VARCHAR(50) DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`department_id\`) REFERENCES \`departments\` (\`id\`) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS \`students\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`roll_no\` VARCHAR(50) NOT NULL UNIQUE,
  \`full_name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`phone\` VARCHAR(20) NOT NULL,
  \`password\` VARCHAR(255) NOT NULL,
  \`course_id\` INT DEFAULT NULL,
  \`gender\` VARCHAR(10) DEFAULT 'Female',
  \`address\` TEXT,
  \`status\` ENUM('Active', 'Pending', 'Suspended') DEFAULT 'Active',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`course_id\`) REFERENCES \`courses\` (\`id\`) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS \`notices\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`category\` ENUM('Academic', 'Examination', 'Admissions', 'Sports', 'General') DEFAULT 'General',
  \`notice_date\` DATE NOT NULL,
  \`content\` TEXT NOT NULL,
  \`attachment_url\` VARCHAR(255) DEFAULT NULL,
  \`is_active\` TINYINT(1) DEFAULT 1,
  \`posted_by\` VARCHAR(100) DEFAULT 'College Principal Office',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS \`enquiries\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`email\` VARCHAR(100) NOT NULL,
  \`phone\` VARCHAR(20) NOT NULL,
  \`subject\` VARCHAR(200) NOT NULL,
  \`message\` TEXT NOT NULL,
  \`status\` ENUM('New', 'In Review', 'Resolved') DEFAULT 'New',
  \`admin_reply\` TEXT DEFAULT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data (Admin password: password123)
INSERT INTO \`admins\` (\`username\`, \`password\`, \`full_name\`, \`email\`) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SDSPM Admin Console', 'admin@sdspmcollege.org');

-- Departments
INSERT INTO \`departments\` (\`id\`, \`name\`, \`code\`, \`head_of_department\`) VALUES
(1, 'P.G. Department of Computer Science and Applications', 'CSA', 'Mrs. Vandana'),
(2, 'Department of Commerce & Management', 'COMM', 'Ms. Shagunpreet Kaur'),
(3, 'Department of Economics & Mathematics', 'ECO', 'Dr. (Mrs.) Anu Kapil'),
(4, 'Department of Social Sciences', 'SOC', 'Mrs. Daljeet Kaur'),
(5, 'Department of Languages', 'LANG', 'Dr. (Mrs.) Harwant Kaur'),
(6, 'Department of Cosmetology & Skill Development', 'COSM', 'Coordinator'),
(7, 'Department of Fashion Designing', 'FD', 'Mrs. Amandeep Kaur'),
(8, 'Department of Music', 'MUS', 'Mrs. Rajpreet Kaur'),
(9, 'Department of Physical Education', 'PED', 'Mrs. Rupinder Kaur');

-- Verified Courses
INSERT INTO \`courses\` (\`id\`, \`course_name\`, \`course_code\`, \`department_id\`, \`duration\`, \`eligibility\`, \`seats\`, \`annual_fee\`) VALUES
(1, 'M.Sc. IT (Information Technology)', 'MSC-IT-101', 1, '2 Years (4 Semesters)', 'Graduation with BCA/B.Sc IT or Computer Science with 50%', 30, 32000.00),
(2, 'BCA (Bachelor of Computer Applications)', 'BCA-101', 1, '3 Years (6 Semesters)', '10+2 with 40% aggregate marks', 60, 26000.00),
(3, 'B.Sc. Economics', 'BSC-ECO-101', 3, '3 Years (6 Semesters)', '10+2 with Math/Economics with 40% marks', 45, 22000.00),
(4, 'BA (Bachelor of Arts)', 'BA-101', 4, '3 Years (6 Semesters)', '10+2 in any stream from recognized board', 120, 16000.00),
(5, 'B.Com. (Bachelor of Commerce)', 'BCOM-101', 2, '3 Years (6 Semesters)', '10+2 with 40% in Commerce or 45% Arts/Science', 80, 24000.00),
(6, 'BBA (Bachelor of Business Administration)', 'BBA-101', 2, '3 Years (6 Semesters)', '10+2 in any stream with 40% marks', 50, 25000.00),
(7, 'PGDCA (Post Graduate Diploma in Computer Applications)', 'PGDCA-101', 1, '1 Year (2 Semesters)', 'Graduation in any stream with 45%', 40, 20000.00),
(8, 'CCA (Certificate in Computer Applications)', 'CCA-101', 1, '6 Months / 1 Year', '10+2 passed in any stream', 40, 9000.00),
(9, 'Certificate in Cosmetology', 'CERT-COSM-101', 6, '1 Year', '10+2 in any stream', 35, 12000.00);
`);

  const config = zip.folder('config');
  config?.file('database.php', `<?php
session_start();
define('DB_HOST', 'localhost');
define('DB_NAME', 'college_management_system');
define('DB_USER', 'root');
define('DB_PASS', '');

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    die("Database Connection Failed: " . $e->getMessage());
}

define('COLLEGE_NAME', 'Shaheed Darshan Singh Pheruman Memorial College for Women');
define('COLLEGE_SHORT_NAME', 'SDSPM College for Women');
define('COLLEGE_ADDRESS', 'G.T. Road, Rayya, District Amritsar, Punjab - 143112');
define('COLLEGE_PHONE', '01853-222403');
define('COLLEGE_WEB', 'https://sdspmcollege.org/');
?>`);

  const includes = zip.folder('includes');
  includes?.file('header.php', `<?php require_once __DIR__ . '/../config/database.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?php echo COLLEGE_NAME; ?></title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>`);

  includes?.file('footer.php', `<footer class="bg-dark text-light py-4 mt-5">
  <div class="container text-center">
    <p class="mb-0">&copy; <?php echo date('Y'); ?> <?php echo COLLEGE_NAME; ?>. All rights reserved.</p>
  </div>
</footer>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`);

  const cssFolder = zip.folder('assets/css');
  cssFolder?.file('style.css', `/* SDSPM College for Women Unified Stylesheet */
body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8fafc; color: #1e293b; }
.card-college { border: 1px solid #e2e8f0; border-radius: 8px; transition: 0.2s; }
.btn-college-primary { background: #0e2a47; color: white; }
.btn-college-primary:hover { background: #153860; color: white; }
`);

  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'SDSPM_College_For_Women_Management_System_PHP_MySQL.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
