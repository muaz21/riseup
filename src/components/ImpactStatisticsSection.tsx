import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Trophy, Zap, Briefcase, TrendingUp, Award, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import RotatingText from './RotatingText';

interface Stat {
  id: number;
  value: number;
  suffix: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  gradientFrom: string;
  gradientTo: string;
  gradientClass: string;
  comparisonValue?: number;
  comparisonLabelAr?: string;
  comparisonLabelEn?: string;
}

const stats: Stat[] = [
  {
    id: 1,
    value: 94,
    suffix: '%',
    titleAr: 'معدل إكمال الدورات',
    titleEn: 'Course completion rate',
    descriptionAr: 'من المتعلمين يكملون دوراتهم بنجاح',
    descriptionEn: 'of learners successfully complete their courses',
    icon: Trophy,
    gradientFrom: '#0066FF',
    gradientTo: '#00D4FF',
    gradientClass: 'from-blue-600 to-cyan-500',
    comparisonValue: 54,
    comparisonLabelAr: 'المتوسط العالمي',
    comparisonLabelEn: 'Global average',
  },
  {
    id: 2,
    value: 24,
    suffix: 'h',
    titleAr: 'متوسط وقت الدرس الأول',
    titleEn: 'Average time to first lesson',
    descriptionAr: 'ابدأ التعلم فوراً بدون تأخير',
    descriptionEn: 'Start learning immediately without delay',
    icon: Zap,
    gradientFrom: '#8B5CF6',
    gradientTo: '#EC4899',
    gradientClass: 'from-purple-600 to-pink-500',
  },
  {
    id: 3,
    value: 78,
    suffix: '%',
    titleAr: 'حصلوا على وظيفة جديدة',
    titleEn: 'Got a new job',
    descriptionAr: 'نجاح مهني ملموس بعد إكمال الدورات',
    descriptionEn: 'tangible career success after completing courses',
    icon: Briefcase,
    gradientFrom: '#F59E0B',
    gradientTo: '#EF4444',
    gradientClass: 'from-amber-500 to-red-500',
  },
];

