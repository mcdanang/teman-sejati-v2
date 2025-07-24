import { ModuleName } from "@/types";
import { useInvitations } from "@/hooks/use-invitations";
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
	invitations,
}: {
	moduleName: ModuleName;
	invitations: ReturnType<typeof useInvitations>;
}) {
	switch (moduleName) {
		case "Cover":
			return <CoverModuleForm invitations={invitations} />;
		case "Opening":
			return <OpeningModuleForm invitations={invitations} />;
		case "Quotes":
			return <QuotesModuleForm invitations={invitations} />;
		case "Mempelai Pria":
			return <GroomModuleForm invitations={invitations} />;
		case "Mempelai Wanita":
			return <BrideModuleForm invitations={invitations} />;
		case "Waktu":
			return <TimeModuleForm invitations={invitations} />;
		case "Lokasi":
			return <LocationModuleForm invitations={invitations} />;
		case "RSVP":
			return <RSVPModuleForm invitations={invitations} />;
		case "Gallery":
			return <GalleryModuleForm invitations={invitations} />;
		case "Wedding Gift":
			return <WeddingGiftModuleForm invitations={invitations} />;
		case "Wedding Wishes":
			return <WeddingWishesModuleForm invitations={invitations} />;
		case "Closing":
			return <ClosingModuleForm invitations={invitations} />;
		default:
			return null;
	}
}
