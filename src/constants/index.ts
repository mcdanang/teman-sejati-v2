import { InvitationWithModules } from "@/types";
import { Mail } from "lucide-react";

export const DEFAULT_INVITATIONS: InvitationWithModules[] = [
	{
		id: "default-invitation-1",
		user_id: "default-user-1",
		slug: "contoh-undangan",
		design: "classic-01",
		desktop_bg: "/designs/classic/bg.webp",
		index: 1,
		is_paid: false,
		is_published: false,
		created_at: new Date(),
		Modules: [
			{ order: 1, name: "Cover", url: "#", content: {} },
			{ order: 2, name: "Opening", url: "#", content: {} },
			{ order: 3, name: "Quotes", url: "#", content: {} },
			{ order: 4, name: "Mempelai Pria", url: "#", content: {} },
			{ order: 5, name: "Mempelai Wanita", url: "#", content: {} },
			{ order: 6, name: "Waktu", url: "#", content: {} },
			{ order: 7, name: "Lokasi", url: "#", content: {} },
			{ order: 8, name: "RSVP", url: "#", content: {} },
			{ order: 9, name: "Gallery", url: "#", content: {} },
			{ order: 10, name: "Wedding Gift", url: "#", content: {} },
			{ order: 11, name: "Wedding Wishes", url: "#", content: {} },
			{ order: 12, name: "Closing", url: "#", content: {} },
		],
	},
];

export const NAV_MAIN = [
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
];
