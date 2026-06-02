'use client';

import { useCallback } from 'react';
import { useToastStore } from './useToast';

export const useNotification = () => {
  const { addToast } = useToastStore();

  const notifySuccess = useCallback(
    (message: string) => {
      addToast(message, 'success', 3000);
    },
    [addToast]
  );

  const notifyError = useCallback(
    (message: string) => {
      addToast(message, 'error', 3000);
    },
    [addToast]
  );

  const notifyInfo = useCallback(
    (message: string) => {
      addToast(message, 'info', 3000);
    },
    [addToast]
  );

  const notifyWarning = useCallback(
    (message: string) => {
      addToast(message, 'warning', 3000);
    },
    [addToast]
  );

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
  };
};
