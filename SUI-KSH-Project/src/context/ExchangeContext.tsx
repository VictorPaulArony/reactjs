"use client"

// context for exchange management 
import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "react-hot-toast"
import { fetchExchangeRate } from "../services/exchangeRateService"
import { exchangeService } from "../services/exchangeService"
import type { LiquidityPool, Transaction, ExchangePair, ExchangeRate, PriceAlert, AlertCondition } from "../types"

interface ExchangeContextType {
  exchangeRates: Record<ExchangePair, ExchangeRate>
  liquidityPools: {
    sui: LiquidityPool
    ksh: LiquidityPool
  }
  recentTransactions: Transaction[]
  fees: {
    percentage: number
    flat: number
  }
  slippageTolerance: number
  priceAlerts: PriceAlert[]
  updateSlippageTolerance: (value: number) => void
  updateFees: (percentage: number, flat: number) => void
  initiateExchange: (
    from: string,
    to: string,
    amount: number,
    fromAddress: string,
    toAddress: string,
  ) => Promise<boolean>
  refreshRates: () => Promise<void>
  createPriceAlert: (pair: ExchangePair, condition: AlertCondition, threshold: number) => void
  deletePriceAlert: (alertId: string) => void
  togglePriceAlert: (alertId: string) => void
}

const defaultExchangeContext: ExchangeContextType = {
  exchangeRates: {
    "SUI-KSH": { rate: 0, lastUpdated: new Date(), source: "loading" },
    "KSH-SUI": { rate: 0, lastUpdated: new Date(), source: "loading" },
  },
  liquidityPools: {
    sui: { balance: 0, available: 0, reserved: 0 },
    ksh: { balance: 0, available: 0, reserved: 0 },
  },
  recentTransactions: [],
  fees: {
    percentage: 0.5,
    flat: 5,
  },
  slippageTolerance: 1.0,
  priceAlerts: [],
  updateSlippageTolerance: () => {},
  updateFees: () => {},
  initiateExchange: async () => false,
  refreshRates: async () => {},
  createPriceAlert: () => {},
  deletePriceAlert: () => {},
  togglePriceAlert: () => {},
}

const ExchangeContext = createContext<ExchangeContextType>(defaultExchangeContext)

export const useExchange = () => useContext(ExchangeContext)

