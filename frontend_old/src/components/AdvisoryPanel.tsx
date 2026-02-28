// frontend/src/components/AdvisoryPanel.tsx
import React from "react";
import type { AdvisoryData, ChatTurn } from "../services/api";

interface Props {
  open: boolean;
  onClose: () => void;
  advisory: AdvisoryData | null;
  chatHistory: ChatTurn[];
  onSendMessage: (msg: string) => void;
}

const AdvisoryPanel: React.FC<Props> = ({ open, onClose, advisory, chatHistory, onSendMessage }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [isSending, setIsSending] = React.useState(false);
  const chatEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-expand when new advisory comes in? Optional.
  // For now, we prefer user control or auto-expand first time.
  React.useEffect(() => {
    if (open && advisory) {
      setIsExpanded(false); // start small
    }
  }, [open, advisory]);

  // Scroll to bottom of chat
  React.useEffect(() => {
    if (isExpanded && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, isExpanded]);

  const handleSend = async () => {
    if (!input.trim() || isSending) return;
    setIsSending(true);
    await onSendMessage(input); // parent handles api call
    setInput("");
    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!open) return null;

  return (
    <div
      className={`fixed right-4 bottom-4 bg-white shadow-xl rounded-2xl border border-slate-200 z-50 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "w-96 h-[600px] flex flex-col" : "w-64 h-auto p-3 cursor-pointer hover:bg-slate-50"
        }`}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <div className={`flex justify-between items-start ${isExpanded ? 'p-4 border-b bg-slate-50' : ''}`}>
        <div className="flex items-center gap-2">
          {/* Creative Touch: Icon that changes or animates */}
          <div className={`w-2 h-2 rounded-full ${isExpanded ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`} />
          <h3 className={`font-semibold text-slate-900 ${isExpanded ? 'text-lg' : 'text-sm'}`}>
            {isExpanded
              ? (advisory ? "Advisory Assistant" : "Skin Health Assistant")
              : "Chat Helper Available"}
          </h3>
        </div>

        <div className="flex gap-2">
          {isExpanded && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
              className="text-slate-400 hover:text-slate-600 transition-colors"
              title="Collapse"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-slate-400 hover:text-red-500 transition-colors"
            title="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area with smooth reveal */}
      <div
        className={`transition-all duration-500 ease-in-out flex flex-col overflow-hidden ${isExpanded ? "opacity-100 flex-1" : "opacity-0 h-0"
          }`}
      >
        <div className="overflow-y-auto p-4 space-y-4 flex-1">
          {/* Initial Report - Only if advisory exists */}
          {advisory ? (
            <div className="mb-6">
              <p className="font-medium text-slate-800 mb-2 border-b pb-2">{advisory.title}</p>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">{advisory.summary}</p>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-blue-800 mb-1 uppercase tracking-wide">Next steps</p>
                  <p className="text-sm text-blue-900">{advisory.next_steps}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs font-bold text-green-800 mb-1 uppercase tracking-wide">Prevention</p>
                  <p className="text-sm text-green-900">{advisory.prevention}</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-4 italic border-t pt-2">
                {advisory.disclaimer}
              </p>
            </div>
          ) : (
            <div className="mb-6 p-4 bg-slate-50 rounded-xl text-center">
              <p className="text-sm text-slate-600">
                Hi! I'm here to help while you upload your image.
                Ask me general questions about skin health, sun protection, or how to take a good photo.
              </p>
            </div>
          )}

          {/* Chat History */}
          {chatHistory.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-xs font-semibold text-slate-500 mb-3 uppercase">Conversation</h4>
              <div className="space-y-3">
                {chatHistory.map((turn, i) => (
                  <div key={i} className={`flex ${turn.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-xl text-sm ${turn.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-100 text-slate-800 rounded-tl-none'
                        }`}
                    >
                      {turn.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 border-t bg-white" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a follow-up question..."
              disabled={isSending}
              className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isSending}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisoryPanel;
