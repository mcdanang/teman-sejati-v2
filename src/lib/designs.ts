import { DesignDefinition } from "@/types";
import modulesClassic01 from "@/components/designs/classic-01/modules";
import moduleFormsClassic01 from "@/components/designs/classic-01/module-forms";

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

const {
	Cover: CoverModuleForm,
	Opening: OpeningModuleForm,
	Quotes: QuotesModuleForm,
	Groom: GroomModuleForm,
	Bride: BrideModuleForm,
	Waktu: WaktuModuleForm,
	Lokasi: LokasiModuleForm,
	RSVP: RSVPModuleForm,
	Gallery: GalleryModuleForm,
	WeddingGift: WeddingGiftModuleForm,
	WeddingWishes: WeddingWishesModuleForm,
	Closing: ClosingModuleForm,
} = moduleFormsClassic01;

export const designs: Record<string, DesignDefinition> = {
	"classic-01": {
		id: "classic-01",
		name: "Classic 1",
		modules: {
			Cover: Cover,
			Opening: Opening,
			Quotes: Quotes,
			"Mempelai Pria": Groom,
			"Mempelai Wanita": Bride,
			Waktu: Waktu,
			Lokasi: Lokasi,
			RSVP: RSVP,
			Gallery: Gallery,
			"Wedding Gift": WeddingGift,
			"Wedding Wishes": WeddingWishes,
			Closing: Closing,
		},
		forms: {
			Cover: CoverModuleForm,
			Opening: OpeningModuleForm,
			Quotes: QuotesModuleForm,
			"Mempelai Pria": GroomModuleForm,
			"Mempelai Wanita": BrideModuleForm,
			Waktu: WaktuModuleForm,
			Lokasi: LokasiModuleForm,
			RSVP: RSVPModuleForm,
			Gallery: GalleryModuleForm,
			"Wedding Gift": WeddingGiftModuleForm,
			"Wedding Wishes": WeddingWishesModuleForm,
			Closing: ClosingModuleForm,
		},
	},
};

export type DesignId = keyof typeof designs;
export type DesignKey = DesignId;
export type ModuleKey = keyof (typeof designs)[DesignId]["modules"];
