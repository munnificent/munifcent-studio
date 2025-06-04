import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Accordion, AccordionItem, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useContactModalStore } from '../hooks/use-contact-modal-store';
import ScrollytellingSection from '../components/scrollytelling-section';

// Mock service data (would come from CMS in a real app)
const serviceData = {
  'design': {
    title: 'Веб-дизайн',
    description: 'Создаем потрясающие визуальные решения, которые выделят ваш бренд среди конкурентов.',
    icon: 'lucide:palette',
    color: 'bg-pink-500',
    heroImage: 'https://img.heroui.chat/image/ai?w=1200&h=600&u=design10',
    overview: 'Наша команда опытных дизайнеров создает уникальные визуальные решения, которые отражают индивидуальность вашего бренда и привлекают целевую аудиторию. Мы не просто делаем красивые интерфейсы – мы создаем удобные и эффективные пользовательские пути, которые конвертируют посетителей в клиентов.',
    process: [
      { 
        title: 'Исследование и анализ', 
        description: 'Изучаем рынок, конкурентов и целевую аудиторию, чтобы создать уникальный дизайн, отвечающий бизнес-задачам.' 
      },
      { 
        title: 'Прототипирование', 
        description: 'Создаем интерактивные прототипы, которые позволяют протестировать пользовательские сценарии и внести корректировки на ранних этапах.' 
      },
      { 
        title: 'UI/UX дизайн', 
        description: 'Разрабатываем визуальный стиль и пользовательский интерфейс, соответствующий вашему бренду и удобный для пользователей.' 
      },
      { 
        title: 'Тестирование и итерация', 
        description: 'Проводим пользовательское тестирование и вносим улучшения на основе обратной связи.' 
      }
    ],
    features: [
      'UI/UX дизайн сайтов и приложений',
      'Брендинг и айдентика',
      'Прототипирование и анимация',
      'Дизайн-системы и компоненты',
      'Адаптивный дизайн',
      'Анализ пользовательского опыта'
    ],
    faq: [
      { 
        question: 'Какие материалы нужны для начала работы над дизайном?', 
        answer: 'Для начала работы нам понадобится информация о вашем бренде, целевой аудитории, конкурентах и предпочтениях по стилю. Если у вас есть брендбук или гайдлайны, они также будут полезны.' 
      },
      { 
        question: 'Как долго занимает создание дизайна сайта?', 
        answer: 'Сроки зависят от сложности проекта. В среднем, дизайн небольшого сайта занимает 2-3 недели, более сложные проекты могут занять 1-2 месяца.' 
      },
      { 
        question: 'Получу ли я исходные файлы дизайна?', 
        answer: 'Да, по завершении проекта вы получаете полный доступ ко всем исходным файлам дизайна (Figma, Sketch и др.).' 
      }
    ],
    relatedServices: ['web-development', 'seo-optimization', 'mobile-development']
  },
  'web-development': {
    title: 'Веб-разработка',
    description: 'Превращаем дизайн в код с использованием современных технологий для максимальной производительности.',
    icon: 'lucide:code',
    color: 'bg-blue-500',
    heroImage: 'https://img.heroui.chat/image/ai?w=1200&h=600&u=webdev20',
    overview: 'Наша команда разработчиков создает современные, быстрые и масштабируемые веб-сайты и приложения. Мы используем передовые технологии и следуем лучшим практикам веб-разработки, чтобы обеспечить отличную производительность и удобство использования ваших цифровых продуктов.',
    process: [
      { 
        title: 'Техническое планирование', 
        description: 'Анализируем требования, выбираем оптимальный стек технологий и разрабатываем архитектуру приложения.' 
      },
      { 
        title: 'Front-end разработка', 
        description: 'Создаем пользовательский интерфейс с использованием современных JavaScript-фреймворков (React, Vue, Angular).' 
      },
      { 
        title: 'Back-end разработка', 
        description: 'Разрабатываем серверную часть приложения, базы данных и API для взаимодействия с фронтендом.' 
      },
      { 
        title: 'Тестирование и оптимизация', 
        description: 'Проводим тщательное тестирование и оптимизацию производительности, безопасности и SEO.' 
      }
    ],
    features: [
      'Front-end разработка (React, Vue, Angular)',
      'Back-end разработка (Node.js, PHP, Python)',
      'E-commerce решения',
      'Оптимизация и масштабирование',
      'PWA (Progressive Web Applications)',
      'Интеграция с внешними сервисами и API'
    ],
    faq: [
      { 
        question: 'На каких технологиях вы разрабатываете сайты?', 
        answer: 'Мы используем современный стек технологий: React, Vue.js или Angular для фронтенда; Node.js, PHP или Python для бэкенда. Выбор конкретных технологий зависит от требований проекта.' 
      },
      { 
        question: 'Можете ли вы доработать существующий сайт?', 
        answer: 'Да, мы можем провести аудит вашего текущего сайта и выполнить необходимые доработки или полный рефакторинг при необходимости.' 
      },
      { 
        question: 'Как обеспечивается безопасность разрабатываемых сайтов?', 
        answer: 'Мы следуем OWASP рекомендациям по безопасности, используем HTTPS, защиту от SQL-инъекций, XSS атак, и регулярно обновляем зависимости для устранения уязвимостей.' 
      }
    ],
    relatedServices: ['design', 'seo-optimization', 'maintenance']
  },
  'telegram-bots': {
    title: 'Telegram-боты',
    description: 'Разрабатываем умных ботов для автоматизации бизнес-процессов и улучшения опыта клиентов.',
    icon: 'lucide:message-circle',
    color: 'bg-green-500',
    heroImage: 'https://img.heroui.chat/image/ai?w=1200&h=600&u=bot30',
    overview: 'Мы создаем функциональных Telegram-ботов для различных бизнес-задач: от автоматизации обслуживания клиентов до интеграции с CRM и платежными системами. Наши боты помогают оптимизировать бизнес-процессы, сократить расходы и повысить лояльность клиентов.',
    process: [
      { 
        title: 'Анализ задач и сценариев', 
        description: 'Изучаем бизнес-процессы и разрабатываем сценарии взаимодействия бота с пользователями.' 
      },
      { 
        title: 'Проектирование архитектуры', 
        description: 'Разрабатываем архитектуру бота и планируем интеграции с внешними системами.' 
      },
      { 
        title: 'Разработка и тестирование', 
        description: 'Создаем бота с использованием Telegram Bot API и тщательно тестируем все сценарии использования.' 
      },
      { 
        title: 'Интеграция и внедрение', 
        description: 'Интегрируем бота с вашими системами и запускаем в эксплуатацию с необходимой инфраструктурой.' 
      }
    ],
    features: [
      'Чат-боты для поддержки клиентов',
      'Интеграция с CRM и платежными системами',
      'Боты для автоматизации маркетинга',
      'Аналитика и отчетность',
      'Боты для внутренних бизнес-процессов',
      'Персональные помощники'
    ],
    faq: [
      { 
        question: 'Какие задачи может решать Telegram-бот?', 
        answer: 'Telegram-боты могут автоматизировать работу с клиентами, принимать заказы, проводить оплаты, отправлять уведомления, собирать отзывы, проводить опросы и многое другое.' 
      },
      { 
        question: 'Можно ли интегрировать бота с нашей CRM-системой?', 
        answer: 'Да, мы разрабатываем ботов с возможностью интеграции с популярными CRM-системами и другими сервисами через API.' 
      },
      { 
        question: 'Какие сроки разработки бота?', 
        answer: 'Сроки зависят от сложности функционала. Простой бот может быть создан за 1-2 недели, сложные решения с интеграциями – 1-2 месяца.' 
      }
    ],
    relatedServices: ['web-development', 'mobile-development', 'maintenance']
  },
  'seo-optimization': {
    title: 'SEO-оптимизация',
    description: 'Повышаем видимость вашего сайта в поисковых системах и привлекаем целевой трафик.',
    icon: 'lucide:search',
    color: 'bg-yellow-500',
    heroImage: 'https://img.heroui.chat/image/ai?w=1200&h=600&u=seo40',
    overview: 'Наши SEO-специалисты помогут вашему сайту занять высокие позиции в поисковой выдаче Google и Яндекс. Мы разрабатываем комплексные стратегии оптимизации, включающие техническое SEO, оптимизацию контента и построение ссылочной массы для достижения устойчивых результатов.',
    process: [
      { 
        title: 'SEO-аудит', 
        description: 'Анализируем текущее состояние сайта, выявляем технические проблемы и факторы, влияющие на ранжирование.' 
      },
      { 
        title: 'Разработка стратегии', 
        description: 'Создаем комплексную стратегию оптимизации с учетом специфики вашего бизнеса и конкурентной среды.' 
      },
      { 
        title: 'Техническая оптимизация', 
        description: 'Улучшаем технические аспекты сайта: скорость загрузки, индексацию, структуру, мобильную адаптивность.' 
      },
      { 
        title: 'Контент и ссылки', 
        description: 'Оптимизируем существующий контент, разрабатываем план создания нового и работаем над ссылочной массой.' 
      }
    ],
    features: [
      'Техническая SEO-оптимизация',
      'Оптимизация контента',
      'Локальное SEO',
      'E-commerce SEO',
      'Аналитика и отчетность',
      'Мониторинг позиций'
    ],
    faq: [
      { 
        question: 'Как быстро будут видны результаты SEO-оптимизации?', 
        answer: 'SEO – это долгосрочная стратегия. Первые результаты обычно видны через 2-3 месяца, а значительное улучшение позиций – через 6-12 месяцев в зависимости от конкурентности ниши.' 
      },
      { 
        question: 'По каким ключевым словам будет продвигаться сайт?', 
        answer: 'Мы проводим глубокий анализ ключевых слов для вашей ниши, учитываем поисковый спрос, конкуренцию и коммерческий потенциал запросов для формирования оптимального семантического ядра.' 
      },
      { 
        question: 'Предоставляете ли вы отчеты о проделанной работе?', 
        answer: 'Да, мы предоставляем подробные ежемесячные отчеты о выполненных работах, изменениях позиций, трафика и конверсий, а также планы работ на следующий период.' 
      }
    ],
    relatedServices: ['web-development', 'design', 'maintenance']
  },
  'mobile-development': {
    title: 'Мобильная разработка',
    description: 'Создаем нативные и кроссплатформенные мобильные приложения для iOS и Android.',
    icon: 'lucide:smartphone',
    color: 'bg-purple-500',
    heroImage: 'https://img.heroui.chat/image/ai?w=1200&h=600&u=mobile50',
    overview: 'Мы разрабатываем качественные мобильные приложения, которые отвечают потребностям вашего бизнеса и пользователей. Наша команда использует современные технологии и фреймворки для создания производительных и удобных приложений для iOS и Android.',
    process: [
      { 
        title: 'Анализ и проектирование', 
        description: 'Определяем целевую аудиторию, функциональные требования и проектируем архитектуру приложения.' 
      },
      { 
        title: 'Дизайн и прототипирование', 
        description: 'Создаем прототипы и дизайн экранов в соответствии с гайдлайнами iOS и Android платформ.' 
      },
      { 
        title: 'Разработка', 
        description: 'Реализуем функционал приложения с использованием нативных языков или кроссплатформенных технологий.' 
      },
      { 
        title: 'Тестирование и публикация', 
        description: 'Проводим комплексное тестирование и помогаем с публикацией приложения в App Store и Google Play.' 
      }
    ],
    features: [
      'Нативная разработка (Swift, Kotlin)',
      'Кроссплатформенная разработка (React Native, Flutter)',
      'Интеграция с API и сервисами',
      'Push-уведомления',
      'Аналитика и мониторинг',
      'Публикация в магазинах приложений'
    ],
    faq: [
      { 
        question: 'Что лучше выбрать: нативное или кроссплатформенное приложение?', 
        answer: 'Выбор зависит от требований к проекту. Нативные приложения предлагают максимальную производительность и доступ ко всем возможностям платформы. Кроссплатформенные решения обеспечивают более быструю разработку и единый кодбейс для обеих платформ, что часто более экономично.' 
      },
      { 
        question: 'Как долго занимает разработка мобильного приложения?', 
        answer: 'Сроки зависят от сложности. Приложение среднего уровня сложности обычно занимает 3-4 месяца от концепции до публикации в магазинах приложений.' 
      },
      { 
        question: 'Помогаете ли вы с публикацией приложения в App Store и Google Play?', 
        answer: 'Да, мы оказываем полную поддержку при публикации, включая подготовку всех необходимых материалов, создание учетных записей разработчика и соблюдение всех требований магазинов приложений.' 
      }
    ],
    relatedServices: ['design', 'web-development', 'telegram-bots']
  },
  'maintenance': {
    title: 'Поддержка и сопровождение',
    description: 'Обеспечиваем стабильную работу ваших цифровых продуктов и помогаем с их развитием.',
    icon: 'lucide:life-buoy',
    color: 'bg-red-500',
    heroImage: 'https://img.heroui.chat/image/ai?w=1200&h=600&u=support60',
    overview: 'Мы предлагаем комплексную техническую поддержку и сопровождение для ваших веб-сайтов и приложений. Наша команда следит за стабильной работой ваших цифровых продуктов, оперативно устраняет возникающие проблемы и помогает с внедрением новых функций и улучшений.',
    process: [
      { 
        title: 'Диагностика и мониторинг', 
        description: 'Настраиваем системы мониторинга для отслеживания работоспособности и производительности вашего продукта.' 
      },
      { 
        title: 'Регулярные обновления', 
        description: 'Обновляем зависимости, фреймворки и компоненты для поддержания безопасности и стабильности системы.' 
      },
      { 
        title: 'Устранение ошибок', 
        description: 'Оперативно реагируем на возникающие проблемы и устраняем их в соответствии с SLA.' 
      },
      { 
        title: 'Развитие продукта', 
        description: 'Помогаем планировать и внедрять новые функции и улучшения на основе анализа пользовательского опыта.' 
      }
    ],
    features: [
      'Техническая поддержка 24/7',
      'Мониторинг работоспособности',
      'Обновления безопасности',
      'Бэкапы и восстановление данных',
      'Оптимизация производительности',
      'Масштабирование инфраструктуры'
    ],
    faq: [
      { 
        question: 'Какие уровни поддержки вы предлагаете?', 
        answer: 'Мы предлагаем несколько пакетов поддержки: базовый (рабочее время, время реакции до 24 часов), стандартный (расширенное время поддержки, реакция до 8 часов) и премиум (24/7, реакция в течение 1-2 часов).' 
      },
      { 
        question: 'Как происходит обращение в техническую поддержку?', 
        answer: 'Клиенты могут обращаться через выделенный email, систему тикетов или по телефону в зависимости от уровня поддержки. Каждому запросу присваивается приоритет и отслеживается до полного решения проблемы.' 
      },
      { 
        question: 'Включены ли доработки в стоимость поддержки?', 
        answer: 'Базовая поддержка включает исправление ошибок и мелкие улучшения. Значительные доработки и новый функционал обычно оцениваются отдельно, но клиентам с пакетами поддержки предоставляются льготные условия.' 
      }
    ],
    relatedServices: ['web-development', 'mobile-development', 'seo-optimization']
  }
};

