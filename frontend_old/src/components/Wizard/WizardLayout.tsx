import React from "react";

interface Props {
    currentStep: number;
    totalSteps: number;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const WizardLayout: React.FC<Props> = ({ currentStep, totalSteps, title, subtitle, children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4 font-inter">
            <div className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/50 flex flex-col overflow-hidden transition-all duration-500">

                {/* Header / Progress */}
                <div className="p-8 border-b border-slate-100/50">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                                {title}
                            </h1>
                            {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
                        </div>
                        <div className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                            Step {currentStep} of {totalSteps}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Content Body */}
                <div className="p-8 flex-1 animate-fadeIn">
                    {children}
                </div>

            </div>
        </div>
    );
};

export default WizardLayout;
