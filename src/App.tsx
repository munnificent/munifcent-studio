import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/main-layout';
import HomePage from './pages/home';
import ServicesPage from './pages/services';
import ServiceDetailPage from './pages/service-detail';
import CasesPage from './pages/cases';
import CaseDetailPage from './pages/case-detail';
import AboutPage from './pages/about';
import BlogPage from './pages/blog';
import BlogPostPage from './pages/blog-post';
import PrivacyPage from './pages/privacy-policy';
import CustomCursor from './components/custom-cursor';

function App() {
  const location = useLocation();
  
  // Scroll to top when route changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="cases" element={<CasesPage />} />
            <Route path="cases/:slug" element={<CaseDetailPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="privacy-policy" element={<PrivacyPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;