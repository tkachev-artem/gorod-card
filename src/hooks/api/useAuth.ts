'use client';

import { useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from '@/utils/cookies';

interface UserData {
  email: string;
  password: string;
  name?: string;
}

interface UseAuthReturn {
  isAuthorized: boolean | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: UserData) => Promise<boolean>;
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Проверка токена из куки
      const token = getCookie('authToken');
      
      // Проверка токена из localStorage (для обратной совместимости)
      let localToken = null;
      if (typeof window !== 'undefined') {
        try {
          localToken = localStorage.getItem('authToken');
        } catch (e) {
          console.error('Ошибка при доступе к localStorage:', e);
        }
      }

      // Если токен найден в localStorage, но не в куки, сохраняем его в куки
      if (localToken && !token) {
        setCookie('authToken', localToken, 7); // Сохраняем на 7 дней
      }

      const hasToken = !!(token || localToken);
      
      // Если есть токен, проверяем его валидность через API
      if (hasToken) {
        try {
          // Здесь должен быть запрос к API для проверки токена
          // const response = await api.auth.checkToken();
          // setIsAuthorized(response.isValid);
          setIsAuthorized(true); // Временное решение
        } catch (error) {
          console.error('Ошибка при проверке токена:', error);
          setIsAuthorized(false);
          deleteCookie('authToken');
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
          }
        }
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error('Ошибка при проверке авторизации:', error);
      setError('Ошибка при проверке авторизации');
      setIsAuthorized(false);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Здесь должен быть запрос к API для входа
      // Мы не используем параметры email и password в этой mock-реализации,
      // но они будут использоваться в реальном API запросе
      // const response = await api.auth.login({ email, password });
      
      // Временное решение для демонстрации
      const mockResponse = { success: true, token: 'mock-token-12345' };
      
      if (mockResponse.success && mockResponse.token) {
        // Сохраняем токен в куки и localStorage
        setCookie('authToken', mockResponse.token, 7); // Сохраняем на 7 дней
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', mockResponse.token);
        }
        
        setIsAuthorized(true);
        return true;
      } else {
        throw new Error('Неверный логин или пароль');
      }
    } catch (error) {
      console.error('Ошибка при входе:', error);
      setError(error instanceof Error ? error.message : 'Ошибка при входе');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    deleteCookie('authToken');
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    
    setIsAuthorized(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const register = async (userData: UserData): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      // Здесь должен быть запрос к API для регистрации
      // Мы не используем параметр userData в этой mock-реализации,
      // но он будет использоваться в реальном API запросе
      // const response = await api.auth.register(userData);
      
      // Временное решение для демонстрации
      const mockResponse = { success: true, token: 'mock-token-new-user' };
      
      if (mockResponse.success && mockResponse.token) {
        // Сохраняем токен в куки и localStorage
        setCookie('authToken', mockResponse.token, 7); // Сохраняем на 7 дней
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', mockResponse.token);
        }
        
        setIsAuthorized(true);
        return true;
      } else {
        throw new Error('Ошибка при регистрации');
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setError(error instanceof Error ? error.message : 'Ошибка при регистрации');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthorized,
    isLoading,
    error,
    login,
    logout,
    register
  };
}; 