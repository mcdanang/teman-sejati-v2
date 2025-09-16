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
			<p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
				And one of His signs is that He created for you spouses from among yourselves so that you
				may find comfort in them.
			</p>
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
