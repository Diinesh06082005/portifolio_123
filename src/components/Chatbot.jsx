import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { portfolioData } from "../data/portfolioData";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Dinesh's AI assistant. Ask me anything about his projects, skills, or certifications!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
      
      if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
        setMessages(prev => [...prev, { role: "assistant", content: "Hey! The Gemini API key is missing. Please add `VITE_GEMINI_API_KEY` to the `.env` file to enable chat." }]);
        setIsTyping(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const chatHistory = messages.slice(-5).map(m => `${m.role === 'user' ? 'USER' : 'ASSISTANT'}: ${m.content}`).join("\n");

      const promptContext = `
You are a highly capable AI assistant agent for Dinesh Gonthina's portfolio website. 
Your mission is to represent Dinesh intelligently. Answer questions about his background, CV, projects, and skills. Actively guide the user by providing navigation links.
You have access to his complete portfolio data:
${JSON.stringify(portfolioData)}

Additionally, you know his detailed CV information:
- Education: B.Tech in CSE at Lovely Professional University (Aug 2023 - Present, CGPA: 6.5). Intermediate at Sri Chaitanya jr College (Apr 2021 - Mar 2023, 81%). Matriculation at St John's School (Apr 2018 - Mar 2021, 83%).
- Internship: AI Intern at InternsElite (Dec 2023 - Feb 2024). Applied Python and ML algorithms for dataset analytics, predicting insights with 15% accuracy improvement. Developed 3 Generative AI POCs.
- Extracurriculars: Web Ka Hackathon (Mar 2024), Finovation Event (Sep 2024).
- Core CS Skills: DSA, OOPs, DBMS, OS, Computer Network, System Design.
- Soft Skills: Problem-Solving, Project Management, Adaptability.
- Links & Contact: github.com/Diinesh06082005, linkedin.com/in/DineshGonthina, dinesh06082005@gmail.com, Mobile: +91-8008590502.

Instructions:
1. Answer intelligently, concisely, and politely as his personal agent. Maintain context.
2. If asked about projects/certs, provide rich summaries and Markdown links.
3. *NAVIGATION*: Guide the user around the website using Markdown anchors! ALWAYS add a link to the relevant section using these exact anchor IDs:
   - [Go to Home](#home)
   - [View About](#about)
   - [View Skills](#skills)
   - [See Projects](#projects)
   - [Check Certifications](#certifications)
   - [Contact Dinesh](#contact)
4. Never break character. Be a smart Agent.

Recent Chat History:
${chatHistory}

USER QUERY: ${userMessage}
`;

      const result = await model.generateContent(promptContext);
      const responseText = result.response.text();

      setMessages(prev => [...prev, { role: "assistant", content: responseText }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Oops, something went wrong processing your request. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 cursor-pointer group" onClick={() => setIsOpen(true)}>
          {/* Tooltip that bounces */}
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
            transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
            className="relative mr-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2"
          >
            <span>Ask AI Agent!</span>
            <Sparkles size={16} className="text-yellow-300" />
            <div className="absolute right-5 -bottom-1 h-3 w-3 rotate-45 bg-blue-600" />
          </motion.div>

          <div className="relative">
            {/* Pulsating invisible ring behind button */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-cyan-400 blur-sm pointer-events-none"
            />
            {/* The actual button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
              whileTap={{ scale: 0.9 }}
              className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_0_30px_rgba(6,182,212,0.8)] border-[1.5px] border-cyan-200/50 transition-all"
            >
              <Bot size={26} />
              
              {/* Notification Dot */}
              <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-red-500 border-2 border-slate-900 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            </motion.button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 right-6 z-[60] flex h-[500px] w-[350px] max-w-[90vw] flex-col overflow-hidden rounded-[2rem] border border-white/20 bg-slate-900/95 shadow-2xl backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-800/80 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white leading-tight">Dinesh's AI Assistant</h3>
                  <p className="text-[11px] text-cyan-200/80 uppercase tracking-widest font-medium">Powered by Gemini</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
                  {msg.role === "assistant" && (
                    <div className="flex-shrink-0 mt-auto h-7 w-7 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-cyan-400">
                      <Bot size={14} />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-sm shadow-md"
                        : "bg-white/5 text-slate-200 rounded-bl-sm border border-white/10 shadow-inner prose prose-invert prose-sm prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-p:my-1 prose-ul:my-1"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="flex-shrink-0 mt-auto h-7 w-7 rounded-full bg-slate-700 flex items-center justify-center text-white">
                      <User size={14} />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start gap-3">
                  <div className="flex-shrink-0 mt-auto h-7 w-7 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-cyan-400">
                    <Bot size={14} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-3.5 shadow-inner">
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Input Form */}
            <div className="border-t border-white/10 bg-slate-800/80 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-3 rounded-[1.5rem] border border-white/10 bg-slate-900/50 pl-4 pr-1.5 py-1.5 focus-within:border-cyan-500/50 focus-within:bg-slate-900 transition-all shadow-inner"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-white transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none"
                  aria-label="Send message"
                >
                  <Send size={14} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
