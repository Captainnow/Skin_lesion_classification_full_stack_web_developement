import React from "react";

interface Props {
    onNext: () => void;
    onBack: () => void;
}

const PhotoGuideStep: React.FC<Props> = ({ onNext, onBack }) => {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-xl font-bold text-slate-800">Best Practices for Accuracy</h2>
                <p className="text-slate-500 mt-2">Follow these guidelines to ensure the most accurate analysis.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {[
                    { title: "Good Lighting", icon: "☀️", desc: "Use natural, bright lighting. Avoid shadows." },
                    { title: "Sharp Focus", icon: "📸", desc: "Ensure the lesion is in sharp focus, not blurry." },
                    { title: "Close Up", icon: "🔍", desc: "Fill the frame with the lesion, but keep context." },
                    { title: "Clean Skin", icon: "🧼", desc: "Remove makeup, hair, or jewelry if possible." },
                ].map((item, i) => (
                    <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <h4 className="font-semibold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-between pt-4">
                <button
                    onClick={onBack}
                    className="px-6 py-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={onNext}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                    I'm Ready to Upload
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PhotoGuideStep;
