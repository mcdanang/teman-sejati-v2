import { InputJsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import React from "react";

type ModuleData = {
	title?: string;
	subtitle?: string;
	image?: string;
	// add other fields as needed
};

export const Opening = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section className="text-center py-12 bg-white">
			<h1 className="text-4xl font-bold">{moduleData.title ?? "Opening Title"}</h1>
			<p className="mt-2 text-lg text-gray-500">{moduleData.subtitle ?? "Opening Subtitle"}</p>
			<div className="flex justify-center">
				<Image
					src={moduleData.image ?? "/designs/classic/couple.svg"}
					alt="Couple"
					className="mt-6 rounded-lg shadow-lg"
					width={400}
					height={300}
				/>
			</div>
		</section>
	);
};
