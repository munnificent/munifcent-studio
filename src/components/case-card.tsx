import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, Chip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import VanillaTilt from 'vanilla-tilt';

export interface CaseProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  categories: string[];
}

const CaseCard: React.FC<{ caseItem: CaseProps }> = ({ caseItem }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 5, 
        speed: 400,
        glare: true,
        'max-glare': 0.3,
        gyroscope: false
      });
    }
    
    // Clean up
    return () => {
      if (cardRef.current && cardRef.current.vanillaTilt) {
        cardRef.current.vanillaTilt.destroy();
      }
    };
  }, []);
  
  return (
    <Card ref={cardRef} className="tilt-card h-full">
      <CardBody className="p-0 h-60 overflow-hidden">
        <img 
          src={caseItem.imageUrl} 
          alt={caseItem.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out-expo hover:scale-105"
        />
      </CardBody>
      <CardFooter className="flex flex-col items-start text-left p-6">
        <div className="flex flex-wrap gap-1 mb-3">
          {caseItem.categories.map((category) => (
            <Chip key={category} size="sm" color="primary" variant="flat">
              {category}
            </Chip>
          ))}
        </div>
        <h3 className="text-xl font-semibold">{caseItem.title}</h3>
        <p className="text-foreground-600 mt-2 line-clamp-2">{caseItem.description}</p>
        <Button 
          as={Link}
          to={`/cases/${caseItem.slug}`}
          color="primary" 
          variant="light" 
          endContent={<Icon icon="lucide:arrow-right" />}
          className="mt-4"
        >
          Смотреть кейс
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CaseCard;