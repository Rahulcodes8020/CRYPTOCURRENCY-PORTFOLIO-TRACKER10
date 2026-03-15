"use client";

import React, { useEffect, useState } from "react";
import { Line, Bar, Radar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Filler,
  ChartData,
} from "chart.js";
import AIMarketInsights from "@/components/AIMarketInsights";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Filler,
  Legend
);

export default function DashboardPage() {
  const chartBox =
    "bg-[#0d1117] rounded-xl shadow-[0_0_15px_#8A2BE2] text-white p-4 border border-[#4b0082] backdrop-blur-md transition-transform duration-300 hover:scale-[1.02] min-h-[300px] flex flex-col";

  const withdrawalData: ChartData<"bar", number[], string> = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    datasets: [
      {
        label: "Price",
        data: [20, 40, 30, 50, 60, 45],
        backgroundColor: [
          "#FF4500", "#1E90FF", "#32CD32", "#FFD700", "#8A2BE2", "#00CED1",
        ],
      },
    ],
  };

  const [radarData, setRadarData] = useState<number[]>([90, 60, 80, 70, 95, 85]);
  const [waveData, setWaveData] = useState<number[]>([0, 10, 5, 15, 10, 20, 5]);
  const [coinSimData, setCoinSimData] = useState<number[]>([40, 45, 50, 48, 53, 52]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarData(prev => prev.map(() => Math.floor(Math.random() * 100)));
      setWaveData(prev => prev.map(() => Math.floor(Math.random() * 30)));
      setCoinSimData(prev => prev.map(() => 45 + Math.floor(Math.random() * 10)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      <h1 className="text-3xl font-bold text-center text-[#8A2BE2] col-span-full animate-pulse mb-2">
        🚀 Crypto Dashboard
      </h1>

      <AIMarketInsights />

      <div className={chartBox + " lg:row-span-2 items-center justify-center animate-fade-in"}>
        <h2 className="text-xl font-bold mb-4 animate-pulse">CRYPTOAUDIT</h2>
        <p className="text-sm text-gray-400">INVESTMENT</p>
        <div className="mt-4 space-y-2">
          {["2023", "2024", "2025"].map((y) => (
            <button
              key={y}
              className="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded w-full animate-bounce"
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {["SOLANA", "ARBITRUM", "ETHEREUM"].map((coin, i) => (
        <div
          key={coin}
          className={chartBox + " items-center justify-center animate-fade-in"}
        >
          <h3 className="text-sm text-gray-400">Weighted Pool</h3>
          <p className="text-lg font-bold animate-pulse">{coin}</p>
          <p className="text-sm text-green-400 mt-1">{(i * 1.2 + 1.5).toFixed(2)}M Total</p>
          <div className="w-full h-40">
            <Doughnut
              data={{
                labels: ["Pool", "Others"],
                datasets: [
                  {
                    data: [i * 1.2 + 1.5, 5],
                    backgroundColor: [
                      ["#FF4500", "#2d2d2d"],
                      ["#1E90FF", "#2d2d2d"],
                      ["#32CD32", "#2d2d2d"],
                    ][i],
                  },
                ],
              }}
              options={{
                cutout: "85%",
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
                elements: { arc: { borderWidth: 0 } },
                animation: {
                  animateRotate: true,
                  duration: 2000,
                  easing: "easeInOutQuad",
                },
              }}
            />
          </div>
        </div>
      ))}

      <div className={chartBox + " items-center justify-center animate-pulse"}>
        <h3 className="text-sm text-gray-400">Fear & Greed Index</h3>
        <div className="w-full h-40">
          <Doughnut
            data={{
              labels: ["Greed", "Fear"],
              datasets: [
                {
                  data: [50, 50],
                  backgroundColor: ["#FFA500", "#8B0000"],
                },
              ],
            }}
            options={{
              cutout: "85%",
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
              elements: { arc: { borderWidth: 0 } },
              animation: {
                animateRotate: true,
                duration: 4000,
                easing: "easeInOutQuad",
              },
            }}
          />
        </div>
        <div className="text-center mt-2 text-lg font-bold animate-pulse">50%</div>
      </div>

      <div className={chartBox + " col-span-full lg:col-span-2 row-span-2 animate-fade-in"}>
        <h3 className="mb-2 text-center">Radar Real-Time Simulation</h3>
        <div className="w-full h-64">
          <Radar
            data={{
              labels: ["TVL", "Liquidity", "Security", "Utilization", "Volume", "Speed"],
              datasets: [
                {
                  label: "Radar Signal",
                  data: radarData,
                  backgroundColor: "rgba(138,43,226,0.2)",
                  borderColor: "#8A2BE2",
                  borderWidth: 2,
                  pointBackgroundColor: "#8A2BE2",
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              animation: {
                duration: 1500,
                easing: "easeInOutCirc",
              },
              scales: {
                r: {
                  angleLines: { color: "#333" },
                  grid: { color: "#555" },
                  pointLabels: { color: "white" },
                  ticks: { color: "#8A2BE2" },
                },
              },
            }}
          />
        </div>
      </div>

      <div className={chartBox + " col-span-full animate-fade-in"}>
        <h3 className="mb-2 text-center">🌊 Live Wave Simulation</h3>
        <div className="w-full h-56">
          <Line
            data={{
              labels: ["1", "2", "3", "4", "5", "6", "7"],
              datasets: [
                {
                  label: "Wave",
                  data: waveData,
                  fill: true,
                  borderColor: "#00CED1",
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(0, 206, 209, 0.4)");
                    gradient.addColorStop(1, "rgba(0, 206, 209, 0.0)");
                    return gradient;
                  },
                  tension: 0.4,
                  pointRadius: 0,
                  pointHoverRadius: 5,
                },
              ],
            }}
            options={{
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                x: { display: false },
                y: { display: false },
              },
              animation: {
                duration: 1000,
                easing: "easeInOutSine",
              },
            }}
          />
        </div>
      </div>

      <div className={chartBox + " col-span-full animate-fade-in"}>
        <h3 className="mb-2 text-center">📈 Live Crypto Price Simulator</h3>
        <div className="w-full h-56">
          <Line
            data={{
              labels: ["BTC", "ETH", "BNB", "SOL", "XRP", "TRX"],
              datasets: [
                {
                  label: "Simulated Price ($)",
                  data: coinSimData,
                  borderColor: "#8A2BE2",
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(138,43,226, 0.4)");
                    gradient.addColorStop(1, "rgba(138,43,226, 0.0)");
                    return gradient;
                  },
                  fill: true,
                  tension: 0.4,
                  pointRadius: 0,
                  pointHoverRadius: 5,
                },
              ],
            }}
            options={{
              plugins: { 
                legend: { display: false },
                tooltip: { backgroundColor: "rgba(0, 0, 0, 0.8)", padding: 10 }
              },
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                x: { grid: { display: false, color: "#374151" }, ticks: { color: "#9ca3af" } },
                y: { grid: { color: "rgba(55, 65, 81, 0.3)" }, ticks: { color: "#9ca3af" } },
              },
              animation: {
                duration: 1500,
                easing: "easeInOutSine",
              },
            }}
          />
        </div>
      </div>

      <div className={chartBox + " lg:col-span-2 animate-fade-in"}>
        <h3 className="mb-2">Cash Flow</h3>
        <div className="w-full h-56">
          <Line
            data={{
              labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG"],
              datasets: [
                {
                  label: "Flow",
                  data: [20000, 30000, 45000, 60000, 40000, 50000, 70000, 60000],
                  fill: true,
                  borderColor: "#FFD700",
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(255, 215, 0, 0.4)");
                    gradient.addColorStop(1, "rgba(255, 215, 0, 0.0)");
                    return gradient;
                  },
                  tension: 0.4,
                  pointRadius: 4,
                },
              ],
            }}
            options={{
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
              responsive: true,
              scales: {
                x: { grid: { display: false, color: "#374151" }, ticks: { color: "#9ca3af" } },
                y: { grid: { color: "rgba(55, 65, 81, 0.3)" }, ticks: { color: "#9ca3af" } },
              },
            }}
          />
        </div>
      </div>

      <div className={chartBox + " lg:col-span-2 animate-fade-in"}>
        <h3 className="mb-2">Withdrawal Price</h3>
        <div className="w-full h-56">
          <Bar
            data={{
              labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
              datasets: [
                {
                  label: "Price",
                  data: [20, 40, 30, 50, 60, 45],
                  backgroundColor: [
                    "#FF4500", "#1E90FF", "#32CD32", "#FFD700", "#8A2BE2", "#00CED1",
                  ],
                  borderRadius: 6,
                  borderSkipped: false,
                },
              ],
            }}
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false } },
                y: { grid: { color: "rgba(55, 65, 81, 0.3)" } }
              }
            }}
          />
        </div>
      </div>

      <div className={chartBox + " animate-fade-in"}>
        <h3 className="mb-2">Best Volatility</h3>
        <div className="w-full h-40">
          <Bar
            data={{
              labels: ["JAN", "FEB", "MAR", "APR", "MAY"],
              datasets: [
                {
                  label: "Volatility",
                  data: [40, 60, 30, 81, 50],
                  backgroundColor: [
                    "#FF6347", "#00CED1", "#FFD700", "#32CD32", "#8A2BE2",
                  ],
                  borderRadius: 6,
                  borderSkipped: false,
                },
              ],
            }}
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { display: false },
                y: { display: false }
              } 
            }}
          />
        </div>
      </div>

      <div className={chartBox + " lg:col-span-2 animate-fade-in"}>
        <h3 className="mb-2">Profit Withdrawal</h3>
        <div className="w-full h-56">
          <Line
            data={{
              labels: ["FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
              datasets: [
                {
                  label: "Profit",
                  data: [2000, 2500, 3000, 5500, 4000, 4500],
                  fill: true,
                  borderColor: "#1E90FF",
                  backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, "rgba(30, 144, 255, 0.4)");
                    gradient.addColorStop(1, "rgba(30, 144, 255, 0.0)");
                    return gradient;
                  },
                  tension: 0.4,
                  pointRadius: 4,
                },
              ],
            }}
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false, color: "#374151" }, ticks: { color: "#9ca3af" } },
                y: { grid: { color: "rgba(55, 65, 81, 0.3)" }, ticks: { color: "#9ca3af" } },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
