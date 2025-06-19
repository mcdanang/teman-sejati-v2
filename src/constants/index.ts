import { Invitation } from "@/types";
import {
	BookImage,
	Calendar,
	DoorClosed,
	DoorOpen,
	Gift,
	Images,
	ListCheck,
	Mail,
	Mails,
	Map,
	Mars,
	Quote,
	Venus,
} from "lucide-react";

// This is sample data.
export const INVITATIONS: Invitation[] = [
	{
		slug: "slug-undangan-anda",
		index: 1,
		is_paid: false,
		is_published: false,
		modules: [
			{
				order: 1,
				name: "Cover",
				url: "#",
				icon: BookImage,
			},
			{
				order: 2,
				name: "Opening",
				url: "#",
				icon: DoorOpen,
			},
			{
				order: 3,
				name: "Quotes",
				url: "#",
				icon: Quote,
			},
			{
				order: 4,
				name: "Mempelai Pria",
				url: "#",
				icon: Mars,
			},
			{
				order: 5,
				name: "Mempelai Wanita",
				url: "#",
				icon: Venus,
			},
			{
				order: 6,
				name: "Waktu",
				url: "#",
				icon: Calendar,
			},
			{
				order: 7,
				name: "Lokasi",
				url: "#",
				icon: Map,
			},
			{
				order: 8,
				name: "RSVP",
				url: "#",
				icon: ListCheck,
			},
			{
				order: 9,
				name: "Gallery",
				url: "#",
				icon: Images,
			},
			{
				order: 10,
				name: "Wedding Gift",
				url: "#",
				icon: Gift,
			},
			{
				order: 11,
				name: "Wedding Wishes",
				url: "#",
				icon: Mails,
			},
			{
				order: 12,
				name: "Closing",
				url: "#",
				icon: DoorClosed,
			},
		],
	},
	{
		slug: "slug-undangan-anda-2",
		index: 2,
		is_paid: true,
		is_published: false,
		modules: [
			{
				order: 1,
				name: "Cover",
				url: "#",
				icon: BookImage,
			},
			{
				order: 2,
				name: "Quotes",
				url: "#",
				icon: Quote,
			},
			{
				order: 3,
				name: "Mempelai Pria",
				url: "#",
				icon: Mars,
			},
			{
				order: 4,
				name: "Mempelai Wanita",
				url: "#",
				icon: Venus,
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

export const DEFAULT_INVITATIONS: Invitation[] = [
	{
		slug: "contoh-undangan",
		index: 1,
		is_paid: false,
		is_published: false,
		modules: [
			{ order: 1, name: "Cover", url: "#", icon: BookImage },
			{ order: 2, name: "Opening", url: "#", icon: DoorOpen },
			{ order: 3, name: "Quotes", url: "#", icon: Quote },
			{ order: 4, name: "Mempelai Pria", url: "#", icon: Mars },
			{ order: 5, name: "Mempelai Wanita", url: "#", icon: Venus },
			{ order: 6, name: "Waktu", url: "#", icon: Calendar },
			{ order: 7, name: "Lokasi", url: "#", icon: Map },
			{ order: 8, name: "RSVP", url: "#", icon: ListCheck },
			{ order: 9, name: "Gallery", url: "#", icon: Images },
			{ order: 10, name: "Wedding Gift", url: "#", icon: Gift },
			{ order: 11, name: "Wedding Wishes", url: "#", icon: Mails },
			{ order: 12, name: "Closing", url: "#", icon: DoorClosed },
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
