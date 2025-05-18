'use client';
// import '@heroui/react/dist/index'; 
import { HeroUIProvider } from '@heroui/react';

export default function HeroUIWrapper({ children }) {
  return (
    <HeroUIProvider>
      {children}
    </HeroUIProvider>
  );
}
