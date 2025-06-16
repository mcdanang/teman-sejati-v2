"use client";

import { PreviewWrapper } from "./preview-wrapper";
import { DesignDefinition } from "@/lib/designs";

export function Editor({
	design,
	invitationContent,
}: {
	design: DesignDefinition;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	invitationContent: any;
}) {
	// const [formData, setFormData] = useState(data);

	const orderedModules = invitationContent.order ?? design.defaultOrder;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>Form</div>

			<div className="flex flex-col items-center">
				<PreviewWrapper>
					<div
						className={`w-full bg-fixed bg-gray-100 bg-cover bg-center`}
						style={{
							backgroundImage: `url(${invitationContent.desktopBackground})`,
						}}
					>
						<div className="max-w-md mx-auto min-h-screen bg-white p-4 space-y-6 shadow-lg overflow-hidden">
							{orderedModules.map((moduleId: string) => {
								const moduleData = design.modules[moduleId as keyof typeof design.modules];
								if (!moduleData) return null;

								const Component = moduleData.Component;
								const data =
									invitationContent.modules[moduleId as keyof typeof invitationContent.modules] ??
									{};
								return <Component key={moduleId} data={data} />;
							})}
						</div>
					</div>
				</PreviewWrapper>
			</div>
		</div>
	);
}
