import { useLanguage } from '../LanguageProvider';
import { FeatureCard } from '../FeatureCard';
import { Button } from '../ui/button';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import {
  BookOpen,
  Award,
  Globe2,
  Smartphone,
  Clock,
  Users,
  MessageSquare,
  BarChart3,
  Download,
  Zap,
  Shield,
  HeadphonesIcon,
} from 'lucide-react';

interface FeaturesPageProps {
  onNavigate?: (page: string) => void;
}

export function FeaturesPage({ onNavigate }: FeaturesPageProps = {}) {
  const { t, dir } = useLanguage();
  
  const breadcrumbItems = [
    {
      labelAr: 'المميزات',
      labelEn: 'Features',
    },
  ];

  const mainFeatures = [
    {
      icon: BookOpen,
      titleAr: 'تعلّم عملي',
      titleEn: 'Hands-on learning',
      descriptionAr: 'مشاريع حقيقية وتطبيقات عملية في كل دورة',
      descriptionEn: 'Real projects and practical applications in every course',
    },
    {
      icon: Award,
      titleAr: 'شهادات رقمية',
      titleEn: 'Digital certificates',
      descriptionAr: 'شهادات معترف بها عند إكمال الدورة',
      descriptionEn: 'Recognized certificates upon completion',
    },
    {
      icon: Globe2,
      titleAr: 'واجهة عربية/إنجليزية',
      titleEn: 'Arabic/English UI',
      descriptionAr: 'تجربة كاملة باللغتين مع دعم RTL',
      descriptionEn: 'Complete experience in both languages with RTL support',
    },
    {
      icon: Smartphone,
      titleAr: 'تطبيق جوّال',
      titleEn: 'Mobile apps',
      descriptionAr: 'تعلّم في أي وقت ومن أي مكان عبر iOS و Android',
      descriptionEn: 'Learn anytime, anywhere on iOS and Android',
    },
    {
      icon: Clock,
      titleAr: 'دروس قصيرة',
      titleEn: 'Bite-sized lessons',
      descriptionAr: 'محتوى مركّز يناسب جدولك المزدحم',
      descriptionEn: 'Focused content that fits your busy schedule',
    },
    {
      icon: Users,
      titleAr: 'مجتمع نشط',
      titleEn: 'Active community',
      descriptionAr: 'تواصل مع متعلمين آخرين وشارك تجربتك',
      descriptionEn: 'Connect with other learners and share your experience',
    },
    {
      icon: MessageSquare,
      titleAr: 'دعم فوري',
      titleEn: 'Instant support',
      descriptionAr: 'فريق دعم متاح على مدار الساعة للإجابة على أسئلتك',
      descriptionEn: '24/7 support team available to answer your questions',
    },
    {
      icon: BarChart3,
      titleAr: 'تتبع التقدم',
      titleEn: 'Progress tracking',
      descriptionAr: 'راقب تطورك وحدد أهدافك التعليمية',
      descriptionEn: 'Monitor your progress and set learning goals',
    },
    {
      icon: Download,
      titleAr: 'تحميل الدروس',
      titleEn: 'Download lessons',
      descriptionAr: 'حمّل الدروس للمشاهدة دون اتصال بالإنترنت',
      descriptionEn: 'Download lessons for offline viewing',
    },
    {
      icon: Zap,
      titleAr: 'تحديثات مستمرة',
      titleEn: 'Regular updates',
      descriptionAr: 'محتوى محدّث باستمرار ليواكب التطورات',
      descriptionEn: 'Constantly updated content to keep pace with developments',
    },
    {
      icon: Shield,
      titleAr: 'تعلّم آمن',
      titleEn: 'Secure learning',
      descriptionAr: 'بياناتك محمية بأعلى معايير الأمان',
      descriptionEn: 'Your data is protected with the highest security standards',
    },
    {
      icon: HeadphonesIcon,
      titleAr: 'محتوى صوتي',
      titleEn: 'Audio content',
      descriptionAr: 'استمع للدروس أثناء التنقل',
      descriptionEn: 'Listen to lessons on the go',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white" dir={dir}>
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
              color: 'var(--brand-primary)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}
          >
            {t('مميزات RiseUp', 'RiseUp Features')}
          </h1>
          <p className="text-xl sm:text-2xl mb-8 leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
            {t(
              'كل ما تحتاجه لتجربة تعليمية استثنائية',
              'Everything you need for an exceptional learning experience'
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
            onClick={() => window.open('https://app.riseup.com/signup', '_blank')}
          >
            {t('جرّب الآن مجانًا', 'Try now for free')}
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{
              color: 'var(--brand-primary)',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}
          >
            {t('جاهز للبدء؟', 'Ready to get started?')}
          </h2>
          <p className="text-xl sm:text-2xl mb-8 leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
            {t(
              'انضم إلى آلاف المتعلمين واكتشف جميع المميزات',
              'Join thousands of learners and discover all features'
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              onClick={() => window.open('https://app.brand.com/signup', '_blank')}
            >
              {t('ابدأ التجربة المجانية', 'Start Free Trial')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open('https://app.brand.com/catalog', '_blank')}
            >
              {t('تصفح جميع الدورات', 'Browse All Courses')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
