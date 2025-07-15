'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import loadingAnimation from '@/lottie/loading.json';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Copy, Languages } from 'lucide-react';

export default function SummarizerPage() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [translated, setTranslated] = useState('');
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
  
      const response = await fetch('/api/scraper', {
        method: 'POST',
        body: JSON.stringify({ url }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || 'Failed to summarize blog.');
        setLoading(false);
        return;
      }
      await new Promise((r) => setTimeout(r, 1000));
      setBlogTitle(result.title || 'Blog Title');
      setSummary(result.content);

    setLoading(false);
  }

  const handleTranslate = () => {
    if (!summary) return;
    setTranslated('یہ بلاگ کا ایک خلاصہ ہے جو اردو میں ترجمہ کیا گیا ہے۔');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F0E7D8] px-6 py-12 flex flex-col lg:flex-row items-center justify-around gap-12">
      <Image
        priority
        alt="Logo"
        src="/logo.png"
        width={280}
        height={280}
        className="rounded drop-shadow-lg"
      />

      <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-8 space-y-6 transition-all">
        <h1 className="text-3xl font-bold text-center text-[#020202]">
          ✨ Summarize a Blog ✨
        </h1>

        <input
          type="text"
          placeholder="Paste blog URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5BC0EB]"
        />

        <Button
          onClick={handleSummarize}
          className="w-full bg-[#5BC0EB] text-[#020202] hover:bg-[#33658A]"
        >
          🔍 Summarize
        </Button>
        {error && (
          <div className="text-red-600 text-center font-semibold mt-2">
            {error}
          </div>
        )}

        {loading && (
          <div className="flex justify-center">
            <Lottie
              animationData={loadingAnimation}
              loop
              className="w-28 h-28"
            />
          </div>
        )}

        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#5BC0EB]/10 text-[#020202] p-4 rounded border border-[#5BC0EB] space-y-4"
          >
            <div>
              <h2 className="font-semibold mb-1 text-[#33658A] flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Blog Title:
              </h2>
              <p className="font-medium">{blogTitle}</p>
            </div>

            <div>
              <h2 className="font-semibold mb-1">Summary:</h2>
              <p>{summary}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleTranslate}
                variant="outline"
                className="flex-1 flex items-center gap-2"
              >
                <Languages className="w-4 h-4" /> Translate to Urdu 🇵🇰
              </Button>
              <Button
                onClick={handleCopy}
                variant="secondary"
                className="flex-1 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />{' '}
                {copied ? 'Copied!' : 'Copy Summary'}
              </Button>
            </div>
          </motion.div>
        )}

        {translated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#F0E7D8] text-[#020202] p-4 rounded border mt-4 border-[#33658A]"
          >
            <h2 className="font-semibold mb-2">Urdu Translation:</h2>
            <p className="font-bold text-lg mb-1">📘 پروڈکٹیو رہنے کا طریقہ</p>
            <p>{translated}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
