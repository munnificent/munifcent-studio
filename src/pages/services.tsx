import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardBody, Chip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useContactModalStore } from '../hooks/use-contact-modal-store';

// Mock service data (would come from CMS in a real app)
const services = [
  {
    id: 1,
    title: 'Веб-дизайн',
    description: 'Создаем потрясающие визуальные решения, которые выделят ваш бренд среди конкурентов.',
    icon: 'lucide:palette',
    color: 'bg-pink-500',
    slug: 'design',
    shortDescription: 'UI/UX дизайн сайтов и приложений, брендинг, прототипирование и создание дизайн-систем.'
  },
  {
    id: 2,
    title: 'Веб-разработка',
    description: 'Превращаем дизайн в код с использованием современных технологий для максимальной производительности.',
    icon: 'lucide:code',
    color: 'bg-blue-500',
    slug: 'web-development',
    shortDescription: 'Front-end и back-end разработка, e-commerce решения, оптимизация и масштабирование.'
  },
  {
    id: 3,
    title: 'Telegram-боты',
    description: 'Разрабатываем умных ботов для автоматизации бизнес-процессов и улучшения опыта клиентов.',
    icon: 'lucide:message-circle',
    color: 'bg-green-500',
    slug: 'telegram-bots',
    shortDescription: 'Чат-боты для поддержки клиентов, интеграция с CRM и автоматизация бизнес-процессов.'
  },
  {
    id: 4,
    title: 'SEO-оптимизация',
    description: 'Повышаем видимость вашего сайта в поисковых системах и привлекаем целевой трафик.',
    icon: 'lucide:search',
    color: 'bg-yellow-500',
    slug: 'seo-optimization',
    shortDescription: 'Техническая оптимизация, контент-стратегия, анализ конкурентов и повышение конверсии.'
  },
  {
    id: 5,
    title: 'Мобильная разработка',
    description: 'Создаем нативные и кроссплатформенные мобильные приложения для iOS и Android.',
    icon: 'lucide:smartphone',
    color: 'bg-purple-500',
    slug: 'mobile-development',
    shortDescription: 'React Native и Flutter разработка, UX/UI дизайн мобильных интерфейсов, публикация в App Store и Google Play.'
  },
  {
    id: 6,
    title: 'Поддержка и сопровождение',
    description: 'Обеспечиваем стабильную работу ваших цифровых продуктов и помогаем с их развитием.',
    icon: 'lucide:life-buoy',
    color: 'bg-red-500',
    slug: 'maintenance',
    shortDescription: 'Техническая поддержка, мониторинг, обновления безопасности и регулярные улучшения.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ServicesPage: React.FC = () => {
  // Fix: Use zustand store directly to ensure it works across all pages
  const contactModalStore = useContactModalStore();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Наши услуги</h1>
            <p className="text-xl opacity-90">
              Полный спектр решений для вашего бизнеса — от идеи до реализации и поддержки.
              Мы поможем воплотить в жизнь проекты любой сложности.
            </p>
          </div>
        </div>
      </section>
      
      {/* Services grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={item}>
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className={`${service.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon icon={service.icon} className="text-white text-2xl" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-foreground-600 mb-6">{service.shortDescription}</p>
                    
                    <div className="mt-auto">
                      <Button 
                        as={Link}
                        to={`/services/${service.slug}`}
                        color="primary"
                        variant="flat"
                        endContent={<Icon icon="lucide:arrow-right" />}
                        className="w-full"
                      >
                        Подробнее
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 bg-content1">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Не нашли нужную услугу?</h2>
            <p className="text-foreground-600 mb-8">
              Мы предлагаем индивидуальные решения под ваши задачи. Расскажите нам о вашем проекте,
              и мы предложим оптимальный вариант реализации.
            </p>
            <Button 
              size="lg" 
              color="primary"
              onPress={() => contactModalStore.open()} // Use the store directly
              endContent={<Icon icon="lucide:message-square" />}
            >
              Обсудить проект
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;