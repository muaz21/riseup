import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Clock, Users, TrendingUp, Play, LucideIcon, CheckCircle2, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface CourseCardProps {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  duration: string;
  rating?: number;
  learners?: string;
  level: string;
  levelAr: string;
  imageUrl?: string;
  slug: string;
  onViewCourse: () => void;
  variant?: 'default' | 'current' | 'coursera' | 'pro';

  // Price information
  price?: string;
  originalPrice?: string;
  discount?: number; // Percentage discount (e.g., 85 for 85% off)
  isFree?: boolean;
  
  // Instructor information
  instructorNameAr?: string;
  instructorNameEn?: string;
  instructorAvatar?: string;
  
  // Badges
  isBestseller?: boolean;
  isNew?: boolean;
  hasCertificate?: boolean;
  
  // Additional information
  lessons?: number; // Number of lessons/sections
  courseLanguage?: string; // Course language
  categoryIcon?: LucideIcon;
  categoryNameAr?: string;
  categoryNameEn?: string;
  
  // Actions
  onRegister?: () => void;
  onFavorite?: () => void;
  
  // Props for Coursera-style variant
  institutionAr?: string;
  institutionEn?: string;
  institutionLogo?: string;
  productType?: string; // e.g., "Specialization", "Course"
  productTypeAr?: string;
}

