// Type definitions for Melascope DX

export interface Prediction {
  label: string
  confidence: number
}

export interface Advisory {
  risk_level: 'low' | 'moderate' | 'high' | 'critical'
  summary: string
  recommendation: string
  disclaimer: string
  confidence: number
  predicted_label: string
  confidence_note: string
}

export interface AssessmentData {
  success: boolean
  top_prediction: Prediction
  predictions: Prediction[]
  advisory: Advisory
}

export interface HistoryItem {
  id: string
  timestamp: Date
  imagePreview: string
  topPrediction: Prediction
  riskLevel: string
}

export interface HealthStatus {
  status: string
  message: string
  model_loaded: boolean
  available_classes: number
}

export interface ClassInfo {
  success: boolean
  count: number
  classes: string[]
  risk_level_descriptions: Record<string, string>
}
