// Unified Course Data Source
// This file centralizes all course data from different components

export interface Course {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  subcategory?: string;
  imageUrl: string;
  duration: string;
  durationAr: string;
  level: string;
  levelAr: string;
  slug: string;
  institutionAr?: string;
  institutionEn?: string;
  institutionLogo?: string;
  // Professional card fields
  instructorNameEn?: string;
  instructorAvatar?: string;
  price?: string;
  originalPrice?: string;
  discount?: number;
  isFree?: boolean;
  reviews?: number;
  isBestseller?: boolean;
  isNew?: boolean;
  hasCertificate?: boolean;
  // Path linking
  pathId?: number;
  pathTitleAr?: string;
  pathTitleEn?: string;
}

export interface Subcategory {
  key: string;
  nameAr: string;
  nameEn: string;
}

export interface Category {
  key: string;
  nameAr: string;
  nameEn: string;
  color: string;
  gradient: string;
  icon?: string;
}

// Categories with styling - Each category has its unique color
export const CATEGORIES: Category[] = [
  {
    key: 'featured',
    nameAr: 'الجميع',
    nameEn: 'All',
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #2563eb 100%)',
  },
  {
    key: 'english',
    nameAr: 'دورات اللغة الإنجليزية',
    nameEn: 'English Courses',
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  },
  {
    key: 'programming',
    nameAr: 'دورات البرمجة',
    nameEn: 'Programming Courses',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
  },
  {
    key: 'excel',
    nameAr: 'دورات Excel',
    nameEn: 'Excel Courses',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  },
  {
    key: 'python',
    nameAr: 'دورات Python',
    nameEn: 'Python Courses',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  },
  {
    key: 'office',
    nameAr: 'دورات Microsoft Office',
    nameEn: 'Microsoft Office Courses',
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  },
];

// Category labels for course cards
export const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  english: { ar: 'اللغة الإنجليزية', en: 'English Language' },
  programming: { ar: 'البرمجة', en: 'Programming' },
  excel: { ar: 'Excel', en: 'Excel' },
  python: { ar: 'Python', en: 'Python' },
  office: { ar: 'Microsoft Office', en: 'Microsoft Office' },
  featured: { ar: 'الجميع', en: 'All' },
};

// Subcategories for each category
export const SUBCATEGORIES: Record<string, Subcategory[]> = {
  english: [
    { key: 'all', nameAr: 'الجميع', nameEn: 'All' },
    { key: 'beginner', nameAr: 'الإنجليزية للمبتدئين', nameEn: 'English for Beginners' },
    { key: 'business', nameAr: 'الإنجليزية للأعمال', nameEn: 'Business English' },
    { key: 'conversation', nameAr: 'المحادثة', nameEn: 'Conversation' },
    { key: 'grammar', nameAr: 'القواعد', nameEn: 'Grammar' },
    { key: 'vocabulary', nameAr: 'المفردات', nameEn: 'Vocabulary' },
  ],
  programming: [
    { key: 'all', nameAr: 'الجميع', nameEn: 'All' },
    { key: 'fundamentals', nameAr: 'أساسيات البرمجة', nameEn: 'Programming Fundamentals' },
    { key: 'web', nameAr: 'تطوير الويب', nameEn: 'Web Development' },
    { key: 'mobile', nameAr: 'تطوير الموبايل', nameEn: 'Mobile Development' },
    { key: 'algorithms', nameAr: 'الخوارزميات', nameEn: 'Algorithms' },
    { key: 'datastructures', nameAr: 'هياكل البيانات', nameEn: 'Data Structures' },
  ],
  excel: [
    { key: 'all', nameAr: 'الجميع', nameEn: 'All' },
    { key: 'beginner', nameAr: 'Excel للمبتدئين', nameEn: 'Excel for Beginners' },
    { key: 'advanced', nameAr: 'Excel المتقدم', nameEn: 'Advanced Excel' },
    { key: 'pivottables', nameAr: 'Pivot Tables', nameEn: 'Pivot Tables' },
    { key: 'formulas', nameAr: 'الصيغ والدوال', nameEn: 'Formulas & Functions' },
    { key: 'dataanalysis', nameAr: 'تحليل البيانات', nameEn: 'Data Analysis' },
  ],
  python: [
    { key: 'all', nameAr: 'الجميع', nameEn: 'All' },
    { key: 'python1', nameAr: 'Python 1 - الأساسيات', nameEn: 'Python 1 - Fundamentals' },
    { key: 'python2', nameAr: 'Python 2 - المتقدم', nameEn: 'Python 2 - Advanced' },
    { key: 'datascience', nameAr: 'Python للعلوم البيانات', nameEn: 'Python for Data Science' },
    { key: 'webdev', nameAr: 'Python لتطوير الويب', nameEn: 'Python for Web Development' },
    { key: 'automation', nameAr: 'الأتمتة', nameEn: 'Automation' },
  ],
  office: [
    { key: 'all', nameAr: 'الجميع', nameEn: 'All' },
    { key: 'word', nameAr: 'Microsoft Word', nameEn: 'Microsoft Word' },
    { key: 'excel', nameAr: 'Microsoft Excel', nameEn: 'Microsoft Excel' },
    { key: 'powerpoint', nameAr: 'Microsoft PowerPoint', nameEn: 'Microsoft PowerPoint' },
    { key: 'outlook', nameAr: 'Microsoft Outlook', nameEn: 'Microsoft Outlook' },
    { key: 'access', nameAr: 'Microsoft Access', nameEn: 'Microsoft Access' },
  ],
};

