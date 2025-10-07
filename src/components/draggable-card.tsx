import React from "react";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import Image from "next/image";

export function DraggableCard({
	items,
}: {
	items: { image: string; title?: string; className: string }[];
}) {
	return (
		<DraggableCardContainer className="relative flex h-[800px] w-full items-center justify-center overflow-clip">
			<div className="text-center max-w-xs flex flex-col gap-6">
				<p className="text-xl font-semibold leading-relaxed text-[#660033] font-edensor mt-4">
					Our Story
				</p>

				<p className=" text-[#660033] italic text-center font-edensor font-medium">
					{
						"Three years ago, destiny quietly brought us together through a simple introduction that turned into a beautiful journey. What began with small conversations grew into deep understanding, laughter, and love. Though we are different in many ways — Khalisa, full of passion and plans; Danang, calm and spontaneous — those differences became our harmony. Today, with hearts full of gratitude, we choose to continue this story as one, hand in hand toward a lifetime together."
					}
				</p>
			</div>
			{items.map((item, index) => (
				<DraggableCardBody className={item.className} key={index}>
					<Image
						src={item.image}
						alt={item.title ?? `Image ${index + 1}`}
						className="pointer-events-none relative z-10 h-80 w-80 object-cover"
						width={320}
						height={320}
					/>
					{item.title && (
						<h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
							{item.title}
						</h3>
					)}
				</DraggableCardBody>
			))}
		</DraggableCardContainer>
	);
}
