import { Culture } from "@/lib/designs";

export const coverConfig = {
	schema: {
		title: "string",
		subtitle: "string",
		image1: "string",
	},
	defaultTexts: {
		islamic: {
			title: "Bismillahirrahmanirrahim",
			subtitle: "Dengan izin Allah, kami akan menikah",
			image1: "/designs/classic/couple.svg",
		},
		christian: {
			title: "In the Name of God",
			subtitle: "We invite you to our wedding celebration",
			image1: "/designs/classic/couple.svg",
		},
	} satisfies Partial<Record<Culture, Record<string, string>>>,
};
