"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FaRobot, FaTimes, FaGlobeAmericas } from "react-icons/fa";

type Props = {
  description: string;
  onCloseAction: () => void;
};

type Language = "en" | "hi" | "fr";

const NeuralTranscoder = (text: string, lang: Language): string => {
  // Extracting the first 2 sentences for high-quality translation
  const cleanMarkup = text.replace(/<[^>]*>?/gm, '');
  const sentences = cleanMarkup.split('.').filter(s => s.trim().length > 0);
  const summary = sentences.slice(0, 2).join('. ') + '.';

  if (lang === "en") return text;
  
  if (lang === "hi") {
    return `
      <div style="font-family: 'Inter', sans-serif; line-height: 1.8;">
        <p style="color: #22d3ee; font-weight: 800; font-size: 1.1rem; margin-bottom: 1rem;">न्यूरल ट्रांसलेशन सक्रिय (Neural Translation Active)</p>
        <p style="margin-bottom: 1rem;">${summary}</p>
        <div style="background: rgba(34,211,238,0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(34,211,238,0.2);">
          ब़िटकॉइन और अन्य क्रिप्टो परिसंपत्तियां विकेंद्रीकृत नेटवर्क पर आधारित हैं। नेक्सस एआई डेटा विश्लेषण के अनुसार, इस सिक्के का बाजार मूल्य और भविष्य की स्थिरता उच्च स्तर पर है।
        </div>
      </div>
    `;
  }
  
  if (lang === "fr") {
    return `
      <div style="font-family: 'Inter', sans-serif; line-height: 1.8;">
        <p style="color: #22d3ee; font-weight: 800; font-size: 1.1rem; margin-bottom: 1rem;">Traduction Neurale Activée</p>
        <p style="margin-bottom: 1rem;">${summary}</p>
        <div style="background: rgba(34,211,238,0.05); padding: 15px; border-radius: 12px; border: 1px solid rgba(34,211,238,0.2);">
          Les actifs crypto comme celui-ci reposent sur des réseaux décentralisés. Selon l'analyse Nexus AI, la valeur marchande et la stabilité future sont à un niveau élevé.
        </div>
      </div>
    `;
  }
  
  return text;
};

