"use client"

import type React from "react"

import { useState } from "react"
import { X, Bell, AlertTriangle } from "lucide-react"
import { useExchange } from "../../context/ExchangeContext"
import type { ExchangePair, AlertCondition } from "../../types"

interface PriceAlertModalProps {
  isOpen: boolean
  onClose: () => void
  defaultPair?: ExchangePair
}

const PriceAlertModal = ({ isOpen, onClose, defaultPair = "SUI-KSH" }: PriceAlertModalProps) => {
  const { exchangeRates, createPriceAlert } = useExchange()

  const [pair, setPair] = useState<ExchangePair>(defaultPair)
  const [condition, setCondition] = useState<AlertCondition>("above")
  const [threshold, setThreshold] = useState<string>("")
  const [error, setError] = useState<string>("")

  // Set a default threshold based on current rate
  useState(() => {
    const currentRate = exchangeRates[defaultPair].rate
    setThreshold(currentRate.toFixed(defaultPair === "SUI-KSH" ? 2 : 6))
  }, [defaultPair, exchangeRates])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const thresholdValue = Number.parseFloat(threshold)

    if (!threshold || isNaN(thresholdValue)) {
      setError("Please enter a valid threshold value")
      return
    }

    if (thresholdValue <= 0) {
      setError("Threshold must be greater than zero")
      return
    }

    // Check if the alert would trigger immediately
    const currentRate = exchangeRates[pair].rate
    if (
      (condition === "above" && currentRate >= thresholdValue) ||
      (condition === "below" && currentRate <= thresholdValue)
    ) {
      setError(
        `This alert would trigger immediately as the current rate is ${currentRate.toFixed(pair === "SUI-KSH" ? 2 : 6)}`,
      )
      return
    }

    createPriceAlert(pair, condition, thresholdValue)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-lg font-medium">Create Price Alert</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="pair" className="block text-sm font-medium text-gray-700 mb-1">
                Currency Pair
              </label>
              <select
                id="pair"
                value={pair}
                onChange={(e) => setPair(e.target.value as ExchangePair)}
                className="input w-full"
              >
                <option value="SUI-KSH">SUI to KSH</option>
                <option value="KSH-SUI">KSH to SUI</option>
              </select>
            </div>

            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
                Alert Condition
              </label>
              <select
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value as AlertCondition)}
                className="input w-full"
              >
                <option value="above">Rate goes above</option>
                <option value="below">Rate goes below</option>
              </select>
            </div>

            <div>
              <label htmlFor="threshold" className="block text-sm font-medium text-gray-700 mb-1">
                Threshold Value
              </label>
              <div className="relative">
                <input
                  id="threshold"
                  type="number"
                  step={pair === "SUI-KSH" ? "0.01" : "0.000001"}
                  value={threshold}
                  onChange={(e) => {
                    setThreshold(e.target.value)
                    setError("")
                  }}
                  className="input w-full pr-16"
                  placeholder={pair === "SUI-KSH" ? "150.00" : "0.006667"}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="text-gray-500">{pair === "SUI-KSH" ? "KSH" : "SUI"}</span>
                </div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Current rate: {exchangeRates[pair].rate.toFixed(pair === "SUI-KSH" ? 2 : 6)}{" "}
                {pair === "SUI-KSH" ? "KSH" : "SUI"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PriceAlertModal
