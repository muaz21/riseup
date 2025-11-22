import { useState, useEffect } from 'react';
import React from 'react';
import { LanguageProvider } from './components/LanguageProvider';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Toaster } from './components/ui/sonner';
import { HomePage } from './components/pages/HomePage';
import { FeaturesPage } from './components/pages/FeaturesPage';
import { CategoriesPage } from './components/pages/CategoriesPage';
import { PathsPage } from './components/pages/PathsPage';
import { PathDetailsPage } from './components/pages/PathDetailsPage';
import { MyPathsPage } from './components/pages/MyPathsPage';
import { TeachPage } from './components/pages/TeachPage';
import { BlogPage } from './components/pages/BlogPage';
import { CoursePage } from './components/pages/CoursePage';
import { CoursesPage } from './components/pages/CoursesPage';
import { AboutPage } from './components/pages/AboutPage';
import { FAQPage } from './components/pages/FAQPage';
import { BreadcrumbsDemoPage } from './components/pages/BreadcrumbsDemoPage';
import { CarouselDemoPage } from './components/pages/CarouselDemoPage';

// Mapping of URLs to page keys
const pageToUrl: Record<string, string> = {
  home: '/',
  features: '/features',
  categories: '/categories',
  courses: '/courses',
  'courses/english': '/courses/english',
  'courses/programming': '/courses/programming',
  'courses/excel': '/courses/excel',
  'courses/python': '/courses/python',
  'courses/office': '/courses/office',
  paths: '/paths',
  'paths/:id': '/paths/:id',
  'my-paths': '/my-paths',
  teach: '/teach',
  blog: '/blog',
  course: '/course',
  about: '/about',
  faq: '/faq',
  breadcrumbs: '/breadcrumbs',
  carousel: '/carousel',
};

const urlToPage: Record<string, string> = Object.fromEntries(
  Object.entries(pageToUrl).map(([page, url]) => [url, page])
);

