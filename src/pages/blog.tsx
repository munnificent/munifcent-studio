import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Avatar, Chip, Pagination, Input } from '@heroui/react';
import { Icon } from '@iconify/react';

// Mock blog data (would come from CMS in a real app)
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishDate: string;
  author: {
    name: string;
    avatar: string;
    position: string;
  };
  readTime: number;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'ux-design-trends-2023',
    title: 'Тренды UX/UI дизайна в 2023 году',
    excerpt: 'Обзор основных трендов в дизайне интерфейсов, которые будут определять облик цифровых продуктов в 2023 году.',
    category: 'Design',
    coverImage: 'https://img.heroui.chat/image/ai?w=800&h=450&u=blog1',
    publishDate: '2023-05-15',
    author: {
      name: 'Екатерина Иванова',
      avatar: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=3',
      position: 'UI/UX Дизайнер'
    },
    readTime: 7
  },
  {
    id: '2',
    slug: 'react-performance-optimization',
    title: 'Оптимизация производительности React-приложений',
    excerpt: 'Практические советы и техники по улучшению производительности приложений, построенных на React.',
    category: 'Development',
    coverImage: 'https://img.heroui.chat/image/ai?w=800&h=450&u=blog2',
    publishDate: '2023-06-22',
    author: {
      name: 'Дмитрий Сидоров',
      avatar: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=5',
      position: 'Senior React Developer'
    },
    readTime: 10
  },
  {
    id: '3',
    slug: 'ecommerce-conversion-tips',
    title: 'Как увеличить конверсию в e-commerce проектах',
    excerpt: 'Стратегии и тактики повышения конверсии в интернет-магазинах с помощью UI/UX решений и персонализации.',
    category: 'E-commerce',
    coverImage: 'https://img.heroui.chat/image/fashion?w=800&h=450&u=blog3',
    publishDate: '2023-07-10',
    author: {
      name: 'Анна Кузнецова',
      avatar: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=7',
      position: 'Project Manager'
    },
    readTime: 8
  },
  {
    id: '4',
    slug: 'telegram-bots-for-business',
    title: 'Telegram-боты для бизнеса: кейсы и возможности',
    excerpt: 'Как компании разных отраслей используют Telegram-ботов для автоматизации и улучшения клиентского опыта.',
    category: 'Automation',
    coverImage: 'https://img.heroui.chat/image/ai?w=800&h=450&u=blog4',
    publishDate: '2023-08-05',
    author: {
      name: 'Александр Петров',
      avatar: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=1',
      position: 'Креативный директор'
    },
    readTime: 6
  },
  {
    id: '5',
    slug: 'webgl-3d-web-experiences',
    title: 'Создание интерактивных 3D-опытов с WebGL',
    excerpt: 'Руководство по разработке впечатляющих трехмерных веб-интерфейсов с использованием WebGL и Three.js.',
    category: 'Development',
    coverImage: 'https://img.heroui.chat/image/game?w=800&h=450&u=blog5',
    publishDate: '2023-09-12',
    author: {
      name: 'Игорь Волков',
      avatar: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=ig1',
      position: 'Frontend Developer'
    },
    readTime: 12
  },
  {
    id: '6',
    slug: 'mobile-first-design',
    title: 'Mobile First: принципы дизайна для мобильных устройств',
    excerpt: 'Как правильно проектировать интерфейсы с учетом мобильных пользователей и обеспечить отличный UX.',
    category: 'Design',
    coverImage: 'https://img.heroui.chat/image/ai?w=800&h=450&u=blog6',
    publishDate: '2023-10-18',
    author: {
      name: 'Мария Соколова',
      avatar: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=ms1',
      position: 'UX Researcher'
    },
    readTime: 9
  }
];

// Extract unique categories
const categories = Array.from(new Set(blogPosts.map(post => post.category)));

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [page, setPage] = React.useState(1);
  const postsPerPage = 6;
  
  // Filter posts based on category and search
  const filteredPosts = React.useMemo(() => {
    let result = [...blogPosts];
    
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [selectedCategory, searchQuery]);
  
  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (page - 1) * postsPerPage, 
    page * postsPerPage
  );
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => (prev === category ? '' : category));
    setPage(1);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Наш блог</h1>
            <p className="text-xl opacity-90">
              Делимся опытом, инсайтами и новостями из мира дизайна и разработки.
              Полезные статьи для специалистов и клиентов.
            </p>
          </div>
        </div>
      </section>
      
      {/* Filters */}
      <section className="py-8 border-b border-divider">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              <Chip 
                color={selectedCategory === '' ? 'primary' : 'default'} 
                variant={selectedCategory === '' ? 'solid' : 'flat'}
                onClick={() => handleCategoryClick('')}
                className="cursor-pointer"
              >
                Все
              </Chip>
              {categories.map(category => (
                <Chip 
                  key={category} 
                  color={selectedCategory === category ? 'primary' : 'default'} 
                  variant={selectedCategory === category ? 'solid' : 'flat'}
                  onClick={() => handleCategoryClick(category)}
                  className="cursor-pointer"
                >
                  {category}
                </Chip>
              ))}
            </div>
            
            <Input
              placeholder="Поиск статей..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" className="text-foreground-400" />}
              className="w-full md:w-64"
              clearable
            />
          </div>
        </div>
      </section>
      
      {/* Blog posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map(post => (
                  <motion.div 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Card shadow="sm" className="h-full">
                      <CardBody className="p-0">
                        <div className="relative overflow-hidden aspect-[16/9]">
                          <img 
                            src={post.coverImage} 
                            alt={post.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-4 left-4">
                            <Chip size="sm" color="primary">
                              {post.category}
                            </Chip>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <Link to={`/blog/${post.slug}`}>
                            <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          <p className="text-foreground-600 mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Avatar src={post.author.avatar} size="sm" />
                              <div>
                                <p className="text-sm font-medium">
                                  {post.author.name}
                                </p>
                                <p className="text-xs text-foreground-500">
                                  {new Date(post.publishDate).toLocaleDateString('ru-RU', { 
                                    day: 'numeric', 
                                    month: 'long', 
                                    year: 'numeric' 
                                  })}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-foreground-500 text-xs">
                              <Icon icon="lucide:clock" className="mr-1" />
                              <span>{post.readTime} мин. чтения</span>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                      
                      <CardFooter className="pt-0 px-6 pb-6">
                        <Link 
                          to={`/blog/${post.slug}`} 
                          className="text-primary font-medium flex items-center hover:underline"
                        >
                          Читать статью
                          <Icon icon="lucide:arrow-right" className="ml-1" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <Pagination 
                    total={totalPages}
                    page={page}
                    onChange={setPage}
                    color="primary"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Icon icon="lucide:file-question" className="text-5xl text-foreground-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Статьи не найдены</h3>
              <p className="text-foreground-600">
                По вашему запросу не найдено ни одной статьи.
                Попробуйте изменить параметры поиска или категорию.
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-primary hover:underline"
                >
                  Сбросить поиск
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default BlogPage;