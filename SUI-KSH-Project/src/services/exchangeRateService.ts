import { ExchangePair, ExchangeRate } from '../types';

// the exchange API (removed for now)
// const API_BASE_URL = 'https://api.exchange.com';

export const fetchExchangeRate = async (pair: ExchangePair): Promise<ExchangeRate> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // will be using the tradingview data for this implementation
  // using mock data for now 
  if (pair === 'SUI-KSH') {
    return {
      rate: 150 + Math.random() * 10 - 5, // Simulate some price movement
      lastUpdated: new Date(),
      source: 'oracle',
    };
  } else {
    return {
      rate: 1 / (150 + Math.random() * 10 - 5), // Inverse rate with some movement
      lastUpdated: new Date(),
      source: 'oracle',
    };
  }
};

export const fetchHistoricalRates = async (
  pair: ExchangePair, 
  timeframe: 'day' | 'week' | 'month'
): Promise<{timestamp: Date, rate: number}[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate mock historical data
  const now = new Date();
  const dataPoints = timeframe === 'day' ? 24 : timeframe === 'week' ? 7 : 30;
  const baseRate = pair === 'SUI-KSH' ? 150 : 1/150;
  
  return Array.from({ length: dataPoints }).map((_, i) => {
    const timestamp = new Date(now);
    timestamp.setHours(now.getHours() - (timeframe === 'day' ? i : 0));
    timestamp.setDate(now.getDate() - (timeframe === 'day' ? 0 : i));
    
    // Create some realistic price movements
    const volatilityFactor = 0.02; // 2% volatility
    const randomFactor = (Math.random() * 2 - 1) * volatilityFactor;
    const rate = baseRate * (1 + randomFactor);
    
    return { timestamp, rate };
  }).reverse();
};