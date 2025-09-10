import { Data as CoverData } from "@/components/module-form/cover";
import { Data as OpeningData } from "@/components/module-form/opening";
import { Data as QuotesData } from "@/components/module-form/quotes";
import { Data as GroomData } from "@/components/module-form/groom";
import { Data as BrideData } from "@/components/module-form/bride";
import { Data as WaktuData } from "@/components/module-form/time";
import { Data as LokasiData } from "@/components/module-form/location";
import { Data as RSVPData } from "@/components/module-form/rsvp";
import { Data as GalleryData } from "@/components/module-form/gallery";
import { Data as WeddingGiftData } from "@/components/module-form/wedding-gift";
import { Data as WeddingWishesData } from "@/components/module-form/wedding-wishes";
import { Data as ClosingData } from "@/components/module-form/closing";
import { Invitation, Prisma } from "@prisma/client";

export type InvitationWithModules = Invitation & {
	Modules: Prisma.ModuleCreateWithoutInvitationInput[];
};

export type ModuleData =
	| CoverData
	| OpeningData
	| QuotesData
	| GroomData
	| BrideData
	| WaktuData
	| LokasiData
	| RSVPData
	| GalleryData
	| WeddingGiftData
	| WeddingWishesData
	| ClosingData;

export type ModuleDefinition = React.FC<{
	data: ModuleData;
	invitationId: string;
}>;

export type FormDefinition = React.FC<{
	activeInvitation: InvitationWithModules;
}>;

export type ModuleName =
	| "Cover"
	| "Opening"
	| "Quotes"
	| "Mempelai Pria"
	| "Mempelai Wanita"
	| "Waktu"
	| "Lokasi"
	| "RSVP"
	| "Gallery"
	| "Wedding Gift"
	| "Wedding Wishes"
	| "Closing";

export type DesignDefinition = {
	id: string;
	name: string;
	modules: Partial<Record<ModuleName, ModuleDefinition>>;
	forms: Partial<Record<ModuleName, FormDefinition>>;
};
