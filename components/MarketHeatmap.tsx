"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MarketHeatmap() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/coingecko", {
          params: { 
            path: "/coins/markets",
            vs_currency: "usd", 
            order: "market_cap_desc", 
            per_page: 12 
          }
        });
        setData(res.data);
      } catch (e) {
        console.error("Heatmap fetch error:", e);
      }
    };
    fetchData();
  }, []);

  const getHeatmapColor = (change: number) => {
    if (change > 5) return "bg-green-600/60 border-green-400/50 text-white";
    if (change > 0) return "bg-green-900/60 border-green-500/30 text-green-200";
    if (change > -5) return "bg-red-900/60 border-red-500/30 text-red-200";
    return "bg-red-600/60 border-red-400/50 text-white";
  };

  return (
    <div className="bg-[#0a0f16] p-8 rounded-[2rem] border border-gray-800 shadow-xl space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
          Market Heat Radar
        </h2>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">24H PERFORMANCE</span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((coin) => (
          <div 
            key={coin.id} 
            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all hover:scale-105 hover:z-10 shadow-lg ${getHeatmapColor(coin.price_change_percentage_24h)}`}
          >
            <span className="text-[10px] font-black uppercase tracking-tighter opacity-70 italic">{coin.symbol}</span>
            <span className="text-xl font-black italic tracking-tighter">{(coin.price_change_percentage_24h ?? 0).toFixed(1)}%</span>
            <span className="text-[8px] font-bold uppercase tracking-widest opacity-40 italic">Vol: {((coin.total_volume ?? 0) / 1000000).toFixed(0)}M</span>
          </div>
        ))}
      </div>
    </div>
  );
}
