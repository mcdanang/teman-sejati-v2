import { create } from "zustand";

interface CoverState {
	isMovedUp: boolean;
	setIsMovedUp: (moved: boolean) => void;
	reset: () => void;
}

export const useCoverStore = create<CoverState>(set => ({
	isMovedUp: false,
	setIsMovedUp: moved => set({ isMovedUp: moved }),
	reset: () => set({ isMovedUp: false }),
}));
