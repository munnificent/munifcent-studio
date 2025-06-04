import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, Chip, Divider, Button, Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import ScrollytellingSection from '../components/scrollytelling-section';

// Mock blog post data (would come from CMS in a real app)
const blogPosts = {
  'ux-design-trends-2023': {
    title: 'Тренды UX/UI дизайна в 2023 году',
    excerpt: 'Обзор основных трендов в дизайне интерфейсов, которые будут определять облик цифровых продуктов в 2023 году.',
    content: `
      <p>В мире дизайна интерфейсов тренды меняются стремительно. То, что было актуально год назад, сегодня может казаться устаревшим. В 2023 году мы наблюдаем несколько ключевых тенденций, которые определяют облик современных цифровых продуктов.</p>
      
      <h2>1. Нейроморфизм и реалистичные текстуры</h2>
      <p>После долгого господства плоского дизайна мы видим возвращение объема и текстур. Нейроморфизм — стиль, сочетающий минимализм с реалистичными тенями и эффектами выпуклости, создает ощущение реальных физических объектов в цифровой среде.</p>
      
      <h2>2. Иммерсивные 3D-элементы</h2>
      <p>Благодаря развитию технологий WebGL и Three.js, все больше сайтов интегрируют трехмерные элементы. Это не просто красивая анимация — 3D-объекты помогают лучше представить продукт и вовлечь пользователя.</p>
      
      <h2>3. Микровзаимодействия</h2>
      <p>Небольшие анимированные реакции на действия пользователя делают интерфейс более живым и приятным в использовании. В 2023 году микровзаимодействия становятся не просто приятным дополнением, а необходимым элементом качественного интерфейса.</p>
      
      <h2>4. Темные режимы и кастомизация</h2>
      <p>Темные темы уже стали стандартом, но теперь пользователи хотят большего контроля над внешним видом приложений. Предоставление возможности кастомизации цветовых схем и даже расположения элементов — тренд, который набирает обороты.</p>
      
      <h2>5. Голосовые и жестовые интерфейсы</h2>
      <p>По мере совершенствования технологий распознавания речи и движений, все больше приложений интегрируют эти способы взаимодействия. Дизайнерам приходится продумывать не только визуальный, но и аудиальный опыт пользователя.</p>
      
      <h2>Заключение</h2>
      <p>Тренды в UX/UI дизайне отражают как технологическое развитие, так и изменения в поведении пользователей. Успешные дизайнеры не слепо следуют модным течениям, а выбирают решения, которые лучше всего подходят для задач конкретного проекта и потребностей его аудитории.</p>
    `,
    publishDate: '2023-05-15',
    category: 'Design',
    coverImage: 'https://img.heroui.chat/image/ai?w=1200&h=600&u=blog1',
    author: {
      name: 'Екатерина Иванова',
      avatar: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=3',
      position: 'UI/UX Дизайнер',
      bio: 'Опытный UI/UX дизайнер с более чем 8-летним стажем. Специализируется на создании интуитивно понятных интерфейсов и улучшении пользовательского опыта.'
    },
    readTime: 7,
    tags: ['UX/UI', 'Дизайн', 'Тренды', 'Веб-дизайн'],
    relatedPosts: ['react-performance-optimization', 'mobile-first-design', 'webgl-3d-web-experiences']
  },
  'react-performance-optimization': {
    title: 'Оптимизация производительности React-приложений',
    excerpt: 'Практические советы и техники по улучшению производительности приложений, построенных на React.',
    content: `
      <p>React — одна из самых популярных библиотек для создания пользовательских интерфейсов. Однако с ростом сложности приложения могут возникать проблемы с производительностью. В этой статье мы рассмотрим основные методы оптимизации React-приложений.</p>
      
      <h2>1. Используйте React.memo для предотвращения ненужных ререндеров</h2>
      <p>React.memo — это HOC (компонент высшего порядка), который мемоизирует результат рендеринга компонента. Это означает, что React будет использовать последний отрендеренный результат и пропустит следующий рендеринг, если пропсы не изменились.</p>
      <pre><code>
const MyComponent = React.memo(function MyComponent(props) {
  // Ваш компонент
});
      </code></pre>
      
      <h2>2. Оптимизируйте использование хуков</h2>
      <p>Некорректное использование хуков, особенно useEffect и useMemo, может привести к излишним ререндерам и проблемам с производительностью. Всегда указывайте массив зависимостей для этих хуков.</p>
      <pre><code>
useEffect(() => {
  // Эффект будет запущен только при изменении id
}, [id]);

const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
      </code></pre>
      
      <h2>3. Виртуализация длинных списков</h2>
      <p>Для оптимизации рендеринга длинных списков используйте библиотеки виртуализации, такие как react-window или react-virtualized. Эти библиотеки отрисовывают только видимые элементы, а не весь список сразу.</p>
      
      <h2>4. Профилирование и оптимизация бандла</h2>
      <p>Используйте React DevTools Profiler для выявления проблемных мест в вашем приложении. Оптимизируйте размер бандла с помощью code-splitting и lazy loading компонентов.</p>
      <pre><code>
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function MyComponent() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </React.Suspense>
  );
}
      </code></pre>
      
      <h2>5. Кэширование данных</h2>
      <p>Используйте библиотеки для управления состоянием и кэширования данных, такие как Redux с RTK Query или React Query, чтобы избежать лишних запросов к API.</p>
      
      <h2>Заключение</h2>
      <p>Оптимизация производительности — непрерывный процесс. Регулярное профилирование и тестирование помогут поддерживать ваше приложение в отличной форме даже при увеличении его сложности и объема данных.</p>
    `,
    publishDate: '2023-06-22',
    category: 'Development',
    coverImage: 'https://img.heroui.chat/image/ai?w=1200&h=600&u=blog2',
    author: {
      name: 'Дмитрий Сидоров',
      avatar: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=5',
      position: 'Senior React Developer',
      bio: 'Опытный разработчик с глубоким знанием React экосистемы. Специализируется на создании высокопроизводительных и масштабируемых веб-приложений.'
    },
    readTime: 10,
    tags: ['React', 'JavaScript', 'Оптимизация', 'Производительность', 'Фронтенд'],
    relatedPosts: ['ux-design-trends-2023', 'webgl-3d-web-experiences', 'mobile-first-design']
  },
  'mobile-first-design': {
    title: 'Mobile First: принципы дизайна для мобильных устройств',
    excerpt: 'Как правильно проектировать интерфейсы с учетом мобильных пользователей и обеспечить отличный UX.',
    content: `
      <p>В современном мире мобильные устройства стали основным способом доступа к интернету для большинства пользователей. Подход Mobile First — это методология проектирования, при которой дизайн сначала разрабатывается для мобильных устройств, а затем адаптируется для десктопа.</p>
      
      <h2>1. Почему Mobile First важен</h2>
      <p>Проектирование интерфейсов сначала для мобильных устройств имеет несколько преимуществ:</p>
      <ul>
        <li>Фокус на главном: ограниченное пространство экрана заставляет сосредоточиться на действительно важном контенте и функциях.</li>
        <li>Лучший пользовательский опыт для растущей мобильной аудитории.</li>
        <li>Повышение производительности: оптимизация для мобильных устройств часто приводит к общему улучшению скорости работы сайта.</li>
      </ul>
      
      <h2>2. Основные принципы Mobile First дизайна</h2>
      <h3>Приоритизация контента</h3>
      <p>На маленьком экране нет места для лишнего. Определите, что действительно важно для пользователя, и сделайте это доступным в первую очередь.</p>
      
      <h3>Простота и ясность</h3>
      <p>Используйте четкую иерархию, достаточный размер шрифта (минимум 16px), удобные для нажатия элементы (min 44px × 44px) и достаточное пространство между интерактивными элементами.</p>
      
      <h3>Оптимизация навигации</h3>
      <p>Мобильная навигация должна быть простой и интуитивно понятной. Популярные паттерны включают "бургер"-меню, вкладки внизу экрана или карусели для переключения между разделами.</p>
      
      <h2>3. Технические аспекты</h2>
      <h3>Адаптивные сетки и медиа-запросы</h3>
      <p>Используйте гибкие сетки и медиа-запросы CSS для адаптации дизайна к разным размерам экрана.</p>
      
      <h3>Оптимизация производительности</h3>
      <p>Мобильные устройства часто имеют более медленное соединение и меньшую вычислительную мощность. Оптимизируйте изображения, минимизируйте JS и CSS, используйте ленивую загрузку контента.</p>
      
      <h2>4. Тестирование и итерация</h2>
      <p>Тестируйте дизайн на реальных устройствах, а не только в эмуляторах. Собирайте обратную связь от пользователей и итеративно улучшайте интерфейс.</p>
      
      <h2>Заключение</h2>
      <p>Mobile First — это не просто тренд, а необходимый подход в современном дизайне. Начиная с разработки для мобильных устройств, вы создаете более фокусированный, эффективный и доступный пользовательский опыт, который можно затем расширить для больших экранов.</p>
    `,
    publishDate: '2023-10-18',
    category: 'Design',
    coverImage: 'https://img.heroui.chat/image/ai?w=1200&h=600&u=blog6',
    author: {
      name: 'Мария Соколова',
      avatar: 'https://img.heroui.chat/image/avatar?w=100&h=100&u=ms1',
      position: 'UX Researcher',
      bio: 'UX исследователь с богатым опытом работы в крупных IT-компаниях. Специализируется на поведенческих исследованиях и юзабилити-тестировании мобильных интерфейсов.'
    },
    readTime: 9,
    tags: ['Mobile First', 'Адаптивный дизайн', 'UX/UI', 'Мобильные приложения'],
    relatedPosts: ['ux-design-trends-2023', 'ecommerce-conversion-tips', 'react-performance-optimization']
  }
};

