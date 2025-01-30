'use client'; // Error boundaries must be Client Components

import NextError from 'next/error';

interface ErrorBoundaryProps {
  error: { message: string; statusCode?: number };
}

export default function ErrorBoundary({ error }: ErrorBoundaryProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <NextError
        title={error.message}
        statusCode={error.statusCode || 500} // Default to 500 if no status code is provided
      />
    </div>
  );
}
