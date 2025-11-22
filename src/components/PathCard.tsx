import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, BookOpen, Award, Users, ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { TextWithTooltips } from './TechnicalTermTooltip';
import { useEnrollment } from '../hooks/useEnrollment';
import { LearningPath } from '../services/pathsApi';

interface PathCardProps {
  path: LearningPath;
  icon: React.ElementType;
  onNavigate?: (page: string) => void;
}

export function PathCard({
  path,
  icon: Icon,
  onNavigate,
}: PathCardProps) {
  const { language, t, dir } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [moodleUrl, setMoodleUrl] = useState<string | null>(null);
  const { handleEnroll, checkEnrollment, modals } = useEnrollment();
  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight;

  // Check enrollment status on mount
  useEffect(() => {
    checkEnrollment(path.id).then((status) => {
      setIsEnrolled(status.isEnrolled);
      if (status.moodleUrl) {
        setMoodleUrl(status.moodleUrl);
      }
    });
  }, [path.id, checkEnrollment]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If enrolled, go to Moodle course
    if (isEnrolled && moodleUrl) {
      window.open(moodleUrl, '_blank');
    } else {
      // Navigate to path details page
      if (onNavigate) {
        onNavigate(`paths/${path.id}`);
      } else {
        window.location.href = `/paths/${path.id}`;
      }
    }
  };

  const duration = `${path.durationMonths} ${t('أشهر', 'months')}`;
  const students = path.studentsEnrolled >= 1000 
    ? `${(path.studentsEnrolled / 1000).toFixed(0)}k+`
    : `${path.studentsEnrolled}+`;

  return (
    <>
      {/* Render modals */}
      {modals}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card 
          className="h-full overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 group rounded-xl bg-white"
        >
          {/* Header with gradient */}
          <div className={`relative h-32 sm:h-36 bg-gradient-to-br ${path.color} overflow-hidden`}>
            
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-lg" />
              </motion.div>
            </div>

            {/* Level badge */}
            <div className={`absolute top-3 sm:top-4 ${dir === 'rtl' ? 'left-3 sm:left-4' : 'right-3 sm:right-4'}`}>
              <Badge className="bg-white/95 text-neutral-900 backdrop-blur-sm border-none shadow-sm text-xs sm:text-sm font-medium px-2 sm:px-3 py-1">
                {language === 'ar' ? path.levelAr : path.level}
              </Badge>
            </div>
          </div>

          <CardHeader className="pb-4 pt-6 px-6">
            <h3 className={`mb-2 text-lg sm:text-xl font-semibold transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'} text-neutral-900 group-hover:text-primary leading-tight`}>
              {language === 'ar' ? path.titleAr : path.titleEn}
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'} transition-colors text-neutral-600`}>
              {language === 'ar' ? path.descriptionAr : path.descriptionEn}
            </p>
          </CardHeader>

          <CardContent className="space-y-5 px-6 pb-6">
            {/* Stats */}
            <div className={`grid grid-cols-3 gap-3 sm:gap-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className={`flex flex-col gap-1 ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-1.5 sm:gap-2 transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''} text-neutral-500`}>
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">{t('المدة', 'Duration')}</span>
                </div>
                <span className="text-sm font-semibold transition-colors text-neutral-900">{duration}</span>
              </div>
              
              <div className={`flex flex-col gap-1 ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-1.5 sm:gap-2 transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''} text-neutral-500`}>
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">{t('دورات', 'Courses')}</span>
                </div>
                <span className="text-sm font-semibold transition-colors text-neutral-900">{path.totalCourses}</span>
              </div>
              
              <div className={`flex flex-col gap-1 ${dir === 'rtl' ? 'items-end' : 'items-start'}`}>
                <div className={`flex items-center gap-1.5 sm:gap-2 transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''} text-neutral-500`}>
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">{t('طالب', 'Students')}</span>
                </div>
                <span className="text-sm font-semibold transition-colors text-neutral-900">{students}</span>
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className={`flex items-center gap-2 mb-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Award className="w-4 h-4 transition-colors text-primary flex-shrink-0" />
                <span className={`text-sm font-medium transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'} text-neutral-700`}>
                  {t('ما ستتعلمه:', 'What you\'ll learn:')}
                </span>
              </div>
              <div className="space-y-2">
                {(language === 'ar' ? path.skillsAr : path.skills).slice(0, 3).map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-start gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                  >
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 transition-colors text-accent" />
                    <span className={`text-sm transition-colors ${dir === 'rtl' ? 'text-right' : 'text-left'} text-neutral-600 leading-relaxed`}>
                      <TextWithTooltips text={skill} />
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              className={`w-full bg-gradient-to-r ${path.color} text-white hover:shadow-md hover:shadow-primary/20 transition-all font-semibold hover:opacity-90 active:scale-[0.98] duration-200 rounded-lg`}
              onClick={handleButtonClick}
              type="button"
            >
              <span className={`flex items-center justify-center gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                {isEnrolled 
                  ? t('الذهاب إلى الدورة', 'Go to Course')
                  : t('عرض التفاصيل', 'View Details')
                }
                <motion.div
                  animate={{ x: isHovered ? (dir === 'rtl' ? -3 : 3) : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isEnrolled ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <ArrowIcon className="w-4 h-4" />
                  )}
                </motion.div>
              </span>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
