import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';
import { api } from '../../services/api';
import botHead from '../../assets/bot-head.svg';

export function MelaBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'bot' | 'user'; text: string }[]>([
        { role: 'bot', text: "Astro here! 🚀 Ready to scan and assist using my visual sensors!" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Animation States
    const [eyeState, setEyeState] = useState<'normal' | 'blink' | 'happy' | 'squint'>('normal');
    const [lookDirection, setLookDirection] = useState({ x: 0, y: 0 }); // -1 to 1
    const [idleMessage, setIdleMessage] = useState<string | null>(null);

    const isDraggingRef = useRef(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const lastInteractionTime = useRef(Date.now());
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const resetIdleTimer = () => {
        lastInteractionTime.current = Date.now();
        if (idleMessage) setIdleMessage(null);

        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

        idleTimerRef.current = setTimeout(() => {
            if (!isOpen && !isDraggingRef.current) {
                const msgs = ["Need a hand?", "I can scan that!", "Hello there! 👋", "Systems operational."];
                setIdleMessage(msgs[Math.floor(Math.random() * msgs.length)]);

                // Hide after 5s
                setTimeout(() => setIdleMessage(null), 5000);
            }
        }, 10000); // 10s idle
    };

    useEffect(() => {
        scrollToBottom();
        resetIdleTimer();
        window.addEventListener('mousemove', resetIdleTimer);
        window.addEventListener('click', resetIdleTimer);
        window.addEventListener('keydown', resetIdleTimer);

        return () => {
            window.removeEventListener('mousemove', resetIdleTimer);
            window.removeEventListener('click', resetIdleTimer);
            window.removeEventListener('keydown', resetIdleTimer);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, [messages, isTyping, isOpen]);

    // Blinking & Looking
    useEffect(() => {
        const startBlink = () => {
            setEyeState(prev => prev === 'normal' ? 'blink' : prev);
            setTimeout(() => setEyeState(prev => prev === 'blink' ? 'normal' : prev), 150);
            setTimeout(startBlink, Math.random() * 3000 + 2000);
        };
        const blinkTimer = setTimeout(startBlink, 2000);

        const moveEyes = () => {
            if (!isDraggingRef.current && !isOpen) {
                setLookDirection({
                    x: (Math.random() - 0.5) * 1.5,
                    y: (Math.random() - 0.5) * 1.5
                });
            } else if (isOpen) {
                setLookDirection({ x: -0.3, y: 0.1 });
            } else {
                setLookDirection({ x: 0, y: 0 });
            }
            setTimeout(moveEyes, Math.random() * 2000 + 1000);
        };
        const eyeTimer = setTimeout(moveEyes, 1000);

        return () => {
            clearTimeout(blinkTimer);
            clearTimeout(eyeTimer);
        };
    }, [isOpen]);

    // Listen for Analysis Completion
    useEffect(() => {
        const handleAnalysisComplete = (event: Event) => {
            const customEvent = event as CustomEvent<{ label: string; confidence: number; summary: string }>;
            const { label, confidence, summary } = customEvent.detail;

            setIsOpen(true);
            setEyeState('happy');

            // Small delay to make it feel natural
            setTimeout(() => {
                const uniqueMessage = `Analysis complete! 🔍\nI've detected **${label}** with ${(confidence * 100).toFixed(1)}% confidence.\n\n**Quick Insight:**\n${summary}`;
                setMessages(prev => [...prev, { role: 'bot', text: uniqueMessage }]);
            }, 500);
        };

        window.addEventListener('melascope:analysis-complete', handleAnalysisComplete);

        return () => {
            window.removeEventListener('melascope:analysis-complete', handleAnalysisComplete);
        };
    }, []);

    const handleDragStart = () => {
        setIsDragging(true);
        isDraggingRef.current = true;
        setEyeState('squint');
        setIdleMessage(null);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setEyeState('normal');

        setTimeout(() => {
            isDraggingRef.current = false;
        }, 200);
    };

    const toggleChat = () => {
        if (!isDraggingRef.current) {
            setIsOpen(prev => !prev);
        }
    };

    const sendMessage = async () => {
        if (!inputValue.trim()) return;
        const userText = inputValue;
        setMessages(prev => [...prev, { role: 'user', text: userText }]);
        setInputValue("");
        setIsTyping(true);

        try {
            // Mock API call or real one
            const contextStr = localStorage.getItem('lastAssessment');
            const label = contextStr ? JSON.parse(contextStr).label : "Unknown";
            const confidence = contextStr ? JSON.parse(contextStr).confidence : 0.0;
            const history = messages.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text }));

            const responseText = await api.chat(label, confidence, history, userText);
            setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: "Connectivity issue. 📡 Retrying..." }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="pointer-events-auto absolute bottom-28 right-0 w-80 h-[450px] bg-white/90 backdrop-blur-xl border border-blue-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col font-sans z-[60]"
                    >
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex items-center justify-between text-white shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                    <Zap size={16} className="text-yellow-300 fill-yellow-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Astro Bot</h3>
                                    <p className="text-[10px] opacity-90">Online</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full"><X size={16} /></button>
                        </div>

                        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={cn("p-3 rounded-2xl text-sm max-w-[85%]", msg.role === 'user' ? "ml-auto bg-blue-600 text-white rounded-br-none" : "bg-white border border-blue-100 text-slate-700 rounded-bl-none shadow-sm")}>
                                    {msg.text}
                                </div>
                            ))}
                            {isTyping && <div className="text-xs text-slate-400 p-2">Astro is thinking...</div>}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-3 bg-white border-t border-blue-50 flex gap-2">
                            <input
                                autoFocus
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                                placeholder="Type a message..."
                                className="flex-1 bg-slate-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            />
                            <button onClick={sendMessage} disabled={!inputValue.trim()} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50"><Send size={16} /></button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Draggable Bot Avatar */}
            <motion.div
                drag
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="pointer-events-auto cursor-grab active:cursor-grabbing relative"
                onClick={toggleChat}
            >
                {/* Idle Message Bubble */}
                <AnimatePresence>
                    {(idleMessage) && !isDragging && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -60, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute -top-6 right-0 bg-white px-3 py-1.5 rounded-xl rounded-br-none shadow-md text-xs font-bold text-blue-600 border border-blue-100 whitespace-nowrap"
                        >
                            {idleMessage}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Robot Head Container */}
                <div className="w-24 h-24 relative filter drop-shadow-2xl">
                    <img src={botHead} alt="Astro Bot" className="w-full h-full object-contain" />

                    {/* CSS Overlay Eyes for Animation */}
                    <div className="absolute top-[38%] left-[28%] w-[44%] h-[20%] flex gap-2 justify-center items-center pointer-events-none">
                        <motion.div
                            className="w-3.5 h-6 bg-cyan-300 rounded-full shadow-[0_0_10px_cyan]"
                            animate={{
                                scaleY: eyeState === 'blink' ? 0.1 : eyeState === 'squint' || eyeState === 'happy' ? 0.5 : 1,
                                rx: eyeState === 'happy' ? 10 : 5
                            }}
                            style={{ x: lookDirection.x * 6, y: lookDirection.y * 4 }}
                        />
                        <motion.div
                            className="w-3.5 h-6 bg-cyan-300 rounded-full shadow-[0_0_10px_cyan]"
                            animate={{
                                scaleY: eyeState === 'blink' ? 0.1 : eyeState === 'squint' || eyeState === 'happy' ? 0.5 : 1,
                                rx: eyeState === 'happy' ? 10 : 5
                            }}
                            style={{ x: lookDirection.x * 6, y: lookDirection.y * 4 }}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
