import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

// Mock timeline data (would come from CMS in a real app)
const timelineEvents = [
  {
    id: 1,
    year: 2018,
    title: 'Основание студии',
    description: 'Munificent Studio начала свою работу как небольшая команда из трех дизайнеров и двух разработчиков.',
    icon: 'lucide:flag'
  },
  {
    id: 2,
    year: 2019,
    title: 'Первый крупный клиент',
    description: 'Подписан контракт на редизайн сайта национальной торговой сети с более чем 500 филиалами.',
    icon: 'lucide:briefcase'
  },
  {
    id: 3,
    year: 2020,
    title: 'Расширение команды',
    description: 'Штат компании вырос до 15 человек. Открыто направление Telegram-ботов и мобильной разработки.',
    icon: 'lucide:users'
  },
  {
    id: 4,
    year: 2022,
    title: 'Международные проекты',
    description: 'Начало работы с клиентами из Европы и США. Открытие представительства в Берлине.',
    icon: 'lucide:globe'
  },
  {
    id: 5,
    year: 2024,
    title: 'Сегодня',
    description: 'Munificent Studio — команда из 30+ специалистов, реализовавшая более 200 проектов для компаний со всего мира.',
    icon: 'lucide:rocket'
  }
];

const Timeline: React.FC = () => {
  return (
    <div className="relative pb-12">
      {/* Connecting line */}
      <div className="timeline-connector" />
      
      {/* Timeline events */}
      {timelineEvents.map((event, index) => (
        <motion.div 
          key={event.id}
          className="relative pl-12 mb-12 last:mb-0"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline dot */}
          <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary z-10">
            <Icon icon={event.icon} className="text-white text-lg" />
          </div>
          
          {/* Content */}
          <div className="bg-content1 p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-bold">{event.year}</span>
              <div className="h-[1px] flex-grow bg-primary-200 dark:bg-primary-800"></div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
            <p className="text-foreground-600">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Timeline;