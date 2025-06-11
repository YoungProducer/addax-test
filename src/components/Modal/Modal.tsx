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
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[100]};
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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  padding-right: ${({ theme }) => theme.spacing.lg};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const Modal = {
  Root,
  Header,
  Title,
  Body,
  Footer,
};
