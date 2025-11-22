import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star, CheckCircle2, Quote, Sparkles, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import CircularText from './CircularText';
import RotatingText from './RotatingText';

interface Testimonial {
  id: number;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  initials: string;
  rating: number;
  quoteAr: string;
  quoteEn: string;
  courseAr?: string;
  courseEn?: string;
  dateAr?: string;
  dateEn?: string;
  verified: boolean;
  gradientFrom: string;
  gradientTo: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    nameAr: 'أحمد محمد',
    nameEn: 'Ahmed Mohamed',
    roleAr: 'مطور ويب',
    roleEn: 'Web Developer',
    initials: 'AM',
    rating: 5,
    quoteAr: 'تجربة رائعة! الدروس واضحة والدعم ممتاز. حصلت على وظيفة بفضل الشهادة.',
    quoteEn: 'Amazing experience! Clear lessons and excellent support. Got a job thanks to the certificate.',
    courseAr: 'دورة تطوير الويب الشاملة',
    courseEn: 'Complete Web Development Course',
    dateAr: 'منذ شهرين',
    dateEn: '2 months ago',
    verified: true,
    gradientFrom: '#0066FF',
    gradientTo: '#00D4FF',
  },
  {
    id: 2,
    nameAr: 'سارة علي',
    nameEn: 'Sara Ali',
    roleAr: 'مصممة UI/UX',
    roleEn: 'UI/UX Designer',
    initials: 'SA',
    rating: 5,
    quoteAr: 'المنصة سهلة الاستخدام والمحتوى عالي الجودة. أنصح بها بشدة!',
    quoteEn: 'Easy-to-use platform with high-quality content. Highly recommend!',
    courseAr: 'دورة تصميم واجهات المستخدم',
    courseEn: 'UI/UX Design Course',
    dateAr: 'منذ 3 أشهر',
    dateEn: '3 months ago',
    verified: true,
    gradientFrom: '#8B5CF6',
    gradientTo: '#EC4899',
  },
  {
    id: 3,
    nameAr: 'خالد عبدالله',
    nameEn: 'Khaled Abdullah',
    roleAr: 'محلل بيانات',
    roleEn: 'Data Analyst',
    initials: 'KA',
    rating: 5,
    quoteAr: 'التعلم باللغة العربية كان مهماً بالنسبة لي. شكراً لجودة المنصة الرائعة.',
    quoteEn: 'Learning in Arabic was important to me. Thanks for the excellent platform quality.',
    courseAr: 'دورة تحليل البيانات',
    courseEn: 'Data Analysis Course',
    dateAr: 'منذ شهر',
    dateEn: '1 month ago',
    verified: true,
    gradientFrom: '#F59E0B',
    gradientTo: '#10B981',
  },
];

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  delay?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'md', animated = true, delay = 0 }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          initial={animated ? { opacity: 0, scale: 0, rotate: -180 } : {}}
          animate={animated ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{
            delay: delay + index * 0.1,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
        >
          <Star
            className={`${sizeClasses[size]} ${
              index < rating
                ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
                : 'text-gray-300 fill-gray-200'
            } transition-colors duration-300`}
          />
        </motion.div>
      ))}
      <motion.span
        initial={animated ? { opacity: 0 } : {}}
        animate={animated ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.5 }}
        className="ml-1.5 text-xs font-semibold text-gray-700"
      >
        5.0
      </motion.span>
    </div>
  );
};

interface TestimonialAvatarProps {
  initials: string;
  name: string;
  gradientFrom: string;
  gradientTo: string;
  verified: boolean;
  isHovered: boolean;
}

