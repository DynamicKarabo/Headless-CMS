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
    <html lang="en" className="dark">
      <body className="bg-black text-[#ededed] min-h-screen antialiased selection:bg-neutral-800">
        {children}
      </body>
    </html>
  );
}
