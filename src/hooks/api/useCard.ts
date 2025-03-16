'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from './useAuth';

interface CardInfo {
  cardNumber: string | null;
  balance: number;
  bonusBalance: number;
  isActive: boolean;
}

interface UseCardReturn {
  cardInfo: CardInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchCardInfo: () => Promise<void>;
  requestCard: () => Promise<boolean>;
  activateCard: (code: string) => Promise<boolean>;
}

export const useCard = (): UseCardReturn => {
  const { isAuthorized } = useAuth();
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthorized) {
      fetchCardInfo();
    }
  }, [isAuthorized]);

  const fetchCardInfo = async (): Promise<void> => {
    if (!isAuthorized) return;

    try {
      setIsLoading(true);
      setError(null);

      // Здесь должен быть запрос к API для получения информации о карте
      // const response = await api.vcard.getInfo();
      
      // Временное решение для демонстрации
      const mockResponse = { 
        success: true,
        cardNumber: '1234 5678 9012 3456', 
        balance: 1500, 
        bonusBalance: 250,
        isActive: true
      };
      
      if (mockResponse.success) {
        setCardInfo({
          cardNumber: mockResponse.cardNumber,
          balance: mockResponse.balance,
          bonusBalance: mockResponse.bonusBalance,
          isActive: mockResponse.isActive
        });
      } else {
        setCardInfo(null);
      }
    } catch (error) {
      console.error('Ошибка при получении информации о карте:', error);
      setError('Не удалось получить информацию о карте');
      setCardInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const requestCard = async (): Promise<boolean> => {
    if (!isAuthorized) return false;

    try {
      setIsLoading(true);
      setError(null);

      // Здесь должен быть запрос к API для запроса выпуска карты
      // const response = await api.vcard.request();
      
      // Временное решение для демонстрации
      const mockResponse = { success: true };
      
      return mockResponse.success;
    } catch (error) {
      console.error('Ошибка при запросе карты:', error);
      setError('Не удалось отправить запрос на выпуск карты');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const activateCard = async (code: string): Promise<boolean> => {
    if (!isAuthorized) return false;

    try {
      setIsLoading(true);
      setError(null);

      // Здесь должен быть запрос к API для активации карты
      // const response = await api.vcard.activate(code);
      
      // Временное решение для демонстрации
      const mockResponse = { 
        success: true,
        cardNumber: '1234 5678 9012 3456', 
        balance: 0, 
        bonusBalance: 100,
        isActive: true
      };
      
      if (mockResponse.success) {
        setCardInfo({
          cardNumber: mockResponse.cardNumber,
          balance: mockResponse.balance,
          bonusBalance: mockResponse.bonusBalance,
          isActive: mockResponse.isActive
        });
        return true;
      } else {
        throw new Error('Неверный код активации');
      }
    } catch (error) {
      console.error('Ошибка при активации карты:', error);
      setError(error instanceof Error ? error.message : 'Не удалось активировать карту');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    cardInfo,
    isLoading,
    error,
    fetchCardInfo,
    requestCard,
    activateCard
  };
}; 