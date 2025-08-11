import { designs } from "@/lib/designs";
import { InvitationWithModules, ModuleData } from "@/types";

export function MainInvitation({
	activeInvitation,
	editMode = false,
}: {
	activeInvitation: InvitationWithModules | null;
	editMode?: boolean;
}) {
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
			className={`bg-fixed bg-gray-100 bg-cover bg-center relative`}
			style={{
				backgroundImage: `url(${activeInvitation.desktop_bg})`,
			}}
		>
			<div className="absolute inset-0 max-w-md mx-auto min-h-screen bg-white shadow-lg ">
				{modules.map(mod => {
					const id = mod.name.replace(/\s+/g, "");
					const moduleData = design.modules[mod.name as keyof typeof design.modules];
					if (!moduleData) return null;
					const Component = moduleData;
					if (!Component) return null;
					if (mod.content === null) return null;

					// Get the design-specific ModuleForm component from the design definition
					const ModuleForm = editMode
						? design.forms?.[mod.name as keyof typeof design.forms]
						: null;

					console.log(editMode);
					console.log(ModuleForm);

					return (
						<div key={mod.name} id={id as string} className="relative group">
							{editMode && ModuleForm && <ModuleForm activeInvitation={activeInvitation} />}
							<Component data={mod.content as ModuleData} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
