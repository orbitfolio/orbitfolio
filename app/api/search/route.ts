import { NextRequest, NextResponse } from 'next/server';
import Fuse from 'fuse.js';

// This will be populated from a static JSON file
// For now, using a sample dataset
const TICKERS = [
  // Indian Stocks
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries', type: 'stock', exchange: 'NSE', country: 'IN' },
  { symbol: 'TCS.NS', name: 'Tata Consultancy Services', type: 'stock', exchange: 'NSE', country: 'IN' },
  { symbol: 'INFY.NS', name: 'Infosys', type: 'stock', exchange: 'NSE', country: 'IN' },
  { symbol: 'HDFCBANK.NS', name: 'HDFC Bank', type: 'stock', exchange: 'NSE', country: 'IN' },
  { symbol: 'ICICIBANK.NS', name: 'ICICI Bank', type: 'stock', exchange: 'NSE', country: 'IN' },
  
  // US Stocks
  { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', exchange: 'NASDAQ', country: 'US' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', type: 'stock', exchange: 'NASDAQ', country: 'US' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', exchange: 'NASDAQ', country: 'US' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', type: 'stock', exchange: 'NASDAQ', country: 'US' },
  { symbol: 'TSLA', name: 'Tesla Inc.', type: 'stock', exchange: 'NASDAQ', country: 'US' },
  
  // Canadian Stocks
  { symbol: 'SHOP.TO', name: 'Shopify Inc.', type: 'stock', exchange: 'TSX', country: 'CA' },
  { symbol: 'TD.TO', name: 'Toronto-Dominion Bank', type: 'stock', exchange: 'TSX', country: 'CA' },
  { symbol: 'RY.TO', name: 'Royal Bank of Canada', type: 'stock', exchange: 'TSX', country: 'CA' },
  
  // Crypto
  { symbol: 'bitcoin', name: 'Bitcoin', type: 'crypto', exchange: 'CRYPTO', country: 'US' },
  { symbol: 'ethereum', name: 'Ethereum', type: 'crypto', exchange: 'CRYPTO', country: 'US' },
  { symbol: 'binancecoin', name: 'BNB', type: 'crypto', exchange: 'CRYPTO', country: 'US' },
  { symbol: 'solana', name: 'Solana', type: 'crypto', exchange: 'CRYPTO', country: 'US' },
];

const fuse = new Fuse(TICKERS, {
  keys: ['symbol', 'name'],
  threshold: 0.3,
  includeScore: true,
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '10');

  if (!query) {
    return NextResponse.json({ results: TICKERS.slice(0, limit) });
  }

  const results = fuse.search(query, { limit }).map((result) => result.item);

  return NextResponse.json({ results });
}
