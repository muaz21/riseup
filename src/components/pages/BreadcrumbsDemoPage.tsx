import { BreadcrumbsWithIcon } from '../MaterialBreadcrumbs';
import { BilingualBreadcrumbs } from '../BilingualBreadcrumbs';
import { SimpleBreadcrumbs } from '../SimpleBreadcrumbs';

export function BreadcrumbsDemoPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Breadcrumbs Demo</h1>
      
      {/* Recommended: Simple Breadcrumbs */}
      <div className="mb-8 p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-blue-50">
        <h2 className="text-xl font-semibold mb-4 text-primary">✨ Recommended: Simple Bilingual Breadcrumbs</h2>
        <p className="text-sm text-neutral-600 mb-4">Works perfectly with your existing setup - no extra dependencies!</p>
        <SimpleBreadcrumbs 
          items={[
            { labelAr: 'الرئيسية', labelEn: 'Home', href: '#', onClick: () => console.log('Home clicked') },
            { labelAr: 'الدورات', labelEn: 'Courses', href: '#', onClick: () => console.log('Courses clicked') },
            { labelAr: 'البرمجة', labelEn: 'Programming', href: '#', onClick: () => console.log('Programming clicked') },
            { labelAr: 'React JS', labelEn: 'React JS' }
          ]}
        />
      </div>

      {/* Material Tailwind Breadcrumbs */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Material Tailwind Breadcrumbs (Default)</h2>
        <BreadcrumbsWithIcon />
      </div>
      
      {/* Bilingual Breadcrumbs */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Material Tailwind Bilingual Breadcrumbs</h2>
        <BilingualBreadcrumbs 
          items={[
            { labelAr: 'الرئيسية', labelEn: 'Home', href: '#' },
            { labelAr: 'الدورات', labelEn: 'Courses', href: '#' },
            { labelAr: 'البرمجة', labelEn: 'Programming', href: '#' },
            { labelAr: 'React JS', labelEn: 'React JS' }
          ]}
        />
      </div>

      {/* More Examples */}
      <div className="space-y-8">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Example Path 1: Learning Path</h2>
          <SimpleBreadcrumbs 
            items={[
              { labelAr: 'الرئيسية', labelEn: 'Home' },
              { labelAr: 'المسارات', labelEn: 'Paths' },
              { labelAr: 'مسار تطوير الويب', labelEn: 'Web Development Path' }
            ]}
          />
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Example Path 2: Blog Navigation</h2>
          <SimpleBreadcrumbs 
            items={[
              { labelAr: 'الرئيسية', labelEn: 'Home' },
              { labelAr: 'المدونة', labelEn: 'Blog' },
              { labelAr: 'التصميم', labelEn: 'Design' },
              { labelAr: 'أفضل ممارسات UI/UX', labelEn: 'UI/UX Best Practices' }
            ]}
          />
        </div>

        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Example Path 3: Course Details</h2>
          <SimpleBreadcrumbs 
            items={[
              { labelAr: 'الرئيسية', labelEn: 'Home' },
              { labelAr: 'الدورات', labelEn: 'Courses' },
              { labelAr: 'البرمجة', labelEn: 'Programming' },
              { labelAr: 'JavaScript', labelEn: 'JavaScript' },
              { labelAr: 'دورة JavaScript الشاملة', labelEn: 'Complete JavaScript Course' }
            ]}
          />
        </div>
      </div>
    </div>
  );
}

