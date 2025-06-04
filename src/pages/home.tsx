import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/hero-section';
import ServicesSlider from '../components/services-slider';
import FeaturedCases from '../components/featured-cases';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <ServicesSlider />
      <FeaturedCases />
      
      {/* Call to action section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Готовы обсудить ваш проект?
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-lg opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Свяжитесь с нами, чтобы обсудить ваши идеи и получить консультацию по реализации проекта.
          </motion.p>
          
          <motion.div 
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              as={Link}
              to="/about"
              size="lg"
              color="default"
              variant="solid"
              className="bg-white text-primary hover:bg-white/90"
              endContent={<Icon icon="lucide:arrow-right" />}
            >
              Узнать больше о нас
            </Button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;