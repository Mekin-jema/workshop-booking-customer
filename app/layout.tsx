import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// import ReduxProvider from '@/providers/ReduxProvider';
// import { ToastContainer } from 'react-toastify';
import { Toaster } from 'sonner';
import { ReduxProvider } from '@/providers/ReduxProvider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
// import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Workshop Booking System',
  description: 'Book your favorite workshops',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          {/* <Navbar /> */}
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster position="bottom-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
