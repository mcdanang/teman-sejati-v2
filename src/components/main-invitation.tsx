import { designs } from "@/lib/designs";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { ModuleForm } from "./module-form";
import { useInvitations } from "@/hooks/use-invitations";
import { ModuleName } from "@/types";

export function MainInvitation({
	invitations,
}: {
	invitations: ReturnType<typeof useInvitations>;
}) {
	const { activeInvitation } = invitations;
	if (!activeInvitation) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-lg text-muted-foreground">Tidak ada undangan yang ditemukan.</p>
			</div>
		);
	}

	activeInvitation.Modules.sort((a, b) => a.order - b.order);

	const modules = activeInvitation.Modules;
	const design = designs[activeInvitation.design];

	return (
		<div
			className={`bg-fixed bg-gray-100 bg-cover bg-center`}
			style={{
				backgroundImage: `url(${activeInvitation.desktop_bg})`,
			}}
		>
			<div className="max-w-md mx-auto min-h-screen bg-white p-4 space-y-6 shadow-lg ">
				{modules.map(mod => {
					const id = mod.name.replace(/\s+/g, "");
					const moduleData = design.modules[mod.name as keyof typeof design.modules];
					if (!moduleData) return null;
					const Component = moduleData.Component;
					if (!Component) return null;
					if (mod.content === null) return null;
					return (
						<div key={mod.name} id={id as string} className="relative group">
							<ModuleForm moduleName={mod.name as ModuleName} invitations={invitations} />
							<Component data={mod.content as InputJsonValue} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
