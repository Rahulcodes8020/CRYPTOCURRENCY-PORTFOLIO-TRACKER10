"use client";

import { Search, ChevronDown, Filter } from "lucide-react";

interface FiltersProps {
  search: string;
  onSearchChangeAction: (s: string) => void;
  blockchain: string;
  onBlockchainChangeAction: (b: string) => void;
  status: string;
  onStatusChangeAction: (s: string) => void;
  category: string;
  onCategoryChangeAction: (c: string) => void;
}

export default function ICOFilters({
  search,
  onSearchChangeAction,
  blockchain,
  onBlockchainChangeAction,
  status,
  onStatusChangeAction,
  category,
  onCategoryChangeAction,
}: FiltersProps) {
  const blockchains = ["All Blockchains", "Ethereum", "Solana", "BSC", "Bitcoin Eco", "Polygon"];
  const statuses = ["All Statuses", "Upcoming", "Active", "Ended"];
  const categories = ["All Categories", "DeFi", "GameFi", "AI", "L1 / L2", "Infrastructure"];

  return (
    <div className="flex flex-col xl:flex-row gap-6 mb-12 items-center bg-[#0d1117]/80 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
      {/* Search Input */}
      <div className="relative w-full xl:w-[400px] group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Filter by project symbol..."
          value={search}
          onChange={(e) => onSearchChangeAction(e.target.value)}
          className="w-full bg-[#161b22] border-2 border-gray-800 text-white rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 placeholder-gray-700 transition-all font-bold text-sm tracking-tight"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 rounded-md border border-gray-800 text-[8px] font-black text-gray-500 uppercase tracking-widest hidden md:block">
          CMD + K
        </div>
      </div>

      {/* Select Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full xl:flex-1">
        {[ 
          { label: "Network", value: blockchain, options: blockchains, handler: onBlockchainChangeAction, color: "text-purple-400" },
          { label: "Phase", value: status, options: statuses, handler: onStatusChangeAction, color: "text-green-400" },
          { label: "Sector", value: category, options: categories, handler: onCategoryChangeAction, color: "text-pink-400" }
        ].map((filter, i) => (
          <div key={i} className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-40 group-hover:opacity-100 transition-opacity">
               <Filter className={`w-3.5 h-3.5 ${filter.color}`} />
            </div>
            <select
              value={filter.value}
              onChange={(e) => filter.handler(e.target.value)}
              className="w-full bg-[#161b22] border-2 border-gray-800 text-white rounded-2xl py-4 pl-12 pr-10 focus:outline-none focus:border-blue-500/30 cursor-pointer appearance-none hover:bg-gray-800/50 transition-all font-black text-[11px] uppercase tracking-[0.15em] italic"
            >
              {filter.options.map((opt) => (
                <option key={opt} value={opt} className="bg-black text-white">{opt}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Quick Reset / Summary Label */}
      <div className="flex xl:flex-col items-center xl:items-end gap-2 px-4">
         <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Detection Engine</span>
         <span className="px-3 py-1 bg-blue-600/10 border border-blue-500/30 text-blue-400 text-[10px] font-black rounded-lg uppercase tracking-widest italic animate-pulse">Running</span>
      </div>
    </div>
  );
}
