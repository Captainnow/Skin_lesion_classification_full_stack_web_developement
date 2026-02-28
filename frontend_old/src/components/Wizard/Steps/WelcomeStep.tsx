import React from "react";

interface Props {
    onStart: () => void;
}

const WelcomeStep: React.FC<Props> = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn py-8">
            <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl shadow-xl flex items-center justify-center mb-4 transform rotate-3 hover:rotate-6 transition-transform duration-500">
                <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                Melascope <span className="text-blue-600">DX</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-md leading-relaxed">
                Advanced skin lesion analysis powered by artificial intelligence.
                Get instant insights and personalized guidance.
            </p>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 max-w-lg w-full text-left space-y-4">
                <h3 className="font-semibold text-blue-900 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Medical Disclaimer
                </h3>
                <p className="text-sm text-blue-800/80">
                    This AI tool provides educational probabilities only. It is
                    <strong> NOT a substitute for professional medical advice</strong>, diagnosis, or treatment.
                    Always consult a certified dermatologist for any skin concerns.
                </p>
            </div>

            <button
                onClick={onStart}
                className="px-10 py-4 bg-slate-900 text-white text-lg rounded-2xl font-bold shadow-2xl hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-300 ring-4 ring-slate-100"
            >
                Start Assessment
            </button>

            <div className="flex gap-8 pt-8 text-slate-400">
                <div className="flex flex-col items-center">
                    <span className="font-bold text-slate-700 text-xl">30+</span>
                    <span className="text-xs uppercase tracking-wide">Conditions</span>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-slate-700 text-xl">AI</span>
                    <span className="text-xs uppercase tracking-wide">Powered</span>
                </div>
                <div className="w-px bg-slate-200"></div>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-slate-700 text-xl">24/7</span>
                    <span className="text-xs uppercase tracking-wide">Access</span>
                </div>
            </div>
        </div>
    );
};

export default WelcomeStep;
