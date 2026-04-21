"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  coin: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
  };
};

export default function CoinCard({ coin }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/id/${coin.id}`)}
      className="cursor-pointer bg-[#1e1e22] p-4 rounded shadow hover:shadow-lg transition"
    >
      <div className="flex items-center gap-3 min-w-0 overflow-hidden">
        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full flex-shrink-0" />
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate leading-tight">{coin.name}</h3>
          <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest truncate">{coin.symbol}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold">${(coin.current_price ?? 0).toLocaleString()}</p>
        <p className={`text-sm ${(coin.price_change_percentage_24h ?? 0) >= 0 ? "text-green-400" : "text-red-400"}`}>
          {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
        </p>
      </div>
    </div>
  );
}
