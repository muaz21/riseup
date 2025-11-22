import axios, { AxiosInstance } from 'axios';
import { COURSES } from '../data/courses';

// Types
export interface LearningPath {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  durationMonths: number;
  totalCourses: number;
  studentsEnrolled: number;
  level: string;
  levelAr: string;
  skills: string[];
  skillsAr: string[];
  color: string;
  moodleCategoryId: number;
  moodleCourseId: number;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  moodleUrl: string;
  enrollmentId: number;
}

export interface EnrollmentStatus {
  isEnrolled: boolean;
  enrolledAt?: string;
  moodleUrl?: string;
}

export interface EnrolledPath extends LearningPath {
  enrolledAt: string;
}

export interface Lesson {
  id: number;
  titleAr: string;
  titleEn: string;
  durationMinutes: number;
  order: number;
}

export interface Course {
  id: number;
  pathId: number;
  titleAr: string;
  titleEn: string;
  overviewAr: string;
  overviewEn: string;
  durationHours: number;
  lessonsCount: number;
  order: number;
  lessons: Lesson[];
  learningOutcomesAr: string[];
  learningOutcomesEn: string[];
  projectsAr: string[];
  projectsEn: string[];
  // Link to course from courses page
  courseId?: number; // ID from courses.ts
}

export interface Instructor {
  id: number;
  nameAr: string;
  nameEn: string;
  bioAr: string;
  bioEn: string;
  photoUrl?: string;
  experienceYears: number;
  studentsCount: number;
}

export interface PathDetails extends LearningPath {
  overviewAr: string;
  overviewEn: string;
  afterCompletionAr: string[];
  afterCompletionEn: string[];
  courses: Course[];
  instructor: Instructor;
  totalHours: number;
}

export interface EnrollmentRequest {
  id: number;
  studentId: number;
  pathId: number;
  requestedAt: string;
  status: 'pending' | 'contacted' | 'approved';
  notes?: string;
}

