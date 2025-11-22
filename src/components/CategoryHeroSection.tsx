import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';
import { Search, Filter, BookOpen, Users, Star, Award, ChevronRight, GraduationCap } from 'lucide-react';
import { Category, getCoursesByCategory, getSubcategoriesByCategory } from '../data/courses';

interface CategoryHeroSectionProps {
  category: Category | null;
  onNavigate: (page: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentCategories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryKey: string) => void;
  selectedSubcategory?: string;
  onSubcategorySelect?: (subcategoryKey: string) => void;
}

// Category icons mapping
const categoryIcons: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  english: BookOpen,
  programming: GraduationCap,
  excel: GraduationCap,
  python: GraduationCap,
  office: GraduationCap,
  featured: GraduationCap,
};

export function CategoryHeroSection({
  category,
  onNavigate,
  searchQuery,
  onSearchChange,
  currentCategories,
  selectedCategory,
  onCategorySelect,
  selectedSubcategory,
  onSubcategorySelect,
}: CategoryHeroSectionProps) {
  const { t, dir } = useLanguage();
  
  // Get subcategories for the selected category
  const subcategories = selectedCategory && selectedCategory !== 'featured' 
    ? getSubcategoriesByCategory(selectedCategory)
    : [];

  // Get course count and stats
  const categoryCourses = category ? getCoursesByCategory(category.key) : [];
  const courseCount = categoryCourses.length;
  const coursesWithRating = categoryCourses.filter(c => c.rating && c.rating > 0);
  const avgRating = coursesWithRating.length > 0
    ? (coursesWithRating.reduce((sum, c) => sum + (c.rating || 0), 0) / coursesWithRating.length).toFixed(1)
    : '0';
  const totalStudents = categoryCourses.length > 0
    ? categoryCourses.reduce((sum, c) => {
        if (!c.learners) return sum;
        const learnersStr = c.learners.toString();
        let students = 0;
        if (learnersStr.includes('k') || learnersStr.includes('K')) {
          students = parseFloat(learnersStr.replace(/[kK]/g, '')) * 1000;
        } else if (learnersStr.includes('m') || learnersStr.includes('M')) {
          students = parseFloat(learnersStr.replace(/[mM]/g, '')) * 1000000;
        } else {
          students = parseInt(learnersStr) || 0;
        }
        return sum + students;
      }, 0)
    : 0;
  const formattedStudents = totalStudents >= 1000 ? `${(totalStudents / 1000).toFixed(1)}k` : totalStudents.toString();

  // Get category icon
  const CategoryIcon = category ? categoryIcons[category.key] || GraduationCap : GraduationCap;

  return (
    <div className="relative w-full">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden min-h-[280px] md:min-h-[350px] lg:min-h-[420px]"
        style={{
          background: category?.gradient || 'linear-gradient(135deg, #2563eb 0%, #3b82f6 50%, #2563eb 100%)',
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 20px,
                rgba(255, 255, 255, 0.1) 20px,
                rgba(255, 255, 255, 0.1) 40px
              )`,
            }}
          />
        </div>

        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                background: `radial-gradient(circle, rgba(255,255,255,0.3), transparent)`,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
            {/* Content Side */}
            <div className={`flex-1 w-full ${dir === 'rtl' ? 'text-right lg:text-right' : 'text-left lg:text-left'}`}>
              {/* Category Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`mb-6 inline-block ${dir === 'rtl' ? 'float-right' : 'float-left'}`}
              >
                <div
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center shadow-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <CategoryIcon className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                </div>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 leading-tight"
                style={{
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.2)',
                }}
              >
                {category
                  ? t(category.nameAr, category.nameEn)
                  : t('جميع الدورات', 'All Courses')}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-6 leading-relaxed"
              >
                {category
                  ? t(
                      `اكتشف ${courseCount} دورة احترافية في ${category.nameAr}`,
                      `Discover ${courseCount} expert-led courses to master ${category.nameEn}`
                    )
                  : t(
                      'اكتشف آلاف الدورات التعليمية من أفضل الجامعات والمؤسسات العالمية',
                      'Discover thousands of courses from top universities and institutions worldwide'
                    )}
              </motion.p>

              {/* Stats Row */}
              {category && courseCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className={`flex flex-wrap gap-6 mb-8 ${dir === 'rtl' ? 'flex-row-reverse justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                      <div className="text-white font-bold text-lg">{courseCount}</div>
                      <div className="text-white/80 text-sm">{t('دورة', 'Courses')}</div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                      <div className="text-white font-bold text-lg">{avgRating}</div>
                      <div className="text-white/80 text-sm">{t('متوسط التقييم', 'Avg Rating')}</div>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                      <div className="text-white font-bold text-lg">{formattedStudents}</div>
                      <div className="text-white/80 text-sm">{t('طالب', 'Students')}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className={dir === 'rtl' ? 'text-right' : 'text-left'}
              >
                <Button
                  size="lg"
                  className={`text-white shadow-2xl hover:shadow-2xl transition-all px-8 py-6 text-lg font-semibold hover:scale-105 flex items-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                  }}
                  onClick={() => {
                    if (category) {
                      onNavigate(`courses/${category.key}`);
                    } else {
                      onNavigate('courses');
                    }
                  }}
                >
                  {t('استكشف الدورات', 'Explore Courses')}
                  <ChevronRight className={`w-5 h-5 ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </motion.div>
            </div>

            {/* Right Side - Optional Visual Element */}
            <div className="hidden lg:block flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-64 h-64 rounded-3xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                }}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Search Bar */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative"
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl border-2 transition-all duration-300"
            style={{
              borderColor: category?.color || 'var(--brand-primary)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = category?.color || 'var(--brand-primary)';
              e.currentTarget.style.boxShadow = `0 20px 60px ${category?.color || 'var(--brand-primary)'}40`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = category?.color || 'var(--brand-primary)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
            }}
          >
            <div className="flex items-center gap-4 p-2">
              <div className={`flex-1 relative ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Search
                  className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${dir === 'rtl' ? 'right-4' : 'left-4'}`}
                  style={{ color: category?.color || 'var(--brand-primary)' }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={
                    category
                      ? t(
                          `ابحث في ${category.nameAr}...`,
                          `Search in ${category.nameEn}...`
                        )
                      : t('ابحث في الدورات...', 'Search courses...')
                  }
                  className={`w-full bg-transparent border-none focus:outline-none text-lg py-4 ${dir === 'rtl' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'}`}
                  style={{ color: 'var(--neutral-900)' }}
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-4' : 'right-4'} text-neutral-400 hover:text-neutral-600 transition-colors`}
                  >
                    <span className="text-2xl">×</span>
                  </button>
                )}
              </div>
              <button
                className="px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105"
                style={{
                  background: category?.color || 'var(--brand-primary)',
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

