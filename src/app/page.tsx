"use client";

import { HeaderConfig } from "@/app/config";
import { useRouter } from "next/navigation";
import { Logo } from "@/app/lk/structure/components/ui/logo/logo";
import { Button } from "@/app/lk/structure/components/ui/button/button";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Проверяем наличие токена в cookies
    const hasToken = document.cookie.includes('authToken=');
    setIsAuthenticated(hasToken);
  }, []);

  const handleLkClick = () => {
    if (isAuthenticated) {
      router.push('/lk');
    } else {
      router.push('/auth');
    }
  };

  const handleLk2Click = () => {
    if (isAuthenticated) {
      router.push('/lk2');
    } else {
      router.push('/auth');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className={HeaderConfig.container}>
        <button
          className="flex items-center justify-center"
          onClick={() => router.push(HeaderConfig.logo.goto)}
          aria-label="Домашняя страница"
        >
          <Logo/>
        </button>

        <div className="flex flex-col xs:flex-row gap-2 xs:gap-4 w-full xs:w-auto">
          <Button
            text={HeaderConfig.lkbutton.text}
            onClick={handleLkClick}
            goto={undefined}
          />
          
          <Button
            text="Личный кабинет 2"
            onClick={handleLk2Click}
            goto={undefined}
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <section className="w-full py-8 sm:py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                  Карта горожанина
                </h1>
                <p className="text-sm sm:text-base text-gray-700">
                  Единая карта для доступа ко всем городским сервисам и услугам. 
                  Получайте скидки, оплачивайте проезд и пользуйтесь городскими сервисами с удобством.
                </p>
                <div className="flex flex-col xs:flex-row gap-3 mt-4">
                  <button 
                    onClick={() => router.push('/signup')}
                    className="px-6 py-3 bg-green-100 hover:bg-green-300 text-green-900 border border-green-300 rounded-md text-sm sm:text-base font-semibold"
                  >
                    Получить карту
                  </button>
                  <button 
                    onClick={() => router.push('/auth')}
                    className="px-6 py-3 bg-blue-100 hover:bg-blue-300 text-blue-900 border border-blue-300 rounded-md text-sm sm:text-base font-semibold"
                  >
                    Войти в кабинет
                  </button>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 relative h-48 sm:h-64 md:h-80">
                <Image 
                  src="/images/card-background.svg" 
                  alt="Карта горожанина"
                  fill
                  style={{objectFit: 'contain'}}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
