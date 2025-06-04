import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import CaseCard, { CaseProps } from './case-card';

// Mock data for featured cases (would come from CMS in a real app)
const featuredCases: CaseProps[] = [
  {
    id: '1',
    slug: 'sulu-style-ecommerce',
    title: 'Sulu Style E-commerce',
    description: 'Интернет-магазин одежды с интерактивным подбором стиля и виртуальной примеркой.',
    imageUrl: 'https://img.heroui.chat/image/fashion?w=800&h=600&u=1',
    categories: ['E-commerce', 'Web', 'UX/UI']
  },
  {
    id: '2',
    slug: 'bistro-booking-app',
    title: 'Bistro Booking App',
    description: 'Мобильное приложение для быстрого бронирования столиков в ресторанах.',
    imageUrl: 'https://img.heroui.chat/image/food?w=800&h=600&u=2',
    categories: ['Mobile', 'UX/UI', 'Branding']
  },
  {
    id: '3',
    slug: 'neobank-dashboard',
    title: 'NeoBank Dashboard',
    description: 'Интерактивная панель управления для клиентов цифрового банка.',
    imageUrl: 'https://img.heroui.chat/image/dashboard?w=800&h=600&u=3',
    categories: ['Dashboard', 'Web', 'Analytics']
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const FeaturedCases: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Избранные кейсы</h2>
            <p className="mt-4 text-lg text-foreground-600 max-w-2xl">
              Познакомьтесь с нашими последними проектами и узнайте,
              как мы решаем бизнес-задачи с помощью технологий.
            </p>
          </div>
          
          <Button 
            as={Link}
            to="/cases"
            variant="flat"
            endContent={<Icon icon="lucide:arrow-right" />}
            className="mt-4 md:mt-0"
          >
            Все кейсы
          </Button>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredCases.map((caseItem) => (
            <motion.div key={caseItem.id} variants={item}>
              <CaseCard caseItem={caseItem} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCases;