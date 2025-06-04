import React from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input, 
  Textarea, 
  Checkbox,
  Link 
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useContactModalStore } from '../hooks/use-contact-modal-store';

interface ContactModalProps {
  isOpen: boolean;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen }) => {
  const { close } = useContactModalStore();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [agreeTerms, setAgreeTerms] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Пожалуйста, введите имя';
    if (!email.trim()) {
      newErrors.email = 'Пожалуйста, введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Пожалуйста, введите корректный email';
    }
    if (!message.trim()) newErrors.message = 'Пожалуйста, введите сообщение';
    if (!agreeTerms) newErrors.agreeTerms = 'Необходимо согласие с политикой конфиденциальности';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send the form data to your backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      
      // Success - reset form and close modal
      setName('');
      setEmail('');
      setMessage('');
      setAgreeTerms(false);
      close();
      
      // Here you would show a success toast notification
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      // Here you would show an error toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={() => close()} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Обсудить проект
              <p className="text-small text-foreground-500 font-normal mt-1">
                Расскажите немного о вашем проекте, и мы свяжемся с вами в ближайшее время
              </p>
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    autoFocus
                    label="Имя"
                    placeholder="Введите ваше имя"
                    value={name}
                    onValueChange={setName}
                    isInvalid={!!errors.name}
                    errorMessage={errors.name}
                    startContent={
                      <Icon icon="lucide:user" className="text-foreground-400" />
                    }
                  />
                  <Input
                    label="Email"
                    placeholder="example@company.com"
                    value={email}
                    onValueChange={setEmail}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    startContent={
                      <Icon icon="lucide:mail" className="text-foreground-400" />
                    }
                  />
                  <Textarea
                    label="Сообщение"
                    placeholder="Расскажите о вашем проекте..."
                    value={message}
                    onValueChange={setMessage}
                    isInvalid={!!errors.message}
                    errorMessage={errors.message}
                    minRows={3}
                  />
                  <Checkbox
                    isSelected={agreeTerms}
                    onValueChange={setAgreeTerms}
                    isInvalid={!!errors.agreeTerms}
                  >
                    <span className="text-small">
                      Я согласен с {' '}
                      <Link href="/privacy-policy" color="primary" underline="always">
                        политикой конфиденциальности
                      </Link>
                    </span>
                  </Checkbox>
                  {errors.agreeTerms && (
                    <p className="text-tiny text-danger mt-1">{errors.agreeTerms}</p>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Отмена
                </Button>
                <Button 
                  color="primary" 
                  type="submit" 
                  isLoading={isSubmitting}
                  startContent={!isSubmitting && <Icon icon="lucide:send" />}
                >
                  Отправить
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ContactModal;