import { ModuleName } from "@/types";
import { CoverModuleForm } from "./cover";

export function ModuleForm({ moduleName }: { moduleName: ModuleName }) {
	if (moduleName === "Cover") {
		return <CoverModuleForm />;
	} else {
		return null;
	}
}
