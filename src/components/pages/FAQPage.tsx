import React from 'react';
import { useLanguage } from '../LanguageProvider';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { HelpCircle, BookOpen, CreditCard, Award, Users, Clock, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface FAQPageProps {
  onNavigate?: (page: string) => void;
}

interface FAQItem {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  icon?: React.ReactNode;
  category: string;
}

const FAQ_CATEGORIES = {
  general: { ar: 'عام', en: 'General' },
  courses: { ar: 'الدورات', en: 'Courses' },
  pricing: { ar: 'الأسعار والدفع', en: 'Pricing & Payment' },
  certificates: { ar: 'الشهادات', en: 'Certificates' },
  account: { ar: 'الحساب', en: 'Account' },
  technical: { ar: 'تقني', en: 'Technical' },
};

const FAQ_DATA: FAQItem[] = [
  // General Questions
  {
    questionAr: 'ما هي منصة رايز أب؟',
    questionEn: 'What is RiseUp platform?',
    answerAr: 'رايز أب هي منصة تعليمية إلكترونية تقدم دورات تدريبية عالية الجودة في مختلف المجالات مثل البرمجة، اللغة الإنجليزية، Excel، والمزيد. نساعد المتعلمين على تطوير مهاراتهم وتحقيق أهدافهم المهنية.',
    answerEn: 'RiseUp is an online learning platform that offers high-quality training courses in various fields such as programming, English, Excel, and more. We help learners develop their skills and achieve their professional goals.',
    icon: <HelpCircle className="w-5 h-5" />,
    category: 'general',
  },
  {
    questionAr: 'كيف أبدأ التعلم على المنصة؟',
    questionEn: 'How do I start learning on the platform?',
    answerAr: 'يمكنك البدء بسهولة! قم بإنشاء حساب مجاني، تصفح الدورات المتاحة، واختر الدورة التي تناسبك. يمكنك التسجيل في أي دورة مجاناً أو مدفوعة حسب رغبتك.',
    answerEn: 'You can start easily! Create a free account, browse available courses, and choose the course that suits you. You can enroll in any course, free or paid, as you wish.',
    icon: <BookOpen className="w-5 h-5" />,
    category: 'general',
  },
  {
    questionAr: 'هل المحتوى متاح باللغة العربية؟',
    questionEn: 'Is the content available in Arabic?',
    answerAr: 'نعم! جميع الدورات متاحة باللغتين العربية والإنجليزية. يمكنك التبديل بين اللغات في أي وقت من خلال زر تبديل اللغة في أعلى الصفحة.',
    answerEn: 'Yes! All courses are available in both Arabic and English. You can switch between languages at any time using the language toggle button at the top of the page.',
    icon: <Globe className="w-5 h-5" />,
    category: 'general',
  },
  // Courses Questions
  {
    questionAr: 'كم مدة الدورة التدريبية؟',
    questionEn: 'How long is a training course?',
    answerAr: 'تختلف مدة الدورات حسب المحتوى والمستوى. لدينا دورات تتراوح من بضعة أسابيع إلى عدة أشهر. يمكنك رؤية مدة كل دورة في صفحة تفاصيل الدورة.',
    answerEn: 'Course duration varies depending on content and level. We have courses ranging from a few weeks to several months. You can see the duration of each course on the course details page.',
    icon: <Clock className="w-5 h-5" />,
    category: 'courses',
  },
  {
    questionAr: 'هل يمكنني الوصول إلى المحتوى بعد انتهاء الدورة؟',
    questionEn: 'Can I access the content after the course ends?',
    answerAr: 'نعم، بمجرد التسجيل في دورة، ستحصل على وصول دائم إلى المحتوى. يمكنك مراجعة المواد في أي وقت ومن أي جهاز.',
    answerEn: 'Yes, once you enroll in a course, you will have permanent access to the content. You can review the materials at any time and from any device.',
    icon: <BookOpen className="w-5 h-5" />,
    category: 'courses',
  },
  {
    questionAr: 'ما هي مستويات الدورات المتاحة؟',
    questionEn: 'What course levels are available?',
    answerAr: 'نقدم دورات لجميع المستويات: مبتدئ، متوسط، ومتقدم. يمكنك اختيار المستوى المناسب لك حسب خبرتك الحالية.',
    answerEn: 'We offer courses for all levels: beginner, intermediate, and advanced. You can choose the appropriate level for you based on your current experience.',
    icon: <Users className="w-5 h-5" />,
    category: 'courses',
  },
  // Pricing Questions
  {
    questionAr: 'هل هناك دورات مجانية؟',
    questionEn: 'Are there free courses?',
    answerAr: 'نعم! لدينا مجموعة من الدورات المجانية المتاحة للجميع. يمكنك تصفحها في صفحة الدورات واختيار "مجاني" من الفلاتر.',
    answerEn: 'Yes! We have a collection of free courses available to everyone. You can browse them on the courses page and select "Free" from the filters.',
    icon: <CreditCard className="w-5 h-5" />,
    category: 'pricing',
  },
  {
    questionAr: 'ما هي طرق الدفع المتاحة؟',
    questionEn: 'What payment methods are available?',
    answerAr: 'نقبل جميع طرق الدفع الرئيسية بما في ذلك البطاقات الائتمانية، PayPal، والتحويلات البنكية. جميع المعاملات آمنة ومشفرة.',
    answerEn: 'We accept all major payment methods including credit cards, PayPal, and bank transfers. All transactions are secure and encrypted.',
    icon: <CreditCard className="w-5 h-5" />,
    category: 'pricing',
  },
  {
    questionAr: 'هل يمكنني استرداد المبلغ إذا لم أكن راضياً؟',
    questionEn: 'Can I get a refund if I\'m not satisfied?',
    answerAr: 'نعم، نقدم ضمان استرداد الأموال خلال 30 يوماً من تاريخ الشراء إذا لم تكن راضياً عن الدورة. اتصل بنا وسنساعدك.',
    answerEn: 'Yes, we offer a 30-day money-back guarantee from the date of purchase if you are not satisfied with the course. Contact us and we will help you.',
    icon: <CreditCard className="w-5 h-5" />,
    category: 'pricing',
  },
  // Certificates Questions
  {
    questionAr: 'هل أحصل على شهادة بعد إتمام الدورة؟',
    questionEn: 'Do I get a certificate after completing the course?',
    answerAr: 'نعم! عند إتمام أي دورة، ستحصل على شهادة إتمام معتمدة يمكنك مشاركتها على LinkedIn أو إضافتها إلى سيرتك الذاتية.',
    answerEn: 'Yes! Upon completing any course, you will receive a certified completion certificate that you can share on LinkedIn or add to your resume.',
    icon: <Award className="w-5 h-5" />,
    category: 'certificates',
  },
  {
    questionAr: 'هل الشهادات معتمدة؟',
    questionEn: 'Are the certificates accredited?',
    answerAr: 'نعم، جميع شهاداتنا معتمدة ويمكن التحقق منها. يمكن لأصحاب العمل التحقق من صحة الشهادة من خلال رابط فريد.',
    answerEn: 'Yes, all our certificates are accredited and verifiable. Employers can verify the certificate through a unique link.',
    icon: <Award className="w-5 h-5" />,
    category: 'certificates',
  },
  // Account Questions
  {
    questionAr: 'كيف أقوم بإنشاء حساب؟',
    questionEn: 'How do I create an account?',
    answerAr: 'يمكنك إنشاء حساب بسهولة من خلال النقر على "تسجيل الدخول" في أعلى الصفحة، ثم اختيار "إنشاء حساب جديد". ستحتاج فقط إلى بريدك الإلكتروني وكلمة مرور.',
    answerEn: 'You can easily create an account by clicking "Login" at the top of the page, then selecting "Create new account". You will only need your email and password.',
    icon: <Users className="w-5 h-5" />,
    category: 'account',
  },
  {
    questionAr: 'ماذا أفعل إذا نسيت كلمة المرور؟',
    questionEn: 'What should I do if I forgot my password?',
    answerAr: 'يمكنك إعادة تعيين كلمة المرور من خلال صفحة تسجيل الدخول. انقر على "نسيت كلمة المرور" وأدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين.',
    answerEn: 'You can reset your password from the login page. Click "Forgot password" and enter your email, and we will send you a reset link.',
    icon: <Users className="w-5 h-5" />,
    category: 'account',
  },
  // Technical Questions
  {
    questionAr: 'ما هي متطلبات النظام للوصول إلى الدورات؟',
    questionEn: 'What are the system requirements to access courses?',
    answerAr: 'يمكنك الوصول إلى الدورات من أي جهاز (كمبيوتر، تابلت، أو هاتف ذكي) مع اتصال بالإنترنت. نوصي باستخدام متصفح حديث مثل Chrome أو Firefox.',
    answerEn: 'You can access courses from any device (computer, tablet, or smartphone) with an internet connection. We recommend using a modern browser like Chrome or Firefox.',
    icon: <Globe className="w-5 h-5" />,
    category: 'technical',
  },
  {
    questionAr: 'هل يمكنني تحميل المحتوى للعرض دون اتصال؟',
    questionEn: 'Can I download content for offline viewing?',
    answerAr: 'حالياً، المحتوى متاح فقط عبر الإنترنت. نحن نعمل على إضافة ميزة التحميل للعرض دون اتصال قريباً.',
    answerEn: 'Currently, content is only available online. We are working on adding an offline viewing feature soon.',
    icon: <Globe className="w-5 h-5" />,
    category: 'technical',
  },
];

export function FAQPage({ onNavigate }: FAQPageProps) {
  const { t, dir } = useLanguage();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredFAQs = selectedCategory === 'all' 
    ? FAQ_DATA 
    : FAQ_DATA.filter(faq => faq.category === selectedCategory);

  const categories = [
    { key: 'all', ...FAQ_CATEGORIES.general },
    ...Object.entries(FAQ_CATEGORIES).filter(([key]) => key !== 'general').map(([key, value]) => ({
      key,
      ...value,
    })),
  ];

  const breadcrumbItems = [
    {
      labelAr: 'الأسئلة الشائعة',
      labelEn: 'FAQ',
      onClick: () => onNavigate?.('faq'),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50" dir={dir}>
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <SimpleBreadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <HelpCircle className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-slate-900">
              {t('الأسئلة الشائعة', 'Frequently Asked Questions')}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              {t(
                'ابحث عن إجابات لأسئلتك الشائعة حول منصة رايز أب',
                'Find answers to your frequently asked questions about RiseUp platform'
              )}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-8">
            <div className={`flex flex-wrap gap-2 justify-center ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all min-h-[44px] ${
                    selectedCategory === category.key
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {t(category.ar, category.en)}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow px-6"
                >
                  <AccordionTrigger className={`hover:no-underline ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                    <div className="flex items-start gap-4 w-full">
                      {faq.icon && (
                        <div className="text-blue-600 flex-shrink-0 mt-1">
                          {faq.icon}
                        </div>
                      )}
                      <span className="font-semibold text-slate-900 flex-1">
                        {t(faq.questionAr, faq.questionEn)}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className={`${dir === 'rtl' ? 'text-right' : 'text-left'} pt-2 pb-4`}>
                    <div className="pl-9 sm:pl-0">
                      <p className="text-slate-600 leading-relaxed">
                        {t(faq.answerAr, faq.answerEn)}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl p-8 border border-slate-200"
          >
            <h3 className="text-2xl font-bold mb-3 text-slate-900">
              {t('لم تجد إجابة لسؤالك؟', "Couldn't find an answer to your question?")}
            </h3>
            <p className="text-slate-600 mb-6">
              {t(
                'تواصل معنا وسنكون سعداء لمساعدتك',
                'Contact us and we will be happy to help you'
              )}
            </p>
            <button
              onClick={() => window.open('https://wa.me/1234567890', '_blank')}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-200/50 transition-all hover:scale-105 min-h-[44px]"
            >
              {t('تواصل معنا', 'Contact Us')}
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

