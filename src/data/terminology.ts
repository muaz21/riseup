/**
 * Terminology Glossary / قاموس المصطلحات
 * 
 * This file contains standardized translations for common terms used throughout the website.
 * Use these constants to ensure consistent terminology across all components.
 * 
 * Usage:
 * import { TERMINOLOGY } from '../data/terminology';
 * const { t } = useLanguage();
 * t(TERMINOLOGY.courses.ar, TERMINOLOGY.courses.en)
 */

export const TERMINOLOGY = {
  // Navigation / التنقل
  home: {
    ar: 'الرئيسية',
    en: 'Home'
  },
  courses: {
    ar: 'الدورات',
    en: 'Courses'
  },
  categories: {
    ar: 'الفئات',
    en: 'Categories'
  },
  paths: {
    ar: 'المسارات',
    en: 'Learning Paths'
  },
  teach: {
    ar: 'علّم معنا',
    en: 'Teach with Us'
  },
  blog: {
    ar: 'المدونة',
    en: 'Blog'
  },
  about: {
    ar: 'من نحن',
    en: 'About Us'
  },
  contact: {
    ar: 'اتصل بنا',
    en: 'Contact'
  },

  // Course-related / متعلق بالدورات
  course: {
    ar: 'دورة',
    en: 'Course'
  },
  allCourses: {
    ar: 'جميع الدورات',
    en: 'All Courses'
  },
  viewAllCourses: {
    ar: 'عرض جميع الدورات',
    en: 'View All Courses'
  },
  browseCourses: {
    ar: 'تصفح الدورات',
    en: 'Browse Courses'
  },
  courseDetails: {
    ar: 'تفاصيل الدورة',
    en: 'Course Details'
  },
  enroll: {
    ar: 'سجل الآن',
    en: 'Enroll Now'
  },
  startCourse: {
    ar: 'ابدأ الدورة',
    en: 'Start Course'
  },
  viewCourse: {
    ar: 'عرض الدورة',
    en: 'View Course'
  },
  preview: {
    ar: 'معاينة',
    en: 'Preview'
  },

  // Course Information / معلومات الدورة
  duration: {
    ar: 'المدة',
    en: 'Duration'
  },
  level: {
    ar: 'المستوى',
    en: 'Level'
  },
  beginner: {
    ar: 'مبتدئ',
    en: 'Beginner'
  },
  intermediate: {
    ar: 'متوسط',
    en: 'Intermediate'
  },
  advanced: {
    ar: 'متقدم',
    en: 'Advanced'
  },
  students: {
    ar: 'الطلاب',
    en: 'Students'
  },
  student: {
    ar: 'طالب',
    en: 'Student'
  },
  learners: {
    ar: 'المتعلمين',
    en: 'Learners'
  },
  learner: {
    ar: 'متعلم',
    en: 'Learner'
  },
  rating: {
    ar: 'التقييم',
    en: 'Rating'
  },
  reviews: {
    ar: 'التقييمات',
    en: 'Reviews'
  },
  review: {
    ar: 'تقييم',
    en: 'Review'
  },
  certificate: {
    ar: 'شهادة',
    en: 'Certificate'
  },
  certificates: {
    ar: 'الشهادات',
    en: 'Certificates'
  },
  hasCertificate: {
    ar: 'شهادة معتمدة',
    en: 'Certified'
  },

  // Badges / الشارات
  bestseller: {
    ar: 'الأكثر مبيعاً',
    en: 'Bestseller'
  },
  new: {
    ar: 'جديد',
    en: 'New'
  },
  trending: {
    ar: 'رائج',
    en: 'Trending'
  },
  popular: {
    ar: 'شائع',
    en: 'Popular'
  },
  free: {
    ar: 'مجاني',
    en: 'Free'
  },
  freeLabel: {
    ar: 'مجانا',
    en: 'FREE'
  },

  // Filters & Search / الفلاتر والبحث
  search: {
    ar: 'بحث',
    en: 'Search'
  },
  searchPlaceholder: {
    ar: 'ابحث عن الدورات...',
    en: 'Search for courses...'
  },
  filters: {
    ar: 'فلاتر',
    en: 'Filters'
  },
  applyFilters: {
    ar: 'تطبيق الفلاتر',
    en: 'Apply Filters'
  },
  clearFilters: {
    ar: 'مسح الفلاتر',
    en: 'Clear Filters'
  },
  clearAll: {
    ar: 'مسح الكل',
    en: 'Clear All'
  },
  sortBy: {
    ar: 'ترتيب حسب',
    en: 'Sort By'
  },
  found: {
    ar: 'تم العثور على',
    en: 'Found'
  },
  results: {
    ar: 'نتائج',
    en: 'Results'
  },
  noResults: {
    ar: 'لا توجد نتائج',
    en: 'No results found'
  },

  // Learning Paths / المسارات التعليمية
  learningPath: {
    ar: 'مسار تعليمي',
    en: 'Learning Path'
  },
  learningPaths: {
    ar: 'المسارات التعليمية',
    en: 'Learning Paths'
  },
  startPath: {
    ar: 'ابدأ المسار',
    en: 'Start Path'
  },
  whatYoullLearn: {
    ar: 'ما ستتعلمه',
    en: 'What you\'ll learn'
  },
  whatYoullLearnColon: {
    ar: 'ما ستتعلمه:',
    en: 'What you\'ll learn:'
  },

  // Common Actions / الإجراءات الشائعة
  learnMore: {
    ar: 'اعرف المزيد',
    en: 'Learn More'
  },
  readMore: {
    ar: 'اقرأ المزيد',
    en: 'Read More'
  },
  getStarted: {
    ar: 'ابدأ الآن',
    en: 'Get Started'
  },
  startNow: {
    ar: 'ابدأ الآن',
    en: 'Start Now'
  },
  applyNow: {
    ar: 'قدّم طلبك الآن',
    en: 'Apply Now'
  },
  joinUs: {
    ar: 'انضم إلينا',
    en: 'Join Us'
  },
  joinUsToday: {
    ar: 'انضم إلينا اليوم',
    en: 'Join Us Today'
  },
  contactUs: {
    ar: 'اتصل بنا',
    en: 'Contact Us'
  },
  viewAll: {
    ar: 'عرض الكل',
    en: 'View All'
  },
  seeAll: {
    ar: 'شاهد الكل',
    en: 'See All'
  },

  // Time & Dates / الوقت والتواريخ
  lastUpdated: {
    ar: 'آخر تحديث',
    en: 'Last updated'
  },
  lastUpdatedColon: {
    ar: 'آخر تحديث:',
    en: 'Last updated:'
  },
  lessons: {
    ar: 'دروس',
    en: 'Lessons'
  },
  lesson: {
    ar: 'درس',
    en: 'Lesson'
  },

  // Language / اللغة
  language: {
    ar: 'اللغة',
    en: 'Language'
  },
  toggleLanguage: {
    ar: 'تبديل اللغة',
    en: 'Toggle language'
  },
  arabic: {
    ar: 'العربية',
    en: 'Arabic'
  },
  english: {
    ar: 'الإنجليزية',
    en: 'English'
  },

  // Common UI Elements / عناصر واجهة المستخدم الشائعة
  loading: {
    ar: 'جاري التحميل...',
    en: 'Loading...'
  },
  error: {
    ar: 'خطأ',
    en: 'Error'
  },
  errorLoadingImage: {
    ar: 'خطأ في تحميل الصورة',
    en: 'Error loading image'
  },
  image: {
    ar: 'صورة',
    en: 'Image'
  },
  close: {
    ar: 'إغلاق',
    en: 'Close'
  },
  back: {
    ar: 'رجوع',
    en: 'Back'
  },
  next: {
    ar: 'التالي',
    en: 'Next'
  },
  previous: {
    ar: 'السابق',
    en: 'Previous'
  },

  // Success Messages / رسائل النجاح
  success: {
    ar: 'نجح',
    en: 'Success'
  },
  congratulations: {
    ar: 'تهانينا',
    en: 'Congratulations'
  },
  welcome: {
    ar: 'مرحباً',
    en: 'Welcome'
  },

  // Social & Contact / التواصل الاجتماعي
  followUs: {
    ar: 'تابعنا',
    en: 'Follow Us'
  },
  contactViaWhatsApp: {
    ar: 'تواصل عبر واتساب',
    en: 'Contact via WhatsApp'
  },
  contactUsOnWhatsApp: {
    ar: 'تواصل معنا عبر واتساب',
    en: 'Contact us on WhatsApp'
  },
  email: {
    ar: 'البريد الإلكتروني',
    en: 'Email'
  },
  phone: {
    ar: 'الهاتف',
    en: 'Phone'
  },

  // About / من نحن
  ourMission: {
    ar: 'رسالتنا',
    en: 'Our Mission'
  },
  ourVision: {
    ar: 'رؤيتنا',
    en: 'Our Vision'
  },
  ourValues: {
    ar: 'قيمنا',
    en: 'Our Values'
  },
  valuesWeBelieveIn: {
    ar: 'القيم التي نؤمن بها',
    en: 'Values We Believe In'
  },
  ourStory: {
    ar: 'قصتنا',
    en: 'Our Story'
  },
  ourSuccessStory: {
    ar: 'قصة نجاحنا',
    en: 'Our Success Story'
  },
  leadershipTeam: {
    ar: 'الفريق القيادي',
    en: 'Leadership Team'
  },
  team: {
    ar: 'الفريق',
    en: 'Team'
  },

  // Statistics / الإحصائيات
  studentsEnrolled: {
    ar: 'طالب مسجل',
    en: 'Students Enrolled'
  },
  coursesAvailable: {
    ar: 'دورة متاحة',
    en: 'Courses Available'
  },
  instructors: {
    ar: 'المدربين',
    en: 'Instructors'
  },
  instructor: {
    ar: 'مدرب',
    en: 'Instructor'
  },
  countries: {
    ar: 'دولة',
    en: 'Countries'
  },
  satisfactionRate: {
    ar: 'معدل الرضا',
    en: 'Satisfaction Rate'
  },

  // Features / المميزات
  features: {
    ar: 'المميزات',
    en: 'Features'
  },
  whyChoose: {
    ar: 'لماذا تختار',
    en: 'Why Choose'
  },
  whyChooseUs: {
    ar: 'لماذا تختارنا',
    en: 'Why Choose Us'
  },
  whyTeachWithUs: {
    ar: 'لماذا تعلّم معنا؟',
    en: 'Why teach with us?'
  },
  howItWorks: {
    ar: 'كيف يعمل',
    en: 'How it works'
  },
  successStories: {
    ar: 'قصص النجاح',
    en: 'Success Stories'
  },
  testimonials: {
    ar: 'الشهادات',
    en: 'Testimonials'
  },

  // Breadcrumbs / مسار التنقل
  youAreHere: {
    ar: 'أنت هنا',
    en: 'You are here'
  },
  homeBreadcrumb: {
    ar: 'الرئيسية',
    en: 'Home'
  },
} as const;

/**
 * Helper function to get terminology with type safety
 */
export function getTerm(key: keyof typeof TERMINOLOGY) {
  return TERMINOLOGY[key];
}

/**
 * Helper function to use with LanguageProvider's t function
 * Usage: t(getTerm('courses').ar, getTerm('courses').en)
 */
export function t(key: keyof typeof TERMINOLOGY) {
  return TERMINOLOGY[key];
}

