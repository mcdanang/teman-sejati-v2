"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { InvitationWithModules } from "@/types";

export function InvitationSwitcher({
	invitations,
	activeInvitation,
	setActiveInvitation,
}: {
	invitations: InvitationWithModules[];
	activeInvitation: InvitationWithModules;
	setActiveInvitation: React.Dispatch<React.SetStateAction<InvitationWithModules | null>>;
}) {
	const { isMobile } = useSidebar();

	if (!activeInvitation) {
		return null;
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								#{activeInvitation.index}
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{activeInvitation.slug}</span>
								<span className="truncate text-xs">{activeInvitation.is_paid}</span>
								<span className="truncate text-xs">{activeInvitation.is_published}</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Pilih Undangan
						</DropdownMenuLabel>
						{invitations.map(invitation => (
							<DropdownMenuItem
								key={invitation.slug}
								onClick={() => setActiveInvitation(invitation)}
								className="gap-2 p-2"
							>
								{invitation.slug}
								<DropdownMenuShortcut>#{invitation.index}</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2 text-accent">
							<Plus className="size-4" />
							<div>Tambah undangan</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
