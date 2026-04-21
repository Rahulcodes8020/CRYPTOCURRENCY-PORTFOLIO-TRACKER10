"use client";

import { useEffect, useState } from "react";
import { UpcomingProject } from "@/lib/upcomingData";
import { Rocket, Target, Globe, Calendar, DollarSign, ExternalLink } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

interface TableProps {
  projects: UpcomingProject[];
}

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft("LIVE");
        clearInterval(timer);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return <span className="font-mono text-[11px] text-blue-400 font-bold">{timeLeft || "Calculating..."}</span>;
}

export default function UpcomingTable({ projects }: TableProps) {
  const handleAction = (name: string) => {
    toast.success(`Registered for ${name} Alpha Alert!`);
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-20 bg-gray-900/30 rounded-[3rem] border-2 border-dashed border-gray-800">
        <p className="text-gray-500 text-xl font-medium">No results match your elite filters.</p>
      </div>
    );
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-400 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]";
      case "Upcoming":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30 shadow-[0_0_10px_rgba(59,130,246,0.1)]";
      case "Ended":
        return "bg-red-500/10 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="relative">
      <Toaster position="top-right" />
      
      {/* Mobile View (Cards) */}
      <div className="grid grid-cols-1 gap-6 lg:hidden">
        {projects.map((project) => (
          <div key={`mobile-${project.id}`} className="bg-[#0d1117] rounded-[2.5rem] border border-gray-800 p-6 space-y-6 shadow-xl">
             <div className="flex items-center gap-4">
                <img src={project.image} alt={project.name} className="w-16 h-16 rounded-2xl border-2 border-gray-800 bg-black/50 p-2" />
                <div>
                   <h3 className="text-xl font-black text-white italic tracking-tighter">{project.name}</h3>
                   <div className="flex gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-gray-800 rounded text-[8px] font-black uppercase text-gray-400">{project.symbol}</span>
                      <span className="px-2 py-0.5 bg-blue-600/20 rounded text-[8px] font-black uppercase text-blue-400">{project.blockchain}</span>
                   </div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-800/50">
                <div className="space-y-1">
                   <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Status</p>
                   <span className={`inline-block px-3 py-1 rounded-lg text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(project.status)}`}>
                      {project.status}
                   </span>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Target Goal</p>
                   <p className="text-lg font-black text-white italic">${project.goal.replace('$', '')}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Price</p>
                   <p className="text-sm font-black text-blue-400 italic">{project.price}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Launchpad</p>
                   <p className="text-sm font-black text-purple-400 italic flex items-center gap-1"><Rocket className="w-3 h-3" /> {project.launchpad}</p>
                </div>
             </div>

             <button 
               onClick={() => handleAction(project.name)}
               className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
             >
                <ExternalLink className="w-3 h-3" /> Secure Alpha Spot
             </button>
          </div>
        ))}
      </div>

      {/* Desktop View (Table) */}
      <div className="hidden lg:block overflow-x-auto rounded-[3rem] border border-gray-800 bg-[#0d1117] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#161b22] text-gray-400 uppercase text-[10px] font-black tracking-[0.3em]">
            <tr>
              <th className="px-10 py-6">Project Launch</th>
              <th className="px-6 py-6">Network</th>
              <th className="px-6 py-6">Status & Time</th>
              <th className="px-6 py-6 font-black italic text-blue-400">ICO Price</th>
              <th className="px-6 py-6">Launchpad</th>
              <th className="px-6 py-6">Total Goal</th>
              <th className="px-10 py-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {projects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-gray-800/40 transition-all group relative"
              >
                <td className="px-10 py-8">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-14 h-14 rounded-2xl border-2 border-gray-800 group-hover:border-blue-500 transition-all p-2 bg-black/50"
                      />
                      <div className="absolute -top-2 -right-2 bg-purple-600 text-[8px] px-1.5 py-0.5 rounded-md font-bold border border-white/10 shadow-lg">
                        {project.category}
                      </div>
                    </div>
                    <div>
                      <div className="font-black text-white text-xl tracking-tighter group-hover:text-blue-400 transition-colors italic">
                        {project.name}
                      </div>
                      <div className="text-xs text-gray-600 font-bold tracking-widest">{project.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <div className="flex items-center gap-2 uppercase">
                    <Globe className="w-4 h-4 text-gray-700" />
                    <span className="text-gray-300 font-black text-[13px] tracking-tight">{project.blockchain}</span>
                  </div>
                </td>
                <td className="px-6 py-8">
                  <div className="flex flex-col gap-2">
                    <span
                      className={`inline-block w-fit px-3 py-1 rounded-lg text-[9px] font-black border uppercase tracking-widest ${getStatusStyle(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                    {project.status !== "Ended" && (
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping shadow-[0_0_10px_blue]" />
                        <Countdown targetDate={project.startDate} />
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-8 font-black text-md italic text-white/90">
                  {project.price}
                </td>
                <td className="px-6 py-8">
                  <div className="flex items-center gap-2 text-purple-400 font-black text-sm italic group-hover:text-pink-400 transition-all">
                    <Rocket className="w-4 h-4 group-hover:animate-bounce" />
                    {project.launchpad}
                  </div>
                </td>
                <td className="px-6 py-8">
                  <div className="flex flex-col">
                    <span className="text-yellow-500 font-black text-xl tracking-tighter italic">${project.goal.replace('$', '')}</span>
                    <div className="flex items-center gap-1.5 mt-1 opacity-50">
                      <Target className="w-3 h-3" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Hardcap</span>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8 text-right">
                  <button 
                    onClick={() => handleAction(project.name)}
                    className="px-6 py-2.5 rounded-xl bg-gray-900 border border-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-95"
                  >
                    Get Alpha
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
