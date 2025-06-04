import React from 'react';
import { motion } from 'framer-motion';
import Timeline from '../components/timeline';
import TeamGrid from '../components/team-grid';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useContactModalStore } from '../hooks/use-contact-modal-store';
import Counter from '../components/counter';

const AboutPage: React.FC = () => {
  const { open } = useContactModalStore();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="pt-16 pb-20 bg-content1">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">О нас</h1>
            <p className="text-xl mb-8 text-foreground-600 max-w-3xl">
              Munificent Studio — команда креативных профессионалов, создающих 
              цифровые продукты с уникальным дизайном и безупречной реализацией. 
              Мы помогаем брендам выделиться и достичь своих бизнес-целей.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              <div className="text-center p-6 bg-content2 rounded-lg">
                <Counter end={200} suffix="+" className="text-3xl md:text-4xl text-primary mb-2" />
                <span className="text-foreground-600">Проектов</span>
              </div>
              <div className="text-center p-6 bg-content2 rounded-lg">
                <Counter end={30} suffix="+" className="text-3xl md:text-4xl text-primary mb-2" />
                <span className="text-foreground-600">Специалистов</span>
              </div>
              <div className="text-center p-6 bg-content2 rounded-lg">
                <Counter end={6} className="text-3xl md:text-4xl text-primary mb-2" />
                <span className="text-foreground-600">Лет опыта</span>
              </div>
              <div className="text-center p-6 bg-content2 rounded-lg">
                <Counter end={98} suffix="%" className="text-3xl md:text-4xl text-primary mb-2" />
                <span className="text-foreground-600">Довольных клиентов</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Наша история</h2>
            <p className="text-lg text-foreground-600 max-w-3xl">
              Путь непрерывного роста и развития, отмеченный значимыми достижениями и проектами.
            </p>
          </motion.div>
          
          <Timeline />
        </div>
      </section>
      
      <section className="py-20 bg-content1">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Наша команда</h2>
            <p className="text-lg text-foreground-600 max-w-3xl">
              Талантливые профессионалы с многолетним опытом в дизайне и разработке цифровых продуктов.
            </p>
          </motion.div>
          
          <TeamGrid />
        </div>
      </section>
      
      {/* Call to action */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Начните работу с нами</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
              Расскажите о вашем проекте, и мы поможем воплотить его в жизнь с использованием 
              передовых технологий и креативного подхода.
            </p>
            
            <Button 
              size="lg" 
              color="default"
              variant="solid"
              className="bg-white text-primary hover:bg-white/90"
              onPress={open}
              endContent={<Icon icon="lucide:arrow-right" />}
            >
              Связаться с нами
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;