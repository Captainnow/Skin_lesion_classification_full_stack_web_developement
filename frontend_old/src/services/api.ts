import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PredictionResponse {
  label: string;
  confidence: number;
  probabilities: Record<string, number>;
}

export interface AdvisoryResponse {
  title: string;
  summary: string;
  next_steps: string;
  prevention: string;
  disclaimer: string;
}

export interface ChatResponse {
  content: string;
}

export type AdvisoryData = AdvisoryResponse;

export interface ChatTurn {
  role: string;
  content: string;
}

export const api = {
  // Health Check
  checkHealth: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('API Health Check Failed:', error);
      throw error;
    }
  },

  // Analyze Lesion Image
  analyzeLesion: async (file: File): Promise<PredictionResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    console.log(`[Frontend] Sending analysis request for file: ${file.name} to /assess`);

    try {
      const response = await apiClient.post('/assess', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Transform backend response to match PredictionResponse definition
      const data = response.data;
      const top = data.top_prediction;

      // Convert list of preds to record for UI
      const probs: Record<string, number> = {};
      data.predictions.forEach((p: any) => {
        probs[p.label] = p.confidence;
      });

      return {
        label: top.label,
        confidence: top.confidence,
        probabilities: probs
      };
    } catch (error) {
      console.error('Lesion Analysis Failed:', error);
      throw error;
    }
  },

  // Get Advisory (Structured)
  getAdvisory: async (label: string, confidence: number): Promise<AdvisoryResponse> => {
    try {
      const response = await apiClient.post('/advisory', { label, confidence });
      return response.data;
    } catch (error) {
      console.error('Advisory Fetch Failed:', error);
      // Return fallback if API fails
      return {
        title: "Advisory Unavailable",
        summary: "Could not fetch detailed AI advisory.",
        next_steps: "Consult a doctor.",
        prevention: "N/A",
        disclaimer: "System Error."
      };
    }
  },

  // Chat with MelaBot
  chat: async (label: string, confidence: number, history: { role: string; content: string }[], message: string): Promise<string> => {
    try {
      // Append current message to history for the request
      const chatHistory = [...history, { role: 'user', content: message }];

      // We need to send the history *excluding* the latest message as 'history' 
      // and the API might expect the context. 
      // Looking at backend/advisory.py, it takes `history: List[ChatTurn]`.
      // The backend ADDS the user message from the history? No, wait.
      // Backend definition: 
      // class ChatRequest(BaseModel):
      //    label: str
      //    confidence: float
      //    history: List[ChatTurn]
      //
      // And logic:
      // messages = [system_msg]
      // ...
      // for turn in req.history:
      //    messages.append(...)
      //
      // So if I want the LLM to see the user's question, it MUST be in `history`.

      const response = await apiClient.post<ChatResponse>('/advisory/chat', {
        label,
        confidence,
        history: chatHistory
      });
      return response.data.content;
    } catch (error) {
      console.error('Chat Failed:', error);
      return "I'm having trouble connecting to my brain right now. Please try again later.";
    }
  }
};
