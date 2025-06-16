import { Culture } from "@/lib/designs";

export const photoGalleryConfig = {
	schema: {
		title: "string",
		photos: "array",
	},
	defaultTexts: {
		islamic: {
			title: "Photo Gallery",
			photos: [
				"/designs/classic/photo1.jpg",
				"/designs/classic/photo2.jpg",
				"/designs/classic/photo3.jpg",
				"/designs/classic/photo4.jpg",
				"/designs/classic/photo5.jpg",
				"/designs/classic/photo6.jpg",
				"/designs/classic/photo7.jpg",
			],
		},
		christian: {
			title: "Photo Gallery",
			photos: [
				"/designs/classic/photo1.jpg",
				"/designs/classic/photo2.jpg",
				"/designs/classic/photo3.jpg",
				"/designs/classic/photo4.jpg",
				"/designs/classic/photo5.jpg",
				"/designs/classic/photo6.jpg",
				"/designs/classic/photo7.jpg",
			],
		},
	} satisfies Partial<Record<Culture, Record<string, string | string[]>>>,
};
