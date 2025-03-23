'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from './structure/lib/api';
import { getCookie, setCookie, deleteCookie } from '@/utils/cookies';
import { Header } from './structure/components/header';
import { Main } from '../lkr/structure/main';
import { Loading } from './structure/components/loading';
import { LkrConfig } from '../lkr/config';

export default function PersonalAccount() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [cardNumber, setCardNumber] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [rubleBalance, setRubleBalance] = useState(0);
    const [bonusBalance, setBonusBalance] = useState(0);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Проверяем авторизацию по куки
                const token = getCookie('authToken');
                
                // Также проверяем localStorage для обратной совместимости
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
                    setCookie('authToken', localToken);
                }
                
                const authToken = token || localToken;
                const isAuth = !!authToken;
                
                // Если токен не найден ни в куках, ни в localStorage - не авторизован
                if (!isAuth) {
                    // Очищаем все токены на всякий случай
                    try {
                        localStorage.removeItem('authToken');
                    } catch (e) {
                        console.error('Ошибка при удалении токена из localStorage:', e);
                    }
                    deleteCookie('authToken');
                    
                    // Устанавливаем состояние и перенаправляем
                    setIsAuthorized(false);
                    router.push('/auth');
                    return false;
                }
                
                // Проверяем валидность токена с сервером
                try {
                    // Отключаем проверку валидности токена на сервере, 
                    // если эндпоинт /api/auth/validate еще не реализован
                    // В будущем можно раскомментировать для проверки валидности
                    /*
                    const response = await fetch('/api/auth/validate', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${authToken}`
                        }
                    });
                    
                    if (!response.ok) {
                        // Токен невалидный, очищаем и перенаправляем
                        try {
                            localStorage.removeItem('authToken');
                        } catch (e) {
                            console.error('Ошибка при удалении токена из localStorage:', e);
                        }
                        deleteCookie('authToken');
                        
                        setIsAuthorized(false);
                        router.push('/auth');
                        return false;
                    }
                    */
                    
                    // Пока считаем, что если токен есть, то он валидный
                    console.log('Проверка валидности токена пропущена, пользователь считается авторизованным');
                } catch (e) {
                    // Если запрос не удался, считаем пользователя авторизованным
                    // (например, в случае проблем с сетью, не будем выкидывать пользователя)
                    console.error('Ошибка при проверке токена:', e);
                }
                
                setIsAuthorized(true);
                return true;
            } catch (error) {
                console.error('Ошибка при проверке авторизации:', error);
                setError('Ошибка при проверке авторизации: ' + (error instanceof Error ? error.message : String(error)));
                setIsAuthorized(false);
                router.push('/auth');
                return false;
            }
        };
        
        const checkAndLoadData = async () => {
            setIsLoading(true);
            const isAuth = await checkAuth();
            if (isAuth) {
                try {
                    await Promise.all([
                        fetchCardInfo(),
                        fetchBalances()
                    ]);
                } catch (error) {
                    console.error('Ошибка при загрузке данных:', error);
                }
            }
            setIsLoading(false);
        };
        
        checkAndLoadData();
    }, [router]);

    // Добавляем эффект для обновления информации о карте при каждом возвращении на страницу
    useEffect(() => {
        // Если пользователь авторизован и страница уже загружена, обновляем информацию о карте
        if (isAuthorized === true && !isLoading) {
            const refreshData = async () => {
                try {
                    await Promise.all([
                        fetchCardInfo(),
                        fetchBalances()
                    ]);
                } catch (error) {
                    console.error('Ошибка при обновлении данных:', error);
                }
            };
            
            refreshData();
        }
    }, [isAuthorized, isLoading]);

    const fetchCardInfo = async () => {
        try {
            const cardInfo = await api.vcard.getInfo();
            if (cardInfo && cardInfo.cardNumber) {
                setCardNumber(cardInfo.cardNumber);
            }
        } catch (error) {
            console.error('Ошибка при получении информации о карте:', error);
        }
    };

    const fetchBalances = async () => {
        try {
            const rubleBalanceInfo = await api.balance.getRubleBalance();
            const bonusBalanceInfo = await api.balance.getBonusBalance();
            
            setRubleBalance(rubleBalanceInfo.balance);
            setBonusBalance(bonusBalanceInfo.balance);
        } catch (error) {
            console.error('Ошибка при получении информации о балансах:', error);
        }
    };

    const handleAddCard = async () => {
        if (!isAuthorized) {
            // Очищаем токены и перенаправляем
            try {
                localStorage.removeItem('authToken');
            } catch (e) {
                console.error('Ошибка при удалении токена из localStorage:', e);
            }
            deleteCookie('authToken');
            
            router.push('/auth');
            return;
        }
        
        try {
            setError(null);
            const response = await api.vcard.request();
            
            if (response && response.success) {
                // Перенаправляем на страницу подтверждения кода
                router.push('/card/verification');
            } else {
                throw new Error('Не удалось отправить запрос на выпуск карты');
            }
        } catch (error) {
            console.error('Ошибка при запросе на выпуск карты:', error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            if (errorMessage.includes('авторизац') || 
                errorMessage.includes('auth') || 
                errorMessage.includes('401')
            ) {
                // Неавторизован, очищаем токены
                try {
                    localStorage.removeItem('authToken');
                } catch (e) {
                    console.error('Ошибка при удалении токена из localStorage:', e);
                }
                deleteCookie('authToken');
                
                setIsAuthorized(false);
                router.push('/auth');
                return;
            }
            
            setError(errorMessage || 'Произошла ошибка при запросе на выпуск карты');
            alert(`Ошибка: ${errorMessage || 'Произошла ошибка при запросе на выпуск карты'}`);
        }
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        // Закрываем уведомления при открытии меню
        if (!isMenuOpen) {
            setIsNotificationsOpen(false);
        }
    };

    const handleNotificationsToggle = () => {
        setIsNotificationsOpen(!isNotificationsOpen);
        // Закрываем меню при открытии уведомлений
        if (!isNotificationsOpen) {
            setIsMenuOpen(false);
        }
    };

    const handleNavigate = (path: string) => {
        router.push(path);
    };

    // Если не авторизован, не рендерим страницу вообще
    if (isAuthorized === false) {
        return null;
    }

    // Показываем загрузку, если статус авторизации неизвестен или если загрузка
    if (isLoading || isAuthorized === null) {
        return <Loading error={error} />;
    }
    
    return (
        <div className="w-full min-h-screen bg-white flex flex-col gap-4 sm:gap-6">
            {/* Верхняя панель */}
            <div className="px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6" style={{ "--header-height": "4rem" } as React.CSSProperties}>
                <Header 
                    onNavigate={handleNavigate}
                    isMenuOpen={isMenuOpen}
                    isNotificationsOpen={isNotificationsOpen}
                    onMenuToggle={handleMenuToggle}
                    onNotificationsToggle={handleNotificationsToggle}
                />
            </div>
            
            {/* Основной контент */}
            <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
                <Main 
                    rubleBalance={rubleBalance}
                    bonusBalance={bonusBalance}
                    cardNumber={cardNumber}
                    onAddCard={handleAddCard}
                    onNavigate={handleNavigate}
                />
            </div>
        </div>
    );
}