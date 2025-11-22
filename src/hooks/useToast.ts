import { toast } from 'sonner';
import { useLanguage } from '../components/LanguageProvider';

export function useToast() {
  const { t } = useLanguage();

  const showSuccess = (messageAr: string, messageEn: string) => {
    toast.success(t(messageAr, messageEn), {
      duration: 3000,
      position: 'top-center',
    });
  };

  const showError = (messageAr: string, messageEn: string) => {
    toast.error(t(messageAr, messageEn), {
      duration: 4000,
      position: 'top-center',
    });
  };

  const showInfo = (messageAr: string, messageEn: string) => {
    toast.info(t(messageAr, messageEn), {
      duration: 3000,
      position: 'top-center',
    });
  };

  return { showSuccess, showError, showInfo };
}

