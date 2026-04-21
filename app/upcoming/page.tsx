"use client";

import { useState, useMemo } from "react";
import { upcomingProjects } from "@/lib/upcomingData";
import UpcomingTable from "@/components/UpcomingTable";
import ICOFilters from "@/components/ICOFilters";
import Header from "@/components/Header";
import { Info, Sparkles } from "lucide-react";

export default function UpcomingPage() {
  const [search, setSearch] = useState("");
  const [blockchain, setBlockchain] = useState("All Blockchains");
  const [status, setStatus] = useState("All Statuses");
  const [category, setCategory] = useState("All Categories");

  const filteredProjects = useMemo(() => {
    return upcomingProjects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.symbol.toLowerCase().includes(search.toLowerCase());
      const matchesBlockchain =
        blockchain === "All Blockchains" || p.blockchain === blockchain;
      const matchesStatus = status === "All Statuses" || p.status === status;
      const matchesCategory =
        category === "All Categories" || p.category === category;

      return matchesSearch && matchesBlockchain && matchesStatus && matchesCategory;
    });
  }, [search, blockchain, status, category]);

  return (
    <main className="min-h-screen bg-black text-white p-4 md:p-8 space-y-16">
      <Header />
      
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center md:text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <Sparkles className="w-3.5 h-3.5" />
            Nexus AI Engine: Multi-Chain Launchpad Tracker
          </div>
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-[1.1] tracking-tighter">
            Next-Gen Launches
          </h1>
          <p className="text-gray-500 text-xl max-w-3xl leading-relaxed font-medium">
            Access elite crypto projects before they go public. Track white-lists, IDOs, and live sales with real-time countdowns across 10+ networks.
          </p>
        </header>

        {/* Featured Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
            <Info className="w-3.5 h-3.5" />
            Elite Community Picks
          </div>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingProjects.slice(0, 3).map((p) => (
              <div key={`featured-${p.id}`} className="relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#161b22] to-black border border-gray-800/50 p-8 hover:border-blue-500/50 transition-all cursor-pointer shadow-2xl">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity">
                  <span className="text-5xl font-black italic">TOP</span>
                </div>
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-2xl border-2 border-gray-700/50 p-2 bg-black/40 group-hover:scale-110 transition-transform" />
                    <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-blue-500 rounded-full border-2 border-black animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black group-hover:text-blue-400 transition-colors uppercase tracking-tight">{p.name}</h3>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{p.blockchain}</p>
                  </div>
                </div>
                <div className="flex justify-between items-end border-t border-gray-800/50 pt-6">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-black mb-2 tracking-widest">Funding Hardcap</p>
                    <p className="text-3xl font-black text-white tracking-tighter">{p.goal}</p>
                  </div>
                  <div className="px-5 py-2.5 rounded-2xl bg-blue-600 text-white text-xs font-black uppercase tracking-widest group-hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
                    Alpha
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 w-0 group-hover:w-full transition-all duration-700"></div>
              </div>
            ))}
          </section>
        </div>

        <div className="pt-8 space-y-6">
          <ICOFilters
            search={search}
            onSearchChangeAction={setSearch}
            blockchain={blockchain}
            onBlockchainChangeAction={setBlockchain}
            status={status}
            onStatusChangeAction={setStatus}
            category={category}
            onCategoryChangeAction={setCategory}
          />

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between px-4 gap-4">
              <h2 className="text-2xl font-black flex items-center gap-3 tracking-tighter">
                <span className="w-1.5 h-8 bg-blue-500 rounded-full"></span>
                Launch Discovery Engine
              </h2>
              <div className="px-4 py-1.5 bg-gray-900 border border-gray-800 rounded-full text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Real-Time Tracking: {filteredProjects.length} Targets
              </div>
            </div>
            <UpcomingTable projects={filteredProjects} />
          </div>
        </div>
      </div>
    </main>
  );
}
