"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUserPlus, FaFingerprint, FaCheckCircle, FaDna, FaEye } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", nodeID: "" });
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    
    // Simulate Genomic Scan
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStep(2);
          setIsScanning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const finalizeEnrollment = () => {
    toast.success("Nexus Node Initialized!");
    localStorage.setItem("nexus_auth", "true");
    localStorage.setItem("nexus_user", formData.name || "Nexus Node #8120");
    
    setTimeout(() => {
      router.push("/invest");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Background Tech Overlays */}
      <div className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 p-10 opacity-10 font-mono text-[10px] text-blue-500 select-none">
         GENOMIC_SEQ_V7 // BYPASS_INIT // SECURE_HANDSHAKE
      </div>

      <div className="w-full max-w-2xl bg-gray-900/40 p-12 md:p-20 rounded-[4rem] border-2 border-gray-800 backdrop-blur-3xl shadow-[0_0_100px_rgba(59,130,246,0.1)] relative z-10 overflow-hidden">
        
        {/* Progress Bar */}
        {isScanning && (
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-800">
             <div className="h-full bg-blue-500 shadow-[0_0_15px_blue] transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-12 animate-in fade-in zoom-in duration-700">
             <header className="text-center space-y-4">
                <div className="w-20 h-20 bg-blue-600/10 border-2 border-blue-500/30 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                   <FaUserPlus className="text-3xl text-blue-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter bg-gradient-to-r from-white to-gray-600 bg-clip-text text-transparent">Nexus Enrollment</h1>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Initialize your institutional identity</p>
             </header>

             <form onSubmit={handleEnroll} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-4">Full Identity</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full bg-black/60 border-2 border-gray-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold placeholder:text-gray-900" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-4">Network Email</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="john@nexus.com" 
                        className="w-full bg-black/60 border-2 border-gray-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 transition-all font-bold placeholder:text-gray-900" 
                      />
                   </div>
                </div>

                <div className="bg-black/80 p-8 rounded-3xl border border-gray-800 relative overflow-hidden group cursor-pointer hover:border-blue-500/50 transition-all">
                   <div className="flex items-center gap-6">
                      <div className={`text-5xl ${isScanning ? 'text-blue-500 animate-pulse' : 'text-gray-700'} transition-colors`}>
                         <FaEye />
                      </div>
                      <div className="flex-1 space-y-2">
                         <p className="text-sm font-black text-white italic uppercase tracking-tighter">Biometric Iris Scan</p>
                         <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Hold device to eye level and click Enroll</p>
                      </div>
                   </div>
                   {isScanning && (
                     <div className="absolute inset-x-0 h-1 bg-blue-400 shadow-[0_0_10px_blue] top-0 animate-[scan_1.5s_linear_infinite]" />
                   )}
                </div>

                <button 
                  type="submit" 
                  disabled={isScanning}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-3xl shadow-[0_20px_40px_rgba(37,99,235,0.3)] uppercase tracking-[0.3em] text-xs transition-all active:scale-95 disabled:opacity-50"
                >
                  {isScanning ? "Initializing Bio-Link..." : "Start Enrollment Engine"}
                </button>
             </form>
          </div>
        ) : (
          <div className="text-center space-y-10 animate-in fade-in zoom-in duration-1000">
             <div className="w-32 h-32 bg-green-500/10 border-4 border-green-500/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                <FaCheckCircle className="text-6xl text-green-500 animate-bounce" />
             </div>
             <div className="space-y-4">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Enrollment Success</h2>
                <div className="px-6 py-2 bg-gray-900 border border-gray-800 rounded-xl inline-flex items-center gap-3">
                   <FaDna className="text-blue-400" />
                   <span className="text-[10px] font-black text-blue-300 uppercase tracking-widest">Neural Key Registered</span>
                </div>
             </div>
             <div className="p-8 bg-black/60 rounded-3xl border border-gray-800 text-left space-y-4">
                <p className="text-[10px] text-gray-700 font-black uppercase tracking-[0.3em]">Institutional ID Card</p>
                <div className="space-y-1">
                   <p className="text-2xl font-black italic text-white">{formData.name}</p>
                   <p className="text-xs text-blue-500 font-bold uppercase tracking-widest">{formData.email}</p>
                </div>
             </div>
             <button 
               onClick={finalizeEnrollment}
               className="w-full py-6 bg-green-600 hover:bg-green-500 text-white font-black rounded-3xl shadow-[0_20px_40px_rgba(34,197,94,0.3)] uppercase tracking-[0.3em] text-xs transition-all active:scale-95"
             >
                Enter Nexus Terminal
             </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
