import React from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { useLanguage } from './LanguageProvider';
import { Info } from 'lucide-react';

interface TechnicalTermTooltipProps {
  term: string;
  explanationAr: string;
  explanationEn: string;
  className?: string;
}

// Dictionary of common technical terms with explanations
export const TECHNICAL_TERMS: Record<string, { ar: string; en: string }> = {
  'API': {
    ar: 'واجهة برمجة التطبيقات - تسمح للتطبيقات بالتواصل مع بعضها البعض',
    en: 'Application Programming Interface - allows applications to communicate with each other'
  },
  'Backend': {
    ar: 'الجزء الخلفي من التطبيق الذي يعمل على الخادم',
    en: 'The server-side part of an application'
  },
  'Frontend': {
    ar: 'الجزء الأمامي من التطبيق الذي يتفاعل معه المستخدم',
    en: 'The client-side part of an application that users interact with'
  },
  'Database': {
    ar: 'قاعدة بيانات - نظام لتخزين وإدارة البيانات',
    en: 'A system for storing and managing data'
  },
  'React': {
    ar: 'مكتبة JavaScript لبناء واجهات المستخدم التفاعلية',
    en: 'A JavaScript library for building interactive user interfaces'
  },
  'Node.js': {
    ar: 'بيئة تشغيل JavaScript على الخادم',
    en: 'A JavaScript runtime environment for servers'
  },
  'JavaScript': {
    ar: 'لغة برمجة تستخدم لإنشاء صفحات ويب تفاعلية',
    en: 'A programming language used to create interactive web pages'
  },
  'Python': {
    ar: 'لغة برمجة عالية المستوى سهلة التعلم ومتعددة الاستخدامات',
    en: 'A high-level, easy-to-learn programming language with many uses'
  },
  'HTML': {
    ar: 'لغة ترميز لإنشاء هيكل صفحات الويب',
    en: 'Markup language for creating web page structure'
  },
  'CSS': {
    ar: 'لغة تصميم لتنسيق وتزيين صفحات الويب',
    en: 'Styling language for formatting and decorating web pages'
  },
  'TypeScript': {
    ar: 'لغة برمجة تضيف أنواع البيانات إلى JavaScript',
    en: 'A programming language that adds data types to JavaScript'
  },
  'Algorithm': {
    ar: 'خوارزمية - مجموعة من الخطوات لحل مشكلة معينة',
    en: 'A set of steps to solve a specific problem'
  },
  'Data Structures': {
    ar: 'هياكل البيانات - طرق تنظيم البيانات في الكمبيوتر',
    en: 'Ways of organizing data in a computer'
  },
  'Machine Learning': {
    ar: 'تعلم الآلة - تقنية تمكن الحواسيب من التعلم من البيانات',
    en: 'Technology that enables computers to learn from data'
  },
  'AI': {
    ar: 'الذكاء الاصطناعي - محاكاة الذكاء البشري بواسطة الآلات',
    en: 'Artificial Intelligence - simulation of human intelligence by machines'
  },
  'Pivot Tables': {
    ar: 'جداول محورية - أداة في Excel لتحليل البيانات بسرعة',
    en: 'Excel tool for quickly analyzing data'
  },
  'Excel': {
    ar: 'برنامج جداول بيانات من Microsoft لتحليل البيانات',
    en: 'Microsoft spreadsheet program for data analysis'
  },
};

export function TechnicalTermTooltip({ 
  term, 
  explanationAr, 
  explanationEn, 
  className = '' 
}: TechnicalTermTooltipProps) {
  const { t, dir } = useLanguage();
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span 
          className={`inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 underline decoration-dotted cursor-help ${className}`}
          style={{ textDecorationColor: 'currentColor' }}
        >
          {term}
          <Info className="w-3 h-3" />
        </span>
      </TooltipTrigger>
      <TooltipContent 
        side={dir === 'rtl' ? 'left' : 'right'}
        className="max-w-xs bg-slate-900 text-white border-slate-700"
      >
        <p className="text-sm leading-relaxed">
          {t(explanationAr, explanationEn)}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

// Component to render text with automatic technical term tooltips
interface TextWithTooltipsProps {
  text: string;
  className?: string;
}

export function TextWithTooltips({ text, className = '' }: TextWithTooltipsProps) {
  const { language } = useLanguage();
  
  // Create a regex pattern to match technical terms (case-insensitive)
  const termPatterns = Object.keys(TECHNICAL_TERMS).map(term => {
    // Escape special regex characters
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'gi');
  });
  
  // Split text and wrap technical terms
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;
  
  // Find all matches
  const matches: Array<{ term: string; index: number; length: number }> = [];
  
  termPatterns.forEach((pattern, idx) => {
    const term = Object.keys(TECHNICAL_TERMS)[idx];
    let match;
    while ((match = pattern.exec(text)) !== null) {
      matches.push({
        term,
        index: match.index,
        length: match[0].length
      });
    }
  });
  
  // Sort matches by index
  matches.sort((a, b) => a.index - b.index);
  
  // Remove overlapping matches (keep first occurrence)
  const nonOverlapping: typeof matches = [];
  let lastEnd = 0;
  for (const match of matches) {
    if (match.index >= lastEnd) {
      nonOverlapping.push(match);
      lastEnd = match.index + match.length;
    }
  }
  
  // Build parts array
  nonOverlapping.forEach((match) => {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(
        <span key={`text-${key++}`}>
          {text.substring(lastIndex, match.index)}
        </span>
      );
    }
    
    // Add tooltip for technical term
    const termInfo = TECHNICAL_TERMS[match.term];
    if (termInfo) {
      parts.push(
        <TechnicalTermTooltip
          key={`tooltip-${key++}`}
          term={match.term}
          explanationAr={termInfo.ar}
          explanationEn={termInfo.en}
        />
      );
    } else {
      parts.push(
        <span key={`term-${key++}`}>{match.term}</span>
      );
    }
    
    lastIndex = match.index + match.length;
  });
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(
      <span key={`text-${key++}`}>
        {text.substring(lastIndex)}
      </span>
    );
  }
  
  return <span className={className}>{parts.length > 0 ? parts : text}</span>;
}

