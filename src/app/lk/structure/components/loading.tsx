'use client';

interface LoadingProps {
  error: string | null;
}

export const Loading = ({ error }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-xl mb-2">Загрузка...</p>
        {error && (
          <p className="text-red-500 mt-2">
            Ошибка: {error}
          </p>
        )}
      </div>
    </div>
  );
}; 