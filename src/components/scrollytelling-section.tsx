import React from 'react';

interface ScrollytellingSectionProps {
  children: React.ReactNode;
}

const ScrollytellingSection: React.FC<ScrollytellingSectionProps> = ({ children }) => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.2 } // Trigger when at least 20% of the element is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div ref={sectionRef} className="scrolly-section my-24">
      {children}
    </div>
  );
};

export default ScrollytellingSection;