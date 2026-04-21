"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CoinList from "@/components/CoinList";
import TopMovers from "@/components/TopMovers";
import ProjectOfTheDay from "@/components/ProjectOfTheDay";
import MarketPulseTicker from "@/components/MarketPulseTicker";
import MarketHeatmap from "@/components/MarketHeatmap";
import { FaShieldAlt, FaTerminal, FaBroadcastTower } from "react-icons/fa";

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query) {
      router.push(`/id/${query}`);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden pb-16">
      {/* Global Price Ticker */}
      <MarketPulseTicker />
      
      {/* Background Matrix/Glow Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-12 relative z-10">
        <Header />

        <section className="flex flex-col md:flex-row justify-between items-center gap-8 py-6 border-b border-gray-900/50 pb-12">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <FaBroadcastTower className="animate-pulse" /> Live Nexus Node: Active
              </div>
              <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-[1.1] tracking-tighter italic">
                Nexus Command Center 
              </h1>
              <p className="text-gray-500 text-lg font-bold uppercase tracking-widest">
                 Decentralized Intelligence & Deep Market Analysis
              </p>
            </div>
            
            <div className="w-full md:w-[400px] bg-gray-900/40 p-6 rounded-[2rem] border border-gray-800 backdrop-blur-xl shadow-2xl space-y-4">
               <div className="flex justify-between items-center px-2">
                 <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Vault Access</p>
                 <FaShieldAlt className="text-blue-500 text-sm" />
               </div>
               <SearchBar onSearchAction={handleSearch} />
            </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           {/* Primary Content (2 columns) */}
           <div className="lg:col-span-2 space-y-12">
              <ProjectOfTheDay />
              <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
                 <MarketHeatmap />
              </div>
              <section className="bg-gray-900/20 rounded-[2.5rem] border border-gray-900 overflow-hidden shadow-2xl">
                 <CoinList />
              </section>
           </div>

           {/* Sidebar Tools (1 column) */}
           <div className="space-y-10">
              <div className="bg-[#0a0f16] p-8 rounded-[2rem] border border-blue-500/10 shadow-xl space-y-6">
                <h2 className="text-xl font-black flex items-center gap-3 tracking-tighter uppercase italic">
                   <FaTerminal className="text-blue-500" /> Pulse Analysis
                </h2>
                <div className="space-y-4">
                   <div className="p-4 rounded-xl bg-black/40 border border-gray-800 text-center">
                      <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Global Sentiment</p>
                      <p className="text-3xl font-black text-green-400 uppercase tracking-tighter italic">Optimistic</p>
                   </div>
                   <div className="p-4 rounded-xl bg-black/40 border border-gray-800 text-center">
                      <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">24h Alpha Flow</p>
                      <p className="text-3xl font-black text-blue-400 uppercase tracking-tighter italic">High</p>
                   </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10 rounded-[2.5rem] border border-gray-900 overflow-hidden shadow-2xl">
                <TopMovers />
              </div>

              <div className="p-8 bg-blue-600/5 border border-blue-500/20 rounded-[2rem] text-center space-y-4">
                 <p className="text-xs text-blue-400 font-black uppercase tracking-widest italic">Verification Status</p>
                 <p className="text-xl font-black uppercase tracking-tighter">Nexus Verified Platform</p>
                 <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] leading-relaxed">
                   Protected by multi-layer encryption and real-time biometric terminal security protocols.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
