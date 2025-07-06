'use client';

import { toast } from '@/components/ui/use-toast';

export function showErrorToast(message: string) {
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });
}

export function showSuccessToast(message: string) {
  toast({
    title: 'Success',
    description: message,
  });
}
