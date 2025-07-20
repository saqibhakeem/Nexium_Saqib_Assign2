'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import loadingAnimation from '@/lottie/loading.json';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Copy,
  Languages,
  ArrowLeft,
  Sparkles,
  Zap,
  Globe2,
  CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';
//import { extractiveSummary } from '../api/summarize/route';

export default function SummarizerPage() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [translated, setTranslated] = useState('');
  const [translating, setTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  async function handleSummarize() {
    if (!url) {
      setError('Please enter a blog URL.');
      return;
    }
    setLoading(true);
    setSummary('');
    setTranslated('');
    setCopied(false);
    setError('');

    try {
      const response = await fetch('/api/scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to summarize blog.');
        setLoading(false);
        return;
      }

      const summaryResult = await fetch('/api/summarize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: result.content }),
});

const summary = await summaryResult.json();

      await new Promise((r) => setTimeout(r, 1000));
      setBlogTitle(result.title || 'Blog Title');
      setSummary(summary.summary);

      setLoading(false);
    } catch (err) {
      setError(`An error occurred while processing the blog. ${err}`);
      setLoading(false);
    }
  }

  const handleTranslate = async () => {
    if (!summary) return;

    setTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: summary,
          service: 'auto', // Change to 'mymemory' or 'google' if needed
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setTranslated(result.translatedText);
      } else {
        setError(result.error || 'Translation failed.');
      }
    } catch (err) {
      setError(`Translation service is unavailable.${err}`);
    } finally {
      setTranslating(false);
    }
  };

  const handleCopy = () => {
    const textToCopy = translated
      ? `${summary}\n\nUrdu Translation:\n${translated}`
      : summary;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0E7D8] via-[#F0E7D8]/90 to-[#5BC0EB]/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-[#5BC0EB]/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Header with back button */}
      <div className="relative z-10 p-6">
        <Link href="/">
          <Button
            variant="outline"
            className="mb-4 bg-white/80 backdrop-blur-sm border-[#33658A] text-[#020202] hover:bg-[#5BC0EB]/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="px-6 py-6 flex flex-col lg:flex-row items-center justify-center gap-12 relative z-10">
        {/* Enhanced Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#5BC0EB]/30 to-[#33658A]/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
          <Image
            priority
            alt="BlinkBlog Logo"
            src="/logo.png"
            width={300}
            height={300}
            className="relative rounded-full drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 border-4 border-white/50"
          />
          <div className="absolute -top-4 -right-4">
            <Sparkles className="w-8 h-8 text-[#5BC0EB] animate-spin" />
          </div>
        </motion.div>

        {/* Enhanced Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-2xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 space-y-6 border border-white/50 relative overflow-hidden"
        >
          {/* Glow effect for form */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5BC0EB]/10 via-transparent to-[#33658A]/10 rounded-3xl"></div>

          <div className="relative z-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#020202] via-[#33658A] to-[#5BC0EB] bg-clip-text text-transparent mb-2">
                ✨ Summarize Your Blog ✨
              </h1>
              <p className="text-[#33658A] text-lg">
                Transform lengthy articles into concise insights
              </p>
            </motion.div>

            {/* URL Input with enhanced styling */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Paste your blog URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border-2 border-[#5BC0EB]/30 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-4 focus:ring-[#5BC0EB]/30 focus:border-[#5BC0EB] bg-white/80 backdrop-blur-sm placeholder-[#33658A]/60 transition-all duration-300 hover:border-[#5BC0EB]/50"
              />
              <Globe2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#5BC0EB]/60" />
            </div>

            {/* Enhanced Submit Button */}
            <Button
              onClick={handleSummarize}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#5BC0EB] to-[#33658A] text-white hover:from-[#33658A] hover:to-[#020202] disabled:opacity-50 py-4 text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <Zap className="w-6 h-6" />
                    </motion.div>
                    Processing Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    🔍 Summarize Now
                    <Zap className="w-6 h-6" />
                  </>
                )}
              </span>
            </Button>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-100 border-2 border-red-300 text-red-700 px-6 py-3 rounded-2xl text-center font-semibold mt-4 shadow-lg"
              >
                {error}
              </motion.div>
            )}

            {/* Loading Animation */}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center space-y-4 mt-8"
              >
                <Lottie
                  animationData={loadingAnimation}
                  loop
                  className="w-32 h-32"
                />
                <p className="text-[#33658A] font-semibold text-lg">
                  AI is working its magic... ✨
                </p>
              </motion.div>
            )}

            {/* Summary Results */}
            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#5BC0EB]/10 via-white/50 to-[#33658A]/10 backdrop-blur-sm text-[#020202] p-6 rounded-3xl border-2 border-[#5BC0EB]/30 space-y-6 mt-6 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>

                <div className="relative z-10">
                  {/* Blog Title */}
                  <div className="mb-6">
                    <h2 className="font-bold mb-3 text-[#33658A] flex items-center gap-3 text-lg">
                      <BookOpen className="w-6 h-6" />
                      Blog Title:
                    </h2>
                    <p className="font-semibold text-xl bg-gradient-to-r from-[#020202] to-[#33658A] bg-clip-text text-transparent">
                      {blogTitle}
                    </p>
                  </div>

                  {/* Summary Content */}
                  <div className="mb-6">
                    <h2 className="font-bold mb-3 text-[#33658A] text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Summary:
                    </h2>
                    <div className="bg-white/80 p-4 rounded-2xl border border-[#5BC0EB]/20 shadow-inner">
                      <p className="text-lg leading-relaxed">{summary}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleTranslate}
                      disabled={translating}
                      variant="outline"
                      className="flex-1 flex items-center justify-center gap-3 py-3 text-lg bg-white/80 border-2 border-[#33658A] text-[#33658A] hover:bg-[#33658A] hover:text-white transition-all duration-300 rounded-xl group"
                    >
                      <Languages className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      {translating ? 'Translating...' : 'Translate to Urdu 🇵🇰'}
                    </Button>
                    <Button
                      onClick={handleCopy}
                      variant="secondary"
                      className="flex-1 flex items-center justify-center gap-3 py-3 text-lg bg-[#F0E7D8] border-2 border-[#5BC0EB] text-[#020202] hover:bg-[#5BC0EB] hover:text-white transition-all duration-300 rounded-xl group"
                    >
                      {copied ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      )}
                      {copied ? 'Copied! ✅' : 'Copy Summary'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Translation Results */}
            {translated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-[#F0E7D8] via-white/50 to-[#5BC0EB]/10 backdrop-blur-sm text-[#020202] p-6 rounded-3xl border-2 border-[#33658A]/30 mt-6 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>

                <div className="relative z-10">
                  <h2 className="font-bold mb-4 flex items-center gap-3 text-[#33658A] text-lg">
                    <Languages className="w-6 h-6" />
                    Urdu Translation: 🇵🇰
                  </h2>
                  <div className="bg-white/80 p-6 rounded-2xl border-2 border-dashed border-[#33658A]/50 shadow-inner">
                    <p
                      className="text-right leading-loose text-lg"
                      dir="rtl"
                      lang="ur"
                    >
                      {translated}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Translation Loading */}
            {translating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center space-y-4 mt-6"
              >
                <Lottie
                  animationData={loadingAnimation}
                  loop
                  className="w-20 h-20"
                />
                <span className="text-[#33658A] font-semibold text-lg flex items-center gap-2">
                  <Languages className="w-5 h-5 animate-bounce" />
                  Translating to Urdu... 🇵🇰
                </span>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Floating glow effects */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-[#5BC0EB]/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-24 h-24 bg-[#33658A]/15 rounded-full blur-2xl animate-bounce pointer-events-none"></div>
    </div>
  );
}
