import { InputJsonValue } from "@prisma/client/runtime/library";
import { InfiniteCarousel } from "@/components/infinite-carousel";
import React from "react";

type ModuleData = {
	title?: string;
	subtitle?: string;
	image?: string;
	images?: string[];
};

export const GallerySlideshow = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	// Prepare carousel items from database data
	const carouselItems = React.useMemo(() => {
		// If we have images array from database, use it
		if (moduleData?.images && Array.isArray(moduleData.images) && moduleData.images.length > 0) {
			return moduleData.images.map((image, index) => ({
				image: image,
				alt: `Gallery image ${index + 1}`,
			}));
		}

		// If we have a single image, use it
		if (moduleData?.image) {
			return [
				{
					image: moduleData.image,
					alt: "Gallery image",
				},
			];
		}

		// Fallback to default photos
		return [
			{ image: "/designs/classic/grid-1.png", alt: "Wedding photo 1" },
			{ image: "/designs/classic/grid-2.png", alt: "Wedding photo 2" },
			{ image: "/designs/classic/grid-3.png", alt: "Wedding photo 3" },
			{ image: "/designs/classic/grid-4.png", alt: "Wedding photo 4" },
			{ image: "/designs/classic/grid-5.png", alt: "Wedding photo 5" },
			{ image: "/designs/classic/grid-6.png", alt: "Wedding photo 6" },
		];
	}, [moduleData]);

	// Don't render if no data available
	if (!moduleData || carouselItems.length === 0) {
		return null;
	}

	return (
		<section
			className="text-center bg-[#d6c6b3] overflow-hidden flex flex-col items-center justify-center snap-start snap-always py-8 min-h-svh"
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			{/* Title */}
			{/* <div className="mb-8">
				<h2 className="text-4xl font-pinyon text-[#660033] mb-2">
					{moduleData?.title || "Our Gallery"}
				</h2>
				{moduleData?.subtitle && (
					<p className="text-lg text-[#8B4513] font-light">{moduleData.subtitle}</p>
				)}
			</div> */}

			{/* Infinite Carousel */}
			<div className="w-full">
				<InfiniteCarousel
					items={carouselItems}
					speed={50}
					direction="left"
					pauseOnHover={true}
					className="w-full"
					itemHeight={280}
				/>
			</div>
		</section>
	);
};
