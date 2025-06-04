import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageUrl: string;
  imageHoverUrl: string;
  socialLinks: { icon: string; url: string }[];
}

// Mock team data (would come from CMS in a real app)
const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Александр Петров',
    position: 'Креативный директор',
    imageUrl: 'https://img.heroui.chat/image/avatar?w=400&h=500&u=1',
    imageHoverUrl: 'https://img.heroui.chat/image/avatar?w=400&h=500&u=2',
    socialLinks: [
      { icon: 'logos:telegram', url: 'https://t.me/username' },
      { icon: 'logos:behance', url: 'https://behance.net/username' },
    ]
  },
  {
    id: '2',
    name: 'Екатерина Иванова',
    position: 'UI/UX Дизайнер',
    imageUrl: 'https://img.heroui.chat/image/avatar?w=400&h=500&u=3',
    imageHoverUrl: 'https://img.heroui.chat/image/avatar?w=400&h=500&u=4',
    socialLinks: [
      { icon: 'logos:telegram', url: 'https://t.me/username' },
      { icon: 'logos:dribbble-icon', url: 'https://dribbble.com/username' },
      { icon: 'logos:instagram-icon', url: 'https://instagram.com/username' },
    ]
  },
  {
    id: '3',
    name: 'Дмитрий Сидоров',
    position: 'Senior React Developer',
    imageUrl: 'https://img.heroui.chat/image/avatar?w=400&h=500&u=5',
    imageHoverUrl: 'https://img.heroui.chat/image/avatar?w=400&h=500&u=6',
    socialLinks: [
      { icon: 'logos:github-icon', url: 'https://github.com/username' },
      { icon: 'logos:linkedin-icon', url: 'https://linkedin.com/in/username' },
    ]
  },
  {
    id: '4',
    name: 'Анна Кузнецова',
    position: 'Project Manager',
    imageUrl: 'https://img.heroui.chat/image/avatar?w=400&h=500&u=7',
    imageHoverUrl: 'https://img.heroui.chat/image/avatar?w=400&h=500&u=8',
    socialLinks: [
      { icon: 'logos:telegram', url: 'https://t.me/username' },
      { icon: 'logos:linkedin-icon', url: 'https://linkedin.com/in/username' },
    ]
  }
];

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

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div 
      className="group relative overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4]">
        {/* Primary image */}
        <img 
          src={member.imageUrl} 
          alt={member.name} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        />
        
        {/* Hover image */}
        <img 
          src={member.imageHoverUrl} 
          alt={`${member.name} hover`} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out-expo">
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-white/80">{member.position}</p>
          
          {/* Social icons */}
          <div className="flex gap-3 mt-3">
            {member.socialLinks.map((link, index) => (
              <a 
                key={index} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary-200 transition-colors"
              >
                <Icon icon={link.icon} className="text-xl" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamGrid: React.FC = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {teamMembers.map((member) => (
        <motion.div key={member.id} variants={item}>
          <TeamMemberCard member={member} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TeamGrid;