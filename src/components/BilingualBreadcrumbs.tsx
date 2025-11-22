import { Breadcrumbs } from "@material-tailwind/react";
import { useLanguage } from "./LanguageProvider";

interface BilingualBreadcrumbsProps {
  items: Array<{
    labelAr: string;
    labelEn: string;
    href?: string;
  }>;
}

export function BilingualBreadcrumbs({ items }: BilingualBreadcrumbsProps) {
  const { t, language } = useLanguage();

  return (
    <Breadcrumbs>
      <a href="#" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>
      {items.slice(0, -1).map((item, index) => (
        <a key={index} href={item.href || "#"} className="opacity-60">
          <span>{t(item.labelAr, item.labelEn)}</span>
        </a>
      ))}
      <a href={items[items.length - 1].href || "#"}>
        {t(items[items.length - 1].labelAr, items[items.length - 1].labelEn)}
      </a>
    </Breadcrumbs>
  );
}

