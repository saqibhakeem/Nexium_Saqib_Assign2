'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Zap, Globe, Clock } from "lucide-react";

export default function Home() {
  return (
    <>


      {/* Enhanced Hero Section */}
      <div
        className="hero min-h-screen relative overflow-hidden bg-gradient-to-br from-[#F0E7D8] via-[#F0E7D8]/90 to-[#5BC0EB]/20"
        // style={{
        //   backgroundImage: 'url(/landing-page-bg.png)',
        // }}
      >
        {/* Animated background overlay */}
        <div className="hero-overlay bg-gradient-to-br from-black/70 via-[#020202]/60 to-[#33658A]/40"></div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#5BC0EB]/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="hero-content text-neutral-content text-center flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 w-full relative z-10">
          <div className="max-w-4xl w-full">
            {/* Main content card with enhanced styling */}
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 border border-white/20 shadow-2xl relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5BC0EB]/20 via-transparent to-[#33658A]/20 rounded-3xl blur-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F0E7D8]/10 via-transparent to-[#5BC0EB]/10 rounded-3xl"></div>
              
              <div className="relative z-10">
                {/* Enhanced title with glow */}
                <h1 className="mb-8 text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-[#F0E7D8] via-[#5BC0EB] to-[#F0E7D8] bg-clip-text text-transparent animate-pulse">
                  AI Blog Summarizer
                </h1>
                
                {/* Subtitle with icon */}
                <div className="mb-8 space-y-4">
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#5BC0EB] flex items-center justify-center gap-3">
                    <Clock className="w-8 h-8 animate-spin" />
                    Too many blogs, too little time?
                  </p>
                  
                  <p className="text-lg sm:text-xl md:text-2xl text-[#F0E7D8] leading-relaxed max-w-3xl mx-auto">
                    Summarize any blog instantly, in simple words — and even get the 
                    summary in <span className="text-[#5BC0EB] font-bold">Urdu! 🇵🇰</span> 
                    <br />
                    AI-powered, distraction-free reading. Fast. Clear. Effortless.
                  </p>
                </div>

                {/* Feature highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  <div className="flex flex-col items-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <Zap className="w-12 h-12 text-[#5BC0EB] mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-bold text-[#F0E7D8] text-lg">Lightning Fast</h3>
                    <p className="text-[#F0E7D8]/80 text-sm text-center">Get summaries in seconds</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <Globe className="w-12 h-12 text-[#5BC0EB] mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-bold text-[#F0E7D8] text-lg">Multi-Language</h3>
                    <p className="text-[#F0E7D8]/80 text-sm text-center">English & Urdu support</p>
                  </div>
                  
                  <div className="flex flex-col items-center p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                    <Sparkles className="w-12 h-12 text-[#5BC0EB] mb-3 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
                    <h3 className="font-bold text-[#F0E7D8] text-lg">AI Powered</h3>
                    <p className="text-[#F0E7D8]/80 text-sm text-center">Smart & accurate summaries</p>
                  </div>
                </div>

                {/* Enhanced CTA button */}
                <Link href="/summarizer">
                  <Button className="group relative bg-gradient-to-r from-[#F0E7D8] to-[#5BC0EB] font-bold text-[#020202] hover:from-[#5BC0EB] hover:to-[#33658A] border-2 border-[#33658A] px-12 py-4 text-xl rounded-full shadow-2xl hover:shadow-[#5BC0EB]/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                    <span className="relative flex items-center gap-3">
                      <Sparkles className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                      Get Started
                      <Zap className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
                    </span>
                  </Button>
                </Link>

                {/* Floating elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#5BC0EB]/20 rounded-full blur-xl animate-bounce"></div>
                <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-[#F0E7D8]/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional glow effects */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(91, 192, 235, 0.3); }
          50% { box-shadow: 0 0 40px rgba(91, 192, 235, 0.6), 0 0 60px rgba(91, 192, 235, 0.3); }
        }
        
        .hero-content > div {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}