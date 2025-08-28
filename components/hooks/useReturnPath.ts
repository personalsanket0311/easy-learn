// hooks/useReturnPath.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export const useReturnPath = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated && typeof window !== 'undefined') {
      const returnPath = sessionStorage.getItem('returnPath');
      if (returnPath && returnPath !== '/signin' && returnPath !== '/signup') {
        sessionStorage.removeItem('returnPath');
        router.push(returnPath);
      }
    }
  }, [isAuthenticated, loading, router]);
};