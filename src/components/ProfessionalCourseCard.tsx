import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from './LanguageProvider';
import { Clock, Award, TrendingUp, Star, BookOpen } from 'lucide-react';

interface ProfessionalCourseCardProps {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  imageUrl: string;
  categoryLabelAr?: string;
  categoryLabelEn?: string;
  rating?: number;
  reviews?: number;
  learners?: string;
  duration?: string;
  durationAr?: string;
  level?: string;
  levelAr?: string;
  lessons?: number;
  instructorNameEn?: string;
  instructorNameAr?: string;
  instructorAvatar?: string;
  price?: string;
  originalPrice?: string;
  discount?: number;
  isFree?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
  hasCertificate?: boolean;
  categoryColor?: string;
  searchQuery?: string;
  onViewCourse?: () => void;
  onFavorite?: () => void;
  // Path linking
  pathId?: number;
  pathTitleAr?: string;
  pathTitleEn?: string;
}

export function ProfessionalCourseCard({
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  imageUrl,
  duration,
  durationAr,
  level,
  levelAr,
  price,
  originalPrice,
  isFree = false,
  isBestseller = false,
  isNew = false,
  rating,
  reviews,
  searchQuery,
  onViewCourse,
  pathId,
  pathTitleAr,
  pathTitleEn,
}: ProfessionalCourseCardProps) {
  const { t, dir, language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Helper function to highlight search terms
  const highlightSearchTerms = (text: string, query?: string) => {
    if (!query || !query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <mark
            key={index}
            className="bg-yellow-200 text-yellow-900 px-0.5 rounded font-semibold"
            style={{ backgroundColor: 'rgba(250, 204, 21, 0.4)', color: 'inherit' }}
          >
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  const title = t(titleAr, titleEn);
  const highlightedTitle = searchQuery ? highlightSearchTerms(title, searchQuery) : title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onViewCourse}
      className="group relative bg-white rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 w-full max-w-full sm:max-w-[320px] lg:max-w-[280px] flex flex-col h-full"
      whileHover={{ y: -4 }}
    >
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden bg-slate-100">
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
        )}

        {/* Course Image */}
        <motion.img
          src={imageUrl}
          alt={t(titleAr, titleEn)}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Badges - Top Right - More Prominent */}
        <div className={`absolute top-3 ${dir === 'rtl' ? 'left-3' : 'right-3'} flex flex-col gap-2.5 z-20`}>
          {isBestseller && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-extrabold rounded-lg shadow-2xl flex items-center gap-1.5 border-2 border-white/30"
              style={{
                boxShadow: '0 8px 16px rgba(239, 68, 68, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.2)',
              }}
            >
              <Star className="w-4 h-4 fill-white" />
              <span className="text-xs sm:text-sm">{t('الأكثر مبيعاً', 'Bestseller')}</span>
            </motion.div>
          )}
          {isNew && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-extrabold rounded-lg shadow-2xl border-2 border-white/30"
              style={{
                boxShadow: '0 8px 16px rgba(16, 185, 129, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.2)',
              }}
            >
              <span className="text-xs sm:text-sm">{t('جديد', 'New')}</span>
            </motion.div>
          )}
          {rating && rating >= 4.5 && !isBestseller && !isNew && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-extrabold rounded-lg shadow-2xl flex items-center gap-1.5 border-2 border-white/30"
              style={{
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4), 0 0 0 2px rgba(255, 255, 255, 0.2)',
              }}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{t('رائج', 'Trending')}</span>
            </motion.div>
          )}
          {pathId && pathTitleAr && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1.5 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 border-2 border-white/30"
              style={{
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3), 0 0 0 2px rgba(255, 255, 255, 0.2)',
              }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-xs">
                {t('جزء من مسار', 'Part of Path')}: {language === 'ar' ? pathTitleAr : pathTitleEn}
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className={`p-4 flex flex-col flex-1 gap-3 ${dir === 'rtl' ? 'text-right items-end' : 'text-left items-start'}`}>
        {/* Rating and Reviews */}
        {(rating || reviews) && (
          <div className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {rating && (
              <div className={`flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-semibold text-slate-700">{rating.toFixed(1)}</span>
              </div>
            )}
            {reviews && (
              <span className="text-xs text-slate-500">({reviews.toLocaleString()} {t('تقييم', 'reviews')})</span>
            )}
          </div>
        )}

        {/* Title - Aligned with Search Highlighting */}
        <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors w-full">
          {highlightedTitle}
        </h3>

        {/* Level and Duration Row - Aligned */}
        <div className={`flex items-center gap-3 flex-wrap w-full ${dir === 'rtl' ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
          {/* Level */}
          {level && (
            <div className={`flex items-center gap-1.5 text-slate-600 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm font-medium">{t(levelAr || '', level)}</span>
            </div>
          )}

          {/* Duration */}
          {duration && (
            <div className={`flex items-center gap-1.5 text-slate-600 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-sm">{t(durationAr || duration, duration)}</span>
            </div>
          )}
        </div>

        {/* Price Section - Aligned */}
        <div className={`flex items-center gap-2 mt-auto w-full ${dir === 'rtl' ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
          {isFree ? (
            <span className="text-lg font-bold text-emerald-600">{t('مجاني', 'Free')}</span>
          ) : (
            <>
              {/* Current Price - Large and Bold */}
              <span className="text-lg font-bold text-slate-900">{price}</span>
              {/* Original Price - Smaller with Strikethrough */}
              {originalPrice && (
                <span className="text-sm text-slate-500 line-through">{originalPrice}</span>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
