export interface Department {
  id: number;
  name: string;
  code: string;
  head_of_department: string;
  description: string;
}

export interface Course {
  id: number;
  course_name: string;
  course_code: string;
  department_id: number;
  department_name?: string;
  duration: string;
  eligibility: string;
  seats: number;
  annual_fee: number;
  description: string;
}

export interface FacultyMember {
  id: number;
  name: string;
  designation: string;
  department_id: number;
  department_name: string;
  qualification: string;
  email: string;
  experience: string;
}

export interface Notice {
  id: number;
  title: string;
  category: 'Academic' | 'Examination' | 'Admissions' | 'Sports' | 'General';
  notice_date: string;
  content: string;
  attachment_url?: string;
  is_active: boolean;
  posted_by: string;
}

export interface Student {
  id: number;
  roll_no: string;
  full_name: string;
  email: string;
  phone: string;
  course_id: number;
  course_name?: string;
  gender: string;
  address: string;
  status: 'Active' | 'Pending' | 'Suspended';
  created_at: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'In Review' | 'Resolved';
  admin_reply?: string;
  created_at: string;
}

export const COLLEGE_DETAILS = {
  fullName: 'Shaheed Darshan Singh Pheruman Memorial College for Women',
  shortName: 'SDSPM College for Women',
  motto: 'Truth, Righteousness and Women Empowerment',
  established: '1974',
  principal: 'Dr. (Mrs.) Anu Kapil (Officiating Principal - M.Sc. Hons., Ph.D., UGC NET)',
  affiliation: 'Guru Nanak Dev University (GNDU), Amritsar',
  recognition: 'Recognized under Section 2(f) & 12(B) of UGC Act, 1956',
  address: 'G.T. Road, Rayya, District Amritsar, Punjab – 143112, India',
  phone: '01853-222403',
  mobile: '+91-9915712336, +91-9646847383',
  email: 'sdspm_college@yahoo.com',
  website: 'https://sdspmcollege.org/'
};

export const initialDepartments: Department[] = [
  {
    id: 1,
    name: 'P.G. Department of Computer Science and Applications',
    code: 'CSA',
    head_of_department: 'Mrs. Vandana (MCA, UGC NET)',
    description: 'Provides advanced computer education including M.Sc. IT, BCA, PGDCA, and CCA with high-tech software laboratories.'
  },
  {
    id: 2,
    name: 'Department of Commerce & Management',
    code: 'COMM',
    head_of_department: 'Ms. Shagunpreet Kaur (M.Com.)',
    description: 'Imparts business literacy, corporate management, taxation, and financial accounting through B.Com. and BBA programs.'
  },
  {
    id: 3,
    name: 'Department of Economics & Mathematics',
    code: 'ECO',
    head_of_department: 'Dr. (Mrs.) Anu Kapil (M.Sc. Hons., Ph.D.)',
    description: 'Conducts specialized B.Sc. Economics and mathematical curriculum blending quantitative analytics with applied economic theory.'
  },
  {
    id: 4,
    name: 'Department of Social Sciences',
    code: 'SOC',
    head_of_department: 'Mrs. Daljeet Kaur (M.A., M.Phil., UGC NET)',
    description: 'Offers Political Science and History within the Bachelor of Arts (B.A.) program, cultivating critical inquiry.'
  },
  {
    id: 5,
    name: 'Department of Languages',
    code: 'LANG',
    head_of_department: 'Dr. (Mrs.) Harwant Kaur (M.A., Ph.D., UGC NET)',
    description: 'Imparts linguistic proficiency and communication mastery in English and Punjabi languages and literature.'
  },
  {
    id: 6,
    name: 'Department of Cosmetology & Skill Development',
    code: 'COSM',
    head_of_department: 'Department Coordinator',
    description: 'Offers Certificate and Diploma in Cosmetology providing vocational training in skin care, hair styling, and beauty wellness for female empowerment.'
  },
  {
    id: 7,
    name: 'Department of Fashion Designing',
    code: 'FD',
    head_of_department: 'Mrs. Amandeep Kaur (M.Sc. FD)',
    description: 'Specialized instruction in garment construction, textile illustration, and fashion entrepreneurship.'
  },
  {
    id: 8,
    name: 'Department of Music',
    code: 'MUS',
    head_of_department: 'Mrs. Rajpreet Kaur (M.A., M.Phil.)',
    description: 'Nurtures traditional Gurmat sangeet, classical vocal, instrumental music, and traditional Punjabi folk arts.'
  },
  {
    id: 9,
    name: 'Department of Physical Education',
    code: 'PED',
    head_of_department: 'Mrs. Rupinder Kaur (M.P.Ed.)',
    description: 'Promotes athletic prowess, university sports representation, self-defense workshops, and holistic wellness.'
  }
];

