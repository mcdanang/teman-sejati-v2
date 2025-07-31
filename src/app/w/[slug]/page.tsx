"use client";

import { MainInvitation } from "@/components/main-invitation";
import { InvitationWithModules } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
	const { slug } = useParams();
	const [isLoading, setLoading] = useState(true);
	const [activeInvitation, setActiveInvitation] = useState<InvitationWithModules | null>(null);

	// Fetch user's invitations
	useEffect(() => {
		setLoading(true);
		fetch(`/api/invitations/${slug}`)
			.then(res => res.json())
			.then(data => {
				setActiveInvitation(data);
			})
			.catch(error => {
				console.error("Error fetching invitations:", error);
				toast.error("Gagal memuat undangan");
			})
			.finally(() => setLoading(false));
	}, [slug]);

	if (isLoading)
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				<Image src="/images/logo3.svg" alt="Logo Teman Sejati" width={200} height={200} />
				<Loader2 className="animate-spin h-8 w-8 mx-auto text-primary" />
				<p className="text-sm text-muted-foreground">Memuat undangan...</p>
			</div>
		);

	return <MainInvitation activeInvitation={activeInvitation}></MainInvitation>;
}
