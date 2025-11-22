import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useLanguage } from '../LanguageProvider';
import { useAuth } from '../../contexts/AuthContext';
import { LogIn, Mail } from 'lucide-react';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess?: () => void;
}

export function LoginModal({
  open,
  onOpenChange,
  onLoginSuccess,
}: LoginModalProps) {
  const { t, dir } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Simple email validation
      if (!email || !email.includes('@')) {
        setError(t('يرجى إدخال بريد إلكتروني صحيح', 'Please enter a valid email'));
        setIsLoading(false);
        return;
      }

      await login(email);
      setIsLoading(false);
      onOpenChange(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(
        t('حدث خطأ أثناء تسجيل الدخول', 'An error occurred during login')
      );
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setEmail('student@example.com');
    setIsLoading(true);
    try {
      await login('student@example.com');
      setIsLoading(false);
      onOpenChange(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError(
        t('حدث خطأ أثناء تسجيل الدخول', 'An error occurred during login')
      );
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir={dir}>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              {t('تسجيل الدخول', 'Login')}
            </DialogTitle>
          </div>
          <DialogDescription className={dir === 'rtl' ? 'text-right' : 'text-left'}>
            {t(
              'يجب تسجيل الدخول أولاً للمتابعة',
              'You must login first to continue'
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className={dir === 'rtl' ? 'text-right' : 'text-left'}>
              {t('البريد الإلكتروني', 'Email')}
            </Label>
            <div className="relative">
              <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 ${dir === 'rtl' ? 'right-3' : 'left-3'}`} />
              <Input
                id="email"
                type="email"
                placeholder={t('example@email.com', 'example@email.com')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={dir === 'rtl' ? 'pr-10' : 'pl-10'}
                disabled={isLoading}
                required
              />
            </div>
            {error && (
              <p className={`text-sm text-red-500 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent text-white hover:opacity-90"
            >
              {isLoading
                ? t('جاري تسجيل الدخول...', 'Logging in...')
                : t('تسجيل الدخول', 'Login')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleQuickLogin}
              disabled={isLoading}
              className="w-full"
            >
              {t('تسجيل دخول سريع (تجريبي)', 'Quick Login (Demo)')}
            </Button>
          </div>
        </form>

        <DialogFooter className={dir === 'rtl' ? 'sm:flex-row-reverse' : ''}>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className={dir === 'rtl' ? 'order-2' : ''}
          >
            {t('إلغاء', 'Cancel')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

