"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, TrendingUp, TrendingDown, Activity } from "lucide-react";

export default function AIMarketInsights() {
  const [insightText, setInsightText] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(true);
  const [marketSentiment, setMarketSentiment] = useState<"bullish" | "bearish" | "neutral">("neutral");

  useEffect(() => {
    async function analyzeMarket() {
      try {
        setLoading(true);
        // Fetch top 50 coins to analyze market breadth and top movers
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 50,
            page: 1,
            sparkline: false
          }
        });

        const coins = res.data;
        if (!coins || coins.length === 0) return;

        const btc = coins.find((c: any) => c.symbol === "btc");
        const btcChange = btc?.price_change_percentage_24h || 0;
        
        // Find top gainer
        const topGainer = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)[0];

        // Overall breadth (how many coins are up vs down)
        const advancers = coins.filter((c: any) => c.price_change_percentage_24h > 0).length;
        const marketBreadth = advancers / coins.length;

        let sentiment: "bullish" | "bearish" | "neutral" = "neutral";
        let analysis = "";

        if (marketBreadth > 0.6 && btcChange > 1) {
          sentiment = "bullish";
          analysis = `The market is currently showing strong bullish momentum driven by broad-based accumulation. Bitcoin is up ${btcChange.toFixed(2)}%, providing a strong tailwind for altcoins. Noticeably, ${topGainer.name} (${topGainer.symbol.toUpperCase()}) is leading the market today with an impressive +${topGainer.price_change_percentage_24h.toFixed(2)}% surge in the last 24 hours.`;
        } else if (marketBreadth < 0.4 && btcChange < -1) {
          sentiment = "bearish";
          analysis = `Caution is advised as bearish pressure dominates the market today. Bitcoin has retraced ${btcChange.toFixed(2)}%, leading to a broader market sell-off where only ${Math.round(marketBreadth * 100)}% of top assets are trading higher. Despite the downturn, ${topGainer.name} is showing relative strength, gaining ${topGainer.price_change_percentage_24h.toFixed(2)}%.`;
        } else {
          sentiment = "neutral";
          analysis = `The cryptocurrency market is currently in a consolidation phase with mixed signals. Bitcoin is trading relatively flat at ${btcChange.toFixed(2)}% over the last 24 hours. Volatility is concentrated in specific mid-cap alts, highlighted by ${topGainer.name}'s breakout move of +${topGainer.price_change_percentage_24h.toFixed(2)}%.`;
        }

        setMarketSentiment(sentiment);
        setInsightText(analysis);
        setLoading(false);
      } catch (e) {
        console.error("Failed to generate AI insight", e);
        setInsightText("Market data is temporarily unavailable. Unable to generate AI insights at this moment.");
        setLoading(false);
      }
    }

    analyzeMarket();
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!insightText || loading) return;

    let index = 0;
    setDisplayedText("");
    
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + insightText.charAt(index));
      index++;
      if (index >= insightText.length) {
        clearInterval(interval);
      }
    }, 20); // ms per character

    return () => clearInterval(interval);
  }, [insightText, loading]);


  const getSentimentColor = () => {
    if (marketSentiment === "bullish") return "text-green-400 border-green-500/50 shadow-[0_0_15px_rgba(74,222,128,0.2)]";
    if (marketSentiment === "bearish") return "text-red-400 border-red-500/50 shadow-[0_0_15px_rgba(248,113,113,0.2)]";
    return "text-blue-400 border-blue-500/50 shadow-[0_0_15px_rgba(96,165,250,0.2)]";
  };

  const getSentimentIcon = () => {
    if (marketSentiment === "bullish") return <TrendingUp className="w-5 h-5 text-green-400" />;
    if (marketSentiment === "bearish") return <TrendingDown className="w-5 h-5 text-red-400" />;
    return <Activity className="w-5 h-5 text-blue-400" />;
  };

  return (
    <div className={`col-span-full relative overflow-hidden bg-[#0d1117] rounded-xl p-6 border backdrop-blur-md transition-all duration-500 ${getSentimentColor()}`}>
      
      {/* Animated background gradient */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className={`absolute -top-24 -left-24 w-64 h-64 rounded-full blur-[80px] ${marketSentiment === 'bullish' ? 'bg-green-500' : marketSentiment === 'bearish' ? 'bg-red-500' : 'bg-blue-500'} animate-pulse`}></div>
        <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[80px] ${marketSentiment === 'bullish' ? 'bg-green-500' : marketSentiment === 'bearish' ? 'bg-red-500' : 'bg-blue-500'} animate-pulse delay-700`}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Nexus AI Market Briefing
          </h2>
          <div className="ml-auto flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-gray-700">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Sentiment:</span>
            {getSentimentIcon()}
            <span className="text-sm font-bold capitalize">{marketSentiment}</span>
          </div>
        </div>
        
        <div className="min-h-[80px]">
          {loading ? (
            <div className="flex gap-2 items-center text-gray-400">
              <Activity className="w-5 h-5 animate-spin" />
              <p className="animate-pulse">Analyzing global market liquidity and sentiment...</p>
            </div>
          ) : (
            <p className="text-gray-300 leading-relaxed text-lg font-medium">
              {displayedText}
              {displayedText.length < insightText.length && (
                <span className="inline-block w-2 h-5 ml-1 bg-purple-500 animate-pulse"></span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
