import { create } from "zustand";

type PortfolioStore = {
  unlocked: boolean;
  setUnlocked: () => void;
  openApp: string | null;
  setOpenApp: (app: string | null) => void;
};

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  unlocked: false,
  setUnlocked: () => set({ unlocked: true }),
  openApp: null,
  setOpenApp: (app) => set({ openApp: app }),
}));
