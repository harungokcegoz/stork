export interface Name {
  id: string;
  name: string;
  origin: string;
  religion?: Religion;
  meaning?: string;
  pronunciation?: string;
  variants?: string[];
  rating?: number;
  gender: Gender;
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
