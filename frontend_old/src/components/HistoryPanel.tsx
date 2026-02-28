import { History, Clock, AlertCircle } from 'lucide-react'
import { HistoryItem } from '../types'

interface HistoryPanelProps {
  history: HistoryItem[]
  onSelect: (item: HistoryItem) => void
}

const riskBadgeClass = {
  low: 'bg-green-100 text-green-700',
  moderate: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
  critical: 'bg-red-900 text-white',
}

export default function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date)
  }

  if (history.length === 0) {
    return (
      <div className="card p-6 sticky top-24">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-900">Recent Assessments</h2>
        </div>

        <div className="text-center py-8">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-500 text-sm">No assessments yet</p>
          <p className="text-slate-400 text-xs mt-1">
            Your recent analyses will appear here
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6 sticky top-24">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-slate-500" />
          <h2 className="text-lg font-semibold text-slate-900">Recent Assessments</h2>
        </div>
        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          {history.length}
        </span>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group"
          >
            <div className="flex items-start gap-3">
              <img
                src={item.imagePreview}
                alt="Previous assessment"
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 capitalize truncate">
                  {item.topPrediction.label}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    riskBadgeClass[item.riskLevel as keyof typeof riskBadgeClass] || 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.riskLevel}
                  </span>
                  <span className="text-xs text-slate-400">
                    {(item.topPrediction.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <span className="text-xs text-slate-400 flex-shrink-0">
                {formatTime(item.timestamp)}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-start gap-2 text-xs text-slate-500">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>History is stored locally in your browser and will be lost on refresh.</p>
        </div>
      </div>
    </div>
  )
}
