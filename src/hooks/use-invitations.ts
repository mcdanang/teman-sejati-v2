"use client";

import * as React from "react";

import { useSession } from "next-auth/react";
import { DEFAULT_INVITATIONS } from "@/constants";
import { InvitationWithModules } from "@/types";
import { Module } from "@prisma/client";
import { useInvitationStore } from "@/stores/invitation-store";

const LOCAL_STORAGE_KEY = "teman-sejati:invitations";

export function useInvitations() {
	const { status } = useSession();
	const { activeInvitation, setActiveInvitation } = useInvitationStore();

	const [invitations, setInvitations] = React.useState<InvitationWithModules[]>([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	const loadGuestInvitations = () => {
		const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (stored) {
			const parsed: InvitationWithModules[] = JSON.parse(stored);
			setInvitations(parsed);
			// Only set active invitation if not already set or if current one is not in the list
			if (
				!activeInvitation ||
				!parsed.find((inv: InvitationWithModules) => inv.id === activeInvitation.id)
			) {
				setActiveInvitation(parsed[0]);
			}
		} else {
			setInvitations(DEFAULT_INVITATIONS);
			// Only set active invitation if not already set
			if (!activeInvitation) {
				setActiveInvitation(DEFAULT_INVITATIONS[0]);
			}
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_INVITATIONS));
		}
		setIsLoading(false);
	};

	const loadUserInvitations = async () => {
		try {
			const res = await fetch("/api/invitations");
			if (!res.ok) throw new Error("Gagal mengambil data undangan.");
			const data = await res.json();

			if (data.invitations.length === 0) {
				// No invitations found on DB
				const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
				let baseInvitation: InvitationWithModules;
				if (stored) {
					const parsed: InvitationWithModules[] = JSON.parse(stored);
					baseInvitation = parsed[0];
				} else {
					baseInvitation = DEFAULT_INVITATIONS[0];
				}

				const createRes = await fetch("/api/invitations", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						is_paid: baseInvitation.is_paid,
						is_published: baseInvitation.is_published,
						design: baseInvitation.design,
						desktop_bg: baseInvitation.desktop_bg,
						Modules: baseInvitation.Modules,
					}),
				});

				if (!createRes.ok) throw new Error("Gagal membuat undangan baru.");

				const newInvitation = await createRes.json();

				localStorage.removeItem(LOCAL_STORAGE_KEY);

				setInvitations([newInvitation]);
				// Only set if no active invitation exists
				if (!activeInvitation) {
					setActiveInvitation(newInvitation);
				}
			} else {
				setInvitations(data.invitations);
				// Only set active invitation if not already set or if current one is not in the list
				if (
					!activeInvitation ||
					!data.invitations.find((inv: InvitationWithModules) => inv.id === activeInvitation.id)
				) {
					setActiveInvitation(data.invitations[0]);
				}
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Terjadi kesalahan");
		} finally {
			setIsLoading(false);
		}
	};

	const updateModule = async (invitationId: string, updatedModule: Module) => {
		try {
			const updated = invitations.map(inv => {
				if (inv.id !== invitationId) return inv;

				const updatedModules = inv.Modules.map(mod =>
					mod.name === updatedModule.name ? { ...mod, content: updatedModule.content } : mod
				);

				return { ...inv, Modules: updatedModules as Module[] };
			});

			// Update state immediately for optimistic UI update
			setInvitations(updated as InvitationWithModules[]);
			const newActiveInvitation = updated.find(
				inv => inv.id === invitationId
			) as InvitationWithModules | null;
			setActiveInvitation(newActiveInvitation);

			// Save to backend/storage
			if (status === "unauthenticated") {
				await saveGuestInvitations(updated as InvitationWithModules[]);
			} else {
				await saveUserInvitationModule(updatedModule);
			}

			// Force a re-render by updating the active invitation again
			if (activeInvitation?.id === invitationId) {
				setActiveInvitation(newActiveInvitation);
			}
		} catch (error) {
			console.error("Error updating module:", error);
			// Revert state on error
			loadUserInvitations();
		}
	};

	const saveGuestInvitations = async (invs: InvitationWithModules[]) => {
		setInvitations(invs);
		// setActiveInvitation(invs[0] ?? null);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(invs));
	};

	const saveUserInvitationModule = async (updatedModule: Module) => {
		if (updatedModule) {
			await fetch(`/api/modules/${updatedModule.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedModule),
			});
		}
	};

	const createNewInvitation = async () => {
		try {
			if (status === "unauthenticated") {
				// For guest users, create a new invitation in localStorage
				const newInvitation: InvitationWithModules = {
					id: `guest-invitation-${Date.now()}`,
					user_id: "guest-user",
					slug: `undangan-${Date.now()}`,
					design: "classic-01",
					desktop_bg: "/designs/classic/bg.webp",
					background_music: null,
					index: invitations.length + 1,
					is_paid: false,
					is_published: false,
					created_at: new Date(),
					Modules: [
						{ order: 1, name: "Cover", url: "#", content: {} },
						{ order: 2, name: "Opening", url: "#", content: {} },
						{ order: 3, name: "Quotes", url: "#", content: {} },
						{ order: 4, name: "Mempelai Pria", url: "#", content: {} },
						{ order: 5, name: "Mempelai Wanita", url: "#", content: {} },
						{ order: 6, name: "Waktu", url: "#", content: {} },
						{ order: 7, name: "Lokasi", url: "#", content: {} },
						{ order: 8, name: "RSVP", url: "#", content: {} },
						{ order: 9, name: "Gallery", url: "#", content: {} },
						{ order: 10, name: "Wedding Gift", url: "#", content: {} },
						{ order: 11, name: "Wedding Wishes", url: "#", content: {} },
						{ order: 12, name: "Closing", url: "#", content: {} },
					],
				};

				const updatedInvitations = [...invitations, newInvitation];
				await saveGuestInvitations(updatedInvitations);
				setActiveInvitation(newInvitation);
			} else {
				// For authenticated users, create invitation via API
				const createRes = await fetch("/api/invitations", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						is_paid: false,
						is_published: false,
						design: "classic-01",
						desktop_bg: "/designs/classic/bg.webp",
						Modules: [
							{ order: 1, name: "Cover", url: "#", content: {} },
							{ order: 2, name: "Opening", url: "#", content: {} },
							{ order: 3, name: "Quotes", url: "#", content: {} },
							{ order: 4, name: "Mempelai Pria", url: "#", content: {} },
							{ order: 5, name: "Mempelai Wanita", url: "#", content: {} },
							{ order: 6, name: "Waktu", url: "#", content: {} },
							{ order: 7, name: "Lokasi", url: "#", content: {} },
							{ order: 8, name: "RSVP", url: "#", content: {} },
							{ order: 9, name: "Gallery", url: "#", content: {} },
							{ order: 10, name: "Wedding Gift", url: "#", content: {} },
							{ order: 11, name: "Wedding Wishes", url: "#", content: {} },
							{ order: 12, name: "Closing", url: "#", content: {} },
						],
					}),
				});

				if (!createRes.ok) throw new Error("Gagal membuat undangan baru.");

				const newInvitation = await createRes.json();
				const updatedInvitations = [...invitations, newInvitation];
				setInvitations(updatedInvitations);
				setActiveInvitation(newInvitation);
			}
		} catch (error) {
			console.error("Error creating new invitation:", error);
			setError(
				error instanceof Error ? error.message : "Terjadi kesalahan saat membuat undangan baru"
			);
		}
	};

	React.useEffect(() => {
		if (status === "loading") return;

		setIsLoading(true);

		if (status === "authenticated") {
			loadUserInvitations();
		} else {
			loadGuestInvitations();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status]);

	// const updateInvitation = (id: string, update: Partial<Invitation>) => {
	// 	const updated = invitations.map(inv => (inv.id === id ? { ...inv, ...update } : inv));
	// 	if (status === "unauthenticated") {
	// 		saveGuestInvitations(updated);
	// 	} else {
	// 		// You would normally send to API
	// 	}
	// };

	return {
		invitations,
		activeInvitation,
		setActiveInvitation,
		isLoading,
		error,
		updateModule,
		createNewInvitation,
		// updateInvitation,
		// saveGuestInvitations,
	};
}
