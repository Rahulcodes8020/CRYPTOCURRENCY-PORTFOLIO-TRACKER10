// components/TradingViewWidget.tsx
"use client";
import { MiniChart } from "react-ts-tradingview-widgets";

interface Props {
  symbol: string;
}

export default function TradingViewWidget({ symbol }: Props) {
  return (
    <div className="w-full h-[220px]">
      <MiniChart 
        symbol={`BINANCE:${symbol}`}
        width="100%"
        height="100%"
        colorTheme="dark"
        isTransparent={true}
        autosize={true}
        locale="en"
        dateRange="1D"
      />
    </div>
  );
}
