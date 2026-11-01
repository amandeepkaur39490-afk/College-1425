<?php
/**
 * Database Connection Configuration using PHP PDO
 * Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
 */

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('DB_HOST', 'localhost');
define('DB_NAME', 'college_management_system');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    die("Database Connection Error: Could not connect to the database. Please verify MySQL service status in XAMPP/WAMP. (" . htmlspecialchars($e->getMessage()) . ")");
}

// Global Verified Official College Details (from https://sdspmcollege.org/)
define('COLLEGE_NAME', 'Shaheed Darshan Singh Pheruman Memorial College for Women');
define('COLLEGE_SHORT_NAME', 'SDSPM College for Women');
define('COLLEGE_AFFILIATION', 'Affiliated with Guru Nanak Dev University (GNDU), Amritsar');
define('COLLEGE_ADDRESS', 'G.T. Road, Rayya, District Amritsar, Punjab – 143112, India');
define('COLLEGE_PHONE', '01853-222403');
define('COLLEGE_MOBILE', '+91-9915712336, +91-9646847383');
define('COLLEGE_EMAIL', 'sdspm_college@yahoo.com');
define('COLLEGE_WEB', 'https://sdspmcollege.org/');
define('COLLEGE_ESTD', '1974');
define('COLLEGE_PRINCIPAL', 'Dr. (Mrs.) Anu Kapil (Officiating Principal)');
?>
