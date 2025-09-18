"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useInvitations } from "@/hooks/use-invitations";
import { WeddingWishesDisplay } from "@/components/wedding-wishes-display";
import { InvitationWithModules } from "@/types";

export default function Page() {
	const { data: session, status } = useSession();
	const [invitation, setInvitation] = useState<InvitationWithModules | null>(null);
	const [loading, setLoading] = useState(true);
	const { activeInvitation } = useInvitations();

	// Fetch user's invitations
	useEffect(() => {
		if (!session?.user?.id) return;
		setLoading(true);
		if (!activeInvitation) return;
		fetch(`/api/invitations/${activeInvitation?.slug}`)
			.then(res => res.json())
			.then(data => {
				setInvitation(data);
			})
			.catch(error => {
				console.error("Error fetching invitations:", error);
			})
			.finally(() => setLoading(false));
	}, [session?.user?.id, activeInvitation]);

	return (
		<SidebarProvider>
			<AppSidebar session={session} status={status} />
			<SidebarInset className="h-full">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbPage>Undangan</BreadcrumbPage>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Wedding Wishes</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full overflow-hidden">
					<div className="bg-white flex-1 rounded-xl h-full overflow-scroll shadow-xl p-6">
						<div className="flex items-center justify-between mb-6">
							<div>
								<h2 className="text-xl font-semibold">Wedding Wishes</h2>
								<p className="text-sm text-muted-foreground mt-1">
									View heartfelt messages and wishes from your wedding guests
								</p>
							</div>
						</div>
						<Separator className="mb-6" />

						{loading ? (
							<div className="flex items-center justify-center h-[70vh]">
								<span>Loading invitation...</span>
							</div>
						) : !invitation ? (
							<div className="text-center py-12">
								<div className="text-muted-foreground mb-4">
									<h3 className="text-lg font-medium mb-2">No invitation found</h3>
									<p className="text-sm">Create an invitation first to view wedding wishes.</p>
								</div>
							</div>
						) : (
							<WeddingWishesDisplay invitationId={invitation.id} />
						)}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
