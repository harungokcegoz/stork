export interface Name {
  id: string;
  name: string;
  gender: "male" | "female" | "unisex";
  origin: string;
  meaning?: string;
  religion?: string;
  rating?: number;
}

export type Gender = "male" | "female" | "unisex";

export type SwipeDirection = "left" | "right";

export type Religion = "Christianity" | "Islam" | "Judaism" | "Buddhism";

export interface UserPreferences {
  selectedReligions: Religion[];
  theme: "light" | "dark" | "system";
  preferredGenders: Gender[];
}

export interface FavoriteNameSort {
  type: "rating" | "alphabetical" | "custom";
  direction: "asc" | "desc";
}

export interface NameFilters {
  religions?: Religion[];
  origins?: string[];
  hasVariants?: boolean;
  minRating?: number;
  gender?: Gender[];
}
