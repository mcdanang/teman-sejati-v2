import { Invitation, Prisma } from "@prisma/client";

export type InvitationWithModules = Invitation & {
	Modules: Prisma.ModuleCreateWithoutInvitationInput[];
};

import { InputJsonValue } from "@prisma/client/runtime/library";

export type ModuleDefinition = {
	Component: React.FC<{ data: InputJsonValue }>;
};

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
};
