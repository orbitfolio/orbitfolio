'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, signOut } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, PieChart, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { formatCurrency, formatPercent } from '@/lib/utils';

export default function Dashboard() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const portfolioStats = {
    total_value: 125430.50,
    total_invested: 100000,
    total_return: 25430.50,
    return_percent: 25.43,
    day_change: 1234.56,
    day_change_percent: 0.99,
  };

  const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', quantity: 50, current_value: 8750, return_percent: 15.2 },
    { symbol: 'RELIANCE.NS', name: 'Reliance Industries', quantity: 100, current_value: 12500, return_percent: 22.5 },
    { symbol: 'bitcoin', name: 'Bitcoin', quantity: 0.5, current_value: 21500, return_percent: 45.8 },
  ];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });
  }, [router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Orbitfolio
          </h1>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.email?.split('@')[0]}!</h2>
          <p className="text-muted-foreground">Here's your portfolio overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioStats.total_value)}</div>
              <p className="text-xs text-muted-foreground">
                Invested: {formatCurrency(portfolioStats.total_invested)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(portfolioStats.total_return)}
              </div>
              <p className="text-xs text-green-600">
                {formatPercent(portfolioStats.return_percent)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Day Change</CardTitle>
              {portfolioStats.day_change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${portfolioStats.day_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(portfolioStats.day_change)}
              </div>
              <p className={`text-xs ${portfolioStats.day_change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatPercent(portfolioStats.day_change_percent)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Holdings</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{holdings.length}</div>
              <p className="text-xs text-muted-foreground">
                Across 3 asset types
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
            <CardDescription>Overview of your current investments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {holdings.map((holding) => (
                <div
                  key={holding.symbol}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="font-semibold">{holding.symbol}</p>
                    <p className="text-sm text-muted-foreground">{holding.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(holding.current_value)}</p>
                    <p className={`text-sm ${holding.return_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercent(holding.return_percent)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon Section */}
        <div className="mt-8 p-8 border-2 border-dashed rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">More Features Coming Soon!</h3>
          <p className="text-muted-foreground mb-4">
            We're building advanced analytics, technical charts, and portfolio management tools.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
              Technical Analysis
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm">
              CSV Upload
            </span>
            <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded-full text-sm">
              Advanced Charts
            </span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
              Risk Metrics
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
