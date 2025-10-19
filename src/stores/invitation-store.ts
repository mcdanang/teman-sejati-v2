import { create } from "zustand";
import { InvitationWithModules } from "@/types";

interface InvitationState {
	activeInvitation: InvitationWithModules | null;
	setActiveInvitation: (invitation: InvitationWithModules | null) => void;
	reset: () => void;
}

export const useInvitationStore = create<InvitationState>(set => ({
	activeInvitation: null,
	setActiveInvitation: invitation => set({ activeInvitation: invitation }),
	reset: () => set({ activeInvitation: null }),
}));
