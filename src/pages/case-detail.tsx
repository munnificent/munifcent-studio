import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollytellingSection from '../components/scrollytelling-section';
import BeforeAfterSlider from '../components/before-after-slider';
import Counter from '../components/counter';
import { Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useContactModalStore } from '../hooks/use-contact-modal-store';

// Mock case study data (would come from CMS in a real app)
const mockCaseStudies = {
  'sulu-style-ecommerce': {
    title: 'Sulu Style E-commerce',
    subtitle: 'Интернет-магазин одежды с интерактивным подбором стиля и виртуальной примеркой',
    heroImage: 'https://img.heroui.chat/image/fashion?w=1200&h=600&u=10',
    overview: 'Sulu Style — это инновационный интернет-магазин одежды, который использует ИИ для подбора стиля и виртуальной примерки. Наша команда разработала полностью кастомизированное решение для e-commerce с множеством интерактивных функций.',
    challenge: 'Клиент столкнулся с высоким процентом возвратов (до 40%) из-за несоответствия размеров и стиля. Необходимо было создать интуитивный интерфейс, который бы помогал пользователям делать правильный выбор и сокращал количество возвратов.',
    solution: 'Мы разработали интерфейс с возможностью виртуальной примерки, персональными рекомендациями по стилю, основанными на AI, и детальными описаниями размеров с визуализациями.',
    technologies: ['React', 'Node.js', 'MongoDB', 'WebGL', 'TensorFlow.js'],
    beforeImage: 'https://img.heroui.chat/image/fashion?w=800&h=600&u=20',
    afterImage: 'https://img.heroui.chat/image/fashion?w=800&h=600&u=21',
    results: [
      { title: 'Снижение возвратов', value: 62, suffix: '%' },
      { title: 'Рост конверсии', value: 34, suffix: '%' },
      { title: 'Увеличение среднего чека', value: 28, suffix: '%' },
      { title: 'Рост времени на сайте', value: 45, suffix: '%' },
    ],
    testimonial: {
      quote: 'Команда Munificent Studio создала для нас e-commerce решение, которое значительно сократило количество возвратов и увеличило конверсию. Виртуальная примерка — настоящий game-changer для нашего бизнеса.',
      author: 'Анна Михайлова',
      position: 'CMO, Sulu Style'
    },
    nextSteps: 'В настоящее время мы работаем над мобильным приложением для Sulu Style с расширенной функциональностью AR для примерки в реальном времени.'
  },
  'bistro-booking-app': {
    title: 'Bistro Booking App',
    subtitle: 'Мобильное приложение для быстрого бронирования столиков в ресторанах',
    heroImage: 'https://img.heroui.chat/image/food?w=1200&h=600&u=15',
    overview: 'Bistro Booking — это приложение, которое позволяет пользователям мгновенно бронировать столики в ресторанах, просматривать меню и оставлять отзывы. Мы создали полноценную экосистему, включающую приложения для клиентов и администрации ресторанов.',
    challenge: 'Рынок был насыщен похожими сервисами, но большинство из них имели сложный процесс бронирования, требующий множество шагов. Клиент хотел создать приложение, где бронирование занимало бы не более 3 кликов.',
    solution: 'Мы разработали интуитивный интерфейс с минимальным количеством шагов для бронирования, системой рекомендаций на основе предпочтений пользователя и интеграцией с календарями.',
    technologies: ['React Native', 'Firebase', 'Node.js', 'Express', 'MongoDB'],
    beforeImage: 'https://img.heroui.chat/image/food?w=800&h=600&u=22',
    afterImage: 'https://img.heroui.chat/image/food?w=800&h=600&u=23',
    results: [
      { title: 'Сокращение шагов бронирования', value: 70, suffix: '%' },
      { title: 'Увеличение количества бронирований', value: 85, suffix: '%' },
      { title: 'Рост аудитории', value: 120, suffix: 'k+' },
      { title: 'Подключенных ресторанов', value: 540, suffix: '+' },
    ],
    testimonial: {
      quote: 'Приложение, созданное Munificent Studio, произвело революцию в нашем бизнесе. Количество бронирований выросло на 85%, а клиенты отмечают удобство и скорость работы с приложением.',
      author: 'Сергей Иванов',
      position: 'CEO, Bistro Booking'
    },
    nextSteps: 'Следующим этапом развития проекта станет внедрение системы лояльности и интеграция с доставкой еды.'
  },
  'neobank-dashboard': {
    title: 'NeoBank Dashboard',
    subtitle: 'Интерактивная панель управления для клиентов цифрового банка',
    heroImage: 'https://img.heroui.chat/image/dashboard?w=1200&h=600&u=30',
    overview: 'NeoBank Dashboard — это современная панель управления для клиентов цифрового банка, которая визуализирует финансовые данные и помогает пользователям принимать обоснованные финансовые решения.',
    challenge: 'Клиенту требовалось создать интуитивно понятный интерфейс для управления финансами, который бы отличался от конкурентов и предоставлял расширенную аналитику в понятной форме.',
    solution: 'Мы разработали дашборд с интерактивными графиками, системой категоризации расходов на основе ML и персональными финансовыми рекомендациями.',
    technologies: ['React', 'D3.js', 'TypeScript', 'Node.js', 'TensorFlow.js'],
    beforeImage: 'https://img.heroui.chat/image/dashboard?w=800&h=600&u=31',
    afterImage: 'https://img.heroui.chat/image/dashboard?w=800&h=600&u=32',
    results: [
      { title: 'Рост активности пользователей', value: 42, suffix: '%' },
      { title: 'Увеличение транзакций', value: 56, suffix: '%' },
      { title: 'Снижение обращений в поддержку', value: 38, suffix: '%' },
      { title: 'Рост позитивных отзывов', value: 78, suffix: '%' },
    ],
    testimonial: {
      quote: 'Дашборд, созданный командой Munificent Studio, полностью преобразил взаимодействие клиентов с нашим банком. Интерфейс настолько интуитивен, что количество обращений в поддержку снизилось на 38%.',
      author: 'Дмитрий Новиков',
      position: 'CTO, NeoBank'
    },
    nextSteps: 'В настоящее время мы работаем над внедрением предиктивной аналитики и расширенных функций планирования бюджета.'
  },
};

const CaseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { open } = useContactModalStore();
  
  // Get case data based on slug
  const caseData = slug ? mockCaseStudies[slug as keyof typeof mockCaseStudies] : null;
  
  // Fallback if case not found
  if (!caseData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Кейс не найден</h1>
        <p className="text-foreground-600 mb-8">К сожалению, запрашиваемый кейс не существует.</p>
        <Button as="a" href="/cases" color="primary" variant="flat">
          Вернуться к списку кейсов
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={caseData.heroImage} 
            alt={caseData.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{caseData.title}</h1>
            <p className="text-xl md:text-2xl opacity-90">{caseData.subtitle}</p>
          </div>
        </div>
      </section>
      
      {/* Overview */}
      <ScrollytellingSection>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Обзор проекта</h2>
            <p className="text-lg text-foreground-600 mb-6">{caseData.overview}</p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {caseData.technologies.map((tech) => (
                <Chip key={tech} color="primary" variant="flat">
                  {tech}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </ScrollytellingSection>
      
      {/* Challenge & Solution */}
      <ScrollytellingSection>
        <div className="bg-content1 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div>
                <h3 className="text-2xl font-bold mb-4">Задача</h3>
                <p className="text-foreground-600">{caseData.challenge}</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Решение</h3>
                <p className="text-foreground-600">{caseData.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollytellingSection>
      
      {/* Before/After */}
      <ScrollytellingSection>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">До / После</h3>
            <BeforeAfterSlider 
              beforeImage={caseData.beforeImage} 
              afterImage={caseData.afterImage} 
            />
          </div>
        </div>
      </ScrollytellingSection>
      
      {/* Results */}
      <ScrollytellingSection>
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-8 text-center">Результаты</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {caseData.results.map((result, index) => (
                <div key={index} className="text-center p-6">
                  <Counter 
                    end={result.value} 
                    suffix={result.suffix} 
                    className="text-3xl md:text-4xl mb-2" 
                  />
                  <span className="text-white/80">{result.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollytellingSection>
      
      {/* Testimonial */}
      <ScrollytellingSection>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Icon icon="lucide:quote" className="text-5xl text-primary mb-6" />
            
            <blockquote className="text-xl md:text-2xl italic mb-6">
              "{caseData.testimonial.quote}"
            </blockquote>
            
            <div className="text-foreground-600">
              <div className="font-semibold">{caseData.testimonial.author}</div>
              <div className="text-sm">{caseData.testimonial.position}</div>
            </div>
          </div>
        </div>
      </ScrollytellingSection>
      
      {/* Next steps and CTA */}
      <ScrollytellingSection>
        <div className="bg-content1 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Дальнейшее развитие</h3>
              <p className="text-foreground-600 mb-8">{caseData.nextSteps}</p>
              
              <div className="border-t border-divider pt-8 mt-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Нужен похожий проект?</h3>
                <p className="text-foreground-600 mb-8">
                  Расскажите нам о своих идеях, и мы поможем воплотить их в жизнь.
                </p>
                
                <Button 
                  size="lg" 
                  color="primary"
                  onPress={open}
                  endContent={<Icon icon="lucide:arrow-right" />}
                >
                  Обсудить проект
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ScrollytellingSection>
    </motion.div>
  );
};

export default CaseDetailPage;