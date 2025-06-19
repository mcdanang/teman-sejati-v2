"use client";

import * as React from "react";
import { Invitation } from "@/types";

import { useSession } from "next-auth/react";
import { DEFAULT_INVITATIONS } from "@/constants";

const LOCAL_STORAGE_KEY = "teman-sejati:invitations";

export function useInvitations() {
	const { status } = useSession();

	const [invitations, setInvitations] = React.useState<Invitation[]>([]);
	const [activeInvitation, setActiveInvitation] = React.useState<Invitation | null>(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState<string | null>(null);

	const loadGuestInvitations = () => {
		const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (stored) {
			const parsed: Invitation[] = JSON.parse(stored);
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
			const res = await fetch("/api/member/invitations");
			if (!res.ok) throw new Error("Gagal mengambil data undangan.");
			const data = await res.json();

			if (data.invitations.length === 0) {
				console.log("No invitations found. Creating new one...");

				const createRes = await fetch("/api/member/invitations", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						// default invitation payload — update as needed
						slug: "undangan-pertama-anda",
						is_paid: false,
						is_published: false,
					}),
				});

				if (!createRes.ok) throw new Error("Gagal membuat undangan baru.");

				const newInvitation = await createRes.json();

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

	const saveGuestInvitations = (invs: Invitation[]) => {
		setInvitations(invs);
		setActiveInvitation(invs[0] ?? null);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(invs));
	};

	const updateInvitation = (index: number, update: Partial<Invitation>) => {
		const updated = invitations.map(inv => (inv.index === index ? { ...inv, ...update } : inv));
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
