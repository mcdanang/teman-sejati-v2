import { InputJsonValue } from "@prisma/client/runtime/library";
import React from "react";

type ModuleData = {
	title?: string;
	subtitle?: string;
	video?: string;
	// add other fields as needed
};

export const Opening = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section className="text-center py-12 bg-white">
			<h1 className="text-4xl font-bold">{moduleData.title ?? "Opening Title"}</h1>
			<p className="mt-2 text-lg text-gray-500">{moduleData.subtitle ?? "Opening Subtitle"}</p>
			<div className="flex justify-center">
				{moduleData.video ? (
					<video
						src={moduleData.video}
						controls
						className="rounded-lg shadow-lg max-w-full"
						style={{ width: "400px", height: "300px" }}
					/>
				) : (
					<div className="mt-6 w-[400px] h-[300px] bg-gray-100 rounded-lg shadow-lg flex items-center justify-center">
						<p className="text-gray-500">Tidak ada video yang dipilih</p>
					</div>
				)}
			</div>
		</section>
	);
};
