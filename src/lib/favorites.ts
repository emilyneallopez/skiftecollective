"use client";

// Simple localStorage-backed favorites
export const getFavorites = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("skifte_favorites") || "[]");
  } catch {
    return [];
  }
};

export const toggleFavorite = (itemId: string): boolean => {
  const favorites = getFavorites();
  const isFav = favorites.includes(itemId);
  const updated = isFav
    ? favorites.filter((id) => id !== itemId)
    : [...favorites, itemId];
  localStorage.setItem("skifte_favorites", JSON.stringify(updated));
  return !isFav;
};

export const isFavorite = (itemId: string): boolean => {
  return getFavorites().includes(itemId);
};
