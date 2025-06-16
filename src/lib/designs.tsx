import { Cover } from "@/components/designs/classic/modules/cover";
import { coverConfig } from "@/components/designs/classic/modules/cover/config";

import { EventDetails } from "@/components/designs/classic/modules/event-details";
import { eventDetailsConfig } from "@/components/designs/classic/modules/event-details/config";
import { PhotoGallery } from "@/components/designs/classic/modules/photo-gallery";
import { photoGalleryConfig } from "@/components/designs/classic/modules/photo-gallery/config";

export type Language = "id" | "en";
export type Culture = "islamic" | "christian";
export type DesignKey = "classic";
export type ModuleKey = "cover" | "eventDetails" | "photoGallery";

export type ModuleDefinition = {
	id: string;
	name: string;
	Component: React.FC<{ data: Record<string, string | string[]> }>;
	config: {
		schema: Record<string, string>;
		defaultTexts: Partial<Record<Culture, Record<string, string | string[]>>>;
	};
};

export type DesignDefinition = {
	id: string;
	name: string;
	defaultOrder: string[];
	modules: Record<string, ModuleDefinition>;
};

export const designs: Record<string, DesignDefinition> = {
	classic: {
		id: "classic",
		name: "Classic",
		defaultOrder: ["cover", "eventDetails", "photoGallery"],
		modules: {
			cover: {
				id: "cover",
				name: "Cover",
				Component: Cover,
				config: coverConfig,
			},
			eventDetails: {
				id: "eventDetails",
				name: "Event Details",
				Component: EventDetails,
				config: eventDetailsConfig,
			},
			photoGallery: {
				id: "photoGallery",
				name: "Photo Gallery",
				Component: PhotoGallery,
				config: photoGalleryConfig,
			},
		},
	},
};

export type DesignId = keyof typeof designs;
