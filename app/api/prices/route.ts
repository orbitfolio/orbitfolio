import { NextRequest, NextResponse } from 'next/server';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const priceCache = new Map<string, { price: number; timestamp: number }>();

async function fetchYahooPrice(symbol: string): Promise<number | null> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`,
      { next: { revalidate: 300 } }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    const quote = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    
    return quote || null;
  } catch (error) {
    console.error(`Error fetching price for ${symbol}:`, error);
    return null;
  }
}

async function fetchCryptoPrice(symbol: string): Promise<number | null> {
  try {
    const coinId = symbol.toLowerCase().replace('usd', '');
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
      { next: { revalidate: 300 } }
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return data[coinId]?.usd || null;
  } catch (error) {
    console.error(`Error fetching crypto price for ${symbol}:`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const symbols = searchParams.get('symbols')?.split(',') || [];
  const type = searchParams.get('type') || 'stock';

  if (symbols.length === 0) {
    return NextResponse.json({ error: 'No symbols provided' }, { status: 400 });
  }

  const prices: Record<string, number | null> = {};

  for (const symbol of symbols) {
    const cached = priceCache.get(symbol);
    const now = Date.now();

    if (cached && now - cached.timestamp < CACHE_DURATION) {
      prices[symbol] = cached.price;
      continue;
    }

    let price: number | null = null;

    if (type === 'crypto') {
      price = await fetchCryptoPrice(symbol);
    } else {
      price = await fetchYahooPrice(symbol);
    }

    if (price !== null) {
      priceCache.set(symbol, { price, timestamp: now });
      prices[symbol] = price;
    } else {
      prices[symbol] = null;
    }
  }

  return NextResponse.json({ prices });
}