// Custom animated counter component
interface AnimatedCounterProps {
  end: number;
  suffix: string;
  duration?: number;
  isInView: boolean;
  className?: string;
  gradientFrom: string;
  gradientTo: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix,
  duration = 2.5,
  isInView,
  className = '',
  gradientFrom,
  gradientTo,
}) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

        // Easing function for smooth animation
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);

        setDisplayValue(Math.round(end * easedProgress));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDisplayValue(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }
  }, [isInView, end, duration]);

  return (
    <span
      className={className}
      style={{
        background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {displayValue}
      {suffix}
    </span>
  );
};

interface StatCardProps {
  stat: Stat;
  index: number;
  isInView: boolean;
  dir: 'ltr' | 'rtl';
  t: (ar: string, en: string) => string;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index, isInView, dir, t }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

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

  const Icon = stat.icon;

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
      {/* Glassmorphism Card with Gradient Border */}
      <div
        className="relative w-full h-full min-h-[380px] bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl transition-all duration-500 flex flex-col p-8 lg:p-10 overflow-hidden"
        style={{
          transform: 'translateZ(0)',
          borderColor: isHovered ? `${stat.gradientFrom}40` : 'rgba(255,255,255,0.5)',
          boxShadow: isHovered
            ? `0 25px 50px -12px ${stat.gradientFrom}40, 0 0 0 1px ${stat.gradientFrom}20`
            : '0 20px 40px -10px rgba(0,0,0,0.1)',
        }}
      >
        {/* Animated Gradient Border Glow */}
        <motion.div
          className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
          style={{
            background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})`,
          }}
          animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
        />

        {/* Background Gradient Overlay */}
        <motion.div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
          style={{
            background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})`,
          }}
          animate={isHovered ? { opacity: 0.15 } : { opacity: 0 }}
        />

        {/* Floating Particles */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})`,
              left: `${15 + i * 25}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Content Container */}
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="flex flex-col z-20 h-full w-full relative"
        >
          {/* Icon Container */}
          <div className="mb-6 relative" style={{ transform: 'translateZ(30px)' }}>
            {/* Outer Glow */}
            <motion.div
              className={`absolute -inset-2 rounded-2xl blur-xl transition-opacity duration-500`}
              style={{
                background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})`,
                opacity: isHovered ? 0.5 : 0.3,
              }}
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Icon Box */}
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: isHovered ? [0, 3, -3, 0] : 0,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
              className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-2xl flex items-center justify-center shadow-xl border-t border-white/40"
              style={{
                background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})`,
                boxShadow: `0 10px 30px ${stat.gradientFrom}40`,
              }}
            >
              <Icon
                size={40}
                className="text-white drop-shadow-lg relative z-10"
                strokeWidth={2.5}
              />

              {/* Inner Shine */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />

              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2"
                style={{ borderColor: stat.gradientFrom }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: index * 0.3,
                }}
              />
            </motion.div>
          </div>

          {/* Large Animated Number */}
          <div className="mb-4" style={{ transform: 'translateZ(20px)' }}>
            <motion.div
              className="text-6xl lg:text-7xl xl:text-8xl font-black leading-none mb-2"
              animate={isInView ? { scale: [0.8, 1.1, 1] } : {}}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.6 }}
            >
              <AnimatedCounter
                end={stat.value}
                suffix={stat.suffix}
                duration={2.5}
                isInView={isInView}
                gradientFrom={stat.gradientFrom}
                gradientTo={stat.gradientTo}
              />
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3
            className={`text-xl lg:text-2xl font-bold mb-3 transition-all duration-300 ${
              isHovered ? 'text-transparent bg-clip-text' : 'text-slate-800'
            }`}
            style={{
              backgroundImage: isHovered
                ? `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})`
                : 'none',
              transform: 'translateZ(15px)',
            }}
          >
            {t(stat.titleAr, stat.titleEn)}
          </motion.h3>

          {/* Description */}
          <p
            className="text-slate-600 text-base lg:text-lg leading-relaxed mb-6 flex-grow"
            style={{ transform: 'translateZ(10px)' }}
          >
            {t(stat.descriptionAr, stat.descriptionEn)}
          </p>

          {/* Comparison Bar (only for stat 1) */}
          {stat.comparisonValue && (
            <motion.div
              className="mt-auto"
              initial={{ opacity: 0, height: 0 }}
              animate={isInView && isHovered ? { opacity: 1, height: 'auto' } : {}}
              transition={{ delay: 0.3 }}
              style={{ transform: 'translateZ(5px)' }}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700">
                    {t('رايز أب', 'RiseUp')}
                  </span>
                  <span
                    className="font-bold"
                    style={{
                      color: stat.gradientFrom,
                    }}
                  >
                    {stat.value}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${stat.gradientFrom}, ${stat.gradientTo})`,
                    }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${stat.value}%` } : {}}
                    transition={{ delay: index * 0.15 + 0.5, duration: 1.5, ease: 'easeOut' }}
                  />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">
                    {t(stat.comparisonLabelAr || '', stat.comparisonLabelEn || '')}
                  </span>
                  <span className="text-slate-500">{stat.comparisonValue}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-slate-400 rounded-full"
                    style={{ width: `${stat.comparisonValue}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Trust Badge */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-sm font-semibold"
            style={{ transform: 'translateZ(25px)', color: stat.gradientFrom }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <motion.div
              className={`p-1.5 rounded-full bg-slate-50 transition-all duration-300 ${
                isHovered ? 'bg-white shadow-md scale-110' : ''
              }`}
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={14} style={{ color: stat.gradientFrom }} />
            </motion.div>
            <span
              className={`transition-all duration-300 ${
                isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
              }`}
            >
              {t('إنجاز موثق', 'Verified Achievement')}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'linear-gradient(135deg, #0066FF, #00D4FF)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20"
          style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)' }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg opacity-5"
          style={{
            width: `${30 + i * 8}px`,
            height: `${30 + i * 8}px`,
            background: `linear-gradient(135deg, ${
              i % 3 === 0 ? '#0066FF' : i % 3 === 1 ? '#8B5CF6' : '#F59E0B'
            }, transparent)`,
            top: `${8 + i * 12}%`,
            left: `${5 + i * 10}%`,
            rotate: i * 30,
          }}
          animate={{
            y: [0, -40, 0],
            rotate: [i * 30, i * 30 + 180, i * 30 + 360],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}
    </>
  );
};

export const ImpactStatisticsSection: React.FC = () => {
  const { t, dir } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 lg:py-20 overflow-hidden bg-slate-50"
    >
      {/* Background Effects */}
      <BackgroundEffects />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full backdrop-blur-sm font-semibold text-sm lg:text-base border bg-blue-50 text-blue-600 border-blue-200">
              {t('أرقام حقيقية', 'Real Numbers')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight"
          >
            {t('الأثر و', 'Impact &')}{' '}
            <span className="relative inline-block">
              <RotatingText
                texts={dir === 'rtl' 
                  ? ['الإنجازات', 'Achievements', 'الإنجازات', 'Achievements']
                  : ['Achievements', 'الإنجازات', 'Achievements', 'الإنجازات']
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
            className="text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed text-slate-600"
          >
            {t(
              'أرقام تتحدث عن نفسها - إنجازات حقيقية لمتعلمينا',
              'Numbers that speak for themselves - Real achievements of our learners'
            )}
          </motion.p>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '120px' } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-1 bg-blue-600 rounded-full mx-auto mt-6"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
          {stats.map((stat, index) => (
            <div key={stat.id} className="h-full">
              <StatCard stat={stat} index={index} isInView={isInView} dir={dir} t={t} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-lg">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">
              {t('انضم إلى آلاف المتعلمين الناجحين', 'Join thousands of successful learners')}
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-blue-600"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactStatisticsSection;

