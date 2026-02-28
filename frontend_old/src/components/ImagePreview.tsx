import { X, ScanLine, Loader2 } from 'lucide-react'

interface ImagePreviewProps {
  imageSrc: string
  fileName: string
  onClear: () => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

export default function ImagePreview({
  imageSrc,
  fileName,
  onClear,
  onAnalyze,
  isAnalyzing,
}: ImagePreviewProps) {
  return (
    <div className="card p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Image Preview</h2>
        <button
          onClick={onClear}
          disabled={isAnalyzing}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          title="Remove image"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative">
        {/* Image */}
        <div className="relative rounded-lg overflow-hidden bg-slate-100">
          <img
            src={imageSrc}
            alt="Skin lesion preview"
            className="w-full max-h-96 object-contain"
          />

          {/* Scanning overlay during analysis */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
                  <ScanLine className="absolute inset-0 m-auto w-10 h-10 text-white animate-pulse" />
                </div>
                <p className="text-white font-medium">Analyzing lesion...</p>
                <p className="text-white/70 text-sm mt-1">This may take a few seconds</p>
              </div>
            </div>
          )}
        </div>

        {/* File info */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-medium">File:</span> {fileName}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="w-full mt-4 btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <ScanLine className="w-5 h-5 mr-2" />
              Analyze Lesion
            </>
          )}
        </button>
      </div>
    </div>
  )
}