export const ExchangeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [exchangeRates, setExchangeRates] = useState<Record<ExchangePair, ExchangeRate>>(
    defaultExchangeContext.exchangeRates,
  )
  const [liquidityPools, setLiquidityPools] = useState(defaultExchangeContext.liquidityPools)
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([])
  const [fees, setFees] = useState(defaultExchangeContext.fees)
  const [slippageTolerance, setSlippageTolerance] = useState(defaultExchangeContext.slippageTolerance)
  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([])

  // Load saved alerts from localStorage on init
  useEffect(() => {
    try {
      const savedAlerts = localStorage.getItem("price_alerts")
      if (savedAlerts) {
        const parsedAlerts = JSON.parse(savedAlerts)
        // Convert string dates back to Date objects
        const formattedAlerts = parsedAlerts.map((alert: any) => ({
          ...alert,
          createdAt: new Date(alert.createdAt),
          triggered: alert.triggered ? new Date(alert.triggered) : undefined,
        }))
        setPriceAlerts(formattedAlerts)
      }
    } catch (error) {
      console.error("Failed to load saved price alerts:", error)
    }
  }, [])

  // Save alerts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("price_alerts", JSON.stringify(priceAlerts))
    } catch (error) {
      console.error("Failed to save price alerts:", error)
    }
  }, [priceAlerts])

  useEffect(() => {
    const mockInitialData = async () => {
      await refreshRates()

      setLiquidityPools({
        sui: { balance: 25000, available: 24000, reserved: 1000 },
        ksh: { balance: 1500000, available: 1450000, reserved: 50000 },
      })

      setRecentTransactions([
        {
          id: "tx-001",
          type: "SUI-KSH",
          amount: 10,
          exchangeRate: 150,
          fee: 15,
          status: "completed",
          timestamp: new Date(),
          fromAddress: "0x123...456",
          toAddress: "254712345678",
          txHash: "0xabc...def",
        },
        {
          id: "tx-002",
          type: "KSH-SUI",
          amount: 5000,
          exchangeRate: 0.0066,
          fee: 25,
          status: "pending",
          timestamp: new Date(),
          fromAddress: "254787654321",
          toAddress: "0x789...012",
          txHash: "",
        },
      ])
    }

    mockInitialData()

    const intervalId = setInterval(refreshRates, 5 * 60 * 1000)
    return () => clearInterval(intervalId)
  }, [])

  // Check for triggered alerts whenever exchange rates update
  useEffect(() => {
    checkAlerts()
  }, [exchangeRates])

  const checkAlerts = () => {
    const updatedAlerts = priceAlerts.map((alert) => {
      // Skip alerts that are already triggered or inactive
      if (!alert.isActive || alert.triggered) {
        return alert
      }

      const currentRate = exchangeRates[alert.pair].rate
      let isTriggered = false

      if (alert.condition === "above" && currentRate >= alert.threshold) {
        isTriggered = true
      } else if (alert.condition === "below" && currentRate <= alert.threshold) {
        isTriggered = true
      }

      if (isTriggered) {
        // Notify the user
        toast.success(
          `Price Alert: ${alert.pair} rate is now ${alert.condition === "above" ? "above" : "below"} ${alert.threshold}`,
          { duration: 6000 },
        )

        // Return updated alert with triggered timestamp
        return { ...alert, triggered: new Date(), isActive: false }
      }

      return alert
    })

    if (JSON.stringify(updatedAlerts) !== JSON.stringify(priceAlerts)) {
      setPriceAlerts(updatedAlerts)
    }
  }

  const refreshRates = async () => {
    try {
      const suiKshRate = await fetchExchangeRate("SUI-KSH")
      const kshSuiRate = await fetchExchangeRate("KSH-SUI")

      setExchangeRates({
        "SUI-KSH": suiKshRate,
        "KSH-SUI": kshSuiRate,
      })
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error)
      toast.error("Failed to update exchange rates")
    }
  }

  const updateSlippageTolerance = (value: number) => {
    setSlippageTolerance(value)
    toast.success(`Slippage tolerance updated to ${value}%`)
  }

  const updateFees = (percentage: number, flat: number) => {
    setFees({ percentage, flat })
    toast.success("Fee structure updated")
  }

  const initiateExchange = async (
    from: string,
    to: string,
    amount: number,
    fromAddress: string,
    toAddress: string,
  ): Promise<boolean> => {
    try {
      if (from === "SUI" && to === "KSH") {
        const transactionId = await exchangeService.initiateSuiToKshExchange(
          amount,
          fromAddress,
          toAddress,
        )

        const newTransaction: Transaction = {
          id: transactionId,
          type: "SUI-KSH",
          amount,
          exchangeRate: exchangeRates["SUI-KSH"].rate,
          fee: (amount * fees.percentage) / 100 + fees.flat,
          status: "pending",
          timestamp: new Date(),
          fromAddress,
          toAddress,
          txHash: "",
        }

        setRecentTransactions([newTransaction, ...recentTransactions])

        exchangeService.subscribeToTransaction(transactionId, (event) => {
          setRecentTransactions((current) =>
            current.map((tx) =>
              tx.id === event.transactionId
                ? { ...tx, status: "completed", txHash: "0x" + Math.random().toString(16).slice(2) }
                : tx,
            ),
          )
        })

        toast.success("Exchange initiated. Please confirm the transaction in your wallet.")
        return true
      }

      return false
    } catch (error) {
      console.error("Exchange failed:", error)
      toast.error("Exchange failed. Please try again.")
      return false
    }
  }

  const createPriceAlert = (pair: ExchangePair, condition: AlertCondition, threshold: number) => {
    const newAlert: PriceAlert = {
      id: `alert-${Date.now()}`,
      pair,
      condition,
      threshold,
      isActive: true,
      createdAt: new Date(),
    }

    setPriceAlerts([...priceAlerts, newAlert])
    toast.success(`Price alert created for ${pair} ${condition} ${threshold}`)
  }

  const deletePriceAlert = (alertId: string) => {
    setPriceAlerts(priceAlerts.filter((alert) => alert.id !== alertId))
    toast.success("Price alert deleted")
  }

  const togglePriceAlert = (alertId: string) => {
    setPriceAlerts(priceAlerts.map((alert) => (alert.id === alertId ? { ...alert, isActive: !alert.isActive } : alert)))
  }

  return (
    <ExchangeContext.Provider
      value={{
        exchangeRates,
        liquidityPools,
        recentTransactions,
        fees,
        slippageTolerance,
        priceAlerts,
        updateSlippageTolerance,
        updateFees,
        initiateExchange,
        refreshRates,
        createPriceAlert,
        deletePriceAlert,
        togglePriceAlert,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  )
}
