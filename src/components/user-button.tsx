import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { auth } from "@/auth";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SignIn, SignOut } from "./auth-components";
import Link from "next/link";
import { UserIcon } from "lucide-react";

export default async function UserButton() {
	const session = await auth();
	if (!session?.user) return <SignIn />;

	return (
		<div className="flex gap-2 items-center">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative rounded-full" size="icon">
						<Avatar className="w-full h-full">
							<AvatarImage
								src={session.user.image ?? "/images/avatar_placeholder.png"}
								alt={session.user.name ?? ""}
							/>
							<AvatarFallback className="bg-muted/50 text-white">
								<UserIcon />
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">{session.user.name}</p>
							<p className="text-xs leading-none text-slate-500 dark:text-slate-400">
								{session.user.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link href="/member/dashboard">
						<DropdownMenuItem>Dashboard</DropdownMenuItem>
					</Link>
					<Link href="/terms">
						<DropdownMenuItem>Terms of Service</DropdownMenuItem>
					</Link>
					<Link href="/privacy">
						<DropdownMenuItem>Privacy Policy</DropdownMenuItem>
					</Link>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="focus:bg-transparent">
						<SignOut />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
