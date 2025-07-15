import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="navbar bg-[#020202] shadow-s ">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-[#F0E7D8] ">BlinkBlog</a>
        </div>
      </div>

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: 'url(/landing-page-bg.png)',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 w-full">
          <div className="max-w-md w-full bg-opacity-80 rounded-lg p-6 sm:p-8 md:p-10 lg:p-12">
            <h1 className="mb-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              AI Blog Summarizer
            </h1>
            <p className="mb-5 text-base sm:text-lg md:text-xl">
              <span className="font-bold block mb-2">
                Too many blogs, too little time?
              </span>
              <span className="block">
                Summarize any blog instantly, in simple words — and even get the
                summary in Urdu! AI-powered, distraction-free reading. Fast.
                Clear. Effortless.
              </span>
            </p>

            <Link href="/summarizer">
            <Button className="btn bg-[#F0E7D8] font-bold text-[#020202] hover:bg-[#5BC0EB] border-[#33658A] w-full sm:w-auto py-2 px-4 text-base sm:text-lg">
              Get Started
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
