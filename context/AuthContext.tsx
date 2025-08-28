// src/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import CookieService from '@/utils/cookies';
import { cookieHelpers } from '@/utils/cookie-helpers';
import authService, { SigninRequest, SignupRequest } from '@/services/auth-services';

// Types
interface User {
  userId: string;
  role: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean; // This will now be a state value, not a computed value
  error: string | null;
}

interface AuthActions {
  signup: (data: SignupRequest) => Promise<{ success: boolean; message: string }>;
  signin: (data: SigninRequest) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  refreshUserData: () => void;
  clearError: () => void;
}

type AuthContextType = AuthState & AuthActions;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Make this a state value
  const [error, setError] = useState<string | null>(null);

  // Token management functions
  const getAccessToken = useCallback(() => cookieHelpers.getAccessToken(), []);
  const setAccessToken = useCallback((token: string) => cookieHelpers.setAccessToken(token), []);
  const removeTokens = useCallback(() => cookieHelpers.removeTokens(), []);

  // Initialize auth service with token providers
  useEffect(() => {
    authService.setTokenProvider(getAccessToken, setAccessToken, removeTokens);
    authService.setRefreshHandler(handleTokenRefresh);
  }, [getAccessToken, setAccessToken, removeTokens]);

  // Get current user from stored token
  const getCurrentUser = useCallback((): User | null => {
    const token = getAccessToken();
    if (!token) return null;
    
    return authService.getUserFromToken(token);
  }, [getAccessToken]);

  // Check if user is authenticated - helper function (not used in context value)
  const checkIsAuthenticated = useCallback((): boolean => {
    const token = getAccessToken();
    if (!token) return false;
    
    return !authService.isTokenExpired(token);
  }, [getAccessToken]);

  // Handle token refresh
  const handleTokenRefresh = useCallback(async (): Promise<{ success: boolean; accessToken?: string }> => {
    try {
      const refreshToken = cookieHelpers.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await authService.refreshToken({ refreshToken });
      
      if (!response.error && response.data?.accessToken) {
        const { accessToken } = response.data;
        
        // Store new token
        cookieHelpers.setAccessToken(accessToken);
        
        // Update user data
        const userData = authService.getUserFromToken(accessToken);
        setUser(userData);
        setIsAuthenticated(true); // Update state
        
        return { success: true, accessToken };
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      return { success: false };
    }
  }, []);

  // Initialize auth state
  const initializeAuth = useCallback(() => {
    try {
      const currentUser = getCurrentUser();
      const authenticated = checkIsAuthenticated();
      
      if (authenticated && currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
        // Clear invalid tokens
        if (getAccessToken()) {
          removeTokens();
        }
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      setUser(null);
      setIsAuthenticated(false);
      setError('Failed to initialize authentication');
    } finally {
      setLoading(false);
    }
  }, [getCurrentUser, checkIsAuthenticated, getAccessToken, removeTokens]);

  // Signup function
  const signup = async (signupData: SignupRequest): Promise<{ success: boolean; message: string }> => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authService.signup(signupData);
      
      if (!response.error) {
        return { success: true, message: response.message || 'Signup successful' };
      } else {
        return { success: false, message: response.message || 'Signup failed' };
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      const message = error.message || 'Network error occurred';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Signin function
  const signin = async (signinData: SigninRequest): Promise<{ success: boolean; message: string }> => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authService.signin(signinData);
      
      if (!response.error && response.data) {
        const { accessToken, refreshToken } = response.data;
        
        // Store tokens
        cookieHelpers.setAccessToken(accessToken);
        if (refreshToken) {
          cookieHelpers.setRefreshToken(refreshToken);
        }
        
        // Set user data
        const userData = authService.getUserFromToken(accessToken);
        setUser(userData);
        setIsAuthenticated(true); // Update state
        
        return { success: true, message: response.message || 'Login successful' };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Signin error:', error);
      const message = error.message || 'Network error occurred';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = useCallback(() => {
    // Clear tokens and user data
    removeTokens();
    setUser(null);
    setIsAuthenticated(false); // Update state
    setError(null);
    
    // Clear any session storage items related to auth
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      sessionStorage.removeItem('loginEmail');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('returnPath');
      
      // Trigger storage event for multi-tab logout
      localStorage.setItem('logout-event', Date.now().toString());
      localStorage.removeItem('logout-event');
    }
    
    // Navigate to signin page
    router.push('/signin');
  }, [removeTokens, router]);

  // Refresh user data from token
  const refreshUserData = useCallback(() => {
    const currentUser = getCurrentUser();
    const authenticated = checkIsAuthenticated();
    
    if (authenticated && currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [getCurrentUser, checkIsAuthenticated]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Auto-refresh token logic
  useEffect(() => {
    if (!user || !isAuthenticated) return;

    const token = getAccessToken();
    if (!token) return;

    const expiryTime = authService.getTokenExpiryTime(token);
    if (!expiryTime) return;

    const currentTime = Date.now();
    const timeUntilExpiry = expiryTime - currentTime;
    
    // Refresh token 5 minutes before expiry
    const refreshTime = timeUntilExpiry - (5 * 60 * 1000);

    if (refreshTime > 0) {
      const timer = setTimeout(async () => {
        const result = await handleTokenRefresh();
        if (!result.success) {
          console.error('Auto token refresh failed');
          logout();
        }
      }, refreshTime);

      return () => clearTimeout(timer);
    }
  }, [user, isAuthenticated, getAccessToken, handleTokenRefresh, logout]);

  // Initialize auth on mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Listen for storage changes (for multi-tab logout)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'logout-event') {
        setUser(null);
        setIsAuthenticated(false);
        setError(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Check for token expiry on window focus
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleFocus = () => {
      if (user && !checkIsAuthenticated()) {
        logout();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [user, checkIsAuthenticated, logout]);

  const value: AuthContextType = {
    // State
    user,
    loading,
    isAuthenticated, // Now a state value, not computed
    error,
    
    // Actions
    signup,
    signin,
    logout,
    refreshUserData,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};