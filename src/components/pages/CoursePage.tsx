import { useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { Star, Clock, Users, Globe, Award, PlayCircle, Lock, Check } from 'lucide-react';
import { TextWithTooltips } from '../TechnicalTermTooltip';

interface CoursePageProps {
  onNavigate?: (page: string) => void;
}

export function CoursePage({ onNavigate }: CoursePageProps = {}) {
  const { t, dir } = useLanguage();
  
  const breadcrumbItems = [
    {
      labelAr: 'الدورات',
      labelEn: 'Courses',
      onClick: () => onNavigate?.('courses'),
    },
    {
      labelAr: 'تفاصيل الدورة',
      labelEn: 'Course Details',
    },
  ];

  // Scroll to top when course page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const course = {
    titleAr: 'أساسيات تطوير الويب الحديث',
    titleEn: 'Modern Web Development Fundamentals',
    descriptionAr: 'تعلم بناء مواقع ويب احترافية من الصفر باستخدام أحدث التقنيات',
    descriptionEn: 'Learn to build professional websites from scratch using the latest technologies',
    rating: 4.8,
    reviewsCount: 2456,
    learnersCount: '15,234',
    duration: '12 hours',
    level: 'Beginner',
    levelAr: 'مبتدئ',
    language: 'Arabic/English',
    languageAr: 'عربي/إنجليزي',
    lastUpdated: 'October 2025',
    lastUpdatedAr: 'أكتوبر 2025',
    slug: 'web-dev-fundamentals',
  };

  const outcomes = [
    {
      ar: 'بناء مواقع ويب متجاوبة باستخدام HTML و CSS',
      en: 'Build responsive websites using HTML and CSS',
    },
    {
      ar: 'إتقان JavaScript وأساسيات البرمجة',
      en: 'Master JavaScript and programming fundamentals',
    },
    {
      ar: 'استخدام Git و GitHub لإدارة المشاريع',
      en: 'Use Git and GitHub for project management',
    },
    {
      ar: 'التعرف على React و Vue.js',
      en: 'Get introduced to React and Vue.js',
    },
    {
      ar: 'نشر مواقعك على الإنترنت',
      en: 'Deploy your websites online',
    },
  ];

  const syllabus = [
    {
      titleAr: 'مقدمة في تطوير الويب',
      titleEn: 'Introduction to Web Development',
      lessons: 5,
      duration: '45 min',
      preview: true,
    },
    {
      titleAr: 'HTML الأساسي',
      titleEn: 'HTML Basics',
      lessons: 8,
      duration: '1h 20min',
      preview: true,
    },
    {
      titleAr: 'CSS والتصميم',
      titleEn: 'CSS and Styling',
      lessons: 12,
      duration: '2h 15min',
      preview: false,
    },
    {
      titleAr: 'JavaScript للمبتدئين',
      titleEn: 'JavaScript for Beginners',
      lessons: 15,
      duration: '3h 30min',
      preview: false,
    },
    {
      titleAr: 'المشروع النهائي',
      titleEn: 'Final Project',
      lessons: 6,
      duration: '2h',
      preview: false,
    },
  ];

  const instructor = {
    nameAr: 'د. أحمد محمود',
    nameEn: 'Dr. Ahmed Mahmoud',
    bioAr: 'مطور ويب خبير مع أكثر من 10 سنوات من الخبرة',
    bioEn: 'Expert web developer with over 10 years of experience',
    courses: 12,
    students: '45k',
    rating: 4.9,
    initials: 'AM',
  };

  const reviewDistribution = [
    { stars: 5, percentage: 75 },
    { stars: 4, percentage: 18 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-light)' }} dir={dir}>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <SimpleBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero */}
      <section className="relative py-16 overflow-hidden pt-[140px] sm:pt-[140px]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge>{t(course.levelAr, course.level)}</Badge>
                <Badge variant="outline">{t(course.languageAr, course.language)}</Badge>
              </div>

              <h1 
                className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
                style={{
                  color: 'var(--color-dark)',
                  lineHeight: '1.2',
                  letterSpacing: '-0.02em'
                }}
              >
                {t(course.titleAr, course.titleEn)}
              </h1>
              <div className="text-xl sm:text-2xl leading-relaxed mb-6" style={{ color: 'var(--neutral-700)' }}>
                <TextWithTooltips text={t(course.descriptionAr, course.descriptionEn)} />
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-6 text-neutral-700">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-warning text-warning" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-neutral-600">
                    ({course.reviewsCount} {t('تقييم', 'reviews')})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>{course.learnersCount} {t('متعلم', 'learners')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>{t(course.languageAr, course.language)}</span>
                </div>
              </div>

              <p className="text-sm text-neutral-600 mt-4">
                {t('آخر تحديث:', 'Last updated:')} {t(course.lastUpdatedAr, course.lastUpdated)}
              </p>
            </div>

            {/* Sticky CTA Card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-xl border-2 border-primary/20 p-6 shadow-lg">
                <div className="aspect-video bg-neutral-200 rounded-lg mb-4 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <Button
                  className="w-full mb-3"
                  size="lg"
                  onClick={() => window.open(`https://app.brand.com/course/${course.slug}`, '_blank')}
                >
                  {t('ابدأ الآن', 'Start now')}
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  {t('معاينة مجانية', 'Free preview')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="mb-6">{t('ما ستتعلمه', 'What you\'ll learn')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700">{t(outcome.ar, outcome.en)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="mb-6">{t('محتوى الدورة', 'Course content')}</h2>
              <div className="space-y-3">
                {syllabus.map((section, index) => (
                  <div key={index} className="bg-white border border-neutral-300 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-base mb-1">
                          {t(section.titleAr, section.titleEn)}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {section.lessons} {t('دروس', 'lessons')} · {section.duration}
                        </p>
                      </div>
                      {section.preview ? (
                        <Badge variant="outline" className="text-primary border-primary">
                          <PlayCircle className="w-3 h-3 mr-1" />
                          {t('معاينة', 'Preview')}
                        </Badge>
                      ) : (
                        <Lock className="w-5 h-5 text-neutral-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="mb-6">{t('المدرّب', 'Instructor')}</h2>
              <div className="bg-white border border-neutral-300 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-primary text-white text-xl">
                      {instructor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="mb-2">{t(instructor.nameAr, instructor.nameEn)}</h3>
                    <p className="text-neutral-600 mb-4">
                      {t(instructor.bioAr, instructor.bioEn)}
                    </p>
                    <div className="flex flex-wrap gap-6 text-sm text-neutral-700">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span>{instructor.rating} {t('تقييم المدرب', 'instructor rating')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{instructor.students} {t('طالب', 'students')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{instructor.courses} {t('دورات', 'courses')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Summary */}
      <section className="py-12 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="mb-6">{t('التقييمات', 'Reviews')}</h2>
              <div className="bg-white border border-neutral-300 rounded-lg p-6">
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-semibold mb-2">{course.rating}</div>
                    <div className="flex gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600">
                      {course.reviewsCount} {t('تقييم', 'reviews')}
                    </p>
                  </div>

                  <div className="flex-1">
                    {reviewDistribution.map((dist) => (
                      <div key={dist.stars} className="flex items-center gap-3 mb-2">
                        <span className="text-sm w-8">{dist.stars} ★</span>
                        <Progress value={dist.percentage} className="flex-1" />
                        <span className="text-sm text-neutral-600 w-12">{dist.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4">{t('جاهز للبدء؟', 'Ready to start?')}</h2>
          <p className="text-xl mb-8 text-white/90">
            {t(
              'ابدأ رحلتك التعليمية اليوم واحصل على شهادة معتمدة',
              'Start your learning journey today and get a certified certificate'
            )}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
            onClick={() => window.open(`https://app.brand.com/course/${course.slug}`, '_blank')}
          >
            {t('سجل في الدورة الآن', 'Enroll in Course Now')}
          </Button>
        </div>
      </section>
    </div>
  );
}
