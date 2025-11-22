import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ModernCourseCard } from '../ModernCourseCard';
import { ProfessionalCourseCard } from '../ProfessionalCourseCard';
import { AnimatedShinyText } from '../ui/animated-shiny-text';
import { CategoryHeroSection } from '../CategoryHeroSection';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { Search, Star, Clock, Users, Grid3x3, List, Filter, X, Sparkles, BookOpen, TrendingUp, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COURSES as UNIFIED_COURSES, CATEGORIES, getCategoryByKey, getCoursesByCategory, CATEGORY_LABELS, getSubcategoriesByCategory } from '../../data/courses';
import { GraduationCap } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface CoursesPageProps {
  onNavigate: (page: string) => void;
  category?: string;
  initialSearchQuery?: string;
}

export function CoursesPage({ onNavigate, category, initialSearchQuery }: CoursesPageProps) {
  const { t, dir } = useLanguage();
  const { showSuccess } = useToast();
  const [selectedCategory, setSelectedCategory] = useState(category || 'featured');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || '');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'featured') count++;
    if (selectedSubcategory !== 'all') count++;
    if (sortBy !== 'featured') count++;
    if (searchQuery.trim()) count++;
    return count;
  }, [selectedCategory, selectedSubcategory, sortBy, searchQuery]);

  // Auto-select category when category prop changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
      setSelectedSubcategory('all'); // Reset subcategory when category changes
    } else {
      setSelectedCategory('featured');
      setSelectedSubcategory('all');
    }
  }, [category]);

  // Update search query when initialSearchQuery prop changes
  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Update URL when search query changes (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      if (searchQuery.trim()) {
        urlParams.set('search', searchQuery.trim());
      } else {
        urlParams.delete('search');
      }
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.history.replaceState({ ...window.history.state, searchQuery: searchQuery.trim() || null }, '', newUrl);
    }, 500); // Debounce for 500ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Reset subcategory when category changes
  useEffect(() => {
    setSelectedSubcategory('all');
  }, [selectedCategory]);

  // Get current categories - always use unified categories, with "الجميع" last (on the right in RTL)
  const currentCategories = useMemo(() => {
    const allCategories = CATEGORIES.filter(cat => cat.key !== 'featured' || selectedCategory === 'featured');
    // Sort to ensure "featured" (الجميع) is last (on the right in RTL layout)
    const featured = allCategories.find(cat => cat.key === 'featured');
    const others = allCategories.filter(cat => cat.key !== 'featured');
    return featured ? [...others, featured] : allCategories;
  }, [selectedCategory]);

  // Get subcategories for the selected category, with "الجميع" last (on the right in RTL)
  const subcategories = useMemo(() => {
    if (selectedCategory && selectedCategory !== 'featured') {
      const allSubcategories = getSubcategoriesByCategory(selectedCategory);
      // Sort to ensure "all" (الجميع) is last (on the right in RTL layout)
      const allItem = allSubcategories.find(sub => sub.key === 'all');
      const others = allSubcategories.filter(sub => sub.key !== 'all');
      return allItem ? [...others, allItem] : allSubcategories;
    }
    return [];
  }, [selectedCategory]);

  // Filter and sort courses - use unified courses
  const filteredCourses = useMemo(() => {
    let courses: any[] = [];
    
    // Use unified courses for category system
    courses = getCoursesByCategory(
      selectedCategory === 'featured' ? 'all' : selectedCategory,
      selectedSubcategory !== 'all' ? selectedSubcategory : undefined
    );
    
    // Filter by search query
    if (searchQuery) {
      courses = courses.filter((course) => 
        course.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.descriptionAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.descriptionEn.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort courses
    switch (sortBy) {
      case 'rating':
        return courses.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'price-low':
        return courses.sort((a, b) => {
          const priceA = a.price ? parseInt(a.price.replace(/[$,]/g, '')) : 0;
          const priceB = b.price ? parseInt(b.price.replace(/[$,]/g, '')) : 0;
          return priceA - priceB;
        });
      case 'price-high':
        return courses.sort((a, b) => {
          const priceA = a.price ? parseInt(a.price.replace(/[$,]/g, '')) : 0;
          const priceB = b.price ? parseInt(b.price.replace(/[$,]/g, '')) : 0;
          return priceB - priceA;
        });
      case 'newest':
        return courses.sort((a, b) => b.id - a.id);
      default:
        return courses;
    }
  }, [selectedCategory, selectedSubcategory, searchQuery, sortBy, category]);


  // Get category info if viewing a specific category
  const categoryInfo = category ? getCategoryByKey(category) : null;
  const categoryCourses = category ? getCoursesByCategory(category) : [];
  const categoryCount = categoryCourses.length;

  // Breadcrumb items
  const breadcrumbItems = useMemo(() => {
    const items = [
      {
        labelAr: 'الدورات',
        labelEn: 'Courses',
        onClick: () => onNavigate('courses'),
      },
    ];
    
    if (category && categoryInfo) {
      items.push({
        labelAr: categoryInfo.nameAr,
        labelEn: categoryInfo.nameEn,
        onClick: () => onNavigate(`courses/${category}`),
      });
    }
    
    return items;
  }, [category, categoryInfo, onNavigate]);

  return (
    <div className="min-h-screen bg-slate-50" dir={dir}>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <SimpleBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Modern Category Hero Section */}
      <CategoryHeroSection
        category={categoryInfo || null}
        onNavigate={onNavigate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentCategories={currentCategories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSubcategorySelect={setSelectedSubcategory}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className={`flex flex-col lg:flex-row gap-8 ${dir === 'rtl' ? 'lg:flex-row-reverse' : ''}`}>
          {/* Sidebar Filters - Desktop */}
          <div className={`hidden lg:block lg:w-80 flex-shrink-0`}>
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8 border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-bold ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--neutral-900)' }}>
                  {t('التصفية', 'Filters')}
                </h3>
                <Filter className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
              </div>
              
              {/* Sort */}
              <div className="mb-6">
                <label className={`block text-sm font-semibold mb-3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--neutral-700)' }}>
                  {t('ترتيب حسب', 'Sort by')}
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full bg-neutral-50 border-2 border-neutral-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  style={{ color: 'var(--neutral-900)' }}
                >
                  <option value="featured">{t('مميز', 'Featured')}</option>
                  <option value="rating">{t('التقييم', 'Rating')}</option>
                  <option value="price-low">{t('السعر: من الأقل للأعلى', 'Price: Low to High')}</option>
                  <option value="price-high">{t('السعر: من الأعلى للأقل', 'Price: High to Low')}</option>
                  <option value="newest">{t('الأحدث', 'Newest')}</option>
                </select>
              </div>

              {/* Results Count */}
              <div className={`text-sm font-semibold p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--neutral-700)' }}>
                {t('تم العثور على', 'Found')} <span className="text-lg font-bold" style={{ color: 'var(--brand-primary)' }}>{filteredCourses.length}</span> {t('دورة', 'courses')}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Category Tabs */}
            <div className="bg-white rounded-xl p-2 mb-6 shadow-sm border border-slate-100">
              <div 
                className={`flex flex-col sm:flex-row gap-2 sm:overflow-x-auto pb-2 scrollbar-hide ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}
                style={{ 
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {currentCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.key;

                  const handleClick = () => {
                    if (cat.key === 'featured') {
                      onNavigate('courses');
                    } else {
                      onNavigate(`courses/${cat.key}`);
                    }
                    setSelectedCategory(cat.key);
                    setSelectedSubcategory('all');
                  };

                  return (
                    <button
                      key={cat.key}
                      onClick={handleClick}
                      className={`px-6 py-3 font-semibold whitespace-nowrap transition-all rounded-lg min-h-[44px] ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50 scale-105'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{t(cat.nameAr, cat.nameEn)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subcategory Tabs - Only show when a category is selected and has subcategories */}
            {subcategories.length > 0 && selectedCategory !== 'featured' && (
              <div className="bg-white rounded-xl p-2 mb-6 shadow-sm border border-slate-100">
                <div 
                  className={`flex flex-col sm:flex-row gap-2 sm:overflow-x-auto pb-2 scrollbar-hide ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}
                  style={{ 
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {subcategories.map((subcat) => {
                    const isSelected = selectedSubcategory === subcat.key || (!selectedSubcategory && subcat.key === 'all');
                    const categoryInfo = getCategoryByKey(selectedCategory);
                    const categoryColor = categoryInfo?.color || 'var(--brand-primary)';

                    return (
                      <button
                        key={subcat.key}
                        onClick={() => setSelectedSubcategory(subcat.key)}
                        className={`px-4 py-3 font-medium whitespace-nowrap transition-all rounded-lg text-sm min-h-[44px] ${
                          isSelected
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span>{t(subcat.nameAr, subcat.nameEn)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Toolbar: View Mode */}
            <div className="flex flex-col sm:flex-row justify-end items-start sm:items-center gap-4 mb-6">
              {/* View Mode Toggle - Desktop */}
              <div className="hidden sm:flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-slate-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Filter Toggle with Active Count */}
              <div className="lg:hidden flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-sm border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all min-h-[44px]"
                >
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">{t('فلاتر', 'Filters')}</span>
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="p-2 text-slate-500 hover:text-slate-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label={t('مساعدة', 'Help')}
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side={dir === 'rtl' ? 'left' : 'right'} className="max-w-xs">
                    <p className="text-sm">
                      {t('استخدم الفلاتر للبحث عن الدورات حسب الفئة، المستوى، السعر، والمدة', 'Use filters to search for courses by category, level, price, and duration')}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Mobile Filters - Slide-out Drawer */}
            <AnimatePresence>
              {showFilters && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowFilters(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                  />
                  
                  {/* Drawer */}
                  <motion.div
                    initial={{ x: dir === 'rtl' ? '-100%' : '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: dir === 'rtl' ? '-100%' : '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className={`fixed top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 lg:hidden overflow-y-auto`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold" style={{ color: 'var(--neutral-900)' }}>
                            {t('التصفية', 'Filters')}
                          </h3>
                          {activeFilterCount > 0 && (
                            <span className="px-2.5 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                              {activeFilterCount}
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => setShowFilters(false)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                        >
                          <X className="w-5 h-5 text-neutral-600" />
                        </button>
                      </div>

                      {/* Active Filters Display */}
                      {activeFilterCount > 0 && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className={`text-xs font-semibold text-blue-900 mb-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                            {t('الفلاتر النشطة', 'Active Filters')}:
                          </div>
                          <div className={`flex flex-wrap gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            {selectedCategory !== 'featured' && (
                              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-md">
                                {t(getCategoryByKey(selectedCategory)?.nameAr || '', getCategoryByKey(selectedCategory)?.nameEn || '')}
                              </span>
                            )}
                            {selectedSubcategory !== 'all' && (
                              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-md">
                                {t(
                                  getSubcategoriesByCategory(selectedCategory).find(s => s.key === selectedSubcategory)?.nameAr || '',
                                  getSubcategoriesByCategory(selectedCategory).find(s => s.key === selectedSubcategory)?.nameEn || ''
                                )}
                              </span>
                            )}
                            {sortBy !== 'featured' && (
                              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-md">
                                {sortBy === 'rating' ? t('التقييم', 'Rating') :
                                 sortBy === 'price-low' ? t('السعر: من الأقل للأعلى', 'Price: Low to High') :
                                 sortBy === 'price-high' ? t('السعر: من الأعلى للأقل', 'Price: High to Low') :
                                 sortBy === 'newest' ? t('الأحدث', 'Newest') : ''}
                              </span>
                            )}
                            {searchQuery.trim() && (
                              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-md">
                                {t('بحث', 'Search')}: "{searchQuery}"
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setSelectedCategory('featured');
                              setSelectedSubcategory('all');
                              setSortBy('featured');
                              setSearchQuery('');
                            }}
                            className={`mt-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-medium rounded-lg transition-colors min-h-[44px] ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                          >
                            {t('إزالة جميع الفلاتر', 'Clear All Filters')}
                          </button>
                        </div>
                      )}
                      
                      {/* Sort */}
                      <div className="mb-6">
                        <label className={`block text-sm font-semibold mb-3 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--neutral-700)' }}>
                          {t('ترتيب حسب', 'Sort by')}
                        </label>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className={`w-full bg-neutral-50 border-2 border-neutral-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                          style={{ color: 'var(--neutral-900)' }}
                        >
                          <option value="featured">{t('مميز', 'Featured')}</option>
                          <option value="rating">{t('التقييم', 'Rating')}</option>
                          <option value="price-low">{t('السعر: من الأقل للأعلى', 'Price: Low to High')}</option>
                          <option value="price-high">{t('السعر: من الأعلى للأقل', 'Price: High to Low')}</option>
                          <option value="newest">{t('الأحدث', 'Newest')}</option>
                        </select>
                      </div>

                      {/* Results Count */}
                      <div className={`text-sm font-semibold p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--neutral-700)' }}>
                        {t('تم العثور على', 'Found')} <span className="text-lg font-bold" style={{ color: 'var(--brand-primary)' }}>{filteredCourses.length}</span> {t('دورة', 'courses')}
                      </div>

                      {/* Apply Button */}
                      <button
                        onClick={() => setShowFilters(false)}
                        className="w-full mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-200/50 transition-all min-h-[44px]"
                      >
                        {t('تطبيق الفلاتر', 'Apply Filters')}
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Course Cards Grid/List */}
            {filteredCourses.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'
                : 'space-y-4'
              }>
                {filteredCourses.map((course: any) => {
                  const categoryLabel = CATEGORY_LABELS[course.category] || CATEGORY_LABELS.featured;
                  const categoryInfo = getCategoryByKey(course.category);
                  
                  return (
                    <div 
                      key={course.id}
                      className="w-full"
                    >
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
                        instructorAvatar={course.instructorAvatar}
                        price={course.price}
                        originalPrice={course.originalPrice}
                        discount={course.discount}
                        isFree={course.isFree}
                        isBestseller={course.isBestseller}
                        isNew={course.isNew}
                        hasCertificate={course.hasCertificate}
                        searchQuery={searchQuery}
                        onViewCourse={() => onNavigate('course')}
                        pathId={course.pathId}
                        pathTitleAr={course.pathTitleAr}
                        pathTitleEn={course.pathTitleEn}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-white rounded-xl shadow-sm border border-slate-100"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <Search className="w-16 h-16 text-slate-400" />
                    <Sparkles className="w-6 h-6 text-blue-500 absolute -top-1 -right-1 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--neutral-900)' }}>
                  {t('لم يتم العثور على دورات', 'No courses found')}
                </h3>
                <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                  {t('جرب تغيير الفلاتر أو البحث بكلمات مختلفة', 'Try changing the filters or searching with different keywords')}
                </p>
                
                {/* Suggestions */}
                <div className="mb-8 max-w-lg mx-auto">
                  <h4 className="text-lg font-semibold mb-4 text-slate-700">
                    {t('اقتراحات للبحث', 'Search Suggestions')}
                  </h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['programming', 'english', 'excel'].map((catKey) => {
                      const cat = getCategoryByKey(catKey);
                      if (!cat) return null;
                      return (
                        <button
                          key={catKey}
                          onClick={() => {
                            setSelectedCategory(catKey);
                            setSearchQuery('');
                            setSelectedSubcategory('all');
                            showSuccess('تم تغيير الفئة', 'Category changed');
                          }}
                          className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm font-medium min-h-[44px]"
                        >
                          {t(cat.nameAr, cat.nameEn)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Popular Courses */}
                {UNIFIED_COURSES.length > 0 && (
                  <div className="mt-8 max-w-2xl mx-auto">
                    <h4 className="text-lg font-semibold mb-4 text-slate-700 flex items-center justify-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      {t('الدورات الشائعة', 'Popular Courses')}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {UNIFIED_COURSES.slice(0, 4).map((course) => (
                        <button
                          key={course.id}
                          onClick={() => onNavigate('course')}
                          className="p-4 bg-slate-50 hover:bg-slate-100 rounded-lg text-left transition-colors border border-slate-200 hover:border-blue-300 min-h-[44px]"
                        >
                          <div className="flex items-start gap-3">
                            <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="font-medium text-slate-900 text-sm">
                                {t(course.titleAr, course.titleEn)}
                              </p>
                              <p className="text-xs text-slate-600 mt-1">
                                {t('عرض التفاصيل', 'View Details')}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <Button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('featured');
                      setSelectedSubcategory('all');
                      setSortBy('featured');
                      showSuccess('تم إعادة تعيين الفلاتر', 'Filters reset successfully');
                    }}
                    size="lg"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/50 transition-all hover:scale-105"
                  >
                    {t('إعادة تعيين جميع الفلاتر', 'Clear All Filters')}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
