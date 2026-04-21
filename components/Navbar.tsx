"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { FaUserSecret, FaSignOutAlt, FaUserPlus, FaLock, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import ProductsMenu from "./ProductsMenu";

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState("");
  const [showProducts, setShowProducts] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setShowProducts(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setShowProducts(false);
    }, 200); // 200ms buffer to cross the gap
  };

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem("nexus_auth");
      const nexusUser = localStorage.getItem("nexus_user");
      if (auth === "true") {
        setIsAuth(true);
        setUser(nexusUser || "Nexus Node");
      } else {
        setIsAuth(false);
      }
    };
    checkAuth();
    window.addEventListener("storage", checkAuth);
    const interval = setInterval(checkAuth, 2000);
    return () => {
      window.removeEventListener("storage", checkAuth);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("nexus_auth");
    localStorage.removeItem("nexus_user");
    setIsAuth(false);
    window.location.href = "/";
  };

  // Close products menu on click outside
  useEffect(() => {
    if (!showProducts) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".products-menu-container")) {
        setShowProducts(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProducts]);

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow border-b border-gray-900 sticky top-0 z-[200] backdrop-blur-md bg-black/80">
      <div className="flex items-center gap-4">
         <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-xl text-gray-400 hover:text-white transition-colors">
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
         </button>
         <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isAuth ? 'bg-green-500 animate-pulse shadow-[0_0_10px_green]' : 'bg-gray-700'}`} />
            <Link href="/"><h1 className="text-xl font-bold text-blue-400">Crypto Watch</h1></Link>
         </div>
      </div>
      
      <div className="hidden lg:flex space-x-6 items-center text-xs font-bold uppercase tracking-tight">
        <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link>
        
        {/* Products Dropdown Trigger */}
        <div 
          className="relative group h-full flex items-center products-menu-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            onClick={() => setShowProducts(!showProducts)}
            className="flex items-center gap-1 hover:text-blue-400 transition-colors py-2 uppercase outline-none focus:text-blue-400"
          >
            Products <FaChevronDown className={`text-[8px] transition-transform duration-300 ${showProducts ? 'rotate-180' : ''}`} />
          </button>
          {showProducts && (
            <ProductsMenu 
              onMouseEnterAction={handleMouseEnter} 
              onMouseLeaveAction={handleMouseLeave}
            />
          )}
        </div>

        <Link href="/portfolio" className="hover:text-blue-400 transition-colors">Portfolio</Link>
        <Link href="/watchlist" className="hover:text-blue-400 transition-colors">Watchlist</Link>
        <Link href="/market-insight" className="hover:text-blue-400 transition-colors">Market</Link>
        <Link href="/live" className="hover:text-blue-400 transition-colors">Live</Link>
        <Link href="/upcoming" className="hover:text-blue-400 transition-colors">Upcoming</Link>
        {isAuth && <Link href="/invest" className="hover:text-blue-400 transition-colors">Invest Hub</Link>}
      </div>
      
      <div className="flex items-center gap-4">
        {isAuth ? (
          <div className="flex items-center gap-6 animate-in slide-in-from-right duration-500">
             <div className="flex flex-col items-end leading-none">
                <span className="text-[7px] font-black text-blue-500 uppercase tracking-widest mb-1">AUTHORIZED</span>
                <span className="text-[10px] font-black text-white italic">{user}</span>
             </div>
             
             {/* Visible Logout Button */}
             <button 
               onClick={handleLogout}
               className="flex items-center gap-2 px-4 py-2 bg-red-600/10 hover:bg-red-600 border border-red-500/30 rounded-xl text-[9px] font-black uppercase text-red-500 hover:text-white transition-all active:scale-95 shadow-lg group"
             >
                <FaSignOutAlt className="group-hover:rotate-12 transition-transform" /> 
                <span className="hidden sm:inline">Terminate Session</span>
                <span className="sm:hidden">Logout</span>
             </button>
             
             <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-blue-400">
                <FaUserSecret className="text-xl" />
             </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
             <Link 
               href="/login" 
               className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white font-black rounded-xl border border-gray-800 text-[10px] uppercase tracking-widest transition-all flex items-center gap-2"
             >
               <FaLock className="text-blue-500" /> Login
             </Link>
             <Link 
               href="/signup" 
               className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] text-[10px] uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2"
             >
               <FaUserPlus /> Enrollment
             </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#06080a] z-[500] lg:hidden animate-in slide-in-from-left duration-500 overflow-y-auto">
          <div className="flex flex-col min-h-full p-8 space-y-8">
            <div className="flex justify-between items-center border-b border-gray-800 pb-6">
              <div className="flex items-center gap-3">
                 <div className={`w-3 h-3 rounded-full ${isAuth ? 'bg-green-500 animate-pulse' : 'bg-gray-700'}`} />
                 <h1 className="text-2xl font-black text-white tracking-tighter">CRYPTO <span className="text-blue-500">WATCH</span></h1>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 flex items-center justify-center bg-gray-900/80 rounded-2xl text-2xl text-white border border-gray-800"
              >
                <FaTimes />
              </button>
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-5 bg-gray-900/40 border border-gray-800/50 rounded-2xl text-white hover:bg-blue-600/10 hover:text-blue-400 transition-all">Home</Link>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setShowProducts(!showProducts)}
                  className={`w-full text-lg font-black uppercase tracking-widest flex justify-between items-center p-5 bg-gray-900/40 border rounded-2xl transition-all ${showProducts ? 'text-blue-400 border-blue-500/40' : 'text-white border-gray-800/50 hover:bg-blue-600/10'}`}
                >
                  Products <FaChevronDown className={`text-xs transition-transform duration-500 ${showProducts ? 'rotate-180' : ''}`} />
                </button>
                {showProducts && (
                  <div className="pl-2 flex flex-col gap-3 animate-in slide-in-from-top-4 duration-500">
                    <Link href="https://coinmarketcap.com/converter/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 text-sm font-bold text-gray-300 hover:text-white bg-gray-900/20 rounded-2xl border border-gray-800/30">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-xl">🚀</div> Converter
                    </Link>
                    <Link href="https://coinmarketcap.com/academy/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 text-sm font-bold text-gray-300 hover:text-white bg-gray-900/20 rounded-2xl border border-gray-800/30">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-xl">🎓</div> Academy
                    </Link>
                    <Link href="https://coinmarketcap.com/airdrop/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 text-sm font-bold text-gray-300 hover:text-white bg-gray-900/20 rounded-2xl border border-gray-800/30">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-xl">🎁</div> Airdrops
                    </Link>
                    <Link href="/upcoming" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 text-sm font-bold text-gray-300 hover:text-white bg-gray-900/20 rounded-2xl border border-gray-800/30">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-xl">📅</div> ICO Calendar
                    </Link>
                    <Link href="https://coinmarketcap.com/headlines/news/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 p-4 text-sm font-bold text-gray-300 hover:text-white bg-gray-900/20 rounded-2xl border border-gray-800/30">
                      <div className="w-10 h-10 flex items-center justify-center bg-gray-900 rounded-lg">📰</div> News
                    </Link>
                  </div>
                )}
              </div>

              <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-5 bg-gray-900/40 border border-gray-800/50 rounded-2xl text-white hover:bg-blue-600/10 hover:text-blue-400 transition-all">Portfolio</Link>
              <Link href="/watchlist" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-5 bg-gray-900/40 border border-gray-800/50 rounded-2xl text-white hover:bg-blue-600/10 hover:text-blue-400 transition-all">Watchlist</Link>
              <Link href="/market-insight" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-5 bg-gray-900/40 border border-gray-800/50 rounded-2xl text-white hover:bg-blue-600/10 hover:text-blue-400 transition-all">Market</Link>
              <Link href="/live" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-5 bg-gray-900/40 border border-gray-800/50 rounded-2xl text-white hover:bg-blue-600/10 hover:text-blue-400 transition-all">Live</Link>
              <Link href="/upcoming" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-5 bg-gray-900/40 border border-gray-800/50 rounded-2xl text-white hover:bg-blue-600/10 hover:text-blue-400 transition-all">Upcoming</Link>
              {isAuth && <Link href="/invest" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-black uppercase tracking-widest p-5 bg-gray-900/40 border border-gray-800/50 rounded-2xl text-white hover:bg-blue-600/10 hover:text-blue-400 transition-all">Invest Hub</Link>}
            </nav>
            
            {!isAuth && (
              <div className="mt-8 grid grid-cols-2 gap-4 pb-12">
                 <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-5 bg-gray-900 rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.2em] border border-gray-800 text-white">Login</Link>
                 <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="px-6 py-5 bg-blue-600 rounded-2xl text-center text-[10px] font-black uppercase tracking-[0.2em] shadow-xl text-white">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

