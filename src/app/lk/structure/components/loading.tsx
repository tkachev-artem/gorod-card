'use client';

interface LoadingProps {
  error: string | null;
}

export const Loading = ({ error }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-lg sm:text-xl mb-2 text-gray-800">Загрузка данных...</p>
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 