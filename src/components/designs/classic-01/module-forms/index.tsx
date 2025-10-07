import { ModuleForm as BrideModuleForm } from "./bride";
import { ModuleForm as ClosingModuleForm } from "./closing";
import { ModuleForm as CoverModuleForm } from "./cover";
import { ModuleForm as GalleryModuleForm } from "./gallery";
import { ModuleForm as GallerySlideshowModuleForm } from "./gallery-slideshow";
import { ModuleForm as GroomModuleForm } from "./groom";
import { ModuleForm as LokasiModuleForm } from "./location";
import { ModuleForm as OpeningModuleForm } from "./opening";
import { ModuleForm as RSVPModuleForm } from "./rsvp";
import { ModuleForm as WaktuModuleForm } from "./time";
import { ModuleForm as WeddingGiftModuleForm } from "./wedding-gift";
import { ModuleForm as WeddingWishesModuleForm } from "./wedding-wishes";
import { ModuleForm as QuotesModuleForm } from "./quotes";

const moduleFormsClassic01 = {
	Cover: CoverModuleForm,
	Opening: OpeningModuleForm,
	Bride: BrideModuleForm,
	Groom: GroomModuleForm,
	Gallery: GalleryModuleForm,
	GallerySlideshow: GallerySlideshowModuleForm,
	Closing: ClosingModuleForm,
	Waktu: WaktuModuleForm,
	Lokasi: LokasiModuleForm,
	RSVP: RSVPModuleForm,
	WeddingGift: WeddingGiftModuleForm,
	WeddingWishes: WeddingWishesModuleForm,
	Quotes: QuotesModuleForm,
};

export default moduleFormsClassic01;
