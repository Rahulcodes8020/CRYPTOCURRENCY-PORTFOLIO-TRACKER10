"use client";
import Link from "next/link";
import {
  FaTwitter,
  FaDiscord,
  FaGithub,
  FaTelegramPlane,
  FaGlobe,
  FaShieldAlt,
  FaBolt,
  FaNetworkWired
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-gray-900 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 mb-16 text-center lg:text-left">
          {/* Brand Section */}
          <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left pr-0 lg:pr-4">
            <Link href="/" className="flex items-center gap-2 group justify-center lg:justify-start">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                <FaShieldAlt className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-black tracking-tighter">
                CRYPTO <span className="text-blue-500">WATCH</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
              The ultimate institutional-grade terminal for tracking digital assets.
              Real-time analytics, portfolio management, and market insights at your fingertips.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start pt-2">
              <a href="https://twitter.com/CoinMarketCap" target="_blank" className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg active:scale-90">
                <FaTwitter />
              </a>
              <a href="https://discord.gg/CoinMarketCap" target="_blank" className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg active:scale-90">
                <FaDiscord />
              </a>
              <a href="https://github.com/coinmarketcap" target="_blank" className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg active:scale-90">
                <FaGithub />
              </a>
              <a href="https://t.me/CoinMarketCap" target="_blank" className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all hover:-translate-y-1 shadow-lg active:scale-90">
                <FaTelegramPlane />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:border-l lg:border-gray-900 lg:pl-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-8">Navigation</h3>
            <ul className="space-y-4 text-xs">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group justify-center lg:justify-start"><span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-blue-500 transition-colors" /> Home</Link></li>
              <li><Link href="/market-insight" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group justify-center lg:justify-start"><span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-blue-500 transition-colors" /> Market Overview</Link></li>
              <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group justify-center lg:justify-start"><span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-blue-500 transition-colors" /> Asset Portfolio</Link></li>
              <li><Link href="/watchlist" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group justify-center lg:justify-start"><span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-blue-500 transition-colors" /> Watchlist</Link></li>
              <li><Link href="/live" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group justify-center lg:justify-start"><span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-blue-500 transition-colors" /> Live Terminal</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:border-l lg:border-gray-900 lg:pl-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-8">Resources</h3>
            <ul className="space-y-4 text-xs">
              <li><a href="https://coinmarketcap.com/headlines/news/" target="_blank" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group justify-center lg:justify-start"><span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-blue-500 transition-colors" /> Nexus Academy</a></li>
              <li><a href="https://coinmarketcap.com/api/" target="_blank" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group justify-center lg:justify-start"><span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-blue-500 transition-colors" /> API Protocol</a></li>
              <li><a href="https://coinmarketcap.com/methodology/" target="_blank" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group justify-center lg:justify-start"><span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-blue-500 transition-colors" /> Market Clarity</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors font-medium flex items-center gap-2 group justify-center lg:justify-start"><span className="w-1 h-1 rounded-full bg-gray-800 group-hover:bg-blue-500 transition-colors" /> Privacy Nodes</a></li>
            </ul>
          </div>

          {/* Architect Section */}
          <div className="space-y-6 flex flex-col items-center lg:items-start text-center lg:text-left lg:border-l lg:border-gray-900 lg:pl-8">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">System Architect</h3>
            <div className="p-4 bg-gray-900/50 border border-gray-800 rounded-2xl space-y-4 w-full max-w-[280px] mx-auto lg:mx-0 shadow-xl shadow-blue-500/5">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                 <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                    <FaShieldAlt />
                 </div>
                 <div className="text-left">
                    <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest leading-none mb-1">Lead Dev</p>
                    <p className="text-sm font-bold text-white capitalize leading-tight">Rahul Sharma</p>
                 </div>
              </div>
              <div className="pt-4 border-t border-gray-800 space-y-2">
                 <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none opacity-50">Auth Comm</p>
                 <a href="https://wa.me/916375390312" target="_blank" className="flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-green-400 transition-all group justify-center lg:justify-start">
                    <div className="w-2 h-2 rounded-full bg-green-500 group-hover:animate-ping shadow-[0_0_8px_green]" />
                    +91 6375390312
                 </a>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-600/5 border border-blue-500/10 rounded-xl w-full max-w-[280px] mx-auto lg:mx-0 justify-center lg:justify-start">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-400/60">System Link: Stable</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-4 md:gap-8 items-center text-[10px] font-bold uppercase tracking-widest text-gray-600">
            <p>
              © {currentYear} NEXUS PROTOCOL. RELAY-302-ALPHA
            </p>
            <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-8 justify-center md:justify-start w-full md:w-auto">
                <div className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors cursor-help">
                  <FaNetworkWired size={10} />
                  <span>Latency: 24ms</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors cursor-help">
                  <FaGlobe size={10} />
                  <span>Nodes: 1,402 Online</span>
                </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto justify-center md:justify-end">
             <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-[9px] font-black uppercase text-gray-400 hover:text-white hover:border-gray-700 transition-all w-full sm:w-auto justify-center">
                <FaBolt className="text-yellow-500" /> System Report
             </button>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-[10px] font-black text-white italic">v2.4.0-nexus</span>
             </div>
          </div>
        </div>

      </div>
    </footer>
  );
}