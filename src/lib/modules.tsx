import { Cover } from "@/components/designs/classic/cover";
import { coverConfig } from "@/components/designs/classic/cover/config";

import { EventDetails } from "@/components/designs/classic/event-details";
import { eventDetailsConfig } from "@/components/designs/classic/event-details/config";

export type Culture = "islamic" | "christian" | "chinese";

export type ModuleDefinition = {
	id: string;
	name: string;
	Component: React.FC<{ data: Record<string, string> }>;
	config: {
		schema: Record<string, string>;
		defaultTexts: Partial<Record<Culture, Record<string, string>>>;
	};
};

export const modules: Record<string, ModuleDefinition> = {
	cover: {
		id: "cover",
		name: "Cover",
		Component: Cover,
		config: coverConfig,
	},
	"event-details": {
		id: "event-details",
		name: "Event Details",
		Component: EventDetails,
		config: eventDetailsConfig,
	},
};
