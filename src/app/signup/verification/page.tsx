"use client";
import { Info } from "@/app/lk/structure/components/ui/text/info";
import { VerificationGridConfig, HeaderConfig, BodyConfig } from "./config";
import { Logo } from "@/app/lk/structure/components/ui/logo/logo";
import { VerificationBox } from "@/app/lk/structure/components/ui/verification/verification-box";
import { BigButton } from "@/app/lk/structure/components/ui/button/big-button";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/app/lk/structure/lib/api';
import Link from 'next/link';

function VerificationPageContent() {
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const email = searchParams.get('email');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');

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

    const handleSubmit = async () => {
        if (!isComplete || isLoading) return;
        
        if (!isOnline) {
            setError('Отсутствует подключение к интернету. Пожалуйста, проверьте соединение.');
            return;
        }
        
        if (!email || !firstName || !lastName) {
            setError('Данные не найдены. Пожалуйста, вернитесь к регистрации.');
            return;
        }
        
        setIsLoading(true);
        setError('');

        try {
            const result = await api.signupStep2(email, firstName, lastName, pin.join(''));
            if (result) {
                router.push(`/auth?email=${encodeURIComponent(email)}`);
            }
        } catch (error) {
            console.error('Ошибка при проверке кода:', error);
            setError(error instanceof Error ? error.message : 'Произошла ошибка при проверке кода');
            setPin(['', '', '', '', '', '']);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={VerificationGridConfig.container}>
            <div className={HeaderConfig.container}>
                <Logo/>
                <Info
                    heading={BodyConfig.info.heading}
                    text1={BodyConfig.info.text}
                    text2=""
                />
            </div>

            <main className={BodyConfig.container}>
                {!isOnline && (
                    <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800 w-full text-center">
                        Отсутствует подключение к интернету
                    </div>
                )}
                
                <div className="w-full">
                    <VerificationBox
                        pin={pin}
                        setPin={setPin}
                        setIsComplete={setIsComplete}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm text-center w-full">
                        {error}
                    </div>
                )}

                <div className="w-full mt-2">
                    <BigButton
                        text={BodyConfig.button.text}
                        type="button"
                        color={BodyConfig.button.color}
                        hoverColor={BodyConfig.button.hoverColor}
                        textColor={BodyConfig.button.textColor}
                        borderColor={BodyConfig.button.borderColor}
                        onClick={handleSubmit}
                        disabled={!isComplete || isLoading}
                    />
                </div>
                
                {isLoading && (
                    <div className="flex items-center justify-center mt-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                        <span className="ml-2 text-sm text-gray-600">Проверка кода...</span>
                    </div>
                )}
                
                <div className="flex justify-between w-full mt-4">
                    <Link
                        href="/signup"
                        className="text-gray-500 text-sm font-medium underline"
                    >
                        Вернуться к регистрации
                    </Link>
                    
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

export default function VerificationPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                <span className="ml-2">Загрузка...</span>
            </div>
        }>
            <VerificationPageContent />
        </Suspense>
    );
}