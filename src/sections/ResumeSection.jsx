import { useState } from "react";
import { Download, Bot, Sparkles, FileText, Send } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import GlassPanel from "../components/GlassPanel";
import SectionHeading from "../components/SectionHeading";
import { portfolioData } from "../data/portfolioData";

const ResumeSection = () => {
  const [input, setInput] = useState("");
  const [aiResponse, setAiResponse] = useState("Hi! I'm the AI trained on Dinesh's CV. What would you like to know about his experience, education, or skills?");
  const [isTyping, setIsTyping] = useState(false);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const query = input;
    setInput("");
    setAiResponse("...");
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
      if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
        setAiResponse("Please set `VITE_GEMINI_API_KEY` in your `.env` file to use this AI feature.");
        setIsTyping(false);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
You are an AI Resume Analyzer for Dinesh Gonthina.
Here is Dinesh's detailed CV data:
- Education: B.Tech in CSE at Lovely Professional University (Aug 2023 - Present, CGPA: 6.5). Intermediate at Sri Chaitanya jr College (81%). Matriculation at St John's School (83%).
- Internship: AI Intern at InternsElite (Dec 2023 - Feb 2024). Applied Python and ML algorithms for dataset analytics, predicting insights with 15% accuracy improvement. Developed 3 Generative AI POCs.
- Projects: ${JSON.stringify(portfolioData.projects)}
- Skills: ${JSON.stringify(portfolioData.skills)}
- Links: github.com/Diinesh06082005, linkedin.com/in/DineshGonthina, dinesh06082005@gmail.com

The user asks: "${query}"

Instructions:
1. Answer strictly and professionally based on the CV. 
2. Use Markdown. 
3. Keep it concise, highlighted, and directly answer the question to prove Dinesh is a great fit.
4. Try to output exciting bullet points if appropriate.
`;

      const result = await model.generateContent(prompt);
      setAiResponse(result.response.text());
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Failed to connect to the AI model. Please try again.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="resume" className="section-shell">
      <div className="container space-y-10">
        <SectionHeading
          eyebrow="My Resume"
          title="Review my CV & Ask AI"
          description="Download my resume or use the integrated AI to rapidly analyze my background."
        />

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* CV Preview Side */}
          <GlassPanel className="p-6 flex flex-col h-[550px]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-primary font-medium">
                <FileText className="text-cyan-400" size={20} />
                <span>Resume Preview</span>
              </div>
              <a
                href={portfolioData.personal.resumeUrl}
                download
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-cyan-300 transition hover:bg-white/10"
              >
                <Download size={16} />
                Download PDF
              </a>
            </div>
            <div className="flex-1 rounded-2xl overflow-hidden border border-white/10 bg-slate-950">
              <iframe
                src={`${portfolioData.personal.resumeUrl}#view=FitH`}
                title="Resume PDF"
                className="h-full w-full border-none bg-white"
              />
            </div>
          </GlassPanel>

          {/* AI Feature Side */}
          <GlassPanel className="p-6 flex flex-col h-[550px]">
             <div className="flex items-center gap-2 text-primary font-medium mb-4">
                <Bot className="text-fuchsia-400" size={20} />
                <span>AI CV Analyst</span>
                <span className="ml-auto text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 uppercase tracking-widest font-semibold border border-fuchsia-500/30">Gemini Powered</span>
             </div>

             <div className="flex-1 flex flex-col bg-slate-900/40 rounded-2xl border border-white/5 p-5 overflow-hidden">
                <div className="flex-1 overflow-y-auto mb-4 pr-3 prose prose-invert prose-sm prose-cyan [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full prose-p:leading-relaxed prose-li:my-1">
                  {isTyping && aiResponse === "..." ? (
                    <div className="flex items-center gap-2 text-cyan-400 font-medium">
                      <Sparkles size={16} className="animate-spin text-fuchsia-400" />
                      Analyzing CV...
                    </div>
                  ) : (
                    <ReactMarkdown>{aiResponse}</ReactMarkdown>
                  )}
                </div>

                <div className="shrink-0 mt-auto pt-2 border-t border-white/10">
                  <div className="mb-3 flex flex-wrap gap-2">
                     <button type="button" onClick={() => setInput("What are his strongest skills?")} className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition">Top Skills</button>
                     <button type="button" onClick={() => setInput("Summarize his AI internship")} className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition">Internship</button>
                     <button type="button" onClick={() => setInput("Is he fit for a Full Stack role?")} className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition">Full Stack Fit</button>
                  </div>
                  <form onSubmit={handleAsk} className="relative flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="e.g. Does Dinesh have React experience?"
                      className="w-full rounded-full border border-white/10 bg-slate-800/80 px-5 py-3.5 pr-12 text-sm text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:outline-none focus:bg-slate-800 transition shadow-inner"
                      disabled={isTyping}
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      className="absolute right-2 rounded-full bg-cyan-500 p-2 text-white transition hover:bg-cyan-400 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <Send size={16} className="ml-0.5" />
                    </button>
                  </form>
                </div>
             </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
