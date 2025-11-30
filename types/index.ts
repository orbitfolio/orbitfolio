export type AssetType = 'stock' | 'mf' | 'crypto';
export type Exchange = 'NSE' | 'BSE' | 'NYSE' | 'NASDAQ' | 'TSX' | 'CRYPTO';

export interface Ticker {
  symbol: string;
  name: string;
  type: AssetType;
  exchange: Exchange;
  country: 'IN' | 'US' | 'CA';
}

export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface Holding {
  id: string;
  portfolio_id: string;
  symbol: string;
  type: AssetType;
  exchange: Exchange;
  quantity: number;
  purchase_price: number;
  purchase_date: string;
  created_at: string;
}

export interface PriceData {
  symbol: string;
  price: number;
  change_percent: number;
  updated_at: string;
}

export interface HoldingWithPrice extends Holding {
  current_price: number;
  current_value: number;
  total_return: number;
  return_percent: number;
  name?: string;
}

export interface PortfolioStats {
  total_value: number;
  total_invested: number;
  total_return: number;
  return_percent: number;
  day_change: number;
  day_change_percent: number;
}

export interface AssetAllocation {
  type: AssetType;
  value: number;
  percent: number;
}

export interface TechnicalIndicators {
  sma_20?: number;
  sma_50?: number;
  sma_200?: number;
  ema_12?: number;
  ema_26?: number;
  rsi?: number;
  macd?: number;
  signal?: number;
  bb_upper?: number;
  bb_middle?: number;
  bb_lower?: number;
}

export interface ChartData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface FundamentalData {
  marketCap?: number;
  peRatio?: number;
  dividendYield?: number;
  week52High?: number;
  week52Low?: number;
  sector?: string;
  industry?: string;
  description?: string;
}
