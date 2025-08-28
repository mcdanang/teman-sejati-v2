import { Button } from "@/components/ui/button";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { MapPinned } from "lucide-react";
import Image from "next/image";
import React from "react";

type ModuleData = {
	location_name?: string;
	location_address?: string;
	image?: string;
	google_maps_url?: string;
	// add other fields as needed
};

export const Lokasi = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section className="text-center py-20 bg-[#660033] flex flex-col gap-4 items-center">
			<h1 className="text-4xl font-bold font-cedarville text-white">
				{moduleData.location_name ?? "Lokasi Title"}
			</h1>
			<p className="mt-2 text-lg text-white font-cedarville">
				{moduleData.location_address ?? "Lokasi Subtitle"}
			</p>
			<div className="flex justify-center">
				<Image
					src={moduleData.image ?? "/designs/classic/couple.svg"}
					alt="Couple"
					className=""
					width={400}
					height={300}
				/>
			</div>
			<Button
				variant="outline"
				className="flex justify-center w-fit items-center border-white gap-2 hover:bg-gray-100/10"
			>
				<a
					href={moduleData.google_maps_url ?? "https://www.google.com"}
					className="flex items-center gap-2"
					target="_blank"
					rel="noopener noreferrer"
				>
					<MapPinned className="h-6 w-6 text-white" />
					<p className="text-white">View Maps</p>
				</a>
			</Button>
		</section>
	);
};
