import { useLanguage } from './LanguageProvider';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const { t, dir } = useLanguage();
  
  // رقم الواتساب - يمكن تغييره حسب الحاجة
  const whatsappNumber = '966123456789'; // بدون + أو 00
  const message = t(
    'مرحباً، أريد الاستفسار عن الدورات التدريبية',
    'Hello, I would like to inquire about the courses'
  );
  
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label={t('تواصل عبر واتساب', 'Contact via WhatsApp')}
    >
      {/* Floating Button */}
      <div className="relative">
        {/* Pulsing Ring Animation */}
        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
        
        {/* Main Button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
          <MessageCircle className="w-8 h-8 text-white" fill="white" />
        </div>

        {/* Tooltip - Always on the left side of the button */}
        <div className="absolute top-1/2 -translate-y-1/2 right-full mr-3 whitespace-nowrap bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl">
          {t('تواصل معنا عبر واتساب', 'Contact us on WhatsApp')}
          <div className="absolute top-1/2 -translate-y-1/2 left-full -translate-x-1 w-2 h-2 bg-neutral-900 rotate-45"></div>
        </div>
      </div>
    </a>
  );
}
