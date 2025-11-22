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
import { FileText, CheckCircle2 } from 'lucide-react';

interface RequestEnrollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  path: LearningPath | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function RequestEnrollModal({
  open,
  onOpenChange,
  path,
  onConfirm,
  isLoading = false,
}: RequestEnrollModalProps) {
  const { t, dir, language } = useLanguage();

  if (!path) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir={dir}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              {t('طلب الالتحاق بالمسار', 'Request Enrollment')}
            </DialogTitle>
          </div>
          <DialogDescription className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            {t(
              'هل تريد طلب الالتحاق بهذا المسار؟',
              'Do you want to request enrollment in this learning path?'
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
            </div>

            <div className={`p-4 rounded-lg bg-blue-50 border border-blue-200 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-start gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900 mb-1">
                    {t('معلومات مهمة', 'Important Information')}
                  </p>
                  <p className="text-sm text-blue-700">
                    {t(
                      'سيتم التواصل معك قريباً عبر البريد الإلكتروني أو الهاتف لإكمال التسجيل في منصة Moodle.',
                      'We will contact you soon via email or phone to complete your enrollment on the Moodle platform.'
                    )}
                  </p>
                </div>
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
              ? t('جاري الإرسال...', 'Sending...')
              : t('تأكيد الطلب', 'Confirm Request')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

