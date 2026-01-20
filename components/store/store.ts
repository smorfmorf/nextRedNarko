import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Store {
  activeId: number;
  setActiveId: (id: number) => void;
}

export const useCategoryStore = create<Store>()(
  immer((set) => ({
    activeId: 0,

    setActiveId(id: number) {
      set((state) => {
        state.activeId = id;
      });
    },
  }))
);
