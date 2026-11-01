import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Building2,
  BookOpen,
  Users,
  Bell,
  Phone,
  Shield,
  LogIn,
  LogOut,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  MapPin,
  Mail,
  FileText,
  ArrowRight,
  Clock,
  Award,
  Send,
  ChevronRight,
  Menu,
  X,
  UserCheck,
  Laptop,
  Sparkles,
  Scissors,
  BookmarkCheck,
  RotateCcw
} from 'lucide-react';
import {
  COLLEGE_DETAILS,
  initialDepartments,
  initialCourses,
  initialFaculty,
  initialNotices,
  initialStudents,
  initialEnquiries,
  Course,
  Notice,
  Student,
  Enquiry
} from './data/collegeData';

const getStored = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core CMS Data States (Connected & Synchronized with Persistent LocalStorage)
  const [courses, setCourses] = useState<Course[]>(() => getStored('sdspm_courses', initialCourses));
  const [notices, setNotices] = useState<Notice[]>(() => getStored('sdspm_notices', initialNotices));
  const [students, setStudents] = useState<Student[]>(() => getStored('sdspm_students', initialStudents));
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => getStored('sdspm_enquiries', initialEnquiries));
  const [departments] = useState(initialDepartments);
  const [faculty] = useState(initialFaculty);

  // Authentication States (Persistent across page reloads)
  const [currentStudent, setCurrentStudent] = useState<Student | null>(() => getStored('sdspm_current_student', null));
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => getStored('sdspm_is_admin_logged_in', false));

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('sdspm_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('sdspm_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('sdspm_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('sdspm_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    if (currentStudent) {
      localStorage.setItem('sdspm_current_student', JSON.stringify(currentStudent));
    } else {
      localStorage.removeItem('sdspm_current_student');
    }
  }, [currentStudent]);

  useEffect(() => {
    localStorage.setItem('sdspm_is_admin_logged_in', JSON.stringify(isAdminLoggedIn));
  }, [isAdminLoggedIn]);

  // Reset to original factory seed data
  const resetToFactorySeed = () => {
    if (confirm('Reset all courses, notices, students, and enquiries back to official verified seed data?')) {
      setCourses(initialCourses);
      setNotices(initialNotices);
      setStudents(initialStudents);
      setEnquiries(initialEnquiries);
      localStorage.removeItem('sdspm_courses');
      localStorage.removeItem('sdspm_notices');
      localStorage.removeItem('sdspm_students');
      localStorage.removeItem('sdspm_enquiries');
    }
  };

  // UI Filter / Search States
  const [courseDeptFilter, setCourseDeptFilter] = useState<number>(0);
  const [noticeCategoryFilter, setNoticeCategoryFilter] = useState<string>('All');
  const [noticeSearch, setNoticeSearch] = useState<string>('');

  // Course Admin Modal / Form State
  const [courseFormOpen, setCourseFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseFormData, setCourseFormData] = useState({
    course_name: '',
    course_code: '',
    department_id: 1,
    duration: '3 Years (6 Semesters)',
    eligibility: '',
    seats: 60,
    annual_fee: 25000,
    description: ''
  });

  // Notice Admin Modal / Form State
  const [noticeFormOpen, setNoticeFormOpen] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [noticeFormData, setNoticeFormData] = useState({
    title: '',
    category: 'General' as Notice['category'],
    notice_date: new Date().toISOString().split('T')[0],
    content: '',
    attachment_url: '',
    is_active: true,
    posted_by: 'College Principal Office'
  });

  // Public Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Student Registration Form State
  const [registerForm, setRegisterForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    course_id: 2,
    gender: 'Female',
    address: '',
    password: '',
    confirm_password: ''
  });
  const [registerSuccessMsg, setRegisterSuccessMsg] = useState('');
  const [registerErrorMsg, setRegisterErrorMsg] = useState('');

  // Student Login Form State
  const [studentLoginForm, setStudentLoginForm] = useState({
    identifier: 'SDSPM-2026-001',
    password: 'password123'
  });
  const [studentLoginError, setStudentLoginError] = useState('');

  // Admin Login Form State
  const [adminLoginForm, setAdminLoginForm] = useState({
    username: 'admin',
    password: 'password123'
  });
  const [adminLoginError, setAdminLoginError] = useState('');

  // Student Helpdesk Query State
  const [studentQueryText, setStudentQueryText] = useState({
    subject: '',
    message: ''
  });
  const [studentQuerySuccess, setStudentQuerySuccess] = useState(false);

  // Admin Enquiry Reply State
  const [replyTextMap, setReplyTextMap] = useState<Record<number, string>>({});

  // Handlers for Navigation
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Student Login Handler
  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentLoginError('');
    const found = students.find(
      s => (s.roll_no.toLowerCase() === studentLoginForm.identifier.trim().toLowerCase() ||
            s.email.toLowerCase() === studentLoginForm.identifier.trim().toLowerCase())
    );

    if (found) {
      if (found.status === 'Suspended') {
        setStudentLoginError('Your student account is suspended. Please contact the administrative office.');
        return;
      }
      setCurrentStudent(found);
      setCurrentPage('student-dashboard');
    } else {
      setStudentLoginError('Invalid Roll Number/Email or Password. (Demo: SDSPM-2026-001 / password123)');
    }
  };

  // Student Registration Handler
  const handleStudentRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterErrorMsg('');
    setRegisterSuccessMsg('');

    if (registerForm.password !== registerForm.confirm_password) {
      setRegisterErrorMsg('Passwords do not match.');
      return;
    }
    if (registerForm.password.length < 6) {
      setRegisterErrorMsg('Password must be at least 6 characters.');
      return;
    }

    const existing = students.find(s => s.email.toLowerCase() === registerForm.email.trim().toLowerCase());
    if (existing) {
      setRegisterErrorMsg('An account with this email already exists.');
      return;
    }

    const newRoll = `SDSPM-2026-${String(students.length + 1).padStart(3, '0')}`;
    const selectedCourse = courses.find(c => c.id === Number(registerForm.course_id));

    const newStudent: Student = {
      id: students.length + 1,
      roll_no: newRoll,
      full_name: registerForm.full_name,
      email: registerForm.email,
      phone: registerForm.phone,
      course_id: Number(registerForm.course_id),
      course_name: selectedCourse?.course_name,
      gender: registerForm.gender,
      address: registerForm.address,
      status: 'Active',
      created_at: new Date().toISOString().split('T')[0]
    };

    setStudents([newStudent, ...students]);
    setRegisterSuccessMsg(`Registration Successful! Allocated Roll No: ${newRoll}. You can now sign in.`);
    setStudentLoginForm({ identifier: newRoll, password: registerForm.password });
  };

  // Admin Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    if (
      (adminLoginForm.username === 'admin' || adminLoginForm.username === 'admin@sdspmcollege.org') &&
      adminLoginForm.password === 'password123'
    ) {
      setIsAdminLoggedIn(true);
      setCurrentPage('admin-dashboard');
    } else {
      setAdminLoginError('Invalid Administrator credentials. (Demo: admin / password123)');
    }
  };

  // Contact Form Submission
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEnquiry: Enquiry = {
      id: enquiries.length + 1,
      name: contactForm.name,
      email: contactForm.email,
      phone: contactForm.phone,
      subject: contactForm.subject,
      message: contactForm.message,
      status: 'New',
      created_at: 'Just now'
    };
    setEnquiries([newEnquiry, ...enquiries]);
    setContactSuccess(true);
    setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  // Student Query Submission
  const handleStudentQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent) return;
    const newEnquiry: Enquiry = {
      id: enquiries.length + 1,
      name: currentStudent.full_name,
      email: currentStudent.email,
      phone: currentStudent.phone,
      subject: `[Student ${currentStudent.roll_no}] ${studentQueryText.subject}`,
      message: studentQueryText.message,
      status: 'New',
      created_at: 'Just now'
    };
    setEnquiries([newEnquiry, ...enquiries]);
    setStudentQuerySuccess(true);
    setStudentQueryText({ subject: '', message: '' });
    setTimeout(() => setStudentQuerySuccess(false), 4000);
  };

  // Admin Course CRUD
  const openAddCourse = () => {
    setEditingCourse(null);
    setCourseFormData({
      course_name: '',
      course_code: '',
      department_id: 1,
      duration: '3 Years (6 Semesters)',
      eligibility: '',
      seats: 60,
      annual_fee: 25000,
      description: ''
    });
    setCourseFormOpen(true);
  };

  const openEditCourse = (course: Course) => {
    setEditingCourse(course);
    setCourseFormData({
      course_name: course.course_name,
      course_code: course.course_code,
      department_id: course.department_id,
      duration: course.duration,
      eligibility: course.eligibility,
      seats: course.seats,
      annual_fee: course.annual_fee,
      description: course.description
    });
    setCourseFormOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const dept = departments.find(d => d.id === Number(courseFormData.department_id));

    if (editingCourse) {
      setCourses(
        courses.map(c =>
          c.id === editingCourse.id
            ? {
                ...c,
                ...courseFormData,
                department_name: dept?.name || 'General'
              }
            : c
        )
      );
    } else {
      const newC: Course = {
        id: Date.now(),
        ...courseFormData,
        department_name: dept?.name || 'General'
      };
      setCourses([newC, ...courses]);
    }
    setCourseFormOpen(false);
  };

  const handleDeleteCourse = (id: number) => {
    if (confirm('Are you sure you want to delete this course from the database?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  // Admin Notice CRUD
  const openAddNotice = () => {
    setEditingNotice(null);
    setNoticeFormData({
      title: '',
      category: 'General',
      notice_date: new Date().toISOString().split('T')[0],
      content: '',
      attachment_url: '',
      is_active: true,
      posted_by: 'College Principal Office'
    });
    setNoticeFormOpen(true);
  };

  const openEditNotice = (n: Notice) => {
    setEditingNotice(n);
    setNoticeFormData({
      title: n.title,
      category: n.category,
      notice_date: n.notice_date,
      content: n.content,
      attachment_url: n.attachment_url || '',
      is_active: n.is_active,
      posted_by: n.posted_by
    });
    setNoticeFormOpen(true);
  };

  const handleSaveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNotice) {
      setNotices(
        notices.map(n => (n.id === editingNotice.id ? { ...n, ...noticeFormData } : n))
      );
    } else {
      const newN: Notice = {
        id: Date.now(),
        ...noticeFormData
      };
      setNotices([newN, ...notices]);
    }
    setNoticeFormOpen(false);
  };

  const handleDeleteNotice = (id: number) => {
    if (confirm('Delete this notice?')) {
      setNotices(notices.filter(n => n.id !== id));
    }
  };

  // Admin Enquiry Status / Reply
  const handleUpdateEnquiry = (enquiryId: number, newStatus: Enquiry['status'], replyText?: string) => {
    setEnquiries(
      enquiries.map(e =>
        e.id === enquiryId
          ? {
              ...e,
              status: newStatus,
              admin_reply: replyText !== undefined ? replyText : e.admin_reply
            }
          : e
      )
    );
  };

  const handleDeleteEnquiry = (id: number) => {
    if (confirm('Delete this enquiry?')) {
      setEnquiries(enquiries.filter(e => e.id !== id));
    }
  };

  // Toggle Student Status
  const handleToggleStudentStatus = (id: number) => {
    setStudents(
      students.map(s =>
        s.id === id
          ? { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Academic Utility Bar */}
      <div className="bg-[#081a2d] text-slate-300 text-xs py-2 border-b-2 border-[#c59323]">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#c59323]" />
              G.T. Road, Rayya, Amritsar (Punjab) - 143112
            </span>
            <span className="hidden md:flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-[#c59323]" />
              01853-222403
            </span>
            <span className="hidden lg:inline text-amber-300 font-medium">
              Estd. 1974 · Affiliated with GNDU Amritsar
            </span>
          </div>

          <div className="flex items-center gap-3">
            {currentStudent ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('student-dashboard')}
                  className="text-amber-300 hover:text-white font-medium flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5" />
                  {currentStudent.full_name} ({currentStudent.roll_no})
                </button>
                <button
                  onClick={() => {
                    setCurrentStudent(null);
                    navigateTo('home');
                  }}
                  className="text-slate-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('admin-dashboard')}
                  className="text-amber-300 hover:text-white font-semibold flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin Console
                </button>
                <button
                  onClick={() => {
                    setIsAdminLoggedIn(false);
                    navigateTo('home');
                  }}
                  className="text-slate-400 hover:text-rose-300 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="hover:text-amber-300 transition flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Student Login
                </button>
                <span className="text-slate-600">|</span>
                <button
                  onClick={() => navigateTo('admin-login')}
                  className="hover:text-amber-300 transition flex items-center gap-1 text-slate-300"
                >
                  <Shield className="w-3.5 h-3.5 text-[#c59323]" />
                  Admin Portal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main College Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-3">
          {/* Brand Wordmark & Crest */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left focus:outline-none"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-[#0e2a47] to-[#081a2d] text-[#c59323] rounded-lg flex items-center justify-center font-bold text-lg border border-[#c59323] shadow-xs">
              <GraduationCap className="w-6 h-6 text-[#c59323]" />
            </div>
            <div>
              <div className="font-bold text-[#0e2a47] text-lg tracking-tight leading-snug">
                SDSPM College for Women
              </div>
              <div className="text-xs text-slate-500 hidden sm:block">
                Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => navigateTo('home')}
              className={`hover:text-[#0e2a47] transition ${currentPage === 'home' ? 'text-[#0e2a47] font-semibold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`hover:text-[#0e2a47] transition ${currentPage === 'about' ? 'text-[#0e2a47] font-semibold' : ''}`}
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('courses')}
              className={`hover:text-[#0e2a47] transition ${currentPage === 'courses' ? 'text-[#0e2a47] font-semibold' : ''}`}
            >
              Courses
            </button>
            <button
              onClick={() => navigateTo('departments')}
              className={`hover:text-[#0e2a47] transition ${currentPage === 'departments' ? 'text-[#0e2a47] font-semibold' : ''}`}
            >
              Departments
            </button>
            <button
              onClick={() => navigateTo('faculty')}
              className={`hover:text-[#0e2a47] transition ${currentPage === 'faculty' ? 'text-[#0e2a47] font-semibold' : ''}`}
            >
              Faculty
            </button>
            <button
              onClick={() => navigateTo('gallery')}
              className={`hover:text-[#0e2a47] transition ${currentPage === 'gallery' ? 'text-[#0e2a47] font-semibold' : ''}`}
            >
              Gallery
            </button>
            <button
              onClick={() => navigateTo('notices')}
              className={`hover:text-[#0e2a47] transition ${currentPage === 'notices' ? 'text-[#0e2a47] font-semibold' : ''}`}
            >
              Notices
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`hover:text-[#0e2a47] transition ${currentPage === 'contact' ? 'text-[#0e2a47] font-semibold' : ''}`}
            >
              Contact Us
            </button>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            {currentStudent ? (
              <button
                onClick={() => navigateTo('student-dashboard')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0e2a47] rounded-md hover:bg-[#183c66] transition shadow-xs"
              >
                My Student Dashboard
              </button>
            ) : isAdminLoggedIn ? (
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#081a2d] rounded-md hover:bg-slate-800 transition shadow-xs"
              >
                Admin CMS
              </button>
            ) : (
              <button
                onClick={() => navigateTo('register')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0e2a47] rounded-md hover:bg-[#183c66] transition shadow-xs"
              >
                Enroll Online
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1">
            <button
              onClick={() => navigateTo('home')}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-slate-100"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('about')}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-slate-100"
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('courses')}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-slate-100"
            >
              Courses
            </button>
            <button
              onClick={() => navigateTo('departments')}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-slate-100"
            >
              Departments
            </button>
            <button
              onClick={() => navigateTo('faculty')}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-slate-100"
            >
              Faculty
            </button>
            <button
              onClick={() => navigateTo('gallery')}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-slate-100"
            >
              Gallery
            </button>
            <button
              onClick={() => navigateTo('notices')}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-slate-100"
            >
              Notices
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="block w-full text-left py-2 px-3 text-sm font-medium rounded hover:bg-slate-100"
            >
              Contact Us
            </button>
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <button
                onClick={() => navigateTo('login')}
                className="w-full text-center py-2 text-xs font-semibold rounded border border-[#0e2a47] text-[#0e2a47]"
              >
                Student Portal
              </button>
              <button
                onClick={() => navigateTo('admin-login')}
                className="w-full text-center py-2 text-xs font-semibold rounded bg-[#081a2d] text-white"
              >
                Admin Portal
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Body Switcher */}
      <main className="flex-1">
        {/* ========================================================
            PAGE 1: HOME
        ======================================================== */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0e2a47] via-[#102d4d] to-[#153860] text-white py-14 lg:py-20">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-5">
                    <span className="text-[#dfaa3b] font-semibold text-xs tracking-widest uppercase">
                      Estd. 1974 · Affiliated with Guru Nanak Dev University (GNDU)
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                      Shaheed Darshan Singh Pheruman Memorial College for Women
                    </h1>
                    <p className="text-slate-200 text-base lg:text-lg leading-relaxed max-w-2xl opacity-90">
                      Rayya, District Amritsar. Dedicated to empowering rural women through value-based higher education, academic rigor, career competencies, and character development under GNDU Amritsar.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => navigateTo('courses')}
                        className="px-5 py-2.5 bg-[#c59323] hover:bg-[#dfaa3b] text-slate-900 font-semibold rounded-md text-sm transition shadow-sm"
                      >
                        Academic Courses ({courses.length})
                      </button>
                      <button
                        onClick={() => navigateTo('register')}
                        className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-semibold rounded-md text-sm transition shadow-sm"
                      >
                        Enroll as Student
                      </button>
                      <button
                        onClick={() => navigateTo('about')}
                        className="px-5 py-2.5 bg-transparent hover:bg-white/10 text-white border border-white/40 font-semibold rounded-md text-sm transition"
                      >
                        About College & Memorial
                      </button>
                    </div>

                    <div className="pt-6 border-t border-slate-700/60 flex flex-wrap gap-6 text-xs text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#dfaa3b]" />
                        <span>Affiliated with GNDU Amritsar</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-[#dfaa3b]" />
                        <span>UGC Section 2(f) & 12(B) Approved</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookmarkCheck className="w-4 h-4 text-[#dfaa3b]" />
                        <span>Principal: Dr. (Mrs.) Anu Kapil</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    {/* Clean Authentic Institutional Placeholder Card */}
                    <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200 text-slate-900">
                      <div className="p-8 text-center bg-slate-50 border-b border-slate-200">
                        <div className="w-20 h-20 bg-[#0e2a47] text-[#c59323] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#c59323] shadow-md">
                          <GraduationCap className="w-10 h-10" />
                        </div>
                        <h3 className="font-bold text-[#0e2a47] text-lg mb-1">
                          SDSPM College for Women
                        </h3>
                        <p className="text-xs text-slate-500 mb-0">
                          Grand Trunk (G.T.) Road, Rayya, Amritsar – 143112
                        </p>
                      </div>

                      <div className="p-5 space-y-3 text-xs text-slate-700">
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Officiating Principal:</span>
                          <span className="font-semibold text-[#0e2a47]">Dr. (Mrs.) Anu Kapil</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Established:</span>
                          <span className="font-semibold text-slate-800">1974</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                          <span className="text-slate-500 font-medium">Official Portal:</span>
                          <a href="https://sdspmcollege.org/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                            sdspmcollege.org
                          </a>
                        </div>
                        <div className="pt-2 text-center">
                          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-emerald-600" />
                            Session 2026-27 Admissions Open
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Notice Ticker */}
            <div className="bg-slate-100 border-b border-slate-200 py-3">
              <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="bg-rose-600 text-white text-xs font-bold uppercase px-3 py-1 rounded flex items-center gap-1">
                    <Bell className="w-3.5 h-3.5" />
                    Notice Board
                  </span>
                  <div className="text-xs text-slate-700 line-clamp-1">
                    {notices.length > 0 ? (
                      <span className="font-medium">
                        [{notices[0].notice_date}] {notices[0].title}
                      </span>
                    ) : (
                      'No current notices.'
                    )}
                  </div>
                </div>
                <button
                  onClick={() => navigateTo('notices')}
                  className="text-xs font-semibold text-[#0e2a47] hover:underline flex items-center gap-1"
                >
                  All Circulars <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Key Academic Facilities */}
            <section className="py-14 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Infrastructure & Pedagogy
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0e2a47] mt-1">
                    Institutional Facilities at Rayya
                  </h2>
                  <p className="text-slate-600 text-sm mt-2">
                    Verified departmental laboratories and learning infrastructure at SDSPM College for Women.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition">
                    <div className="w-12 h-12 bg-blue-100 text-[#0e2a47] rounded-lg flex items-center justify-center mb-4">
                      <Laptop className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-[#0e2a47] text-lg mb-2">P.G. Computer Science Labs</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Equipped with high-performance desktop computers, programming IDEs, and broadband internet supporting M.Sc. IT, BCA, PGDCA, and CCA curricula.
                    </p>
                    <button
                      onClick={() => navigateTo('departments')}
                      className="text-xs font-semibold text-[#0e2a47] hover:underline flex items-center gap-1"
                    >
                      Department Details <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition">
                    <div className="w-12 h-12 bg-pink-100 text-pink-700 rounded-lg flex items-center justify-center mb-4">
                      <Scissors className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-[#0e2a47] text-lg mb-2">Cosmetology & Skill Lab</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Specialized salon equipment and hands-on clinical practicals for Certificate in Cosmetology, empowering students with self-reliance.
                    </p>
                    <button
                      onClick={() => navigateTo('courses')}
                      className="text-xs font-semibold text-[#0e2a47] hover:underline flex items-center gap-1"
                    >
                      Cosmetology Details <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition">
                    <div className="w-12 h-12 bg-amber-100 text-[#c59323] rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-[#0e2a47] text-lg mb-2">Central Library</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      Vast collection of university course syllabi textbooks, reference materials, periodicals, and quiet reading areas under GNDU Amritsar.
                    </p>
                    <button
                      onClick={() => navigateTo('about')}
                      className="text-xs font-semibold text-[#0e2a47] hover:underline flex items-center gap-1"
                    >
                      Explore Library <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Verified Courses Section */}
            <section className="py-14 bg-slate-50 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      Undergraduate, Postgraduate & Skill Programs
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0e2a47] mt-1">
                      Academic Courses Offered
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('courses')}
                    className="px-4 py-2 border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-white transition"
                  >
                    View All {courses.length} Programs
                  </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(c => (
                    <div
                      key={c.id}
                      className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[#c59323] transition"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                            {c.course_code}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {c.duration}
                          </span>
                        </div>
                        <h3 className="font-bold text-[#0e2a47] text-base mb-2">
                          {c.course_name}
                        </h3>
                        <p className="text-slate-600 text-xs line-clamp-3 mb-4 leading-relaxed">
                          {c.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Seats: <strong className="text-slate-800">{c.seats}</strong></span>
                        <button
                          onClick={() => {
                            setRegisterForm(prev => ({ ...prev, course_id: c.id }));
                            navigateTo('register');
                          }}
                          className="font-semibold text-[#0e2a47] hover:text-[#c59323] flex items-center gap-1"
                        >
                          Enroll Online <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 2: ABOUT US
        ======================================================== */}
        {currentPage === 'about' && (
          <div>
            <div className="bg-[#0e2a47] text-white py-12 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-[#dfaa3b] font-semibold text-xs tracking-widest uppercase">
                  Institutional Profile & History
                </span>
                <h1 className="text-3xl font-bold text-white mt-1">About SDSPM College for Women</h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya (Amritsar) · Estd. 1974
                </p>
              </div>
            </div>

            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded border border-amber-200">
                      Sacred Memorial Heritage
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0e2a47]">
                      In Memory of Shaheed Darshan Singh Pheruman
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      <strong>Shaheed Darshan Singh Pheruman Memorial College for Women</strong> was established in 1974 in sacred memory of the towering patriot and freedom fighter <strong>Shaheed Darshan Singh Pheruman</strong>. A prominent figure who participated in national movements including the Quit India movement and served as a Member of Parliament (Rajya Sabha), he undertook a historic fast unto death in Central Jail Amritsar in August 1969 to defend democratic righteousness and Punjab's rights. On October 27, 1969, on the 74th day of his continuous fast, he made the supreme sacrifice.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      To perpetuate his memory and selfless dedication, this college was established on the <strong>Grand Trunk (G.T.) Road in Rayya, District Amritsar</strong>, to provide affordable, value-based higher education specifically for rural girl students under <strong>Guru Nanak Dev University (GNDU), Amritsar</strong>.
                    </p>
                    <div className="p-4 bg-slate-50 border-l-4 border-[#c59323] rounded-r text-xs text-slate-700 italic leading-relaxed">
                      "To provide value-based education to rural girl students, making them self-reliant, honest, sincere and equipped to combat future life challenges."
                      <div className="mt-1 font-semibold not-italic text-slate-900">— Official Mission Statement (sdspmcollege.org)</div>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center shadow-xs">
                      <div className="w-16 h-16 bg-[#0e2a47] text-[#c59323] rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-[#c59323]">
                        <Building2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-[#0e2a47] text-base mb-1">
                        SDSPM College for Women, Rayya
                      </h3>
                      <p className="text-xs text-slate-500 mb-4">G.T. Road, Rayya, Amritsar (Punjab) - 143112</p>

                      <div className="text-left text-xs space-y-2 border-t border-slate-200 pt-3 text-slate-700">
                        <div><strong>Officiating Principal:</strong> Dr. (Mrs.) Anu Kapil</div>
                        <div><strong>Qualifications:</strong> M.Sc. (Hons.), Ph.D., UGC NET</div>
                        <div><strong>Affiliation:</strong> Guru Nanak Dev University (GNDU)</div>
                        <div><strong>UGC Recognition:</strong> Section 2(f) & 12(B)</div>
                        <div><strong>Established:</strong> 1974</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vision and Mission */}
                <div className="grid md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-slate-200">
                  <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-[#0e2a47] text-lg mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[#c59323]" />
                      Our Vision
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      The college aims to become the most outstanding institution in the rural area, encouraging students to stay updated with changing global scenarios, excel in every aspect of life, and flourish in both their intellectual and moral potentials.
                    </p>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-[#0e2a47] text-lg mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#c59323]" />
                      Our Mission
                    </h3>
                    <ul className="text-slate-600 text-sm space-y-2 list-disc list-inside">
                      <li>Deliver disciplined academic curricula strictly affiliated with GNDU Amritsar.</li>
                      <li>Impart IT competencies through M.Sc. IT, BCA, PGDCA, and CCA programs.</li>
                      <li>Foster vocational self-reliance through Certificate in Cosmetology and Fashion Designing.</li>
                      <li>Uphold national harmony, Sikh ethical traditions, and women empowerment.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 3: COURSES
        ======================================================== */}
        {currentPage === 'courses' && (
          <div>
            <div className="bg-[#0e2a47] text-white py-12 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-[#dfaa3b] font-semibold text-xs tracking-widest uppercase">
                  Academic Catalog
                </span>
                <h1 className="text-3xl font-bold text-white mt-1">Courses Offered</h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  Verified degree, postgraduate, diploma and certificate programs at SDSPM College for Women
                </p>
              </div>
            </div>

            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                {/* Department Filter Buttons */}
                <div className="flex flex-wrap gap-2 justify-center mb-8">
                  <button
                    onClick={() => setCourseDeptFilter(0)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                      courseDeptFilter === 0
                        ? 'bg-[#0e2a47] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Programs ({courses.length})
                  </button>
                  {departments.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setCourseDeptFilter(d.id)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                        courseDeptFilter === d.id
                          ? 'bg-[#0e2a47] text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {d.code}
                    </button>
                  ))}
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {courses
                    .filter(c => courseDeptFilter === 0 || c.department_id === courseDeptFilter)
                    .map(course => (
                      <div
                        key={course.id}
                        className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:border-[#c59323] transition"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2 gap-2">
                            <div>
                              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                                {course.department_name || 'General'}
                              </span>
                              <h3 className="font-bold text-[#0e2a47] text-lg mt-1">
                                {course.course_name}
                              </h3>
                              <span className="text-xs text-slate-500">
                                Code: <strong>{course.course_code}</strong>
                              </span>
                            </div>
                            <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded font-semibold whitespace-nowrap">
                              {course.duration}
                            </span>
                          </div>

                          <p className="text-slate-600 text-sm mt-3 mb-4 leading-relaxed">
                            {course.description}
                          </p>

                          <div className="bg-slate-50 p-3 rounded text-xs space-y-1.5 border border-slate-200 mb-4">
                            <div>
                              <strong className="text-slate-700">Eligibility:</strong>{' '}
                              <span className="text-slate-600">{course.eligibility}</span>
                            </div>
                            <div className="flex justify-between pt-1 border-t border-slate-200 text-slate-500">
                              <span>Sanctioned Seats: <strong className="text-slate-800">{course.seats}</strong></span>
                              <span>Affiliation: <strong className="text-slate-800">GNDU Amritsar</strong></span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                          <div>
                            <span className="text-xs text-slate-500 block">Est. Annual Fee:</span>
                            <span className="font-bold text-slate-900 text-sm">
                              &#8377;{Number(course.annual_fee).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setRegisterForm(prev => ({ ...prev, course_id: course.id }));
                              navigateTo('register');
                            }}
                            className="px-4 py-2 bg-[#0e2a47] hover:bg-[#183c66] text-white text-xs font-semibold rounded transition"
                          >
                            Enroll Online
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 4: DEPARTMENTS
        ======================================================== */}
        {currentPage === 'departments' && (
          <div>
            <div className="bg-[#0e2a47] text-white py-12 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-[#dfaa3b] font-semibold text-xs tracking-widest uppercase">
                  Academic Framework
                </span>
                <h1 className="text-3xl font-bold text-white mt-1">College Departments</h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  Verified departmental faculties at SDSPM College for Women (source: sdspmcollege.org)
                </p>
              </div>
            </div>

            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-6">
                  {departments.map(dept => {
                    const deptCourses = courses.filter(c => c.department_id === dept.id);
                    return (
                      <div
                        key={dept.id}
                        className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
                                Code: {dept.code}
                              </span>
                              <h3 className="font-bold text-[#0e2a47] text-lg mt-1.5">
                                {dept.name}
                              </h3>
                            </div>
                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {deptCourses.length} Program{deptCourses.length !== 1 ? 's' : ''}
                            </span>
                          </div>

                          <p className="text-slate-600 text-sm mt-2 mb-4 leading-relaxed">
                            {dept.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-slate-500">In-charge / HOD:</span>{' '}
                            <strong className="text-slate-800">{dept.head_of_department}</strong>
                          </div>
                          <button
                            onClick={() => {
                              setCourseDeptFilter(dept.id);
                              navigateTo('courses');
                            }}
                            className="font-semibold text-[#0e2a47] hover:underline flex items-center gap-1"
                          >
                            View Programs <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 5: FACULTY
        ======================================================== */}
        {currentPage === 'faculty' && (
          <div>
            <div className="bg-[#0e2a47] text-white py-12 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-[#dfaa3b] font-semibold text-xs tracking-widest uppercase">
                  Academic Mentors
                </span>
                <h1 className="text-3xl font-bold text-white mt-1">Faculty Directory</h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  Verified roster of educators at SDSPM College for Women (source: sdspmcollege.org)
                </p>
              </div>
            </div>

            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                {/* Principal Highlight */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-[#0e2a47] text-[#c59323] rounded-full flex items-center justify-center text-2xl font-bold shrink-0 border-2 border-[#c59323]">
                    AK
                  </div>
                  <div>
                    <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded">
                      Officiating Principal
                    </span>
                    <h2 className="text-xl font-bold text-[#0e2a47] mt-1">
                      Dr. (Mrs.) Anu Kapil
                    </h2>
                    <div className="text-xs text-slate-600 mb-1">
                      Associate Professor in Economics · Qualifications: M.Sc. (Hons.), Ph.D., UGC NET
                    </div>
                    <div className="text-xs text-slate-500">
                      Email: principal@sdspmcollege.org · Leading SDSPM College for Women, Rayya
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {faculty.map(f => (
                    <div
                      key={f.id}
                      className="bg-white p-5 rounded-lg border border-slate-200 text-center flex flex-col justify-between hover:shadow-md transition"
                    >
                      <div>
                        <div className="w-14 h-14 bg-slate-100 text-slate-700 rounded-full flex items-center justify-center mx-auto mb-3 text-base font-bold border border-slate-200">
                          {f.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <h3 className="font-bold text-[#0e2a47] text-sm mb-0.5">
                          {f.name}
                        </h3>
                        <div className="text-xs font-semibold text-[#c59323] mb-1">
                          {f.designation}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 mb-2">
                          {f.department_name}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1 text-left">
                        <div>
                          <strong className="text-slate-700">Degree:</strong> {f.qualification}
                        </div>
                        <div>
                          <strong className="text-slate-700">Experience:</strong> {f.experience}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 6: GALLERY
        ======================================================== */}
        {currentPage === 'gallery' && (
          <div>
            <div className="bg-[#0e2a47] text-white py-12 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-[#dfaa3b] font-semibold text-xs tracking-widest uppercase">
                  College Life & Activities
                </span>
                <h1 className="text-3xl font-bold text-white mt-1">Campus Activities & Gallery</h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  Academic workshops, computer labs, cosmetology training, and memorial commemorations
                </p>
              </div>
            </div>

            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Shaheed Darshan Singh Pheruman Martyrdom Commemoration Day',
                      cat: 'Memorial Events',
                      desc: 'Annual tribute ceremony and Gurmat seminar on October 27 honoring martyr Darshan Singh Pheruman.'
                    },
                    {
                      title: 'P.G. Computer Science & IT Application Laboratories',
                      cat: 'Computing',
                      desc: 'Hands-on practical programming sessions for M.Sc. IT, BCA, PGDCA, and CCA students.'
                    },
                    {
                      title: 'Certificate in Cosmetology & Skill Development Lab',
                      cat: 'Vocational Training',
                      desc: 'Practical cosmetology workshops covering skin aesthetics, hair designing, and beauty wellness.'
                    },
                    {
                      title: 'Central Reference Library & Reading Hall',
                      cat: 'Academic Infrastructure',
                      desc: 'Extensive academic textbooks, journals, and dedicated study tables under GNDU curriculum.'
                    },
                    {
                      title: 'Department of Fashion Designing Apparel Display',
                      cat: 'Creative Arts',
                      desc: 'Garment pattern drafting, textile illustration, and fashion embroidery work by students.'
                    },
                    {
                      title: 'Annual Athletic Meet & Physical Education Trials',
                      cat: 'Sports & Wellness',
                      desc: 'Track and field trials, yoga training, and university sports representation.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
                      <div className="p-6 text-center bg-gradient-to-br from-[#0e2a47] to-[#153860] text-white">
                        <div className="w-12 h-12 bg-white/10 text-amber-300 rounded-full flex items-center justify-center mx-auto mb-2 border border-amber-300/30">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          {item.cat}
                        </span>
                        <div className="text-[11px] text-slate-300 mt-1">SDSPM College for Women · Rayya</div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-[#0e2a47] text-sm mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 7: NOTICES AND ANNOUNCEMENTS
        ======================================================== */}
        {currentPage === 'notices' && (
          <div>
            <div className="bg-[#0e2a47] text-white py-12 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-[#dfaa3b] font-semibold text-xs tracking-widest uppercase">
                  Official Bulletins
                </span>
                <h1 className="text-3xl font-bold text-white mt-1">Notices & Announcements</h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  GNDU datesheets, admission circulars, scholarship updates, and college notifications
                </p>
              </div>
            </div>

            <section className="py-12 bg-white">
              <div className="max-w-5xl mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Academic', 'Examination', 'Admissions', 'Sports', 'General'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setNoticeCategoryFilter(cat)}
                        className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                          noticeCategoryFilter === cat
                            ? 'bg-[#0e2a47] text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search circulars..."
                      value={noticeSearch}
                      onChange={e => setNoticeSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {notices
                    .filter(n => n.is_active)
                    .filter(n => noticeCategoryFilter === 'All' || n.category === noticeCategoryFilter)
                    .filter(n =>
                      noticeSearch === '' ||
                      n.title.toLowerCase().includes(noticeSearch.toLowerCase()) ||
                      n.content.toLowerCase().includes(noticeSearch.toLowerCase())
                    )
                    .map(notice => (
                      <div
                        key={notice.id}
                        className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs hover:border-[#0e2a47] transition"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded border border-blue-200">
                              {notice.category}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {notice.notice_date}
                            </span>
                          </div>
                          <span className="text-xs text-slate-500">
                            Issued by: <strong>{notice.posted_by}</strong>
                          </span>
                        </div>

                        <h3 className="font-bold text-[#0e2a47] text-base mb-2">
                          {notice.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3 whitespace-pre-line">
                          {notice.content}
                        </p>

                        {notice.attachment_url && (
                          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs">
                            <FileText className="w-4 h-4 text-rose-500" />
                            <span className="text-slate-500">Official Attachment:</span>
                            <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              {notice.attachment_url}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 8: CONTACT US
        ======================================================== */}
        {currentPage === 'contact' && (
          <div>
            <div className="bg-[#0e2a47] text-white py-12 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <span className="text-[#dfaa3b] font-semibold text-xs tracking-widest uppercase">
                  Admissions Desk & Helpline
                </span>
                <h1 className="text-3xl font-bold text-white mt-1">Contact SDSPM College for Women</h1>
                <p className="text-slate-300 text-xs sm:text-sm mt-2">
                  Reach out to the principal's office, admission counselors, or student welfare desk
                </p>
              </div>
            </div>

            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-5 space-y-6">
                    <div>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 rounded border border-amber-200">
                        Campus Office
                      </span>
                      <h2 className="text-2xl font-bold text-[#0e2a47] mt-2 mb-2">
                        Get In Touch
                      </h2>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Prospective students and guardians are welcome to visit our administrative branch on Grand Trunk Road, Rayya during working hours (9:00 AM - 3:30 PM).
                      </p>
                    </div>

                    <div className="space-y-4 text-sm">
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <MapPin className="w-5 h-5 text-[#c59323] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block font-semibold">Campus Address</strong>
                          <span className="text-slate-600">{COLLEGE_DETAILS.address}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Phone className="w-5 h-5 text-[#c59323] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block font-semibold">Landline & Helpline</strong>
                          <span className="text-slate-600">Tel: {COLLEGE_DETAILS.phone} · Mob: {COLLEGE_DETAILS.mobile}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Mail className="w-5 h-5 text-[#c59323] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block font-semibold">Official Email</strong>
                          <span className="text-slate-600">{COLLEGE_DETAILS.email}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <Award className="w-5 h-5 text-[#c59323] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-900 block font-semibold">Official Website</strong>
                          <a href={COLLEGE_DETAILS.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            {COLLEGE_DETAILS.website}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm">
                      <h3 className="text-xl font-bold text-[#0e2a47] mb-1">
                        Submit Admission / General Enquiry
                      </h3>
                      <p className="text-slate-600 text-xs mb-6">
                        Submitted messages are stored in MySQL and immediately visible in the Admin Enquiry Console.
                      </p>

                      {contactSuccess && (
                        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-sm flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>Thank you! Your enquiry has been forwarded to the college administrative module.</span>
                        </div>
                      )}

                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Applicant / Student Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={contactForm.name}
                              onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                              placeholder="e.g. Jasleen Kaur"
                              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Contact Mobile <span className="text-rose-500">*</span>
                            </label>
                            <input
                              type="tel"
                              required
                              value={contactForm.phone}
                              onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                              placeholder="10-digit mobile number"
                              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Email Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="name@example.com"
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Course / Subject Query <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.subject}
                            onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                            placeholder="e.g. Certificate in Cosmetology or BCA eligibility"
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Message Details <span className="text-rose-500">*</span>
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={contactForm.message}
                            onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                            placeholder="Write your questions regarding syllabus, admission or transport..."
                            className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-[#0e2a47] hover:bg-[#183c66] text-white font-semibold rounded text-sm transition flex items-center justify-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Submit Official Enquiry
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 9: STUDENT LOGIN
        ======================================================== */}
        {currentPage === 'login' && (
          <div className="py-12 bg-slate-50">
            <div className="max-w-md mx-auto px-4">
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-[#0e2a47] text-[#c59323] rounded-lg flex items-center justify-center font-bold text-xl mx-auto mb-3 border border-[#c59323]">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0e2a47]">Student Portal Login</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    SDSPM College for Women Management System
                  </p>
                </div>

                {studentLoginError && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{studentLoginError}</span>
                  </div>
                )}

                <form onSubmit={handleStudentLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Roll Number or Email
                    </label>
                    <input
                      type="text"
                      required
                      value={studentLoginForm.identifier}
                      onChange={e => setStudentLoginForm({ ...studentLoginForm, identifier: e.target.value })}
                      placeholder="e.g. SDSPM-2026-001"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={studentLoginForm.password}
                      onChange={e => setStudentLoginForm({ ...studentLoginForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0e2a47] hover:bg-[#183c66] text-white font-semibold rounded text-sm transition flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In to Student Dashboard
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
                  Not registered yet?{' '}
                  <button
                    onClick={() => navigateTo('register')}
                    className="text-[#0e2a47] font-semibold hover:underline"
                  >
                    Register as New Student
                  </button>
                </div>

                {/* Demonstration Credentials Note */}
                <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
                  <div className="font-semibold text-slate-800 mb-1">Default Student Credentials:</div>
                  <div>Roll No: <code className="text-amber-800 font-mono">SDSPM-2026-001</code></div>
                  <div>Password: <code className="text-amber-800 font-mono">password123</code></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STUDENT REGISTRATION
        ======================================================== */}
        {currentPage === 'register' && (
          <div className="py-12 bg-slate-50">
            <div className="max-w-2xl mx-auto px-4">
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm">
                <div className="text-center mb-6">
                  <span className="text-xs font-semibold text-[#c59323] uppercase tracking-widest">
                    Admissions Session 2026-27
                  </span>
                  <h2 className="text-2xl font-bold text-[#0e2a47] mt-1">Student Enrollment</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya
                  </p>
                </div>

                {registerSuccessMsg && (
                  <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-sm">
                    <div className="flex items-center gap-2 mb-2 font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>{registerSuccessMsg}</span>
                    </div>
                    <button
                      onClick={() => navigateTo('login')}
                      className="px-3 py-1 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-700"
                    >
                      Click Here to Sign In
                    </button>
                  </div>
                )}

                {registerErrorMsg && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{registerErrorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleStudentRegister} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Legal Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={registerForm.full_name}
                        onChange={e => setRegisterForm({ ...registerForm, full_name: e.target.value })}
                        placeholder="e.g. Simranjeet Kaur"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={registerForm.email}
                        onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={registerForm.phone}
                        onChange={e => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#0e2a47]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gender
                      </label>
                      <select
                        value={registerForm.gender}
                        onChange={e => setRegisterForm({ ...registerForm, gender: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none"
                      >
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Select Program / Course <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={registerForm.course_id}
                      onChange={e => setRegisterForm({ ...registerForm, course_id: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.course_name} ({c.course_code}) - {c.duration}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Permanent Postal Address
                    </label>
                    <textarea
                      rows={2}
                      value={registerForm.address}
                      onChange={e => setRegisterForm({ ...registerForm, address: e.target.value })}
                      placeholder="Village / Town, Tehsil, District, PIN"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Create Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={registerForm.password}
                        onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                        placeholder="Min 6 characters"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Confirm Password <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="password"
                        required
                        value={registerForm.confirm_password}
                        onChange={e => setRegisterForm({ ...registerForm, confirm_password: e.target.value })}
                        placeholder="Re-type password"
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#0e2a47] hover:bg-[#183c66] text-white font-semibold rounded text-sm transition mt-2 flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    Complete Registration
                  </button>
                </form>

                <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigateTo('login')}
                    className="text-[#0e2a47] font-semibold hover:underline"
                  >
                    Sign In Here
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            PAGE 10: ADMIN LOGIN
        ======================================================== */}
        {currentPage === 'admin-login' && (
          <div className="py-12 bg-slate-50">
            <div className="max-w-md mx-auto px-4">
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-[#081a2d] text-amber-400 rounded-lg flex items-center justify-center font-bold text-xl mx-auto mb-3 border border-amber-400">
                    <Shield className="w-7 h-7" />
                  </div>
                  <h2 className="text-xl font-bold text-[#081a2d]">Administrator Portal</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    SDSPM College for Women Management Console
                  </p>
                </div>

                {adminLoginError && (
                  <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{adminLoginError}</span>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      required
                      value={adminLoginForm.username}
                      onChange={e => setAdminLoginForm({ ...adminLoginForm, username: e.target.value })}
                      placeholder="admin"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#081a2d]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      value={adminLoginForm.password}
                      onChange={e => setAdminLoginForm({ ...adminLoginForm, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-[#081a2d]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#081a2d] hover:bg-slate-800 text-white font-semibold rounded text-sm transition flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-amber-400" />
                    Authenticate Admin Access
                  </button>
                </form>

                <div className="mt-6 p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600">
                  <div className="font-semibold text-slate-800 mb-1">Default Admin Credentials:</div>
                  <div>Username: <code className="text-amber-800 font-mono">admin</code></div>
                  <div>Password: <code className="text-amber-800 font-mono">password123</code></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            STUDENT DASHBOARD MODULE
        ======================================================== */}
        {currentPage === 'student-dashboard' && currentStudent && (
          <div className="py-8 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-white p-6 rounded-lg border border-slate-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-[#0e2a47]">
                    Welcome, {currentStudent.full_name}
                  </h1>
                  <p className="text-slate-500 text-xs mt-1">
                    Student Portal · Session 2026-27 · Shaheed Darshan Singh Pheruman Memorial College for Women
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-blue-50 text-blue-700 font-mono font-bold px-3 py-1.5 rounded border border-blue-200">
                    Roll No: {currentStudent.roll_no}
                  </span>
                  <button
                    onClick={() => {
                      setCurrentStudent(null);
                      navigateTo('home');
                    }}
                    className="px-3 py-1.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-5 rounded-lg border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-[#0e2a47] rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Enrolled Program</span>
                    <h3 className="font-bold text-[#0e2a47] text-sm mt-0.5">
                      {currentStudent.course_name || 'Enrolled Student'}
                    </h3>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Academic Status</span>
                    <h3 className="font-bold text-emerald-700 text-sm mt-0.5">
                      {currentStudent.status} Regular
                    </h3>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-slate-200 flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium">Active Circulars</span>
                    <h3 className="font-bold text-[#0e2a47] text-sm mt-0.5">
                      {notices.length} Published
                    </h3>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Left: Helpdesk / Submit Query */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <h2 className="font-bold text-[#0e2a47] text-base mb-1 flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#c59323]" />
                      Student Helpdesk & Academic Queries
                    </h2>
                    <p className="text-xs text-slate-500 mb-4">
                      Submit questions directly to college administration regarding admit cards, fees, or certificates.
                    </p>

                    {studentQuerySuccess && (
                      <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs">
                        Query submitted successfully to college admin!
                      </div>
                    )}

                    <form onSubmit={handleStudentQuerySubmit} className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                        <input
                          type="text"
                          required
                          value={studentQueryText.subject}
                          onChange={e => setStudentQueryText({ ...studentQueryText, subject: e.target.value })}
                          placeholder="e.g. Roll number slip / scholarship form enquiry"
                          className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Query Message</label>
                        <textarea
                          required
                          rows={3}
                          value={studentQueryText.message}
                          onChange={e => setStudentQueryText({ ...studentQueryText, message: e.target.value })}
                          placeholder="Provide details about your query..."
                          className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#0e2a47] text-white rounded text-xs font-semibold hover:bg-[#183c66]"
                      >
                        Submit Query
                      </button>
                    </form>
                  </div>

                  {/* My Enquiries List */}
                  <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-[#0e2a47] text-sm mb-3">
                      My Submitted Inquiries & Responses
                    </h3>
                    <div className="space-y-3">
                      {enquiries
                        .filter(e => e.email === currentStudent.email)
                        .map(enq => (
                          <div key={enq.id} className="p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-slate-800">{enq.subject}</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  enq.status === 'Resolved'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : enq.status === 'In Review'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {enq.status}
                              </span>
                            </div>
                            <p className="text-slate-600 mb-2">{enq.message}</p>
                            {enq.admin_reply && (
                              <div className="p-2 bg-emerald-50 border-l-2 border-emerald-600 rounded-r text-emerald-900 mt-2">
                                <strong className="block text-[11px]">Administrator Response:</strong>
                                <span>{enq.admin_reply}</span>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Right: Notices & Program Details */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-[#0e2a47] text-base flex items-center gap-2">
                        <Bell className="w-4 h-4 text-rose-500" />
                        Latest University & College Circulars
                      </h3>
                      <button
                        onClick={() => navigateTo('notices')}
                        className="text-xs text-[#0e2a47] hover:underline"
                      >
                        All Notices
                      </button>
                    </div>

                    <div className="space-y-3">
                      {notices.slice(0, 4).map(n => (
                        <div key={n.id} className="p-3 bg-slate-50 rounded border-l-3 border-[#0e2a47] text-xs">
                          <div className="flex justify-between items-center text-slate-500 mb-1">
                            <span className="font-semibold text-[#0e2a47]">{n.category}</span>
                            <span>{n.notice_date}</span>
                          </div>
                          <h4 className="font-bold text-slate-800 mb-1">{n.title}</h4>
                          <p className="text-slate-600 line-clamp-2">{n.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Profile Summary */}
                  <div className="bg-white p-6 rounded-lg border border-slate-200">
                    <h3 className="font-bold text-[#0e2a47] text-sm mb-3">Enrolled Profile Record</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500">Full Name:</span>
                        <div className="font-semibold text-slate-800">{currentStudent.full_name}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Contact Email:</span>
                        <div className="font-semibold text-slate-800">{currentStudent.email}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Phone:</span>
                        <div className="font-semibold text-slate-800">{currentStudent.phone}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Postal Address:</span>
                        <div className="font-semibold text-slate-800">{currentStudent.address}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            ADMIN DASHBOARD & CMS MODULE
        ======================================================== */}
        {currentPage === 'admin-dashboard' && isAdminLoggedIn && (
          <div className="py-8 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="bg-white p-6 rounded-lg border border-slate-200 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Administrator CMS
                  </span>
                  <h1 className="text-2xl font-bold text-[#081a2d] mt-1">
                    SDSPM College for Women Management Console
                  </h1>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Live database management for Courses, Notices, Students, and Enquiries
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={openAddCourse}
                    className="px-3.5 py-2 bg-[#081a2d] hover:bg-slate-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Course
                  </button>
                  <button
                    onClick={openAddNotice}
                    className="px-3.5 py-2 bg-[#c59323] hover:bg-[#dfaa3b] text-slate-900 text-xs font-semibold rounded flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Post Notice
                  </button>
                  <button
                    onClick={resetToFactorySeed}
                    className="px-3.5 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-semibold rounded flex items-center gap-1.5"
                    title="Reset all modified courses, notices, students, and enquiries back to official verified seed data"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                    Reset Data
                  </button>
                  <button
                    onClick={() => {
                      setIsAdminLoggedIn(false);
                      navigateTo('home');
                    }}
                    className="px-3.5 py-2 text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold rounded"
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* Statistics Ribbon */}
              <div className="grid sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white p-5 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium uppercase">Total Students</span>
                  <div className="text-2xl font-bold text-[#081a2d] mt-1">{students.length}</div>
                  <span className="text-[11px] text-emerald-600 font-medium">Registered in DB</span>
                </div>

                <div className="bg-white p-5 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium uppercase">Active Courses</span>
                  <div className="text-2xl font-bold text-[#081a2d] mt-1">{courses.length}</div>
                  <span className="text-[11px] text-blue-600 font-medium">Verified under GNDU</span>
                </div>

                <div className="bg-white p-5 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium uppercase">Live Notices</span>
                  <div className="text-2xl font-bold text-[#081a2d] mt-1">
                    {notices.filter(n => n.is_active).length}
                  </div>
                  <span className="text-[11px] text-amber-600 font-medium">On Public Board</span>
                </div>

                <div className="bg-white p-5 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium uppercase">New Enquiries</span>
                  <div className="text-2xl font-bold text-rose-600 mt-1">
                    {enquiries.filter(e => e.status === 'New').length}
                  </div>
                  <span className="text-[11px] text-rose-500 font-medium">Needs Attention</span>
                </div>
              </div>

              {/* Course Management Section */}
              <div className="bg-white p-6 rounded-lg border border-slate-200 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="font-bold text-[#081a2d] text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#c59323]" />
                      Manage Academic Courses (CRUD)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Changes made here instantly appear on public Courses page and database.
                    </p>
                  </div>
                  <button
                    onClick={openAddCourse}
                    className="px-3 py-1.5 bg-[#081a2d] text-white text-xs font-semibold rounded hover:bg-slate-800 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Course
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                        <th className="p-3">Code</th>
                        <th className="p-3">Course Name</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Duration</th>
                        <th className="p-3">Seats</th>
                        <th className="p-3">Annual Fee</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {courses.map(course => (
                        <tr key={course.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-700">{course.course_code}</td>
                          <td className="p-3 font-semibold text-[#081a2d]">{course.course_name}</td>
                          <td className="p-3 text-slate-600">{course.department_name || 'General'}</td>
                          <td className="p-3 text-slate-600">{course.duration}</td>
                          <td className="p-3 text-slate-600">{course.seats}</td>
                          <td className="p-3 text-slate-600">&#8377;{Number(course.annual_fee).toLocaleString('en-IN')}</td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => openEditCourse(course)}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="px-2 py-1 bg-rose-50 text-rose-700 rounded hover:bg-rose-100 font-semibold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Notices Management Section */}
              <div className="bg-white p-6 rounded-lg border border-slate-200 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="font-bold text-[#081a2d] text-lg flex items-center gap-2">
                      <Bell className="w-5 h-5 text-amber-500" />
                      Manage Official Notices (CRUD)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Add, update, or remove circulars from the public and student bulletin board.
                    </p>
                  </div>
                  <button
                    onClick={openAddNotice}
                    className="px-3 py-1.5 bg-[#c59323] text-slate-900 text-xs font-semibold rounded hover:bg-[#dfaa3b] flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Post Notice
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                        <th className="p-3">Date</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Issued By</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {notices.map(n => (
                        <tr key={n.id} className="hover:bg-slate-50">
                          <td className="p-3 text-slate-500">{n.notice_date}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold text-slate-700">
                              {n.category}
                            </span>
                          </td>
                          <td className="p-3 font-semibold text-[#081a2d]">{n.title}</td>
                          <td className="p-3 text-slate-600">{n.posted_by}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                n.is_active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {n.is_active ? 'Active' : 'Draft'}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => openEditNotice(n)}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 font-semibold"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNotice(n.id)}
                              className="px-2 py-1 bg-rose-50 text-rose-700 rounded hover:bg-rose-100 font-semibold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Student Accounts Directory */}
              <div className="bg-white p-6 rounded-lg border border-slate-200 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="font-bold text-[#081a2d] text-lg flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Manage Student Accounts
                    </h2>
                    <p className="text-xs text-slate-500">
                      Review registered students, monitor enrollment, and toggle Active/Suspended status.
                    </p>
                  </div>
                  <span className="text-xs bg-slate-100 px-3 py-1 rounded font-semibold text-slate-700">
                    {students.length} Accounts Enrolled
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-600">
                        <th className="p-3">Roll No</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Contact</th>
                        <th className="p-3">Enrolled Course</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {students.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-800">{s.roll_no}</td>
                          <td className="p-3 font-semibold text-slate-900">{s.full_name}</td>
                          <td className="p-3 text-slate-600">
                            <div>{s.email}</div>
                            <div className="text-[11px] text-slate-400">{s.phone}</div>
                          </td>
                          <td className="p-3 text-slate-700">{s.course_name || 'Not Assigned'}</td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                s.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {s.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => handleToggleStudentStatus(s.id)}
                              className="px-2 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-semibold"
                            >
                              {s.status === 'Active' ? 'Suspend' : 'Activate'}
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove account for ${s.full_name}?`)) {
                                  setStudents(students.filter(item => item.id !== s.id));
                                }
                              }}
                              className="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded font-semibold"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Public Enquiries & Responses Section */}
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="font-bold text-[#081a2d] text-lg flex items-center gap-2">
                      <Mail className="w-5 h-5 text-rose-600" />
                      Manage Contact Enquiries & Leads
                    </h2>
                    <p className="text-xs text-slate-500">
                      Respond to admission queries and mark resolution status.
                    </p>
                  </div>
                  <span className="text-xs bg-rose-50 text-rose-700 font-semibold px-2.5 py-1 rounded border border-rose-200">
                    {enquiries.filter(e => e.status === 'New').length} New Enquiries
                  </span>
                </div>

                <div className="space-y-4">
                  {enquiries.map(enq => (
                    <div key={enq.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              enq.status === 'New'
                                ? 'bg-rose-100 text-rose-800'
                                : enq.status === 'In Review'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {enq.status}
                          </span>
                          <strong className="text-slate-900 text-sm">{enq.subject}</strong>
                        </div>
                        <span className="text-slate-400">{enq.created_at}</span>
                      </div>

                      <div className="grid sm:grid-cols-3 gap-2 text-slate-600 mb-2">
                        <div><strong>From:</strong> {enq.name}</div>
                        <div><strong>Email:</strong> {enq.email}</div>
                        <div><strong>Phone:</strong> {enq.phone}</div>
                      </div>

                      <p className="p-3 bg-white rounded border border-slate-200 text-slate-700 mb-3 leading-relaxed">
                        {enq.message}
                      </p>

                      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3 rounded border border-slate-200">
                        <div className="w-full sm:w-40">
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">Status</label>
                          <select
                            value={enq.status}
                            onChange={e => handleUpdateEnquiry(enq.id, e.target.value as Enquiry['status'])}
                            className="w-full px-2 py-1 text-xs border rounded bg-slate-50"
                          >
                            <option value="New">New</option>
                            <option value="In Review">In Review</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </div>

                        <div className="w-full flex-1">
                          <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                            Administrator Reply Note
                          </label>
                          <input
                            type="text"
                            placeholder="Add reply or resolution notes..."
                            value={replyTextMap[enq.id] !== undefined ? replyTextMap[enq.id] : (enq.admin_reply || '')}
                            onChange={e =>
                              setReplyTextMap({ ...replyTextMap, [enq.id]: e.target.value })
                            }
                            className="w-full px-3 py-1 text-xs border rounded bg-slate-50"
                          />
                        </div>

                        <div className="flex items-center gap-2 mt-auto">
                          <button
                            onClick={() => {
                              const text = replyTextMap[enq.id] !== undefined ? replyTextMap[enq.id] : (enq.admin_reply || '');
                              handleUpdateEnquiry(enq.id, 'Resolved', text);
                            }}
                            className="px-3 py-1.5 bg-[#081a2d] text-white rounded text-xs font-semibold hover:bg-slate-800"
                          >
                            Save Reply
                          </button>
                          <button
                            onClick={() => handleDeleteEnquiry(enq.id)}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Course Modal Dialog (Add / Edit) */}
      {courseFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#081a2d] text-base">
                {editingCourse ? 'Edit Academic Course' : 'Add New Academic Course'}
              </h3>
              <button
                onClick={() => setCourseFormOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={courseFormData.course_name}
                  onChange={e => setCourseFormData({ ...courseFormData, course_name: e.target.value })}
                  placeholder="e.g. BCA (Bachelor of Computer Applications)"
                  className="w-full px-3 py-1.5 border rounded bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Code</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.course_code}
                    onChange={e => setCourseFormData({ ...courseFormData, course_code: e.target.value })}
                    placeholder="BCA-101"
                    className="w-full px-3 py-1.5 border rounded bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={courseFormData.department_id}
                    onChange={e => setCourseFormData({ ...courseFormData, department_id: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border rounded bg-slate-50"
                  >
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.duration}
                    onChange={e => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                    placeholder="3 Years (6 Semesters)"
                    className="w-full px-3 py-1.5 border rounded bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Seats</label>
                  <input
                    type="number"
                    value={courseFormData.seats}
                    onChange={e => setCourseFormData({ ...courseFormData, seats: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 border rounded bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Annual Fee (&#8377;)</label>
                <input
                  type="number"
                  value={courseFormData.annual_fee}
                  onChange={e => setCourseFormData({ ...courseFormData, annual_fee: Number(e.target.value) })}
                  className="w-full px-3 py-1.5 border rounded bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Eligibility Criteria</label>
                <input
                  type="text"
                  required
                  value={courseFormData.eligibility}
                  onChange={e => setCourseFormData({ ...courseFormData, eligibility: e.target.value })}
                  placeholder="10+2 with prescribed minimum marks"
                  className="w-full px-3 py-1.5 border rounded bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Description</label>
                <textarea
                  rows={2}
                  value={courseFormData.description}
                  onChange={e => setCourseFormData({ ...courseFormData, description: e.target.value })}
                  placeholder="Curriculum overview..."
                  className="w-full px-3 py-1.5 border rounded bg-slate-50"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCourseFormOpen(false)}
                  className="px-3 py-1.5 border rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#081a2d] text-white rounded font-semibold hover:bg-slate-800"
                >
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Modal Dialog (Add / Edit) */}
      {noticeFormOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-[#081a2d] text-base">
                {editingNotice ? 'Edit Official Notice' : 'Post New Official Notice'}
              </h3>
              <button
                onClick={() => setNoticeFormOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNotice} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Title / Subject</label>
                <input
                  type="text"
                  required
                  value={noticeFormData.title}
                  onChange={e => setNoticeFormData({ ...noticeFormData, title: e.target.value })}
                  placeholder="e.g. GNDU Examination Date Sheet Release"
                  className="w-full px-3 py-1.5 border rounded bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={noticeFormData.category}
                    onChange={e => setNoticeFormData({ ...noticeFormData, category: e.target.value as Notice['category'] })}
                    className="w-full px-3 py-1.5 border rounded bg-slate-50"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Examination">Examination</option>
                    <option value="Admissions">Admissions</option>
                    <option value="Sports">Sports</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Notice Date</label>
                  <input
                    type="date"
                    required
                    value={noticeFormData.notice_date}
                    onChange={e => setNoticeFormData({ ...noticeFormData, notice_date: e.target.value })}
                    className="w-full px-3 py-1.5 border rounded bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Issuing Authority</label>
                <input
                  type="text"
                  value={noticeFormData.posted_by}
                  onChange={e => setNoticeFormData({ ...noticeFormData, posted_by: e.target.value })}
                  placeholder="Principal Office"
                  className="w-full px-3 py-1.5 border rounded bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attachment File Name (Optional)</label>
                <input
                  type="text"
                  value={noticeFormData.attachment_url}
                  onChange={e => setNoticeFormData({ ...noticeFormData, attachment_url: e.target.value })}
                  placeholder="datesheet_nov2026.pdf"
                  className="w-full px-3 py-1.5 border rounded bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Body Content</label>
                <textarea
                  required
                  rows={4}
                  value={noticeFormData.content}
                  onChange={e => setNoticeFormData({ ...noticeFormData, content: e.target.value })}
                  placeholder="Write notice circular body..."
                  className="w-full px-3 py-1.5 border rounded bg-slate-50"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNoticeFormOpen(false)}
                  className="px-3 py-1.5 border rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#c59323] text-slate-900 rounded font-semibold hover:bg-[#dfaa3b]"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Collegiate Footer */}
      <footer className="bg-[#081a2d] text-slate-300 border-t-4 border-[#c59323] pt-12 pb-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Column 1: College Memorial Profile */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#c59323] text-slate-900 font-bold text-sm rounded flex items-center justify-center">
                  SD
                </div>
                <div className="font-bold text-white text-base">SDSPM College for Women</div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-3">
                Shaheed Darshan Singh Pheruman Memorial College for Women, Rayya. Established in 1974. Affiliated with Guru Nanak Dev University (GNDU), Amritsar.
              </p>
              <div className="text-xs text-slate-400 space-y-1">
                <div><strong className="text-slate-200">Principal:</strong> Dr. (Mrs.) Anu Kapil</div>
                <div><strong className="text-slate-200">Affiliation:</strong> GNDU Amritsar</div>
                <div><strong className="text-slate-200">Recognition:</strong> UGC Act 2(f) & 12(B)</div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Quick Navigation</h3>
              <ul className="text-xs space-y-2 text-slate-400">
                <li><button onClick={() => navigateTo('about')} className="hover:text-amber-300">About College</button></li>
                <li><button onClick={() => navigateTo('courses')} className="hover:text-amber-300">Courses & Fees</button></li>
                <li><button onClick={() => navigateTo('departments')} className="hover:text-amber-300">Academic Departments</button></li>
                <li><button onClick={() => navigateTo('faculty')} className="hover:text-amber-300">Faculty Directory</button></li>
                <li><button onClick={() => navigateTo('gallery')} className="hover:text-amber-300">Campus Activities</button></li>
                <li><button onClick={() => navigateTo('notices')} className="hover:text-amber-300">Notices & News</button></li>
              </ul>
            </div>

            {/* Column 3: Portals */}
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Student & Staff Portals</h3>
              <ul className="text-xs space-y-2 text-slate-400">
                <li><button onClick={() => navigateTo('login')} className="hover:text-amber-300">Student Login Portal</button></li>
                <li><button onClick={() => navigateTo('register')} className="hover:text-amber-300">New Student Admission</button></li>
                <li><button onClick={() => navigateTo('admin-login')} className="hover:text-amber-300">Administrator CMS Login</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-amber-300">Admission Helpdesk</button></li>
                <li><button onClick={() => navigateTo('notices')} className="hover:text-amber-300">Circulars & Announcements</button></li>
              </ul>
            </div>

            {/* Column 4: Verified Contact */}
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Contact & Location</h3>
              <div className="text-xs text-slate-400 space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#c59323] shrink-0 mt-0.5" />
                  <span>{COLLEGE_DETAILS.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c59323] shrink-0" />
                  <span>Tel: {COLLEGE_DETAILS.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#c59323] shrink-0" />
                  <span>{COLLEGE_DETAILS.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#c59323] shrink-0" />
                  <a href={COLLEGE_DETAILS.website} target="_blank" rel="noreferrer" className="text-amber-300 hover:underline">
                    sdspmcollege.org
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
            <div>
              &copy; {new Date().getFullYear()} Shaheed Darshan Singh Pheruman Memorial College for Women. All rights reserved.
            </div>
            <div className="text-slate-400">
              Official Reference: <a href="https://sdspmcollege.org/" target="_blank" rel="noreferrer" className="text-slate-300 underline">sdspmcollege.org</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
