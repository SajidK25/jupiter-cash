import create from "zustand";

interface NavState {
  open: boolean;
  handleOpen: () => void;
}

const useNavStore = create<NavState>()((set) => ({
  open: false,
  handleOpen: () => set((state) => ({ open: !state.open })),
}));

export default useNavStore;
