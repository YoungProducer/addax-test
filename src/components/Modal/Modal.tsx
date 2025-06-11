import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { X } from 'lucide-react';
import { Portal } from '../Portal/Portal';

const ModalContext = createContext<{
  isOpen: boolean;
  onClose: () => void;
} | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within a Modal.Root');
  }
  return context;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 8px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    background: #f5f5f5;
  }
`;

interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Root = ({ isOpen, onClose, children }: ModalRootProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <Portal>
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContent onClick={e => e.stopPropagation()}>{children}</ModalContent>
        </ModalOverlay>
      </Portal>
    </ModalContext.Provider>
  );
};

const HeaderContainer = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const Header = ({ children }: { children: ReactNode }) => {
  const { onClose } = useModalContext();
  return (
    <HeaderContainer>
      <CloseButton onClick={onClose}>
        <X size={20} />
      </CloseButton>
      {children}
    </HeaderContainer>
  );
};

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #333;
  padding-right: 32px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const Modal = {
  Root,
  Header,
  Title,
  Body,
  Footer,
};
