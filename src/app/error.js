'use client';

import '@/styles/globals.css';

import { useEffect } from 'react';

export default function Error({ error }) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl">Oops, something went wrong!</h1>
    </div>
  );
}
