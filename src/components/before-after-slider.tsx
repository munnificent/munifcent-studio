import React from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'До',
  afterLabel = 'После'
}) => {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const position = (x / rect.width) * 100;
      
      // Constrain position between 0 and 100
      setSliderPosition(Math.max(0, Math.min(100, position)));
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging.current && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const position = (x / rect.width) * 100;
      
      // Constrain position between 0 and 100
      setSliderPosition(Math.max(0, Math.min(100, position)));
    }
  };
  
  const handleTouchEnd = () => {
    isDragging.current = false;
  };
  
  React.useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={sliderRef}
      className="before-after-slider rounded-lg overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{ '--slider-position': `${sliderPosition}%` } as React.CSSProperties}
    >
      <img 
        src={afterImage} 
        alt="После" 
        className="after-image"
      />
      <img 
        src={beforeImage} 
        alt="До" 
        className="before-image"
      />
      
      <div 
        className="slider-handle"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center justify-center gap-2 absolute top-4 w-max px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium -translate-x-1/2 shadow-md">
          <span className="text-blue-600">{beforeLabel}</span>
          <span>/</span>
          <span className="text-green-600">{afterLabel}</span>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium">
        {beforeLabel}
      </div>
      
      <div className="absolute bottom-4 right-4 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium">
        {afterLabel}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;