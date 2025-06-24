import { InvitationWithModules } from "@/types";
import { Mail } from "lucide-react";

// This is sample data.
export const INVITATIONS: InvitationWithModules[] = [
	{
		id: "invitation-1",
		user_id: "user-1",
		slug: "slug-undangan-anda",
		index: 1,
		is_paid: false,
		is_published: false,
		created_at: new Date("2023-01-01T00:00:00Z"),
		Modules: [
			{
				order: 1,
				name: "Cover",
				url: "#",
			},
			{
				order: 2,
				name: "Opening",
				url: "#",
			},
			{
				order: 3,
				name: "Quotes",
				url: "#",
			},
			{
				order: 4,
				name: "Mempelai Pria",
				url: "#",
			},
			{
				order: 5,
				name: "Mempelai Wanita",
				url: "#",
			},
			{
				order: 6,
				name: "Waktu",
				url: "#",
			},
			{
				order: 7,
				name: "Lokasi",
				url: "#",
			},
			{
				order: 8,
				name: "RSVP",
				url: "#",
			},
			{
				order: 9,
				name: "Gallery",
				url: "#",
			},
			{
				order: 10,
				name: "Wedding Gift",
				url: "#",
			},
			{
				order: 11,
				name: "Wedding Wishes",
				url: "#",
			},
			{
				order: 12,
				name: "Closing",
				url: "#",
			},
		],
	},
	{
		id: "invitation-2",
		user_id: "user-2",
		slug: "slug-undangan-anda-2",
		index: 2,
		is_paid: true,
		is_published: false,
		created_at: new Date("2023-02-01T00:00:00Z"),
		Modules: [
			{
				order: 1,
				name: "Cover",
				url: "#",
			},
			{
				order: 2,
				name: "Opening",
				url: "#",
			},
			{
				order: 3,
				name: "Quotes",
				url: "#",
			},
		],
	},
	// {
	// 	slug: "slug-undangan-anda-3",
	// 	index: 3,
	// 	is_paid: true,
	// 	is_published: true,
	// },
];

export const DEFAULT_INVITATIONS: InvitationWithModules[] = [
	{
		id: "default-invitation-1",
		user_id: "default-user-1",
		slug: "contoh-undangan",
		index: 1,
		is_paid: false,
		is_published: false,
		created_at: new Date(),
		Modules: [
			{ order: 1, name: "Cover", url: "#" },
			{ order: 2, name: "Opening", url: "#" },
			{ order: 3, name: "Quotes", url: "#" },
			{ order: 4, name: "Mempelai Pria", url: "#" },
			{ order: 5, name: "Mempelai Wanita", url: "#" },
			{ order: 6, name: "Waktu", url: "#" },
			{ order: 7, name: "Lokasi", url: "#" },
			{ order: 8, name: "RSVP", url: "#" },
			{ order: 9, name: "Gallery", url: "#" },
			{ order: 10, name: "Wedding Gift", url: "#" },
			{ order: 11, name: "Wedding Wishes", url: "#" },
			{ order: 12, name: "Closing", url: "#" },
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
