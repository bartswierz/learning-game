import { create } from "zustand";

interface Store {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const useCounterStore = create<Store>((set) => ({
  count: 10,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useCounterStore;
