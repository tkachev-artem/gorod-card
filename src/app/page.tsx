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

  return (
    <div>
      <header className={HeaderConfig.container}>
        <button /* Логотип */
          onClick={() => router.push(HeaderConfig.logo.goto)}
        >
          <Logo/>
        </button>

        <Button
          text={HeaderConfig.lkbutton.text}
          onClick={handleLkClick}
          goto={undefined}
        />


      </header>
    </div>
  );
}
