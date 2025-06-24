"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { MainInvitation } from "@/components/main-invitation";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	// BreadcrumbPage,
	// BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useInvitations } from "@/hooks/use-invitations";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Page() {
	const { data: session, status } = useSession();
	const { activeInvitation, isLoading } = useInvitations();

	return (
		<SidebarProvider>
			<AppSidebar session={session} status={status} />
			<SidebarInset className="h-screen">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">Edit Modul</BreadcrumbLink>
								</BreadcrumbItem>
								{/* <BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Publish & Share</BreadcrumbPage>
								</BreadcrumbItem> */}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-screen overflow-hidden">
					<div className="bg-muted/50 flex-1 rounded-xl h-full overflow-scroll shadow-xl">
						{isLoading ? (
							<div className="flex items-center justify-center h-full">
								<Loader2 className="animate-spin h-8 w-8 mx-auto text-gray-500" />
							</div>
						) : (
							<MainInvitation invitation={activeInvitation}></MainInvitation>
						)}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
