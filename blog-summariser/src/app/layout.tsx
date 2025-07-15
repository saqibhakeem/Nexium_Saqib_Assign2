import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BlinkBlog - Blog Summarizer',
  description:
    'Summarize any blog instantly, in simple words — and even get the summary in Urdu! AI-powered, distraction-free reading. Fast. Clear. Effortless',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <div className="navbar bg-[#020202] shadow-sm absolute px-6">
            <div className="flex items-center ">
              <span className="text-2xl font-semibold text-[#F0E7D8]">
                BlinkBlog
              </span>
            </div>

          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
