import React, { useState } from "react";

export interface PatientData {
    age: string;
    gender: string;
    history: string; // "yes" | "no"
    duration: string;
    symptoms: string[];
}

interface Props {
    onNext: (data: PatientData) => void;
    onBack: () => void;
}

const PatientFormStep: React.FC<Props> = ({ onNext, onBack }) => {
    const [formData, setFormData] = useState<PatientData>({
        age: "",
        gender: "",
        history: "no",
        duration: "",
        symptoms: [],
    });

    const handleChange = (field: keyof PatientData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleSymptom = (symptom: string) => {
        setFormData((prev) => {
            const exists = prev.symptoms.includes(symptom);
            return {
                ...prev,
                symptoms: exists
                    ? prev.symptoms.filter((s) => s !== symptom)
                    : [...prev.symptoms, symptom],
            };
        });
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-slate-800">Patient Details</h2>
                <p className="text-slate-500">
                    Help our AI provided accurate context for your skin analysis.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Age</label>
                    <input
                        type="number"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        placeholder="e.g. 30"
                        value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                    />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Gender</label>
                    <select
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                        value={formData.gender}
                        onChange={(e) => handleChange("gender", e.target.value)}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                {/* Duration */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                        How long has the lesion been present?
                    </label>
                    <select
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                        value={formData.duration}
                        onChange={(e) => handleChange("duration", e.target.value)}
                    >
                        <option value="">Select Duration</option>
                        <option value="Just noticed">Just noticed</option>
                        <option value="Less than 1 month">Less than 1 month</option>
                        <option value="1-6 months">1-6 months</option>
                        <option value="More than 6 months">More than 6 months</option>
                        <option value="Years">Years</option>
                    </select>
                </div>

                {/* History */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">
                        Personal/Family history of skin cancer?
                    </label>
                    <div className="flex gap-4">
                        <button
                            className={`flex-1 py-3 rounded-xl border font-medium transition-all ${formData.history === "yes"
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                                }`}
                            onClick={() => handleChange("history", "yes")}
                        >
                            Yes
                        </button>
                        <button
                            className={`flex-1 py-3 rounded-xl border font-medium transition-all ${formData.history === "no"
                                    ? "bg-slate-800 text-white border-slate-800"
                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                                }`}
                            onClick={() => handleChange("history", "no")}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>

            {/* Symptoms */}
            <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">
                    Symptoms (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-3">
                    {["Itchy", "Bleeding", "Painful", "Growing", "Changing Color", "Rough Texture", "None"].map(
                        (symptom) => (
                            <button
                                key={symptom}
                                onClick={() => toggleSymptom(symptom)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${formData.symptoms.includes(symptom)
                                        ? "bg-blue-100 text-blue-700 border-blue-200"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                                    }`}
                            >
                                {symptom}
                            </button>
                        )
                    )}
                </div>
            </div>

            <div className="flex justify-between pt-6">
                <button
                    onClick={onBack}
                    className="px-6 py-2 text-slate-500 hover:text-slate-800 font-medium transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={() => onNext(formData)}
                    disabled={!formData.age || !formData.gender || !formData.duration}
                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default PatientFormStep;
