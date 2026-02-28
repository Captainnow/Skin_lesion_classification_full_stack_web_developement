import { useState } from 'react'
import { ChevronDown, ChevronUp, BarChart3 } from 'lucide-react'
import { Prediction } from '../types'

interface PredictionChartProps {
  predictions: Prediction[]
}

export default function PredictionChart({ predictions }: PredictionChartProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const displayedPredictions = isExpanded ? predictions : predictions.slice(0, 5)

  const getBarColor = (confidence: number, index: number) => {
    if (index === 0) return 'bg-primary-500'
    if (confidence > 0.5) return 'bg-primary-400'
    if (confidence > 0.2) return 'bg-primary-300'
    return 'bg-slate-300'
  }

  return (
    <div className="card p-6 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-slate-500" />
        <h2 className="text-lg font-semibold text-slate-900">
          All Class Predictions
        </h2>
      </div>

      <div className="space-y-3">
        {displayedPredictions.map((prediction, index) => {
          const confidencePercent = (prediction.confidence * 100).toFixed(1)
          const barColor = getBarColor(prediction.confidence, index)

          return (
            <div key={prediction.label} className="confidence-bar">
              <div className="w-32 sm:w-48 flex-shrink-0">
                <p className="text-sm text-slate-700 capitalize truncate" title={prediction.label}>
                  {prediction.label}
                </p>
              </div>

              <div className="confidence-bar-track">
                <div
                  className={`confidence-bar-fill ${barColor}`}
                  style={{ width: `${confidencePercent}%` }}
                />
              </div>

              <div className="w-16 text-right flex-shrink-0">
                <span className="text-sm font-medium text-slate-600">
                  {confidencePercent}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Show More/Less Button */}
      {predictions.length > 5 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center justify-center gap-1 hover:bg-primary-50 rounded-lg transition-colors"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show All {predictions.length} Classes <ChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  )
}
