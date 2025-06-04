import React from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const [count, setCount] = React.useState(0);
  const countRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true });
  
  React.useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const step = end / (duration / 16); // 16ms is roughly 60fps
    
    const timer = setInterval(() => {
      start += step;
      setCount(Math.floor(start));
      
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [end, duration, isInView]);
  
  return (
    <div ref={countRef} className={`font-bold ${className}`}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
};

export default Counter;