export const initialCourses: Course[] = [
  {
    id: 1,
    course_name: 'M.Sc. IT (Information Technology)',
    course_code: 'MSC-IT-101',
    department_id: 1,
    department_name: 'P.G. Department of Computer Science and Applications',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Graduation with BCA / B.Sc. IT / B.Sc. Computer Science or Graduate with Computer Science as an elective subject with minimum 50% aggregate marks.',
    seats: 30,
    annual_fee: 32000,
    description: 'Advanced postgraduate degree under GNDU Amritsar covering Software Engineering, Advanced Database Systems, Cloud Computing, and Network Security.'
  },
  {
    id: 2,
    course_name: 'BCA (Bachelor of Computer Applications)',
    course_code: 'BCA-101',
    department_id: 1,
    department_name: 'P.G. Department of Computer Science and Applications',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 in any stream from a recognized board with at least 40% marks in aggregate.',
    seats: 60,
    annual_fee: 26000,
    description: 'Professional undergraduate computing degree under GNDU covering Programming in C++, Java, Web Development, DBMS, and Python.'
  },
  {
    id: 3,
    course_name: 'B.Sc. Economics',
    course_code: 'BSC-ECO-101',
    department_id: 3,
    department_name: 'Department of Economics & Mathematics',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 with Mathematics or Economics from a recognized board with at least 40% aggregate marks.',
    seats: 45,
    annual_fee: 22000,
    description: 'Specialized undergraduate program under GNDU integrating Micro/Macro Economics, Quantitative Mathematics, and Computer Applications.'
  },
  {
    id: 4,
    course_name: 'BA (Bachelor of Arts)',
    course_code: 'BA-101',
    department_id: 4,
    department_name: 'Department of Social Sciences',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 examination in any discipline from Punjab School Education Board / CBSE / ICSE or equivalent.',
    seats: 120,
    annual_fee: 16000,
    description: 'Affiliated with GNDU with elective options in Political Science, History, Economics, Elective Punjabi, Elective English, Music, and Physical Education.'
  },
  {
    id: 5,
    course_name: 'B.Com. (Bachelor of Commerce)',
    course_code: 'BCOM-101',
    department_id: 2,
    department_name: 'Department of Commerce & Management',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 in Commerce stream with 40% marks or Arts/Science with 45% marks.',
    seats: 80,
    annual_fee: 24000,
    description: 'Undergraduate GNDU degree in Financial Accounting, Corporate Law, Direct & Indirect Taxation, and Banking Operations.'
  },
  {
    id: 6,
    course_name: 'BBA (Bachelor of Business Administration)',
    course_code: 'BBA-101',
    department_id: 2,
    department_name: 'Department of Commerce & Management',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 in any stream with minimum 40% aggregate marks.',
    seats: 50,
    annual_fee: 25000,
    description: 'Comprehensive business administration degree under GNDU covering Marketing, Human Resource Management, and Financial Analysis.'
  },
  {
    id: 7,
    course_name: 'PGDCA (Post Graduate Diploma in Computer Applications)',
    course_code: 'PGDCA-101',
    department_id: 1,
    department_name: 'P.G. Department of Computer Science and Applications',
    duration: '1 Year (2 Semesters)',
    eligibility: 'Graduation in any stream with minimum 45% aggregate marks from a recognized university.',
    seats: 40,
    annual_fee: 20000,
    description: 'One-year post-graduate diploma under GNDU tailored for IT sector employment, database management, and office automation.'
  },
  {
    id: 8,
    course_name: 'CCA (Certificate in Computer Applications)',
    course_code: 'CCA-101',
    department_id: 1,
    department_name: 'P.G. Department of Computer Science and Applications',
    duration: '6 Months / 1 Year',
    eligibility: '10+2 passed in any stream from a recognized board.',
    seats: 40,
    annual_fee: 9000,
    description: 'UGC-supported add-on career oriented certificate in computer fundamentals, MS Office, typing, Internet operations, and accounting software.'
  },
  {
    id: 9,
    course_name: 'Certificate in Cosmetology',
    course_code: 'CERT-COSM-101',
    department_id: 6,
    department_name: 'Department of Cosmetology & Skill Development',
    duration: '1 Year',
    eligibility: '10+2 in any stream from a recognized educational board.',
    seats: 35,
    annual_fee: 12000,
    description: 'Skill-oriented vocational certificate covering personal grooming, skin aesthetics, hair designing, herbal beauty treatments, and self-employment salon management for women.'
  }
];

