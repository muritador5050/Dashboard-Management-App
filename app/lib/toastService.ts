import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

type ToastStatus = 'success' | 'error' | 'warning' | 'info';

interface ToastOptions {
  title: string;
  description?: string | undefined;
  status?: ToastStatus;
  duration?: number;
  position?:
    | 'top'
    | 'top-right'
    | 'top-left'
    | 'bottom'
    | 'bottom-right'
    | 'bottom-left';
}

export const showToast = ({
  title,
  description,
  status = 'info',
  duration = 3000,
  position = 'top',
}: ToastOptions): void => {
  toast({
    title,
    description,
    status,
    duration,
    isClosable: true,
    position,
  });
};