export interface EnrollmentRequestResponse {
  success: boolean;
  message: string;
  requestId: number;
}

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('riseup_auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock data - matches existing PathsPage structure
const mockPaths: LearningPath[] = [
  {
    id: 1,
    titleAr: 'مسار تطوير الويب الكامل',
    titleEn: 'Full Stack Web Development Path',
    descriptionAr: 'تعلم تطوير المواقع من الصفر حتى الاحتراف',
    descriptionEn: 'Learn web development from zero to hero',
    durationMonths: 6,
    totalCourses: 12,
    studentsEnrolled: 25000,
    level: 'Beginner to Advanced',
    levelAr: 'من المبتدئ إلى المحترف',
    skills: [
      'HTML, CSS, JavaScript fundamentals',
      'React & Modern Frontend Development',
      'Node.js & Backend Development',
      'Database Design & API Integration',
    ],
    skillsAr: [
      'أساسيات HTML و CSS و JavaScript',
      'React وتطوير الواجهات الحديثة',
      'Node.js وتطوير الخادم',
      'تصميم قواعد البيانات ودمج APIs',
    ],
    color: 'from-primary via-accent to-primary',
    moodleCategoryId: 1,
    moodleCourseId: 101,
  },
  {
    id: 2,
    titleAr: 'مسار تصميم UI/UX المتقدم',
    titleEn: 'Advanced UI/UX Design Path',
    descriptionAr: 'احترف تصميم تجربة وواجهة المستخدم',
    descriptionEn: 'Master user experience and interface design',
    durationMonths: 4,
    totalCourses: 10,
    studentsEnrolled: 18000,
    level: 'Beginner to Advanced',
    levelAr: 'من المبتدئ إلى المحترف',
    skills: [
      'Design Thinking & User Research',
      'Figma & Prototyping Tools',
      'Visual Design & Typography',
      'Interaction Design & Animation',
    ],
    skillsAr: [
      'التفكير التصميمي وبحث المستخدمين',
      'Figma وأدوات النماذج الأولية',
      'التصميم البصري والطباعة',
      'تصميم التفاعل والحركة',
    ],
    color: 'from-accent via-primary to-accent',
    moodleCategoryId: 2,
    moodleCourseId: 102,
  },
  {
    id: 3,
    titleAr: 'مسار علوم البيانات والذكاء الاصطناعي',
    titleEn: 'Data Science & AI Path',
    descriptionAr: 'تعلم تحليل البيانات والتعلم الآلي',
    descriptionEn: 'Learn data analysis and machine learning',
    durationMonths: 8,
    totalCourses: 15,
    studentsEnrolled: 15000,
    level: 'Intermediate to Advanced',
    levelAr: 'من المتوسط إلى المحترف',
    skills: [
      'Python Programming & Data Structures',
      'Data Analysis with Pandas & NumPy',
      'Machine Learning & Deep Learning',
      'Real-world AI Projects',
    ],
    skillsAr: [
      'برمجة Python وهياكل البيانات',
      'تحليل البيانات مع Pandas و NumPy',
      'التعلم الآلي والتعلم العميق',
      'مشاريع ذكاء اصطناعي حقيقية',
    ],
    color: 'from-primary via-accent to-primary',
    moodleCategoryId: 3,
    moodleCourseId: 103,
  },
  {
    id: 4,
    titleAr: 'مسار التسويق الرقمي الشامل',
    titleEn: 'Complete Digital Marketing Path',
    descriptionAr: 'أتقن التسويق الرقمي ووسائل التواصل',
    descriptionEn: 'Master digital marketing and social media',
    durationMonths: 5,
    totalCourses: 11,
    studentsEnrolled: 22000,
    level: 'Beginner to Professional',
    levelAr: 'من المبتدئ إلى المحترف',
    skills: [
      'Social Media Marketing Strategy',
      'SEO & Content Marketing',
      'Google Ads & Facebook Ads',
      'Analytics & Performance Tracking',
    ],
    skillsAr: [
      'استراتيجية التسويق عبر السوشيال ميديا',
      'تحسين محركات البحث والمحتوى',
      'إعلانات Google و Facebook',
      'التحليلات وتتبع الأداء',
    ],
    color: 'from-accent via-primary to-accent',
    moodleCategoryId: 4,
    moodleCourseId: 104,
  },
  {
    id: 5,
    titleAr: 'مسار ريادة الأعمال وإدارة المشاريع',
    titleEn: 'Entrepreneurship & Project Management Path',
    descriptionAr: 'ابدأ مشروعك وأدره باحترافية',
    descriptionEn: 'Start and manage your business professionally',
    durationMonths: 6,
    totalCourses: 13,
    studentsEnrolled: 20000,
    level: 'Beginner to Advanced',
    levelAr: 'من المبتدئ إلى المحترف',
    skills: [
      'Business Planning & Strategy',
      'Agile & Scrum Methodologies',
      'Financial Management & Funding',
      'Team Leadership & Communication',
    ],
    skillsAr: [
      'تخطيط الأعمال والاستراتيجية',
      'منهجيات Agile و Scrum',
      'الإدارة المالية والتمويل',
      'قيادة الفرق والتواصل',
    ],
    color: 'from-primary via-accent to-primary',
    moodleCategoryId: 5,
    moodleCourseId: 105,
  },
  {
    id: 6,
    titleAr: 'مسار التطوير الشخصي والقيادة',
    titleEn: 'Personal Development & Leadership Path',
    descriptionAr: 'طور مهاراتك الشخصية وقدراتك القيادية',
    descriptionEn: 'Develop your soft skills and leadership abilities',
    durationMonths: 4,
    totalCourses: 9,
    studentsEnrolled: 30000,
    level: 'All Levels',
    levelAr: 'جميع المستويات',
    skills: [
      'Effective Communication Skills',
      'Time Management & Productivity',
      'Leadership & Team Building',
      'Emotional Intelligence & Mindset',
    ],
    skillsAr: [
      'مهارات التواصل الفعّال',
      'إدارة الوقت والإنتاجية',
      'القيادة وبناء الفرق',
      'الذكاء العاطفي والعقلية',
    ],
    color: 'from-accent via-primary to-accent',
    moodleCategoryId: 6,
    moodleCourseId: 106,
  },
];

// Mock storage for enrollments (in real app, this would be in backend)
const getEnrollments = (): Map<number, string> => {
  const stored = localStorage.getItem('riseup_enrollments');
  if (stored) {
    try {
      const data = JSON.parse(stored);
      return new Map(Object.entries(data).map(([k, v]) => [Number(k), v as string]));
    } catch {
      return new Map();
    }
  }
  return new Map();
};

const saveEnrollment = (pathId: number, enrolledAt: string) => {
  const enrollments = getEnrollments();
  enrollments.set(pathId, enrolledAt);
  localStorage.setItem(
    'riseup_enrollments',
    JSON.stringify(Object.fromEntries(enrollments))
  );
};

// API Functions
export const pathsApi = {
  /**
   * Get all learning paths
   */
  async getPaths(): Promise<LearningPath[]> {
    // In real app: return (await api.get('/api/paths')).data;
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockPaths]), 500); // Simulate network delay
    });
  },

  /**
   * Get a single path by ID
   */
  async getPathById(id: number): Promise<LearningPath> {
    // In real app: return (await api.get(`/api/paths/${id}`)).data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const path = mockPaths.find((p) => p.id === id);
        if (path) {
          resolve({ ...path });
        } else {
          reject(new Error('Path not found'));
        }
      }, 300);
    });
  },

  /**
   * Enroll student in a path
   */
  async enrollInPath(pathId: number, studentId: number): Promise<EnrollmentResponse> {
    // In real app: return (await api.post('/api/enroll', { path_id: pathId, student_id: studentId })).data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const path = mockPaths.find((p) => p.id === pathId);
        if (!path) {
          reject(new Error('Path not found'));
          return;
        }

        // Check if already enrolled
        const enrollments = getEnrollments();
        if (enrollments.has(pathId)) {
          reject(new Error('Already enrolled in this path'));
          return;
        }

        // Save enrollment
        const enrolledAt = new Date().toISOString();
        saveEnrollment(pathId, enrolledAt);

        // Generate Moodle URL
        const moodleUrl = `https://moodle.yoursite.com/course/view.php?id=${path.moodleCourseId}`;

        resolve({
          success: true,
          message: 'Enrollment successful',
          moodleUrl,
          enrollmentId: Date.now(),
        });
      }, 1000); // Simulate API call
    });
  },

  /**
   * Check if student is enrolled in a path
   */
  async checkEnrollmentStatus(pathId: number): Promise<EnrollmentStatus> {
    // In real app: return (await api.get(`/api/check-enrollment/${pathId}`)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const enrollments = getEnrollments();
        const enrolledAt = enrollments.get(pathId);
        const isEnrolled = !!enrolledAt;

        if (isEnrolled) {
          const path = mockPaths.find((p) => p.id === pathId);
          const moodleUrl = path
            ? `https://moodle.yoursite.com/course/view.php?id=${path.moodleCourseId}`
            : undefined;
          resolve({
            isEnrolled: true,
            enrolledAt,
            moodleUrl,
          });
        } else {
          resolve({ isEnrolled: false });
        }
      }, 200);
    });
  },

  /**
   * Get student's enrolled paths
   */
  async getMyEnrolledPaths(): Promise<EnrolledPath[]> {
    // In real app: return (await api.get('/api/my-paths')).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        const enrollments = getEnrollments();
        const enrolledPaths: EnrolledPath[] = [];

        enrollments.forEach((enrolledAt, pathId) => {
          const path = mockPaths.find((p) => p.id === pathId);
          if (path) {
            enrolledPaths.push({
              ...path,
              enrolledAt,
            });
          }
        });

        // Sort by enrollment date (newest first)
        enrolledPaths.sort((a, b) => 
          new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime()
        );

        resolve(enrolledPaths);
      }, 400);
    });
  },

  /**
   * Get full path details with courses, lessons, and instructor
   */
  async getPathDetails(id: number): Promise<PathDetails> {
    // In real app: return (await api.get(`/api/paths/${id}`)).data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const path = mockPaths.find((p) => p.id === id);
        if (!path) {
          reject(new Error('Path not found'));
          return;
        }

        // Generate courses first
        const courses = generateMockCourses(id, path.totalCourses);
        const totalHours = courses.reduce((sum, course) => sum + course.durationHours, 0);

        // Mock detailed path data
        const pathDetails: PathDetails = {
          ...path,
          overviewAr: `هذا المسار الشامل سيأخذك من المبتدئ إلى المحترف في ${path.titleAr.toLowerCase()}. ستحصل على تدريب عملي شامل مع مشاريع حقيقية وشهادة معتمدة عند الإتمام.`,
          overviewEn: `This comprehensive path will take you from beginner to professional in ${path.titleEn.toLowerCase()}. You'll get hands-on training with real projects and a certified certificate upon completion.`,
          afterCompletionAr: [
            'تصميم وتطوير مشاريع كاملة',
            'العمل كمحترف في المجال',
            'إنشاء بورتفوليو قوي يؤهلك للعمل',
            'الحصول على شهادة معتمدة',
          ],
          afterCompletionEn: [
            'Design and develop complete projects',
            'Work as a professional in the field',
            'Build a strong portfolio for employment',
            'Get a certified certificate',
          ],
          courses,
          totalHours,
          instructor: {
            id: 1,
            nameAr: 'أحمد محمد',
            nameEn: 'Ahmed Mohamed',
            bioAr: 'مدرب محترف مع أكثر من 10 سنوات من الخبرة في المجال. درب أكثر من 50,000 طالب حول العالم.',
            bioEn: 'Professional instructor with over 10 years of experience. Trained over 50,000 students worldwide.',
            experienceYears: 10,
            studentsCount: 50000,
          },
        };

        resolve(pathDetails);
      }, 500);
    });
  },

  /**
   * Create enrollment request
   */
  async createEnrollmentRequest(pathId: number, studentId: number): Promise<EnrollmentRequestResponse> {
    // In real app: return (await api.post('/api/enrollment-requests', { path_id: pathId, student_id: studentId })).data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const path = mockPaths.find((p) => p.id === pathId);
        if (!path) {
          reject(new Error('Path not found'));
          return;
        }

        // Save request to localStorage (mock)
        const requests = getEnrollmentRequests();
        const newRequest: EnrollmentRequest = {
          id: Date.now(),
          studentId,
          pathId,
          requestedAt: new Date().toISOString(),
          status: 'pending',
        };
        requests.push(newRequest);
        localStorage.setItem('riseup_enrollment_requests', JSON.stringify(requests));

        resolve({
          success: true,
          message: 'Enrollment request submitted successfully',
          requestId: newRequest.id,
        });
      }, 800);
    });
  },
};

