export interface PredictionResponse {
    label: string;
    confidence: number;
    probabilities: Record<string, number>;
}

export interface AdvisoryResponse {
    title: string;
    summary: string;
    next_steps: string;
    prevention?: string;
    disclaimer: string;
}

export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

const API_BASE_URL = 'http://localhost:8000';

interface BackendPrediction {
    label: string;
    confidence: number;
}

interface BackendResponse {
    top_prediction: BackendPrediction;
    predictions: BackendPrediction[];
}

export const api = {
    async analyzeLesion(file: File): Promise<PredictionResponse> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/api/analyze`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Analysis failed');
        }

        const data: BackendResponse = await response.json();

        // Transform backend response to frontend interface
        const probabilities: Record<string, number> = {};
        data.predictions.forEach(p => {
            probabilities[p.label] = p.confidence;
        });

        return {
            label: data.top_prediction.label,
            confidence: data.top_prediction.confidence,
            probabilities
        };
    },

    async getAdvisory(label: string, confidence: number): Promise<AdvisoryResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/advisory`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ label, confidence })
            });

            if (response.ok) {
                return await response.json();
            }
        } catch (e) {
            console.warn("Backend advisory failed, using fallback", e);
        }

        // Fallback or Mock
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    title: `Assessment: ${label}`,
                    summary: `The AI model has identified patterns consistent with ${label}.`,
                    next_steps: confidence > 0.8 ? "Consult a dermatologist for a biopsy." : "Monitor for changes and re-assess.",
                    disclaimer: "This is an AI-generated assessment and not a medical diagnosis."
                });
            }, 500);
        });
    },

    async chat(label: string, confidence: number, history: ChatMessage[]): Promise<string> {
        const response = await fetch(`${API_BASE_URL}/api/advisory/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label, confidence, history })
        });

        if (!response.ok) {
            throw new Error('Chat failed');
        }

        const data = await response.json();
        return data.content;
    }
};
