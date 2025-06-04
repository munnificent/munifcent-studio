import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useContactModalStore } from '../hooks/use-contact-modal-store';

// Three.js components
const ParticleField = () => {
  const count = 1000;
  const particlesRef = React.useRef<THREE.Points>(null);
  
  React.useEffect(() => {
    if (!particlesRef.current) return;
    
    const animation = () => {
      if (!particlesRef.current) return;
      
      // Rotate the entire particle system
      particlesRef.current.rotation.y += 0.0005;
      
      requestAnimationFrame(animation);
    };
    
    animation();
    
    return () => {
      cancelAnimationFrame(0); // Just to clean up
    };
  }, []);
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 10)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#0ea5e9" sizeAttenuation transparent />
    </points>
  );
};

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Создаем цифровые продукты, которые влюбляют клиентов",
  subtitle = "Дизайн, веб-разработка и Telegram-боты с вау-эффектом для вашего бизнеса",
  ctaText = "Обсудить проект"
}) => {
  const { open } = useContactModalStore();
  
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Three.js background */}
      <Canvas className="three-canvas">
        <ambientLight intensity={0.5} />
        <ParticleField />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableRotate={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mt-6 text-foreground-600 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>
          
          <motion.div 
            className="mt-10 space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              color="primary"
              variant="shadow"
              onPress={open}
              endContent={<Icon icon="lucide:arrow-right" />}
            >
              {ctaText}
            </Button>
            
            <Button
              size="lg"
              variant="flat"
              as="a"
              href="#services"
              endContent={<Icon icon="lucide:chevron-down" />}
            >
              Услуги
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Icon icon="lucide:mouse" className="text-3xl text-foreground-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;