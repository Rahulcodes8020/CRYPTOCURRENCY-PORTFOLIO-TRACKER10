export interface UpcomingProject {
  id: string;
  name: string;
  symbol: string;
  image: string;
  blockchain: string;
  startDate: string;
  endDate: string;
  goal: string;
  price: string;
  launchpad: string;
  status: "Upcoming" | "Active" | "Ended";
  category: string;
}

export const upcomingProjects: UpcomingProject[] = [
  {
    id: "dein",
    name: "DEIN",
    symbol: "DEIN",
    image: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    blockchain: "Ethereum",
    startDate: "2026-04-05T00:00:00Z",
    endDate: "2026-04-12T00:00:00Z",
    goal: "$2,000,000",
    price: "$0.05",
    launchpad: "Binance Launchpad",
    status: "Upcoming",
    category: "DeFi",
  },
  {
    id: "puffpaw",
    name: "Puffpaw",
    symbol: "VAPE",
    image: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    blockchain: "Solana",
    startDate: "2026-03-31T10:00:00Z",
    endDate: "2026-04-10T10:00:00Z",
    goal: "$1,500,000",
    price: "$0.12",
    launchpad: "Polkastarter",
    status: "Active",
    category: "GameFi",
  },
  {
    id: "worldland",
    name: "WorldLand",
    symbol: "WL",
    image: "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png",
    blockchain: "BSC",
    startDate: "2026-04-15T12:00:00Z",
    endDate: "2026-04-25T12:00:00Z",
    goal: "$5,000,000",
    price: "$0.008",
    launchpad: "DAO Maker",
    status: "Upcoming",
    category: "L1 / L2",
  },
  {
    id: "mezo",
    name: "Mezo",
    symbol: "MEZO",
    image: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    blockchain: "Bitcoin Eco",
    startDate: "2026-03-20T00:00:00Z",
    endDate: "2026-03-29T00:00:00Z",
    goal: "$10,000,000",
    price: "$0.45",
    launchpad: "Direct",
    status: "Ended",
    category: "Infrastructure",
  },
  {
    id: "nexus-ai",
    name: "Nexus AI",
    symbol: "NXAI",
    image: "https://assets.coingecko.com/coins/images/12124/small/Polygon_gradient.png",
    blockchain: "Polygon",
    startDate: "2026-04-08T08:00:00Z",
    endDate: "2026-04-15T08:00:00Z",
    goal: "$750,000",
    price: "$0.025",
    launchpad: "Red Kite",
    status: "Upcoming",
    category: "AI",
  },
];
