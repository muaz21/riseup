import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { pathsApi, PathDetails } from '../../services/pathsApi';
import { CourseAccordion } from '../CourseAccordion';
import { useEnrollmentRequest } from '../../hooks/useEnrollmentRequest';
import { Loader2, AlertCircle, ArrowLeft, ArrowRight, Clock, BookOpen, Users, Award, CheckCircle2, User } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { ProfessionalCourseCard } from '../ProfessionalCourseCard';
import { COURSES, getCoursesByCategory, CATEGORY_LABELS, getCategoryByKey } from '../../data/courses';

interface PathDetailsPageProps {
  onNavigate?: (page: string) => void;
  pathId?: number;
}

export function PathDetailsPage({ onNavigate, pathId }: PathDetailsPageProps) {
  const { t, dir, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [pathDetails, setPathDetails] = useState<PathDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openCourseIndex, setOpenCourseIndex] = useState<number | null>(null);
  const { handleRequestEnrollment, modals } = useEnrollmentRequest();

  // Get path ID from URL if not provided as prop
  useEffect(() => {
    // Priority: prop > URL
    const urlPathId = window.location.pathname.match(/\/paths\/(\d+)/)?.[1];
    const id = pathId || (urlPathId ? parseInt(urlPathId, 10) : null);
    
    if (!id) {
      setError(t('مسار غير موجود', 'Path not found'));
      setIsLoading(false);
      return;
    }

    const fetchPathDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const details = await pathsApi.getPathDetails(id);
        setPathDetails(details);
      } catch (err) {
        console.error('Error fetching path details:', err);
        setError(t('حدث خطأ أثناء تحميل المسار', 'Error loading path'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPathDetails();
  }, [pathId, t]);

  const handleBackClick = () => {
    if (onNavigate) {
      onNavigate('paths');
    } else {
      window.history.back();
    }
  };

  const handleCourseToggle = (index: number) => {
    setOpenCourseIndex(openCourseIndex === index ? null : index);
  };

  const handleRequestClick = () => {
    if (pathDetails) {
      handleRequestEnrollment(pathDetails);
    }
  };

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const students = pathDetails?.studentsEnrolled 
    ? (pathDetails.studentsEnrolled >= 1000 
        ? `${(pathDetails.studentsEnrolled / 1000).toFixed(0)}k+`
        : `${pathDetails.studentsEnrolled}+`)
    : '0';

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-24" dir={dir}>
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-lg text-neutral-600">
          {t('جاري تحميل المسار...', 'Loading path...')}
        </p>
      </div>
    );
  }

  if (error || !pathDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-24" dir={dir}>
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-lg text-red-600 mb-4">{error || t('مسار غير موجود', 'Path not found')}</p>
        <Button onClick={handleBackClick} variant="outline">
          {t('العودة للمسارات', 'Back to Paths')}
        </Button>
      </div>
    );
  }

  return (
    <>
      {modals}
      <div className="relative overflow-hidden w-full max-w-full min-h-screen" style={{ backgroundColor: 'var(--color-light)' }} dir={dir}>
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <SimpleBreadcrumbs items={[
            { labelAr: 'المسارات', labelEn: 'Paths' },
            { labelAr: language === 'ar' ? pathDetails.titleAr : pathDetails.titleEn, labelEn: pathDetails.titleEn },
          ]} />
        </div>

        {/* SECTION 1: PATH HEADER */}
        <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-blue-900 via-primary to-purple-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Back Button */}
              <Button
                variant="ghost"
                onClick={handleBackClick}
                className={`mb-6 sm:mb-8 text-white hover:bg-white/10 active:bg-white/20 transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
              >
                <ArrowIcon className="w-4 h-4" />
                {t('العودة للمسارات', 'Back to Paths')}
              </Button>

              {/* Title */}
              <h1 className={`mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white tracking-tight ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? pathDetails.titleAr : pathDetails.titleEn}
              </h1>

              {/* Description */}
              <p className={`mb-6 sm:mb-8 text-lg sm:text-xl lg:text-2xl text-white/95 leading-relaxed max-w-4xl ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                {language === 'ar' ? pathDetails.descriptionAr : pathDetails.descriptionEn}
              </p>

              {/* Stats */}
              <div className={`flex flex-wrap gap-4 sm:gap-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className={`flex items-center gap-2 text-white ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-base sm:text-lg font-semibold">{students} {t('طالب', 'students')}</span>
                </div>
                <div className={`flex items-center gap-2 text-white ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-base sm:text-lg font-semibold">{pathDetails.totalCourses} {t('دورة', 'courses')}</span>
                </div>
                <div className={`flex items-center gap-2 text-white ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-base sm:text-lg font-semibold">{pathDetails.durationMonths} {t('أشهر', 'months')}</span>
                </div>
                <div className={`flex items-center gap-2 text-white ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="text-base sm:text-lg font-semibold">{pathDetails.totalHours} {t('ساعة', 'hours')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {/* SECTION 2: WHAT YOU'LL LEARN - Simplified */}
          <section className={`mb-12 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            <h2 className={`mb-6 text-2xl font-bold text-neutral-900 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('✨ ما ستتعلمه في هذا المسار:', '✨ What you\'ll learn in this path:')}
            </h2>
            <div className={`p-6 rounded-xl bg-white border border-gray-200 shadow-sm ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <ul className="space-y-3">
                {(language === 'ar' ? pathDetails.skillsAr : pathDetails.skills).map((skill, index) => (
                  <li key={index} className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className={`text-neutral-700 text-base leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* SECTION 3: COURSES CARDS - Programming Courses */}
          <section className="mb-12">
            <h2 className={`mb-6 text-2xl font-bold text-neutral-900 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              {t('📚 دورات المسار', '📚 Path Courses')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {getCoursesByCategory('programming').map((course) => {
                const categoryLabel = CATEGORY_LABELS[course.category] || CATEGORY_LABELS.featured;
                const categoryInfo = getCategoryByKey(course.category);
                
                return (
                  <div key={course.id} className="w-full">
                    <ProfessionalCourseCard
                      titleAr={course.titleAr}
                      titleEn={course.titleEn}
                      descriptionAr={course.descriptionAr}
                      descriptionEn={course.descriptionEn}
                      imageUrl={course.imageUrl}
                      categoryLabelAr={categoryLabel.ar}
                      categoryLabelEn={categoryLabel.en}
                      categoryColor={categoryInfo?.color}
                      rating={course.reviews ? 4.5 : undefined}
                      reviews={course.reviews}
                      learners={course.reviews ? `${course.reviews}+` : undefined}
                      duration={course.duration}
                      durationAr={course.durationAr}
                      level={course.level}
                      levelAr={course.levelAr}
                      lessons={course.reviews}
                      price={course.price}
                      originalPrice={course.originalPrice}
                      discount={course.discount}
                      isFree={course.isFree}
                      isBestseller={course.isBestseller}
                      isNew={course.isNew}
                      hasCertificate={course.hasCertificate}
                      onViewCourse={() => onNavigate?.('course')}
                      pathId={course.pathId}
                      pathTitleAr={course.pathTitleAr}
                      pathTitleEn={course.pathTitleEn}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* SECTION 7: STICKY CTA BUTTON */}
        <div className="sticky bottom-0 z-50 bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
            <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
              <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                <h3 className={`text-base sm:text-lg font-semibold text-neutral-900 mb-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {language === 'ar' ? pathDetails.titleAr : pathDetails.titleEn}
                </h3>
                <p className={`text-xs sm:text-sm text-neutral-600 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  {t('ابدأ رحلتك التعليمية اليوم', 'Start your learning journey today')}
                </p>
              </div>
              <Button
                onClick={handleRequestClick}
                disabled={!isAuthenticated}
                size="lg"
                className={`bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 active:scale-[0.98] transition-all font-semibold px-6 sm:px-8 rounded-lg ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
              >
                {t('📝 طلب الالتحاق بالمسار', '📝 Request Enrollment')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