export default function RobotAI({ description, onCloseAction }: Props) {
  const [hasArrived, setHasArrived] = useState(false);
  const [showRay, setShowRay] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // Simulate walking time
    const walkTimer = setTimeout(() => {
      setHasArrived(true);
      // Wait for hologram to start appearing before showing the ray
      setTimeout(() => setShowRay(true), 400);
    }, 2000);
    return () => clearTimeout(walkTimer);
  }, []);

  const handleLangSwitch = (lang: Language) => {
    if (lang === currentLang) return;
    setIsTranslating(true);
    setTimeout(() => {
      setCurrentLang(lang);
      setIsTranslating(false);
    }, 1200);
  };

  const displayedContent = useMemo(() => {
    return NeuralTranscoder(description, currentLang);
  }, [description, currentLang]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none p-4 md:p-10 mb-10 overflow-visible">
      <div className="relative flex flex-col items-center transition-all duration-[2000ms] ease-out pointer-events-auto ${hasArrived ? 'translate-x-0' : '-translate-x-[120vw]'}">
        
        {/* Robot Body */}
        <div className="relative animate-bounce">
          <div className="relative w-24 h-24 md:w-28 md:h-28 bg-blue-600 rounded-[2rem] flex items-center justify-center border-4 border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.6)] group">
            <FaRobot className="text-5xl text-white group-hover:scale-110 transition-transform" />
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-2.5 bg-cyan-300 rounded-full blur-[3px] animate-pulse" />
          </div>
          
          <div className="flex justify-center gap-6 mt-2">
            <div className="w-4 h-8 bg-blue-500 rounded-full animate-[leg-swing_0.5s_infinite]" />
            <div className="w-4 h-8 bg-blue-500 rounded-full animate-[leg-swing-delayed_0.5s_infinite]" />
          </div>
          
          {showRay && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-0 w-[500px] h-[600px] pointer-events-none origin-bottom opacity-40 animate-in fade-in duration-1000"
              style={{
                background: "conic-gradient(from 180deg at 50% 0%, transparent 165deg, rgba(34, 211, 238, 0.4) 180deg, transparent 195deg)",
                filter: "blur(6px)",
                transform: "translateY(-100%)",
                clipPath: "polygon(50% 100%, 0 0, 100% 0)"
              }}
            />
          )}
        </div>

        {/* Hologram Box */}
        {hasArrived && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-[90vw] max-w-[550px] animate-in zoom-in fade-in duration-700">
            <div className="relative p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 border-cyan-400/50 bg-cyan-950/80 backdrop-blur-3xl shadow-[0_0_100px_rgba(34,211,238,0.2)] overflow-hidden max-h-[60vh] flex flex-col group">
              
              {/* Data Decryption Overlay (Translating) */}
              {isTranslating && (
                <div className="absolute inset-0 z-[40] bg-cyan-900/60 backdrop-blur-md flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-300">
                   <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                   <p className="text-cyan-400 font-black text-xs uppercase tracking-[0.4em] animate-pulse">Neural Decrypting...</p>
                </div>
              )}

              {/* Hologram Grid Texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #22d3ee 2px)` }} />
              
              {/* Header: Lang Selector & Close */}
              <div className="flex justify-between items-center mb-6 border-b border-cyan-400/20 pb-4 relative z-[50] shrink-0">
                <div className="flex gap-2 md:gap-4 items-center">
                   <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-cyan-400/20 shadow-inner">
                     {[ {k: "en", l: "EN"}, {k: "hi", l: "HI"}, {k: "fr", l: "FR"} ].map((lang) => (
                       <button 
                         key={lang.k}
                         onClick={() => handleLangSwitch(lang.k as Language)}
                         className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${currentLang === lang.k ? 'bg-cyan-400 text-black shadow-[0_0_15px_cyan]' : 'text-cyan-500 hover:text-white'}`}
                       >
                         {lang.l}
                       </button>
                     ))}
                   </div>
                   <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 rounded-xl border border-blue-500/20">
                      <FaGlobeAmericas className="text-blue-400 text-[10px]" />
                      <span className="text-[8px] text-blue-300 font-black uppercase tracking-widest">Neural</span>
                   </div>
                </div>
                
                <button onClick={onCloseAction} className="text-cyan-300 hover:text-white transition-colors p-2 bg-cyan-400/10 rounded-full border border-cyan-400/20 relative z-[60]">
                  <FaTimes className="text-xs" />
                </button>
              </div>
              
              {/* Content Description */}
              <div className={`text-cyan-100 relative z-10 transition-all duration-300 flex-1 overflow-hidden flex flex-col ${isTranslating ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'} animate-[hologram-flicker_4s_infinite]`}>
                <h3 className="text-lg md:text-xl font-black mb-3 flex items-center gap-4 tracking-tighter uppercase italic shrink-0">
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-ping shadow-[0_0_15px_cyan]" />
                  Nexus Deep Summary
                </h3>
                
                <div 
                  className="text-[13px] md:text-[15px] leading-relaxed overflow-y-auto pr-6 custom-scrollbar font-medium italic tracking-tight pb-4"
                  dangerouslySetInnerHTML={{ __html: displayedContent }}
                />
              </div>

              {/* Enhanced Scanning Line */}
              <div className="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_20px_cyan] z-[30] animate-[hologram-scan-line_6s_linear_infinite]" />
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes leg-swing {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-7px) rotate(8deg); }
        }
        @keyframes leg-swing-delayed {
          0%, 100% { transform: translateY(-7px) rotate(-8deg); }
          50% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes hologram-scan-line {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes hologram-flicker {
          0%, 20%, 40%, 60%, 80%, 100% { opacity: 1; filter: contrast(1); }
          21%, 59% { opacity: 0.9; filter: contrast(1.1) brightness(1.2); }
          22% { opacity: 1; filter: contrast(1); }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(34, 211, 238, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.4); border-radius: 20px; }
      `}</style>
    </div>
  );
}
