import { DesignDefinition } from "@/types";
import modulesClassic01 from "@/components/designs/classic-01/modules";

const {
	Cover,
	Opening,
	Quotes,
	Groom,
	Bride,
	Waktu,
	Lokasi,
	RSVP,
	Gallery,
	WeddingGift,
	WeddingWishes,
	Closing,
} = modulesClassic01;

export const designs: Record<string, DesignDefinition> = {
	"classic-01": {
		id: "classic-01",
		name: "Classic 1",
		modules: {
			Cover: { Component: Cover },
			Opening: { Component: Opening },
			Quotes: { Component: Quotes },
			"Mempelai Pria": { Component: Groom },
			"Mempelai Wanita": { Component: Bride },
			Waktu: { Component: Waktu },
			Lokasi: { Component: Lokasi },
			RSVP: { Component: RSVP },
			Gallery: { Component: Gallery },
			"Wedding Gift": { Component: WeddingGift },
			"Wedding Wishes": { Component: WeddingWishes },
			Closing: { Component: Closing },
		},
	},
};

export type DesignId = keyof typeof designs;
