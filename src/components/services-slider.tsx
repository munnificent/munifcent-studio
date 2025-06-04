import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

// Mock service data (would come from CMS in a real app)
const services = [
  {
    id: 1,
    title: 'Веб-дизайн',
    description: 'Создаем потрясающие визуальные решения, которые выделят ваш бренд среди конкурентов.',
    icon: 'lucide:palette',
    color: 'bg-pink-500',
    slug: 'design',
    features: [
      'UI/UX дизайн сайтов и приложений',
      'Брендинг и айдентика',
      'Прототипирование и анимация',
      'Дизайн-системы и компоненты'
    ]
  },
  {
    id: 2,
    title: 'Веб-разработка',
    description: 'Превращаем дизайн в код с использованием современных технологий для максимальной производительности.',
    icon: 'lucide:code',
    color: 'bg-blue-500',
    slug: 'web-development',
    features: [
      'Front-end разработка (React, Vue, Angular)',
      'Back-end разработка (Node.js, PHP, Python)',
      'E-commerce решения',
      'Оптимизация и масштабирование'
    ]
  },
  {
    id: 3,
    title: 'Telegram-боты',
    description: 'Разрабатываем умных ботов для автоматизации бизнес-процессов и улучшения опыта клиентов.',
    icon: 'lucide:message-circle',
    color: 'bg-green-500',
    slug: 'telegram-bots',
    features: [
      'Чат-боты для поддержки клиентов',
      'Интеграция с CRM и платежными системами',
      'Боты для автоматизации маркетинга',
      'Аналитика и отчетность'
    ]
  }
];

const ServicesSlider: React.FC = () => {
  const [activeService, setActiveService] = React.useState(0);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  
  // Improved touch handling for mobile devices
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  
  // Reset touch state when changing slides
  React.useEffect(() => {
    setTouchStart(null);
    setTouchEnd(null);
  }, [activeService]);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || touchEnd === null) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe left - go to next
        nextService();
      } else {
        // Swipe right - go to previous
        prevService();
      }
    }
    
    // Reset touch state
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  const nextService = () => {
    setActiveService((prev) => (prev + 1) % services.length);
  };
  
  const prevService = () => {
    setActiveService((prev) => (prev - 1 + services.length) % services.length);
  };
  
  // Ensure smooth transition when changing slides
  React.useEffect(() => {
    if (sliderRef.current) {
      // Apply transform with smooth transition
      sliderRef.current.style.transition = 'transform 0.5s ease-out';
      sliderRef.current.style.transform = `translateX(-${activeService * 100}%)`;
    }
  }, [activeService]);

  return (
    <section id="services" className="py-20 bg-content2/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Наши услуги</h2>
          <p className="mt-4 text-lg text-foreground-600 max-w-2xl mx-auto">
            Полный спектр услуг для создания успешных цифровых продуктов,
            от концепции до запуска и поддержки.
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex w-full"
            style={{ width: `${services.length * 100}%` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {services.map((service) => (
              <div 
                key={service.id} 
                className="w-full px-4" 
                style={{ flex: `0 0 ${100 / services.length}%` }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden">
                    <CardBody className="p-0">
                      <div className="grid md:grid-cols-2">
                        {/* Make service icon section responsive */}
                        <div className={`${service.color} p-8 md:p-12 flex items-center justify-center`}>
                          <Icon icon={service.icon} className="text-white text-6xl md:text-9xl" />
                        </div>
                        <div className="p-8 md:p-12 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-foreground-600 mb-6">{service.description}</p>
                            
                            <ul className="space-y-3 mb-8">
                              {service.features.map((feature, index) => (
                                <li key={index} className="flex items-start">
                                  <Icon icon="lucide:check" className="text-primary mt-1 mr-2 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="mt-4">
                            <Button 
                              as={Link}
                              to={`/services/${service.slug}`}
                              color="primary"
                              endContent={<Icon icon="lucide:arrow-right" />}
                            >
                              Подробнее
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              </div>
            ))}
          </div>
          
          {/* Improved mobile swipe indicator */}
          <div className="md:hidden text-center mt-6 text-foreground-500">
            <div className="flex items-center justify-center gap-2">
              <Icon icon="lucide:chevron-left" />
              <p className="text-sm">Проведите для просмотра</p>
              <Icon icon="lucide:chevron-right" />
            </div>
          </div>
          
          {/* Improved navigation indicators */}
          <div className="flex justify-center mt-8 gap-6">
            <Button 
              isIconOnly
              onPress={prevService}
              variant="flat"
              size="lg"
              aria-label="Previous service"
            >
              <Icon icon="lucide:chevron-left" className="text-xl" />
            </Button>
            
            <div className="flex gap-3 items-center">
              {services.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeService === index ? 'bg-primary scale-125' : 'bg-primary/30'
                  }`}
                  onClick={() => setActiveService(index)}
                />
              ))}
            </div>
            
            <Button 
              isIconOnly
              onPress={nextService}
              variant="flat"
              size="lg"
              aria-label="Next service"
            >
              <Icon icon="lucide:chevron-right" className="text-xl" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSlider;