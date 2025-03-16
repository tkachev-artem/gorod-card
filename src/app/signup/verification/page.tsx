"use client";
import { Info } from "@/components/ui/text/info";
import { VerificationGridConfig, HeaderConfig, BodyConfig } from "./config";
import { Logo } from "@/components/ui/logo/logo";
import { VerificationBox } from "@/components/ui/verification/verification-box";
import { BigButton } from "@/components/ui/button/big-button";
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function VerificationPage() {
    const [pin, setPin] = useState(['', '', '', '', '', '']);
    const [isComplete, setIsComplete] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const email = searchParams.get('email');
    const firstName = searchParams.get('firstName');
    const lastName = searchParams.get('lastName');

    const handleSubmit = async () => {
        if (!isComplete || isLoading) return;
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
                <VerificationBox
                    pin={pin}
                    setPin={setPin}
                    setIsComplete={setIsComplete}
                />

                {error && (
                    <div className="text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}

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
            </main>
        </div>  
    );
}