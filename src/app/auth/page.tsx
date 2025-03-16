"use client";
import { Logo } from '@/app/lk/structure/components/ui/logo/logo';
import { BodyConfig, HeaderConfig, AuthGridConfig } from './config';
import { Info } from '@/app/lk/structure/components/ui/text/info';
import { Form } from '@/app/lk/structure/components/ui/form/form';
import { BigButton } from '@/app/lk/structure/components/ui/button/big-button';
import Link from 'next/link';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/app/lk/structure/lib/api';

export default function Auth() {
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Получаем email из URL при загрузке страницы
    useEffect(() => {
        const emailFromUrl = searchParams.get('email');
        if (emailFromUrl) {
            setEmail(emailFromUrl);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
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
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <Form
                        placeholder={BodyConfig.emailForm.placeholder}
                        type={BodyConfig.emailForm.type}
                        value={email}
                        onChange={handleEmailChange}
                    />

                    <Form
                        placeholder={BodyConfig.passwordForm.placeholder}
                        type={BodyConfig.passwordForm.type}
                        value={password}
                        onChange={handlePasswordChange}
                    />

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <BigButton
                        text={BodyConfig.button.text}
                        type={BodyConfig.button.type as "submit"}
                        color={BodyConfig.button.color}
                        hoverColor={BodyConfig.button.hoverColor}
                        textColor={BodyConfig.button.textColor}
                        borderColor={BodyConfig.button.borderColor}
                    />
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