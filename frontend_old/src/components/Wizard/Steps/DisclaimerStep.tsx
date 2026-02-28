import React, { useState } from "react";

interface Props {
    onNext: () => void;
}

const DisclaimerStep: React.FC<Props> = ({ onNext }) => {
    const [accepted, setAccepted] = useState(false);

    return (
        <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
                    <svg className="w-6 h-6 text-amber-600 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Important Medical Disclaimer
                </h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                    Melascope DX is an <strong>educational tool</strong> powered by experimental artificial intelligence.
                    It is <strong>NOT</strong> a medical device and <strong>CANNOT</strong> provide a medical diagnosis.

                    <br /><br />
                    Errors are possible. The results presented here are for informational purposes only and should never replace professional medical advice.
                    Always consult a qualified dermatologist for any skin concerns.
                </p>
            </div>

            <div className="flex items-start gap-3 p-2">
                <div className="relative flex items-center">
                    <input
                        id="accept-terms"
                        type="checkbox"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                </div>
                <label htmlFor="accept-terms" className="text-sm text-slate-600 cursor-pointer select-none">
                    I understand that this tool does not provide medical diagnoses and I agree to use it for educational purposes only.
                </label>
            </div>

            <div className="pt-4 flex justify-end">
                <button
                    onClick={onNext}
                    disabled={!accepted}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all ${accepted
                            ? "bg-blue-600 text-white shadow-lg hover:bg-blue-700 transform hover:-translate-y-0.5"
                            : "bg-slate-200 text-slate-400 cursor-not-allowed"
                        }`}
                >
                    Start Assessment
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default DisclaimerStep;
