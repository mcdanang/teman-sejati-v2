import { CoverData } from "@/components/module-form/cover";
import { useInvitations } from "@/hooks/use-invitations";
import Image from "next/image";
import React from "react";

export const Cover = () => {
	const { activeInvitation } = useInvitations();
	const moduleData = activeInvitation?.Modules.find(mod => mod.name === "Cover")
		?.content as CoverData;

	console.log("Cover moduleData:", moduleData);

	return (
		<section className="text-center py-12 bg-white">
			<h1 className="text-4xl font-bold">{moduleData?.title ?? "Cover Title"}</h1>
			<p className="mt-2 text-lg text-gray-500">{moduleData?.subtitle ?? "Cover Subtitle"}</p>
			<div className="flex justify-center">
				<Image
					src={moduleData?.image ?? "/designs/classic/couple.svg"}
					alt="Couple"
					className="mt-6 rounded-lg shadow-lg"
					width={400}
					height={300}
				/>
			</div>
		</section>
	);
};
