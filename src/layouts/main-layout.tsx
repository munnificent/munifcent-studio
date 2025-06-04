import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbItem } from '@heroui/react';
import Header from '../components/header';
import Footer from '../components/footer';
import ContactModal from '../components/contact-modal';
import { useContactModalStore } from '../hooks/use-contact-modal-store';

// Map routes to readable breadcrumb names
const routeNameMap: Record<string, string> = {
  services: 'Наши услуги',
  cases: 'Кейсы',
  about: 'О нас',
  blog: 'Блог',
  'privacy-policy': 'Политика конфиденциальности',
};

const MainLayout: React.FC = () => {
  const location = useLocation();
  // Use direct store reference instead of destructuring
  const contactModalStore = useContactModalStore();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Don't show breadcrumbs on the home page
  const showBreadcrumbs = location.pathname !== '/';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {showBreadcrumbs && pathSegments.length > 0 && (
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs>
            <BreadcrumbItem key="home" href="/">
              Главная
            </BreadcrumbItem>
            
            {pathSegments.map((segment, index) => {
              const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
              const isLast = index === pathSegments.length - 1;
              
              // If this segment is a dynamic parameter (like a slug), we'll show its raw value
              // In a real app, you'd fetch the actual name from your data source
              const displayName = routeNameMap[segment] || segment;
              
              return (
                <BreadcrumbItem key={path} href={path} isCurrent={isLast}>
                  {displayName}
                </BreadcrumbItem>
              );
            })}
          </Breadcrumbs>
        </div>
      )}
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      
      <ContactModal isOpen={contactModalStore.isOpen} />
    </div>
  );
};

export default MainLayout;