export const initialFaculty: FacultyMember[] = [
  {
    id: 1,
    name: 'Dr. (Mrs.) Anu Kapil',
    designation: 'Officiating Principal & Associate Professor',
    department_id: 3,
    department_name: 'Department of Economics & Mathematics',
    qualification: 'M.Sc. (Hons.), Ph.D., UGC NET',
    email: 'principal@sdspmcollege.org',
    experience: '22 Years'
  },
  {
    id: 2,
    name: 'Mrs. Vandana',
    designation: 'Assistant Professor & HOD',
    department_id: 1,
    department_name: 'P.G. Department of Computer Science and Applications',
    qualification: 'MCA, UGC NET',
    email: 'vandana.csa@sdspmcollege.org',
    experience: '12 Years'
  },
  {
    id: 3,
    name: 'Ms. Sukhmanpreet Kaur',
    designation: 'Assistant Professor',
    department_id: 1,
    department_name: 'P.G. Department of Computer Science and Applications',
    qualification: 'M.Sc. Computer Science',
    email: 'sukhman.csa@sdspmcollege.org',
    experience: '6 Years'
  },
  {
    id: 4,
    name: 'Ms. Navdeep Kaur',
    designation: 'Assistant Professor',
    department_id: 1,
    department_name: 'P.G. Department of Computer Science and Applications',
    qualification: 'M.C.A.',
    email: 'navdeep.csa@sdspmcollege.org',
    experience: '5 Years'
  },
  {
    id: 5,
    name: 'Ms. Kiranpreet Kaur',
    designation: 'Assistant Professor',
    department_id: 1,
    department_name: 'P.G. Department of Computer Science and Applications',
    qualification: 'M.Sc. IT',
    email: 'kiran.csa@sdspmcollege.org',
    experience: '4 Years'
  },
  {
    id: 6,
    name: 'Ms. Sanreet Kaur',
    designation: 'Assistant Professor',
    department_id: 1,
    department_name: 'P.G. Department of Computer Science and Applications',
    qualification: 'MCA',
    email: 'sanreet.csa@sdspmcollege.org',
    experience: '4 Years'
  },
  {
    id: 7,
    name: 'Ms. Shagunpreet Kaur',
    designation: 'Assistant Professor & HOD',
    department_id: 2,
    department_name: 'Department of Commerce & Management',
    qualification: 'M.Com.',
    email: 'shagun.comm@sdspmcollege.org',
    experience: '7 Years'
  },
  {
    id: 8,
    name: 'Ms. Khushpreet Kaur',
    designation: 'Assistant Professor',
    department_id: 2,
    department_name: 'Department of Commerce & Management',
    qualification: 'M.Com.',
    email: 'khushpreet.comm@sdspmcollege.org',
    experience: '5 Years'
  },
  {
    id: 9,
    name: 'Mrs. Jasleen Kaur',
    designation: 'Assistant Professor',
    department_id: 3,
    department_name: 'Department of Economics & Mathematics',
    qualification: 'M.Sc. Mathematics, B.Ed.',
    email: 'jasleen.math@sdspmcollege.org',
    experience: '8 Years'
  },
  {
    id: 10,
    name: 'Ms. Gursimran Kaur',
    designation: 'Assistant Professor',
    department_id: 3,
    department_name: 'Department of Economics & Mathematics',
    qualification: 'MBA',
    email: 'gursimran.eco@sdspmcollege.org',
    experience: '5 Years'
  },
  {
    id: 11,
    name: 'Mrs. Daljeet Kaur',
    designation: 'Assistant Professor & HOD',
    department_id: 4,
    department_name: 'Department of Social Sciences',
    qualification: 'M.A. Political Science, M.Phil., UGC NET',
    email: 'daljeet.pol@sdspmcollege.org',
    experience: '14 Years'
  },
  {
    id: 12,
    name: 'Mrs. Jyoti',
    designation: 'Assistant Professor',
    department_id: 4,
    department_name: 'Department of Social Sciences',
    qualification: 'M.A. History, M.Phil.',
    email: 'jyoti.hist@sdspmcollege.org',
    experience: '9 Years'
  },
  {
    id: 13,
    name: 'Dr. (Mrs.) Harwant Kaur',
    designation: 'Associate Professor & HOD',
    department_id: 5,
    department_name: 'Department of Languages',
    qualification: 'M.A. Punjabi, Ph.D., UGC NET',
    email: 'harwant.pun@sdspmcollege.org',
    experience: '18 Years'
  },
  {
    id: 14,
    name: 'Mrs. Karamjit Kaur',
    designation: 'Assistant Professor',
    department_id: 5,
    department_name: 'Department of Languages',
    qualification: 'M.A. Punjabi, B.Ed., UGC NET',
    email: 'karamjit.pun@sdspmcollege.org',
    experience: '11 Years'
  },
  {
    id: 15,
    name: 'Mrs. Inderpal Kaur',
    designation: 'Assistant Professor & HOD',
    department_id: 5,
    department_name: 'Department of Languages',
    qualification: 'M.A. English, UGC NET',
    email: 'inderpal.eng@sdspmcollege.org',
    experience: '10 Years'
  },
  {
    id: 16,
    name: 'Ms. Gurpreet Kaur',
    designation: 'Assistant Professor',
    department_id: 5,
    department_name: 'Department of Languages',
    qualification: 'M.A. English',
    email: 'gurpreet.eng@sdspmcollege.org',
    experience: '6 Years'
  },
  {
    id: 17,
    name: 'Mrs. Amandeep Kaur',
    designation: 'Assistant Professor & HOD',
    department_id: 7,
    department_name: 'Department of Fashion Designing',
    qualification: 'M.Sc. Fashion Designing',
    email: 'amandeep.fd@sdspmcollege.org',
    experience: '8 Years'
  },
  {
    id: 18,
    name: 'Mrs. Rajpreet Kaur',
    designation: 'Assistant Professor & HOD',
    department_id: 8,
    department_name: 'Department of Music',
    qualification: 'M.A., M.Phil. (Inst. & Vocal), B.Ed., UGC NET',
    email: 'rajpreet.mus@sdspmcollege.org',
    experience: '12 Years'
  },
  {
    id: 19,
    name: 'S. Satnam Singh',
    designation: 'Accompanist',
    department_id: 8,
    department_name: 'Department of Music',
    qualification: 'Tabla Player (Traditional Arts)',
    email: 'satnam.music@sdspmcollege.org',
    experience: '15 Years'
  },
  {
    id: 20,
    name: 'Mrs. Rupinder Kaur',
    designation: 'Director Physical Education',
    department_id: 9,
    department_name: 'Department of Physical Education',
    qualification: 'M.P.Ed.',
    email: 'rupinder.sports@sdspmcollege.org',
    experience: '10 Years'
  }
];

