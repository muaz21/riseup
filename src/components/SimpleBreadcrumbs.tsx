import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface BreadcrumbItem {
  labelAr: string;
  labelEn: string;
  href?: string;
  onClick?: () => void;
}

interface SimpleBreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function SimpleBreadcrumbs({ items }: SimpleBreadcrumbsProps) {
  const { t, dir } = useLanguage();
  const isRTL = dir === 'rtl';

  return (
    <nav className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`} aria-label="Breadcrumb">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          if (items[0]?.onClick) items[0].onClick();
        }}
        className="text-neutral-500 hover:text-neutral-700 transition-colors"
      >
        <Home className="w-4 h-4" />
      </a>
      
      {items.map((item, index) => (
        <div key={index} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
          {index === items.length - 1 ? (
            <span className="text-neutral-900 font-medium">{t(item.labelAr, item.labelEn)}</span>
          ) : (
            <a
              href={item.href || '#'}
              onClick={(e) => {
                e.preventDefault();
                if (item.onClick) item.onClick();
              }}
              className="text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              {t(item.labelAr, item.labelEn)}
            </a>
          )}
        </div>
      ))}
    </nav>
  );
}

