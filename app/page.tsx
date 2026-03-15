"use client";

import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import CoinList from "@/components/CoinList";
import TopMovers from "@/components/TopMovers";
import ProjectOfTheDay from "@/components/ProjectOfTheDay";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (query) {
      router.push(`/id/${query}`);
    }
  };

  return (
    <main className="space-y-8 p-4">
      <Header />
      <SearchBar onSearch={handleSearch} />
      <ProjectOfTheDay />
      <TopMovers />
      <CoinList />
    </main>
  );
}
