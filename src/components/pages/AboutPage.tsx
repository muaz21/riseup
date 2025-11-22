import React from 'react';
import { useLanguage } from '../LanguageProvider';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AnimatedShinyText } from '../ui/animated-shiny-text';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Globe2, 
  TrendingUp, 
  BookOpen,
  Zap,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { t, dir } = useLanguage();
  
  const breadcrumbItems = [
    {
      labelAr: 'من نحن',
      labelEn: 'About',
    },
  ];

  const values = [
    {
      icon: Target,
      titleAr: 'التميز والجودة',
      titleEn: 'Excellence & Quality',
      descriptionAr: 'نسعى دائمًا لتقديم أفضل محتوى تعليمي بأعلى معايير الجودة العالمية',
      descriptionEn: 'We always strive to provide the best educational content with the highest global quality standards',
      color: 'blue',
    },
    {
      icon: Heart,
      titleAr: 'الشغف بالتعليم',
      titleEn: 'Passion for Education',
      descriptionAr: 'نؤمن بقوة التعليم لتغيير الحياة وبناء مستقبل أفضل للجميع',
      descriptionEn: 'We believe in the power of education to change lives and build a better future for all',
      color: 'emerald',
    },
    {
      icon: Users,
      titleAr: 'مجتمع متعلم',
      titleEn: 'Learning Community',
      descriptionAr: 'نبني مجتمعًا تفاعليًا من المتعلمين والمعلمين يدعم بعضهم البعض',
      descriptionEn: 'We build an interactive community of learners and teachers who support each other',
      color: 'purple',
    },
    {
      icon: Zap,
      titleAr: 'الابتكار المستمر',
      titleEn: 'Continuous Innovation',
      descriptionAr: 'نواكب أحدث التقنيات والأساليب التعليمية لتقديم تجربة متطورة',
      descriptionEn: 'We keep up with the latest technologies and teaching methods to provide an advanced experience',
      color: 'orange',
    },
  ];

  const milestones = [
    {
      year: '2020',
      titleAr: 'انطلاقة RiseUp',
      titleEn: 'RiseUp Launch',
      descriptionAr: 'بدأنا بـ 10 دورات و1000 متعلم',
      descriptionEn: 'Started with 10 courses and 1,000 learners',
    },
    {
      year: '2022',
      titleAr: 'التوسع الإقليمي',
      titleEn: 'Regional Expansion',
      descriptionAr: 'وصلنا إلى 50,000 متعلم في 15 دولة',
      descriptionEn: 'Reached 50,000 learners in 15 countries',
    },
    {
      year: '2024',
      titleAr: 'الشراكات العالمية',
      titleEn: 'Global Partnerships',
      descriptionAr: 'شراكات مع جامعات وشركات عالمية',
      descriptionEn: 'Partnerships with global universities and companies',
    },
    {
      year: '2025',
      titleAr: 'القيادة في التعليم الرقمي',
      titleEn: 'Digital Education Leadership',
      descriptionAr: '120,000+ متعلم و500+ دورة احترافية',
      descriptionEn: '120,000+ learners and 500+ professional courses',
    },
  ];

  const team = [
    {
      name: 'Dr. Ahmed Al-Sayed',
      nameAr: 'د. أحمد السيد',
      role: 'CEO & Founder',
      roleAr: 'المؤسس والرئيس التنفيذي',
      image: 'https://images.unsplash.com/photo-1665072204431-b3ba11bd6d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGRpdmVyc2V8ZW58MXx8fHwxNzYxMjU4NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Sarah Mohammed',
      nameAr: 'سارة محمد',
      role: 'Head of Education',
      roleAr: 'مديرة التعليم',
      image: 'https://images.unsplash.com/photo-1608986596619-eb50cc56831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjEyMzAyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Omar Hassan',
      nameAr: 'عمر حسن',
      role: 'Chief Technology Officer',
      roleAr: 'مدير التكنولوجيا',
      image: 'https://images.unsplash.com/photo-1742440710226-450e3b85c100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjEyMjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      name: 'Layla Khalil',
      nameAr: 'ليلى خليل',
      role: 'Head of Content',
      roleAr: 'مديرة المحتوى',
      image: 'https://images.unsplash.com/photo-1550517355-375c103a6a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGxhcHRvcCUyMGNvZmZlZXxlbnwxfHx8fDE3NjEyNTg3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const achievements = [
    { icon: Users, value: '120,000+', labelAr: 'متعلم نشط', labelEn: 'Active Learners' },
    { icon: BookOpen, value: '500+', labelAr: 'دورة تعليمية', labelEn: 'Courses' },
    { icon: Award, value: '200+', labelAr: 'مدرّب خبير', labelEn: 'Expert Instructors' },
    { icon: Globe2, value: '20+', labelAr: 'دولة', labelEn: 'Countries' },
    { icon: Star, value: '4.8/5', labelAr: 'تقييم المتعلمين', labelEn: 'Learner Rating' },
    { icon: TrendingUp, value: '95%', labelAr: 'نسبة النجاح', labelEn: 'Success Rate' },
  ];

  return (
    <div className="relative overflow-hidden w-full max-w-full bg-gradient-to-b from-blue-50 to-white" dir={dir}>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <SimpleBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <section className="relative py-32 overflow-visible pt-[140px] sm:pt-[140px]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="mb-6 inline-block">
              <Badge 
                className="px-6 py-2 text-sm font-medium border-none shadow-lg"
                style={{
                  background: 'var(--gradient-hero)',
                  boxShadow: '0 4px 14px 0 rgba(0, 86, 210, 0.3)',
                  color: '#ffffff',
                }}
              >
                <Sparkles className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t('من نحن', 'About Us')}
              </Badge>
            </div>
            
            <h1 
              className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-normal"
              style={{
                color: 'var(--brand-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              {t('نبني مستقبل التعليم الرقمي', 'Building the Future of Digital Education')}
            </h1>
            
            <div className="text-xl sm:text-2xl leading-relaxed px-4 space-y-3" style={{ color: 'var(--neutral-700)' }}>
              <p>
              {t(
                  'منصة تعليمية رائدة تهدف لجعل التعلم متاحًا للجميع',
                  'A leading educational platform aiming to make learning accessible to everyone'
                )}
              </p>
              <p>
                {t(
                  'من خلال محتوى عالي الجودة وتجربة تعليمية مبتكرة',
                  'Through high-quality content and innovative learning experiences'
              )}
            </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Mission */}
            <div className={`group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-neutral-100 hover:border-primary/30 overflow-hidden ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--neutral-900)' }}>{t('رسالتنا', 'Our Mission')}</h2>
                <div className="space-y-4 leading-relaxed text-lg" style={{ color: 'var(--neutral-700)' }}>
                  <p>
                  {t(
                      'نؤمن بأن التعليم الجيد يجب أن يكون متاحًا للجميع، بغض النظر عن موقعهم أو خلفيتهم.',
                      'We believe that quality education should be accessible to everyone, regardless of their location or background.'
                    )}
                  </p>
                  <p>
                    {t(
                      'نسعى لتوفير منصة تعليمية شاملة تساعد المتعلمين على اكتساب المهارات التي يحتاجونها للنجاح في عالم سريع التغير والتطور المستمر.',
                      'We strive to provide a comprehensive learning platform that helps learners acquire the skills they need to succeed in a rapidly changing and evolving world.'
                  )}
                </p>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className={`group relative bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-neutral-100 hover:border-accent/30 overflow-hidden ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="mb-4 text-2xl font-bold" style={{ color: 'var(--neutral-900)' }}>{t('رؤيتنا', 'Our Vision')}</h2>
                <div className="space-y-4 leading-relaxed text-lg" style={{ color: 'var(--neutral-700)' }}>
                  <p>
                  {t(
                      'نطمح لأن نكون المنصة التعليمية الرائدة في المنطقة العربية، نلهم ملايين المتعلمين لتحقيق أحلامهم وبناء مستقبل مشرق.',
                      'We aspire to be the leading educational platform in the Arab region, inspiring millions of learners to achieve their dreams and build a bright future.'
                    )}
                  </p>
                  <p>
                    {t(
                      'نسعى لخلق تجربة تعليمية مبتكرة تجمع بين التكنولوجيا المتقدمة والمحتوى عالي الجودة.',
                      'We strive to create an innovative learning experience that combines advanced technology with high-quality content.'
                  )}
                </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 relative bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Badge - First Element */}
            <div className="mb-8">
              <AnimatedShinyText>
                <Badge 
                  className="text-white px-6 py-2.5 border-none shadow-lg text-sm font-semibold"
                  style={{
                    background: 'var(--gradient-hero)',
                    boxShadow: '0 4px 14px 0 rgba(0, 86, 210, 0.3)',
                  }}
                >
                  <Shield className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {t('قيمنا', 'Our Values')}
                </Badge>
              </AnimatedShinyText>
            </div>
            
            {/* Main Title */}
            <h2 
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300"
              style={{ 
                color: 'var(--brand-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              {t('القيم التي نؤمن بها', 'Values We Believe In')}
            </h2>
            
            {/* Description */}
            <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
              {t(
                'نلتزم بمجموعة من القيم الأساسية التي توجه عملنا وتحدد هويتنا',
                'We are committed to a set of core values that guide our work and define our identity'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const colorMap = {
                blue: {
                  border: 'hover:border-primary',
                  bg: 'from-primary to-primary-dark',
                  text: 'group-hover:text-primary',
                  hoverBg: 'from-primary/5 to-primary/10',
                  iconBg: 'var(--gradient-primary)'
                },
                emerald: {
                  border: 'hover:border-accent',
                  bg: 'from-accent to-accent-dark',
                  text: 'group-hover:text-accent',
                  hoverBg: 'from-accent/5 to-accent/10',
                  iconBg: 'var(--gradient-accent)'
                },
                purple: {
                  border: 'hover:border-primary',
                  bg: 'from-primary to-accent',
                  text: 'group-hover:text-primary',
                  hoverBg: 'from-primary/5 to-accent/10',
                  iconBg: 'var(--gradient-primary)'
                },
                orange: {
                  border: 'hover:border-accent',
                  bg: 'from-accent to-primary',
                  text: 'group-hover:text-accent',
                  hoverBg: 'from-accent/5 to-primary/10',
                  iconBg: 'var(--gradient-accent)'
                }
              };
              
              const colors = colorMap[value.color as keyof typeof colorMap];
              
              return (
                <div 
                  key={index} 
                  className={`group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-neutral-100 ${colors.border} hover:-translate-y-2 overflow-hidden ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.hoverBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  <div className="relative">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg"
                      style={{
                        background: colors.iconBg,
                      }}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`mb-3 text-xl font-bold ${colors.text} transition-colors`} style={{ color: 'var(--neutral-900)' }}>
                      {t(value.titleAr, value.titleEn)}
                    </h3>
                    <p className="leading-relaxed text-base" style={{ color: 'var(--neutral-600)' }}>
                      {t(value.descriptionAr, value.descriptionEn)}
                    </p>
                  </div>
                  {/* Bottom Accent Line */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
                    style={{
                      background: colors.iconBg,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Journey / Timeline */}
      <section className="py-24 relative bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Badge - First Element */}
            <div className="mb-8">
              <AnimatedShinyText>
                <Badge 
                  className="text-white px-6 py-2.5 border-none shadow-lg text-sm font-semibold"
                  style={{
                    background: 'var(--gradient-hero)',
                    boxShadow: '0 4px 14px 0 rgba(0, 86, 210, 0.3)',
                  }}
                >
                  <TrendingUp className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {t('رحلتنا', 'Our Journey')}
                </Badge>
              </AnimatedShinyText>
            </div>
            
            {/* Main Title */}
            <h2 
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300"
              style={{ 
                color: 'var(--brand-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              {t('قصة نجاحنا', 'Our Success Story')}
            </h2>
            
            {/* Description */}
            <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
              {t(
                'من بداية متواضعة إلى منصة رائدة في التعليم الرقمي',
                'From humble beginnings to a leading platform in digital education'
              )}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 hidden lg:block"
              style={{
                background: 'linear-gradient(180deg, var(--brand-primary-light) 0%, var(--brand-accent) 50%, var(--brand-purple) 100%)',
              }}
            ></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex items-center ${
                    index % 2 === 0 
                      ? 'lg:flex-row' 
                      : 'lg:flex-row-reverse'
                  } ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Content */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? (dir === 'rtl' ? 'lg:text-left' : 'lg:text-right') : (dir === 'rtl' ? 'lg:text-right' : 'lg:text-left')}`}>
                    <div className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-neutral-100 hover:border-primary/30 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <div 
                          className={`inline-block text-white px-4 py-2 rounded-full mb-3 font-semibold ${index % 2 === 0 ? (dir === 'rtl' ? 'float-left' : 'float-right') : (dir === 'rtl' ? 'float-right' : 'float-left')}`}
                          style={{
                            background: 'var(--gradient-hero)',
                            boxShadow: '0 4px 14px 0 rgba(0, 86, 210, 0.3)',
                          }}
                        >
                          {milestone.year}
                        </div>
                        <div className="clear-both"></div>
                        <h3 className="mb-2 text-xl font-semibold" style={{ color: 'var(--neutral-900)' }}>{t(milestone.titleAr, milestone.titleEn)}</h3>
                        <p style={{ color: 'var(--neutral-600)' }}>{t(milestone.descriptionAr, milestone.descriptionEn)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div 
                      className="w-6 h-6 rounded-full border-4 border-white shadow-lg z-10"
                      style={{
                        background: 'var(--gradient-hero)',
                      }}
                    ></div>
                  </div>

                  {/* Empty Space */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Achievements */}
      <section 
        className="py-24 relative overflow-hidden text-white"
        style={{
          background: 'var(--gradient-hero)',
        }}
      >

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-white">{t('إنجازاتنا بالأرقام', 'Our Achievements in Numbers')}</h2>
            <p className="text-xl text-white/90">
              {t('نفتخر بما حققناه معًا', 'We are proud of what we have achieved together')}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-110 transition-transform"
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl mb-2 text-white">{achievement.value}</div>
                <div className="text-white/80">{t(achievement.labelAr, achievement.labelEn)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 relative bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* Badge - First Element */}
            <div className="mb-8">
              <AnimatedShinyText>
                <Badge 
                  className="text-white px-6 py-2.5 border-none shadow-lg text-sm font-semibold"
                  style={{
                    background: 'var(--gradient-hero)',
                    boxShadow: '0 4px 14px 0 rgba(0, 86, 210, 0.3)',
                  }}
                >
                  <Users className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {t('فريق العمل', 'Our Team')}
                </Badge>
              </AnimatedShinyText>
            </div>
            
            {/* Main Title */}
            <h2 
              className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300"
              style={{ 
                color: 'var(--brand-primary)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              {t('الفريق القيادي', 'Leadership Team')}
            </h2>
            
            {/* Description */}
            <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
              {t(
                'فريق من الخبراء الملتزمين بتقديم أفضل تجربة تعليمية',
                'A team of experts committed to providing the best learning experience'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="group text-center"
              >
                <div className="relative mb-6 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={t(member.nameAr, member.name)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Gradient Overlay on Hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%)',
                      }}
                    ></div>
                    {/* Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                        style={{
                          background: 'var(--gradient-hero)',
                        }}
                      >
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold" style={{ color: 'var(--neutral-900)' }}>
                  {t(member.nameAr, member.name)}
                </h3>
                <p className="text-base" style={{ color: 'var(--neutral-600)' }}>
                  {t(member.roleAr, member.role)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-32 relative overflow-hidden"
        style={{
          background: 'var(--gradient-hero)',
        }}
      >

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/20">
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-lg"
              style={{
                background: 'var(--gradient-hero)',
              }}
            >
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="mb-4 text-white text-3xl sm:text-4xl font-bold">{t('انضم إلينا اليوم', 'Join Us Today')}</h2>
            
            <div className="text-xl text-white/95 mb-8 leading-relaxed space-y-2">
              <p>
              {t(
                  'كن جزءًا من مجتمع المتعلمين العالمي',
                  'Be part of the global learning community'
                )}
              </p>
              <p>
                {t(
                  'وابدأ رحلتك نحو النجاح والتميز',
                  'And start your journey towards success and excellence'
              )}
            </p>
            </div>

            <div className={`flex flex-wrap gap-4 justify-center mb-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-neutral-100 shadow-2xl hover:shadow-white/50 transition-all px-12 py-7 text-xl hover:scale-110 duration-300 font-bold"
                style={{
                  '--primary': 'var(--brand-primary)',
                } as React.CSSProperties}
                onClick={() => window.open('https://app.riseup.com', '_blank')}
              >
                {t('ابدأ التعلم مجاناً', 'Start Learning Free')}
                <ArrowRight className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180 mr-2 ml-0' : 'ml-2'}`} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all px-12 py-7 text-xl hover:scale-110 duration-300 font-semibold"
              >
                {t('تواصل معنا', 'Contact Us')}
              </Button>
            </div>

            {/* Trust Badges */}
            <div className={`flex flex-wrap justify-center items-center gap-6 mt-10 pt-10 border-t ${dir === 'rtl' ? 'flex-row-reverse' : ''}`} style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
              {[
                { icon: CheckCircle2, text: dir === 'rtl' ? 'جودة معتمدة' : 'Certified Quality' },
                { icon: Shield, text: dir === 'rtl' ? 'آمن وموثوق' : 'Safe & Trusted' },
                { icon: Star, text: dir === 'rtl' ? 'تقييم 4.8/5' : '4.8/5 Rating' },
              ].map((badge, index) => (
                <div key={index} className={`flex items-center gap-2 text-white/90 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <badge.icon className="w-5 h-5 text-accent" />
                  <span className="text-sm sm:text-base">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
