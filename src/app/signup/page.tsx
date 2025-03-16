"use client";
import { Logo } from '@/app/lk/structure/components/ui/logo/logo';
import { BodyConfig, HeaderConfig, SignupGridConfig } from './config';
import { Info } from '@/app/lk/structure/components/ui/text/info';
import { Form } from '@/app/lk/structure/components/ui/form/form';
import { BigButton } from '@/app/lk/structure/components/ui/button/big-button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/lk/structure/lib/api';

export default function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.signupStep1(email, firstName, lastName);
            router.push(`/signup/verification?email=${encodeURIComponent(email)}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`);
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            setError(error instanceof Error ? error.message : 'Произошла ошибка при регистрации');
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
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <Form
                        placeholder={BodyConfig.surnameForm.placeholder}
                        type={BodyConfig.surnameForm.type}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <Form
                        placeholder={BodyConfig.nameForm.placeholder}
                        type={BodyConfig.nameForm.type}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <Form
                        placeholder={BodyConfig.emailForm.placeholder}
                        type={BodyConfig.emailForm.type}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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