import { useLanguage } from '../LanguageProvider';
import { CourseCard } from '../CourseCard';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Filter,
  X,
  Code,
  Palette,
  Briefcase,
  TrendingUp,
  Database,
  Lightbulb,
  Search,
  SlidersHorizontal,
  BookOpen,
  Clock,
  Star,
  Users,
} from 'lucide-react';

interface CategoriesPageProps {
  onNavigate?: (page: string) => void;
}

export function CategoriesPage({ onNavigate }: CategoriesPageProps = {}) {
  const { t, dir, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  const breadcrumbItems = [
    {
      labelAr: 'الفئات',
      labelEn: 'Categories',
    },
  ];

  const categories = [
    {
      id: 'all',
      icon: BookOpen,
      nameAr: 'جميع الدورات',
      nameEn: 'All Courses',
      color: 'from-neutral-500 to-neutral-600',
    },
    {
      id: 'programming',
      icon: Code,
      nameAr: 'البرمجة',
      nameEn: 'Programming',
      color: 'from-primary to-accent',
    },
    {
      id: 'design',
      icon: Palette,
      nameAr: 'التصميم',
      nameEn: 'Design',
      color: 'from-accent to-primary',
    },
    {
      id: 'business',
      icon: Briefcase,
      nameAr: 'الأعمال',
      nameEn: 'Business',
      color: 'from-primary to-accent',
    },
    {
      id: 'marketing',
      icon: TrendingUp,
      nameAr: 'التسويق',
      nameEn: 'Marketing',
      color: 'from-accent to-primary',
    },
    {
      id: 'data',
      icon: Database,
      nameAr: 'علوم البيانات',
      nameEn: 'Data Science',
      color: 'from-primary to-accent',
    },
    {
      id: 'personal',
      icon: Lightbulb,
      nameAr: 'التطوير الشخصي',
      nameEn: 'Personal Dev',
      color: 'from-accent to-primary',
    },
  ];

  const levels = [
    { id: 'all', nameAr: 'جميع المستويات', nameEn: 'All Levels' },
    { id: 'beginner', nameAr: 'مبتدئ', nameEn: 'Beginner' },
    { id: 'intermediate', nameAr: 'متوسط', nameEn: 'Intermediate' },
    { id: 'advanced', nameAr: 'متقدم', nameEn: 'Advanced' },
  ];

  const prices = [
    { id: 'all', nameAr: 'جميع الأسعار', nameEn: 'All Prices' },
    { id: 'free', nameAr: 'مجاني', nameEn: 'Free' },
    { id: 'pro', nameAr: 'مدفوع', nameEn: 'Paid' },
  ];

  const durations = [
    { id: 'all', nameAr: 'أي مدة', nameEn: 'Any Duration' },
    { id: 'short', nameAr: 'قصيرة (أقل من 5 ساعات)', nameEn: 'Short (< 5h)' },
    { id: 'medium', nameAr: 'متوسطة (5-15 ساعة)', nameEn: 'Medium (5-15h)' },
    { id: 'long', nameAr: 'طويلة (أكثر من 15 ساعة)', nameEn: 'Long (> 15h)' },
  ];

  const courses = [
    {
      titleAr: 'أساسيات تطوير الويب',
      titleEn: 'Web Development Fundamentals',
      descriptionAr: 'تعلم HTML, CSS, JavaScript من الصفر',
      descriptionEn: 'Learn HTML, CSS, JavaScript from scratch',
      duration: '12h',
      rating: 4.8,
      learners: '15k',
      level: 'Beginner',
      levelAr: 'مبتدئ',
      slug: 'web-dev-fundamentals',
      topic: 'programming',
      price: 'free',
    },
    {
      titleAr: 'تصميم واجهات المستخدم',
      titleEn: 'UI Design Mastery',
      descriptionAr: 'احترف تصميم الواجهات باستخدام Figma',
      descriptionEn: 'Master interface design with Figma',
      duration: '8h',
      rating: 4.9,
      learners: '12k',
      level: 'Intermediate',
      levelAr: 'متوسط',
      slug: 'ui-design-mastery',
      topic: 'design',
      price: 'pro',
    },
    {
      titleAr: 'تحليل البيانات بـ Python',
      titleEn: 'Data Analysis with Python',
      descriptionAr: 'استخدم Python لتحليل البيانات',
      descriptionEn: 'Use Python for data analysis',
      duration: '16h',
      rating: 4.7,
      learners: '18k',
      level: 'Advanced',
      levelAr: 'متقدم',
      slug: 'python-data-analysis',
      topic: 'data',
      price: 'pro',
    },
    {
      titleAr: 'التسويق الرقمي',
      titleEn: 'Digital Marketing',
      descriptionAr: 'استراتيجيات التسويق الرقمي الحديثة',
      descriptionEn: 'Modern digital marketing strategies',
      duration: '10h',
      rating: 4.6,
      learners: '9k',
      level: 'Beginner',
      levelAr: 'مبتدئ',
      slug: 'digital-marketing',
      topic: 'marketing',
      price: 'free',
    },
    {
      titleAr: 'إدارة المشاريع الرشيقة',
      titleEn: 'Agile Project Management',
      descriptionAr: 'منهجيات Agile و Scrum',
      descriptionEn: 'Agile and Scrum methodologies',
      duration: '6h',
      rating: 4.8,
      learners: '7k',
      level: 'Intermediate',
      levelAr: 'متوسط',
      slug: 'agile-pm',
      topic: 'business',
      price: 'pro',
    },
    {
      titleAr: 'مهارات القيادة الفعّالة',
      titleEn: 'Effective Leadership Skills',
      descriptionAr: 'طور مهاراتك القيادية والإدارية',
      descriptionEn: 'Develop your leadership and management skills',
      duration: '20h',
      rating: 4.7,
      learners: '14k',
      level: 'Intermediate',
      levelAr: 'متوسط',
      slug: 'leadership-skills',
      topic: 'personal',
      price: 'free',
    },
    {
      titleAr: 'React المتقدم',
      titleEn: 'Advanced React',
      descriptionAr: 'تعلم مفاهيم React المتقدمة',
      descriptionEn: 'Learn advanced React concepts',
      duration: '14h',
      rating: 4.9,
      learners: '11k',
      level: 'Advanced',
      levelAr: 'متقدم',
      slug: 'advanced-react',
      topic: 'programming',
      price: 'pro',
    },
    {
      titleAr: 'التصوير الفوتوغرافي',
      titleEn: 'Photography Basics',
      descriptionAr: 'أساسيات التصوير الاحترافي',
      descriptionEn: 'Professional photography fundamentals',
      duration: '7h',
      rating: 4.5,
      learners: '8k',
      level: 'Beginner',
      levelAr: 'مبتدئ',
      slug: 'photography-basics',
      topic: 'design',
      price: 'free',
    },
  ];

  const activeFiltersCount = [selectedCategory !== 'all', selectedLevel !== 'all', selectedPrice !== 'all', selectedDuration !== 'all'].filter(Boolean).length;

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSelectedDuration('all');
    setSearchQuery('');
  };

  return (
    <div className="bg-gradient-to-b from-white via-neutral-50 to-white min-h-screen" dir={dir}>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <SimpleBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden pt-[140px] sm:pt-[140px]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge 
              className="mb-4 text-white px-6 py-2.5 border-none shadow-lg text-sm font-semibold"
              style={{
                background: 'var(--gradient-hero)',
                boxShadow: '0 4px 14px 0 rgba(0, 86, 210, 0.3)',
              }}
            >
              {t('مكتبة الدورات', 'Course Library')}
            </Badge>
            <h1 
              className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{
                color: 'var(--brand-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              {t('استكشف آلاف الدورات التعليمية', 'Explore Thousands of Courses')}
            </h1>
            <p className="text-xl sm:text-2xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--neutral-700)' }}>
              {t(
                'تعلم من أفضل المدربين في مختلف المجالات',
                'Learn from the best instructors across various fields'
              )}
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 ${dir === 'rtl' ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('ابحث عن دورة...', 'Search for a course...')}
                className={`w-full bg-white border-2 border-neutral-200 focus:border-primary rounded-2xl py-4 text-lg shadow-lg focus:shadow-xl transition-all outline-none ${
                  dir === 'rtl' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'
                }`}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter - Modern Pills */}
        <div className="mb-8">
          <div className={`flex items-center justify-between mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <h2 className={`text-2xl ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('التصنيفات', 'Categories')}
            </h2>
            
            {/* Advanced Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t('فلاتر متقدمة', 'Advanced Filters')}
              {activeFiltersCount > 0 && (
                <Badge className="bg-primary text-white">{activeFiltersCount}</Badge>
              )}
            </Button>
          </div>

          {/* Category Pills */}
          <div className={`flex flex-wrap gap-4 justify-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-6 py-3 rounded-full border-2 transition-all ${
                    isSelected
                      ? 'border-transparent bg-gradient-to-r ' + category.color + ' text-white !text-white shadow-lg hover:shadow-xl'
                      : 'border-neutral-200 bg-white hover:border-primary/30 text-neutral-700 hover:bg-neutral-50 hover:shadow-md'
                  }`}
                  style={isSelected ? { color: '#ffffff' } : {}}
                >
                  <span className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">
                      {language === 'ar' ? category.nameAr : category.nameEn}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white rounded-2xl border-2 border-neutral-200 p-6 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Level Filter */}
                  <div>
                    <label className={`block text-sm mb-3 text-neutral-700 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {t('المستوى', 'Level')}
                    </label>
                    <div className="space-y-2">
                      {levels.map((level) => (
                        <motion.button
                          key={level.id}
                          whileHover={{ x: dir === 'rtl' ? -5 : 5 }}
                          onClick={() => setSelectedLevel(level.id)}
                          className={`w-full px-4 py-2 rounded-xl border transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'} ${
                            selectedLevel === level.id
                              ? 'bg-primary text-white border-primary shadow-md'
                              : 'bg-neutral-50 border-neutral-200 hover:border-primary/30'
                          }`}
                        >
                          {language === 'ar' ? level.nameAr : level.nameEn}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <label className={`block text-sm mb-3 text-neutral-700 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {t('السعر', 'Price')}
                    </label>
                    <div className="space-y-2">
                      {prices.map((price) => (
                        <motion.button
                          key={price.id}
                          whileHover={{ x: dir === 'rtl' ? -5 : 5 }}
                          onClick={() => setSelectedPrice(price.id)}
                          className={`w-full px-4 py-2 rounded-xl border transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'} ${
                            selectedPrice === price.id
                              ? 'bg-accent text-white border-accent shadow-md'
                              : 'bg-neutral-50 border-neutral-200 hover:border-accent/30'
                          }`}
                        >
                          {language === 'ar' ? price.nameAr : price.nameEn}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Duration Filter */}
                  <div>
                    <label className={`block text-sm mb-3 text-neutral-700 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                      {t('المدة', 'Duration')}
                    </label>
                    <div className="space-y-2">
                      {durations.map((duration) => (
                        <motion.button
                          key={duration.id}
                          whileHover={{ x: dir === 'rtl' ? -5 : 5 }}
                          onClick={() => setSelectedDuration(duration.id)}
                          className={`w-full px-4 py-2 rounded-xl border transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'} ${
                            selectedDuration === duration.id
                              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                              : 'bg-neutral-50 border-neutral-200 hover:border-purple-600/30'
                          }`}
                        >
                          {language === 'ar' ? duration.nameAr : duration.nameEn}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                {activeFiltersCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 pt-6 border-t border-neutral-200"
                  >
                    <Button
                      variant="outline"
                      onClick={resetFilters}
                      className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                    >
                      <X className="w-4 h-4" />
                      {t('إعادة تعيين الفلاتر', 'Reset Filters')}
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 flex flex-wrap items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <span className="text-sm text-neutral-600">{t('الفلاتر النشطة:', 'Active filters:')}</span>
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {categories.find(c => c.id === selectedCategory)?.[language === 'ar' ? 'nameAr' : 'nameEn']}
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {selectedLevel !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {levels.find(l => l.id === selectedLevel)?.[language === 'ar' ? 'nameAr' : 'nameEn']}
                <button 
                  onClick={() => setSelectedLevel('all')}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </Badge>
            )}
            {selectedPrice !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {prices.find(p => p.id === selectedPrice)?.[language === 'ar' ? 'nameAr' : 'nameEn']}
                <button 
                  onClick={() => setSelectedPrice('all')}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </Badge>
            )}
            {selectedDuration !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {durations.find(d => d.id === selectedDuration)?.[language === 'ar' ? 'nameAr' : 'nameEn']}
                <button 
                  onClick={() => setSelectedDuration('all')}
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </Badge>
            )}
          </motion.div>
        )}

        {/* Results Header */}
        <div className={`flex items-center justify-between mb-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-neutral-600"
          >
            {t('عرض', 'Showing')} <span className="text-primary">{courses.length}</span> {t('دورة', 'courses')}
          </motion.p>
          
          <Button
            onClick={() => window.open('https://app.riseup.com/courses', '_blank')}
            className="bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all"
          >
            {t('عرض الكل في المنصة', 'View All in Platform')}
          </Button>
        </div>

        {/* Courses Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {courses.map((course, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <CourseCard
                {...course}
                onViewCourse={() => window.open('https://app.riseup.com', '_blank')}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open('https://app.riseup.com/courses', '_blank')}
            className="border-2 hover:border-primary hover:text-primary transition-all"
          >
            {t('تحميل المزيد من الدورات', 'Load More Courses')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
