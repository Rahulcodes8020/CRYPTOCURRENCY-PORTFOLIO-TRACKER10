"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MarketPulseTicker() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/coingecko", {
          params: { 
            path: "/coins/markets",
            vs_currency: "usd", 
            order: "market_cap_desc", 
            per_page: 20 
          }
        });
        setData(res.data);
      } catch (e) {
        console.error("Ticker fetch error:", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full bg-blue-600/10 border-y border-blue-500/20 py-2 overflow-hidden whitespace-nowrap sticky top-0 z-[100] backdrop-blur-md">
      <div className="inline-block animate-[ticker_40s_linear_infinite] hover:pause-animation">
        {data.map((coin, i) => (
          <span key={`${coin.id}-${i}`} className="inline-flex items-center gap-2 px-6 border-r border-gray-800 last:border-none">
            <img src={coin.image} alt={coin.name} className="w-4 h-4 rounded-full" />
            <span className="text-[10px] font-black uppercase text-gray-400">{coin.symbol}</span>
            <span className="text-xs font-black text-white">${coin.current_price.toLocaleString()}</span>
            <span className={`text-[10px] font-bold ${(coin.price_change_percentage_24h ?? 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
              {(coin.price_change_percentage_24h ?? 0) >= 0 ? "▲" : "▼"} {Math.abs(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
            </span>
          </span>
        ))}
        {/* Duplicate for infinite effect */}
        {data.map((coin, i) => (
          <span key={`${coin.id}-${i}-dup`} className="inline-flex items-center gap-2 px-6 border-r border-gray-800 last:border-none">
            <img src={coin.image} alt={coin.name} className="w-4 h-4 rounded-full" />
            <span className="text-[10px] font-black uppercase text-gray-400">{coin.symbol}</span>
            <span className="text-xs font-black text-white">${coin.current_price.toLocaleString()}</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
