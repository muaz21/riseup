import React, { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageProvider';
import { PathCard } from '../PathCard';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { AnimatedShinyText } from '../ui/animated-shiny-text';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { motion } from 'motion/react';
import FloatingLines from '../FloatingLines';
import { 
  Code, 
  Palette, 
  Briefcase, 
  TrendingUp, 
  Database, 
  Lightbulb,
  Rocket,
  Target,
  Trophy,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { pathsApi, LearningPath } from '../../services/pathsApi';

interface PathsPageProps {
  onNavigate?: (page: string) => void;
}

// Map path IDs to icons
const pathIcons: Record<number, React.ElementType> = {
  1: Code,
  2: Palette,
  3: Database,
  4: TrendingUp,
  5: Briefcase,
  6: Lightbulb,
};

export function PathsPage({ onNavigate }: PathsPageProps = {}) {
  const { t, dir } = useLanguage();
  const [paths, setPaths] = useState<LearningPath[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const breadcrumbItems = [
    {
      labelAr: 'المسارات',
      labelEn: 'Paths',
    },
  ];

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedPaths = await pathsApi.getPaths();
        setPaths(fetchedPaths);
      } catch (err) {
        console.error('Error fetching paths:', err);
        setError(t('حدث خطأ أثناء تحميل المسارات', 'Error loading paths'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaths();
  }, [t]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const benefits = [
    {
      icon: Target,
      titleAr: 'مسار واضح ومنظم',
      titleEn: 'Clear Structured Path',
      descAr: 'خطة تعليمية مدروسة خطوة بخطوة',
      descEn: 'Step-by-step learning plan',
    },
    {
      icon: Trophy,
      titleAr: 'شهادة معتمدة',
      titleEn: 'Certified Path',
      descAr: 'احصل على شهادة عند إتمام المسار',
      descEn: 'Get certified upon completion',
    },
    {
      icon: Sparkles,
      titleAr: 'مشاريع عملية',
      titleEn: 'Practical Projects',
      descAr: 'بناء مشاريع حقيقية لبناء معرض أعمالك',
      descEn: 'Build real projects for your portfolio',
    },
    {
      icon: Rocket,
      titleAr: 'تقدم سريع',
      titleEn: 'Fast Progress',
      descAr: 'تعلم بشكل مكثف ومنظم',
      descEn: 'Intensive and organized learning',
    },
  ];

  return (
    <div className="relative overflow-hidden w-full max-w-full" style={{ backgroundColor: 'var(--color-light)' }} dir={dir}>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <SimpleBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden pt-[140px] sm:pt-[140px] bg-gradient-to-br from-blue-900 via-primary to-purple-900">
        {/* FloatingLines Background */}
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.4 }}>
          <FloatingLines 
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[10, 15, 20]}
            lineDistance={[8, 6, 4]}
            bendRadius={5.0}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
            mixBlendMode="overlay"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            {/* Badge - First Element */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 sm:mb-8"
            >
              <AnimatedShinyText>
                <Badge 
                  className="text-white px-4 sm:px-6 py-2 border border-white/30 shadow-sm text-xs sm:text-sm font-semibold bg-white/20 backdrop-blur-sm"
                >
                  {t('مسارات تعليمية متكاملة', 'Complete Learning Paths')}
                </Badge>
              </AnimatedShinyText>
            </motion.div>
            
            {/* Main Title */}
            <h1 
              className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-white tracking-tight"
            >
              {t('اختر مسارك وابدأ رحلتك التعليمية', 'Choose Your Path and Start Your Learning Journey')}
            </h1>
            
            {/* Description */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed text-white/95 space-y-2 sm:space-y-3"
            >
              <p>
              {t(
                  'مسارات تعليمية شاملة مصممة لتأخذك من المبتدئ إلى المحترف',
                  'Comprehensive learning paths designed to take you from beginner to professional'
                )}
              </p>
              <p>
                {t(
                  'مع مشاريع عملية وشهادات معتمدة',
                  'With practical projects and certified credentials'
              )}
              </p>
            </motion.div>

            {/* Benefits Grid - Modern Glass Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-white/40 hover:border-white/60 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${dir === 'rtl' ? 'mr-auto ml-0' : 'ml-0'}`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                      <h3 className={`text-base sm:text-lg font-semibold mb-2 text-neutral-900 group-hover:text-primary transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {t(benefit.titleAr, benefit.titleEn)}
                      </h3>
                      <p className={`text-sm text-neutral-600 leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                        {t(benefit.descAr, benefit.descEn)}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Paths Grid */}
      <section className="py-16 sm:py-20 lg:py-24 relative bg-white overflow-hidden">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <AnimatedShinyText>
              <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
                {t('استكشف جميع المسارات', 'Explore All Paths')}
              </h2>
            </AnimatedShinyText>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              {t(
                'اختر المسار الذي يناسب أهدافك المهنية وابدأ رحلتك التعليمية اليوم',
                'Choose the path that matches your career goals and start your learning journey today'
              )}
            </p>
          </div>

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
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                {t('إعادة المحاولة', 'Retry')}
              </Button>
            </div>
          ) : paths.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <p className="text-lg text-neutral-600">
                {t('لا توجد مسارات متاحة حالياً', 'No paths available at the moment')}
              </p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {paths.map((path) => {
                const Icon = pathIcons[path.id] || Code;
                return (
                  <PathCard key={path.id} path={path} icon={Icon} onNavigate={onNavigate} />
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-16 sm:py-24 lg:py-32 relative overflow-hidden"
        style={{
          background: 'var(--gradient-hero)',
        }}
      >
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 inline-block">
            <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30 px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium">
              {t('ابدأ رحلتك التعليمية', 'Start Your Learning Journey')}
            </Badge>
          </div>

          {/* Main Heading */}
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight">
            {t('مستعد للبدء؟', 'Ready to Start?')}
          </h2>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-10 text-white/95 leading-relaxed max-w-3xl mx-auto">
            {t(
              'انضم إلى آلاف الطلاب وابدأ مسارك التعليمي اليوم',
              'Join thousands of students and start your learning path today'
            )}
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 ${dir === 'rtl' ? 'sm:flex-row-reverse' : ''}`}>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-neutral-50 shadow-lg hover:shadow-xl transition-all px-8 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl hover:scale-[1.02] active:scale-[0.98] duration-200 font-semibold rounded-lg"
              style={{
                '--primary': 'var(--brand-primary)',
              } as React.CSSProperties}
              onClick={() => window.open('https://app.riseup.com', '_blank')}
            >
              {t('الدخول إلى المنصة', 'Go to Platform')}
              <ArrowRight className={`ml-2 w-5 h-5 ${dir === 'rtl' ? 'mr-2 ml-0 rotate-180' : ''}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 hover:text-white transition-all px-8 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl hover:scale-[1.02] active:scale-[0.98] duration-200 font-semibold rounded-lg"
              onClick={() => window.open('https://app.riseup.com/paths', '_blank')}
            >
              {t('استعرض جميع المسارات', 'Browse All Paths')}
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('تسجيل مجاني', 'Free signup')}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('لا حاجة لبطاقة ائتمان', 'No credit card required')}</span>
            </div>
            <div className="hidden sm:block w-1 h-1 rounded-full bg-white/50"></div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
              <span className="text-sm sm:text-base">{t('إلغاء في أي وقت', 'Cancel anytime')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
