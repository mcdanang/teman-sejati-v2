import { Cover } from "@/components/designs/classic-01/modules/cover";
import { InputJsonValue } from "@prisma/client/runtime/library";

export type Language = "id" | "en";
export type Culture = "islamic" | "christian";
export type DesignKey = "classic";
export type ModuleKey = "cover" | "eventDetails" | "photoGallery";

export type ModuleDefinition = {
	Component: React.FC<{ data: InputJsonValue }>;
};

export type DesignDefinition = {
	id: string;
	name: string;
	modules: Record<string, ModuleDefinition>;
};

export const designs: Record<string, DesignDefinition> = {
	"classic-01": {
		id: "classic-01",
		name: "Classic 1",
		modules: {
			Cover: {
				Component: Cover,
			},
			// eventDetails: {
			// 	id: "eventDetails",
			// 	name: "Event Details",
			// 	Component: EventDetails,
			// 	config: eventDetailsConfig,
			// },
			// photoGallery: {
			// 	id: "photoGallery",
			// 	name: "Photo Gallery",
			// 	Component: PhotoGallery,
			// 	config: photoGalleryConfig,
			// },
		},
	},
};

export type DesignId = keyof typeof designs;
