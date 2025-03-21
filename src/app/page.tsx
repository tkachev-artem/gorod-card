"use client";

import { HeaderConfig } from "@/app/config";
import { useRouter } from "next/navigation";
import { Logo } from "@/app/lk/structure/components/ui/logo/logo";
import { Button } from "@/app/lk/structure/components/ui/button/button";
import { useEffect, useState } from "react";

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
    <div>
      <header className={HeaderConfig.container}>
        <button /* Логотип */
          onClick={() => router.push(HeaderConfig.logo.goto)}
        >
          <Logo/>
        </button>

        <div className="flex gap-4">
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
    </div>
  );
}
