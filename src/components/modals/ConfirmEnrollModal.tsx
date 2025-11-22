import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { useLanguage } from '../LanguageProvider';
import { LearningPath } from '../../services/pathsApi';
import { BookOpen, CheckCircle2 } from 'lucide-react';

interface ConfirmEnrollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  path: LearningPath | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ConfirmEnrollModal({
  open,
  onOpenChange,
  path,
  onConfirm,
  isLoading = false,
}: ConfirmEnrollModalProps) {
  const { t, dir, language } = useLanguage();

  if (!path) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir={dir}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              {t('تأكيد التسجيل', 'Confirm Enrollment')}
            </DialogTitle>
          </div>
          <DialogDescription className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            {t(
              'هل تريد التسجيل في هذا المسار؟',
              'Do you want to enroll in this learning path?'
            )}
          </DialogDescription>
        </DialogHeader>

        {path && (
          <div className="py-4 space-y-4">
            <div className={`p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <h3 className="font-semibold text-lg mb-2 text-neutral-900">
                {language === 'ar' ? path.titleAr : path.titleEn}
              </h3>
              <p className="text-sm text-neutral-600 mb-3">
                {language === 'ar' ? path.descriptionAr : path.descriptionEn}
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2 py-1 bg-white/60 rounded-md">
                  {path.durationMonths} {t('أشهر', 'months')}
                </span>
                <span className="px-2 py-1 bg-white/60 rounded-md">
                  {path.totalCourses} {t('دورة', 'courses')}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className={`flex items-center gap-2 text-sm text-neutral-700 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span>{t('وصول فوري إلى جميع الدورات', 'Instant access to all courses')}</span>
              </div>
              <div className={`flex items-center gap-2 text-sm text-neutral-700 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span>{t('شهادة معتمدة عند الإتمام', 'Certified certificate upon completion')}</span>
              </div>
              <div className={`flex items-center gap-2 text-sm text-neutral-700 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span>{t('دعم مستمر من المدربين', 'Ongoing support from instructors')}</span>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className={dir === 'rtl' ? 'sm:flex-row-reverse' : ''}>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className={dir === 'rtl' ? 'order-2' : ''}
          >
            {t('إلغاء', 'Cancel')}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
          >
            {isLoading
              ? t('جاري التسجيل...', 'Enrolling...')
              : t('نعم، ابدأ الآن', 'Yes, Start Now')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