const TestimonialAvatar: React.FC<TestimonialAvatarProps> = ({
  initials,
  name,
  gradientFrom,
  gradientTo,
  verified,
  isHovered,
}) => {
  return (
    <div className="relative group flex-shrink-0">
      {/* Avatar with gradient */}
      <motion.div
        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shadow-md relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Inner shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent" />
        <span className="relative z-10">{initials}</span>
      </motion.div>

      {/* Verified badge */}
      {verified && (
        <motion.div
          className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm"
          animate={{
            scale: isHovered ? 1.15 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <CheckCircle2 className="w-3 h-3 text-white" strokeWidth={3} />
        </motion.div>
      )}

      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
      />
    </div>
  );
};

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isInView: boolean;
  dir: 'ltr' | 'rtl';
  t: (ar: string, en: string) => string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index, isInView, dir, t }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-3deg', '3deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 100,
        damping: 15,
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-full h-full perspective-1000 group"
    >
      {/* Gradient glow effect on hover */}
      <motion.div
        className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{
          background: `linear-gradient(135deg, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`,
        }}
        animate={{
          opacity: isHovered ? 0.3 : 0,
        }}
      />

      {/* Glassmorphism Card */}
      <div
        className="relative w-full h-full min-h-[280px] bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg transition-all duration-500 flex flex-col p-5 lg:p-6 overflow-hidden"
        style={{
          transform: 'translateZ(0)',
          borderColor: isHovered ? `${testimonial.gradientFrom}40` : 'rgba(255,255,255,0.5)',
          boxShadow: isHovered
            ? `0 20px 40px -12px ${testimonial.gradientFrom}40, 0 0 0 1px ${testimonial.gradientFrom}20`
            : '0 10px 25px -5px rgba(0,0,0,0.1)',
        }}
      >
        {/* Background gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"
          style={{
            background: `linear-gradient(135deg, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`,
          }}
          animate={{
            opacity: isHovered ? 0.15 : 0,
          }}
        />

        {/* Subtle quote icon - elegant and small */}
        <div className="relative mb-4" style={{ transform: 'translateZ(30px)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.2 }}
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${testimonial.gradientFrom}15, ${testimonial.gradientTo}15)`,
            }}
          >
            <Quote
              className="w-5 h-5"
              style={{
                color: testimonial.gradientFrom,
                opacity: 0.6,
              }}
            />
          </motion.div>
        </div>

        {/* Star Rating */}
        <div className="mb-4" style={{ transform: 'translateZ(25px)' }}>
          <StarRating rating={testimonial.rating} size="sm" animated={isInView} delay={index * 0.15 + 0.3} />
        </div>

        {/* Testimonial Quote - Compact and readable */}
        <motion.p
          className="text-gray-700 text-sm lg:text-base leading-relaxed mb-5 flex-grow font-medium line-clamp-4"
          style={{ transform: 'translateZ(20px)' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.4 }}
        >
          {t(testimonial.quoteAr, testimonial.quoteEn)}
        </motion.p>

        {/* Course Badge (if available) */}
        {testimonial.courseAr && (
          <motion.div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium mb-4 w-fit"
            style={{
              background: `linear-gradient(135deg, ${testimonial.gradientFrom}15, ${testimonial.gradientTo}15)`,
              color: testimonial.gradientFrom,
              transform: 'translateZ(15px)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.5 }}
          >
            <Sparkles size={12} />
            <span className="line-clamp-1">{t(testimonial.courseAr, testimonial.courseEn || '')}</span>
          </motion.div>
        )}

        {/* Author Section */}
        <div
          className={`flex items-center gap-3 pt-4 border-t border-gray-100 ${
            dir === 'rtl' ? 'flex-row-reverse' : ''
          }`}
          style={{ transform: 'translateZ(10px)' }}
        >
          <div className="flex-1 min-w-0">
            <motion.h4
              className={`font-bold text-gray-900 text-base mb-0.5 transition-all duration-300 truncate ${
                isHovered ? 'text-transparent bg-clip-text' : ''
              }`}
              style={{
                backgroundImage: isHovered
                  ? `linear-gradient(135deg, ${testimonial.gradientFrom}, ${testimonial.gradientTo})`
                  : 'none',
              }}
            >
              {t(testimonial.nameAr, testimonial.nameEn)}
            </motion.h4>
            <p className="text-gray-600 text-xs font-medium truncate">
              {t(testimonial.roleAr, testimonial.roleEn)}
            </p>
            {testimonial.dateAr && (
              <p className="text-gray-500 text-xs mt-0.5">
                {t(testimonial.dateAr, testimonial.dateEn || '')}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Subtle Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-8"
          style={{ background: 'linear-gradient(135deg, #0066FF, #00D4FF)' }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-8"
          style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.08, 0.12, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
      </div>
    </>
  );
};

export const SuccessStoriesSection: React.FC = () => {
  const { t, dir } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-10 lg:py-12 overflow-hidden bg-slate-50"
    >
      {/* Background Effects */}
      <BackgroundEffects />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50/80 backdrop-blur-sm rounded-full mb-4 border border-blue-100/50"
          >
            <Star className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
            <span className="text-xs font-semibold text-blue-600">
              {t('قصص النجاح', 'Success Stories')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight"
          >
            {t('انضم إلى آلاف', 'Join Thousands of')}{' '}
            <span className="relative inline-block">
              <RotatingText
                texts={dir === 'rtl' 
                  ? ['المتعلمين الناجحين', 'Successful Learners', 'المتعلمين الناجحين', 'Successful Learners']
                  : ['Successful Learners', 'المتعلمين الناجحين', 'Successful Learners', 'المتعلمين الناجحين']
                }
                splitBy="words"
                mainClassName="px-2 sm:px-2 md:px-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg font-bold"
                elementLevelClassName="text-white font-bold"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
              <span className="absolute bottom-2 left-0 w-full h-3 bg-blue-100/50 -z-0 rounded-full transform -rotate-1"></span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-4 text-slate-600"
          >
            {t(
              'اكتشف كيف ساعدت رايز أب آلاف المتعلمين على تحقيق أهدافهم المهنية والنجاح في مسيرتهم',
              'Discover how RiseUp changed learners\' lives'
            )}
          </motion.p>

          {/* Social Proof Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-700">
                {t('4.9/5 من 2,500+ تقييم', '4.9/5 from 2,500+ reviews')}
              </span>
            </div>
          </motion.div>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '80px' } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 rounded-full mx-auto mt-4"
          />
        </div>

        {/* Testimonials Grid with Circular Text on Side */}
        <div className="relative">
          {/* Circular Text Animation - Positioned on the side (more subtle) */}
          <div className={`absolute top-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-10 hidden lg:block ${dir === 'rtl' ? 'left-0' : 'right-0'}`}>
            <CircularText
              text="RISE*UP*"
              onHover="speedUp"
              spinDuration={20}
              className="circular-text-brand"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 relative z-10">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="h-full">
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                  isInView={isInView}
                  dir={dir}
                  t={t}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-8 lg:mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-md">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-semibold text-slate-700">
              {t('انضم إلى آلاف المتعلمين الناجحين', 'Join thousands of successful learners')}
            </span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-blue-600"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;

