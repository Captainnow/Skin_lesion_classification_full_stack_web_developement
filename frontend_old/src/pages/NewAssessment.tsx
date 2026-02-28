import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Search, Info, Save, FileText, Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { api, PredictionResponse, AdvisoryResponse } from '../services/api';

export default function NewAssessment() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<PredictionResponse | null>(null);
    const [advisory, setAdvisory] = useState<AdvisoryResponse | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selected = e.target.files[0];
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setResult(null);
            setAdvisory(null);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const selected = e.dataTransfer.files[0];
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
            setResult(null);
            setAdvisory(null);
        }
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
            const advice = await api.getAdvisory(prediction.label, prediction.confidence);
            setAdvisory(advice);

            // Save to local storage for MelaBot context (basic implementation)
            localStorage.setItem('lastAssessment', JSON.stringify({
                label: prediction.label,
                confidence: prediction.confidence
            }));

            // Dispatch event for MelaBot to react
            window.dispatchEvent(new CustomEvent('melascope:analysis-complete', {
                detail: {
                    label: prediction.label,
                    confidence: prediction.confidence,
                    summary: advice.summary
                }
            }));

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
    };

    // Helper to sort probabilities for display
    const getSortedProbs = () => {
        if (!result || !result.probabilities) return [];
        return Object.entries(result.probabilities)
            .map(([label, value]) => ({ label, value: value * 100 })) // assuming backend returns 0-1
            .sort((a, b) => b.value - a.value)
            .slice(0, 5); // Top 5
    };

    // Backend returns values 0-1 probably? Let's check main.py/model.py logic. 
    // Assuming backend returns dict: {'Melanoma': 0.94, ...}
    // Note: The UI expects percentages (0-100).
    const topProbs = getSortedProbs();

    return (
        <div className="h-[calc(100vh-8rem)] grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left Column: Input */}
            <div className="space-y-6 flex flex-col h-full">
                {/* Image Upload Card */}
                <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 flex flex-col flex-1">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Lesion Image</h2>

                    {!preview ? (
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer flex flex-col items-center justify-center p-8 text-center group"
                        >
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="text-primary" size={32} />
                            </div>
                            <p className="font-medium text-gray-900">Click or drag image to upload</p>
                            <p className="text-sm text-gray-500 mt-1">Supports JPG, PNG (Max 10MB)</p>
                        </div>
                    ) : (
                        <div className="relative flex-1 bg-gray-900 rounded-xl overflow-hidden group">
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

                {/* Patient Details Mock */}
                <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Patient context</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                            <input type="text" placeholder="e.g. PT-1024" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-primary focus:border-primary">
                                <option>Select location...</option>
                                <option>Face</option>
                                <option>Back</option>
                                <option>Arm</option>
                                <option>Leg</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    onClick={startAnalysis}
                    disabled={!file || isAnalyzing || !!result}
                    className={cn(
                        "w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-3",
                        !file || result ? "bg-gray-300 cursor-not-allowed shadow-none" : "bg-primary hover:bg-primary-hover hover:scale-[1.02]"
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
            <div className="space-y-6 flex flex-col h-full overflow-y-auto pr-2">
                {!result && !isAnalyzing && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                            <Search className="text-blue-300" size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Ready for Analysis</h3>
                        <p className="text-gray-500 max-w-xs mt-2">Upload a dermatoscopic image on the left to begin the classification process.</p>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="space-y-6 animate-pulse">
                        {/* Skeleton Loader */}
                        <div className="h-40 bg-gray-200 rounded-xl"></div>
                        <div className="h-64 bg-gray-200 rounded-xl"></div>
                    </div>
                )}

                {result && (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ staggerChildren: 0.1 }}
                            className="space-y-6"
                        >
                            {/* Result Card */}
                            <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6 relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="text-sm font-medium text-gray-500 mb-1">Top Prediction</div>
                                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{result.label}</h1>
                                        <p className="text-sm text-gray-500 mt-2">
                                            The model is <span className="text-primary font-bold">{(result.confidence * 100).toFixed(1)}% confident</span> in this classification.
                                        </p>
                                    </div>
                                    <div className="relative w-20 h-20 flex items-center justify-center">
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="40" cy="40" r="36" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                                            <motion.circle
                                                cx="40" cy="40" r="36"
                                                stroke="#2563EB" strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={2 * Math.PI * 36}
                                                strokeDashoffset={2 * Math.PI * 36}
                                                animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - result.confidence) }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <span className="absolute text-sm font-bold text-gray-900">{(result.confidence * 100).toFixed(0)}%</span>
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
                                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                        {advisory.summary}
                                    </p>
                                    <ul className="space-y-2 mb-4">
                                        <li className="flex items-start gap-2 text-sm text-gray-700">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                            </div>
                                            <strong>Action:</strong> {advisory.next_steps}
                                        </li>
                                    </ul>
                                    <div className="text-xs text-gray-400 border-t border-blue-100 pt-3">
                                        ⚠️ {advisory.disclaimer}
                                    </div>
                                </div>
                            )}

                            {/* Probability Distribution */}
                            <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Class Probabilities (Top 5)</h3>
                                <div className="space-y-4">
                                    {topProbs.map((prob, idx) => (
                                        <div key={prob.label}>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className={cn("font-medium", idx === 0 ? "text-gray-900" : "text-gray-600")}>
                                                    {prob.label}
                                                </span>
                                                <span className="text-gray-500">{prob.value.toFixed(1)}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${prob.value}%` }}
                                                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                                                    className={cn("h-full rounded-full", idx === 0 ? "bg-primary" : "bg-gray-400")}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button className="flex-1 bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                                    <Save size={18} />
                                    Save Only
                                </button>
                                <button className="flex-1 bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 flex items-center justify-center gap-2 shadow-lg shadow-gray-900/10 transition-colors">
                                    <FileText size={18} />
                                    Generate Report
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
