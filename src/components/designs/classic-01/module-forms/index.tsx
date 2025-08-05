import { ModuleForm as BrideModuleForm } from "./bride";
import { ModuleForm as ClosingModuleForm } from "./closing";
import { ModuleForm as CoverModuleForm } from "./cover";
import { ModuleForm as GalleryModuleForm } from "./gallery";
import { ModuleForm as GroomModuleForm } from "./groom";
import { ModuleForm as LokasiModuleForm } from "./location";
import { ModuleForm as OpeningModuleForm } from "./opening";
import { ModuleForm as QuotesModuleForm } from "./quotes";
import { ModuleForm as RSVPModuleForm } from "./rsvp";
import { ModuleForm as WaktuModuleForm } from "./time";
import { ModuleForm as WeddingGiftModuleForm } from "./wedding-gift";
import { ModuleForm as WeddingWishesModuleForm } from "./wedding-wishes";

const moduleFormsClassic01 = {
	Cover: CoverModuleForm,
	Opening: OpeningModuleForm,
	Bride: BrideModuleForm,
	Groom: GroomModuleForm,
	Gallery: GalleryModuleForm,
	Closing: ClosingModuleForm,
	Quotes: QuotesModuleForm,
	Waktu: WaktuModuleForm,
	Lokasi: LokasiModuleForm,
	RSVP: RSVPModuleForm,
	WeddingGift: WeddingGiftModuleForm,
	WeddingWishes: WeddingWishesModuleForm,
};

export default moduleFormsClassic01;
