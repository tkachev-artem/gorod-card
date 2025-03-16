'use client';

interface LoadingProps {
  error: string | null;
}

export const Loading = ({ error }: LoadingProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="text-lg text-gray-600">Загрузка...</div>
      )}
    </div>
  );
}; 