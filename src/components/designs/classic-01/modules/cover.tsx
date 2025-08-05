import { ModuleData } from "@/types";
import Image from "next/image";
import React from "react";
import { Data } from "../module-forms/cover";

export const Cover = ({ data }: { data: ModuleData }) => {
	const moduleData = data as Data;
	return (
		<section className="text-center py-12 bg-[#706539] flex flex-col items-center">
			<div className="text-5xl mx-auto font-cedarville font-bold text-white -rotate-6 space-y-1 translate-y-6">
				<h1>{moduleData?.groom_short_name ?? "John"}</h1>
				<h1>{`and ${moduleData?.bride_short_name ?? "Jane"}`}</h1>
			</div>

			<div className="flex w-fit justify-center bg-black/80 p-6">
				<Image
					src={moduleData?.image ?? "/designs/classic/couple.svg"}
					alt="Couple"
					className="aspect-square object-cover"
					width={300}
					height={300}
				/>
			</div>

			<div className="text-5xl mx-auto font-cedarville font-bold text-white -rotate-6 space-y-1 -translate-y-8">
				<h1>are getting</h1>
				<h1>married</h1>
			</div>

			<div className="text-5xl mx-auto font-cedarville font-bold text-white space-y-1">
				<h1>and...</h1>
			</div>
		</section>
	);
};
