"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import AutoScroll from "embla-carousel-auto-scroll";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";

interface CarouselImageItem {
	image: string;
	alt?: string;
	aspectRatio?: number; // width/height ratio (optional)
}

interface InfiniteCarouselProps {
	items: CarouselImageItem[];
	speed?: number; // Speed in pixels per frame (default 1 = slow, higher = faster)
	pauseOnHover?: boolean;
	className?: string;
	itemWidth?: number; // Optional custom item width
	itemHeight?: number; // Optional custom item height
}

export const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
	items,
	speed = 1,
	pauseOnHover = true,
	className = "",
	itemWidth: customItemWidth,
	itemHeight: customItemHeight,
}) => {
	const [selectedImage, setSelectedImage] = useState<CarouselImageItem | null>(null);
	const [imageLoadStates, setImageLoadStates] = useState<{
		[key: string]: { width: number; height: number; loaded: boolean };
	}>({});
	const [api, setApi] = useState<CarouselApi>();

	// Base dimensions
	const baseItemHeight = customItemHeight || 280; // Fixed height
	const defaultItemWidth = customItemWidth || 320; // Fallback width

	// Initialize AutoScroll plugin
	const autoScrollPlugin = useRef(
		AutoScroll({
			speed: speed,
			direction: "backward", // backward = right to left scrolling
			startDelay: 0,
			stopOnInteraction: false,
			stopOnMouseEnter: pauseOnHover,
			playOnInit: true,
		})
	);

	// Handle auto-scroll pause when modal is open or on hover
	useEffect(() => {
		if (!api) return;

		const autoScroll = api?.plugins()?.autoScroll;
		if (!autoScroll) return;

		if (selectedImage) {
			autoScroll.stop();
		} else {
			autoScroll.play();
		}
	}, [selectedImage, api]);

	const handleImageLoad = (
		item: CarouselImageItem,
		index: number,
		event: React.SyntheticEvent<HTMLImageElement>
	) => {
		const img = event.target as HTMLImageElement;
		const imageKey = `${item.image}-${index}`;

		setImageLoadStates(prev => ({
			...prev,
			[imageKey]: {
				width: img.naturalWidth,
				height: img.naturalHeight,
				loaded: true,
			},
		}));
	};

	const handleImageClick = (item: CarouselImageItem, e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedImage(item);
	};

	const closePopup = () => {
		setSelectedImage(null);
	};

	return (
		<div className={`relative w-full bg-white ${className}`}>
			<Carousel
				opts={{
					align: "start",
					loop: true,
					dragFree: true,
					containScroll: "trimSnaps",
				}}
				plugins={[autoScrollPlugin.current]}
				setApi={setApi}
				className="w-full"
			>
				<CarouselContent className="">
					{items.map((item, index) => {
						const imageKey = `${item.image}-${index}`;
						const imageState = imageLoadStates[imageKey];

						// Calculate item width based on aspect ratio
						let calculatedWidth = defaultItemWidth;
						if (imageState?.loaded && imageState.width && imageState.height) {
							const aspectRatio = imageState.width / imageState.height;
							calculatedWidth = baseItemHeight * aspectRatio;
						} else if (item.aspectRatio) {
							calculatedWidth = baseItemHeight * item.aspectRatio;
						}

						return (
							<CarouselItem
								key={`${item.image}-${index}`}
								className="pl-2 basis-auto"
								style={{ width: calculatedWidth }}
							>
								<motion.div
									className="relative py-1 bg-white cursor-pointer"
									whileHover={{
										scale: 1.05,
										zIndex: 10,
										transition: { duration: 0.3 },
									}}
									onClick={e => handleImageClick(item, e)}
								>
									<div
										className="relative w-full overflow-hidden bg-white"
										style={{ height: baseItemHeight }}
									>
										<Image
											src={item.image}
											alt={item.alt || `Gallery image ${index + 1}`}
											fill
											className="object-contain transition-transform duration-500 hover:scale-105"
											sizes={`${calculatedWidth}px`}
											priority={index < 4} // Prioritize first few images
											onLoad={e => handleImageLoad(item, index, e)}
										/>

										{/* View indicator on hover */}
										<motion.div
											initial={{ opacity: 0 }}
											whileHover={{ opacity: 1 }}
											className="absolute inset-0 bg-black/40 flex items-center justify-center"
										>
											<div className="bg-white/30 rounded-full p-3">
												<svg
													className="w-6 h-6 text-[#660033]"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
													/>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
													/>
												</svg>
											</div>
										</motion.div>
									</div>
								</motion.div>
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</Carousel>

			{/* Full Image Popup - Render in portal to avoid overflow issues */}
			{selectedImage &&
				typeof document !== "undefined" &&
				createPortal(
					<AnimatePresence>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999]"
							onClick={closePopup}
							style={{ pointerEvents: "auto" }}
						>
							<motion.div
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								transition={{ type: "spring", bounce: 0.3 }}
								className="relative max-w-4xl max-h-[90vh] mx-3"
								onClick={e => e.stopPropagation()}
							>
								<div className="relative w-full h-full">
									<Image
										src={selectedImage.image}
										alt={selectedImage.alt || "Gallery image"}
										width={800}
										height={600}
										className="object-contain rounded-lg shadow-2xl"
										priority
									/>

									{/* Close button */}
									<motion.button
										onClick={closePopup}
										className="absolute -top-12 right-0 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.95 }}
									>
										<X className="w-4 h-4 text-[#660033]" />
									</motion.button>
								</div>
							</motion.div>
						</motion.div>
					</AnimatePresence>,
					document.body
				)}
		</div>
	);
};
