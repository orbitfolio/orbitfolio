import { Holding, HoldingWithPrice, PortfolioStats, AssetAllocation } from '@/types';

export function calculateHoldingMetrics(
  holding: Holding,
  currentPrice: number
): HoldingWithPrice {
  const currentValue = holding.quantity * currentPrice;
  const investedValue = holding.quantity * holding.purchase_price;
  const totalReturn = currentValue - investedValue;
  const returnPercent = (totalReturn / investedValue) * 100;

  return {
    ...holding,
    current_price: currentPrice,
    current_value: currentValue,
    total_return: totalReturn,
    return_percent: returnPercent,
  };
}

export function calculatePortfolioStats(
  holdings: HoldingWithPrice[]
): PortfolioStats {
  const totalValue = holdings.reduce((sum, h) => sum + h.current_value, 0);
  const totalInvested = holdings.reduce(
    (sum, h) => sum + h.quantity * h.purchase_price,
    0
  );
  const totalReturn = totalValue - totalInvested;
  const returnPercent = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  return {
    total_value: totalValue,
    total_invested: totalInvested,
    total_return: totalReturn,
    return_percent: returnPercent,
    day_change: 0, // Calculated from daily price changes
    day_change_percent: 0,
  };
}

export function calculateAssetAllocation(
  holdings: HoldingWithPrice[]
): AssetAllocation[] {
  const totalValue = holdings.reduce((sum, h) => sum + h.current_value, 0);
  
  const allocation = holdings.reduce((acc, holding) => {
    const existing = acc.find((a) => a.type === holding.type);
    if (existing) {
      existing.value += holding.current_value;
    } else {
      acc.push({
        type: holding.type,
        value: holding.current_value,
        percent: 0,
      });
    }
    return acc;
  }, [] as AssetAllocation[]);

  // Calculate percentages
  allocation.forEach((a) => {
    a.percent = totalValue > 0 ? (a.value / totalValue) * 100 : 0;
  });

  return allocation;
}

export function calculateCorrelation(
  data1: number[],
  data2: number[]
): number {
  if (data1.length !== data2.length || data1.length === 0) return 0;

  const n = data1.length;
  const mean1 = data1.reduce((a, b) => a + b, 0) / n;
  const mean2 = data2.reduce((a, b) => a + b, 0) / n;

  let numerator = 0;
  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < n; i++) {
    const diff1 = data1[i] - mean1;
    const diff2 = data2[i] - mean2;
    numerator += diff1 * diff2;
    sum1 += diff1 * diff1;
    sum2 += diff2 * diff2;
  }

  const denominator = Math.sqrt(sum1 * sum2);
  return denominator === 0 ? 0 : numerator / denominator;
}

export function calculateVolatility(returns: number[]): number {
  if (returns.length === 0) return 0;
  
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance =
    returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
  
  return Math.sqrt(variance) * Math.sqrt(252); // Annualized
}

export function calculateSharpeRatio(
  returns: number[],
  riskFreeRate: number = 0.04
): number {
  if (returns.length === 0) return 0;
  
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const volatility = calculateVolatility(returns);
  
  return volatility === 0 ? 0 : (avgReturn - riskFreeRate) / volatility;
}

export function calculateRSI(prices: number[], period: number = 14): number {
  if (prices.length < period + 1) return 50;

  let gains = 0;
  let losses = 0;

  for (let i = prices.length - period; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }

  const avgGain = gains / period;
  const avgLoss = losses / period;

  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  return 100 - 100 / (1 + rs);
}

export function calculateSMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1] || 0;
  
  const slice = prices.slice(-period);
  return slice.reduce((a, b) => a + b, 0) / period;
}

export function calculateEMA(prices: number[], period: number): number {
  if (prices.length < period) return prices[prices.length - 1] || 0;

  const multiplier = 2 / (period + 1);
  let ema = calculateSMA(prices.slice(0, period), period);

  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema;
  }

  return ema;
}
