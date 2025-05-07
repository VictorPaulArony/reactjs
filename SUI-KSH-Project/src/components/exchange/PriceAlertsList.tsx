"use client"

//component to display a list of price alerts created by the user
import { useState } from "react"
import { Bell, Trash2, ToggleLeft, ToggleRight } from "lucide-react"
import { useExchange } from "../../context/ExchangeContext"
import type { PriceAlert } from "../../types"

interface PriceAlertsListProps {
  onCreateNew: () => void
}

const PriceAlertsList = ({ onCreateNew }: PriceAlertsListProps) => {
  const { priceAlerts, deletePriceAlert, togglePriceAlert } = useExchange()
  const [showTriggered, setShowTriggered] = useState(false)

  const filteredAlerts = priceAlerts.filter((alert) => (showTriggered ? true : !alert.triggered))

  // const formatDate = (date: Date) => {
  //   return new Date(date).toLocaleString(undefined, {
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   })
  // }


  if (priceAlerts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Bell className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Price Alerts</h3>
          <p className="text-gray-500 mb-4">
            You haven't set up any price alerts yet. Create one to get notified when rates reach your desired levels.
          </p>
          <button onClick={onCreateNew} className="btn btn-primary">
            Create Price Alert
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Your Price Alerts</h3>
        <button onClick={onCreateNew} className="btn btn-primary btn-sm">
          <Bell className="h-4 w-4 mr-1" />
          New Alert
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setShowTriggered(!showTriggered)}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            {showTriggered ? (
              <ToggleRight className="h-4 w-4 mr-1 text-primary" />
            ) : (
              <ToggleLeft className="h-4 w-4 mr-1 text-gray-400" />
            )}
            Show triggered alerts
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {priceAlerts.length} {priceAlerts.length === 1 ? "alert" : "alerts"} total
        </div>
      </div>

      {filteredAlerts.length === 0 ? (
        <div className="text-center py-4 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No {showTriggered ? "" : "active"} alerts to display</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} onDelete={deletePriceAlert} onToggle={togglePriceAlert} />
          ))}
        </div>
      )}
    </div>
  )
}

interface AlertItemProps {
  alert: PriceAlert
  onDelete: (id: string) => void
  onToggle: (id: string) => void
}

const AlertItem = ({ alert, onDelete, onToggle }: AlertItemProps) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)

  const getStatusColor = () => {
    if (alert.triggered) return "bg-gray-100 border-gray-200"
    if (!alert.isActive) return "bg-yellow-50 border-yellow-200"
    return "bg-blue-50 border-blue-200"
  }

  return (
    <div className={`rounded-lg border p-3 ${getStatusColor()}`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <span className="font-medium text-gray-900">
              {alert.pair} {alert.condition === "above" ? ">" : "<"}{" "}
              {alert.threshold.toFixed(alert.pair === "SUI-KSH" ? 2 : 6)}
            </span>
            {alert.triggered && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">Triggered</span>
            )}
            {!alert.triggered && !alert.isActive && (
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-yellow-200 text-yellow-800">Paused</span>
            )}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Created: {new Date(alert.createdAt).toLocaleString()}
            {alert.triggered && <div>Triggered: {new Date(alert.triggered).toLocaleString()}</div>}
          </div>
        </div>

        <div className="flex space-x-2">
          {!alert.triggered && (
            <button
              onClick={() => onToggle(alert.id)}
              className="p-1 rounded-full hover:bg-gray-200"
              title={alert.isActive ? "Pause alert" : "Activate alert"}
            >
              {alert.isActive ? (
                <ToggleRight className="h-5 w-5 text-primary" />
              ) : (
                <ToggleLeft className="h-5 w-5 text-gray-400" />
              )}
            </button>
          )}

          {showConfirmDelete ? (
            <div className="flex items-center space-x-1">
              <button onClick={() => onDelete(alert.id)} className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                Confirm
              </button>
              <button onClick={() => setShowConfirmDelete(false)} className="text-xs bg-gray-200 px-2 py-1 rounded">
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="p-1 rounded-full hover:bg-gray-200 text-red-500"
              title="Delete alert"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PriceAlertsList
