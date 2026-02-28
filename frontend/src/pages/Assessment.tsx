import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Search, Info, Save, FileText, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { api, PredictionResponse, AdvisoryResponse } from '../services/api';
import ChatBot from '../components/common/ChatBot';

export default function Assessment() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<PredictionResponse | null>(null);
    const [advisory, setAdvisory] = useState<AdvisoryResponse | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            processFile(selected);
        }
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selected = e.dataTransfer.files[0];
            processFile(selected);
        }
    };

    const processFile = (selected: File) => {
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        setResult(null);
        setAdvisory(null);
    };

    const startAnalysis = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        setResult(null);
        setAdvisory(null);

        try {
            // 1. Analyze Image
            const prediction = await api.analyzeLesion(file);
            setResult(prediction);

            // 2. Get Advisory
            // For now, mocking the advisory based on prediction label
            const advice = await api.getAdvisory(prediction.label, prediction.confidence);
            setAdvisory(advice);

        } catch (error) {
            console.error("Analysis failed", error);
            alert("Analysis failed. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const resetAssessment = () => {
        setFile(null);
        setPreview(null);
        setResult(null);
        setAdvisory(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getSortedProbs = () => {
        if (!result || !result.probabilities) return [];
        return Object.entries(result.probabilities)
            .map(([label, value]) => ({ label, value: value * 100 }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    };

    const topProbs = getSortedProbs();

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">New Assessment</h1>
                <p className="text-slate-500">Upload a dermatoscopic image for AI analysis.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Input */}
                <div className="space-y-6 flex flex-col">
                    {/* Image Upload Area */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col min-h-[400px]">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Lesion Image</h2>

                        {!preview ? (
                            <div
                                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className="flex-1 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-primary-50 hover:border-primary-400 transition-colors cursor-pointer flex flex-col items-center justify-center p-8 text-center group"
                            >
                                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Upload className="text-primary-600" size={32} />
                                </div>
                                <p className="font-medium text-slate-900">Click or drag image to upload</p>
                                <p className="text-sm text-slate-500 mt-1">Supports JPG, PNG (Max 10MB)</p>
                            </div>
                        ) : (
                            <div className="relative flex-1 bg-slate-900 rounded-xl overflow-hidden group">
                                <img src={preview} alt="Lesion" className="w-full h-full object-contain" />
                                <button
                                    onClick={resetAssessment}
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={startAnalysis}
                        disabled={!file || isAnalyzing || !!result}
                        className={cn(
                            "w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all flex items-center justify-center gap-3",
                            !file || result ? "bg-slate-300 cursor-not-allowed shadow-none" : "bg-primary-600 hover:bg-primary-700 hover:scale-[1.02] shadow-primary-500/25"
                        )}
                    >
                        {isAnalyzing ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing Lesion...
                            </>
                        ) : result ? (
                            "Analysis Complete"
                        ) : (
                            <>
                                <Search size={24} />
                                Analyze Lesion
                            </>
                        )}
                    </button>
                </div>

                {/* Right Column: Results */}
                <div className="space-y-6">
                    {!result && !isAnalyzing && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-xl border border-dashed border-slate-300 min-h-[400px]">
                            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-6">
                                <Search className="text-primary-300" size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Ready for Analysis</h3>
                            <p className="text-slate-500 max-w-xs mt-2">Upload a dermatoscopic image on the left to begin the classification process.</p>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="space-y-6 animate-pulse">
                            <div className="h-40 bg-slate-200 rounded-xl"></div>
                            <div className="h-64 bg-slate-200 rounded-xl"></div>
                        </div>
                    )}

                    {result && (
                        <AnimatePresence>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {/* Result Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary-600" />
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="text-sm font-medium text-slate-500 mb-1">Top Prediction</div>
                                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{result.label}</h2>
                                            <p className="text-sm text-slate-500 mt-2">
                                                The model is <span className="text-primary-600 font-bold">{(result.confidence * 100).toFixed(1)}% confident</span> in this classification.
                                            </p>
                                        </div>
                                        {/* Confidence Gauge Graphic could go here */}
                                        <div className="text-2xl font-bold text-primary-600">
                                            {(result.confidence * 100).toFixed(0)}%
                                        </div>
                                    </div>
                                </div>

                                {/* Advisory Panel */}
                                {advisory && (
                                    <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-6">
                                        <div className="flex items-center gap-2 mb-3 text-blue-800">
                                            <Info size={20} />
                                            <h3 className="font-bold">{advisory.title}</h3>
                                        </div>
                                        <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                            {advisory.summary}
                                        </p>
                                        <div className="text-xs text-slate-400 border-t border-blue-100 pt-3">
                                            ⚠️ {advisory.disclaimer}
                                        </div>
                                    </div>
                                )}

                                {/* Probabilities */}
                                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                                    <h3 className="font-bold text-slate-900 mb-4">Class Probabilities (Top 5)</h3>
                                    <div className="space-y-4">
                                        {topProbs.map((prob, idx) => (
                                            <div key={prob.label}>
                                                <div className="flex items-center justify-between text-sm mb-1">
                                                    <span className={cn("font-medium", idx === 0 ? "text-slate-900" : "text-slate-600")}>
                                                        {prob.label}
                                                    </span>
                                                    <span className="text-slate-500">{prob.value.toFixed(1)}%</span>
                                                </div>
                                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${prob.value}%` }}
                                                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                                                        className={cn("h-full rounded-full", idx === 0 ? "bg-primary-600" : "bg-slate-400")}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 bg-white border border-slate-200 text-slate-700 font-medium py-3 rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors">
                                        <Save size={18} />
                                        Save Result
                                    </button>
                                    <button className="flex-1 bg-slate-900 text-white font-medium py-3 rounded-xl hover:bg-slate-800 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-colors">
                                        <FileText size={18} />
                                        Generate Report
                                    </button>
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            </div>

            {/* AI Advisory Chatbot */}
            {result && (
                <ChatBot label={result.label} confidence={result.confidence} />
            )}
        </div>
    );
}
