"use client";
import { 
  ArrowRightLeft, Mail, Rocket, FlaskConical, ShieldCheck, 
  Newspaper, Send, Megaphone, Code, Layout, 
  BookOpen, GraduationCap, LineChart, PlayCircle, Book,
  MessageSquareQuote, Bell,
  Gift, Trophy, Lightbulb,
  CalendarDays, CalendarHeart
} from "lucide-react";
import Link from "next/link";

const menuData = [
  {
    title: "Products",
    items: [
      { name: "Converter", desc: "Currency calculations", icon: <ArrowRightLeft className="w-5 h-5 text-indigo-400" />, href: "https://coinmarketcap.com/converter/" },
      { name: "Newsletter", desc: "Daily market updates", icon: <Mail className="w-5 h-5 text-blue-400" />, href: "https://coinmarketcap.com/newsletter/" },
      { name: "CMC Launch", desc: "New project listing", icon: <Rocket className="w-5 h-5 text-orange-400" />, href: "https://coinmarketcap.com/currencies/" },
      { name: "CMC Labs", desc: "Expert web3 advice", icon: <FlaskConical className="w-5 h-5 text-green-400" />, href: "https://coinmarketcap.com/labs/" },
      { name: "CMC Max", desc: "Exchange performance", icon: <ShieldCheck className="w-5 h-5 text-yellow-400" />, href: "https://coinmarketcap.com/exchanges/" },
      { name: "Top Stories", desc: "Breaking crypto news", icon: <Newspaper className="w-5 h-5 text-blue-600" />, href: "/market-insight" },
      { name: "Telegram Bot", desc: "Real-time alerts", icon: <Send className="w-5 h-5 text-cyan-400" />, href: "https://t.me/CoinMarketCapBot" },
      { name: "Advertise", desc: "Promote your brand", icon: <Megaphone className="w-5 h-5 text-pink-400" />, href: "https://coinmarketcap.com/advertising/" },
      { name: "Crypto API", desc: "Powerful data feed", icon: <Code className="w-5 h-5 text-gray-400" />, href: "https://coinmarketcap.com/api/" },
      { name: "Site Widgets", desc: "Embed CMC data", icon: <Layout className="w-5 h-5 text-purple-400" />, href: "https://coinmarketcap.com/widgets/" },
    ]
  },
  {
    title: "Learn",
    items: [
      { name: "News", desc: "Latest headlines", icon: <BookOpen className="w-5 h-5 text-blue-500" />, href: "https://coinmarketcap.com/headlines/news/" },
      { name: "Academy", desc: "Blockchain education", icon: <GraduationCap className="w-5 h-5 text-teal-400" />, href: "https://coinmarketcap.com/academy/" },
      { name: "Research", desc: "In-depth analysis", icon: <LineChart className="w-5 h-5 text-purple-500" />, href: "https://coinmarketcap.com/alexandria/" },
      { name: "Videos", desc: "Watch live shows", icon: <PlayCircle className="w-5 h-5 text-red-400" />, href: "https://www.youtube.com/c/CoinMarketCapShow" },
      { name: "Glossary", desc: "Crypto terms list", icon: <Book className="w-5 h-5 text-amber-600" />, href: "https://coinmarketcap.com/glossary/" },
    ]
  },
  {
    title: "CMC AI",
    items: [
      { name: "Ask CMC AI", desc: "AI trading assistant", icon: <MessageSquareQuote className="w-5 h-5 text-violet-400" />, href: "https://coinmarketcap.com/airdrop/" },
      { name: "AI Alerts", desc: "Smart notifications", icon: <Bell className="w-5 h-5 text-blue-400" />, href: "https://coinmarketcap.com/newsletter/" },
    ]
  },
  {
    title: "Campaigns",
    items: [
      { name: "Airdrops", desc: "Free token claims", icon: <Gift className="w-5 h-5 text-emerald-400" />, href: "https://coinmarketcap.com/airdrop/" },
      { name: "Diamond Rewards", desc: "Loyalty program", icon: <Trophy className="w-5 h-5 text-orange-500" />, href: "https://coinmarketcap.com/diamonds/" },
      { name: "Learn & Earn", desc: "Get paid to study", icon: <Lightbulb className="w-5 h-5 text-cyan-400" />, href: "https://coinmarketcap.com/earn/" },
    ]
  },
  {
    title: "Calendars",
    items: [
      { name: "ICO Calendar", desc: "Token launch dates", icon: <CalendarDays className="w-5 h-5 text-green-500" />, href: "/upcoming" },
      { name: "Events Calendar", desc: "Global crypto meets", icon: <CalendarHeart className="w-5 h-5 text-blue-500" />, href: "https://coinmarketcap.com/events/" },
    ]
  }
];

export default function ProductsMenu({ onMouseEnterAction, onMouseLeaveAction }: { onMouseEnterAction?: () => void, onMouseLeaveAction?: () => void }) {
  return (
    <div 
      onMouseEnter={onMouseEnterAction}
      onMouseLeave={onMouseLeaveAction}
      className="fixed top-[64px] left-0 w-full bg-[#0b0e11] border-t border-gray-800 shadow-2xl pt-6 pb-12 animate-in fade-in slide-in-from-top-2 duration-300 z-[1000] min-h-[400px]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {menuData.map((section, idx) => (
          <div key={idx} className="space-y-6">
            <h3 className="text-gray-500 font-black uppercase text-[11px] tracking-[0.2em] border-b border-gray-800 pb-3">{section.title}</h3>
            <div className="flex flex-col gap-1">
              {section.items.map((item, i) => (
                <Link 
                  key={i} 
                  href={item.href} 
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-blue-600/10 transition-all duration-200 group border border-transparent hover:border-blue-500/20"
                >
                  <div className="p-2 bg-gray-900 rounded-lg group-hover:scale-110 group-hover:bg-blue-600/20 transition-all">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-white leading-tight">{item.name}</span>
                    <span className="text-[10px] text-gray-500 group-hover:text-blue-400/80 transition-colors">{item.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
