import { useState, useCallback } from 'react';

const useConfirmation = () => {
  const [confirmationState, setConfirmationState] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: null,
    onCancel: null,
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    isDeleting: false,
    children: null,
    size: 'md'
  });

  const showConfirmation = useCallback(({
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    type = 'warning',
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    children = null,
    size = 'md'
  }) => {
    setConfirmationState({
      isOpen: true,
      title,
      message,
      type,
      onConfirm,
      onCancel,
      confirmText,
      cancelText,
      isDeleting: false,
      children,
      size
    });
  }, []);

  const hideConfirmation = useCallback(() => {
    setConfirmationState(prev => ({
      ...prev,
      isOpen: false
    }));
  }, []);

  const setDeleting = useCallback((isDeleting) => {
    setConfirmationState(prev => ({
      ...prev,
      isDeleting
    }));
  }, []);

  const handleConfirm = useCallback(async () => {
    if (confirmationState.onConfirm) {
      setDeleting(true);
      try {
        await confirmationState.onConfirm();
      } finally {
        setDeleting(false);
        hideConfirmation();
      }
    } else {
      hideConfirmation();
    }
  }, [confirmationState.onConfirm, setDeleting, hideConfirmation]);

  const handleCancel = useCallback(() => {
    if (confirmationState.onCancel) {
      confirmationState.onCancel();
    }
    hideConfirmation();
  }, [confirmationState.onCancel, hideConfirmation]);

  return {
    confirmationState,
    showConfirmation,
    hideConfirmation,
    setDeleting,
    handleConfirm,
    handleCancel
  };
};

export default useConfirmation; 