export const initialNotices: Notice[] = [
  {
    id: 1,
    title: 'GNDU Semester Examination Schedule & Verification',
    category: 'Examination',
    notice_date: '2026-10-28',
    content: 'All regular students appearing in GNDU Odd-Semester Examinations (Nov-Dec 2026) are directed to collect and verify their Roll Number Admit Cards from the college examination branch. Check datesheet on college notice board.',
    attachment_url: 'gndu_datesheet_2026.pdf',
    is_active: true,
    posted_by: 'Examination Branch'
  },
  {
    id: 2,
    title: 'Admissions Open for Certificate in Cosmetology & CCA',
    category: 'Admissions',
    notice_date: '2026-10-25',
    content: 'Applications are invited from female students for admission to UGC/Skill development certificate programs in Cosmetology (Skin & Hair Aesthetics) and Certificate in Computer Applications (CCA). Limited seats available.',
    attachment_url: 'cosmetology_cca_admission.pdf',
    is_active: true,
    posted_by: 'Principal Office'
  },
  {
    id: 3,
    title: 'Shaheed Darshan Singh Pheruman Martyrdom Commemoration Day',
    category: 'General',
    notice_date: '2026-10-20',
    content: 'The college will observe the 57th Martyrdom Anniversary of revered patriot Shaheed Darshan Singh Pheruman on October 27 with special Gurmat seminar, tribute ceremony, and social service drive.',
    is_active: true,
    posted_by: 'Memorial Committee'
  },
  {
    id: 4,
    title: 'Post-Matric Scholarship Scheme for SC/BC Girl Students',
    category: 'Academic',
    notice_date: '2026-10-15',
    content: 'Eligible SC/OBC rural girl students must submit their Dr. Ambedkar Scholarship portal printouts along with income and caste certificates at the scholarship counter before the closing date.',
    is_active: true,
    posted_by: 'Student Welfare Council'
  }
];

