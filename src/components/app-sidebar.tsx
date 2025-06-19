"use client";
import { signIn } from "next-auth/react";
import * as React from "react";
import { LogIn } from "lucide-react";

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
import { NAV_MAIN } from "@/constants";
import { useInvitations } from "@/hooks/use-invitations";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	session: Session | null;
}

export function AppSidebar({ session, ...props }: AppSidebarProps) {
	const { open } = useSidebar();
	const { invitations, activeInvitation, setActiveInvitation } = useInvitations();
	// const [activeInvitation, setActiveInvitation] = React.useState(DATA.invitations[0]);

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="flex items-center">
				<Link className="flex px-2 py-1 gap-3" href="/">
					<Image src={"/images/logo1.svg"} alt="logo" width={120} height={120} />
				</Link>
				{session?.user ? (
					activeInvitation ? (
						<InvitationSwitcher
							invitations={invitations}
							activeInvitation={activeInvitation}
							setActiveInvitation={setActiveInvitation}
						/>
					) : null
				) : (
					<SidebarMenu>
						<SidebarMenuItem>
							<SignInWithProvider open={open} provider="google" />
						</SidebarMenuItem>
					</SidebarMenu>
				)}
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={NAV_MAIN} />
				{activeInvitation && <NavModules modules={activeInvitation.modules} />}
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
				await signIn(provider, { callbackUrl: "/editor" });
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
