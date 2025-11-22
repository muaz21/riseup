import React from 'react';
import { useLanguage } from '../LanguageProvider';
import { SearchBar } from '../SearchBar';
import { Button } from '../ui/button';
import { FeatureCard } from '../FeatureCard';
import { Badge } from '../ui/badge';
import { HeroSection } from '../HeroSection';
import { CurrentCoursesSection } from '../CurrentCoursesSection';
import { TrendingCoursesSection } from '../TrendingCoursesSection';
import { AnimatedShinyText } from '../ui/animated-shiny-text';
import { Highlighter } from '../ui/highlighter';
import WhyRiseUpSection from '../WhyRiseUpSection';
import { HowItWorksSection } from '../HowItWorksSection';
import { ImpactStatisticsSection } from '../ImpactStatisticsSection';
import { SuccessStoriesSection } from '../SuccessStoriesSection';
import { motion } from 'motion/react';
import CourseraCarousel from '../CourseraCarousel';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t, dir } = useLanguage();



  return (
    <div className="relative overflow-hidden w-full max-w-full transition-colors duration-300" style={{ backgroundColor: 'var(--color-light)' }}>
      {/* 1. Hero Section - First Impression & Value Proposition */}
      <HeroSection onNavigate={onNavigate} />

      {/* 2. Value Proposition - Why Choose RiseUp (Establish credibility early) */}
      <WhyRiseUpSection />

      {/* 3. Trending Courses - Show courses (Primary content) */}
      <TrendingCoursesSection onNavigate={onNavigate} />

      {/* 4. Coursera Carousel - Featured content */}
      <CourseraCarousel />

      {/* 5. How It Works - Process explanation */}
      <HowItWorksSection />

      {/* 6. Success Stories / Testimonials - Social proof (Build trust after explaining process) */}
      <SuccessStoriesSection />

      {/* 7. More Courses - Additional course offerings (Reinforce with more options) */}
      <CurrentCoursesSection onNavigate={onNavigate} />

      {/* 8. Impact Statistics - Final credibility boost (End with numbers) */}
      <ImpactStatisticsSection />
    </div>
  );
}
