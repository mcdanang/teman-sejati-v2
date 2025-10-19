import { DesignDefinition } from "@/types";
import modulesClassic01 from "@/components/designs/classic-01/modules";
import moduleFormsClassic01 from "@/components/designs/classic-01/module-forms";
import modulesClassic02 from "@/components/designs/classic-02/modules";
import moduleFormsClassic02 from "@/components/designs/classic-02/module-forms";

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
	GallerySlideshow,
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
	GallerySlideshow: GallerySlideshowModuleForm,
	WeddingGift: WeddingGiftModuleForm,
	WeddingWishes: WeddingWishesModuleForm,
	Closing: ClosingModuleForm,
} = moduleFormsClassic01;

const {
	Opening: Opening2,
	Quotes: Quotes2,
	Groom: Groom2,
	Bride: Bride2,
	Waktu: Waktu2,
	Lokasi: Lokasi2,
	Closing: Closing2,
} = modulesClassic02;

const {
	Opening: OpeningModuleForm2,
	Quotes: QuotesModuleForm2,
	Groom: GroomModuleForm2,
	Bride: BrideModuleForm2,
	Waktu: WaktuModuleForm2,
	Lokasi: LokasiModuleForm2,
	Closing: ClosingModuleForm2,
} = moduleFormsClassic02;

export const designs: Record<string, DesignDefinition> = {
	"classic-01": {
		id: "classic-01",
		name: "Classic 1",
		modules: {
			Cover: Cover,
			Opening: Opening,
			Quotes: Quotes,
			"Gallery Slideshow": GallerySlideshow,
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
			"Gallery Slideshow": GallerySlideshowModuleForm,
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
	"classic-02": {
		id: "classic-02",
		name: "Classic 2",
		modules: {
			Opening: Opening2,
			Quotes: Quotes2,
			"Mempelai Pria": Groom2,
			"Mempelai Wanita": Bride2,
			Waktu: Waktu2,
			Lokasi: Lokasi2,
			Closing: Closing2,
		},
		forms: {
			Opening: OpeningModuleForm2,
			Quotes: QuotesModuleForm2,
			"Mempelai Pria": GroomModuleForm2,
			"Mempelai Wanita": BrideModuleForm2,
			Waktu: WaktuModuleForm2,
			Lokasi: LokasiModuleForm2,
			Closing: ClosingModuleForm2,
		},
	},
};

export type DesignId = keyof typeof designs;
export type DesignKey = DesignId;
export type ModuleKey = keyof (typeof designs)[DesignId]["modules"];

// Re-export types from @/types for convenience
export type { DesignDefinition, ModuleDefinition } from "@/types";
