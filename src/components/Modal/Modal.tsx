import { createContext, useContext, type ReactNode } from 'react';
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
  background: ${({ theme }) => theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${({ theme }) => theme.zIndex.modal};
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background.paper};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 24px;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.modal};
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding-right: 40px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CloseButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral[100]};
  }
`;

const Body = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border.main};
    border-radius: 2px;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
`;

interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Root = ({ isOpen, onClose, children }: ModalRootProps) => {
  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <Portal>
        <ModalOverlay onClick={e => e.stopPropagation()}>
          <ModalContent onClick={e => e.stopPropagation()}>{children}</ModalContent>
        </ModalOverlay>
      </Portal>
    </ModalContext.Provider>
  );
};

interface ModalHeaderProps {
  children: ReactNode;
  showCloseButton?: boolean;
}

const HeaderComponent = ({ children, showCloseButton = true }: ModalHeaderProps) => {
  const { onClose } = useModalContext();
  return (
    <Header>
      {children}
      {showCloseButton && (
        <CloseButton onClick={onClose} title="Close">
          <X size={20} />
        </CloseButton>
      )}
    </Header>
  );
};

interface ModalTitleProps {
  children: ReactNode;
}

const TitleComponent = ({ children }: ModalTitleProps) => {
  return <Title>{children}</Title>;
};

interface ModalBodyProps {
  children: ReactNode;
}

const BodyComponent = ({ children }: ModalBodyProps) => {
  return <Body>{children}</Body>;
};

interface ModalFooterProps {
  children: ReactNode;
}

const FooterComponent = ({ children }: ModalFooterProps) => {
  return <Footer>{children}</Footer>;
};

export const Modal = {
  Root,
  Header: HeaderComponent,
  Title: TitleComponent,
  Body: BodyComponent,
  Footer: FooterComponent,
};
