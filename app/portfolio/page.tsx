"use client";

import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import Portfolio from "@/components/Portfolio";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Generate 30 days of mock net worth data
const generateMockNetWorthData = () => {
  let currentValue = 1500000; // Starting 30 days ago
  const data = [];
  const labels = [];
  for (let i = 30; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Simulate daily PnL (random swing between -3% and +4%)
    const swing = (Math.random() * 0.07) - 0.03;
    currentValue = currentValue * (1 + swing);
    
    // Force the final value to loosely match the hero card ($2M)
    if (i === 0) currentValue = 2068973;

    data.push(currentValue);
  }
  return { labels, data };
};

const MOCK_BREAKDOWN = [
  { name: "NFTs", share: "75.63%", value: "$1,564,859.76" },
  { name: "Wallet", share: "23.99%", value: "$496,273.06" },
  { name: "Kelp", share: "0.38%", value: "$7,836.23" },
  { name: "Aave V3", share: "<0.01%", value: "$3.53" },
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">📊 Portfolio Overview</h1>
      </div>

      {/* Summary Card */}
      <Card className="bg-[#1e1e22] text-white mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-gray-400">Net Worth</p>
              <h2 className="text-3xl font-bold">$2,068,973</h2>
              <p className="text-red-500">- $1,452,654 (-41.23%)</p>
            </div>
            <div className="mt-6 md:mt-0">
              <p className="text-gray-400">Total Assets</p>
              <p>$2,068,973</p>
              <p className="text-gray-400 mt-2">Total Liabilities</p>
              <p>$0</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-400">Risk Profile</p>
            <div className="w-full h-3 bg-gray-700 rounded-full mt-1 overflow-hidden">
              <div className="bg-blue-500 h-full w-[71%] inline-block"></div>
              <div className="bg-purple-500 h-full w-[24%] inline-block"></div>
              <div className="bg-teal-500 h-full w-[5%] inline-block"></div>
              <div className="bg-yellow-400 h-full w-[0.5%] inline-block"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Net Worth Area Chart */}
      <Card className="bg-[#1e1e22] text-white border-gray-800 shadow-2xl mb-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-transparent"></div>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-sm inline-block"></span>
            30-Day Performance
          </h2>
          <div className="w-full h-[300px] mt-4 relative">
            <Line
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    mode: "index",
                    intersect: false,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "#9ca3af",
                    bodyColor: "#ffffff",
                    borderColor: "#374151",
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                      label: function (context) {
                        return "$" + context.parsed.y.toLocaleString(undefined, { maximumFractionDigits: 0 });
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    grid: { display: false, color: "#374151" },
                    ticks: { color: "#9ca3af", maxTicksLimit: 8 },
                  },
                  y: {
                    grid: { color: "rgba(55, 65, 81, 0.3)" },
                    ticks: {
                      color: "#9ca3af",
                      callback: function(value) {
                         return "$" + (Number(value) / 1000000).toFixed(1) + "M";
                      }
                    },
                  },
                },
                interaction: {
                  mode: "nearest",
                  axis: "x",
                  intersect: false,
                },
              }}
              data={{
                labels: generateMockNetWorthData().labels,
                datasets: [
                  {
                    fill: true,
                    label: "Net Worth",
                    data: generateMockNetWorthData().data,
                    borderColor: "#8b5cf6", // Purple line
                    backgroundColor: (context) => {
                      const ctx = context.chart.ctx;
                      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                      gradient.addColorStop(0, "rgba(139, 92, 246, 0.5)"); // Purple top
                      gradient.addColorStop(1, "rgba(139, 92, 246, 0.0)"); // Transparent bottom
                      return gradient;
                    },
                    borderWidth: 2,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointBackgroundColor: "#8b5cf6",
                    tension: 0.4, // Smooth Spline curve
                  },
                ],
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Breakdown Table */}
      <Card className="bg-[#1e1e22] text-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Protocol Breakdown</h2>
          <div className="grid grid-cols-3 gap-4 font-semibold text-gray-400 border-b border-gray-700 pb-2">
            <p>Name</p>
            <p>Share</p>
            <p className="text-right">Value</p>
          </div>
          {MOCK_BREAKDOWN.map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-3 gap-4 py-2 border-b border-gray-800 text-white"
            >
              <p>{row.name}</p>
              <p>{row.share}</p>
              <p className="text-right">{row.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      {/* Live Tracked Assets */}
      <Card className="bg-[#1e1e22] text-white mt-6">
        <CardContent className="p-0">
           <Portfolio />
        </CardContent>
      </Card>
    </div>
  );
}
