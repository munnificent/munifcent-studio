import React from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const outlineRef = React.useRef<HTMLDivElement>(null);
  
  const onMouseMove = React.useCallback((event: MouseEvent) => {
    const { clientX, clientY } = event;
    
    if (dotRef.current) {
      dotRef.current.style.left = `${clientX}px`;
      dotRef.current.style.top = `${clientY}px`;
    }
    
    if (outlineRef.current) {
      // Adding a slight delay for a trailing effect
      outlineRef.current.animate({
        left: `${clientX}px`,
        top: `${clientY}px`,
      }, { duration: 200, fill: 'forwards' });
    }
  }, []);
  
  const onMouseDown = React.useCallback(() => {
    if (outlineRef.current) {
      outlineRef.current.classList.add('cursor-hover');
    }
  }, []);
  
  const onMouseUp = React.useCallback(() => {
    if (outlineRef.current) {
      outlineRef.current.classList.remove('cursor-hover');
    }
  }, []);
  
  const onMouseOver = React.useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isLink = target.tagName.toLowerCase() === 'a' || 
                  target.tagName.toLowerCase() === 'button' ||
                  target.closest('a') || 
                  target.closest('button');
                  
    if (isLink && outlineRef.current) {
      outlineRef.current.classList.add('cursor-hover');
    }
  }, []);
  
  const onMouseOut = React.useCallback((event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const isLink = target.tagName.toLowerCase() === 'a' || 
                  target.tagName.toLowerCase() === 'button' ||
                  target.closest('a') || 
                  target.closest('button');
                  
    if (isLink && outlineRef.current) {
      outlineRef.current.classList.remove('cursor-hover');
    }
  }, []);
  
  React.useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver as any);
    document.addEventListener('mouseout', onMouseOut as any);
    
    // Hide the default cursor
    document.documentElement.style.cursor = 'none';
    
    // Target all interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseover', () => {
        if (outlineRef.current) {
          outlineRef.current.classList.add('cursor-hover');
        }
      });
      
      el.addEventListener('mouseout', () => {
        if (outlineRef.current) {
          outlineRef.current.classList.remove('cursor-hover');
        }
      });
    });
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver as any);
      document.removeEventListener('mouseout', onMouseOut as any);
      
      // Restore default cursor
      document.documentElement.style.cursor = '';
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseover', () => {});
        el.removeEventListener('mouseout', () => {});
      });
    };
  }, [onMouseMove, onMouseDown, onMouseUp, onMouseOver, onMouseOut]);
  
  // Don't render on touch devices
  if (typeof navigator !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }
  
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
};

export default CustomCursor;