"use client";

import Image from "next/image";
import React from "react";

export const PhotoGallery = ({ data }: { data: Record<string, string | string[]> }) => {
	const photos = data.photos as string[];
	return (
		<section className="bg-white py-12 px-4 max-w-2xl mx-auto">
			<h2 className="text-2xl font-semibold text-center mb-6">{data.title}</h2>
			{photos.map((photo: string, index: number) => (
				<div key={index} className="mb-4">
					<Image
						src={photo}
						alt={`Photo ${index + 1}`}
						className="w-full h-auto rounded-lg shadow-lg"
						width={400}
						height={400}
					/>
				</div>
			))}
		</section>
	);
};
