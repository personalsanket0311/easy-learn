// src/services/auth-service.ts
import axios, { AxiosInstance } from 'axios';

const apiBaseUrl: string = process.env.NEXT_PUBLIC_SERVER || "";

// Types for API requests and responses
export interface SignupRequest {
  role?: string; // Made optional since it will be set by default
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  qualification: string;
  gender: string;
  email: string;
  emailPassword: string;
}

export interface SigninRequest {
  role?: string; // Made optional since it will be set by default
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthResponse {
  error: boolean;
  message: string;
  data?: {
    accessToken: string;
    refreshToken?: string;
    user?: any;
  };
}

export interface TokenData {
  userId: string;
  role: string;
  email: string;
  exp: number;
  iat: number;
}

class AuthService {
  private static instance: AuthService;
  private apiClient: AxiosInstance;
  private tokenProvider: (() => string | null) | null = null;
  private tokenSetter: ((token: string) => void) | null = null;
  private tokenRemover: (() => void) | null = null;

  private constructor() {
    this.apiClient = axios.create({
      baseURL: apiBaseUrl,
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Dependency injection for token management
  public setTokenProvider(
    tokenProvider: () => string | null | undefined,
    tokenSetter: (token: string) => void,
    tokenRemover: () => void
  ) {
    this.tokenProvider = () => tokenProvider() || null;
    this.tokenSetter = tokenSetter;
    this.tokenRemover = tokenRemover;
  }

  private setupInterceptors() {
    // Request interceptor
    this.apiClient.interceptors.request.use(
      (config) => {
        const token = this.tokenProvider?.();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for handling token refresh
    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't tried refreshing yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Try to refresh the token through the token provider
            const refreshResult = await this.handleTokenRefresh();
            
            if (refreshResult.success && refreshResult.accessToken) {
              // Retry the original request with new token
              originalRequest.headers.Authorization = `Bearer ${refreshResult.accessToken}`;
              return this.apiClient(originalRequest);
            } else {
              throw new Error('Token refresh failed');
            }
          } catch (refreshError) {
            // If refresh failed, notify token remover
            this.tokenRemover?.();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );
  }

  private async handleTokenRefresh(): Promise<{ success: boolean; accessToken?: string }> {
    // This will be called by the interceptor and handled by the context
    return { success: false };
  }

  // Set refresh handler from context
  public setRefreshHandler(handler: () => Promise<{ success: boolean; accessToken?: string }>) {
    this.handleTokenRefresh = handler;
  }

  // API Methods - Pure API calls only
  public async signup(signupData: SignupRequest): Promise<AuthResponse> {
    try {
      // Ensure role is always set to 'student' for signup
      const dataWithRole = {
        ...signupData,
        role: 'student'
      };
      
      const response = await this.apiClient.post('/student/signup', dataWithRole);
      return response.data;
    } catch (error: any) {
      throw this.handleApiError(error);
    }
  }

  public async signin(signinData: SigninRequest): Promise<AuthResponse> {
    try {
      // Ensure role is always set to 'student' for signin
      const dataWithRole = {
        ...signinData,
        role: 'student'
      };
      
      const response = await this.apiClient.post('/student/signin', dataWithRole);
      return response.data;
    } catch (error: any) {
      throw this.handleApiError(error);
    }
  }

  public async refreshToken(refreshTokenData: RefreshTokenRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${apiBaseUrl}/student/refresh`, refreshTokenData);
      return response.data;
    } catch (error: any) {
      throw this.handleApiError(error);
    }
  }

  // Utility methods for token handling (pure functions)
  public static parseJwtToken(token: string): TokenData | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to parse JWT token:', error);
      return null;
    }
  }

  public static isTokenExpired(token: string): boolean {
    const decoded = this.parseJwtToken(token);
    if (!decoded) return true;
    
    return decoded.exp * 1000 < Date.now();
  }

  public static getTokenExpiryTime(token: string): number | null {
    const decoded = this.parseJwtToken(token);
    if (!decoded) return null;
    
    return decoded.exp * 1000;
  }

  public static getUserFromToken(token: string): { userId: string; role: string; email: string } | null {
    const decoded = this.parseJwtToken(token);
    if (!decoded || this.isTokenExpired(token)) return null;
    
    return {
      userId: decoded.userId,
      role: decoded.role,
      email: decoded.email,
    };
  }

  // Instance methods that delegate to static methods for convenience
  public getUserFromToken(token: string): { userId: string; role: string; email: string } | null {
    return AuthService.getUserFromToken(token);
  }

  public isTokenExpired(token: string): boolean {
    return AuthService.isTokenExpired(token);
  }

  public getTokenExpiryTime(token: string): number | null {
    return AuthService.getTokenExpiryTime(token);
  }

  private handleApiError(error: any): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    if (error.message) {
      return new Error(error.message);
    }
    return new Error('An unknown error occurred');
  }
}

// Export singleton instance
const authService = AuthService.getInstance();
export default authService;