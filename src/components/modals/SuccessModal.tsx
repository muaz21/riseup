import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useLanguage } from '../LanguageProvider';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRedirect?: () => void;
  redirectDelay?: number;
  customMessage?: {
    titleAr: string;
    titleEn: string;
    messageAr: string;
    messageEn: string;
  };
}

export function SuccessModal({
  open,
  onOpenChange,
  onRedirect,
  redirectDelay = 3000,
  customMessage,
}: SuccessModalProps) {
  const { t, dir, language } = useLanguage();
  const [countdown, setCountdown] = useState(Math.ceil(redirectDelay / 1000));
  
  const title = customMessage 
    ? (language === 'ar' ? customMessage.titleAr : customMessage.titleEn)
    : t('تم التسجيل بنجاح!', 'Enrollment Successful!');
  
  const message = customMessage
    ? (language === 'ar' ? customMessage.messageAr : customMessage.messageEn)
    : t(
        'سيتم توجيهك إلى منصة Moodle خلال ثوانٍ...',
        'You will be redirected to Moodle platform in a few seconds...'
      );

  useEffect(() => {
    if (!open) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onRedirect) {
            onRedirect();
          }
          onOpenChange(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open, onRedirect, onOpenChange]);

  useEffect(() => {
    if (open) {
      setCountdown(Math.ceil(redirectDelay / 1000));
    }
  }, [open, redirectDelay]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir={dir}>
        <DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                }}
                className="absolute inset-0 rounded-full bg-green-400/30"
              />
            </motion.div>
          </div>
          <DialogTitle className={`text-center text-2xl font-bold mt-4 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {title}
          </DialogTitle>
          <DialogDescription className={`text-center mt-2 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
            {message}
          </DialogDescription>
        </DialogHeader>

        {redirectDelay > 0 && (
          <div className="py-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <span className="text-2xl font-bold text-primary">{countdown}</span>
            </div>
            <p className="mt-4 text-sm text-neutral-600">
              {t(
                'جاري التوجيه إلى منصة التعلم...',
                'Redirecting to learning platform...'
              )}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

