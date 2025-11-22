// NOTE: This component has been replaced by CourseraCarousel
// It is kept for reference but is no longer used in the application
// To use it again, replace CourseraCarousel with HeroSection in HomePage.tsx

import React, { useState } from 'react';
import { HeroSlider } from './ui/slider';
import { useLanguage } from './LanguageProvider';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const { t } = useLanguage();
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  
  const images = [
    {
      imgURL: '/banner2.png',
      imgAltAr: 'رايز أب - منصة التعليم الإلكتروني',
      imgAltEn: 'RiseUp - Online Learning Platform',
    },
    {
      imgURL: '/banners2.png',
      imgAltAr: 'رايز أب - ابدأ رحلتك التعليمية',
      imgAltEn: 'RiseUp - Start Your Learning Journey',
    },
    {
      imgURL: '/unnamed.jpg',
      imgAltAr: 'رايز أب - تعلم بسهولة',
      imgAltEn: 'RiseUp - Learn Easily',
    },
  ];

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <section 
      className="relative overflow-visible md:overflow-hidden z-0 pt-16 md:pt-0 -mt-[60px] md:-mt-[84px] mb-0" 
      style={{ 
        margin: 0, 
        marginBottom: 0,
        paddingTop: '4rem',
        width: '100%',
        maxWidth: '100%',
        left: 0,
        right: 0,
      }}
    >
      <HeroSlider autoplayInterval={5000}>
        {images.map((image, index) => {
          const isLoaded = loadedImages.has(index);
          return (
            <div key={index} className="relative w-full" style={{ height: 'auto' }}>
              {/* Loading Skeleton */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
              )}
            <img 
              src={image.imgURL} 
                alt={t(image.imgAltAr, image.imgAltEn)}
                className={`w-full h-auto object-contain transition-opacity duration-500 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              style={{ 
                display: 'block', 
                margin: 0, 
                padding: 0,
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'top center',
              }} 
              loading={index === 0 ? 'eager' : 'lazy'}
                onLoad={() => handleImageLoad(index)}
            />
            </div>
          );
        })}
      </HeroSlider>
    </section>
  );
}