export function CourseCard({
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
  duration,
  rating,
  learners,
  level,
  levelAr,
  imageUrl,
  slug,
  onViewCourse,
  variant = 'default',
  // Price
  price,
  originalPrice,
  discount,
  isFree = false,
  // Instructor
  instructorNameAr,
  instructorNameEn,
  instructorAvatar,
  // Badges
  isBestseller = false,
  isNew = false,
  hasCertificate = false,
  // Additional
  lessons,
  courseLanguage,
  categoryIcon: CategoryIcon,
  categoryNameAr,
  categoryNameEn,
  // Actions
  onRegister,
  onFavorite,
  // Coursera variant
  institutionAr,
  institutionEn,
  institutionLogo,
  productType,
  productTypeAr,
}: CourseCardProps) {
  const { t, language, dir } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Coursera-style variant - simple and clean
  if (variant === 'coursera') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onViewCourse}
        className="group rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col shadow-md hover:-translate-y-1"
        style={{
          backgroundColor: '#FAFBFC',
          borderColor: 'rgba(0, 0, 0, 0.08)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0, 86, 210, 0.3)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)';
        }}
      >
        {/* Image */}
        <div className="aspect-[16/9] bg-slate-100 relative overflow-hidden">
          {imageUrl ? (
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
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
              <span className="text-2xl font-bold text-slate-400">
                {t(titleAr, titleEn).substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Content */}
        <div className={`p-4 flex-1 flex flex-col ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {/* Partner Info */}
          {(institutionAr || institutionEn) && (
            <div className={`flex items-center gap-2 mb-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {institutionLogo && (
                <div className="w-6 h-6 rounded border border-slate-200 overflow-hidden flex-shrink-0 shadow-sm">
                  <img
                    src={institutionLogo}
                    alt={t(institutionAr || '', institutionEn || '')}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-xs text-slate-600 font-medium">
                {t(institutionAr || '', institutionEn || '')}
              </p>
            </div>
          )}

          {/* Title */}
          <h3 className="mb-3 line-clamp-2 text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors duration-200 leading-tight">
            {t(titleAr, titleEn)}
          </h3>

          {/* Footer */}
          <div className={`mt-auto flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {/* Product Type */}
            {(productType || productTypeAr) && (
              <p className="text-xs text-slate-600">
                {t(productTypeAr || '', productType || '')}
              </p>
            )}
            
            {/* Rating */}
            {rating !== undefined && (
              <div className={`flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs text-slate-700 font-semibold">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Current variant - dark themed card
  if (variant === 'current') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col shadow-xl"
      >

        {/* Image */}
        <div className="aspect-[16/9] bg-slate-900/30 relative overflow-hidden">
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt={t(titleAr, titleEn)}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.6 }}
            />
          ) : (
            <motion.div
              className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 relative overflow-hidden"
            >
              <span className="relative z-10 text-white text-4xl opacity-50">
                {t(titleAr, titleEn).substring(0, 2).toUpperCase()}
              </span>
            </motion.div>
          )}

          {/* Category Badge */}
          {CategoryIcon && categoryNameAr && (
            <Badge
              className={`absolute top-3 bg-slate-800/90 backdrop-blur-sm text-white border-none shadow-lg text-xs px-3 py-1.5 flex items-center gap-1.5 ${
                dir === 'rtl' ? 'right-3' : 'left-3'
              }`}
            >
              <CategoryIcon className="w-3.5 h-3.5" />
              <span>{t(categoryNameAr, categoryNameEn || '')}</span>
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className={`p-5 flex-1 flex flex-col ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          <h3 className="mb-3 line-clamp-2 text-xl font-bold text-white group-hover:text-white/90 transition-colors leading-tight">
            {t(titleAr, titleEn)}
          </h3>

          {/* Instructor Section */}
          {instructorNameAr && (
            <div className={`flex items-center gap-2 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <span className="text-white/80 text-sm">
                {t('بواسطة:', 'By:')}
              </span>
              {instructorAvatar && (
                <Avatar className="w-8 h-8 border-2 border-white/20">
                  <AvatarImage src={instructorAvatar} alt={t(instructorNameAr, instructorNameEn || '')} />
                  <AvatarFallback className="bg-white/20 text-white text-xs">
                    {t(instructorNameAr, instructorNameEn || '').substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="text-white text-sm font-medium">
                {t(instructorNameAr, instructorNameEn || '')}
              </span>
            </div>
          )}

          {/* Footer with actions */}
          <div className={`mt-auto flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {isFree && (
              <span className="text-white text-sm font-medium px-2">
                {t('مجانا', 'Free')}
              </span>
            )}
            
            <div className={`flex items-center gap-2 ml-auto ${dir === 'rtl' ? 'flex-row-reverse mr-auto ml-0' : ''}`}>
              <Button
                size="sm"
                className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg hover:shadow-xl transition-all text-xs px-4 py-2 h-auto"
                onClick={onRegister}
              >
                <CheckCircle2 className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                {t('التسجيل الآن', 'Register Now')}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                className="w-9 h-9 p-0 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                onClick={() => {
                  setIsFavorited(!isFavorited);
                  onFavorite?.();
                }}
              >
                <Heart 
                  className={`w-4 h-4 ${isFavorited ? 'fill-red-400 text-red-400' : ''}`}
                />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Pro variant - Modern, sophisticated design with dark background
  if (variant === 'pro') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-slate-900 rounded-2xl overflow-hidden h-full flex flex-col shadow-2xl transition-all duration-300"
        style={{
          border: isHovered ? '1px solid rgba(168, 85, 247, 0.5)' : '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: isHovered 
            ? '0 0 30px rgba(168, 85, 247, 0.3), 0 20px 40px rgba(0, 0, 0, 0.4)' 
            : '0 20px 40px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Background gradient accent */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br from-purple-500 to-purple-600" />

        {/* Image Section */}
        <div className="aspect-[16/9] bg-slate-800 relative overflow-hidden flex-shrink-0">
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt={t(titleAr, titleEn)}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.12 : 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 via-purple-700 to-slate-800">
              <span className="text-5xl font-bold text-slate-400 opacity-30">
                {t(titleAr, titleEn).substring(0, 1).toUpperCase()}
              </span>
            </div>
          )}

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Top badges - Always top-right corner */}
          <div className={`absolute top-4 right-4 flex gap-2 z-20 ${dir === 'rtl' ? 'flex-row' : 'flex-row-reverse'}`}>
            {isFree && (
              <Badge className="bg-lime-400/90 text-slate-900 border-none font-bold text-xs px-3 py-1.5 shadow-lg">
                {t('مجانا', 'FREE')}
              </Badge>
            )}
            {(productType || productTypeAr) && (
              <Badge className="bg-purple-500/90 text-white border-none font-semibold text-xs px-3 py-1.5 shadow-lg">
                {t(productTypeAr || '', productType || '')}
              </Badge>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className={`p-6 flex-1 flex flex-col relative z-10 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {/* Institution/Provider Name */}
          {(institutionAr || institutionEn) && (
            <div className={`flex items-center gap-2 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {institutionLogo && (
                <div className="w-5 h-5 rounded border border-slate-700 overflow-hidden flex-shrink-0">
                  <img
                    src={institutionLogo}
                    alt={t(institutionAr || '', institutionEn || '')}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-xs text-slate-300 font-medium uppercase tracking-wider whitespace-nowrap">
                {t(institutionAr || '', institutionEn || '')}
              </p>
            </div>
          )}

          {/* Title - Large white text */}
          <h3 className="mb-4 line-clamp-2 text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-200 leading-tight">
            {t(titleAr, titleEn)}
          </h3>

          {/* Description */}
          <p className="mb-5 line-clamp-2 text-sm text-slate-300 leading-relaxed">
            {t(descriptionAr, descriptionEn)}
          </p>

          {/* Instructor Section */}
          {(instructorNameAr || instructorNameEn) && (
            <div className={`flex items-center gap-2 mb-5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {instructorAvatar && (
                <Avatar className="w-8 h-8 border-2 border-slate-700">
                  <AvatarImage src={instructorAvatar} alt={t(instructorNameAr || '', instructorNameEn || '')} />
                  <AvatarFallback className="bg-slate-800 text-slate-300 text-xs">
                    {t(instructorNameAr || '', instructorNameEn || '').substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="text-sm text-slate-300 font-medium">
                {t(instructorNameAr || '', instructorNameEn || '')}
              </span>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-6 pb-6 border-b border-slate-700/50">
            {/* Rating */}
            {rating !== undefined && (
              <div className={`flex flex-col gap-1 ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-1.5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
                  <span className="text-sm font-bold text-white">{rating.toFixed(1)}</span>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium whitespace-nowrap">
                  {t('تقييم', 'RATING')}
                </p>
              </div>
            )}

            {/* Duration */}
            <div className={`flex flex-col gap-1 ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
              <div className={`flex items-center gap-1.5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm font-bold text-white whitespace-nowrap">{duration}</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium whitespace-nowrap">
                {t('المدة', 'DURATION')}
              </p>
            </div>

            {/* Learners */}
            {learners && (
              <div className={`flex flex-col gap-1 ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-1.5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Users className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm font-bold text-white">{learners}</span>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium whitespace-nowrap">
                  {t('متعلمون', 'LEARNERS')}
                </p>
              </div>
            )}

            {/* Level */}
            <div className={`flex flex-col gap-1 ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
              <div className={`flex items-center gap-1.5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-sm font-bold text-white whitespace-nowrap">{t(levelAr, level)}</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-medium whitespace-nowrap">
                {t('مستوى', 'LEVEL')}
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`mt-auto flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <Button
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 h-auto rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-purple-500/30"
              onClick={onViewCourse}
            >
              <span className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'}`}>→</span>
              {t('عرض الدورة', 'View Course')}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="w-11 h-11 p-0 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-red-400 border border-slate-700 transition-all duration-200"
              onClick={() => {
                setIsFavorited(!isFavorited);
                onFavorite?.();
              }}
            >
              <Heart
                className={`w-5 h-5 transition-all duration-200 ${
                  isFavorited ? 'fill-red-400 text-red-400' : ''
                }`}
              />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default variant - Professional design like Udemy/Coursera
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group rounded-xl border overflow-hidden transition-all duration-300 cursor-pointer h-full flex flex-col"
      style={{ 
        minHeight: '100%',
        maxWidth: '100%',
        width: '100%',
        backgroundColor: '#FAFBFC',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 86, 210, 0.3)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      onClick={onViewCourse}
    >
      {/* Image Container - 16:9 Aspect Ratio (Optimal for course cards) */}
      <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <motion.img
            src={imageUrl}
            alt={t(titleAr, titleEn)}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
            <span className="text-2xl font-bold text-gray-400">
              {t(titleAr, titleEn).substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        
        {/* Badges Overlay */}
        <div className={`absolute top-2 ${dir === 'rtl' ? 'left-2' : 'right-2'} flex flex-col gap-2 z-10`}>
          {isBestseller && (
            <Badge className="bg-amber-500 text-white border-none text-xs font-bold px-2 py-0.5 shadow-md">
              {t('الأكثر مبيعاً', 'Bestseller')}
            </Badge>
          )}
          {isNew && (
            <Badge className="bg-green-500 text-white border-none text-xs font-bold px-2 py-0.5 shadow-md">
              {t('جديد', 'New')}
            </Badge>
          )}
          {hasCertificate && (
            <Badge className="bg-blue-500 text-white border-none text-xs font-bold px-2 py-0.5 shadow-md">
              {t('شهادة', 'Certificate')}
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited(!isFavorited);
            onFavorite?.();
          }}
          className={`absolute ${dir === 'rtl' ? 'left-2' : 'right-2'} top-2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100`}
        >
          <Heart
            className={`w-4 h-4 transition-all ${
              isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      {/* Content Section */}
      <div className={`p-4 flex-1 flex flex-col ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        {/* Instructor */}
        {(instructorNameAr || instructorNameEn) && (
          <div className={`flex items-center gap-2 mb-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {instructorAvatar && (
              <Avatar className="w-6 h-6">
                <AvatarImage src={instructorAvatar} />
                <AvatarFallback className="text-xs">
                  {t(instructorNameAr || '', instructorNameEn || '').substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <p className="text-xs text-gray-600 font-medium line-clamp-1">
              {t(instructorNameAr || '', instructorNameEn || '')}
            </p>
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 leading-snug min-h-[3rem]">
          {t(titleAr, titleEn)}
        </h3>

        {/* Rating and Students */}
        {(rating !== undefined || learners !== undefined || lessons) && (
          <div className={`flex items-center gap-3 mb-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {rating !== undefined && (
              <div className={`flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <span className="text-sm font-bold text-gray-900">{rating.toFixed(1)}</span>
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              </div>
            )}
            {learners && (
              <>
                {rating !== undefined && <span className="text-gray-300">•</span>}
                <span className="text-xs text-gray-500">({learners})</span>
              </>
            )}
            {lessons && (
              <>
                {(rating !== undefined || learners) && <span className="text-gray-300">•</span>}
                <span className="text-xs text-gray-500">{lessons} {t('درس', 'lessons')}</span>
              </>
            )}
          </div>
        )}

        {/* Level and Duration */}
        <div className={`flex items-center gap-2 mb-3 flex-wrap ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <Badge variant="outline" className="text-xs px-2 py-0.5 border-gray-200 text-gray-600">
            {t(levelAr, level)}
          </Badge>
          <div className={`flex items-center gap-1 text-xs text-gray-500 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <Clock className="w-3 h-3" />
            <span>{duration}</span>
          </div>
          {courseLanguage && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-gray-500">{courseLanguage}</span>
            </>
          )}
        </div>

        {/* Price Section */}
        <div className={`mt-auto pt-3 border-t border-gray-200 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {isFree ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-green-600">{t('مجاني', 'Free')}</span>
            </div>
          ) : price ? (
            <div className={`flex items-center gap-2 flex-wrap ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <span className="text-xl font-bold text-gray-900">{price}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
              )}
              {discount && discount > 0 && (
                <Badge className="bg-red-500 text-white border-none text-xs font-bold px-2 py-0.5">
                  {discount}% {t('خصم', 'OFF')}
                </Badge>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
