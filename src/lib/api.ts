export const api = {
  // Вспомогательная функция для получения токена авторизации
  getAuthToken: () => {
    let token = null;
    if (typeof window !== 'undefined') {
      // Проверяем cookie
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'authToken') {
          token = value;
          break;
        }
      }
      
      // Если токен не найден в cookie, проверяем localStorage
      if (!token) {
        try {
          token = localStorage.getItem('authToken');
        } catch (e) {
          console.error('API: Ошибка при доступе к localStorage:', e);
        }
      }
    }
    
    return token;
  },

  signupStep1: async (email: string, firstName: string, lastName: string) => {
    try {
      const response = await fetch('/api/Auth/register-step1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName }),
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        let errorData = { message: 'Ошибка при регистрации' };
        
        try {
          // Проверяем, есть ли в ответе JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            if (text) {
              errorData = JSON.parse(text);
            }
          } else {
            // Если ответ не JSON, пытаемся получить текст ошибки
            const errorText = await response.text();
            if (errorText) {
              errorData.message = errorText;
            }
          }
        } catch (jsonError) {
          console.error('Ошибка при обработке ответа:', jsonError);
        }
        
        console.error('Server error:', errorData);
        throw new Error(errorData.message || 'Ошибка при регистрации');
      }
      
      try {
        // Проверяем, есть ли в ответе JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          return { success: true }; // Возвращаем простой объект, если ответ не JSON
        }
        
        const text = await response.text();
        if (!text) {
          return { success: true }; // Возвращаем простой объект, если ответ пустой
        }
        
        return JSON.parse(text);
      } catch (jsonError) {
        console.error('Ошибка при обработке JSON ответа:', jsonError);
        return { success: true }; // Возвращаем простой объект в случае ошибки
      }
    } catch (error) {
      console.error('Network error details:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Не удалось подключиться к серверу. Возможно, сервер недоступен.');
      }
      throw error;
    }
  },

  signupStep2: async (email: string, firstName: string, lastName: string, verificationCode: string) => {
    try {
      const response = await fetch('/api/Auth/register-step2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, firstName, lastName, verificationCode }),
      });
      
      if (!response.ok) {
        let errorData = { message: 'Ошибка при подтверждении кода' };
        
        try {
          // Проверяем, есть ли в ответе JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            if (text) {
              errorData = JSON.parse(text);
            }
          } else {
            // Если ответ не JSON, пытаемся получить текст ошибки
            const errorText = await response.text();
            if (errorText) {
              errorData.message = errorText;
            }
          }
        } catch (jsonError) {
          console.error('Ошибка при обработке ответа:', jsonError);
        }
        
        throw new Error(errorData.message || 'Ошибка при подтверждении кода');
      }
      
      try {
        // Проверяем, есть ли в ответе JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          return { success: true }; // Возвращаем простой объект, если ответ не JSON
        }
        
        const text = await response.text();
        if (!text) {
          return { success: true }; // Возвращаем простой объект, если ответ пустой
        }
        
        return JSON.parse(text);
      } catch (jsonError) {
        console.error('Ошибка при обработке JSON ответа:', jsonError);
        return { success: true }; // Возвращаем простой объект в случае ошибки
      }
    } catch (error) {
      console.error('Network error details:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Не удалось подключиться к серверу. Возможно, сервер недоступен.');
      }
      throw error;
    }
  },

  // Для обратной совместимости
  registerStep1: async (email: string, firstName: string, lastName: string) => {
    return api.signupStep1(email, firstName, lastName);
  },

  registerStep2: async (email: string, firstName: string, lastName: string, verificationCode: string) => {
    return api.signupStep2(email, firstName, lastName, verificationCode);
  },

  login: async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при входе');
      }
      
      const data = await response.json();
      
      // Проверяем, что в ответе есть токен
      if (!data.token) {
        throw new Error('Сервер не вернул токен авторизации');
      }
      
      // Сохраняем токен в cookies
      document.cookie = `authToken=${data.token}; path=/; max-age=2592000`; // 30 дней
      
      // Также сохраняем токен в localStorage для совместимости
      try {
        localStorage.setItem('authToken', data.token);
      } catch (e) {
        console.error('Ошибка при сохранении токена в localStorage:', e);
      }
      
      console.log('Токен сохранен в cookies и localStorage');
      
      return data;
    } catch (error) {
      console.error('Network error details:', error);
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Не удалось подключиться к серверу. Возможно, сервер недоступен.');
      }
      throw error;
    }
  },

  // Методы для работы с виртуальной картой
  vcard: {
    // Запрос на выпуск виртуальной карты
    request: async () => {
      try {
        console.log('API: Отправка запроса на выпуск карты...');
        
        // Получаем токен авторизации
        const token = api.getAuthToken();
        
        if (!token) {
          console.error('API: Токен авторизации не найден');
          throw new Error('Необходима авторизация. Пожалуйста, войдите в систему и попробуйте снова.');
        }
        
        console.log('API: Токен авторизации найден, добавляем в заголовки');
        
        const response = await fetch('/api/VCard/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        
        console.log('API: Получен ответ от сервера:', response.status);
        
        // Если статус 200-299, считаем запрос успешным, даже если ответ пустой
        if (response.ok) {
          console.log('API: Запрос успешно выполнен (статус ' + response.status + ')');
          return { success: true };
        }
        
        // Обработка ошибки
        let errorData = { message: 'Ошибка при запросе на выпуск карты' };
        
        try {
          // Проверяем, есть ли в ответе JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            if (text) {
              errorData = JSON.parse(text);
              // Проверяем, не пустой ли объект ошибки
              if (errorData && Object.keys(errorData).length === 0) {
                console.log('API: Получен пустой объект ошибки, используем сообщение по умолчанию');
                errorData = { message: `Ошибка сервера (${response.status})` };
              }
            }
          } else {
            // Если ответ не JSON, пытаемся получить текст ошибки
            const errorText = await response.text();
            if (errorText) {
              errorData.message = errorText;
            } else {
              // Если текст ошибки пустой, используем статус код
              errorData.message = `Ошибка сервера (${response.status})`;
            }
          }
        } catch (jsonError) {
          console.error('Ошибка при обработке ответа:', jsonError);
          errorData.message = `Ошибка сервера (${response.status})`;
        }
        
        console.error('API: Ошибка от сервера:', errorData);
        throw new Error(errorData.message || 'Ошибка при запросе на выпуск карты');
      } catch (error) {
        console.error('API: Ошибка сети:', error);
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          throw new Error('Не удалось подключиться к серверу. Возможно, сервер недоступен.');
        }
        throw error;
      }
    },

    // Подтверждение пин-кода и выпуск виртуальной карты
    confirm: async (pinCode: string) => {
      try {
        console.log('API: Отправка запроса на подтверждение пин-кода:', pinCode);
        
        // Получаем токен авторизации
        const token = api.getAuthToken();
        
        if (!token) {
          console.error('API: Токен авторизации не найден');
          throw new Error('Необходима авторизация. Пожалуйста, войдите в систему и попробуйте снова.');
        }
        
        const response = await fetch('/api/VCard/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(pinCode),
        });
        
        console.log('API: Получен ответ от сервера:', response.status);
        
        // Если статус 200-299, считаем запрос успешным, даже если ответ пустой
        if (response.ok) {
          console.log('API: Запрос успешно выполнен (статус ' + response.status + ')');
          return { success: true };
        }
        
        // Обработка ошибки
        let errorData = { message: 'Ошибка при подтверждении пин-кода' };
        
        try {
          // Проверяем, есть ли в ответе JSON
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const text = await response.text();
            if (text) {
              errorData = JSON.parse(text);
              // Проверяем, не пустой ли объект ошибки
              if (errorData && Object.keys(errorData).length === 0) {
                console.log('API: Получен пустой объект ошибки, используем сообщение по умолчанию');
                errorData = { message: `Ошибка сервера (${response.status})` };
              }
            }
          } else {
            // Если ответ не JSON, пытаемся получить текст ошибки
            const errorText = await response.text();
            if (errorText) {
              errorData.message = errorText;
            } else {
              // Если текст ошибки пустой, используем статус код
              errorData.message = `Ошибка сервера (${response.status})`;
            }
          }
        } catch (jsonError) {
          console.error('Ошибка при обработке ответа:', jsonError);
          errorData.message = `Ошибка сервера (${response.status})`;
        }
        
        console.error('API: Ошибка от сервера:', errorData);
        throw new Error(errorData.message || 'Ошибка при подтверждении пин-кода');
      } catch (error) {
        console.error('API: Ошибка сети:', error);
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          throw new Error('Не удалось подключиться к серверу. Возможно, сервер недоступен.');
        }
        throw error;
      }
    },

    // Получение информации о виртуальной карте
    getInfo: async () => {
      try {
        console.log('API: Отправка запроса на получение информации о карте...');
        
        // Получаем токен авторизации
        const token = api.getAuthToken();
        
        if (!token) {
          console.error('API: Токен авторизации не найден');
          throw new Error('Необходима авторизация. Пожалуйста, войдите в систему и попробуйте снова.');
        }
        
        console.log('API: Токен авторизации найден, добавляем в заголовки');
        
        // Добавляем timestamp к URL чтобы избежать кэширования
        const timestamp = new Date().getTime();
        const response = await fetch(`/api/VCard/info?t=${timestamp}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
            'Authorization': `Bearer ${token}`
          },
          cache: 'no-store',
          next: { revalidate: 0 }
        });
        
        console.log('API: Получен ответ от сервера:', response.status);
        
        // Если статус 404 или 500, значит карта не найдена, но это не ошибка
        if (response.status === 404 || response.status === 500) {
          console.log('API: Карта не найдена (статус 404/500)');
          return null; // Возвращаем null вместо ошибки
        }
        
        if (!response.ok) {
          // Проверяем, есть ли в ответе JSON
          const contentType = response.headers.get('content-type');
          let errorData = { message: 'Неизвестная ошибка сервера' };
          
          if (contentType && contentType.includes('application/json')) {
            try {
              errorData = await response.json();
            } catch (jsonError) {
              console.error('API: Ошибка при обработке JSON в ответе с ошибкой:', jsonError);
            }
          } else {
            try {
              // Пытаемся получить текст ошибки
              const errorText = await response.text();
              errorData.message = errorText || errorData.message;
            } catch (textError) {
              console.error('API: Не удалось получить текст ошибки:', textError);
            }
          }
          
          console.error('API: Ошибка от сервера:', errorData);
          throw new Error(errorData.message || 'Ошибка при получении информации о карте');
        }
        
        // Проверяем, есть ли в ответе JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error('API: Ответ сервера не содержит JSON');
          return null;
        }
        
        try {
          const data = await response.json();
          console.log('API: Данные от сервера:', data);
          
          // Проверяем, что данные не null и содержат cardNumber
          if (!data || !data.cardNumber) {
            console.log('API: Получены некорректные данные (без номера карты)');
            return null;
          }
          
          return data;
        } catch (jsonError) {
          console.error('API: Ошибка при обработке JSON ответа:', jsonError);
          return null;
        }
      } catch (error) {
        console.error('API: Ошибка сети:', error);
        
        // Проверяем, содержит ли сообщение об ошибке информацию о том, что карта не найдена
        // или о статусе 500 (который также означает, что карта не найдена)
        if (error instanceof Error && 
            (error.message.includes('не найдена') || 
             error.message.includes('not found') || 
             error.message.includes('404') ||
             error.message.includes('500'))) {
          console.log('API: Карта не найдена (из сообщения об ошибке)');
          return null; // Возвращаем null вместо ошибки
        }
        
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          throw new Error('Не удалось подключиться к серверу. Возможно, сервер недоступен.');
        }
        throw error;
      }
    },

    // Запрос на выпуск виртуальной карты
    issue: async () => {
      try {
        console.log('API: Отправка запроса на выпуск карты...');
        
        // Получаем токен авторизации
        const token = api.getAuthToken();
        
        console.log('API: Проверка наличия токена перед запросом:', token ? 'Токен найден' : 'Токен не найден');
        
        if (!token) {
          console.error('API: Токен авторизации не найден');
          throw new Error('Необходима авторизация. Пожалуйста, войдите в систему и попробуйте снова.');
        }
        
        const response = await fetch('/api/VCard/issue', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        
        console.log('API: Получен ответ от сервера:', response.status);
        
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
            console.error('API: Ошибка от сервера:', errorData);
          } catch (jsonError) {
            console.error('API: Не удалось прочитать JSON ответ:', jsonError);
            errorData = { message: `Ошибка сервера (${response.status})` };
          }
          
          // Если ошибка 401, значит проблема с авторизацией
          if (response.status === 401) {
            console.log('API: Ошибка авторизации (401)');
            throw new Error('Необходима авторизация. Пожалуйста, войдите в систему и попробуйте снова.');
          }
          
          throw new Error(errorData.message || `Ошибка при запросе на выпуск карты (${response.status})`);
        }
        
        let data;
        try {
          data = await response.json();
          console.log('API: Данные от сервера:', data);
        } catch (jsonError) {
          console.error('API: Не удалось прочитать JSON ответ:', jsonError);
          throw new Error('Получен некорректный ответ от сервера');
        }
        
        return data;
      } catch (error) {
        console.error('API: Ошибка сети при выпуске карты:', error);
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          throw new Error('Не удалось подключиться к серверу. Возможно, сервер недоступен.');
        }
        throw error;
      }
    },
  },
}; 