import { useLanguage } from './LanguageProvider';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t } = useLanguage();

  const footerLinks = {
    product: {
      title: t('المنتج', 'Product'),
      links: [
        { label: t('الدورات', 'Courses'), page: 'categories' },
        { label: t('المسارات', 'Paths'), page: 'paths' },
        { label: t('المميزات', 'Features'), page: 'features' },
        { label: t('تطبيق الجوال', 'Mobile Apps'), page: 'home' },
      ],
    },
    company: {
      title: t('الشركة', 'Company'),
      links: [
        { label: t('من نحن', 'About'), page: 'about' },
        { label: t('المدونة', 'Blog'), page: 'blog' },
        { label: t('وظائف', 'Careers'), page: 'careers' },
        { label: t('تواصل معنا', 'Contact'), page: 'contact' },
      ],
    },
    resources: {
      title: t('الموارد', 'Resources'),
      links: [
        { label: t('الأسئلة الشائعة', 'FAQ'), page: 'faq' },
        { label: t('علّم معنا', 'Teach'), page: 'teach' },
        { label: t('شهاداتنا', 'Certificates'), page: 'certificates' },
        { label: t('قصص النجاح', 'Success Stories'), page: 'stories' },
      ],
    },
    legal: {
      title: t('قانوني', 'Legal'),
      links: [
        { label: t('الشروط', 'Terms'), page: 'terms' },
        { label: t('الخصوصية', 'Privacy'), page: 'privacy' },
        { label: t('ملفات تعريف الارتباط', 'Cookies'), page: 'cookies' },
      ],
    },
  };

  const { dir } = useLanguage();

  return (
    <footer 
      className="relative text-white overflow-hidden"
      style={{ backgroundColor: '#0f172a' }}
    >
      {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute top-0 left-0 w-96 h-96 rounded-full filter blur-3xl opacity-10"
          style={{ backgroundColor: '#2563eb' }}
        ></div>
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full filter blur-3xl opacity-10"
          style={{ backgroundColor: '#3b82f6' }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <h3 
              className="text-2xl mb-5 font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #3b82f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('رايز أب', 'RiseUp')}
            </h3>
            <p className="mb-6 leading-relaxed text-slate-300">
              {t(
                'ارتقِ بمهاراتك وحقق طموحاتك مع أفضل الدورات التدريبية',
                'Rise up with the best training courses to achieve your ambitions'
              )}
            </p>
            <div className={`flex gap-2 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Input
                type="email"
                placeholder={t('بريدك الإلكتروني', 'Your email')}
                className={`bg-white/10 border-white/20 text-white placeholder:text-white/70 ${dir === 'rtl' ? 'text-right' : ''}`}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#2563eb';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              />
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-200/50 transition-all"
                style={{
                  boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.2)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(37, 99, 235, 0.4), 0 4px 6px -2px rgba(37, 99, 235, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -2px rgba(37, 99, 235, 0.2)';
                }}
              >
                {t('اشترك', 'Subscribe')}
              </Button>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section, idx) => (
            <div key={idx}>
              <h4 className="mb-5 text-lg text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="inline-block transition-all text-sm text-slate-300 hover:text-white py-2 px-1 min-h-[44px] min-w-[44px]"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = dir === 'rtl' ? 'translateX(-4px)' : 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social & Copyright */}
        <div className={`pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 ${dir === 'rtl' ? 'md:flex-row-reverse' : ''}`}>
          <div className={`flex gap-5 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <a
              href="#"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white min-h-[44px] min-w-[44px]"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white min-h-[44px] min-w-[44px]"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white min-h-[44px] min-w-[44px]"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white min-h-[44px] min-w-[44px]"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white min-h-[44px] min-w-[44px]"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm text-slate-400">
            © 2025 {t('رايز أب', 'RiseUp')}. {t('جميع الحقوق محفوظة', 'All rights reserved')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
