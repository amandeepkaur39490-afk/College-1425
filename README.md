# College Management System
### Shaheed Darshan Singh Pheruman Memorial College for Women (SDSPM College for Women)
**Affiliation:** Guru Nanak Dev University (GNDU), Amritsar  
**Established:** 1974  
**Location:** G.T. Road, Rayya, District Amritsar, Punjab – 143112, India  
**Official College Portal:** https://sdspmcollege.org/  
**Officiating Principal:** Dr. (Mrs.) Anu Kapil (M.Sc. Hons., Ph.D., UGC NET)  

---

## 1. Project Overview
This is a complete, lightweight, professional College Management System designed for **Shaheed Darshan Singh Pheruman Memorial College for Women (Rayya, Amritsar)**. It features:
- **Public Institutional Portal:** 10 responsive pages presenting college heritage, courses, academic departments, faculty, activities gallery, notices/announcements, and contact enquiry.
- **Verified Course Offerings:**
  - M.Sc. IT (Information Technology)
  - BCA (Bachelor of Computer Applications)
  - B.Sc. Economics
  - BA (Bachelor of Arts)
  - B.Com.
  - BBA
  - PGDCA
  - CCA (Certificate in Computer Applications)
  - Certificate in Cosmetology
- **Student / User Module:** Registration, secure password hashing (`password_hash`), student dashboard, viewing enrolled course details, tracking latest official notices, submitting enquiries to college administration, and updating profiles.
- **Admin Module:** Secure administrator login, dashboard metrics, full CRUD management for courses, announcements/notices, student directory management, and replying to visitor enquiries.
- **Security:** Built using PHP 8+ with PHP PDO prepared statements against SQL injection, session management, and sanitized inputs.

---

## 2. Technology Stack
- **Frontend:** HTML5, CSS3 (`assets/css/style.css`), JavaScript (`assets/js/main.js`), and Bootstrap 5.
- **Backend:** PHP 8+ with PDO (PHP Data Objects).
- **Database:** MySQL / MariaDB (Database: `college_management_system`).

---

## 3. Directory Structure
```
college-management-system/
├── assets/
│   ├── css/
│   │   └── style.css            # Common unified stylesheet
│   ├── js/
│   │   └── main.js              # Client-side scripts and validations
│   └── images/                  # College photos, campus banners, crest
├── config/
│   └── database.php             # PDO database connection configuration
├── includes/
│   ├── header.php               # Common public HTML head & top bar
│   ├── navbar.php               # Reusable responsive navigation bar
│   └── footer.php               # Common footer with verified college info
├── admin/
│   ├── index.php                # Admin Dashboard with statistics
│   ├── courses.php              # Add / Edit / Delete college courses
│   ├── notices.php              # Add / Edit / Delete announcements
│   ├── students.php             # View and manage registered students
│   ├── enquiries.php            # Review and resolve contact enquiries
│   ├── header.php               # Admin header & sidebar
│   ├── footer.php               # Admin footer
│   └── logout.php               # Admin session termination
├── user/
│   ├── index.php                # Student dashboard
│   ├── profile.php              # Student profile management
│   ├── courses.php              # Enrolled & offered courses catalog
│   ├── notices.php              # Student notice board
│   ├── enquiry.php              # Student contact & grievance submission
│   ├── header.php               # Student portal header
│   ├── footer.php               # Student portal footer
│   └── logout.php               # Student session logout
├── index.php                    # 1. Home Page
├── about.php                    # 2. About Us & Memorial Heritage
├── courses.php                  # 3. Courses (BCA, B.Com, B.Sc. Economics, BBA, BA, PGDCA, Cosmetology, etc.)
├── departments.php              # 4. Academic Departments
├── faculty.php                  # 5. Faculty Directory (Official verified roster)
├── gallery.php                  # 6. Campus & Academic Activities Gallery
├── notices.php                  # 7. Notices & Announcements
├── contact.php                  # 8. Contact Us & Enquiry Submission
├── login.php                    # 9. Student Login
├── register.php                 # Student Registration
├── admin-login.php              # 10. Admin Secure Login
├── logout.php                   # Universal logout handler
├── database.sql                 # Complete MySQL database export
└── README.md                    # Project documentation & instructions
```

---

## 4. Local Installation Guide (XAMPP / WAMP / LAMP)

### Prerequisites:
- PHP 8.0 or newer
- MySQL 5.7+ or MariaDB 10.3+
- Apache Web Server (bundled in XAMPP, WAMP, or MAMP)

### Step 1: Clone or Copy Project
1. Copy the project folder into your server's web root:
   - **XAMPP (Windows):** `C:\xampp\htdocs\sdspm-college\`
   - **WAMP (Windows):** `C:\wamp64\www\sdspm-college\`
   - **LAMP / Linux:** `/var/www/html/sdspm-college/`
   - **MAMP (macOS):** `/Applications/MAMP/htdocs/sdspm-college/`

### Step 2: Database Setup
1. Start **Apache** and **MySQL** in your XAMPP/WAMP Control Panel.
2. Open your browser and navigate to `http://localhost/phpmyadmin/`.
3. Click **New** in the left sidebar to create a database named `college_management_system`.
4. Select `college_management_system`, go to the **Import** tab.
5. Click **Choose File**, select `database.sql` from the project directory, and click **Import** (or **Go**).

### Step 3: Configure Database Connection
Open `config/database.php` in a code editor and verify your database credentials:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', ''); // Default for XAMPP is empty
define('DB_NAME', 'college_management_system');
```

### Step 4: Access the Website
- **Public Portal:** `http://localhost/sdspm-college/`
- **Student Login:** `http://localhost/sdspm-college/login.php`
- **Admin Login:** `http://localhost/sdspm-college/admin-login.php`

---

## 5. Default Demonstration Credentials

| Role | Username / Identifier | Password | Access URL |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin` | `password123` | `/admin-login.php` |
| **Student** | `SDSPM-2026-001` (or email `simran.kaur@example.com`) | `password123` | `/login.php` |

*(You can also register a new student account instantly through `register.php`)*
