import { InvitationWithModules, ModuleName } from "@/types";
import { ModuleForm as CoverModuleForm } from "./cover";
import { ModuleForm as OpeningModuleForm } from "./opening";
import { ModuleForm as QuotesModuleForm } from "./quotes";
import { ModuleForm as GroomModuleForm } from "./groom";
import { ModuleForm as BrideModuleForm } from "./bride";
import { ModuleForm as TimeModuleForm } from "./time";
import { ModuleForm as LocationModuleForm } from "./location";
import { ModuleForm as RSVPModuleForm } from "./rsvp";
import { ModuleForm as GalleryModuleForm } from "./gallery";
import { ModuleForm as WeddingGiftModuleForm } from "./wedding-gift";
import { ModuleForm as WeddingWishesModuleForm } from "./wedding-wishes";
import { ModuleForm as ClosingModuleForm } from "./closing";

export function ModuleForm({
	moduleName,
	activeInvitation,
}: {
	moduleName: ModuleName;
	activeInvitation: InvitationWithModules;
}) {
	switch (moduleName) {
		case "Cover":
			return <CoverModuleForm activeInvitation={activeInvitation} />;
		case "Opening":
			return <OpeningModuleForm activeInvitation={activeInvitation} />;
		case "Quotes":
			return <QuotesModuleForm activeInvitation={activeInvitation} />;
		case "Mempelai Pria":
			return <GroomModuleForm activeInvitation={activeInvitation} />;
		case "Mempelai Wanita":
			return <BrideModuleForm activeInvitation={activeInvitation} />;
		case "Waktu":
			return <TimeModuleForm activeInvitation={activeInvitation} />;
		case "Lokasi":
			return <LocationModuleForm activeInvitation={activeInvitation} />;
		case "RSVP":
			return <RSVPModuleForm activeInvitation={activeInvitation} />;
		case "Gallery":
			return <GalleryModuleForm activeInvitation={activeInvitation} />;
		case "Wedding Gift":
			return <WeddingGiftModuleForm activeInvitation={activeInvitation} />;
		case "Wedding Wishes":
			return <WeddingWishesModuleForm activeInvitation={activeInvitation} />;
		case "Closing":
			return <ClosingModuleForm activeInvitation={activeInvitation} />;
		default:
			return null;
	}
}
