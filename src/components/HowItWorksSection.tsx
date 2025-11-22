import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'motion/react';
import { Compass, BookOpen, Award, Sparkles } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import RotatingText from './RotatingText';

interface Step {
  numberAr: string;
  numberEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  icon: React.ComponentType<any>;
  gradientFrom: string;
  gradientTo: string;
  gradientClass: string;
}

const steps: Step[] = [
  {
    numberAr: '١',
    numberEn: '1',
    titleAr: 'اختر مساراً',
    titleEn: 'Choose your path',
    descriptionAr: 'اختر من بين مئات الدورات في مختلف المجالات',
    descriptionEn: 'Choose from hundreds of courses in various fields',
    icon: Compass,
    gradientFrom: '#0066FF',
    gradientTo: '#00D4FF',
    gradientClass: 'from-blue-600 to-cyan-500',
  },
  {
    numberAr: '٢',
    numberEn: '2',
    titleAr: 'تعلّم بدروس قصيرة',
    titleEn: 'Learn with short lessons',
    descriptionAr: 'دروس قصيرة ومركزة تناسب جدولك',
    descriptionEn: 'Short, focused lessons that fit your schedule',
    icon: BookOpen,
    gradientFrom: '#8B5CF6',
    gradientTo: '#EC4899',
    gradientClass: 'from-purple-600 to-pink-500',
  },
  {
    numberAr: '٣',
    numberEn: '3',
    titleAr: 'احصل على شهادة',
    titleEn: 'Get a certificate',
    descriptionAr: 'شهادة معترف بها تضيف قيمة لسيرتك الذاتية',
    descriptionEn: 'A recognized certificate that adds value to your resume',
    icon: Award,
    gradientFrom: '#F59E0B',
    gradientTo: '#10B981',
    gradientClass: 'from-amber-500 to-emerald-500',
  },
];

interface StepCardProps {
  step: Step;
  index: number;
  isInView: boolean;
  dir: 'ltr' | 'rtl';
  t: (ar: string, en: string) => string;
}

