import { InputJsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import React from "react";

type ModuleData = {
	full_name?: string;
	description?: string;
	image?: string;
	// add other fields as needed
};

export const Groom = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;
	console.log(moduleData);

	return (
		<section className="text-center py-12 bg-[#800020]">
			<h1 className="text-4xl font-bold">{moduleData.full_name ?? "Groom Full Name"}</h1>
			<p className="mt-2 text-lg text-gray-500">{moduleData.description ?? "Groom Description"}</p>
			<div className="flex justify-center">
				<Image
					src={moduleData.image ?? "/designs/classic/doodle2.png"}
					alt="Couple"
					className=""
					width={300}
					height={300}
				/>
			</div>
		</section>
	);
};
