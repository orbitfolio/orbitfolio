'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, signInWithGoogle, signInWithGithub } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart, BarChart3, Shield, Zap, Globe } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard');
      }
      setLoading(false);
    });
  }, [router]);

  const handleGoogleSignIn = async () => {
    const { error } = await signInWithGoogle();
    if (error) console.error('Error signing in:', error);
  };

  const handleGithubSignIn = async () => {
    const { error } = await signInWithGithub();
    if (error) console.error('Error signing in:', error);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-6 text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Orbitfolio
          </h1>
          <p className="mb-8 text-2xl text-gray-700 dark:text-gray-300">
            Your Complete Portfolio Analyzer & Tracker
          </p>
          <p className="mb-12 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track stocks, mutual funds, and cryptocurrencies across Indian, US, and Canadian markets.
            Get technical analysis, fundamental insights, and real-time portfolio analytics.
          </p>

          {/* Auth Buttons */}
          <div className="flex gap-4 justify-center mb-16">
            <Button
              size="lg"
              onClick={handleGoogleSignIn}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleGithubSignIn}
              className="border-2"
            >
              <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 mb-4 text-blue-600" />
              <CardTitle>Multi-Market Tracking</CardTitle>
              <CardDescription>
                Track stocks and mutual funds across Indian (NSE/BSE), US (NYSE/NASDAQ), and Canadian (TSX) markets, plus cryptocurrencies.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 mb-4 text-purple-600" />
              <CardTitle>Technical Analysis</CardTitle>
              <CardDescription>
                Advanced charting with candlesticks, moving averages, RSI, MACD, Bollinger Bands, and more technical indicators.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <PieChart className="h-12 w-12 mb-4 text-pink-600" />
              <CardTitle>Portfolio Analytics</CardTitle>
              <CardDescription>
                Real-time returns, risk metrics, correlation analysis, asset allocation, and comprehensive performance tracking.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 mb-4 text-green-600" />
              <CardTitle>Fundamental Data</CardTitle>
              <CardDescription>
                P/E ratios, market cap, dividend yields, 52-week highs/lows, sector analysis, and company information.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="h-12 w-12 mb-4 text-yellow-600" />
              <CardTitle>Smart Search</CardTitle>
              <CardDescription>
                Fuzzy search across 120,000+ tickers with instant results. CSV bulk upload for easy portfolio import.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Globe className="h-12 w-12 mb-4 text-indigo-600" />
              <CardTitle>Free Forever</CardTitle>
              <CardDescription>
                Built on free-tier infrastructure (Vercel + Supabase + Yahoo Finance + CoinGecko). No hidden costs.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p>Built with Next.js, Supabase, TailwindCSS, and ❤️</p>
        </div>
      </div>
    </div>
  );
}