const StepCard: React.FC<StepCardProps> = ({ step, index, isInView, dir, t }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

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

  const Icon = step.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 80, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
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
      {/* Clean Professional Card */}
      <div
        className="relative w-full h-full min-h-[420px] bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 flex flex-col items-center text-center p-8 lg:p-10 overflow-hidden"
      >
        {/* Animated Background Gradient */}
        <motion.div
          className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}
          style={{
            background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`,
          }}
          animate={isHovered ? { opacity: 0.15 } : { opacity: 0 }}
        />

        {/* Floating Particles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`,
              left: `${20 + i * 30}%`,
              top: `${15 + i * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Content Container */}
        <div
          style={{ transformStyle: 'preserve-3d' }}
          className="flex flex-col items-center z-20 h-full w-full relative"
        >
          {/* Large Decorative Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.6 }}
            className="absolute -top-8 -right-8 lg:-top-12 lg:-right-12 text-[120px] lg:text-[180px] font-black leading-none opacity-5 select-none"
            style={{
              background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: dir === 'rtl' ? 'scaleX(-1)' : 'none',
            }}
          >
            {t(step.numberAr, step.numberEn)}
          </motion.div>

          {/* Icon Container with Glow */}
          <div className="mb-8 relative perspective-500" style={{ transform: 'translateZ(40px)' }}>
            {/* Outer Glow */}
            <motion.div
              className={`absolute inset-0 rounded-3xl blur-3xl transition-opacity duration-500`}
              style={{
                background: `linear-gradient(135deg, ${step.gradientFrom}, ${step.gradientTo})`,
                opacity: isHovered ? 0.6 : 0.3,
              }}
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Icon Box */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: isHovered ? [0, 5, -5, 0] : 0,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
              className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-xl flex items-center justify-center bg-blue-50"
            >
              <Icon
                size={48}
                className="text-blue-600 relative z-10"
                strokeWidth={2.5}
              />

              {/* Inner Shine */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/30 to-transparent pointer-events-none" />

              {/* Pulse Ring */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2"
                style={{ borderColor: step.gradientFrom }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="space-y-4 flex-grow" style={{ transform: 'translateZ(20px)' }}>
            <motion.h3
              className="text-2xl lg:text-3xl font-bold mb-4 text-slate-900 transition-all duration-300"
            >
              {t(step.titleAr, step.titleEn)}
            </motion.h3>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed font-medium">
              {t(step.descriptionAr, step.descriptionEn)}
            </p>
          </div>

          {/* Progress Indicator */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-sm font-semibold"
            style={{ transform: 'translateZ(30px)', color: step.gradientFrom }}
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <span
              className={`transition-all duration-300 ${
                isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
              }`}
            >
              {t('الخطوة', 'Step')} {t(step.numberAr, step.numberEn)}
            </span>
            <motion.div
              className={`p-2 rounded-full bg-blue-50 transition-all duration-300 ${
                isHovered ? 'bg-blue-100 shadow-lg scale-110' : ''
              }`}
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={16} className="text-blue-600" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ConnectorPath: React.FC<{ progress: number; dir: 'ltr' | 'rtl' }> = ({ progress, dir }) => {
  return (
    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 z-0">
      <svg
        className="w-full h-full"
        style={{ direction: dir === 'rtl' ? 'rtl' : 'ltr' }}
        viewBox="0 0 1000 4"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066FF" stopOpacity="0" />
            <stop offset={`${progress * 100}%`} stopColor="#0066FF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0,2 Q 250,2 500,2 T 1000,2"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </svg>

      {/* Animated Dots */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg"
          style={{
            left: `${(index + 1) * 33.33}%`,
            background: index <= progress * 2 ? 'linear-gradient(135deg, #0066FF, #EC4899)' : '#e5e7eb',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: index <= progress * 2 ? [1, 1.3, 1] : 1,
            boxShadow:
              index <= progress * 2
                ? ['0 0 0 0 rgba(0,102,255,0.4)', '0 0 0 10px rgba(0,102,255,0)', '0 0 0 0 rgba(0,102,255,0)']
                : '0 0 0 0 rgba(0,0,0,0)',
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.3,
          }}
        />
      ))}
    </div>
  );
};

const BackgroundEffects: React.FC = () => {
  return (
    <>
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-5"
          style={{ background: 'linear-gradient(135deg, #93C5FD, #BFDBFE)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-5"
          style={{ background: 'linear-gradient(135deg, #C4B5FD, #E9D5FF)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'linear-gradient(135deg, #FDE68A, #A7F3D0)' }}
        />
      </div>

      {/* Floating Geometric Shapes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg"
          style={{
            width: `${40 + i * 10}px`,
            height: `${40 + i * 10}px`,
            background: `linear-gradient(135deg, ${
              i % 3 === 0 ? '#93C5FD' : i % 3 === 1 ? '#C4B5FD' : '#FDE68A'
            }, transparent)`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 12}%`,
            rotate: i * 45,
            opacity: 0.03,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [i * 45, i * 45 + 180, i * 45 + 360],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </>
  );
};

export const HowItWorksSection: React.FC = () => {
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
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full backdrop-blur-sm font-bold text-sm lg:text-base border" style={{ backgroundColor: 'rgba(0, 102, 204, 0.1)', color: 'var(--color-primary)', borderColor: 'var(--color-secondary)' }}>
              {t('رحلة التعلم', 'Learning Journey')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-tight"
            style={{
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
            }}
          >
            <RotatingText
              texts={dir === 'rtl' 
                ? ['كيف يعمل', 'How it works', 'كيف يعمل', 'How it works']
                : ['How it works', 'كيف يعمل', 'How it works', 'كيف يعمل']
              }
              splitBy="words"
              mainClassName="inline-block px-2 sm:px-2 md:px-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg font-bold"
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
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-dark)' }}
          >
            {t(
              'ابدأ رحلتك التعليمية في ثلاث خطوات بسيطة وسهلة',
              'Start your learning journey in three simple and easy steps'
            )}
          </motion.p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Animated Connector Path */}
          <ConnectorPath progress={isInView ? 1 : 0} dir={dir} />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="h-full">
                <StepCard
                  step={step}
                  index={index}
                  isInView={isInView}
                  dir={dir}
                  t={t}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm">
            <span className="text-sm font-semibold text-slate-700">
              {t('ابدأ الآن', 'Start now')}
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

export default HowItWorksSection;

