import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Sparkles } from 'lucide-react';

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
  icons: {
    icon: '/logo.png',
  },
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
          {/* Enhanced Navbar with glow effect */}
          <div className="navbar bg-gradient-to-r from-[#020202] via-[#1a1a1a] to-[#020202] shadow-2xl border-b border-[#33658A]/30 backdrop-blur-sm relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#5BC0EB]/10 via-transparent to-[#5BC0EB]/10"></div>
            <div className="flex-1 relative z-10">
              <a className="btn btn-ghost text-xl text-[#F0E7D8] hover:text-[#5BC0EB] transition-all duration-300 font-bold tracking-wide">
                <Sparkles className="w-6 h-6 mr-2 animate-pulse" />
                BlinkBlog
              </a>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
