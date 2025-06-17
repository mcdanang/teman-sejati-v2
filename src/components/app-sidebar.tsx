"use client";
import { signIn } from "next-auth/react";
import * as React from "react";
import {
	BookImage,
	Calendar,
	DoorClosed,
	DoorOpen,
	Gift,
	Images,
	ListCheck,
	LogIn,
	Mail,
	Mails,
	Map,
	Mars,
	Quote,
	Venus,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavModules } from "@/components/nav-modules";
import { NavUser } from "@/components/nav-user";
import { InvitationSwitcher } from "@/components/invitation-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarRail,
	useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import Image from "next/image";

// This is sample data.
const data = {
	invitations: [
		{
			slug: "slug-undangan-anda",
			index: 1,
			is_paid: false,
			is_published: false,
		},
		{
			slug: "slug-undangan-anda-2",
			index: 2,
			is_paid: true,
			is_published: false,
		},
		{
			slug: "slug-undangan-anda-3",
			index: 3,
			is_paid: true,
			is_published: true,
		},
	],
	navMain: [
		{
			title: "Undangan",
			url: "#",
			icon: Mail,
			isActive: true,
			items: [
				{
					title: "Publish & Share",
					url: "#",
				},
				{
					title: "Template Desain",
					url: "#",
				},
				{
					title: "Data RSVP",
					url: "#",
				},
				{
					title: "Data Wedding Gift",
					url: "#",
				},
				{
					title: "Data Wedding Wishes",
					url: "#",
				},
			],
		},
	],
	modules: [
		{
			name: "Cover",
			url: "#",
			icon: BookImage,
		},
		{
			name: "Opening",
			url: "#",
			icon: DoorOpen,
		},
		{
			name: "Quotes",
			url: "#",
			icon: Quote,
		},
		{
			name: "Mempelai Pria",
			url: "#",
			icon: Mars,
		},
		{
			name: "Mempelai Wanita",
			url: "#",
			icon: Venus,
		},
		{
			name: "Waktu",
			url: "#",
			icon: Calendar,
		},
		{
			name: "Lokasi",
			url: "#",
			icon: Map,
		},
		{
			name: "RSVP",
			url: "#",
			icon: ListCheck,
		},
		{
			name: "Gallery",
			url: "#",
			icon: Images,
		},
		{
			name: "Wedding Gift",
			url: "#",
			icon: Gift,
		},
		{
			name: "Wedding Wishes",
			url: "#",
			icon: Mails,
		},
		{
			name: "Closing",
			url: "#",
			icon: DoorClosed,
		},
	],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	session: Session | null;
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
	const { open } = useSidebar();

	console.log("open", open);
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="flex items-center">
				<Link className="flex px-2 py-1 gap-3" href="/">
					<Image src={"/images/logo1.svg"} alt="logo" width={120} height={120} />
				</Link>
				{session?.user ? (
					<InvitationSwitcher invitations={data.invitations} />
				) : (
					<SidebarMenu>
						<SidebarMenuItem>
							<SignInWithProvider open={open} provider="google" />
						</SidebarMenuItem>
					</SidebarMenu>
				)}
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavModules modules={data.modules} />
			</SidebarContent>
			<SidebarFooter>
				{session?.user && (
					<NavUser
						user={{
							name: session.user.name ?? "",
							email: session.user.email ?? "",
							avatar: session.user.image ?? "/avatars/default.png",
						}}
					/>
				)}
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}

interface SignInWithProviderProps extends React.ComponentPropsWithRef<typeof Button> {
	provider?: string;
	open?: boolean;
}

function SignInWithProvider({ provider, open, ...props }: SignInWithProviderProps) {
	return (
		<form
			action={async () => {
				await signIn(provider, { callbackUrl: "/builder" });
			}}
		>
			<Button {...props} size={open ? "default" : "icon"} className="w-full flex">
				<LogIn className="data-[state=open]:mr-2 size-4" />
				{open && (
					<div className="gap-0 flex">
						Login dengan <span className="capitalize">&nbsp;{provider}</span>
					</div>
				)}
			</Button>
		</form>
	);
}
