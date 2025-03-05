"use client"

import React, { ReactNode } from 'react';
import Header from './Header';
import { CartProvider } from './ShoppingCartContext';

interface AppWrapperProps {
  children: ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow w-screen overflow-x-hidden">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}