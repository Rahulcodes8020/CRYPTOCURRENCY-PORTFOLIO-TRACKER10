"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import RobotAI from "@/components/RobotAI";

// Dynamically import TradingView to avoid SSR issues
const AdvancedRealTimeChart = dynamic(
  () => import("react-ts-tradingview-widgets").then((mod) => mod.AdvancedRealTimeChart),
  { ssr: false }
);

export default function CoinChartPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [showAI, setShowAI] = useState(false);
  const [coinDescription, setCoinDescription] = useState("");
  const [coinSymbol, setCoinSymbol] = useState("BTC");

  useEffect(() => {
    async function fetchCoinData() {
      try {
        const res = await fetch(`/api/coingecko?path=/coins/${id}&localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        setCoinDescription(data.description?.en || "Launch details unavailable for this asset.");
        setCoinSymbol(data.symbol?.toUpperCase() || "BTC");
        setLoading(false);
      } catch (e: any) {
        console.error("Error fetching coin data:", e.message);
        setLoading(false);
      }
    }

    if (id) {
      fetchCoinData();
    }
  }, [id]);

  return (
    <div className="p-6 min-h-screen bg-black text-white relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex flex-col">
          <h1 className="text-4xl font-black capitalize tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent italic">
            {id} Market Pulse
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
            Real-Time Advanced Trading Data
          </p>
        </div>
        
        <button
          onClick={() => setShowAI(true)}
          className="flex items-center gap-3 px-8 py-4 bg-blue-600/10 border border-blue-500/50 rounded-2xl hover:bg-blue-600/30 transition-all font-black shadow-[0_0_25px_rgba(59,130,246,0.2)] group hover:scale-105 active:scale-95"
        >
          <div className="w-3 h-3 bg-blue-400 rounded-full group-hover:animate-ping" />
          <span className="uppercase tracking-[0.2em] text-xs">AI Summary</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center h-[600px] border-2 border-dashed border-gray-800 rounded-[3rem] bg-gray-900/10 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6" />
          <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">Initializing Pro-Terminal UI...</p>
        </div>
      ) : (
        <div className="bg-[#0d1117] rounded-[2.5rem] border border-gray-800 shadow-[0_50px_100px_rgba(0,0,0,0.7)] overflow-hidden h-[750px] relative">
          <AdvancedRealTimeChart
            theme="dark"
            symbol={`BINANCE:${coinSymbol}USDT`}
            autosize
            interval="D"
            timezone="Etc/UTC"
            style="1"
            locale="en"
            toolbar_bg="#0d1117"
            enable_publishing={false}
            allow_symbol_change={true}
            container_id="tradingview_advanced"
            hide_side_toolbar={false}
            details={true}
            hotlist={true}
            calendar={true}
            show_popup_button={true}
            popup_width="1000"
            popup_height="650"
          />
        </div>
      )}

      {/* Robot AI Assistant Overlay */}
      {showAI && (
        <RobotAI 
          description={coinDescription} 
          onCloseAction={() => setShowAI(false)} 
        />
      )}
    </div>
  );
}
