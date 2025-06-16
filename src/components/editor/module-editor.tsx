"use client";

import { useState } from "react";
import { ModuleForm } from "./module-form";
import { PreviewWrapper } from "./preview-wrapper";
import { ModuleDefinition } from "@/lib/designs";

export function ModuleEditor({
	moduleData,
	data,
	desktopBackground,
}: {
	moduleData: ModuleDefinition;
	data: Record<string, string | string[]>;
	desktopBackground: string;
}) {
	const [formData, setFormData] = useState(data);

	const Component = moduleData.Component;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<ModuleForm schema={moduleData.config.schema} data={formData} onChange={setFormData} />

			<div className="flex flex-col items-center">
				<PreviewWrapper>
					<div
						className={`w-full bg-fixed bg-gray-100 bg-cover bg-center`}
						style={{
							backgroundImage: `url(${desktopBackground})`,
						}}
					>
						<div className="max-w-md mx-auto h-full bg-white p-4 space-y-6 shadow-lg overflow-hidden">
							<Component data={formData} />
						</div>
					</div>
				</PreviewWrapper>
			</div>
		</div>
	);
}
