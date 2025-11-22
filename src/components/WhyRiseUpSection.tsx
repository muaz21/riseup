import React from 'react';
import { BookOpen, Award, Globe, Smartphone, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import { Feature } from '../types';
import RotatingText from './RotatingText';
import { useLanguage } from './LanguageProvider';

const features: Feature[] = [
  {
    id: 'practical',
    title: 'تعلّم عملي',
    description: 'مشاريع حقيقية وتطبيقات عملية تضمن لك اكتساب المهارات المطلوبة في سوق العمل.',
    icon: BookOpen,
    color: 'from-blue-600 to-cyan-500',
    gradientFrom: '#2563EB', 
    gradientTo: '#06B6D4',   
  },
  {
    id: 'certificates',
    title: 'شهادات رقمية',
    description: 'شهادات معتمدة وموثقة يمكنك مشاركتها على منصات التوظيف فور إكمال الدورة.',
    icon: Award,
    color: 'from-teal-500 to-emerald-400',
    gradientFrom: '#2563eb', 
    gradientTo: '#34D399',   
  },
  {
    id: 'language',
    title: 'واجهة عربية/إنجليزية',
    description: 'تجربة مستخدم مرنة تدعم اللغتين العربية والإنجليزية لتسهيل رحلة التعلم.',
    icon: Globe,
    color: 'from-indigo-600 to-purple-500',
    gradientFrom: '#4F46E5', 
    gradientTo: '#A855F7',   
  },
  {
    id: 'mobile',
    title: 'تطبيق جوّال',
    description: 'تعلّم في أي وقت ومن أي مكان عبر تطبيقنا المتطور المتوفر على جميع الأجهزة.',
    icon: Smartphone,
    color: 'from-rose-500 to-orange-400',
    gradientFrom: '#F43F5E', 
    gradientTo: '#FB923C',   
  },
];

const WhyRiseUpSection: React.FC = () => {
  const { t, dir } = useLanguage();
  
  return (
    <section className="relative w-full py-12 md:py-24 px-4 overflow-hidden" style={{ backgroundColor: 'var(--color-white)' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm text-blue-600 rounded-full text-sm font-bold border border-blue-100 shadow-sm mb-2 hover:shadow-md transition-shadow"
          >
            <Sparkles size={16} className="text-blue-500 animate-pulse" />
            <span>مميزات استثنائية</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight"
          >
            {t('لماذا تختار', 'Why Choose')}{' '}
            <span className="relative inline-block">
              <RotatingText
                texts={dir === 'rtl' 
                  ? ['رايز أب؟', 'RiseUp؟', 'رايز أب؟', 'RiseUp؟']
                  : ['RiseUp?', 'رايز أب؟', 'RiseUp?', 'رايز أب؟']
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

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed space-y-2"
          >
            <p>
              صممنا تجربة تعليمية متكاملة تجمع بين <span className="text-slate-900 font-bold">المرونة</span> و <span className="text-slate-900 font-bold">الاحترافية</span>
            </p>
            <p>
              لتنطلق في مسارك المهني بثقة.
            </p>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="h-full">
              <TiltCard feature={feature} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRiseUpSection;
