"use client";

export const exportData = () => {
  const data = {
    portfolio: JSON.parse(localStorage.getItem("portfolio") || "[]"),
    watchlist: JSON.parse(localStorage.getItem("watchlist") || "[]"),
    user: JSON.parse(localStorage.getItem("user") || "null"),
    staked: JSON.parse(localStorage.getItem("staked_balance") || "{}"),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `crypto-watch-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importData = async (file: File): Promise<boolean> => {
  try {
    const text = await file.text();
    const data = JSON.parse(text);
    if (data.portfolio) localStorage.setItem("portfolio", JSON.stringify(data.portfolio));
    if (data.watchlist) localStorage.setItem("watchlist", JSON.stringify(data.watchlist));
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    if (data.staked) localStorage.setItem("staked_balance", JSON.stringify(data.staked));
    return true;
  } catch (e) {
    console.error("Backup restoration failed", e);
    return false;
  }
};
