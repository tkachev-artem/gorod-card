"use client";
import { Logo } from '@/app/lk/structure/components/ui/logo/logo';
import { BodyConfig, HeaderConfig, SignupGridConfig } from './config';
import { Info } from '@/app/lk/structure/components/ui/text/info';
import { Form } from '@/app/lk/structure/components/ui/form/form';
import { BigButton } from '@/app/lk/structure/components/ui/button/big-button';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lk/structure/lib/api';

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isOnline) {
            setError('Отсутствует подключение к интернету. Пожалуйста, проверьте соединение.');
            return;
        }
        
        setError('');
        setIsLoading(true);
        
        try {
            await api.signupStep1(email, firstName, lastName);
            router.push(`/signup/verification?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`);
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            setError(error instanceof Error ? error.message : 'Произошла ошибка при регистрации');
            setIsLoading(false);
        }
    };

    return (
        <div className={SignupGridConfig.container}>
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
                            placeholder={BodyConfig.surnameForm.placeholder}
                            type={BodyConfig.surnameForm.type}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <Form
                            placeholder={BodyConfig.nameForm.placeholder}
                            type={BodyConfig.nameForm.type}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className="w-full">
                        <Form
                            placeholder={BodyConfig.emailForm.placeholder}
                            type={BodyConfig.emailForm.type}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center w-full">
                            {error}
                        </div>
                    )}

                    <div className="w-full mt-2">
                        <BigButton
                            text={isLoading ? "Регистрация..." : BodyConfig.button.text}
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
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
                            <span className="ml-2 text-sm text-gray-600">Отправка данных...</span>
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