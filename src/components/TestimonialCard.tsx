import React from 'react';
import { useLanguage } from './LanguageProvider';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quoteAr: string;
  quoteEn: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  rating: number;
  initials: string;
}

export function TestimonialCard({
  quoteAr,
  quoteEn,
  nameAr,
  nameEn,
  roleAr,
  roleEn,
  rating,
  initials,
}: TestimonialCardProps) {
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
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-primary/5 via-blue-50/50 to-accent/5"></div>
      
      {/* Decorative Quote Mark */}
      <div className={`absolute top-6 text-8xl transition-colors duration-300 ${dir === 'rtl' ? 'right-6' : 'left-6'}`} style={{ color: 'rgba(0, 86, 210, 0.1)' }}>
        "
      </div>
      
      <div className="relative">
        {/* Rating */}
        <div className={`flex gap-1 mb-5 ${dir === 'rtl' ? 'justify-end' : ''}`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 transition-colors duration-300 ${
                i < rating 
                  ? 'fill-amber-400 text-amber-400' 
                  : 'text-neutral-300'
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <p className="mb-8 leading-relaxed text-lg italic transition-colors duration-300" style={{ color: 'var(--neutral-700)' }}>
          {t(quoteAr, quoteEn)}
        </p>

        {/* Author */}
        <div className={`flex items-center gap-4 pt-6 border-t-2 transition-colors ${dir === 'rtl' ? 'flex-row-reverse' : ''} border-neutral-200 group-hover:border-primary/30`}>
          <Avatar className="w-14 h-14 ring-4 transition-all" style={{ ringColor: 'rgba(0, 86, 210, 0.2)' }}>
            <AvatarFallback 
              className="text-white text-lg"
              style={{
                background: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)'
              }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg transition-colors duration-300" style={{ color: 'var(--neutral-900)' }}>
              {t(nameAr, nameEn)}
            </p>
            <p className="transition-colors duration-300" style={{ color: 'var(--neutral-600)' }}>
              {t(roleAr, roleEn)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