export default function App() {
  // Get initial page from URL or default to 'home'
  const getInitialPage = () => {
    const path = window.location.pathname;
    
    // Check for exact match first
    if (urlToPage[path]) {
      return urlToPage[path];
    }
    
    // Check for category routes (e.g., /courses/english)
    const categoryMatch = path.match(/^\/courses\/([a-z]+)$/);
    if (categoryMatch) {
      const categoryKey = categoryMatch[1];
      return `courses/${categoryKey}`;
    }
    
    // Check for path details routes (e.g., /paths/1)
    const pathDetailsMatch = path.match(/^\/paths\/(\d+)$/);
    if (pathDetailsMatch) {
      const pathId = pathDetailsMatch[1];
      return `paths/${pathId}`;
    }
    
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sync navigation with browser history
  const handleNavigate = (page: string) => {
    // Extract search query if present (format: "courses?search=query")
    let searchQuery: string | null = null;
    let actualPage = page;
    
    if (page.includes('?search=')) {
      const [pagePart, queryPart] = page.split('?search=');
      actualPage = pagePart;
      searchQuery = decodeURIComponent(queryPart);
    }
    
    setCurrentPage(actualPage);
    
    // Scroll to top when navigating to a new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Extract category if it's a category route
    let category: string | null = null;
    if (actualPage.startsWith('courses/')) {
      category = actualPage.replace('courses/', '');
      setSelectedCategory(category);
    } else if (actualPage === 'courses') {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(null);
    }
    
    let url = pageToUrl[actualPage];
    if (!url) {
      if (actualPage.startsWith('courses/')) {
        url = `/${actualPage}`;
      } else if (actualPage.startsWith('paths/')) {
        url = `/${actualPage}`;
      } else {
        url = '/';
      }
    }
    if (searchQuery) {
      url += `?search=${encodeURIComponent(searchQuery)}`;
    }
    window.history.pushState({ page: actualPage, category, searchQuery }, '', url);
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const url = window.location.pathname;
      
      // Scroll to top when using browser back/forward
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Check for exact match first
      let page = urlToPage[url];
      
      // Check for category routes
      if (!page) {
        const categoryMatch = url.match(/^\/courses\/([a-z]+)$/);
        if (categoryMatch) {
          const categoryKey = categoryMatch[1];
          page = `courses/${categoryKey}`;
          setSelectedCategory(categoryKey);
        } else if (url === '/courses') {
          page = 'courses';
          setSelectedCategory(null);
        } else {
          // Check for path details routes
          const pathDetailsMatch = url.match(/^\/paths\/(\d+)$/);
          if (pathDetailsMatch) {
            const pathId = pathDetailsMatch[1];
            page = `paths/${pathId}`;
        } else {
          page = 'home';
          }
          setSelectedCategory(null);
        }
      } else {
        if (page.startsWith('courses/')) {
          setSelectedCategory(page.replace('courses/', ''));
        } else if (page === 'courses') {
          setSelectedCategory(null);
        } else {
          setSelectedCategory(null);
        }
      }
      
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update URL when component mounts
  useEffect(() => {
    let url = pageToUrl[currentPage];
    if (!url) {
      if (currentPage.startsWith('courses/')) {
        url = `/${currentPage}`;
      } else if (currentPage.startsWith('paths/')) {
        url = `/${currentPage}`;
      } else {
      url = '/';
      }
    }
    if (window.location.pathname !== url) {
      const category = currentPage.startsWith('courses/') ? currentPage.replace('courses/', '') : null;
      window.history.replaceState({ page: currentPage, category }, '', url);
    }
  }, [currentPage]);

  const renderPage = () => {
    // Extract category from currentPage if it's a category route
    let category: string | undefined = undefined;
    if (currentPage.startsWith('courses/')) {
      category = currentPage.replace('courses/', '');
    }
    
    // Extract search query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || undefined;
    
    // Check if it's a path details page
    if (currentPage.startsWith('paths/')) {
      const pathIdMatch = currentPage.match(/^paths\/(\d+)$/);
      if (pathIdMatch) {
        const pathId = parseInt(pathIdMatch[1], 10);
        return <PathDetailsPage onNavigate={handleNavigate} pathId={pathId} />;
      }
    }
    
    switch (currentPage.split('/')[0]) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'features':
        return <FeaturesPage onNavigate={handleNavigate} />;
      case 'categories':
        return <CategoriesPage onNavigate={handleNavigate} />;
      case 'courses':
        return <CoursesPage onNavigate={handleNavigate} category={category} initialSearchQuery={searchQuery} />;
      case 'paths':
        return <PathsPage onNavigate={handleNavigate} />;
      case 'my-paths':
        return <MyPathsPage onNavigate={handleNavigate} />;
      case 'teach':
        return <TeachPage onNavigate={handleNavigate} />;
      case 'blog':
        return <BlogPage onNavigate={handleNavigate} />;
      case 'course':
        return <CoursePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'breadcrumbs':
        return <BreadcrumbsDemoPage />;
      case 'carousel':
        return <CarouselDemoPage />;
    }
    
    return <HomePage onNavigate={handleNavigate} />;
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent 
          onNavigate={handleNavigate} 
          currentPage={currentPage} 
          renderPage={renderPage}
        />
      </AuthProvider>
    </LanguageProvider>
  );
}

function AppContent({ 
  onNavigate, 
  currentPage, 
  renderPage 
}: { 
  onNavigate: (page: string) => void; 
  currentPage: string; 
  renderPage: () => React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col w-full max-w-full overflow-x-hidden bg-slate-50">
      <Header onNavigate={onNavigate} currentPage={currentPage} />
      <main 
        className="flex-1 w-full max-w-full overflow-x-hidden bg-slate-50 pt-[60px] md:pt-[84px]"
      >
        {renderPage()}
      </main>
      <Footer onNavigate={onNavigate} />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
