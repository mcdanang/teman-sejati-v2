import { DraggableCard } from "@/components/draggable-card";
import { InputJsonValue } from "@prisma/client/runtime/library";
import React from "react";

type ModuleData = {
	title?: string;
	subtitle?: string;
	image?: string;
	images?: string[];
};

export const GallerySlideshow = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	// Use data from database if available, otherwise fallback to default
	const items = React.useMemo(() => {
		// If we have images array from database, use it
		if (moduleData?.images && Array.isArray(moduleData.images) && moduleData.images.length > 0) {
			return moduleData.images.map((image, index) => ({
				image: image,
				className: `absolute ${getRandomPosition(index)}`,
			}));
		}

		// If we have a single image, use it
		if (moduleData?.image) {
			return [
				{
					image: moduleData.image,
					className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
				},
			];
		}

		// Fallback to default photos
		return [
			{
				image: "/designs/classic/photo1.jpg",
				className: "absolute top-30 left-[20%] rotate-[-5deg]",
			},
			{
				image: "/designs/classic/photo2.jpg",
				className: "absolute top-60 left-[5%] rotate-[-7deg]",
			},
			{
				image: "/designs/classic/photo3.jpg",
				className: "absolute top-5 left-[40%] rotate-[8deg]",
			},
		];
	}, [moduleData]);

	// Helper function to generate random positions for images
	function getRandomPosition(index: number): string {
		const positions = [
			"top-30 left-[20%] rotate-[-5deg]",
			"top-60 left-[5%] rotate-[-7deg]",
			"top-5 left-[40%] rotate-[8deg]",
			"top-52 left-[55%] rotate-[10deg]",
			"top-40 right-[35%] rotate-[2deg]",
			"top-90 left-[45%] rotate-[-7deg]",
			"top-28 left-[30%] rotate-[4deg]",
		];
		return (
			positions[index % positions.length] ||
			"top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
		);
	}

	// Don't render if no data available
	if (
		!moduleData ||
		(!moduleData.image && (!moduleData.images || moduleData.images.length === 0))
	) {
		return null;
	}

	return (
		<section
			className="text-center bg-[#d6c6b3] overflow-hidden flex items-center justify-center min-h-svh snap-start snap-always"
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			<div className="w-full max-w-4xl mx-auto px-4">
				{moduleData.title && (
					<h2 className="text-4xl font-bold font-edensor text-[#660033] mb-4">
						{moduleData.title}
					</h2>
				)}
				{moduleData.subtitle && (
					<p className="text-lg font-edensor text-[#660033]/80 mb-8">{moduleData.subtitle}</p>
				)}
				<DraggableCard items={items} />
			</div>
		</section>
	);
};
