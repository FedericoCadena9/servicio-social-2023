import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCounterStore = create(
  persist(
    (set, get) => ({
      count: 0,
      increment: (value) => set({ count: get().count + value }),
    }),
    {
      name: "counter-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
