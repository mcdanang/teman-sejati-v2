import { InputJsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import React from "react";

type ModuleData = {
	image?: string;
	akadDate?: string;
	akadTime?: string;
	resepsiDate?: string;
	resepsiTime?: string;
	// add other fields as needed
};

export const Waktu = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section className="text-center relative">
			{/* <h1 className="text-4xl font-bold">{moduleData.title ?? "Waktu Title"}</h1>
			<p className="mt-2 text-lg text-gray-500">{moduleData.subtitle ?? "Waktu Subtitle"}</p> */}
			<div className="flex justify-center">
				<Image
					src={moduleData.image ?? "/designs/classic/illustration.jpeg"}
					alt="Couple"
					className=""
					width={800}
					height={800}
				/>
			</div>

			{/* Content */}
			<div className="absolute top-0 left-0 w-full h-full flex-1 z-10 flex flex-col gap-2 py-16 px-4">
				{/* Title */}
				<h1 className="text-4xl font-bold text-[#e08944] font-cedarville">
					{moduleData.akadDate ?? "November 15th 2025"}
				</h1>
				<p className="text-lg text-[#e08944] font-cedarville">
					Akad: {moduleData.akadTime ?? "07:30 - 09:30"}
				</p>
				<p className="text-lg text-[#e08944] font-cedarville">
					Resepsi: {moduleData.resepsiTime ?? "10.30 - 13.00"}
				</p>
			</div>
		</section>
	);
};
