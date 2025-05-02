'use client';

import { useRouter } from 'next/navigation';

export function ModalFromTest({ children, locale }) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="absolute inset-0 bg-white p-4 rounded-lg shadow-lg max-w-md w-3/5 mx-auto">
        <h2 className="text-xl font-bold">Modal</h2>
        <p className="text-gray-700">This is a modal.</p>
        {children}
        <button
          onClick={() => {
            router.back();
          }}
          className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition duration-200"
          aria-label="Close modal"
        >
          Close modal
        </button>
      </div>
    </div>
  );
}
