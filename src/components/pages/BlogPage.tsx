import React, { useState } from 'react';
import { useLanguage } from '../LanguageProvider';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AnimatedShinyText } from '../ui/animated-shiny-text';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { Clock, ArrowRight, Search, User, Calendar, TrendingUp, BookOpen, Sparkles, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { motion } from 'motion/react';

interface BlogPageProps {
  onNavigate?: (page: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const { t, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  
  const breadcrumbItems = [
    {
      labelAr: 'المدونة',
      labelEn: 'Blog',
    },
  ];

  const featuredPost = {
    titleAr: 'مستقبل التعليم الإلكتروني في 2025',
    titleEn: 'The Future of E-Learning in 2025',
    excerptAr: 'كيف ستغير التقنيات الحديثة مثل الذكاء الاصطناعي والواقع الافتراضي طريقة تعلمنا في السنوات القادمة',
    excerptEn: 'How modern technologies like AI and VR will change the way we learn in the coming years',
    categoryAr: 'التعليم',
    categoryEn: 'Education',
    readTime: '8 min',
    date: 'Oct 20, 2025',
    dateAr: '20 أكتوبر 2025',
    author: 'Sarah Ahmed',
    authorAr: 'سارة أحمد',
    image: 'https://images.unsplash.com/photo-1608986596619-eb50cc56831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjEyMzAyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const posts = [
    {
      titleAr: 'أفضل 10 لغات برمجة للتعلم في 2025',
      titleEn: 'Top 10 Programming Languages to Learn in 2025',
      excerptAr: 'اكتشف أكثر لغات البرمجة طلبًا في سوق العمل وكيف تختار الأنسب لمسيرتك المهنية',
      excerptEn: 'Discover the most in-demand programming languages in the job market and how to choose the right one',
      categoryAr: 'البرمجة',
      categoryEn: 'Programming',
      readTime: '5 min',
      date: 'Oct 18, 2025',
      dateAr: '18 أكتوبر 2025',
      author: 'Mohammed Ali',
      authorAr: 'محمد علي',
      image: 'https://images.unsplash.com/photo-1550517355-375c103a6a81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkeSUyMGxhcHRvcCUyMGNvZmZlZXxlbnwxfHx8fDE3NjEyNTg3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      titleAr: 'كيف تبني محفظة تصميم احترافية',
      titleEn: 'How to Build a Professional Design Portfolio',
      excerptAr: 'خطوات عملية وأمثلة حقيقية لإنشاء محفظة أعمال تجذب أصحاب العمل',
      excerptEn: 'Practical steps and real examples to create a portfolio that attracts employers',
      categoryAr: 'التصميم',
      categoryEn: 'Design',
      readTime: '7 min',
      date: 'Oct 16, 2025',
      dateAr: '16 أكتوبر 2025',
      author: 'Layla Hassan',
      authorAr: 'ليلى حسن',
      image: 'https://images.unsplash.com/photo-1742440710226-450e3b85c100?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NjEyMjc5NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      titleAr: 'الذكاء الاصطناعي وتأثيره على التعليم',
      titleEn: 'AI and Its Impact on Education',
      excerptAr: 'كيف يغير الذكاء الاصطناعي طريقة التعلم ويجعلها أكثر تخصيصاً وفعالية',
      excerptEn: 'How AI is changing the way we learn and making it more personalized and effective',
      categoryAr: 'التكنولوجيا',
      categoryEn: 'Technology',
      readTime: '6 min',
      date: 'Oct 14, 2025',
      dateAr: '14 أكتوبر 2025',
      author: 'Ahmed Khalil',
      authorAr: 'أحمد خليل',
      image: 'https://images.unsplash.com/photo-1759884247381-d7222dd72dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHlzaXMlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MTIxMzg2NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      titleAr: 'نصائح لإتقان التعلم الذاتي',
      titleEn: 'Tips for Mastering Self-Learning',
      excerptAr: 'استراتيجيات مجربة ونصائح عملية للتعلم المستقل والمستمر بفعالية',
      excerptEn: 'Proven strategies and practical tips for effective independent and continuous learning',
      categoryAr: 'التطوير الذاتي',
      categoryEn: 'Self Development',
      readTime: '4 min',
      date: 'Oct 12, 2025',
      dateAr: '12 أكتوبر 2025',
      author: 'Fatima Omar',
      authorAr: 'فاطمة عمر',
      image: 'https://images.unsplash.com/photo-1665072204431-b3ba11bd6d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGRpdmVyc2V8ZW58MXx8fHwxNzYxMjU4NzkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      titleAr: 'دليل المبتدئين لتحليل البيانات',
      titleEn: 'Beginner\'s Guide to Data Analysis',
      excerptAr: 'ابدأ رحلتك في عالم تحليل البيانات مع هذا الدليل الشامل للمبتدئين',
      excerptEn: 'Start your journey in the world of data analysis with this comprehensive guide for beginners',
      categoryAr: 'البيانات',
      categoryEn: 'Data',
      readTime: '8 min',
      date: 'Oct 10, 2025',
      dateAr: '10 أكتوبر 2025',
      author: 'Youssef Mansour',
      authorAr: 'يوسف منصور',
      image: 'https://images.unsplash.com/photo-1760348082205-8bda5fbdd7b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwZ3JhZHVhdGlvbiUyMGFjaGlldmVtZW50fGVufDF8fHx8MTc2MTI1ODc5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      titleAr: 'أهمية الشهادات المهنية في 2025',
      titleEn: 'The Importance of Professional Certificates in 2025',
      excerptAr: 'كيف تعزز الشهادات المهنية فرصك الوظيفية وتميزك في سوق العمل التنافسي',
      excerptEn: 'How professional certificates boost your career prospects and distinguish you in the competitive job market',
      categoryAr: 'الوظائف',
      categoryEn: 'Career',
      readTime: '5 min',
      date: 'Oct 8, 2025',
      dateAr: '8 أكتوبر 2025',
      author: 'Noor Saleh',
      authorAr: 'نور صالح',
      image: 'https://images.unsplash.com/photo-1608986596619-eb50cc56831f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NjEyMzAyODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const categories = [
    { nameAr: 'الكل', nameEn: 'All', count: 45 },
    { nameAr: 'البرمجة', nameEn: 'Programming', count: 12 },
    { nameAr: 'التصميم', nameEn: 'Design', count: 8 },
    { nameAr: 'البيانات', nameEn: 'Data', count: 6 },
    { nameAr: 'التعليم', nameEn: 'Education', count: 10 },
    { nameAr: 'الوظائف', nameEn: 'Career', count: 9 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-light)' }} dir={dir}>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <SimpleBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 overflow-visible pt-[140px] sm:pt-[140px]">

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge - First Element */}
            <div className="mb-6 flex justify-center">
              <AnimatedShinyText>
                <Badge 
                  className="text-white px-6 py-2.5 border-none shadow-lg text-sm font-semibold"
                  style={{
                    background: 'var(--gradient-hero)',
                    boxShadow: '0 4px 14px 0 rgba(0, 86, 210, 0.3)',
                  }}
                >
                  <Sparkles className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                  {t('المدونة والموارد التعليمية', 'Blog & Learning Resources')}
                </Badge>
              </AnimatedShinyText>
            </div>

            {/* Main Title */}
            <h1 
              className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              style={{
                color: 'var(--color-dark)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em'
              }}
            >
              {t('رحلة التعلم تبدأ من هنا', 'Your Learning Journey Starts Here')}
            </h1>
            
            <p className="text-xl sm:text-2xl mb-8 leading-relaxed" style={{ color: 'var(--neutral-700)' }}>
              {t(
                'مقالات، نصائح، ودروس متخصصة لمساعدتك في رحلة التعلم والتطور المهني',
                'Articles, tips, and specialized tutorials to help you in your learning and professional development journey'
              )}
            </p>

            {/* Advanced Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 ${dir === 'rtl' ? 'right-4' : 'left-4'}`} />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('ابحث في المقالات والموارد...', 'Search articles and resources...')}
                  className={`w-full bg-white border-2 border-neutral-200 rounded-2xl py-4 text-lg shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all ${dir === 'rtl' ? 'pr-14 pl-4 text-right' : 'pl-14 pr-4 text-left'}`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className={`absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'left-4' : 'right-4'} text-neutral-400 hover:text-neutral-600`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 border-b border-neutral-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-wrap gap-3 justify-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {categories.map((category, index) => {
              const isSelected = selectedCategory === category.nameAr;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category.nameAr)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all text-sm ${
                    isSelected
                      ? 'text-white !text-white shadow-lg scale-105 bg-blue-600 hover:bg-blue-700 border-2 border-blue-700'
                      : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                  }`}
                  style={
                    isSelected
                      ? { color: '#ffffff', backgroundColor: '#2563eb' }
                      : {}
                  }
                >
                  {t(category.nameAr, category.nameEn)}
                  <span className={`opacity-70 ${dir === 'rtl' ? 'mr-2' : 'ml-2'}`}>({category.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 relative bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center gap-3 mb-10 justify-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <AnimatedShinyText>
              <Badge 
                className="text-white px-6 py-2 border-none shadow-lg"
                style={{
                  background: 'var(--gradient-hero)',
                }}
              >
                <Sparkles className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t('مقال مميز', 'Featured Article')}
              </Badge>
            </AnimatedShinyText>
          </div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`grid lg:grid-cols-2 gap-8 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group border-2 border-neutral-100 ${dir === 'rtl' ? 'lg:grid-flow-dense' : ''}`}
          >
            <div className={`relative overflow-hidden ${dir === 'rtl' ? 'lg:col-start-2' : ''}`}>
              <ImageWithFallback
                src={featuredPost.image}
                alt={t(featuredPost.titleAr, featuredPost.titleEn)}
                className="w-full h-full min-h-[400px] object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'}`}>
                <Badge 
                  className="text-white border-none shadow-lg"
                  style={{
                    background: 'var(--gradient-hero)',
                  }}
                >
                  {t(featuredPost.categoryAr, featuredPost.categoryEn)}
                </Badge>
              </div>
            </div>

            <div className={`p-8 lg:p-12 flex flex-col justify-center ${dir === 'rtl' ? 'lg:col-start-1 lg:row-start-1 text-right' : 'text-left'}`}>
              <div className={`flex flex-wrap items-center gap-4 mb-4 text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`} style={{ color: 'var(--neutral-600)' }}>
                <span className={`flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <User className="w-4 h-4" />
                  {t(featuredPost.authorAr, featuredPost.author)}
                </span>
                <span className={`flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="w-4 h-4" />
                  {t(featuredPost.dateAr, featuredPost.date)}
                </span>
                <span className={`flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </span>
              </div>

              <h3 className="mb-4 text-2xl font-bold group-hover:opacity-80 transition-opacity" style={{ color: 'var(--neutral-900)' }}>
                {t(featuredPost.titleAr, featuredPost.titleEn)}
              </h3>

              <p className="mb-6 leading-relaxed" style={{ color: 'var(--neutral-600)' }}>
                {t(featuredPost.excerptAr, featuredPost.excerptEn)}
              </p>

              <Button 
                className="w-fit shadow-lg"
                style={{
                  background: 'var(--gradient-hero)',
                  color: '#ffffff',
                }}
              >
                {t('اقرأ المقال الكامل', 'Read Full Article')}
                <ArrowRight className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180 mr-2' : 'ml-2'}`} />
              </Button>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Latest Posts Grid */}
      <section className="py-20 relative bg-gradient-to-b from-blue-50 to-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center gap-3 mb-10 justify-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <AnimatedShinyText>
              <Badge 
                className="text-white px-6 py-2 border-none shadow-lg"
                style={{
                  background: 'var(--gradient-hero)',
                }}
              >
                <TrendingUp className={`w-4 h-4 ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                {t('أحدث المقالات', 'Latest Articles')}
              </Badge>
            </AnimatedShinyText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white border-2 border-neutral-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={t(post.titleAr, post.titleEn)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Badge 
                    className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-sm border-none shadow-lg`}
                    style={{ color: 'var(--neutral-900)' }}
                  >
                    {t(post.categoryAr, post.categoryEn)}
                  </Badge>
                </div>

                {/* Content */}
                <div className={`p-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                  <div className={`flex flex-wrap items-center gap-3 mb-3 text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`} style={{ color: 'var(--neutral-500)' }}>
                    <span className={`flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <User className="w-3.5 h-3.5" />
                      {t(post.authorAr, post.author)}
                    </span>
                    <span>•</span>
                    <span className={`flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="mb-3 text-xl font-bold group-hover:opacity-80 transition-opacity line-clamp-2" style={{ color: 'var(--neutral-900)' }}>
                    {t(post.titleAr, post.titleEn)}
                  </h3>

                  <p className="mb-4 line-clamp-2 leading-relaxed" style={{ color: 'var(--neutral-600)' }}>
                    {t(post.excerptAr, post.excerptEn)}
                  </p>

                  <div className={`flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm" style={{ color: 'var(--neutral-500)' }}>
                      {t(post.dateAr, post.date)}
                    </span>
                    <button 
                      className={`inline-flex items-center gap-1 group/btn ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                      style={{ color: 'var(--brand-primary)' }}
                    >
                      {t('اقرأ المزيد', 'Read more')}
                      <ArrowRight className={`w-4 h-4 group-hover/btn:translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 px-8 py-3 text-lg"
              style={{
                borderColor: 'var(--brand-primary)',
                color: 'var(--brand-primary)',
              }}
            >
              {t('تحميل المزيد من المقالات', 'Load More Articles')}
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            background: 'var(--gradient-hero)',
          }}
        >

        </div>

        <div className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center`}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="mb-4 text-white text-3xl sm:text-4xl font-bold">
            {t('اشترك في نشرتنا الإخبارية', 'Subscribe to our Newsletter')}
          </h2>
          
          <p className="text-xl mb-8 text-white/90">
            {t(
              'احصل على آخر المقالات والنصائح التعليمية مباشرة في بريدك الإلكتروني',
              'Get the latest articles and educational tips directly in your inbox'
            )}
          </p>
          
          <div className={`flex gap-3 max-w-md mx-auto ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <input
              type="email"
              placeholder={t('بريدك الإلكتروني', 'Your email address')}
              className={`flex-1 h-14 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl px-4 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/40 transition-all ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            />
            <Button 
              className="h-14 px-8 bg-white text-primary hover:bg-white/90 shadow-xl font-semibold"
              style={{
                color: 'var(--brand-primary)',
              }}
            >
              {t('اشترك', 'Subscribe')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
