import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, Tab, Input, Select, SelectItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import CaseCard, { CaseProps } from '../components/case-card';

// Mock data for cases (would come from CMS in a real app)
const allCases: CaseProps[] = [
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
  },
  {
    id: '4',
    slug: 'travel-explorer',
    title: 'Travel Explorer',
    description: 'Приложение для планирования путешествий с интерактивной картой и рекомендациями.',
    imageUrl: 'https://img.heroui.chat/image/places?w=800&h=600&u=4',
    categories: ['Mobile', 'Maps', 'UX/UI']
  },
  {
    id: '5',
    slug: 'fitness-tracker',
    title: 'Fitness Tracker',
    description: 'Веб и мобильное приложение для отслеживания тренировок и планирования питания.',
    imageUrl: 'https://img.heroui.chat/image/sports?w=800&h=600&u=5',
    categories: ['Web', 'Mobile', 'Health']
  },
  {
    id: '6',
    slug: 'crypto-monitor',
    title: 'Crypto Monitor',
    description: 'Приложение для мониторинга криптовалютного портфеля с аналитикой и уведомлениями.',
    imageUrl: 'https://img.heroui.chat/image/finance?w=800&h=600&u=6',
    categories: ['Web', 'Finance', 'Analytics']
  },
  {
    id: '7',
    slug: 'smart-home-controller',
    title: 'Smart Home Controller',
    description: 'Мобильное приложение для управления умным домом с интеграцией IoT устройств.',
    imageUrl: 'https://img.heroui.chat/image/furniture?w=800&h=600&u=7',
    categories: ['Mobile', 'IoT', 'UX/UI']
  },
  {
    id: '8',
    slug: 'edu-learning-platform',
    title: 'EduLearn Platform',
    description: 'Образовательная платформа с интерактивными курсами и системой отслеживания прогресса.',
    imageUrl: 'https://img.heroui.chat/image/book?w=800&h=600&u=8',
    categories: ['Web', 'Education', 'LMS']
  },
  {
    id: '9',
    slug: 'healthcare-management',
    title: 'Healthcare Management',
    description: 'Система управления медицинской клиникой с модулями для пациентов и врачей.',
    imageUrl: 'https://img.heroui.chat/image/ai?w=800&h=600&u=9',
    categories: ['Web', 'Healthcare', 'Management']
  }
];

// Extract unique categories for filter
const allCategories = Array.from(new Set(allCases.flatMap(caseItem => caseItem.categories)));

const CasesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [sortBy, setSortBy] = React.useState<string>("newest");
  
  // Filter and sort cases
  const filteredCases = React.useMemo(() => {
    let result = [...allCases];
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(caseItem => 
        caseItem.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(caseItem => 
        caseItem.title.toLowerCase().includes(lowerQuery) || 
        caseItem.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Sort cases
    switch (sortBy) {
      case "newest":
        // In a real app, you would sort by date
        return result;
      case "oldest":
        // In a real app, you would sort by date
        return [...result].reverse();
      case "alphabetical":
        return [...result].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return result;
    }
  }, [selectedCategory, searchQuery, sortBy]);

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Наши проекты</h1>
            <p className="text-xl opacity-90">
              Изучите портфолио наших работ. Каждый проект – это уникальное решение,
              созданное с учетом бизнес-целей и потребностей пользователей.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-8 border-b border-divider">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <Tabs 
              aria-label="Categories" 
              color="primary"
              classNames={{
                base: "overflow-x-auto",
                tabList: "gap-4"
              }}
              selectedKey={selectedCategory}
              onSelectionChange={(key) => setSelectedCategory(key as string)}
            >
              <Tab key="all" title="Все проекты" />
              {allCategories.map((category) => (
                <Tab key={category.toLowerCase()} title={category} />
              ))}
            </Tabs>
            
            <div className="flex gap-4 w-full md:w-auto">
              <Input
                placeholder="Поиск проектов..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<Icon icon="lucide:search" className="text-foreground-400" />}
                className="w-full md:w-64"
              />
              
              <Select
                label="Сортировка"
                selectedKeys={[sortBy]}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-40"
              >
                <SelectItem key="newest" value="newest">Новые</SelectItem>
                <SelectItem key="oldest" value="oldest">Старые</SelectItem>
                <SelectItem key="alphabetical" value="alphabetical">По названию</SelectItem>
              </Select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cases grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredCases.length > 0 ? (
            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredCases.map((caseItem) => (
                <motion.div key={caseItem.id} variants={item}>
                  <CaseCard caseItem={caseItem} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <Icon icon="lucide:search-x" className="text-5xl text-foreground-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-foreground-600">
                По вашему запросу не найдено ни одного проекта.
                Попробуйте изменить параметры поиска или фильтрации.
              </p>
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default CasesPage;