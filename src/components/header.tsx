import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem,
  Button,
  Switch,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useThemeStore } from '../hooks/use-theme-store';
import { useContactModalStore } from '../hooks/use-contact-modal-store';

const Header: React.FC = () => {
  const contactModalStore = useContactModalStore();
  const themeStore = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  
  // Update body class when theme changes
  React.useEffect(() => {
    document.body.classList.toggle('dark', themeStore.theme === 'dark');
  }, [themeStore.theme]);
  
  // Check if a navigation item is active
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Navigation items array for reuse in both desktop and mobile menus
  const navigationItems = [
    { path: '/services', label: 'Услуги' },
    { path: '/cases', label: 'Кейсы' },
    { path: '/about', label: 'О нас' },
    { path: '/blog', label: 'Блог' },
  ];
  
  return (
    <Navbar 
      className="bg-background/70 backdrop-blur-md border-b border-divider"
      maxWidth="xl"
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen} // Add this prop to control menu state explicitly
    >
      {/* Add mobile menu toggle button */}
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      
      <NavbarBrand>
        <Link to="/" className="font-bold text-inherit flex items-center">
          <Icon 
            icon="gravity-ui:flow" 
            className="text-primary mr-2 text-3xl" 
          />
          <span>Munificent Studio</span>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        {navigationItems.map((item) => (
          <NavbarItem key={item.path} isActive={isActive(item.path)}>
            <Link 
              to={item.path} 
              className={`${isActive(item.path) ? 'text-primary' : 'text-foreground'}`}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <div className="flex items-center gap-2">
            <Icon icon={themeStore.theme === 'light' ? 'lucide:sun' : 'lucide:moon'} className="text-foreground-500" />
            <Switch
              size="sm"
              color="primary"
              isSelected={themeStore.theme === 'dark'}
              onValueChange={() => themeStore.toggleTheme()}
            />
          </div>
        </NavbarItem>
        <NavbarItem>
          <Button 
            color="primary" 
            variant="shadow" 
            onPress={() => contactModalStore.open()}
            endContent={<Icon icon="lucide:arrow-up-right" />}
          >
            Связаться
          </Button>
        </NavbarItem>
      </NavbarContent>
      
      {/* Mobile menu */}
      <NavbarMenu className="pt-6">
        {navigationItems.map((item) => (
          <NavbarMenuItem key={item.path}>
            <Link 
              to={item.path}
              className={`w-full py-2 ${
                isActive(item.path) 
                  ? 'text-primary font-medium' 
                  : 'text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
        
        {/* Theme toggle in mobile menu */}
        <NavbarMenuItem className="mt-4">
          <div className="flex items-center gap-2">
            <Icon icon={themeStore.theme === 'light' ? 'lucide:sun' : 'lucide:moon'} className="text-foreground-500" />
            <span className="mr-2">Тема:</span>
            <Switch
              size="sm"
              color="primary"
              isSelected={themeStore.theme === 'dark'}
              onValueChange={() => themeStore.toggleTheme()}
            />
          </div>
        </NavbarMenuItem>
        
        {/* Contact button in mobile menu */}
        <NavbarMenuItem className="mt-4">
          <Button 
            color="primary" 
            variant="shadow" 
            onPress={() => {
              contactModalStore.open();
              setIsMenuOpen(false);
            }}
            endContent={<Icon icon="lucide:arrow-up-right" />}
            className="w-full"
          >
            Связаться
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;