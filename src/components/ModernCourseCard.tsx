import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageProvider';
import { Play } from 'lucide-react';
import { getGradientByIndex, getGradientByName } from './theme';

interface ModernCourseCardProps {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageUrl: string;
  categoryLabelAr?: string;
  categoryLabelEn?: string;
  gradientName?: string; // Use a name to select a predefined gradient
  gradientFrom?: string;
  gradientTo?: string;
  onViewCourse?: () => void;
}

export function ModernCourseCard({
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  imageUrl,
  categoryLabelAr,
  categoryLabelEn,
  gradientName,
  gradientFrom,
  gradientTo,
  onViewCourse,
}: ModernCourseCardProps) {
  const { t, dir } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Use provided gradients, a named gradient from the theme, or pick from presets based on title hash
  const getGradient = () => {
    // Priority 1: Custom gradient values
    if (gradientFrom && gradientTo) {
      return { from: gradientFrom, to: gradientTo };
    }
    // Priority 2: Named gradient from theme
    if (gradientName) {
      return getGradientByName(gradientName) || getGradientByIndex(0); // Fallback to the first gradient
    }
    // Priority 3: Pick gradient based on title hash for consistency
    const title = t(titleAr, titleEn);
    const hash = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return getGradientByIndex(hash);
  };

  const gradient = getGradient();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onViewCourse}
      className="group relative w-full min-h-[320px] rounded-xl overflow-hidden cursor-pointer block bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
      style={{
        background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
        minHeight: '320px',
      }}
      whileHover={{ y: -12, scale: 1.03 }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {imageUrl && (
          <>
            {/* Loading Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
            )}
            <motion.img
              src={imageUrl}
              alt={t(titleAr, titleEn)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </>
        )}
        {/* Gradient Overlay with better depth - Blue-600 theme */}
        <div
          className="absolute inset-0 opacity-70 group-hover:opacity-50 transition-opacity duration-500"
          style={{
            background: `linear-gradient(180deg, transparent 0%, #2563ebcc 40%, #3b82f6ee 100%)`,
          }}
        />
        {/* Additional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Category Badge */}
      {(categoryLabelAr || categoryLabelEn) && (
        <div
          className={`absolute top-5 ${dir === 'rtl' ? 'right-5' : 'left-5'} z-10`}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md shadow-xl text-xs font-bold border border-white/50"
            style={{ 
              color: '#2563eb',
              boxShadow: `0 4px 12px rgba(37, 99, 235, 0.3)`,
            }}
          >
            {t(categoryLabelAr || '', categoryLabelEn || '')}
          </motion.div>
        </div>
      )}

      {/* Content Section */}
      <div
        className={`absolute inset-x-0 bottom-0 p-7 pb-8 z-10 ${
          dir === 'rtl' ? 'text-right' : 'text-left'
        }`}
      >
        {/* Title - Always Visible */}
        <motion.h3
          className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight drop-shadow-lg"
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          {t(titleAr, titleEn)}
        </motion.h3>

        {/* Description - Reveals on Hover */}
        <motion.div
          initial={false}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
            marginTop: isHovered ? 8 : 0,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <p className="text-white/95 text-base lg:text-lg leading-relaxed font-medium">
            {t(descriptionAr, descriptionEn)}
          </p>
        </motion.div>

        {/* Play Icon - Appears on Hover */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 15,
          }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className={`mt-5 flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center group-hover:bg-white/35 transition-all duration-300 shadow-xl"
            style={{
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Play
              className={`w-6 h-6 text-white ${dir === 'rtl' ? 'rotate-180 ml-1' : 'mr-1'}`}
              fill="white"
            />
          </motion.div>
          <span className="text-white text-base font-semibold drop-shadow-md">
            {t('استكشف الدورة', 'Explore Course')}
          </span>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Enhanced Shadow on Hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        animate={{
          boxShadow: isHovered
            ? `0 25px 50px -12px ${gradient.from}50, 0 0 0 1px ${gradient.from}20`
            : '0 15px 35px -10px rgba(0, 0, 0, 0.25)',
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
