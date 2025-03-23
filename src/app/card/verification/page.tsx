"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lk/structure/lib/api';
import { VerificationBox } from '@/app/lk/structure/components/ui/verification/verification-box';
import { Logo } from '@/app/lk/structure/components/ui/logo/logo';
import Image from 'next/image';

// Сбрасываем глобальное состояние для компонента карты
const resetCardState = () => {
    // Проверяем, существует ли глобальное состояние
    if (typeof window !== 'undefined' && window.globalState) {
        console.log('Сброс глобального состояния карты');
        window.globalState.hasAttemptedFetch = false;
        window.globalState.hasFetchedSuccessfully = false;
    }
};

export default function CardVerification() {
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [isOnline, setIsOnline] = useState(true);
    const router = useRouter();

    // Проверка онлайн-статуса
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        setIsOnline(navigator.onLine);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    useEffect(() => {
        // Проверяем авторизацию
        const checkAuth = () => {
            try {
                // Проверяем авторизацию по куки или localStorage
                const token = document.cookie.split(';').find(c => c.trim().startsWith('authToken='));
                const localToken = localStorage.getItem('authToken');
                
                const isAuth = !!(token || localToken);
                setIsAuthorized(isAuth);
                
                if (!isAuth) {
                    router.push('/auth');
                    return false;
                }
                
                return true;
            } catch (error) {
                console.error('Ошибка при проверке авторизации:', error);
                setIsAuthorized(false);
                router.push('/auth');
                return false;
            }
        };
        
        checkAuth();
    }, [router]);

    const handleSubmit = async () => {
        if (!isComplete || isLoading) return;

        if (!isOnline) {
            setError('Отсутствует подключение к интернету. Пожалуйста, проверьте соединение.');
            return;
        }
        
        setIsLoading(true);
        setError('');

        try {
            const result = await api.vcard.confirm(pin.join(''));
            if (result && result.success) {
                // Сбрасываем глобальное состояние карты
                resetCardState();
                
                // Перенаправляем в личный кабинет
                router.push('/lk');
            } else {
                throw new Error('Не удалось подтвердить код');
            }
        } catch (error) {
            console.error('Ошибка при проверке кода:', error);
            setError(error instanceof Error ? error.message : 'Произошла ошибка при проверке кода');
            setPin(['', '', '', '', '', '']);
        } finally {
            setIsLoading(false);
        }
    };

    // Если не авторизован, не рендерим страницу
    if (isAuthorized === false) {
        return null;
    }

    // Показываем загрузку, если статус авторизации неизвестен
    if (isAuthorized === null) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg sm:text-xl mb-2">Загрузка...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6">
            <header className="flex flex-col gap-4 mx-auto mb-6 items-center justify-center w-full max-w-xs sm:max-w-md">
                <Logo />
                <div className="text-center">
                    <h1 className="text-xl sm:text-2xl font-bold mb-2">Подтверждение выпуска карты</h1>
                    <p className="text-gray-600 text-sm sm:text-base">
                        Введите код подтверждения, который был отправлен на ваш email
                    </p>
                </div>
            </header>

            <main className="w-full max-w-xs sm:max-w-md flex flex-col gap-6 mx-auto items-center justify-center">
                {!isOnline && (
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800 w-full text-center">
                        Отсутствует подключение к интернету
                    </div>
                )}
                
                <VerificationBox
                    pin={pin}
                    setPin={setPin}
                    setIsComplete={setIsComplete}
                />

                {error && (
                    <div className="text-red-500 text-sm text-center w-full">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={!isComplete || isLoading || !isOnline}
                    className={`w-full py-3 rounded-xl flex justify-center items-center gap-2 
                              ${isComplete && !isLoading && isOnline
                                ? 'bg-blue-100 hover:bg-blue-300 text-blue-900 border border-blue-300' 
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300'}`}
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-900"></div>
                            <span>Проверка...</span>
                        </>
                    ) : (
                        <span>Подтвердить</span>
                    )}
                </button>

                <div className="flex justify-between w-full">
                    <button
                        onClick={() => router.push('/lk')}
                        className="text-gray-500 text-sm font-medium underline"
                    >
                        Вернуться в личный кабинет
                    </button>
                    
                    <button
                        onClick={() => setPin(['', '', '', '', '', ''])}
                        className="text-gray-500 text-sm font-medium underline"
                        type="button"
                    >
                        Очистить код
                    </button>
                </div>
            </main>
        </div>
    );
} 