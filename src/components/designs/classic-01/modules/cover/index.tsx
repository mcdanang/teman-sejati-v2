"use client";

import { InputJsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import React from "react";

type CoverData = {
	title?: string;
	subtitle?: string;
	image?: string;
	// add other fields as needed
};

export const Cover = ({ data }: { data: InputJsonValue }) => {
	const coverData = data as CoverData;
	console.log("Cover data:", coverData);
	return (
		<section className="text-center py-12 bg-white">
			<h1 className="text-4xl font-bold">{coverData.title ?? "Cover Title"}</h1>
			<p className="mt-2 text-lg text-gray-500">{coverData.subtitle ?? "Cover Subtitle"}</p>
			<div className="flex justify-center">
				<Image
					src={coverData.image ?? "/designs/classic/couple.svg"}
					alt="Couple"
					className="mt-6 rounded-lg shadow-lg"
					width={400}
					height={300}
				/>
			</div>
			<div className="flex justify-center">
				<Image
					src={coverData.image ?? "/designs/classic/couple.svg"}
					alt="Couple"
					className="mt-6 rounded-lg shadow-lg"
					width={400}
					height={300}
				/>
			</div>
		</section>
	);
};
