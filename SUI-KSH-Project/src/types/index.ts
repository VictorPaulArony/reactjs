export type ExchangePair = "SUI-KSH" | "KSH-SUI"

export type ExchangeRateSource = "oracle" | "external" | "internal" | "loading"

export interface ExchangeRate {
  rate: number
  lastUpdated: Date
  source: ExchangeRateSource
}

export interface LiquidityPool {
  balance: number
  available: number
  reserved: number
}

export type TransactionStatus = "pending" | "processing" | "completed" | "failed"

export interface Transaction {
  id: string
  type: ExchangePair
  amount: number
  exchangeRate: number
  fee: number
  status: TransactionStatus
  timestamp: Date
  fromAddress: string
  toAddress: string
  txHash: string
}

export interface User {
  id: string
  name: string
  email: string
  suiAddress?: string
  mpesaNumber?: string
  isVerified: boolean
}

export type AlertCondition = "above" | "below"

export interface PriceAlert {
  id: string
  pair: ExchangePair
  condition: AlertCondition
  threshold: number
  isActive: boolean
  createdAt: Date
  triggered?: Date
}
