"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginRobot from "@/components/LoginRobot";
import { FaUserAlt, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const router = useRouter();

  const terminalLogs = [
    "[INITIALIZING] Nexus Biometric Module...",
    "[STATUS] Fingerprint Scanner Active",
    "[STATUS] Facial Recognition: 100% Match",
    "[SECURITY] Bypassing Local Firewalls...",
    "[VAULT] Connection Requested",
    "[VAULT] Decrypting 512-bit RSA Keys...",
    "[OK] NEXUS VAULT UNLOCKED",
    "[FINALIZE] Opening Investment Terminal..."
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    
    // Simulate terminal logs appearing sequentially
    terminalLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, index * 200);
    });

    // Final Redirect
    setTimeout(() => {
      localStorage.setItem("nexus_auth", "true");
      localStorage.setItem("nexus_user", "Nexus Node #4120");
      router.push("/invest");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #1e1e1e 1px, transparent 1px), linear-gradient(to bottom, #1e1e1e 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />
      
      {/* Data Stream "Rain" Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
        <div className="flex justify-around w-full h-full">
           {[...Array(10)].map((_, i) => (
             <div key={i} className="w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-[data-rain_4s_infinite]" 
               style={{ animationDelay: `${i * 0.4}s` }} />
           ))}
        </div>
      </div>

      {/* Biometric Scanning Beam */}
      {isSuccess && (
        <div className="absolute inset-x-0 h-2 bg-cyan-400 shadow-[0_0_20px_cyan] z-50 animate-[biometric-scan_1.5s_linear_infinite]" />
      )}

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Side: Robot and Logs */}
        <div className="space-y-8 flex flex-col items-center lg:items-start order-2 lg:order-1">
           <LoginRobot isSuccess={isSuccess} />
           
           {/* Terminal Console Logs */}
           <div className={`w-full max-w-sm bg-black/80 border-2 border-gray-900 rounded-2xl p-6 font-mono text-[10px] space-y-2 h-48 overflow-y-auto transition-opacity duration-1000 ${isSuccess ? "opacity-100" : "opacity-0"}`}>
              {logs.map((log, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-blue-500">nexus@auth:~$</span>
                  <span className={log.includes("OK") ? "text-green-400 font-bold" : "text-gray-400"}>{log}</span>
                </div>
              ))}
              {logs.length > 0 && <div className="w-2 h-4 bg-blue-500 animate-pulse inline-block ml-2" />}
           </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="order-1 lg:order-2">
          <header className="text-center lg:text-left mb-8">
            <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic uppercase tracking-tighter leading-none">
              Nexus Terminal
            </h1>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.3em] mt-4 border-l-4 border-blue-600 pl-4">
              Restricted Institutional Access
            </p>
          </header>

          <form onSubmit={handleLogin} className="space-y-4 bg-gray-900/40 p-8 md:p-12 rounded-[3rem] border border-gray-800 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
            {/* Success Overlay */}
            {isSuccess && (
              <div className="absolute inset-0 z-20 bg-blue-600/10 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-500">
                <div className="p-1 rounded-full bg-blue-500 text-white font-black uppercase text-[10px] tracking-widest shadow-[0_0_20px_blue] animate-bounce px-6 py-2">
                  Authorization Verified
                </div>
              </div>
            )}

            <div className="relative group">
              <FaUserAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Nexus ID / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/60 border border-gray-800 text-white rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-gray-800"
                required
              />
            </div>

            <div className="relative group">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="password"
                placeholder="Security Phrase"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/60 border border-gray-800 text-white rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-bold placeholder:text-gray-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-600 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs"
            >
              Authorize Nexus Link
            </button>
            
            <div className="mt-8 flex justify-between items-center text-[9px] uppercase font-black tracking-widest gap-4">
              <Link href="/signup" className="text-blue-500 hover:text-white transition-colors underline">Request New Nexus ID</Link>
              <div className="flex gap-4 text-gray-700">
                <span>Encrypted SHA-256</span>
                <span>•</span>
                <span>Layer 2 Verified</span>
              </div>
            </div>
          </form>
        </div>
      </div>

      <p className="mt-20 text-gray-700 text-[8px] uppercase font-black tracking-[0.5em] flex items-center gap-3">
         <span className="w-1.5 h-1.5 bg-gray-900 rounded-full animate-pulse" />
         Nexus Security Subsystem v7.3.0
      </p>

      <style jsx global>{`
        @keyframes biometric-scan {
          0% { top: -5%; }
          100% { top: 105%; }
        }
        @keyframes data-rain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}
