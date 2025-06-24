import { designs } from "@/lib/designs";
import { InvitationWithModules } from "@/types";
import { InputJsonValue } from "@prisma/client/runtime/library";

export function MainInvitation({ invitation }: { invitation: InvitationWithModules | null }) {
	if (!invitation) {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-lg text-muted-foreground">Tidak ada undangan yang ditemukan.</p>
			</div>
		);
	}

	invitation.Modules.sort((a, b) => a.order - b.order);

	const modules = invitation.Modules;
	const design = designs[invitation.design];

	return (
		<div
			className={`w-full h-full bg-fixed bg-gray-100 bg-cover bg-center`}
			style={{
				backgroundImage: `url(${invitation.desktop_bg})`,
			}}
		>
			<div className="max-w-md mx-auto min-h-screen bg-white p-4 space-y-6 shadow-lg ">
				{modules.map(mod => {
					console.log("mod", mod);
					const moduleData = design.modules[mod.name as keyof typeof design.modules];
					if (!moduleData) return null;
					const Component = moduleData.Component;
					if (!Component) return null;
					if (mod.content === null) return null;
					return <Component key={mod.name} data={mod.content as InputJsonValue} />;
				})}
			</div>
		</div>
	);
}
