import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edge CMS',
  description: 'Edge-Optimized Headless CMS Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
