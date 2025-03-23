"use client";
import { Logo } from '@/app/lk/structure/components/ui/logo/logo';
import { BodyConfig, HeaderConfig, AuthGridConfig } from './config';
import { Info } from '@/app/lk/structure/components/ui/text/info';
import { Form } from '@/app/lk/structure/components/ui/form/form';
import { BigButton } from '@/app/lk/structure/components/ui/button/big-button';
import Link from 'next/link';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/app/lk/structure/lib/api';

function AuthContent() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(true);

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

    // Получаем email из URL при загрузке страницы
    useEffect(() => {
        const emailFromUrl = searchParams?.get('email');
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isOnline) {
            setError('Отсутствует подключение к интернету. Пожалуйста, проверьте соединение.');
            return;
        }
        
        setError('');
        setIsLoading(true);
        
        try {
            const { token } = await api.login(email, password);
            
            // Сохраняем токен в cookies вместо localStorage
            document.cookie = `authToken=${token}; path=/`;
            
            // Также сохраняем токен в localStorage для совместимости
            localStorage.setItem('authToken', token);
            
            console.log('Токен сохранен в localStorage и cookies');
            
            // Перенаправляем
            window.location.href = '/lk';
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            setError(error instanceof Error ? error.message : 'Ошибка при входе');
            setIsLoading(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    return (
        <div className={AuthGridConfig.container}>
            <header className={HeaderConfig.container}>
                <Logo/>
                <Info
                    heading={BodyConfig.info.heading}
                    text1={BodyConfig.info.text1}
                    text2={BodyConfig.info.text2} 
                />
            </header>
          
            <main className={BodyConfig.container}>
                {!isOnline && (
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800 w-full text-center">
                        Отсутствует подключение к интернету
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <div className="w-full">
                        <Form
                            placeholder={BodyConfig.emailForm.placeholder}
                            type={BodyConfig.emailForm.type}
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="w-full">
                        <Form
                            placeholder={BodyConfig.passwordForm.placeholder}
                            type={BodyConfig.passwordForm.type}
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center w-full">
                            {error}
                        </div>
                    )}

                    <div className="w-full mt-2">
                        <BigButton
                            text={isLoading ? "Вход..." : BodyConfig.button.text}
                            type={BodyConfig.button.type as "submit"}
                            color={BodyConfig.button.color}
                            hoverColor={BodyConfig.button.hoverColor}
                            textColor={BodyConfig.button.textColor}
                            borderColor={BodyConfig.button.borderColor}
                            disabled={isLoading}
                        />
                    </div>
                    
                    {isLoading && (
                        <div className="flex items-center justify-center mt-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                            <span className="ml-2 text-sm text-gray-600">Вход в систему...</span>
                        </div>
                    )}
                </form>

                <Link
                    href={BodyConfig.link.href}
                    className={BodyConfig.link.className}
                >
                    {BodyConfig.link.text}
                </Link>
            </main>
        </div>
    );
}

export default function Auth() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                <span className="ml-2">Загрузка...</span>
            </div>
        }>
            <AuthContent />
        </Suspense>
    );
}