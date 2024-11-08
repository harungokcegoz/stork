import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { allMockNames } from "../data/mockNames";
import { Name } from "../models/types";

interface NameStore {
  names: Name[];
  favorites: Name[];
  lastDismissed: Name | null;
  setNames: (names: Name[]) => void;
  addToFavorites: (name: Name) => void;
  removeFromNames: (nameId: string) => void;
  setLastDismissed: (name: Name | null) => void;
  undoLastDismiss: (name: Name) => void;
  initializeNames: () => void;
  updateRating: (nameId: string, rating: number) => void;
}

export const useNameStore = create<NameStore>()(
  persist(
    (set, get) => ({
      names: [],
      favorites: [],
      lastDismissed: null,

      initializeNames: async () => {
        const existingNames = get().names;
        if (existingNames.length === 0) {
          set({ names: allMockNames });
        }
      },

      setNames: (names) => set({ names }),

      addToFavorites: (name) =>
        set((state) => ({
          favorites: [...state.favorites, name],
        })),

      removeFromNames: (nameId) =>
        set((state) => ({
          names: state.names.filter((name) => name.id !== nameId),
        })),

      setLastDismissed: (name) => set({ lastDismissed: name }),

      undoLastDismiss: (name) =>
        set((state) => ({
          names: [name, ...state.names],
          lastDismissed: null,
        })),

      updateRating: (nameId: string, rating: number) =>
        set((state) => ({
          favorites: state.favorites.map((name) =>
            name.id === nameId ? { ...name, rating } : name
          ),
        })),
    }),
    {
      name: "stork-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
