import { Card } from './card';
import { useEffect, useState, useRef, useCallback } from 'react';
import { api } from '@/lib/api';
import { getCookie, setCookie } from 'cookies-next';

interface CardContainerProps {
    isActive?: boolean;
    cardNumber?: string;
    backgroundImage?: string;
    onAddCard?: () => void;
}

// Внешнее состояние для предотвращения повторных запросов между перерендерами
const globalState = {
    hasAttemptedFetch: false,
    lastFetchTime: 0,
    hasFetchedSuccessfully: false
};

export function CardContainer({ 
    isActive: initialIsActive, 
    cardNumber: initialCardNumber, 
    backgroundImage,
    onAddCard 
}: CardContainerProps) {
    const [isActive, setIsActive] = useState(initialIsActive);
    const [cardNumber, setCardNumber] = useState(initialCardNumber);
    const [isLoading, setIsLoading] = useState(!globalState.hasAttemptedFetch);
    const [fetchError, setFetchError] = useState(false);
    const [cardNotFound, setCardNotFound] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    
    // Уникальный идентификатор этого экземпляра компонента
    const componentId = useRef(`card-container-${Math.random().toString(36).substring(2, 11)}`);
    // Флаг для блокировки повторных запросов после ошибки
    const blockFetchRef = useRef(false);
    // Флаг для отслеживания, был ли компонент смонтирован
    const isMounted = useRef(true);
    // Счетчик попыток загрузки
    const fetchAttemptsRef = useRef(0);
    const maxFetchAttempts = 1; // Только 1 попытка
    
    console.log(`CardContainer(${componentId.current}): Инициализация компонента`);

    // Проверка авторизации
    const checkAuthorization = useCallback(() => {
        try {
            const authToken = getCookie('authToken');
            console.log(`CardContainer(${componentId.current}): Токен из cookie:`, authToken ? 'Присутствует' : 'Отсутствует');
            
            // Также проверяем localStorage для обратной совместимости
            let localToken = null;
            if (typeof window !== 'undefined') {
                try {
                    localToken = localStorage.getItem('authToken');
                    console.log(`CardContainer(${componentId.current}): Токен из localStorage:`, localToken ? 'Присутствует' : 'Отсутствует');
                } catch (e) {
                    console.error(`CardContainer(${componentId.current}): Ошибка при доступе к localStorage:`, e);
                }
            }
            
            // Если токен найден в localStorage, но не в куки, сохраняем его в куки
            if (localToken && !authToken) {
                console.log(`CardContainer(${componentId.current}): Синхронизация токена из localStorage в cookie`);
                setCookie('authToken', localToken);
            }
            
            const authorized = !!(authToken || localToken);
            console.log(`CardContainer(${componentId.current}): Проверка авторизации: ${authorized ? 'Авторизован' : 'Не авторизован'}`);
            
            if (isMounted.current) {
                setIsAuthorized(authorized);
            }
            
            return authorized;
        } catch (error) {
            console.error(`CardContainer(${componentId.current}): Ошибка при проверке авторизации:`, error);
            if (isMounted.current) {
                setIsAuthorized(false);
            }
            return false;
        }
    }, []);

    // Функция для безопасного обновления состояния только если компонент смонтирован
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const safeSetState = useCallback((setter: (value: any) => void, value: any) => {
        if (isMounted.current) {
            setter(value);
        } else {
            console.log(`CardContainer(${componentId.current}): Попытка обновить состояние размонтированного компонента`);
        }
    }, []);

    const fetchCardInfo = useCallback(async (isManualRefresh = false) => {
        // Проверяем авторизацию перед выполнением запроса
        if (!checkAuthorization()) {
            console.log(`CardContainer(${componentId.current}): Запрос отменен - пользователь не авторизован`);
            safeSetState(setIsLoading, false);
            return;
        }
        
        // Проверка тайм-аута между запросами (минимум 2 секунды)
        const now = Date.now();
        if (!isManualRefresh && now - globalState.lastFetchTime < 2000) {
            console.log(`CardContainer(${componentId.current}): Слишком частый запрос, игнорируем`);
            return;
        }
        globalState.lastFetchTime = now;
        
        // Если блокировка активна и это не ручное обновление, прекращаем выполнение
        if (blockFetchRef.current && !isManualRefresh) {
            console.log(`CardContainer(${componentId.current}): Запрос заблокирован после предыдущей ошибки`);
            safeSetState(setIsLoading, false);
            return;
        }
        
        // Отмечаем, что попытка загрузки была сделана
        globalState.hasAttemptedFetch = true;
        
        // Если это не ручное обновление, проверяем счетчик попыток
        if (!isManualRefresh) {
            fetchAttemptsRef.current += 1;
            console.log(`CardContainer(${componentId.current}): Попытка ${fetchAttemptsRef.current} из ${maxFetchAttempts}`);
            
            // Если превышено максимальное количество попыток, прекращаем запросы
            if (fetchAttemptsRef.current > maxFetchAttempts) {
                console.log(`CardContainer(${componentId.current}): Превышено максимальное количество попыток`);
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
            console.log(`CardContainer(${componentId.current}): Запрос информации о карте...`);
            const cardInfo = await api.vcard.getInfo();
            console.log(`CardContainer(${componentId.current}): Получена информация о карте:`, cardInfo);
            
            // Отмечаем, что загрузка прошла успешно
            globalState.hasFetchedSuccessfully = true;
            
            if (cardInfo && cardInfo.cardNumber) {
                console.log(`CardContainer(${componentId.current}): Карта найдена, номер:`, cardInfo.cardNumber);
                safeSetState(setCardNumber, cardInfo.cardNumber);
                safeSetState(setIsActive, true);
                safeSetState(setCardNotFound, false);
                fetchAttemptsRef.current = 0; // Сбрасываем счетчик при успехе
                blockFetchRef.current = false; // Снимаем блокировку
            } else {
                console.log(`CardContainer(${componentId.current}): Карта не найдена (пустой ответ)`);
                safeSetState(setIsActive, false);
                safeSetState(setCardNotFound, true);
                fetchAttemptsRef.current = 0; // Сбрасываем счетчик при определенном ответе
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
            }
        } catch (error) {
            console.error(`CardContainer(${componentId.current}): Ошибка при получении информации о карте:`, error);
            
            const errorMessage = error instanceof Error ? error.message : String(error);
            
            // Проверяем, является ли ошибка 404 или 500 (оба означают, что карта не найдена)
            if (errorMessage.includes('не найдена') || 
                errorMessage.includes('not found') || 
                errorMessage.includes('404') ||
                errorMessage.includes('500')
            ) {
                console.log(`CardContainer(${componentId.current}): Карта не существует (ошибка 404/500)`);
                safeSetState(setIsActive, false);
                safeSetState(setCardNotFound, true);
                safeSetState(setFetchError, false); // Сбрасываем флаг ошибки, так как это не ошибка
                fetchAttemptsRef.current = 0; // Сбрасываем счетчик при определенном ответе
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
            } else if (errorMessage.includes('временно недоступен') ||
                errorMessage.includes('503')
            ) {
                // Если это ошибка сервера, устанавливаем флаг ошибки сервера
                console.log(`CardContainer(${componentId.current}): Ошибка сервера`);
                safeSetState(setFetchError, true);
                safeSetState(setServerError, true);
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
            } else if (errorMessage.includes('авторизац') ||
                errorMessage.includes('auth') ||
                errorMessage.includes('401')
            ) {
                // Если это ошибка авторизации
                console.log(`CardContainer(${componentId.current}): Ошибка авторизации`);
                safeSetState(setIsAuthorized, false);
                blockFetchRef.current = true; // Блокируем дальнейшие запросы
                safeSetState(setIsLoading, false);
                return;
            } else {
                // Если это другая ошибка, устанавливаем флаг ошибки
                console.log(`CardContainer(${componentId.current}): Неизвестная ошибка`);
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
        console.log(`CardContainer(${componentId.current}): Компонент монтирован`);
        
        // Устанавливаем флаг, что компонент смонтирован
        isMounted.current = true;
        
        // Сначала проверяем авторизацию
        const isUserAuthorized = checkAuthorization();
        
        // Если пользователь не авторизован, прекращаем выполнение
        if (!isUserAuthorized) {
            console.log(`CardContainer(${componentId.current}): Пользователь не авторизован, запросы не будут выполняться`);
            safeSetState(setIsLoading, false);
            return;
        }

        // Если глобальное состояние уже содержит результат успешной загрузки, 
        // и мы не инициализировались с ошибкой, пропускаем запрос
        if (globalState.hasFetchedSuccessfully && !fetchError) {
            console.log(`CardContainer(${componentId.current}): Пропускаем запрос, так как данные уже были загружены ранее`);
            safeSetState(setIsLoading, false);
        } else if (!globalState.hasAttemptedFetch || !blockFetchRef.current) {
            // Выполняем запрос только если не было предыдущих попыток или нет блокировки
            console.log(`CardContainer(${componentId.current}): Выполняем первичный запрос`);
            setTimeout(() => {
                if (isMounted.current && isUserAuthorized) fetchCardInfo();
            }, 100); // Небольшая задержка для стабильности
        }
        
        // Функция очистки при размонтировании компонента
        return () => {
            console.log(`CardContainer(${componentId.current}): Компонент размонтирован`);
            // Отмечаем, что компонент размонтирован, чтобы не обновлять состояние
            isMounted.current = false;
        };
    }, [fetchCardInfo, fetchError, checkAuthorization]);
    
    const handleAddCard = useCallback(() => {
        // Если пользователь не авторизован, не выполняем действие
        if (!isAuthorized) {
            console.log(`CardContainer(${componentId.current}): Попытка добавить карту, но пользователь не авторизован`);
            // Можно перенаправить на страницу авторизации
            window.location.href = '/login';
            return;
        }
        
        if (onAddCard) {
            onAddCard();
        } else {
            // Если не передан обработчик onAddCard, используем прямой запрос на выпуск карты
            handleIssueCard();
        }
    }, [onAddCard, isAuthorized]);

    // Функция для выпуска карты
    const handleIssueCard = useCallback(async () => {
        // Если пользователь не авторизован, не выполняем действие
        if (!isAuthorized) {
            console.log(`CardContainer(${componentId.current}): Попытка выпустить карту, но пользователь не авторизован`);
            // Перенаправляем на страницу авторизации
            window.location.href = '/login';
            return;
        }
        
        try {
            safeSetState(setIsLoading, true);
            console.log(`CardContainer(${componentId.current}): Запрос на выпуск карты...`);
            const response = await api.vcard.issue();
            console.log(`CardContainer(${componentId.current}): Ответ на запрос выпуска карты:`, response);
            
            if (response && response.redirectUrl) {
                console.log(`CardContainer(${componentId.current}): Перенаправление на:`, response.redirectUrl);
                window.location.href = response.redirectUrl;
            } else {
                throw new Error('Отсутствует URL для перенаправления');
            }
        } catch (error) {
            console.error(`CardContainer(${componentId.current}): Ошибка при запросе на выпуск карты:`, error);
            
            // Проверяем, связана ли ошибка с авторизацией
            if (error instanceof Error && 
                (error.message.includes('авторизац') || 
                 error.message.includes('auth') || 
                 error.message.includes('401'))) {
                // Если ошибка связана с авторизацией
                safeSetState(setIsAuthorized, false);
                // Перенаправляем на страницу авторизации
                window.location.href = '/login';
                return;
            }
            
            // Показываем ошибку пользователю
            alert(`Ошибка: ${error instanceof Error ? error.message : 'Произошла ошибка при запросе на выпуск карты'}`);
            
            // Сбрасываем состояние загрузки
            safeSetState(setIsLoading, false);
        }
    }, [safeSetState, isAuthorized]);

    // Функция для обновления информации о карте
    const refreshCardInfo = useCallback(() => {
        // Если пользователь не авторизован, не выполняем действие
        if (!isAuthorized) {
            console.log(`CardContainer(${componentId.current}): Попытка обновить информацию, но пользователь не авторизован`);
            // Перенаправляем на страницу авторизации
            window.location.href = '/login';
            return;
        }
        
        // Вызываем fetchCardInfo с флагом ручного обновления
        console.log(`CardContainer(${componentId.current}): Ручное обновление`);
        fetchCardInfo(true);
    }, [fetchCardInfo, isAuthorized]);

    // Если пользователь не авторизован, отображаем сообщение или редирект
    if (isAuthorized === false) {
        return null; // Не рендерим компонент, если пользователь не авторизован
    }

    return (
        <div className="w-auto h-auto p-4 bg-gray-100 rounded-xl border border-gray-300 flex-col justify-start items-start gap-4 inline-flex overflow-hidden">
            <div className="self-stretch justify-between items-center inline-flex">
                <div className="text-black text-base font-semibold leading-tight">Все карты</div>
                {isActive && (
                    <button 
                        onClick={refreshCardInfo}
                        className="cursor-pointer hover:opacity-80 transition-opacity mr-2"
                        title="Обновить информацию о карте"
                    >
                        <div data-svg-wrapper>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4V1L6 5L10 9V6C13.3 6 16 8.7 16 12C16 15.3 13.3 18 10 18C6.7 18 4 15.3 4 12H2C2 16.4 5.6 20 10 20C14.4 20 18 16.4 18 12C18 7.6 14.4 4 10 4Z" fill="#4B5563"/>
                            </svg>
                        </div>
                    </button>
                )}
                {!isActive && !isLoading && (
                    <button 
                        onClick={handleAddCard}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        title="Добавить карту"
                    >
                        <div data-svg-wrapper>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="20" height="20" rx="10" fill="#D1D5DB"/>
                                <path d="M5.04297 10C5.04297 9.79297 5.11719 9.61523 5.26562 9.4668C5.41406 9.31836 5.5918 9.24414 5.79883 9.24414H9.25V5.79883C9.25 5.5918 9.32227 5.41406 9.4668 5.26562C9.61133 5.11719 9.78906 5.04297 10 5.04297C10.207 5.04297 10.3848 5.11719 10.5332 5.26562C10.6816 5.41406 10.7559 5.5918 10.7559 5.79883V9.24414H14.207C14.4102 9.24414 14.5859 9.31836 14.7344 9.4668C14.8828 9.61523 14.957 9.79297 14.957 10C14.957 10.2109 14.8828 10.3906 14.7344 10.5391C14.5859 10.6836 14.4102 10.7559 14.207 10.7559H10.7559V14.207C10.7559 14.4102 10.6816 14.5859 10.5332 14.7344C10.3848 14.8828 10.207 14.957 10 14.957C9.78906 14.957 9.61133 14.8828 9.4668 14.7344C9.32227 14.5859 9.25 14.4102 9.25 14.207V10.7559H5.79883C5.5918 10.7559 5.41406 10.6836 5.26562 10.5391C5.11719 10.3906 5.04297 10.2109 5.04297 10Z" fill="black"/>
                            </svg>
                        </div>
                    </button>
                )}
            </div>

            {isLoading ? (
                <div className="w-full h-52 p-6 bg-white rounded-xl border-2 border-gray-300 flex flex-col items-center justify-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="text-center text-gray-600 text-sm">
                        Загрузка информации о карте...
                    </p>
                </div>
            ) : fetchError ? (
                <div className="w-full h-52 p-6 bg-white rounded-xl border-2 border-red-300 flex flex-col items-center justify-center gap-4">
                    <p className="text-center text-red-600 text-sm">
                        {serverError 
                            ? 'Сервис временно недоступен. Пожалуйста, попробуйте позже.' 
                            : 'Не удалось загрузить информацию о карте. Пожалуйста, попробуйте позже.'}
                    </p>
                    <button 
                        onClick={refreshCardInfo}
                        className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm"
                    >
                        Попробовать снова
                    </button>
                    <button 
                        onClick={handleAddCard}
                        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                    >
                        Добавить карту
                    </button>
                </div>
            ) : cardNotFound ? (
                <div className="w-full h-52 p-6 bg-white rounded-xl border-2 border-gray-300 flex flex-col items-center justify-center gap-4">
                    <p className="text-center text-gray-600 text-sm mb-4">
                        У вас пока нет виртуальной карты
                    </p>
                    <button
                        onClick={handleAddCard}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                    >
                        Добавить карту
                    </button>
                </div>
            ) : (
                <Card 
                    isActive={isActive}
                    cardNumber={cardNumber}
                    backgroundImage={backgroundImage}
                />
            )}
        </div>
    );
} 