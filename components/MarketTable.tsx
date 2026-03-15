"use client";
import React from "react";

interface Coin {
  id?: string;
  name?: string;
  image?: string | null;
  current_price?: number | null;
  high_24h?: number | null;
  low_24h?: number | null;
  price_change_percentage_24h?: number | null;
}

interface MarketTableProps {
  data?: Coin[] | null;
}

const MarketTable: React.FC<MarketTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <p className="text-white text-center p-5">
        Loading or no market data available...
      </p>
    );
  }

  const formatNumber = (num?: number | null) =>
    num != null ? num.toLocaleString() : "-";

  const formatPercentage = (num?: number | null) =>
    num != null ? num.toFixed(2) + "%" : "-";

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[600px] w-full border-collapse text-sm text-white bg-gray-900">
        <thead>
          <tr className="bg-gray-800 text-left border-b border-gray-700">
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">High 24h</th>
            <th className="p-3">Low 24h</th>
            <th className="p-3">Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <tr
              key={coin.id ?? Math.random()}
              className="hover:bg-gray-800 border-b border-gray-700 transition-colors"
            >
              <td className="p-3 flex items-center gap-2">
                <img
                  src={coin.image ?? "/fallback-coin.png"}
                  alt={coin.name ?? "-"}
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                  onError={(e) =>
                    ((e.target as HTMLImageElement).src = "/fallback-coin.png")
                  }
                />
                {coin.name ?? "-"}
              </td>
              <td className="p-3">${formatNumber(coin.current_price)}</td>
              <td className="p-3">${formatNumber(coin.high_24h)}</td>
              <td className="p-3">${formatNumber(coin.low_24h)}</td>
              <td
                className={`p-3 ${
                  coin.price_change_percentage_24h != null &&
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {formatPercentage(coin.price_change_percentage_24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
