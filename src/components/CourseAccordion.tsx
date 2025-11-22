import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { Course } from '../services/pathsApi';
import { ChevronDown, ChevronUp, Clock, Play, CheckCircle2, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './ui/utils';

interface CourseAccordionProps {
  course: Course;
  courseNumber: number;
  isOpen: boolean;
  onToggle: () => void;
  onViewCourse?: () => void;
}

export function CourseAccordion({
  course,
  courseNumber,
  isOpen,
  onToggle,
  onViewCourse,
}: CourseAccordionProps) {
  const { language, t, dir } = useLanguage();
  const [showAllLessons, setShowAllLessons] = useState(false);
  const maxLessonsToShow = 5;

  const displayedLessons = showAllLessons
    ? course.lessons
    : course.lessons.slice(0, maxLessonsToShow);
  const remainingLessons = course.lessons.length - maxLessonsToShow;

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      {/* Header - Always Visible */}
      <button
        onClick={onToggle}
        className={cn(
          'w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50 transition-colors',
          dir === 'rtl' ? 'flex-row-reverse' : ''
        )}
      >
        <div className={cn('flex items-center gap-3 flex-1', dir === 'rtl' ? 'flex-row-reverse' : '')}>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm ${dir === 'rtl' ? 'order-2' : ''}`}>
            {courseNumber}
          </div>
          <div className={cn('flex-1', dir === 'rtl' ? 'text-right' : 'text-left')}>
            <h3 className={cn('font-semibold text-lg text-neutral-900 mb-1', dir === 'rtl' ? 'text-right' : 'text-left')}>
              {language === 'ar' ? course.titleAr : course.titleEn}
              {course.courseId && (
                <span className={cn('text-xs text-accent font-normal', dir === 'rtl' ? 'mr-2 ml-0' : 'ml-2')}>
                  {t('(كورس منفصل)', '(Separate Course)')}
                </span>
              )}
            </h3>
            <div className={cn('flex items-center gap-4 text-sm', dir === 'rtl' ? 'flex-row-reverse' : '')}>
              <span className={cn('flex items-center gap-1 font-semibold text-primary', dir === 'rtl' ? 'flex-row-reverse' : '')}>
                <Clock className="w-4 h-4 flex-shrink-0" />
                {course.durationHours} {t('ساعة', 'hours')}
              </span>
              <span className={cn('flex items-center gap-1 text-neutral-600', dir === 'rtl' ? 'flex-row-reverse' : '')}>
                <Play className="w-4 h-4 flex-shrink-0" />
                {course.lessonsCount} {t('درس', 'lessons')}
              </span>
              {course.courseId && (
                <span className="text-xs text-accent font-medium">
                  {t('(متوفر في صفحة الدورات)', '(Available in Courses Page)')}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-neutral-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-neutral-500" />
          )}
        </div>
      </button>

      {/* Content - Expandable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 border-t border-neutral-200 space-y-6 bg-neutral-50">
              {/* Overview */}
              <div>
                <h4 className={cn('font-semibold text-neutral-900 mb-2', dir === 'rtl' ? 'text-right' : 'text-left')}>
                  {t('📊 نظرة عامة:', '📊 Overview:')}
                </h4>
                <p className={cn('text-neutral-700 leading-relaxed', dir === 'rtl' ? 'text-right' : 'text-left')}>
                  {language === 'ar' ? course.overviewAr : course.overviewEn}
                </p>
              </div>

              {/* Lessons List */}
              <div>
                <h4 className={cn('font-semibold text-neutral-900 mb-3', dir === 'rtl' ? 'text-right' : 'text-left')}>
                  {t('📹 المحتوى:', '📹 Content:')}
                </h4>
                <div className="space-y-2">
                  {displayedLessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={cn(
                        'flex items-center gap-2 p-2 rounded-md hover:bg-white transition-colors',
                        dir === 'rtl' ? 'flex-row-reverse' : ''
                      )}
                    >
                      <CheckCircle2 className={`w-4 h-4 text-accent flex-shrink-0 ${dir === 'rtl' ? 'order-3' : ''}`} />
                      <span className={cn('text-sm text-neutral-700 flex-1', dir === 'rtl' ? 'text-right' : 'text-left')}>
                        {language === 'ar' ? lesson.titleAr : lesson.titleEn}
                      </span>
                      <span className={cn('text-xs text-neutral-500 flex-shrink-0', dir === 'rtl' ? 'text-right order-2' : 'text-left')}>
                        {lesson.durationMinutes} {t('دقيقة', 'min')}
                      </span>
                    </div>
                  ))}
                  {!showAllLessons && remainingLessons > 0 && (
                    <button
                      onClick={() => setShowAllLessons(true)}
                      className={cn(
                        'text-sm text-primary hover:underline mt-2',
                        dir === 'rtl' ? 'text-right' : 'text-left'
                      )}
                    >
                      {t(`و ${remainingLessons} دروس أخرى`, `and ${remainingLessons} more lessons`)}
                    </button>
                  )}
                </div>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h4 className={cn('font-semibold text-neutral-900 mb-3', dir === 'rtl' ? 'text-right' : 'text-left')}>
                  {t('🎯 ماذا ستتعلم:', '🎯 What you\'ll learn:')}
                </h4>
                <ul className={cn('space-y-2', dir === 'rtl' ? 'text-right' : 'text-left')}>
                  {(language === 'ar' ? course.learningOutcomesAr : course.learningOutcomesEn).map((outcome, index) => (
                    <li key={index} className={cn('flex items-start gap-2', dir === 'rtl' ? 'flex-row-reverse' : '')}>
                      <CheckCircle2 className={`w-4 h-4 text-accent flex-shrink-0 mt-0.5 ${dir === 'rtl' ? 'order-2' : ''}`} />
                      <span className={`text-sm text-neutral-700 leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              {course.projectsAr.length > 0 && (
                <div>
                  <h4 className={cn('font-semibold text-neutral-900 mb-3', dir === 'rtl' ? 'text-right' : 'text-left')}>
                    {t('💼 المشاريع:', '💼 Projects:')}
                  </h4>
                  <ul className={cn('space-y-2', dir === 'rtl' ? 'text-right' : 'text-left')}>
                    {(language === 'ar' ? course.projectsAr : course.projectsEn).map((project, index) => (
                      <li key={index} className={cn('flex items-start gap-2', dir === 'rtl' ? 'flex-row-reverse' : '')}>
                        <Briefcase className={`w-4 h-4 text-primary flex-shrink-0 mt-0.5 ${dir === 'rtl' ? 'order-2' : ''}`} />
                        <span className={`text-sm text-neutral-700 leading-relaxed ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

