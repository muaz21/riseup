import { LucideIcon } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface FeatureCardProps {
  icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
}

export function FeatureCard({
  icon: Icon,
  titleAr,
  titleEn,
  descriptionAr,
  descriptionEn,
}: FeatureCardProps) {
  const { t, dir } = useLanguage();

  return (
    <div 
      className={`group relative p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
      style={{
        backgroundColor: '#FAFBFC',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 86, 210, 0.3)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.08)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)';
      }}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 to-accent/5"></div>
      
      <div className="relative">
        <div 
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)',
            boxShadow: '0 8px 24px rgba(0, 86, 210, 0.25)'
          }}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="mb-3 text-xl font-bold group-hover:text-primary transition-colors" style={{ color: 'var(--neutral-900)' }}>
          {t(titleAr, titleEn)}
        </h3>
        <p className="leading-relaxed transition-colors duration-300" style={{ color: 'var(--neutral-600)' }}>
          {t(descriptionAr, descriptionEn)}
        </p>
      </div>
      
      {/* Bottom Accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        style={{
          background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)'
        }}
      ></div>
    </div>
  );
}
