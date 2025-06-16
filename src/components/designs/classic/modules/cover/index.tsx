"use client";

import Image from "next/image";
import React from "react";

export const Cover = ({ data }: { data: Record<string, string | string[]> }) => {
	return (
		<section className="text-center py-12 bg-white">
			<h1 className="text-4xl font-bold">{data.title}</h1>
			<p className="mt-2 text-lg text-gray-500">{data.subtitle}</p>
			<div className="flex justify-center">
				<Image
					src={data.image1 as string}
					alt="Couple"
					className="mt-6 rounded-lg shadow-lg"
					width={400}
					height={300}
				/>
			</div>
		</section>
	);
};
