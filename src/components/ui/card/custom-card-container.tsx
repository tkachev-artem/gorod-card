import { useEffect, useState, useRef, useCallback } from 'react';
import { api } from '@/lib/api';
import { getCookie, setCookie } from 'cookies-next';
import Image from 'next/image';

interface CustomCardContainerProps {
    cardNumber?: string;
    onAddCard?: () => void;
}

// Объявляем тип для window
declare global {
    interface Window {
        globalState: typeof globalState;
    }
}

// Внешнее состояние для предотвращения повторных запросов между перерендерами
const globalState = {
    hasAttemptedFetch: false,
    lastFetchTime: 0,
    hasFetchedSuccessfully: false
};

// Делаем глобальное состояние доступным через window
if (typeof window !== 'undefined') {
    window.globalState = globalState;
}

// Добавляем функцию форматирования номера карты в начало компонента
export function CustomCardContainer({ 
    cardNumber: initialCardNumber, 
    onAddCard 
}: CustomCardContainerProps) {
    // Функция для форматирования номера карты (добавление пробелов через каждые 4 цифры)
    const formatCardNumber = (number: string) => {
        // Удаляем все пробелы, если они уже есть
        const cleanNumber = number.replace(/\s/g, '');
        // Добавляем пробел после каждых 4 цифр
        return cleanNumber.replace(/(.{4})/g, '$1 ').trim();
    };

    const [cardNumber, setCardNumber] = useState(initialCardNumber);
    const [isLoading, setIsLoading] = useState(!globalState.hasAttemptedFetch);
    const [fetchError, setFetchError] = useState(false);
    const [cardNotFound, setCardNotFound] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    
    // Уникальный идентификатор этого экземпляра компонента
    const componentId = useRef(`custom-card-container-${Math.random().toString(36).substring(2, 11)}`);
    // Флаг для блокировки повторных запросов после ошибки
    const blockFetchRef = useRef(false);
    // Флаг для отслеживания, был ли компонент смонтирован
    const isMounted = useRef(true);
    // Счетчик попыток загрузки
    const fetchAttemptsRef = useRef(0);
    const maxFetchAttempts = 1; // Только 1 попытка

    // Проверка авторизации
    const checkAuthorization = useCallback(() => {
        try {
            const authToken = getCookie('authToken');
            
            // Также проверяем localStorage для обратной совместимости
            let localToken = null;
            if (typeof window !== 'undefined') {
                try {
                    localToken = localStorage.getItem('authToken');
                } catch (e) {
                    console.error(`CustomCardContainer(${componentId.current}): Ошибка при доступе к localStorage:`, e);
                }
            }
            
            // Если токен найден в localStorage, но не в куки, сохраняем его в куки
            if (localToken && !authToken) {
                setCookie('authToken', localToken);
            }
            
            const authorized = !!(authToken || localToken);
            
            if (isMounted.current) {
                setIsAuthorized(authorized);
            }
            
            return authorized;
        } catch (error) {
            console.error(`CustomCardContainer(${componentId.current}): Ошибка при проверке авторизации:`, error);
            if (isMounted.current) {
                setIsAuthorized(false);
            }
            return false;
        }
    }, []);

    // Функция для безопасного обновления состояния только если компонент смонтирован
    const safeSetState = useCallback(<T,>(setter: (value: T) => void, value: T) => {
        if (isMounted.current) {
            setter(value);
        }
    }, []);

    const fetchCardInfo = useCallback(async (isManualRefresh = false) => {
        // Проверяем авторизацию перед выполнением запроса
        if (!checkAuthorization()) {
            safeSetState(setIsLoading, false);
            return;
        }
        
        // Проверка тайм-аута между запросами (минимум 2 секунды)
        const now = Date.now();
        if (!isManualRefresh && now - globalState.lastFetchTime < 2000) {
            return;
        }
        globalState.lastFetchTime = now;
        
        // Если блокировка активна и это не ручное обновление, прекращаем выполнение
        if (blockFetchRef.current && !isManualRefresh) {
            safeSetState(setIsLoading, false);
            return;
        }
        
        // Отмечаем, что попытка загрузки была сделана
        globalState.hasAttemptedFetch = true;
        
        // Если это не ручное обновление, проверяем счетчик попыток
        if (!isManualRefresh) {
            fetchAttemptsRef.current += 1;
            
            // Если превышено максимальное количество попыток, прекращаем запросы
            if (fetchAttemptsRef.current > maxFetchAttempts) {
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
                safeSetState(setFetchError, true);
                safeSetState(setServerError, true);
                safeSetState(setIsLoading, false);
                return;
            }
        } else {
            // Если это ручное обновление, сбрасываем счетчик и снимаем блокировку
            fetchAttemptsRef.current = 0;
            blockFetchRef.current = false;
        }
        
        // Устанавливаем состояние загрузки
        safeSetState(setIsLoading, true);
        safeSetState(setFetchError, false);
        safeSetState(setServerError, false);
        
        try {
            const cardInfo = await api.vcard.getInfo();
            
            // Отмечаем, что загрузка прошла успешно
            globalState.hasFetchedSuccessfully = true;
            
            if (cardInfo && cardInfo.cardNumber) {
                safeSetState(setCardNumber, cardInfo.cardNumber);
                safeSetState(setCardNotFound, false);
                fetchAttemptsRef.current = 0; // Сбрасываем счетчик при успехе
                blockFetchRef.current = false; // Снимаем блокировку
            } else {
                safeSetState(setCardNotFound, true);
                fetchAttemptsRef.current = 0; // Сбрасываем счетчик при определенном ответе
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
            }
        } catch (error) {
            console.error(`CustomCardContainer(${componentId.current}): Ошибка при получении информации о карте:`, error);
            
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            // Проверяем, является ли ошибка 404 или 500 (оба означают, что карта не найдена)
            if (errorMessage.includes('не найдена') || 
                errorMessage.includes('not found') || 
                errorMessage.includes('404') ||
                errorMessage.includes('500')
            ) {
                safeSetState(setCardNotFound, true);
                safeSetState(setFetchError, false); // Сбрасываем флаг ошибки, так как это не ошибка
                fetchAttemptsRef.current = 0; // Сбрасываем счетчик при определенном ответе
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
            } else if (errorMessage.includes('временно недоступен') ||
                errorMessage.includes('503')
            ) {
                // Если это ошибка сервера, устанавливаем флаг ошибки сервера
                safeSetState(setFetchError, true);
                safeSetState(setServerError, true);
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
            } else if (errorMessage.includes('авторизац') ||
                errorMessage.includes('auth') ||
                errorMessage.includes('401')
            ) {
                // Если это ошибка авторизации
                safeSetState(setIsAuthorized, false);
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
                safeSetState(setIsLoading, false);
                return;
            } else {
                // Если это другая ошибка, устанавливаем флаг ошибки
                safeSetState(setFetchError, true);
                safeSetState(setServerError, false);
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
            }
        } finally {
            // Снимаем флаг загрузки только если компонент все еще смонтирован
            if (isMounted.current) {
                safeSetState(setIsLoading, false);
            }
        }
    }, [safeSetState, checkAuthorization]);

    // Используем useEffect с пустым массивом зависимостей для выполнения только один раз при монтировании
    useEffect(() => {
        // Устанавливаем флаг, что компонент смонтирован
        isMounted.current = true;
        
        // Сначала проверяем авторизацию
        const isUserAuthorized = checkAuthorization();
        
        // Если пользователь не авторизован, прекращаем выполнение
        if (!isUserAuthorized) {
            safeSetState(setIsLoading, false);
            return;
        }

        // Если глобальное состояние уже содержит результат успешной загрузки, 
        // и мы не инициализировались с ошибкой, пропускаем запрос
        if (globalState.hasFetchedSuccessfully && !fetchError) {
            safeSetState(setIsLoading, false);
        } else if (!globalState.hasAttemptedFetch || !blockFetchRef.current) {
            // Выполняем запрос только если не было предыдущих попыток или нет блокировки
            setTimeout(() => {
                if (isMounted.current && isUserAuthorized) fetchCardInfo();
            }, 100); // Небольшая задержка для стабильности
        }
        
        // Функция очистки при размонтировании компонента
        return () => {
            isMounted.current = false;
        };
    }, [checkAuthorization, fetchCardInfo, fetchError]);

    // Обработчик обновления информации о карте
    const handleRefresh = () => {
        fetchCardInfo(true);
    };

    // Если пользователь не авторизован, показываем сообщение
    if (isAuthorized === false) {
        return (
            <div className="w-[400px] h-[312px] p-4 bg-white rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-center gap-2.5">
                    <div className="justify-start text-black text-base font-['SF_Pro']">Все карты</div>
                </div>
                <div className="self-stretch h-48 flex items-center justify-center rounded-xl outline outline-2 outline-offset-[-2px] outline-gray-300 overflow-hidden">
                    <div className="text-center text-gray-500">
                        Для просмотра карты необходимо авторизоваться
                    </div>
                </div>
                <button 
                    onClick={onAddCard}
                    className="self-stretch flex-1 px-4 bg-gray-100 rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex justify-center items-center gap-2 overflow-hidden"
                >
                    <div className="justify-start text-black text-sm font-['SF_Pro']">􀁌</div>
                    <div className="justify-start text-black text-sm font-['SF_Pro']">Добавить карту</div>
                </button>
            </div>
        );
    }

    // Если идет загрузка, показываем индикатор загрузки
    if (isLoading) {
        return (
            <div className="w-[400px] h-[312px] p-4 bg-white rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-center gap-2.5">
                    <div className="justify-start text-black text-base font-['SF_Pro']">Все карты</div>
                </div>
                <div className="self-stretch h-48 flex items-center justify-center rounded-xl outline outline-2 outline-offset-[-2px] outline-gray-300 overflow-hidden">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-2"></div>
                        <div className="text-gray-500">Загрузка...</div>
                    </div>
                </div>
                <button 
                    disabled
                    className="self-stretch flex-1 px-4 bg-gray-100 rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex justify-center items-center gap-2 overflow-hidden opacity-50 cursor-not-allowed"
                >
                    <div className="justify-start text-black text-sm font-['SF_Pro']">􀁌</div>
                    <div className="justify-start text-black text-sm font-['SF_Pro']">Добавить карту</div>
                </button>
            </div>
        );
    }

    // Если произошла ошибка при загрузке
    if (fetchError) {
        return (
            <div className="w-[400px] h-[312px] p-4 bg-white rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-center gap-2.5">
                    <div className="justify-start text-black text-base font-['SF_Pro']">Все карты</div>
                </div>
                <div className="self-stretch h-48 flex flex-col items-center justify-center rounded-xl outline outline-2 outline-offset-[-2px] outline-red-400 overflow-hidden">
                    <div className="text-center text-red-500 mb-2">
                        {serverError ? 'Сервер временно недоступен' : 'Ошибка при загрузке данных карты'}
                    </div>
                    <button 
                        onClick={handleRefresh}
                        className="px-3 py-1 bg-gray-100 rounded-xl flex items-center gap-2"
                    >
                        <span className="text-black text-xs font-medium">Повторить</span>
                    </button>
                </div>
                <button 
                    onClick={onAddCard}
                    className="self-stretch flex-1 px-4 bg-gray-100 rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex justify-center items-center gap-2 overflow-hidden"
                >
                    <div className="justify-start text-black text-sm font-['SF_Pro']">􀁌</div>
                    <div className="justify-start text-black text-sm font-['SF_Pro']">Добавить карту</div>
                </button>
            </div>
        );
    }

    // Если карта не найдена
    if (cardNotFound) {
        return (
            <div className="w-[400px] h-[312px] p-4 bg-white rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                <div className="inline-flex justify-start items-center gap-2.5">
                    <div className="justify-start text-black text-base font-['SF_Pro']">Все карты</div>
                </div>
                <div className="self-stretch h-48 flex items-center justify-center rounded-xl outline outline-2 outline-offset-[-2px] outline-gray-300 overflow-hidden">
                    <div className="text-center text-gray-500">
                        У вас пока нет карты
                    </div>
                </div>
                <button 
                    onClick={onAddCard}
                    className="self-stretch flex-1 px-4 bg-gray-100 rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex justify-center items-center gap-2 overflow-hidden"
                >
                    <div className="justify-start text-black text-sm font-['SF_Pro']">􀁌</div>
                    <div className="justify-start text-black text-sm font-['SF_Pro']">Добавить карту</div>
                </button>
            </div>
        );
    }

    // Если карта активна и есть номер карты
    return (
        <div className="w-[400px] h-[312px] p-4 bg-white rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="inline-flex justify-start items-center gap-2.5">
                <div className="justify-start text-black text-base font-['SF_Pro']">Все карты</div>
            </div>
            <div className="self-stretch h-48 relative rounded-xl overflow-hidden">
                {/* Фоновое изображение */}
                <div className="absolute inset-0 w-full h-full">
                    <Image 
                        src="/images/card-background.jpg" 
                        alt="Фон карты"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                
                {/* Обводка карты */}
                <div className="absolute inset-0 rounded-xl border-2 border-blue-400 pointer-events-none z-[1]"></div>
                
                <div className="left-[16px] top-[144px] absolute inline-flex justify-center items-center gap-4 overflow-hidden z-10">
                    <div className="bg-white inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
                        <div className="bg-white inline-flex justify-center items-center gap-2.5 overflow-hidden">
                            <div className="relative w-[12.50px] h-[28.55px]">
                                <Image 
                                    src="/icon/logo-card.svg" 
                                    alt="Логотип карты" 
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="justify-start text-black text-[10px] font-semibold leading-none">Виртуальная<br/>Карта горожанина</div>
                        </div>
                    </div>
                    <div className="bg-white inline-flex flex-col justify-start items-start overflow-hidden">
                        <div className="self-stretch justify-start text-gray-900 text-sm font-semibold leading-tight">
                            {cardNumber ? formatCardNumber(cardNumber) : ''}
                        </div>
                    </div>
                </div>
                <div className="w-20 h-20 left-[272px] top-[16px] absolute bg-blue-100 rounded-xl border-[1.50px] border-blue-400 inline-flex flex-col justify-center items-center overflow-hidden z-10">
                    <div className="flex flex-col justify-center items-center">
                        <Image 
                            src="/icon/qr-code.svg" 
                            alt="QR код" 
                            width={60} 
                            height={60}
                        />
                    </div>
                </div>
            </div>
            <button 
                onClick={onAddCard}
                className="self-stretch flex-1 px-4 bg-gray-100 rounded-xl outline outline-[1.50px] outline-offset-[-1.50px] outline-gray-300 inline-flex justify-center items-center gap-2 overflow-hidden"
            >
                <div className="justify-start text-black text-sm font-['SF_Pro']">􀁌</div>
                <div className="justify-start text-black text-sm font-['SF_Pro']">Добавить карту</div>
            </button>
        </div>
    );
} 