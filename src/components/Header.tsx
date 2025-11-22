import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';
import { Globe, Menu, X, Search, Mail, BookOpen, Code, Palette, Briefcase, TrendingUp, Database, Lightbulb, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, getCategoryCount } from '../data/courses';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { language, setLanguage, t, dir } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCoursesMenu, setShowCoursesMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync search query with URL when on courses page
  useEffect(() => {
    if (currentPage === 'courses' || currentPage.startsWith('courses/')) {
      const urlParams = new URLSearchParams(window.location.search);
      const urlSearchQuery = urlParams.get('search') || '';
      setSearchQuery(urlSearchQuery);
    } else {
      // Clear search when not on courses page
      setSearchQuery('');
    }
  }, [currentPage]);

  // Map category keys to icons
  const categoryIcons: Record<string, React.ComponentType<any>> = {
    programming: Code,
    excel: Database,
    python: Code,
    office: Briefcase,
    english: BookOpen,
  };

  // Get categories from unified data source (excluding 'featured')
  const displayCategories = useMemo(() => {
    return CATEGORIES.filter(cat => cat.key !== 'featured').map(cat => {
      const Icon = categoryIcons[cat.key] || GraduationCap;
      const count = getCategoryCount(cat.key);
      
      return {
        key: cat.key,
        icon: Icon,
        titleAr: cat.nameAr,
        titleEn: cat.nameEn,
        descAr: language === 'ar' ? `${count} ${language === 'ar' ? 'دورة متاحة' : 'courses available'}` : `${count} courses available`,
        descEn: `${count} courses available`,
        color: 'from-primary to-accent',
        gradient: cat.gradient,
        count,
      };
    });
  }, [language]);


  const navItems = [
    { key: 'home', label: t('الرئيسية', 'Home') },
    { key: 'courses', label: t('الدورات', 'Courses'), hasDropdown: true },
    { key: 'paths', label: t('المسارات', 'Paths') },
    { key: 'blog', label: t('المدونة', 'Blog') },
    { key: 'about', label: t('من نحن', 'About') },
  ];

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-[9999] border-b backdrop-blur-md w-full bg-slate-900"
      initial={{ opacity: 1, y: 0 }}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: isScrolled 
          ? '0 10px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
          : '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      style={{
        backgroundColor: '#0f172a', /* Slate-900 */
        borderColor: 'rgba(255, 255, 255, 0.1)',
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        minHeight: isMobile ? '60px' : '84px',
      }}
    >
      {/* Top Bar with Contact Info - Hidden on Mobile */}
      <motion.div 
        className={`border-b backdrop-blur-sm ${isMobile ? 'hidden' : ''}`}
        animate={{
          height: isScrolled ? '1.5rem' : '1.75rem',
          opacity: isScrolled ? 0.9 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          borderColor: 'rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(15, 23, 42, 0.95)', /* Slate-900 with slight transparency */
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between h-7 text-sm ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`} style={{ color: 'var(--neutral-300)' }}>
              <a 
                href="mailto:info@riseup.com" 
                className={`flex items-center gap-2 transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                style={{ 
                  color: 'var(--neutral-300)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--neutral-300)'}
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="text-sm">info@riseup.com</span>
              </a>
            </div>
            
            {/* Search and Language */}
            <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {/* Compact Search Bar */}
              <div className="relative hidden md:block">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${dir === 'rtl' ? 'right-2.5' : 'left-2.5'}`} style={{ color: 'var(--neutral-400)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      const searchParam = encodeURIComponent(searchQuery.trim());
                      onNavigate(`courses?search=${searchParam}`);
                    }
                  }}
                  placeholder={t('ابحث...', 'Search...')}
                  className={`w-48 backdrop-blur-sm border rounded-md py-1.5 text-xs focus:outline-none focus:ring-1 transition-all ${dir === 'rtl' ? 'pr-8 pl-3' : 'pl-8 pr-3'}`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.width = '16rem';
                    e.currentTarget.style.borderColor = 'var(--brand-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 1px var(--brand-primary)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.width = '12rem';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-2 px-3 py-2 rounded-md transition-all text-sm font-medium min-h-[44px] min-w-[44px] justify-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                aria-label={t('تبديل اللغة', 'Toggle language')}
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">{language === 'ar' ? 'EN' : 'AR'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className={`flex items-center justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
          animate={{
            height: isScrolled 
              ? (isMobile ? '2.25rem' : '3rem')
              : (isMobile ? '2.75rem' : '3.5rem'),
          }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            minHeight: isMobile ? '2.25rem' : '3rem',
          }}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="group transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1 -m-1"
            >
              <motion.h1
                className="group-hover:scale-105 transition-transform font-bold text-white"
                animate={{
                  fontSize: isScrolled 
                    ? (isMobile ? '1.125rem' : '1.375rem')
                    : (isMobile ? '1.25rem' : '1.5rem'),
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{
                  color: 'var(--color-white)',
                  margin: 0,
                  lineHeight: '1.2',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-white)';
                }}
              >
                {t('رايز أب', 'RiseUp')}
              </motion.h1>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-1 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {navItems.map((item) => (
              <div 
                key={item.key} 
                className="relative"
                onMouseEnter={() => item.hasDropdown && setShowCoursesMenu(true)}
                onMouseLeave={() => item.hasDropdown && setShowCoursesMenu(false)}
              >
                <button
                  onClick={() => !item.hasDropdown && onNavigate(item.key)}
                  className={`relative px-4 py-2.5 rounded-lg transition-all font-medium text-sm min-h-[44px] min-w-[44px] ${
                    currentPage === item.key || (item.key === 'courses' && currentPage === 'courses')
                      ? 'text-white'
                      : ''
                  }`}
                  style={{
                    backgroundColor: currentPage === item.key || (item.key === 'courses' && currentPage === 'courses')
                      ? 'rgba(255, 255, 255, 0.15)'
                      : 'transparent',
                    color: currentPage === item.key || (item.key === 'courses' && currentPage === 'courses')
                      ? 'var(--color-white)'
                      : 'var(--color-white)',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== item.key && !(item.key === 'courses' && currentPage === 'courses')) {
                      e.currentTarget.style.color = 'var(--color-accent)';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item.key && !(item.key === 'courses' && currentPage === 'courses')) {
                      e.currentTarget.style.color = 'var(--color-white)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span className={`flex items-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    {item.label}
                    {item.hasDropdown && <GraduationCap className="w-4 h-4" />}
                  </span>
                </button>

                {/* Category Dropdown for Courses - CardNav Style */}
                {item.hasDropdown && (
                  <AnimatePresence>
                    {showCoursesMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute top-full ${dir === 'rtl' ? 'right-0' : 'left-0'} mt-2 w-[600px] max-w-[90vw] bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden`}
                        style={{ zIndex: 9999 }}
                        onMouseEnter={() => setShowCoursesMenu(true)}
                        onMouseLeave={() => setShowCoursesMenu(false)}
                      >
                        <div className="p-4">
                          <h4 className={`text-lg font-bold mb-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`} style={{ color: 'var(--neutral-900)' }}>
                            {t('تصفح جميع الدورات', 'Browse All Courses')}
                          </h4>
                          <div className="grid grid-cols-3 gap-3">
                            {displayCategories.slice(0, 6).map((cat) => {
                              const Icon = categoryIcons[cat.key] || GraduationCap;
                              // Extract colors from gradient string
                              const gradientMatch = cat.gradient.match(/#[0-9a-fA-F]{6}/g);
                              const fromColor = gradientMatch?.[0] || '#3b82f6';
                              const toColor = gradientMatch?.[1] || gradientMatch?.[0] || '#2563eb';
                              return (
                                <motion.button
                                  key={cat.key}
                                  onClick={() => {
                                    if (cat.key === 'featured') {
                                      onNavigate('courses');
                                    } else {
                                      onNavigate(`courses/${cat.key}`);
                                    }
                                    setShowCoursesMenu(false);
                                  }}
                                  className={`group relative p-4 rounded-xl transition-all overflow-hidden ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                                  style={{
                                    background: `linear-gradient(135deg, ${fromColor}, ${toColor})`,
                                    color: '#ffffff',
                                  }}
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                  <div className="relative z-10">
                                    <Icon className="w-6 h-6 mb-2" />
                                    <div className="font-bold text-sm mb-1">{t(cat.titleAr, cat.titleEn)}</div>
                                    <div className="text-xs opacity-90">{cat.count} {t('دورة', 'courses')}</div>
                                  </div>
                                </motion.button>
                              );
                            })}
                          </div>
                          <div className="border-t border-slate-200 mt-4 pt-4">
                            <button
                              onClick={() => {
                            onNavigate('courses');
                            setShowCoursesMenu(false);
                          }}
                              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                            >
                              {t('تصفح جميع الدورات', 'Browse All Courses')}
                              <GraduationCap className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-200/50 transition-all px-6"
                style={{
                  boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(37, 99, 235, 0.4), 0 4px 6px -2px rgba(37, 99, 235, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={() => window.open('https://app.riseup.com', '_blank')}
              >
                {t('الدخول إلى المنصة', 'Go to Platform')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={t('القائمة', 'Menu')}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="lg:hidden py-4 border-t border-white/10 overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{
                duration: 0.35,
                ease: [0.4, 0, 0.2, 1],
                height: {
                  duration: 0.3,
                },
              }}
            >
            {/* Mobile Search */}
            <div className="mb-4 px-2">
              <div className="relative w-full">
                <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} style={{ color: 'var(--neutral-400)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      const searchParam = encodeURIComponent(searchQuery.trim());
                      onNavigate(`courses?search=${searchParam}`);
                      setMobileMenuOpen(false);
                    }
                  }}
                  placeholder={t('ابحث عن الدورات...', 'Search courses...')}
                  className={`w-full backdrop-blur-sm border rounded-xl py-2.5 focus:outline-none focus:ring-2 transition-all ${dir === 'rtl' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--brand-primary)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(0, 86, 210, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  onClick={() => {
                    onNavigate(item.key === 'courses' ? 'courses' : item.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-lg transition-all font-medium text-sm min-h-[44px] ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                  style={{
                    backgroundColor: currentPage === item.key || (item.key === 'courses' && currentPage === 'courses')
                      ? 'rgba(37, 99, 235, 0.2)'
                      : 'transparent',
                    color: currentPage === item.key || (item.key === 'courses' && currentPage === 'courses')
                      ? '#ffffff'
                      : 'var(--neutral-300)',
                    border: currentPage === item.key || (item.key === 'courses' && currentPage === 'courses')
                      ? '1px solid rgba(37, 99, 235, 0.3)'
                      : 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== item.key && !(item.key === 'courses' && currentPage === 'courses')) {
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item.key && !(item.key === 'courses' && currentPage === 'courses')) {
                      e.currentTarget.style.color = 'var(--neutral-300)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.div 
                className="flex flex-col gap-2 mt-4 px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1, duration: 0.2 }}
              >
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-200/50 transition-all min-h-[44px]"
                  style={{
                    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(37, 99, 235, 0.4), 0 4px 6px -2px rgba(37, 99, 235, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.2)';
                  }}
                  onClick={() => window.open('https://app.riseup.com', '_blank')}
                >
                  {t('الدخول إلى المنصة', 'Go to Platform')}
                </Button>
              </motion.div>
            </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
