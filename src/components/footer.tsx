import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Button } from '@heroui/react';
import { useContactModalStore } from '../hooks/use-contact-modal-store';

// Mock data that would come from CMS
const footerData = {
  contactInfo: {
    email: 'hello@munificent.studio',
    phone: '+7 (999) 123-45-67',
    address: 'г. Москва, ул. Примерная, 123'
  },
  socialLinks: [
    { name: 'Telegram', icon: 'logos:telegram', url: 'https://t.me/munificentstudio' },
    { name: 'Instagram', icon: 'logos:instagram-icon', url: 'https://instagram.com/munificentstudio' },
    { name: 'Behance', icon: 'logos:behance', url: 'https://behance.net/munificentstudio' },
    { name: 'GitHub', icon: 'logos:github-icon', url: 'https://github.com/munificentstudio' },
  ],
  menuSections: [
    {
      title: 'Услуги',
      links: [
        { name: 'Дизайн', url: '/services/design' },
        { name: 'Веб-разработка', url: '/services/web-development' },
        { name: 'Telegram-боты', url: '/services/telegram-bots' },
      ]
    },
    {
      title: 'Компания',
      links: [
        { name: 'О нас', url: '/about' },
        { name: 'Блог', url: '/blog' },
        { name: 'Контакты', url: '#', isModalTrigger: true },
      ]
    },
    {
      title: 'Правовая информация',
      links: [
        { name: 'Политика конфиденциальности', url: '/privacy-policy' },
        { name: 'Условия использования', url: '/terms-of-service' },
      ]
    }
  ]
};

const Footer: React.FC = () => {
  const { open } = useContactModalStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-content1 border-t border-divider py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Studio info column */}
          <div className="space-y-4">
            <Link to="/" className="font-bold text-xl flex items-center">
              <Icon icon="gravity-ui:flow" className="text-primary mr-2 text-3xl" />
              <span>Munificent Studio</span>
            </Link>
            <p className="text-foreground-500 mt-2">
              Создаем цифровые продукты с уникальным дизайном и передовым кодом.
            </p>
            <div className="flex space-x-4 mt-4">
              {footerData.socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground-400 hover:text-primary transition-colors"
                >
                  <Icon icon={social.icon} className="text-xl" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu sections */}
          {footerData.menuSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-lg">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isModalTrigger ? (
                      <button 
                        onClick={open}
                        className="text-foreground-500 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link 
                        to={link.url}
                        className="text-foreground-500 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info column */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Контакты</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-foreground-500">
                <Icon icon="lucide:mail" className="text-primary" />
                <a href={`mailto:${footerData.contactInfo.email}`} className="hover:text-primary transition-colors">
                  {footerData.contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-foreground-500">
                <Icon icon="lucide:phone" className="text-primary" />
                <a href={`tel:${footerData.contactInfo.phone.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
                  {footerData.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-foreground-500">
                <Icon icon="lucide:map-pin" className="text-primary mt-1" />
                <span>{footerData.contactInfo.address}</span>
              </li>
            </ul>
            <Button 
              color="primary" 
              variant="flat" 
              onPress={open}
              className="mt-4"
              endContent={<Icon icon="lucide:arrow-up-right" />}
            >
              Обсудить проект
            </Button>
          </div>
        </div>

        <div className="border-t border-divider mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground-400">
            © {currentYear} Munificent Studio. Все права защищены.
          </p>
          <p className="text-sm text-foreground-400 mt-2 md:mt-0">
            Дизайн и разработка <span className="text-primary">Munificent Studio</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;