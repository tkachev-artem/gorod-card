'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from './structure/lib/api';
import { getCookie, setCookie } from '@/utils/cookies';
import { Header } from './structure/components/header';
import { Main } from './structure/main';
import { Loading } from './structure/components/loading';
import { LkrConfig } from './config';

export default function PersonalAccountLkr() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [cardNumber, setCardNumber] = useState<string | null>("1345 3745 4433 2355");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [rubleBalance, setRubleBalance] = useState(0);
    const [bonusBalance, setBonusBalance] = useState(0);

    useEffect(() => {
        console.log('Страница личного кабинета LKR загружена');
        const checkAuth = () => {
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
                    console.log('Токен найден в localStorage, сохраняем в cookie');
                    setCookie('authToken', localToken);
                }
                
                const isAuth = !!(token || localToken);
                console.log('Токен авторизации:', isAuth ? 'Присутствует' : 'Отсутствует');
                
                setIsAuthorized(isAuth);
                
                if (!isAuth) {
                    console.log('Перенаправление на страницу авторизации');
                    router.push('/auth');
                    return false;
                }
                
                return true;
            } catch (error) {
                console.error('Ошибка при проверке авторизации:', error);
                setError('Ошибка при проверке авторизации: ' + (error instanceof Error ? error.message : String(error)));
                setIsAuthorized(false);
                router.push('/auth');
                return false;
            }
        };
        
        const isAuth = checkAuth();
        if (isAuth) {
            fetchCardInfo();
            fetchBalances();
        }
        setIsLoading(false); // For demo purposes, we're setting isLoading to false immediately
    }, [router]);

    const fetchCardInfo = async () => {
        try {
            const cardInfo = await api.vcard.getInfo();
            if (cardInfo && cardInfo.cardNumber) {
                setCardNumber(cardInfo.cardNumber);
            }
        } catch (error) {
            console.error('Ошибка при получении информации о карте:', error);
        } finally {
            setIsLoading(false);
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