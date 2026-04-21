import { NextResponse } from "next/server";

// ✅ Using the provided demo key as fallback
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY || "CG-w7RJBgY5HzEG33DuU69BEzoM";
const BASE_URL = "https://api.coingecko.com/api/v3";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Allow dynamic path, defaults to /coins/markets
    const path = searchParams.get("path") || "/coins/markets";
    const url = new URL(`${BASE_URL}${path}`);

    // Forward all other params from client
    searchParams.forEach((value, key) => {
      if (key !== "path") {
        url.searchParams.append(key, value);
      }
    });

    // Append API key based on format (demo vs pro)
    const keyParam = COINGECKO_API_KEY.startsWith("CG-") ? "x_cg_demo_api_key" : "x_cg_pro_api_key";
    url.searchParams.append(keyParam, COINGECKO_API_KEY);

    console.log(`📡 Proxying request to: ${url.toString()}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
      signal: controller.signal,
      next: { revalidate: 60 }, // Cache for 60 seconds to avoid rate limits
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`❌ CoinGecko API Error (${response.status}):`, errorData);
      return NextResponse.json(
        { error: `CoinGecko API returned ${response.status}`, detail: errorData }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("❌ Proxy error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", detail: error.message }, 
      { status: 500 }
    );
  }
}
