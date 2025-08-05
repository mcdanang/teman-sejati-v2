import { ModuleData } from "@/types";
import Image from "next/image";
import React from "react";
import { Data } from "../module-forms/opening";

export const Opening = ({ data }: { data: ModuleData }) => {
	const moduleData = data as Data;

	return (
		<section className="text-center py-12 bg-[#706539] flex flex-col items-center">
			<div className="text-5xl mx-auto font-cedarville font-bold text-white space-y-1 z-10">
				<h1>You&apos;re</h1>
			</div>

			<div className="flex w-fit justify-center">
				<Image
					src={moduleData?.envelope_image ?? "/designs/classic/keepshake.png"}
					alt="Invitation"
					className="aspect-square object-cover"
					width={300}
					height={300}
				/>
			</div>

			<div className="text-5xl mx-auto font-cedarville font-bold text-white space-y-1">
				<h1>invited</h1>
			</div>
		</section>
	);
};
