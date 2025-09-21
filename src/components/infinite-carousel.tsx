"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";
import { createPortal } from "react-dom";

interface CarouselItem {
	image: string;
	alt?: string;
	aspectRatio?: number; // width/height ratio (optional)
}

interface InfiniteCarouselProps {
	items: CarouselItem[];
	speed?: number; // Duration for one complete cycle in seconds
	direction?: "left" | "right";
	pauseOnHover?: boolean;
	className?: string;
	itemWidth?: number; // Optional custom item width
	itemHeight?: number; // Optional custom item height
}

export const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
	items,
	speed = 20,
	direction = "left",
	pauseOnHover = true,
	className = "",
	itemWidth: customItemWidth,
	itemHeight: customItemHeight,
}) => {
	const [isPaused, setIsPaused] = useState(false);
	const [selectedImage, setSelectedImage] = useState<CarouselItem | null>(null);
	const [imageLoadStates, setImageLoadStates] = useState<{
		[key: string]: { width: number; height: number; loaded: boolean };
	}>({});

	console.log("selectedImage state:", selectedImage);

	// Create duplicated items for seamless infinite scroll
	const duplicatedItems = [...items, ...items];

	// Base dimensions
	const baseItemHeight = customItemHeight || 280; // Fixed height
	const defaultItemWidth = customItemWidth || 320; // Fallback width
	const gap = 16; // Gap between items (reduced)

	// Calculate total animation distance based on actual item widths
	const totalWidth = duplicatedItems.reduce((acc, item, index) => {
		const originalIndex = index % items.length;
		const imageKey = `${item.image}-${originalIndex}`;
		const imageState = imageLoadStates[imageKey];

		let itemWidth = defaultItemWidth;
		if (imageState?.loaded && imageState.width && imageState.height) {
			// Calculate width based on aspect ratio and fixed height
			const aspectRatio = imageState.width / imageState.height;
			itemWidth = baseItemHeight * aspectRatio;
		} else if (item.aspectRatio) {
			// Use provided aspect ratio
			itemWidth = baseItemHeight * item.aspectRatio;
		}

		return acc + itemWidth + gap;
	}, 0);

	const animationDistance = totalWidth / 2; // Divide by 2 since we duplicated items

	const handleImageLoad = (
		item: CarouselItem,
		index: number,
		event: React.SyntheticEvent<HTMLImageElement>
	) => {
		const img = event.target as HTMLImageElement;
		const originalIndex = index % items.length;
		const imageKey = `${item.image}-${originalIndex}`;

		setImageLoadStates(prev => ({
			...prev,
			[imageKey]: {
				width: img.naturalWidth,
				height: img.naturalHeight,
				loaded: true,
			},
		}));
	};

	const handleImageClick = (item: CarouselItem, e: React.MouseEvent) => {
		e.stopPropagation();
		console.log("Image clicked:", item);
		setSelectedImage(item);
		setIsPaused(true);
	};

	const closePopup = () => {
		setSelectedImage(null);
		setIsPaused(false);
	};

	const handleMouseEnter = () => {
		if (pauseOnHover) {
			setIsPaused(true);
		}
	};

	const handleMouseLeave = () => {
		if (pauseOnHover && !selectedImage) {
			setIsPaused(false);
		}
	};

	return (
		<div
			className={`relative overflow-hidden w-full bg-white ${className}`}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<motion.div
				className="flex"
				animate={
					isPaused
						? {}
						: {
								x: direction === "left" ? [-animationDistance, 0] : [0, -animationDistance],
							}
				}
				transition={{
					duration: speed,
					ease: "linear",
					repeat: Infinity,
					repeatType: "loop",
				}}
			>
				{duplicatedItems.map((item, index) => {
					const originalIndex = index % items.length;
					const imageKey = `${item.image}-${originalIndex}`;
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
						<motion.div
							key={`${item.image}-${index}`}
							className="flex-shrink-0 relative mx-1 py-2 bg-white cursor-pointer"
							style={{ width: calculatedWidth }}
							whileHover={{
								scale: 1.05,
								zIndex: 10,
								transition: { duration: 0.3 },
							}}
							onClick={e => handleImageClick(item, e)}
						>
							<div
								className="relative w-full overflow-hidden shadow-xl bg-white"
								style={{ height: baseItemHeight }}
							>
								<Image
									src={item.image}
									alt={item.alt || `Gallery image ${(index % items.length) + 1}`}
									fill
									className="object-contain transition-transform duration-500 hover:scale-105"
									sizes={`${calculatedWidth}px`}
									priority={index < 4} // Prioritize first few images
									onLoad={e => handleImageLoad(item, index, e)}
								/>

								{/* Gradient overlay for better text visibility */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

								{/* View indicator on hover */}
								<motion.div
									initial={{ opacity: 0 }}
									whileHover={{ opacity: 1 }}
									className="absolute inset-0 bg-black/40 flex items-center justify-center"
								>
									<div className="bg-white/90 rounded-full p-3 shadow-lg">
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
					);
				})}
			</motion.div>

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