// Add more blog posts as needed, or fetch from API in a real app

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Get blog post data based on slug
  const post = slug ? blogPosts[slug as keyof typeof blogPosts] : null;
  
  const [showFloatingShare, setShowFloatingShare] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFloatingShare(true);
      } else {
        setShowFloatingShare(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fallback if post not found
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Статья не найдена</h1>
        <p className="text-foreground-600 mb-8">К сожалению, запрашиваемая статья не существует.</p>
        <Button as={Link} to="/blog" color="primary" variant="flat">
          Вернуться к блогу
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
      <section className="relative h-[50vh] min-h-[400px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <Chip color="primary" className="mb-4">{post.category}</Chip>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center gap-4 mt-6">
              <Avatar src={post.author.avatar} className="ring-2 ring-white" />
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="opacity-80 text-sm">
                  {new Date(post.publishDate).toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })} • {post.readTime} мин. чтения
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Post content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-2/3">
              <ScrollytellingSection>
                <div className="max-w-3xl">
                  <p className="text-xl text-foreground-600 mb-8">{post.excerpt}</p>
                  
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                  
                  {/* Tags */}
                  <div className="mt-12 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <Chip key={tag} variant="flat" size="sm">{tag}</Chip>
                    ))}
                  </div>
                  
                  {/* Author bio */}
                  <div className="mt-12 bg-content1 p-6 rounded-xl">
                    <div className="flex items-center gap-4">
                      <Avatar src={post.author.avatar} size="lg" className="hidden sm:flex" />
                      <div>
                        <h3 className="text-lg font-semibold">Об авторе</h3>
                        <p className="font-medium">{post.author.name}</p>
                        <p className="text-sm text-foreground-500">{post.author.position}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-foreground-600">{post.author.bio}</p>
                  </div>
                </div>
              </ScrollytellingSection>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <Card>
                  <CardBody className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Поделиться статьей</h3>
                      <div className="flex gap-2">
                        <Button
                          isIconOnly
                          color="primary"
                          variant="flat"
                          aria-label="Share on Twitter"
                          as="a"
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon icon="logos:twitter" />
                        </Button>
                        <Button
                          isIconOnly
                          color="primary"
                          variant="flat"
                          aria-label="Share on Facebook"
                          as="a"
                          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon icon="logos:facebook" />
                        </Button>
                        <Button
                          isIconOnly
                          color="primary"
                          variant="flat"
                          aria-label="Share on LinkedIn"
                          as="a"
                          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon icon="logos:linkedin-icon" />
                        </Button>
                        <Button
                          isIconOnly
                          color="primary"
                          variant="flat"
                          aria-label="Share on Telegram"
                          as="a"
                          href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon icon="logos:telegram" />
                        </Button>
                      </div>
                    </div>
                    
                    <Divider />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Похожие статьи</h3>
                      <div className="space-y-4">
                        {post.relatedPosts.map(relatedSlug => {
                          const relatedPost = blogPosts[relatedSlug as keyof typeof blogPosts];
                          return relatedPost ? (
                            <Link 
                              key={relatedSlug} 
                              to={`/blog/${relatedSlug}`} 
                              className="flex gap-3 group"
                            >
                              <div className="w-20 h-16 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={relatedPost.coverImage} 
                                  alt={relatedPost.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                                <p className="text-xs text-foreground-500 mt-1">
                                  {relatedPost.readTime} мин. чтения
                                </p>
                              </div>
                            </Link>
                          ) : null;
                        })}
                      </div>
                    </div>
                    
                    <Divider />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Категории</h3>
                      <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(Object.values(blogPosts).map(p => p.category))).map(category => (
                          <Link key={category} to={`/blog?category=${category}`}>
                            <Chip color="primary" variant="flat">{category}</Chip>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Floating share buttons */}
      <div 
        className={`fixed z-50 bottom-10 left-10 flex gap-2 bg-content1/80 backdrop-blur shadow-lg p-2 rounded-full transition-opacity duration-300 ${showFloatingShare ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Button
          isIconOnly
          size="sm"
          color="primary"
          variant="flat"
          aria-label="Share on Twitter"
          as="a"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="logos:twitter" />
        </Button>
        <Button
          isIconOnly
          size="sm"
          color="primary"
          variant="flat"
          aria-label="Share on Facebook"
          as="a"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="logos:facebook" />
        </Button>
        <Button
          isIconOnly
          size="sm"
          color="primary"
          variant="flat"
          aria-label="Share on Telegram"
          as="a"
          href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="logos:telegram" />
        </Button>
      </div>
    </motion.div>
  );
};

export default BlogPostPage;