// All courses - merged from CurrentCoursesSection
export const COURSES: Course[] = [
  // English Courses
  {
    id: 1,
    titleAr: 'الإنجليزية للمبتدئين',
    titleEn: 'English for Beginners',
    descriptionAr: 'ابدأ رحلتك في تعلم اللغة الإنجليزية من الصفر. تعلم الأساسيات من القواعد والمفردات والمحادثة اليومية.',
    descriptionEn: 'Start your English learning journey from scratch. Learn the basics of grammar, vocabulary, and daily conversation.',
    category: 'english',
    subcategory: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop',
    duration: '3 months',
    durationAr: '3 أشهر',
    level: 'Beginner',
    levelAr: 'مبتدئ',
    slug: 'english-beginners',
    price: '$49.99',
    originalPrice: '$99.99',
    discount: 50,
    isFree: false,
    reviews: 1250,
    isBestseller: true,
    hasCertificate: true,
  },
  {
    id: 2,
    titleAr: 'الإنجليزية للأعمال',
    titleEn: 'Business English',
    descriptionAr: 'طور مهاراتك في اللغة الإنجليزية للأعمال. تعلم التواصل المهني والعروض التقديمية والمراسلات التجارية.',
    descriptionEn: 'Develop your business English skills. Learn professional communication, presentations, and business correspondence.',
    category: 'english',
    subcategory: 'business',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=450&fit=crop',
    duration: '4 months',
    durationAr: '4 أشهر',
    level: 'Intermediate',
    levelAr: 'متوسط',
    slug: 'business-english',
    price: '$79.99',
    originalPrice: '$149.99',
    discount: 47,
    isFree: false,
    reviews: 2100,
    isBestseller: true,
    hasCertificate: true,
  },
  {
    id: 3,
    titleAr: 'الإنجليزية المحادثة المتقدمة',
    titleEn: 'Advanced English Conversation',
    descriptionAr: 'احترف المحادثة باللغة الإنجليزية بطلاقة. تعلم التعبيرات الاصطلاحية والنطق الصحيح والثقة في التحدث.',
    descriptionEn: 'Master fluent English conversation. Learn idioms, proper pronunciation, and gain confidence in speaking.',
    category: 'english',
    subcategory: 'conversation',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop',
    duration: '5 months',
    durationAr: '5 أشهر',
    level: 'Advanced',
    levelAr: 'متقدم',
    slug: 'advanced-conversation',
    price: '$59.99',
    originalPrice: '$119.99',
    discount: 50,
    isFree: false,
    reviews: 980,
    isNew: true,
    hasCertificate: true,
  },
  // Programming Courses
  {
    id: 4,
    titleAr: 'أساسيات البرمجة',
    titleEn: 'Programming Fundamentals',
    descriptionAr: 'تعلم أساسيات البرمجة من الصفر. فهم المفاهيم الأساسية والخوارزميات وهياكل البيانات.',
    descriptionEn: 'Learn programming fundamentals from scratch. Understand basic concepts, algorithms, and data structures.',
    category: 'programming',
    subcategory: 'fundamentals',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop',
    duration: '6 months',
    durationAr: '6 أشهر',
    level: 'Beginner',
    levelAr: 'مبتدئ',
    slug: 'programming-fundamentals',
    pathId: 1,
    pathTitleAr: 'مسار تطوير الويب الكامل',
    pathTitleEn: 'Full Stack Web Development Path',
  },
  {
    id: 5,
    titleAr: 'تطوير الويب الكامل',
    titleEn: 'Full Stack Web Development',
    descriptionAr: 'أصبح مطور ويب كامل المكدس. تعلم HTML, CSS, JavaScript, React, Node.js وقواعد البيانات.',
    descriptionEn: 'Become a full stack web developer. Learn HTML, CSS, JavaScript, React, Node.js, and databases.',
    category: 'programming',
    subcategory: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
    duration: '8 months',
    durationAr: '8 أشهر',
    level: 'Intermediate',
    levelAr: 'متوسط',
    slug: 'fullstack-web',
    pathId: 1,
    pathTitleAr: 'مسار تطوير الويب الكامل',
    pathTitleEn: 'Full Stack Web Development Path',
  },
  {
    id: 13,
    titleAr: 'HTML للمبتدئين',
    titleEn: 'HTML for Beginners',
    descriptionAr: 'تعلم HTML من الصفر. تعلم كيفية إنشاء صفحات الويب باستخدام HTML5 والعناصر الأساسية.',
    descriptionEn: 'Learn HTML from scratch. Learn how to create web pages using HTML5 and basic elements.',
    category: 'programming',
    subcategory: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop',
    duration: '2 months',
    durationAr: 'شهران',
    level: 'Beginner',
    levelAr: 'مبتدئ',
    slug: 'html-beginners',
    pathId: 1,
    pathTitleAr: 'مسار تطوير الويب الكامل',
    pathTitleEn: 'Full Stack Web Development Path',
  },
  {
    id: 14,
    titleAr: 'CSS المتقدم',
    titleEn: 'Advanced CSS',
    descriptionAr: 'احترف CSS وتصميم المواقع. تعلم Flexbox, Grid, Animations, و Responsive Design.',
    descriptionEn: 'Master CSS and web design. Learn Flexbox, Grid, Animations, and Responsive Design.',
    category: 'programming',
    subcategory: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    duration: '3 months',
    durationAr: '3 أشهر',
    level: 'Intermediate',
    levelAr: 'متوسط',
    slug: 'css-advanced',
    pathId: 1,
    pathTitleAr: 'مسار تطوير الويب الكامل',
    pathTitleEn: 'Full Stack Web Development Path',
  },
  {
    id: 15,
    titleAr: 'JavaScript الأساسي والمتقدم',
    titleEn: 'JavaScript Fundamentals & Advanced',
    descriptionAr: 'تعلم JavaScript من الصفر حتى الاحتراف. تعلم ES6+, DOM, Async Programming, و Modern JavaScript.',
    descriptionEn: 'Learn JavaScript from scratch to advanced. Learn ES6+, DOM, Async Programming, and Modern JavaScript.',
    category: 'programming',
    subcategory: 'web',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=450&fit=crop',
    duration: '4 months',
    durationAr: '4 أشهر',
    level: 'Beginner to Advanced',
    levelAr: 'من المبتدئ إلى المتقدم',
    slug: 'javascript-complete',
    pathId: 1,
    pathTitleAr: 'مسار تطوير الويب الكامل',
    pathTitleEn: 'Full Stack Web Development Path',
  },
  // Excel Courses
  {
    id: 6,
    titleAr: 'Excel للمبتدئين',
    titleEn: 'Excel for Beginners',
    descriptionAr: 'تعلم أساسيات Excel من الصفر. إتقان الجداول والرسوم البيانية والصيغ الأساسية.',
    descriptionEn: 'Learn Excel basics from scratch. Master spreadsheets, charts, and basic formulas.',
    category: 'excel',
    subcategory: 'beginner',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=450&fit=crop',
    duration: '2 months',
    durationAr: 'شهران',
    level: 'Beginner',
    levelAr: 'مبتدئ',
    slug: 'excel-beginners',
    price: '$39.99',
    originalPrice: '$79.99',
    discount: 50,
    isFree: false,
    reviews: 5600,
    isBestseller: true,
    hasCertificate: true,
  },
  {
    id: 7,
    titleAr: 'Excel المتقدم - Pivot Tables & VLOOKUP',
    titleEn: 'Advanced Excel - Pivot Tables & VLOOKUP',
    descriptionAr: 'احترف Excel المتقدم. تعلم Pivot Tables, VLOOKUP, HLOOKUP, والوظائف المتقدمة لتحليل البيانات.',
    descriptionEn: 'Master advanced Excel. Learn Pivot Tables, VLOOKUP, HLOOKUP, and advanced functions for data analysis.',
    category: 'excel',
    subcategory: 'advanced',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    duration: '3 months',
    durationAr: '3 أشهر',
    level: 'Advanced',
    levelAr: 'متقدم',
    slug: 'excel-advanced',
    price: '$69.99',
    originalPrice: '$139.99',
    discount: 50,
    isFree: false,
    reviews: 2800,
    isBestseller: true,
    hasCertificate: true,
  },
  // Python Courses
  {
    id: 8,
    titleAr: 'Python للمبتدئين',
    titleEn: 'Python for Beginners',
    descriptionAr: 'ابدأ تعلم Python من الصفر. تعلم الأساسيات والبرمجة الكائنية والتطبيقات العملية.',
    descriptionEn: 'Start learning Python from scratch. Learn basics, object-oriented programming, and practical applications.',
    category: 'python',
    subcategory: 'python1',
    imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=450&fit=crop',
    duration: '4 months',
    durationAr: '4 أشهر',
    level: 'Beginner',
    levelAr: 'مبتدئ',
    slug: 'python-beginners',
    price: '$94.99',
    originalPrice: '$189.99',
    discount: 50,
    isFree: false,
    reviews: 6800,
    isBestseller: true,
    hasCertificate: true,
    pathId: 3,
    pathTitleAr: 'مسار علوم البيانات والذكاء الاصطناعي',
    pathTitleEn: 'Data Science & AI Path',
  },
  {
    id: 9,
    titleAr: 'Python للعلوم البيانات',
    titleEn: 'Python for Data Science',
    descriptionAr: 'استخدم Python لتحليل البيانات. تعلم Pandas, NumPy, Matplotlib وبناء نماذج التعلم الآلي.',
    descriptionEn: 'Use Python for data analysis. Learn Pandas, NumPy, Matplotlib, and build machine learning models.',
    category: 'python',
    subcategory: 'datascience',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    duration: '6 months',
    durationAr: '6 أشهر',
    level: 'Intermediate',
    levelAr: 'متوسط',
    slug: 'python-data-science',
    price: '$119.99',
    originalPrice: '$199.99',
    discount: 40,
    isFree: false,
    reviews: 3900,
    isBestseller: true,
    hasCertificate: true,
    pathId: 3,
    pathTitleAr: 'مسار علوم البيانات والذكاء الاصطناعي',
    pathTitleEn: 'Data Science & AI Path',
  },
  {
    id: 10,
    titleAr: 'Python - تطوير التطبيقات',
    titleEn: 'Python - Application Development',
    descriptionAr: 'طور تطبيقات Python احترافية. تعلم Django, Flask, APIs وبناء تطبيقات ويب كاملة.',
    descriptionEn: 'Develop professional Python applications. Learn Django, Flask, APIs, and build complete web applications.',
    category: 'python',
    subcategory: 'python2',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop',
    duration: '7 months',
    durationAr: '7 أشهر',
    level: 'Advanced',
    levelAr: 'متقدم',
    slug: 'python-app-development',
    price: '$139.99',
    originalPrice: '$249.99',
    discount: 44,
    isFree: false,
    reviews: 2100,
    isNew: true,
    hasCertificate: true,
    pathId: 3,
    pathTitleAr: 'مسار علوم البيانات والذكاء الاصطناعي',
    pathTitleEn: 'Data Science & AI Path',
  },
  // Microsoft Office Courses
  {
    id: 11,
    titleAr: 'Microsoft Word المتقدم',
    titleEn: 'Advanced Microsoft Word',
    descriptionAr: 'احترف Microsoft Word. تعلم التنسيق المتقدم، الجداول، المراجع، والفهرسة لإنشاء مستندات احترافية.',
    descriptionEn: 'Master Microsoft Word. Learn advanced formatting, tables, references, and indexing to create professional documents.',
    category: 'office',
    subcategory: 'word',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=450&fit=crop',
    duration: '2 months',
    durationAr: 'شهران',
    level: 'Intermediate',
    levelAr: 'متوسط',
    slug: 'word-advanced',
    price: '$34.99',
    originalPrice: '$69.99',
    discount: 50,
    isFree: false,
    reviews: 1800,
    hasCertificate: true,
  },
  {
    id: 12,
    titleAr: 'Microsoft PowerPoint للمحترفين',
    titleEn: 'Microsoft PowerPoint for Professionals',
    descriptionAr: 'أنشئ عروض تقديمية احترافية. تعلم التصميم المتقدم، الرسوم المتحركة، والعروض التفاعلية.',
    descriptionEn: 'Create professional presentations. Learn advanced design, animations, and interactive presentations.',
    category: 'office',
    subcategory: 'powerpoint',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=450&fit=crop',
    duration: '2 months',
    durationAr: 'شهران',
    level: 'Intermediate',
    levelAr: 'متوسط',
    slug: 'powerpoint-professional',
    price: '$39.99',
    originalPrice: '$79.99',
    discount: 50,
    isFree: false,
    reviews: 1500,
    isBestseller: true,
    hasCertificate: true,
  },
];

// Utility functions
export function getCoursesByCategory(categoryKey: string, subcategoryKey?: string): Course[] {
  if (categoryKey === 'featured' || categoryKey === 'all') {
    return COURSES;
  }
  
  let filtered = COURSES.filter((course) => course.category === categoryKey);
  
  if (subcategoryKey && subcategoryKey !== 'all') {
    filtered = filtered.filter((course) => course.subcategory === subcategoryKey);
  }
  
  return filtered;
}

export function getCategoryByKey(key: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.key === key);
}

export function getCategoryCount(categoryKey: string): number {
  return getCoursesByCategory(categoryKey).length;
}

export function getSubcategoriesByCategory(categoryKey: string): Subcategory[] {
  return SUBCATEGORIES[categoryKey] || [];
}
