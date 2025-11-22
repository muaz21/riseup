import { useLanguage } from './LanguageProvider';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

export function SearchBar() {
  const { t, dir } = useLanguage();

  return (
    <div className="relative max-w-2xl w-full">
      <Search className={`absolute ${dir === 'rtl' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500`} />
      <Input
        type="search"
        placeholder={t('ابحث عن دورة أو مسار…', 'Search a course or track…')}
        className={`${dir === 'rtl' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-6 text-lg border-neutral-300 focus:border-primary`}
      />
    </div>
  );
}