export const initialStudents: Student[] = [
  {
    id: 1,
    roll_no: 'SDSPM-2026-001',
    full_name: 'Simranjeet Kaur',
    email: 'simran.kaur@example.com',
    phone: '9876543210',
    course_id: 2,
    course_name: 'BCA (Bachelor of Computer Applications)',
    gender: 'Female',
    address: 'Rayya, Distt. Amritsar, Punjab',
    status: 'Active',
    created_at: '2026-10-01'
  },
  {
    id: 2,
    roll_no: 'SDSPM-2026-002',
    full_name: 'Navjot Sharma',
    email: 'navjot.s@example.com',
    phone: '9812345678',
    course_id: 5,
    course_name: 'B.Com. (Bachelor of Commerce)',
    gender: 'Female',
    address: 'Beas, Distt. Amritsar, Punjab',
    status: 'Active',
    created_at: '2026-10-05'
  },
  {
    id: 3,
    roll_no: 'SDSPM-2026-003',
    full_name: 'Gurleen Kaur',
    email: 'gurleen.k@example.com',
    phone: '9878901234',
    course_id: 9,
    course_name: 'Certificate in Cosmetology',
    gender: 'Female',
    address: 'Baba Bakala Sahib, Distt. Amritsar',
    status: 'Active',
    created_at: '2026-10-10'
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 1,
    name: 'Rajwinder Kaur',
    email: 'rajwinder@gmail.com',
    phone: '9872109876',
    subject: 'Query regarding Certificate in Cosmetology syllabus and timings',
    message: 'Kindly let me know the practical training hours, lab kit details, and certificate accreditation for the 1-year Cosmetology course.',
    status: 'Resolved',
    admin_reply: 'Course timings are 9:30 AM to 1:30 PM with hands-on salon practicals. Syllabus brochure has been emailed.',
    created_at: '2026-10-22 11:30 AM'
  },
  {
    id: 2,
    name: 'Manpreet Kaur',
    email: 'manpreet.k@gmail.com',
    phone: '9814455667',
    subject: 'B.Sc. Economics admission eligibility and bus routes',
    message: 'I have passed 10+2 with economics from Rayya area. Please provide information regarding college bus facility for rural villages.',
    status: 'In Review',
    created_at: '2026-10-30 02:15 PM'
  }
];
