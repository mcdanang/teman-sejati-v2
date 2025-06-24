"use client";

import * as React from "react";

import { useSession } from "next-auth/react";
import { DEFAULT_INVITATIONS } from "@/constants";
import { Invitation } from "@prisma/client";
import { InvitationWithModules } from "@/types";

const LOCAL_STORAGE_KEY = "teman-sejati:invitations";

export function useInvitations() {
	const { status } = useSession();

	const [invitations, setInvitations] = React.useState<InvitationWithModules[]>([]);
	const [activeInvitation, setActiveInvitation] = React.useState<InvitationWithModules | null>(
		null
	);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	const loadGuestInvitations = () => {
		const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (stored) {
			const parsed: InvitationWithModules[] = JSON.parse(stored);
			setInvitations(parsed);
			setActiveInvitation(parsed[0]);
		} else {
			setInvitations(DEFAULT_INVITATIONS);
			setActiveInvitation(DEFAULT_INVITATIONS[0]);
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
						Modules: baseInvitation.Modules.map(mod => ({
							order: mod.order,
							name: mod.name,
							url: mod.url,
						})),
					}),
				});

				if (!createRes.ok) throw new Error("Gagal membuat undangan baru.");

				const newInvitation = await createRes.json();

				localStorage.removeItem(LOCAL_STORAGE_KEY);

				setInvitations([newInvitation]);
				setActiveInvitation(newInvitation);
			} else {
				setInvitations(data.invitations);
				setActiveInvitation(data.invitations[0]);
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Terjadi kesalahan");
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		console.log("useInvitations: status", status);
		if (status === "loading") return;

		setIsLoading(true);

		if (status === "authenticated") {
			loadUserInvitations();
		} else {
			loadGuestInvitations();
		}
	}, [status]);

	const saveGuestInvitations = (invs: InvitationWithModules[]) => {
		setInvitations(invs);
		setActiveInvitation(invs[0] ?? null);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(invs));
	};

	const updateInvitation = (id: string, update: Partial<Invitation>) => {
		const updated = invitations.map(inv => (inv.id === id ? { ...inv, ...update } : inv));
		if (status === "unauthenticated") {
			saveGuestInvitations(updated);
		} else {
			// You would normally send to API
		}
	};

	return {
		invitations,
		activeInvitation,
		setActiveInvitation,
		isLoading,
		error,
		updateInvitation,
		saveGuestInvitations,
	};
}
