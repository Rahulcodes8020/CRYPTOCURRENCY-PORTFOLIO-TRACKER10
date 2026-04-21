"use client";

import React, { useState, useEffect, useMemo } from "react";
import { FaRocket, FaGem, FaUnlock, FaCoins, FaCheckCircle, FaChartPie, FaLightbulb, FaExchangeAlt, FaShieldAlt, FaExternalLinkAlt, FaBrain, FaSearch, FaRobot, FaEye, FaLock, FaTerminal, FaDownload, FaMicrochip, FaGlobe, FaArrowAltCircleRight, FaFilePdf, FaUserShield } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, AreaChart, Area } from "recharts";
import axios from "axios";

type Airdrop = { id: string; name: string; symbol: string; reward: string; status: "Active" | "Ends Soon" | "Upcoming" };
type WhaleTx = { id: string; coin: string; amount: string; type: string; time: string; hash?: string; risk?: "Low" | "High" | "Medium" };
type Order = { price: string; size: string; total: string; side: "buy" | "sell" };
type AICoin = { id: string; name: string; symbol: string; current_price: number; price_change_percentage_24h: number; image: string };

export default function InvestmentHub() {
  const [stakedAmount, setStakedAmount] = useState<string>("");
  const [totalStaked, setTotalStaked] = useState<number>(3150);
  const [isStaking, setIsStaking] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showReport, setShowReport] = useState(false);

  // AI Interactive States
  const [isScanning, setIsScanning] = useState(false);
  const [aiCoins, setAICoins] = useState<AICoin[]>([]);
  const [needlePos, setNeedlePos] = useState(65); // Default rotation
  const [showAIList, setShowAIList] = useState(false);

  // Phase 2 Interaction States
  const [isWhaleModalOpen, setIsWhaleModalOpen] = useState(false);
  const [selectedWhale, setSelectedWhale] = useState<WhaleTx | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compilationLogs, setCompilationLogs] = useState<string[]>([]);
  const [securityLogs, setSecurityLogs] = useState<string[]>([]);

  // Mock Data
  const assetData = [
    { name: "Bitcoin", value: 45, color: "#F7931A" },
    { name: "Ethereum", value: 30, color: "#627EEA" },
    { name: "Solana", value: 15, color: "#14F195" },
    { name: "Others", value: 10, color: "#8884d8" },
  ];

  const pnlData = [
    { name: "Jan", pnl: 4000 }, { name: "Feb", pnl: 3000 }, { name: "Mar", pnl: 5000 },
    { name: "Apr", pnl: 4500 }, { name: "May", pnl: 6000 }, { name: "Jun", pnl: 8500 },
  ];

  const whaleTxs: WhaleTx[] = [
    { id: "w1", coin: "BTC", amount: "1,240", type: "Wallet to Exchange", time: "2m ago", hash: "0x7a2...f81e", risk: "High" },
    { id: "w2", coin: "ETH", amount: "15,000", type: "Exchange to Wallet", time: "5m ago", hash: "0x1b4...c92a", risk: "Low" },
    { id: "w3", coin: "SOL", amount: "250,000", type: "Unknown Wallet Move", time: "12m ago", hash: "0x9f5...d442", risk: "Medium" },
  ];

  // Neural Scan Logic
  const handleNeuralScan = async () => {
    setIsScanning(true);
    setShowAIList(false);
    const scanInterval = setInterval(() => setNeedlePos(Math.floor(Math.random() * 180) - 90), 100);

    try {
      const res = await axios.get("/api/proxy", { params: { url: "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10" } });
      setTimeout(() => {
        clearInterval(scanInterval);
        setAICoins(res.data);
        const avgChange = res.data.reduce((acc: number, c: any) => acc + c.price_change_percentage_24h, 0) / res.data.length;
        setNeedlePos(Math.min(90, Math.max(-90, avgChange * 10)));
        setIsScanning(false);
        setShowAIList(true);
        toast.success("Neural Scan Complete: Market Mapped!");
      }, 2000);
    } catch (e) {
      clearInterval(scanInterval);
      setIsScanning(false);
      toast.error("Nexus Core Error: Connection Unstable");
    }
  };

  const [isRebalancing, setIsRebalancing] = useState(false);
  const handleRebalance = () => {
    setIsRebalancing(true);
    toast.loading("Nexus Neural Engine: Calculating Optimal Risk-Reward...", { id: "rebalance" });
    setTimeout(() => {
      setIsRebalancing(false);
      toast.success("Portfolio Optimized! $SOL positions rebalanced into $USDT.", { id: "rebalance" });
      setTotalStaked(prev => prev + 120.45);
    }, 2000);
  };

  const handleWhaleClick = (tx: WhaleTx) => {
    setSelectedWhale(tx);
    setIsWhaleModalOpen(true);
    toast.success("Whale Nexus Link Established", { icon: "🛸" });
  };

  const handleDownloadLedger = () => {
    setIsCompiling(true);
    setCompilationLogs([]);
    const logs = [
      "[SYS] Initializing Neural Ledger Gen...",
      "[AUTH] Handshaking with Staking Hashes...",
      "[PROCESS] Compiling 256-bit Asset Ledger...",
      "[SEC] Encrypting Session PDF...",
      "[DONE] DOCUMENT_READY_FOR_LOCAL_STORAGE"
    ];

    logs.forEach((log, index) => {
      setTimeout(() => setCompilationLogs(prev => [...prev, log]), index * 600);
    });

    setTimeout(() => {
      setIsCompiling(false);
      setShowReport(false);
      toast.success("Ledger Compiled: Institutional Report Downloaded!", { icon: "📄" });
    }, 4000);
  };

  // Security Pulse Simulation
  useEffect(() => {
    const sLogs = ["Biometric Ping: OK", "Port 443: Scanned", "Nexus Firewall: Active", "Node #4120: SYNCED", "Neural Link: SECURED"];
    const interval = setInterval(() => {
      setSecurityLogs(prev => [sLogs[Math.floor(Math.random() * sLogs.length)], ...prev].slice(0, 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(Array.from({ length: 8 }, (_, i) => ({
        price: (68100 + Math.random() * 50).toFixed(2),
        size: (Math.random() * 2).toFixed(4),
        total: (Math.random() * 10).toFixed(4),
        side: i < 4 ? "sell" : "buy",
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStake = () => {
    if (!stakedAmount || parseFloat(stakedAmount) <= 0) return;
    setIsStaking(true);
    setTimeout(() => {
      setTotalStaked(prev => prev + parseFloat(stakedAmount));
      setStakedAmount("");
      setIsStaking(false);
      toast.success("Institutional Staking Authorized!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 lg:p-12 space-y-8 md:space-y-12 relative overflow-hidden">
      <Toaster position="top-right" />
      <div className="absolute inset-x-0 bottom-0 h-[600px] bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none" />

      <header className="max-w-7xl mx-auto flex flex-col xl:flex-row justify-between items-start xl:items-end gap-10 border-b border-gray-900 pb-16">
        <div className="space-y-6 flex-1">
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-md bg-blue-600/10 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest italic animate-pulse">Nexus Authorized Terminal V.9</span>
            <span className="px-3 py-1 rounded-md bg-purple-600/10 border border-purple-500/30 text-purple-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1"><FaShieldAlt /> Deep Guard Active</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-none tracking-tighter italic uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,1)]">Nexus Terminal</h1>
          <p className="text-gray-500 text-xl font-bold uppercase tracking-[0.2em] max-w-2xl border-l-4 border-blue-600 pl-6 leading-relaxed">The Ultimate Institutional Hub for Decentralized Intelligence & Asset Optimization.</p>
        </div>
        <div className="grid grid-cols-2 gap-6 w-full xl:w-auto">
          {[{ l: "Portfolio TVL", v: `$${(totalStaked * 2.8).toLocaleString()}`, c: "text-blue-400" }, { l: "Real-Time Yield", v: "+$4,120.12", c: "text-green-400" }].map((stat, i) => (
            <div key={i} className="bg-gray-900/40 p-6 rounded-[2rem] border-2 border-gray-900 text-center min-w-[180px] shadow-2xl">
              <p className="text-[11px] text-gray-500 uppercase font-black mb-1">{stat.l}</p>
              <p className={`text-2xl font-black ${stat.c} tracking-tighter italic`}>{stat.v}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-10">

        {/* Module 1: AI Forecast & Sentiment Radar */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-[#0a0f16] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-blue-500/30 shadow-2xl relative overflow-hidden h-fit group transition-all duration-700">
            <div className="absolute -top-10 -right-10 text-9xl text-blue-500/5 rotate-12 group-hover:scale-110 transition-transform"><FaBrain /></div>
            <h2 className="text-2xl font-black flex items-center gap-4 tracking-tighter uppercase mb-10 relative z-10 italic"><span className="w-2 h-8 bg-blue-500 rounded-full" />AI Intelligence</h2>
            <div className="space-y-8 md:space-y-12 text-center relative z-10">
              <div className="relative inline-block group">
                <div className="relative w-48 sm:w-64 h-24 sm:h-32 mx-auto overflow-hidden">
                  <svg viewBox="0 0 100 50" className="w-full h-full">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#1a1f26" strokeWidth="12" />
                    <path d="M 10 50 A 40 40 0 0 1 25 21" fill="none" stroke="#ef4444" strokeWidth="12" className="opacity-40" />
                    <path d="M 25 21 A 40 40 0 0 1 50 10" fill="none" stroke="#eab308" strokeWidth="12" className="opacity-40" />
                    <path d="M 50 10 A 40 40 0 0 1 90 50" fill="none" stroke="#22c55e" strokeWidth="12" className="opacity-40" />
                    {[0, 25, 50, 75, 100].map((tick, i) => {
                      const angle = (tick / 100) * 180 - 180;
                      const x1 = 50 + 34 * Math.cos((angle * Math.PI) / 180), y1 = 50 + 34 * Math.sin((angle * Math.PI) / 180), x2 = 50 + 40 * Math.cos((angle * Math.PI) / 180), y2 = 50 + 40 * Math.sin((angle * Math.PI) / 180);
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4b5563" strokeWidth="1" />;
                    })}
                  </svg>
                  <div className="absolute bottom-0 left-1/2 -ml-1 w-2 h-28 bg-gradient-to-t from-blue-600 via-blue-400 to-white origin-bottom transition-all duration-[600ms] cubic-bezier(0.34, 1.56, 0.64, 1) z-20 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" style={{ transform: `rotate(${needlePos}deg) translateY(-2px)` }}>
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 backdrop-blur-[1px] blur-[1px]" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 bg-[#0a0f16] rounded-full border-4 border-gray-800 z-30 shadow-[0_0_20px_black] flex items-center justify-center"><div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" /></div>
                </div>
                <p className={`text-2xl font-black mt-6 italic uppercase tracking-tight transition-all ${needlePos > 0 ? "text-green-400" : "text-red-400"}`}>{isScanning ? "Scanning..." : needlePos > 0 ? "Extreme Bullish" : "Extreme Fear"}</p>
              </div>
              <div className="bg-black/80 p-6 rounded-3xl border border-gray-800 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-blue-600 text-[8px] font-black uppercase">Alpha Insight</div>
                <p className="text-sm text-gray-300 leading-relaxed italic font-medium">{isScanning ? "Rerouting sensory nexus to global liquidity pools. Analyzing 5,000+ nodes in real-time." : "Neural networks detect a massive supply shock on the horizon. Institutional accumulation has increased by 420%."}</p>
              </div>
              <button onClick={handleNeuralScan} disabled={isScanning} className={`w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl ${isScanning ? "bg-blue-600 shadow-blue-500/20 cursor-wait" : "bg-gray-900 border border-gray-800 hover:border-blue-500"}`}>{isScanning ? <FaSearch className="animate-spin" /> : <FaRobot className="text-blue-500" />}{isScanning ? "Neural Scanning..." : "Authorize Neural Scan"}</button>
            </div>
            {showAIList && (
              <div className="mt-12 space-y-4 animate-in slide-in-from-top duration-700">
                <div className="flex justify-between items-center px-2"><p className="text-[10px] text-gray-600 font-black uppercase italic">Scan Results</p><p className="text-[10px] text-blue-500 font-black uppercase italic">TOP ASSETS</p></div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {aiCoins.map((coin) => (
                    <div key={coin.id} className="flex justify-between items-center bg-black/60 p-4 rounded-xl border border-gray-900 hover:border-blue-500/50 transition-all">
                      <div className="flex items-center gap-3"><img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" /><div><p className="font-black text-[11px] text-white italic tracking-tighter">{coin.name}</p><p className="text-[8px] text-gray-600 font-bold uppercase">{coin.symbol}</p></div></div>
                      <div className="text-right"><p className="font-black text-[11px] text-white italic">${coin.current_price.toLocaleString()}</p><p className={`text-[8px] font-bold ${(coin.price_change_percentage_24h ?? 0) >= 0 ? "text-green-500" : "text-red-500"}`}>{(coin.price_change_percentage_24h ?? 0).toFixed(2)}%</p></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Module 2: Analytics & Performance Dashboard */}
        <div className="xl:col-span-6 space-y-10">
          <div className="bg-gray-900/40 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-900 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Portfolio Performance</h2>
              <div className="flex gap-2">{["1D", "1W", "1M", "1Y"].map(t => <button key={t} className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all ${t === "1M" ? "bg-blue-600 text-white" : "bg-black/60 text-gray-500 hover:text-white"}`}>{t}</button>)}</div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pnlData}><defs><linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs><Area type="monotone" dataKey="pnl" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorPnl)" /><RechartsTooltip contentStyle={{ background: "#0a0f16", border: "1px solid #1e293b", borderRadius: "1rem", fontWeight: "bold" }} /></AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <div className="bg-[#0a0f16] p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-800 shadow-xl flex flex-col items-center">
              <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-6 md:mb-10 w-full text-left">Capital Allocation</h3>
              <div className="h-[220px] w-full relative">
                <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={assetData} innerRadius={70} outerRadius={95} paddingAngle={8} dataKey="value" stroke="none">{assetData.map((entry, i) => <Cell key={i} fill={entry.color} />)}</Pie><RechartsTooltip /></PieChart></ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"><p className="text-3xl font-black italic tracking-tighter leading-none">100%</p><p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">DEPLOYED</p></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600/10 to-transparent p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-blue-500/20 shadow-xl space-y-6">
              <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Neural Rebalancer</h3>
              <div className="space-y-6"><div className="flex justify-between items-center bg-black/60 p-4 rounded-2xl border border-gray-800"><span className="text-xs font-bold text-gray-500 uppercase">Risk Level</span><span className="px-3 py-1 bg-green-500/20 text-green-400 text-[10px] font-black rounded-lg uppercase tracking-widest">Optimized</span></div><p className="text-xs text-gray-300 italic leading-relaxed">"Your current exposure to $SOL is high. Rebalancing 5% into $USDT is suggested to maintain an institutional risk-reward ratio."</p><button onClick={handleRebalance} disabled={isRebalancing} className={`w-full py-4 rounded-2xl shadow-lg transition-all text-[10px] uppercase tracking-widest active:scale-95 shadow-[0_10px_20px_rgba(37,99,235,0.3)] ${isRebalancing ? "bg-blue-800 cursor-wait animate-pulse" : "bg-blue-600 hover:bg-blue-500"}`}>{isRebalancing ? "Optimizing Neural Pathways..." : "Apply Smart Rebalance"}</button></div>
            </div>
          </div>
        </div>

        {/* Module 3: Advanced Order Book & Whale Monitor */}
        <div className="xl:col-span-3 space-y-10">
          <div className="bg-[#0a0f16] p-8 rounded-[3rem] border border-gray-900 h-full relative overflow-hidden">
            <h2 className="text-xl font-black flex items-center gap-3 tracking-tighter uppercase mb-6 italic"><span className="w-1.5 h-6 bg-red-600 rounded-full animate-pulse" />Level 2 Book</h2>
            <div className="space-y-2 font-mono text-[9px] uppercase font-bold tracking-tight">
              <div className="grid grid-cols-3 text-gray-600 border-b border-gray-900 pb-2 mb-4"><span>Price(USDT)</span><span className="text-center">Size(BTC)</span><span className="text-right">Total</span></div>
              <div className="space-y-1">{orders.map((o, i) => (<div key={i} className="grid grid-cols-3 group relative cursor-pointer hover:bg-gray-800 transition-colors"><span className={o.side === "sell" ? "text-red-500" : "text-green-500"}>{o.price}</span><span className="text-center text-gray-400">{o.size}</span><span className="text-right text-gray-500">{o.total}</span><div className={`absolute inset-0 opacity-10 pointer-events-none ${o.side === "sell" ? "bg-red-500" : "bg-green-500"} transition-all`} style={{ width: `${parseFloat(o.total) * 10}%`, marginLeft: o.side === "buy" ? "auto" : "0" }} /></div>))}</div>
              <div className="pt-8 space-y-6 border-t border-gray-900 mt-6">
                <h2 className="text-xl font-black flex items-center gap-3 tracking-tighter uppercase italic pt-6"><FaExchangeAlt className="text-blue-400" /> Whale Pulse</h2>
                <div className="space-y-4 max-h-[400px] overflow-hidden group">
                  <div className="animate-[marquee-y_25s_linear_infinite] space-y-4 group-hover:[animation-play-state:paused]">
                    {whaleTxs.map((tx) => (
                      <div key={tx.id} onClick={() => handleWhaleClick(tx)} className="p-4 rounded-xl bg-black/40 border border-gray-800 space-y-2 group/card hover:border-blue-500/50 transition-all cursor-pointer">
                        <div className="flex justify-between items-center"><p className="font-black text-[10px] text-blue-400 italic">🚨 WHALE ALERT</p><p className="text-[8px] text-gray-600 font-bold uppercase">{tx.time}</p></div>
                        <p className="font-black text-sm text-white italic tracking-tighter">{tx.amount} {tx.coin}</p>
                        <div className="flex justify-between items-center"><p className="text-[8px] text-gray-500 font-bold uppercase">{tx.type}</p><FaArrowAltCircleRight className="text-blue-500 opacity-0 group-hover/card:opacity-100 transition-opacity" /></div>
                      </div>
                    ))}
                    {whaleTxs.map((tx) => (
                      <div key={tx.id + "_dup"} onClick={() => handleWhaleClick(tx)} className="p-4 rounded-xl bg-black/40 border border-gray-800 space-y-2 opacity-50"><p className="font-black text-[10px] text-blue-400 italic uppercase">🚨 WHALE ALERT</p><p className="font-black text-sm text-white italic tracking-tighter">{tx.amount} {tx.coin}</p></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Audit Footer */}
      <footer className="max-w-7xl mx-auto border-t border-gray-900 pt-8 mt-12 flex justify-between items-center">
        <div className="flex gap-8 overflow-hidden h-6 items-center">
          <FaTerminal className="text-gray-700 animate-pulse" />
          <div className="flex gap-10 whitespace-nowrap">
            {securityLogs.map((log, i) => (
              <span key={i} className="text-[8px] font-black text-gray-600 uppercase tracking-widest animate-in slide-in-from-right flex items-center gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full" /> {log}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4 text-[8px] font-black text-gray-700 uppercase tracking-widest"><span>SHA-256 SECURED</span><span>•</span><span>NODE: AUTHORIZED</span></div>
      </footer>

      {/* Whale Explorer Modal */}
      {isWhaleModalOpen && selectedWhale && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="bg-[#0a0f16] w-full max-w-xl rounded-[3rem] border-2 border-blue-500/30 p-12 relative shadow-[0_0_80px_rgba(59,130,246,0.2)]">
            <button onClick={() => setIsWhaleModalOpen(false)} className="absolute top-8 right-10 text-gray-600 hover:text-white text-2xl font-black">×</button>
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-gray-800 pb-8">
                <div><h3 className="text-3xl font-black italic tracking-tighter uppercase text-blue-400">Whale Nexus</h3><p className="text-[9px] text-gray-600 font-bold uppercase mt-1">On-Chain Tracer Activity</p></div>
                <div className={`px-4 py-2 rounded-lg border font-black text-[10px] uppercase ${selectedWhale.risk === "Low" ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>{selectedWhale.risk} Risk</div>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm italic font-medium">
                <div className="space-y-4"><p className="text-gray-500 text-[10px] font-black uppercase">Source Node</p><p className="bg-black/80 p-3 rounded-xl border border-gray-800 font-mono text-[10px] text-blue-300">{selectedWhale.hash}</p></div>
                <div className="space-y-4"><p className="text-gray-500 text-[10px] font-black uppercase">Asset Volume</p><p className="text-xl font-black text-white">{selectedWhale.amount} {selectedWhale.coin}</p></div>
              </div>
              <div className="space-y-4"><p className="text-gray-500 text-[10px] font-black uppercase">Analysis Scan</p><div className="bg-black p-4 rounded-xl border border-gray-900 space-y-2 font-mono text-[9px]"><p className="text-green-500">[STATUS] Wallet Identified as "Tier 1 Whale"</p><p className="text-gray-600">[METRIC] Liquidity Impact: High</p><p className="text-gray-600">[ACTION] Link established via Nexus Node.</p></div></div>
              <button onClick={() => { toast.success("Wallet Link Active: Tracking established."); setIsWhaleModalOpen(false); }} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 flex items-center justify-center gap-3"><FaGlobe /> Establish Asset Tracer</button>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Staking Module */}
      <div className="max-w-7xl mx-auto pt-10">
        <div className="bg-gradient-to-br from-[#0a0f16] via-blue-900/10 to-[#0a0f16] p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-blue-500/20 shadow-2xl flex flex-col xl:flex-row items-center gap-10 md:gap-16 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
          <div className="flex-1 space-y-8 text-center xl:text-left relative z-10">
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Nexus Liquid Staking</h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl">Maximize your capital efficiency. Institutional-grade yield optimization with zero-day maturity options.</p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <div className="flex-1 relative group"><span className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500 font-black text-xl">$</span><input type="number" value={stakedAmount} onChange={(e) => setStakedAmount(e.target.value)} placeholder="0.00" className="w-full bg-black/80 border-2 border-gray-900 rounded-[1.5rem] px-10 py-5 md:py-6 text-2xl md:text-3xl font-black shadow-inner focus:outline-none focus:border-blue-500 transition-all placeholder:text-gray-900" /></div>
              <button onClick={handleStake} disabled={isStaking} className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 md:px-12 py-5 md:py-6 rounded-[1.5rem] shadow-[0_20px_40px_rgba(37,99,235,0.4)] transition-all active:scale-95 disabled:opacity-50 uppercase tracking-[0.2em] text-[10px] md:text-sm flex items-center justify-center gap-4 group">{isStaking ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaCoins className="group-hover:animate-bounce" />}{isStaking ? "Authorizing Stake..." : "Authorize Execution"}</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full xl:w-auto relative z-10">
            {[{ l: "Active Collateral", v: `$${totalStaked.toLocaleString()}`, c: "text-white" }, { l: "Expected APY", v: "14.2%", c: "text-blue-400" }, { l: "Simulated Yield", v: `$${(totalStaked * 0.142).toFixed(2)}/yr`, c: "text-green-500" }, { l: "Nexus Credits", v: "3,142 XP", c: "text-purple-400" }].map((s, i) => (
              <div key={i} className="bg-black/60 p-8 rounded-[2.5rem] border border-gray-800 text-center min-w-[200px] shadow-2xl group hover:border-blue-500/30 transition-all"><p className="text-[10px] text-gray-600 uppercase font-black mb-3 tracking-[0.3em]">{s.l}</p><p className={`text-2xl font-black ${s.c} italic tracking-tighter`}>{s.v}</p></div>
            ))}
            <button onClick={() => { setShowReport(true); setCompilationLogs([]); }} className="sm:col-span-2 py-4 bg-gray-900 rounded-2xl border border-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:border-gray-600 transition-all">View Institutional Asset Report</button>
          </div>
        </div>
      </div>

      {/* Institutional Report Modal with Neural Compilation */}
      {showReport && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="bg-[#0d1117] w-full max-w-2xl rounded-[3rem] border-2 border-gray-800 p-12 relative shadow-[0_0_100px_rgba(59,130,246,0.3)]">
            <button onClick={() => setShowReport(false)} className="absolute top-8 right-10 text-gray-600 hover:text-white transition-colors text-2xl font-black">×</button>
            <div className="space-y-8">
              <div className="flex justify-between items-center border-b border-gray-900 pb-8">
                <div><h3 className="text-3xl font-black italic tracking-tighter uppercase text-blue-500">Institutional Report</h3><p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-1">Nexus Ledger • Non-Custodial Verification</p></div>
                <div className="bg-green-600/10 px-4 py-2 rounded-lg border border-green-500/50 text-[10px] text-green-400 font-black uppercase">Verified</div>
              </div>

              {!isCompiling ? (
                <div className="space-y-10 animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-4"><p className="text-gray-500 text-[10px] font-black uppercase">Capital Statistics</p><div className="space-y-2"><div className="flex justify-between font-bold text-sm"><span className="text-gray-400">Net Worth:</span> <span>${(totalStaked * 2.8).toLocaleString()}</span></div><div className="flex justify-between font-bold text-sm"><span className="text-gray-400">Active Yield:</span> <span className="text-green-500">+14.2%</span></div></div></div>
                    <div className="space-y-4"><p className="text-gray-500 text-[10px] font-black uppercase">Security Audit</p><div className="space-y-2"><div className="flex justify-between font-bold text-sm"><span className="text-gray-400">Node Status:</span> <span className="text-blue-400">AUTHORIZED</span></div><div className="flex justify-between font-bold text-sm"><span className="text-gray-400">G-Hash:</span> <span className="text-blue-400">MATCH</span></div></div></div>
                  </div>
                  <button onClick={handleDownloadLedger} className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl active:scale-95 flex items-center justify-center gap-4"><FaFilePdf /> Generate Secure PDF Ledger</button>
                </div>
              ) : (
                <div className="space-y-8 animate-in zoom-in duration-500">
                  <div className="bg-black/80 rounded-2xl border border-gray-900 p-8 font-mono text-[9px] min-h-[150px] space-y-2">
                    {compilationLogs.map((log, i) => <div key={i} className="flex gap-2"><span className="text-blue-500">nexus@gen:~$</span><span className={log.includes("OK") || log.includes("DONE") ? "text-green-400 font-black" : "text-gray-400"}>{log}</span></div>)}
                    <div className="w-2 h-4 bg-blue-500 animate-pulse ml-2 inline-block" />
                  </div>
                  <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden"><div className="h-full bg-blue-600 shadow-[0_0_15px_blue] animate-[progress_4s_linear_infinite]" style={{ width: "100%" }} /></div>
                  <p className="text-center text-[10px] font-black text-gray-500 uppercase tracking-widest animate-pulse">Compiling Neural Data Assets...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes marquee-y { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
        @keyframes progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
}
