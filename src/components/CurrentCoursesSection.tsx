import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';
import { ModernCourseCard } from './ModernCourseCard';
import {
  Play,
} from 'lucide-react';
import { motion } from 'motion/react';
import { COURSES, CATEGORIES, CATEGORY_LABELS } from '../data/courses';

interface CurrentCoursesSectionProps {
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

export function CurrentCoursesSection({ onNavigate }: CurrentCoursesSectionProps) {
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
        {/* Hero Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #2563eb 100%)',
          }}
        >
          {/* Diagonal Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  rgba(255, 255, 255, 0.1) 10px,
                  rgba(255, 255, 255, 0.1) 20px
                )`,
              }}
            />
          </div>

          <div className="relative px-8 py-8 md:px-12 md:py-10 lg:px-16 lg:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Main Heading */}
              <div className={`${dir === 'rtl' ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                <motion.h2
                  initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                >
                  {t(
                    'استعد للدورات القادمة',
                    'Get ready for upcoming courses'
                  )}
                </motion.h2>
              </div>

              {/* Right: Description */}
              <div className={`${dir === 'rtl' ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left`}>
                <motion.p
                  initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl text-white/90 leading-relaxed mb-6"
                >
                  {t(
                    'اكتشف مجموعة متنوعة من الدورات التعليمية القادمة المصممة خصيصاً لتلبية احتياجاتك التعليمية والمهنية. سجل الآن واحجز مكانك.',
                    'Discover a diverse range of upcoming educational courses designed specifically to meet your learning and professional needs. Register now and secure your spot.'
                  )}
                </motion.p>

                {/* Video Preview Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-lg hover:bg-white/30 transition-colors"
                  >
                    <Play
                      className={`w-8 h-8 text-white ${dir === 'rtl' ? 'rotate-180' : ''}`}
                      fill="white"
                    />
                    {/* Pulsing ring effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-white/50"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  </motion.div>
                  <div>
                    <p className="text-white font-semibold text-lg">
                      {t('نظرة عامة على المنتج', 'Product Overview')}
                    </p>
                    <p className="text-white/80 text-sm">1:38</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Header - Benefit-focused */}
        <div className={`mb-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <h2 className="mb-3 text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300 text-slate-900 leading-tight">
            {t('استكشف مجموعة واسعة من الدورات المميزة', 'Explore a Wide Range of Premium Courses')}
          </h2>
          <p className="text-base sm:text-lg transition-colors duration-300 text-slate-600 max-w-2xl">
            {t('اختر من بين مئات الدورات في مختلف المجالات لتطوير مهاراتك وتحقيق أهدافك المهنية', 'Choose from hundreds of courses across various fields to develop your skills and achieve your professional goals')}
          </p>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses && filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Course Cards - Show only first 4 courses */}
            {filteredCourses.slice(0, 4).map((course, index) => {
              const categoryLabel = CATEGORY_LABELS[course.category] || CATEGORY_LABELS.featured;
              return (
                <div key={course.id} className="w-full">
                  <ModernCourseCard
                    titleAr={course.titleAr}
                    titleEn={course.titleEn}
                    descriptionAr={course.descriptionAr}
                    descriptionEn={course.descriptionEn}
                    imageUrl={course.imageUrl}
                    categoryLabelAr={categoryLabel.ar}
                    categoryLabelEn={categoryLabel.en}
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

