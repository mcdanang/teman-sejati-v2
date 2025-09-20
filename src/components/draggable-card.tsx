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
				{/* Arabic Text */}

				<p className="text-lg leading-relaxed text-[#660033] font-arabic mt-4">
					{
						"وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ"
					}
				</p>

				{/* Translation */}

				<p className=" text-[#660033] italic text-justify font-edensor font-medium">
					{
						"And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them. And He has placed between you compassion and mercy. Surely in this are signs for people who reflect."
					}
				</p>

				{/* Surah Reference */}

				<p className="text-[#660033] font-medium mt-4 font-pinyon">{"Ar-Rum, 30:21"}</p>
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
