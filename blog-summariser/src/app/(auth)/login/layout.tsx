import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Login - BlinkBlog',
  description:
    'Login to BlinkBlog to access your personalized blog summarization experience. Quickly summarize blogs in simple words, including summaries in Urdu. Enjoy AI-powered, distraction-free reading that is fast, clear, and effortless.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>
        <div className="navbar bg-[#020202] shadow-sm absolute px-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-semibold text-[#F0E7D8]">
                BlinkBlog
              </span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <Button variant="nav">Register</Button>
            </div>
          </div>
        </div>
      </header>

      {children}
    </>
  );
}
