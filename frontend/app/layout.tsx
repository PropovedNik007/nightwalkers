// components/RootLayout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import MiniLayout from './components/mainLayout';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Use MiniLayout as the main layout */}
        <MiniLayout>{children}</MiniLayout>
      </body>
    </html>
  );
}
