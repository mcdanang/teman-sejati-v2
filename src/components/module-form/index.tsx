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
	if (moduleName === "Cover") {
		return <CoverModuleForm invitations={invitations} />;
	} else if (moduleName === "Opening") {
		return <OpeningModuleForm invitations={invitations} />;
	} else {
		return null;
	}
}