// Helper function to get readable service name from slug
const getServiceNameFromSlug = (slug: string): string => {
  const service = serviceData[slug as keyof typeof serviceData];
  return service ? service.title : slug;
};

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { open } = useContactModalStore();
  
  // Get service data based on slug
  const service = slug ? serviceData[slug as keyof typeof serviceData] : null;
  
  // Fallback if service not found
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Услуга не найдена</h1>
        <p className="text-foreground-600 mb-8">К сожалению, запрашиваемая услуга не существует.</p>
        <Button as={Link} to="/services" color="primary" variant="flat">
          Вернуться к списку услуг
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
      <section className={`relative h-[60vh] min-h-[400px] flex items-center ${service.color}`}>
        <div className="absolute inset-0">
          <img 
            src={service.heroImage} 
            alt={service.title} 
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-lg flex items-center justify-center">
                <Icon icon={service.icon} className="text-white text-3xl" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl md:text-2xl opacity-90">{service.description}</p>
          </div>
        </div>
      </section>
      
      {/* Overview */}
      <ScrollytellingSection>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Обзор услуги</h2>
            <p className="text-lg text-foreground-600">{service.overview}</p>
            
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`${service.color} w-10 h-10 rounded-full flex items-center justify-center shrink-0`}>
                    <Icon icon="lucide:check" className="text-white" />
                  </div>
                  <p className="text-lg">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollytellingSection>
      
      {/* Process */}
      <ScrollytellingSection>
        <div className="bg-content1 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Как мы работаем</h2>
              <p className="text-foreground-600">Наш подход к проектам обеспечивает прозрачность, контроль качества и своевременную доставку результатов.</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {service.process.map((step, index) => (
                  <motion.div 
                    key={index}
                    className="bg-content2 p-6 rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`${service.color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}>
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-foreground-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollytellingSection>
      
      {/* FAQ */}
      <ScrollytellingSection>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Часто задаваемые вопросы</h2>
            
            <Accordion variant="splitted">
              {service.faq.map((faq, index) => (
                <AccordionItem key={index} title={faq.question}>
                  <p className="text-foreground-600">{faq.answer}</p>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </ScrollytellingSection>
      
      {/* Related services */}
      <ScrollytellingSection>
        <div className="bg-content1 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Смежные услуги</h2>
              <p className="text-foreground-600">Эти услуги часто дополняют {service.title.toLowerCase()} для достижения наилучших результатов</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {service.relatedServices.map((relatedSlug) => {
                const relatedService = serviceData[relatedSlug as keyof typeof serviceData];
                return relatedService ? (
                  <Link 
                    key={relatedSlug} 
                    to={`/services/${relatedSlug}`}
                    className="bg-content2 p-6 rounded-lg transition-all hover:shadow-md hover:-translate-y-1"
                  >
                    <div className={`${relatedService.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon icon={relatedService.icon} className="text-white text-xl" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{relatedService.title}</h3>
                    <p className="text-sm text-foreground-600 line-clamp-3">{relatedService.description}</p>
                  </Link>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </ScrollytellingSection>
      
      {/* CTA */}
      <ScrollytellingSection>
        <div className={`${service.color} text-white py-20`}>
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Готовы начать проект?</h2>
              <p className="text-xl mb-8 opacity-90">
                Расскажите нам о вашей идее, и мы поможем воплотить её в жизнь.
                Наши специалисты свяжутся с вами для обсуждения деталей.
              </p>
              
              <Button 
                size="lg" 
                color="default"
                variant="solid"
                className="bg-white text-primary hover:bg-white/90"
                onPress={open}
                endContent={<Icon icon="lucide:arrow-right" />}
              >
                Обсудить проект
              </Button>
            </div>
          </div>
        </div>
      </ScrollytellingSection>
    </motion.div>
  );
};

export default ServiceDetailPage;