import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Modal, ModalProps } from './modal';

export interface UseModalOptions {
  title?: string;
  content?: React.ReactNode | string;
  hideCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

interface ModalContextValue {
  showModal: (options: UseModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UseModalOptions & { visible: boolean }>({
    visible: false,
    title: undefined,
    content: undefined,
    hideCancel: false,
    confirmText: undefined,
    cancelText: undefined,
    onConfirm: undefined,
    onClose: undefined,
  });

  const showModal = useCallback((options: UseModalOptions) => {
    setState({
      visible: true,
      ...options,
    });
  }, []);

  const hideModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      visible: false,
    }));
  }, []);

  const handleConfirm = useCallback(() => {
    setState((prev) => ({
      ...prev,
      visible: false,
    }));
    state.onConfirm?.();
  }, [state.onConfirm]);

  const handleClose = useCallback(() => {
    setState((prev) => ({
      ...prev,
      visible: false,
    }));
    state.onClose?.();
  }, [state.onClose]);

  const modalProps = useMemo<ModalProps>(() => ({
    visible: state.visible,
    title: state.title,
    children: state.content,
    hideCancel: state.hideCancel,
    confirmText: state.confirmText,
    cancelText: state.cancelText,
    onConfirm: handleConfirm,
    onClose: handleClose,
  }), [state, handleConfirm, handleClose]);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal {...modalProps} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}
