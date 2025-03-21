'use client';

interface LoadingProps {
  error: string | null;
}

export const Loading = ({ error }: LoadingProps) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <div className="text-xl font-semibold text-gray-800">Загрузка...</div>
      
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg max-w-md text-center">
          {error}
        </div>
      )}
    </div>
  );
}; 