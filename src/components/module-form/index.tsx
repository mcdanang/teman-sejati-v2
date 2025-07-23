import { ModuleName } from "@/types";
import { useInvitations } from "@/hooks/use-invitations";
import { ModuleForm as CoverModuleForm } from "./cover";
import { ModuleForm as OpeningModuleForm } from "./opening";

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
		default:
			return null;
	}
}
