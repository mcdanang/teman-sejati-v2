import { Button } from "@/components/ui/button";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { MapPinned } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

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
		<section
			className="text-center py-20 bg-[#660033] flex flex-col gap-10 items-center min-h-svh justify-center"
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			<div className="flex flex-col gap-4">
				<h1 className="text-4xl font-semibold font-edensor text-[#660033] max-w-sm">
					{moduleData.location_name ?? "Lokasi Title"}
				</h1>
				<p className="mt-2 text-lg text-[#660033] font-edensor max-w-sm font-medium">
					{moduleData.location_address ?? "Lokasi Subtitle"}
				</p>
			</div>
			<motion.div
				className="flex justify-center"
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
			>
				<Image
					src={moduleData.image ?? "/designs/classic/couple.svg"}
					alt="Couple"
					className=""
					width={400}
					height={300}
				/>
			</motion.div>
			<Button
				variant="outline"
				className="flex justify-center w-fit items-center border-[#660033] gap-2 hover:bg-gray-100/10"
			>
				<a
					href={moduleData.google_maps_url ?? "https://www.google.com"}
					className="flex items-center gap-2"
					target="_blank"
					rel="noopener noreferrer"
				>
					<MapPinned className="h-6 w-6 text-[#660033]" />
					<p className="text-[#660033] font-edensor font-medium">View Maps</p>
				</a>
			</Button>
		</section>
	);
};
