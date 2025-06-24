import { Invitation, Prisma } from "@prisma/client";

export type InvitationWithModules = Invitation & {
	Modules: Prisma.ModuleCreateWithoutInvitationInput[];
};
