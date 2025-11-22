import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';
import { ProfessionalCourseCard } from './ProfessionalCourseCard';
import { 
  Play,
} from 'lucide-react';
import { motion } from 'motion/react';
import { COURSES, CATEGORIES, CATEGORY_LABELS, getCategoryByKey } from '../data/courses';

interface TrendingCoursesSectionProps {
  onNavigate?: (page: string) => void;
}

interface Course {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  imageUrl: string;
  duration: string;
  durationAr: string;
  rating: number;
  learners: string;
  level: string;
  levelAr: string;
  slug: string;
  institutionAr?: string;
  institutionEn?: string;
  institutionLogo?: string;
  price?: string;
  originalPrice?: string;
  discount?: number;
  isFree?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  hasCertificate?: boolean;
  instructorNameAr?: string;
  instructorNameEn?: string;
  instructorAvatar?: string;
  lessons?: number;
  reviews?: number;
}

// Use categories from unified data source
const CATEGORIES_FOR_SECTION = CATEGORIES.map(cat => ({
  key: cat.key,
  ar: cat.nameAr,
  en: cat.nameEn,
}));

const TABS = [
  { key: 'executive', ar: 'التعليم التنفيذي', en: 'Executive Education' },
];

// Use courses from unified data source
const MOCK_COURSES: Course[] = COURSES;

export function TrendingCoursesSection({ onNavigate }: TrendingCoursesSectionProps) {
  const { t, dir } = useLanguage();
  const [activeTab, setActiveTab] = useState('executive');
  const [selectedCategory, setSelectedCategory] = useState('featured');

  // Filter courses by category
  const filteredCourses = useMemo(() => {
    let courses = MOCK_COURSES;
    
    if (selectedCategory !== 'featured') {
      courses = courses.filter((course) => course.category === selectedCategory);
    }
    
    return courses;
  }, [selectedCategory]);

  // Reset category when tab changes
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedCategory('featured');
  };

  return (
    <section className="py-8 relative transition-colors duration-300 bg-slate-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Benefit-focused */}
        <div className={`mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <h2 className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300 text-slate-900 leading-tight">
            {t('ابدأ رحلتك التعليمية مع أفضل الدورات', 'Start Your Learning Journey with the Best Courses')}
          </h2>
          <p className="text-base sm:text-lg transition-colors duration-300 text-slate-600 max-w-2xl">
            {t('اكتشف الدورات الأكثر طلباً والمصممة خصيصاً لمساعدتك على النجاح في مسيرتك المهنية', 'Discover the most in-demand courses designed specifically to help you succeed in your career')}
          </p>
        </div>

        {/* Category Filter - Mobile Friendly */}
        <div className="mb-6">
          <div
            className="flex flex-col sm:flex-row gap-2 sm:overflow-x-auto scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide overflow-x-hidden sm:overflow-x-auto"
            style={{ 
              scrollBehavior: 'smooth',
            }}
          >
            {CATEGORIES_FOR_SECTION.map((category) => {
              const handleCategoryClick = () => {
                if (category.key === 'featured') {
                  onNavigate?.('courses');
                } else {
                  onNavigate?.(`courses/${category.key}`);
                }
              };
              
              return (
                <button
                  key={category.key}
                  onClick={handleCategoryClick}
                  className={`px-4 py-2.5 text-sm rounded-full whitespace-nowrap font-medium transition-all duration-200 flex-shrink-0 active:scale-95 ${
                    selectedCategory === category.key
                      ? 'shadow-md hover:shadow-lg border-2 bg-blue-600 hover:bg-blue-700 border-blue-700'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-sm hover:shadow-md'
                  }`}
                  style={selectedCategory === category.key ? { 
                    color: '#ffffff',
                    backgroundColor: '#2563eb',
                    borderColor: '#1d4ed8'
                  } : {
                    color: '#475569',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {t(category.ar, category.en)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses && filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {/* Course Cards */}
            {filteredCourses.map((course, index) => {
              const categoryLabel = CATEGORY_LABELS[course.category] || CATEGORY_LABELS.featured;
              const categoryInfo = getCategoryByKey(course.category);
              return (
                <div key={course.id} className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[280px]">
                  <ProfessionalCourseCard
                    titleAr={course.titleAr}
                    titleEn={course.titleEn}
                    descriptionAr={course.descriptionAr}
                    descriptionEn={course.descriptionEn}
                    imageUrl={course.imageUrl}
                    categoryLabelAr={categoryLabel.ar}
                    categoryLabelEn={categoryLabel.en}
                    categoryColor={categoryInfo?.color}
                    rating={course.rating}
                    reviews={course.reviews}
                    learners={course.learners}
                    duration={course.duration}
                    durationAr={course.durationAr}
                    level={course.level}
                    levelAr={course.levelAr}
                    lessons={course.lessons}
                    instructorNameEn={course.instructorNameEn}
                    instructorNameAr={course.instructorNameAr}
                    instructorAvatar={course.instructorAvatar}
                    price={course.price}
                    originalPrice={course.originalPrice}
                    discount={course.discount}
                    isFree={course.isFree}
                    isBestseller={course.isBestseller}
                    isNew={course.isNew}
                    hasCertificate={course.hasCertificate}
                    onViewCourse={() => onNavigate?.('course')}
                  />
                </div>
              );
            })}
              </div>
        ) : (
          <div className={`text-center py-12 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <p className="text-slate-600 text-lg">
              {t('لا توجد دورات متاحة في هذه الفئة', 'No courses available in this category')}
            </p>
            </div>
        )}
      </div>
    </section>
  );
}
