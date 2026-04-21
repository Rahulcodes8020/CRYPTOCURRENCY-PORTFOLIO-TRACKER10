"use client";

import React from "react";
import { FaRobot } from "react-icons/fa";

type Props = {
  isSuccess: boolean;
};

export default function LoginRobot({ isSuccess }: Props) {
  return (
    <div className="relative flex flex-col items-center justify-center h-64 w-64 mx-auto mb-8">
      {/* Robot Body */}
      <div className={`relative z-10 
        ${!isSuccess ? "animate-bounce" : "animate-[success-nod_0.5s_ease-in-out_2]"}
      `}>
        <div className={`w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex flex-col items-center justify-center border-4 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.6)] relative overflow-hidden group`}>
          {/* Glowing Eyes */}
          <div className="flex gap-4 mb-2">
             <div className={`w-4 h-4 rounded-full shadow-[0_0_15px] transition-all duration-500 
               ${isSuccess ? "bg-green-400 shadow-green-500" : "bg-blue-400 shadow-blue-500 animate-pulse"}
             `} />
             <div className={`w-4 h-4 rounded-full shadow-[0_0_15px] transition-all duration-500 
               ${isSuccess ? "bg-green-400 shadow-green-500" : "bg-blue-400 shadow-blue-500 animate-pulse"}
             `} />
          </div>
          <FaRobot className="text-5xl text-white drop-shadow-lg" />
          
          {/* Scanning Effect inside body */}
          <div className="absolute inset-x-0 h-1 bg-blue-400/30 animate-[scan_2s_infinite]" />
        </div>
        
        {/* Antenna */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-blue-400">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_red]" />
        </div>

        {/* Arms */}
        <div className="absolute top-1/2 -left-8 w-10 h-3 bg-blue-500 rounded-full origin-right transition-transform duration-500"
          style={{ transform: isSuccess ? "rotate(45deg) translate(20px, -20px)" : "rotate(0deg)" }}
        />
        <div className="absolute top-1/2 -right-8 w-10 h-3 bg-blue-500 rounded-full origin-left transition-transform duration-500"
          style={{ transform: isSuccess ? "rotate(-45deg) translate(-20px, -20px)" : "rotate(0deg)" }}
        />
      </div>

      {/* Hand Joint Effect (The "success" moment) */}
      {isSuccess && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center animate-in zoom-in duration-300">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.8)] border-2 border-white">
            <span className="text-2xl">🤝</span>
          </div>
          {/* Sparkles */}
          <div className="absolute inset-[-40px] border-4 border-dashed border-cyan-400 rounded-full animate-spin duration-[4s]" />
          <div className="absolute inset-[-20px] border-2 border-dashed border-purple-500 rounded-full animate-[spin_3s_linear_infinite_reverse]" />
        </div>
      )}

      {/* Futuristic Glow Base */}
      <div className="absolute bottom-4 w-40 h-4 bg-blue-500/20 rounded-full blur-md animate-pulse" />
      
      <style jsx>{`
        .hand-joint {
          animation: joint-hands 0.5s forwards ease-out;
        }
        @keyframes success-nod {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes hologram-scan {
          to { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}