// Helper function to generate mock courses
function generateMockCourses(pathId: number, count: number): Course[] {
  // Find courses from courses.ts that belong to this path
  const linkedCourses = COURSES.filter(c => c.pathId === pathId);
  
  // If we have linked courses, use them as base (use actual count, not the fallback count)
  if (linkedCourses.length > 0) {
    return linkedCourses.map((linkedCourse, index) => {
      const lessonsCount = 10 + Math.floor(Math.random() * 10); // 10-20 lessons
      // Calculate duration from course duration string
      const durationMatch = linkedCourse.durationAr.match(/(\d+)/);
      const durationMonths = durationMatch ? parseInt(durationMatch[1]) : 2;
      const durationHours = durationMonths * 20; // Approximate: 20 hours per month

      return {
        id: pathId * 100 + index + 1,
        pathId,
        titleAr: linkedCourse.titleAr,
        titleEn: linkedCourse.titleEn,
        overviewAr: linkedCourse.descriptionAr,
        overviewEn: linkedCourse.descriptionEn,
        durationHours,
        lessonsCount,
        order: index + 1,
        courseId: linkedCourse.id, // Link to course from courses.ts
        lessons: Array.from({ length: lessonsCount }, (_, j) => ({
          id: (pathId * 100 + index + 1) * 100 + j + 1,
          titleAr: `الدرس ${j + 1}: ${linkedCourse.titleAr}`,
          titleEn: `Lesson ${j + 1}: ${linkedCourse.titleEn}`,
          durationMinutes: 15 + Math.floor(Math.random() * 30), // 15-45 minutes
          order: j + 1,
        })),
        learningOutcomesAr: [
          'فهم المفاهيم الأساسية',
          'تطبيق المهارات عملياً',
          'بناء مشاريع حقيقية',
        ],
        learningOutcomesEn: [
          'Understand fundamental concepts',
          'Apply skills practically',
          'Build real projects',
        ],
        projectsAr: [
          'مشروع عملي 1',
          'مشروع نهائي',
        ],
        projectsEn: [
          'Practical Project 1',
          'Final Project',
        ],
      };
    });
  }

  // Fallback: generate mock courses if no linked courses found
  const courseTitlesAr = [
    'مقدمة في المجال',
    'الأساسيات المتقدمة',
    'التطبيق العملي',
    'المشاريع الحقيقية',
    'التخصص المتقدم',
    'الاحتراف في المجال',
  ];

  const courseTitlesEn = [
    'Introduction to the Field',
    'Advanced Fundamentals',
    'Practical Application',
    'Real Projects',
    'Advanced Specialization',
    'Professional Mastery',
  ];

  return Array.from({ length: count }, (_, i) => {
    const courseNum = i + 1;
    const lessonsCount = 10 + Math.floor(Math.random() * 10); // 10-20 lessons
    const durationHours = 8 + Math.floor(Math.random() * 8); // 8-16 hours

    return {
      id: pathId * 100 + courseNum,
      pathId,
      titleAr: `${courseNum}. ${courseTitlesAr[i % courseTitlesAr.length]}`,
      titleEn: `${courseNum}. ${courseTitlesEn[i % courseTitlesEn.length]}`,
      overviewAr: `في هذه الدورة ستتعلم ${courseTitlesAr[i % courseTitlesAr.length].toLowerCase()} بشكل شامل وعملي.`,
      overviewEn: `In this course you will learn ${courseTitlesEn[i % courseTitlesEn.length].toLowerCase()} comprehensively and practically.`,
      durationHours,
      lessonsCount,
      order: courseNum,
      lessons: Array.from({ length: lessonsCount }, (_, j) => ({
        id: (pathId * 100 + courseNum) * 100 + j + 1,
        titleAr: `الدرس ${j + 1}: ${courseTitlesAr[i % courseTitlesAr.length]}`,
        titleEn: `Lesson ${j + 1}: ${courseTitlesEn[i % courseTitlesEn.length]}`,
        durationMinutes: 15 + Math.floor(Math.random() * 30), // 15-45 minutes
        order: j + 1,
      })),
      learningOutcomesAr: [
        'فهم المفاهيم الأساسية',
        'تطبيق المهارات عملياً',
        'بناء مشاريع حقيقية',
      ],
      learningOutcomesEn: [
        'Understand fundamental concepts',
        'Apply skills practically',
        'Build real projects',
      ],
      projectsAr: [
        'مشروع عملي 1',
        'مشروع نهائي',
      ],
      projectsEn: [
        'Practical Project 1',
        'Final Project',
      ],
    };
  });
}

// Helper function to get enrollment requests from localStorage
function getEnrollmentRequests(): EnrollmentRequest[] {
  const stored = localStorage.getItem('riseup_enrollment_requests');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

