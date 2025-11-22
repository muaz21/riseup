import { useLanguage } from '../LanguageProvider';
import { Button } from '../ui/button';
import { FeatureCard } from '../FeatureCard';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { DollarSign, Users, TrendingUp, Award, Upload, Video, BookOpen, BarChart } from 'lucide-react';

interface TeachPageProps {
  onNavigate?: (page: string) => void;
}

export function TeachPage({ onNavigate }: TeachPageProps = {}) {
  const { t, dir } = useLanguage();
  
  const breadcrumbItems = [
    {
      labelAr: 'علّم معنا',
      labelEn: 'Teach',
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      titleAr: 'دخل إضافي',
      titleEn: 'Additional income',
      descriptionAr: 'احصل على دخل من خلال مشاركة معرفتك مع الآلاف',
      descriptionEn: 'Earn income by sharing your knowledge with thousands',
    },
    {
      icon: Users,
      titleAr: 'جمهور عالمي',
      titleEn: 'Global audience',
      descriptionAr: 'وصّل إلى متعلمين من جميع أنحاء العالم',
      descriptionEn: 'Reach learners from all over the world',
    },
    {
      icon: TrendingUp,
      titleAr: 'نمو مستمر',
      titleEn: 'Continuous growth',
      descriptionAr: 'نساعدك في تطوير دوراتك وتحسين جودتها',
      descriptionEn: 'We help you develop and improve your courses',
    },
    {
      icon: Award,
      titleAr: 'دعم شامل',
      titleEn: 'Full support',
      descriptionAr: 'فريق متخصص لمساعدتك في كل خطوة',
      descriptionEn: 'Dedicated team to help you every step',
    },
  ];

  const steps = [
    {
      icon: Upload,
      titleAr: 'قدّم طلبك',
      titleEn: 'Submit application',
      descriptionAr: 'أخبرنا عن خبرتك والدورة التي تود تقديمها',
      descriptionEn: 'Tell us about your expertise and course idea',
    },
    {
      icon: Video,
      titleAr: 'أنشئ محتواك',
      titleEn: 'Create content',
      descriptionAr: 'استخدم أدواتنا وإرشاداتنا لإنشاء دورة احترافية',
      descriptionEn: 'Use our tools and guidelines to create professional content',
    },
    {
      icon: BookOpen,
      titleAr: 'انشر دورتك',
      titleEn: 'Publish course',
      descriptionAr: 'بعد المراجعة، سننشر دورتك لآلاف المتعلمين',
      descriptionEn: 'After review, we\'ll publish your course to thousands',
    },
    {
      icon: BarChart,
      titleAr: 'تابع الأداء',
      titleEn: 'Track performance',
      descriptionAr: 'راقب أرباحك وتقييمات طلابك من لوحة التحكم',
      descriptionEn: 'Monitor your earnings and student reviews from dashboard',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-light)' }} dir={dir}>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <SimpleBreadcrumbs items={breadcrumbItems} />
      </div>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden pt-[140px] sm:pt-[140px]">

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 
            className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            style={{
              color: 'var(--color-dark)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}
          >
            {t('علّم على RiseUp', 'Teach on RiseUp')}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
            {t(
              'شارك معرفتك مع ملايين المتعلمين حول العالم',
              'Share your knowledge with millions of learners worldwide'
            )}
          </p>
          <Button
            size="lg"
            className="text-white shadow-lg transition-all font-semibold px-8 py-6 text-lg"
            style={{
              background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)',
              boxShadow: '0 4px 14px 0 rgba(0, 86, 210, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(0, 86, 210, 0.4)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(0, 86, 210, 0.3)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            onClick={() => window.open('https://app.riseup.com/teach/apply', '_blank')}
          >
            {t('قدّم طلبك الآن', 'Apply now')}
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{
                color: 'var(--brand-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              {t('لماذا تعلّم معنا؟', 'Why teach with us?')}
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
              {t(
                'نوفر لك كل ما تحتاجه لإنشاء ونشر دوراتك',
                'We provide everything you need to create and publish your courses'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <FeatureCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
              style={{
                color: 'var(--brand-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              {t('كيف تبدأ', 'How to get started')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-2">{t(step.titleAr, step.titleEn)}</h3>
                <p className="text-neutral-600">{t(step.descriptionAr, step.descriptionEn)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-semibold text-accent mb-2">
                {t('٢٠٠+', '200+')}
              </div>
              <p className="text-neutral-300">{t('مدرّب نشط', 'Active instructors')}</p>
            </div>
            <div>
              <div className="text-4xl font-semibold text-accent mb-2">
                {t('$٥٠٠ ألف', '$500k')}
              </div>
              <p className="text-neutral-300">{t('دُفع للمدربين', 'Paid to instructors')}</p>
            </div>
            <div>
              <div className="text-4xl font-semibold text-accent mb-2">4.9</div>
              <p className="text-neutral-300">{t('متوسط تقييم المدربين', 'Average instructor rating')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4">{t('جاهز لبدء التدريس؟', 'Ready to start teaching?')}</h2>
          <p className="text-xl mb-8 text-white/90">
            {t(
              'انضم إلى مجتمع المدربين المتميزين اليوم',
              'Join our community of outstanding instructors today'
            )}
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => window.open('https://app.brand.com/teach/apply', '_blank')}
          >
            {t('قدّم طلبك', 'Apply now')}
          </Button>
        </div>
      </section>
    </div>
  );
}
