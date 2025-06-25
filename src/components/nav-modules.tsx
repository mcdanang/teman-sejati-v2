"use client";

import { ArrowDown, ArrowUp, Eye, MoreHorizontal, Plus, Trash2 } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { getModuleIcon } from "@/helper";
import { useSession } from "next-auth/react";

export function NavModules({
	modules,
}: {
	modules: {
		name: string;
		url: string;
	}[];
}) {
	const { isMobile } = useSidebar();
	const { status } = useSession();

	const handleScroll = (id: string) => {
		const target = document.getElementById(id);
		if (target) {
			target.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Edit Modul</SidebarGroupLabel>
			<SidebarMenu>
				{modules?.map(mod => {
					const Icon = getModuleIcon(mod.name);
					const id = mod.name.replace(/\s+/g, "");
					return (
						<SidebarMenuItem key={mod.name}>
							<SidebarMenuButton onClick={() => handleScroll(id)} className="cursor-pointer">
								{Icon ? <Icon /> : null}
								<span>{mod.name}</span>
							</SidebarMenuButton>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<SidebarMenuAction showOnHover>
										<MoreHorizontal />
										<span className="sr-only">More</span>
									</SidebarMenuAction>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									className="w-48 rounded-lg"
									side={isMobile ? "bottom" : "right"}
									align={isMobile ? "end" : "start"}
								>
									<DropdownMenuItem onClick={() => handleScroll(id)}>
										<Eye className="text-muted-foreground" />
										<span>Lihat Modul</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<ArrowUp className="text-muted-foreground" />
										<span>Geser ke Atas</span>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<ArrowDown className="text-muted-foreground" />
										<span>Geser ke Bawah</span>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<Trash2 className="text-muted-foreground" />
										<span>Hapus Modul</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</SidebarMenuItem>
					);
				})}
				{status === "authenticated" && (
					<SidebarMenuItem>
						<SidebarMenuButton className="cursor-pointer text-accent hover:text-accent">
							<Plus />
							<span>Tambah modul</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				)}
			</SidebarMenu>
		</SidebarGroup>
	);
}
