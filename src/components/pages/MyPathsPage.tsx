import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { pathsApi, EnrolledPath } from '../../services/pathsApi';
import { Loader2, AlertCircle, ExternalLink, BookOpen, Calendar, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';

interface MyPathsPageProps {
  onNavigate?: (page: string) => void;
}

// Map path IDs to icons (same as PathsPage)
const pathIcons: Record<number, React.ElementType> = {
  1: BookOpen,
  2: BookOpen,
  3: BookOpen,
  4: BookOpen,
  5: BookOpen,
  6: BookOpen,
};

export function MyPathsPage({ onNavigate }: MyPathsPageProps = {}) {
  const { t, dir, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [enrolledPaths, setEnrolledPaths] = useState<EnrolledPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbItems = [
    {
      labelAr: 'المسارات',
      labelEn: 'Paths',
    },
    {
      labelAr: 'مساراتي',
      labelEn: 'My Paths',
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      setError(t('يجب تسجيل الدخول أولاً', 'You must login first'));
      return;
    }

    const fetchEnrolledPaths = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const paths = await pathsApi.getMyEnrolledPaths();
        setEnrolledPaths(paths);
      } catch (err) {
        console.error('Error fetching enrolled paths:', err);
        setError(t('حدث خطأ أثناء تحميل المسارات', 'Error loading paths'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchEnrolledPaths();
  }, [isAuthenticated, t]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getMoodleUrl = (path: EnrolledPath) => {
    return `https://moodle.yoursite.com/course/view.php?id=${path.moodleCourseId}`;
  };

  return (
    <div className="relative overflow-hidden w-full max-w-full min-h-screen" style={{ backgroundColor: 'var(--color-light)' }} dir={dir}>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <SimpleBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-900 via-primary to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white tracking-tight">
              {t('مساراتي التعليمية', 'My Learning Paths')}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-white/95">
              {t(
                'استعرض المسارات التي سجلت بها وواصل تعلمك',
                'Browse the paths you enrolled in and continue your learning'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-20 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
              <p className="text-lg text-neutral-600">
                {t('جاري تحميل المسارات...', 'Loading paths...')}
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-24">
              <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
              <p className="text-lg text-red-600 mb-4">{error}</p>
              {!isAuthenticated && (
                <Button
                  onClick={() => onNavigate?.('login')}
                  className="bg-gradient-to-r from-primary to-accent text-white"
                >
                  {t('تسجيل الدخول', 'Login')}
                </Button>
              )}
            </div>
          ) : enrolledPaths.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 sm:py-24">
              <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-400 mb-4" />
              <h2 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-2">
                {t('لا توجد مسارات مسجلة', 'No Enrolled Paths')}
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 mb-6 sm:mb-8 text-center max-w-md leading-relaxed">
                {t(
                  'لم تسجل في أي مسار بعد. ابدأ رحلتك التعليمية اليوم!',
                  'You haven\'t enrolled in any paths yet. Start your learning journey today!'
                )}
              </p>
              <Button
                onClick={() => onNavigate?.('paths')}
                className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 active:scale-[0.98] transition-all font-semibold rounded-lg"
                size="lg"
              >
                {t('استعرض المسارات', 'Browse Paths')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {enrolledPaths.map((path) => {
                const Icon = pathIcons[path.id] || BookOpen;
                const moodleUrl = getMoodleUrl(path);
                return (
                  <motion.div
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="h-full overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 rounded-xl bg-white">
                      {/* Header */}
                      <div className={`relative h-28 sm:h-32 bg-gradient-to-br ${path.color} overflow-hidden`}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-lg" />
                        </div>
                        <div className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'}`}>
                          <Badge className="bg-white/95 text-neutral-900 backdrop-blur-sm border-none shadow-sm text-xs sm:text-sm font-medium px-2 sm:px-3 py-1">
                            {t('مسجل', 'Enrolled')}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-3 pt-6 px-5 sm:px-6">
                        <h3 className={`mb-2 text-base sm:text-lg font-semibold ${dir === 'rtl' ? 'text-right' : 'text-left'} text-neutral-900 leading-tight`}>
                          {language === 'ar' ? path.titleAr : path.titleEn}
                        </h3>
                        <p className={`text-sm leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'} text-neutral-600 line-clamp-2`}>
                          {language === 'ar' ? path.descriptionAr : path.descriptionEn}
                        </p>
                      </CardHeader>

                      <CardContent className="space-y-4 px-5 sm:px-6 pb-6">
                        {/* Enrollment Date */}
                        <div className={`flex items-center gap-2 text-sm text-neutral-600 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {t('تاريخ التسجيل:', 'Enrolled on:')} {formatDate(path.enrolledAt)}
                          </span>
                        </div>

                        {/* Stats */}
                        <div className={`grid grid-cols-2 gap-3 sm:gap-4 text-sm ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                          <div>
                            <div className="text-neutral-500 mb-1 text-xs sm:text-sm font-medium">{t('الدورات', 'Courses')}</div>
                            <div className="font-semibold text-neutral-900 text-base sm:text-lg">{path.totalCourses}</div>
                          </div>
                          <div>
                            <div className="text-neutral-500 mb-1 text-xs sm:text-sm font-medium">{t('المدة', 'Duration')}</div>
                            <div className="font-semibold text-neutral-900 text-base sm:text-lg">
                              {path.durationMonths} {t('أشهر', 'months')}
                            </div>
                          </div>
                        </div>

                        {/* CTA Button */}
                        <Button
                          className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 active:scale-[0.98] transition-all font-semibold rounded-lg"
                          onClick={() => window.open(moodleUrl, '_blank')}
                        >
                          <span className={`flex items-center justify-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            {t('الذهاب إلى الدورة', 'Go to Course')}
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

