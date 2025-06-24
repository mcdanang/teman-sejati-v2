import {
	BookImage,
	Calendar,
	DoorClosed,
	DoorOpen,
	Gift,
	Images,
	ListCheck,
	LucideProps,
	Mails,
	Map,
	Mars,
	Quote,
	Venus,
} from "lucide-react";

export function getModuleIcon(
	name: string
):
	| React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
	| undefined {
	switch (name) {
		case "Cover":
			return BookImage;
		case "Opening":
			return DoorOpen;
		case "Quotes":
			return Quote;
		case "Mempelai Pria":
			return Mars;
		case "Mempelai Wanita":
			return Venus;
		case "Waktu":
			return Calendar;
		case "Lokasi":
			return Map;
		case "RSVP":
			return ListCheck;
		case "Gallery":
			return Images;
		case "Wedding Gift":
			return Gift;
		case "Wedding Wishes":
			return Mails;
		case "Closing":
			return DoorClosed;
		default:
			return undefined;
	}
}

export async function getUniqueSlug(baseSlug: string): Promise<string> {
	let slug = baseSlug;
	slug = `${slug}-${Date.now()}`;
	return slug;
}
