import { InputJsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import React from "react";

type ModuleData = {
	verse: string;
	translation: string;
	reference: string;
};

export const Quotes = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section
			className="relative text-center py-16 bg-[#d6c6b3] overflow-hidden h-dvh flex items-center justify-center"
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			{/* Centered Frame with Quotes */}
			<div className="relative flex items-center justify-center">
				{/* Burgundy Frame */}
				<div className="relative">
					<Image
						src="/designs/classic/frame-burgundy.png"
						alt="Burgundy frame"
						width={500}
						height={500}
						className="object-contain"
					/>

					{/* Quotes Content Overlay */}
					<div className="absolute inset-0 flex flex-col items-center justify-center px-18">
						<div className="text-center max-w-xs flex flex-col gap-6">
							{/* Arabic Text */}

							<p className="text-lg leading-relaxed text-[#660033] font-arabic mt-4">
								{moduleData.verse ??
									"وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ"}
							</p>

							{/* Translation */}

							<p className=" text-[#660033] italic text-justify font-edensor font-medium">
								{moduleData.translation ??
									"And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them. And He has placed between you compassion and mercy. Surely in this are signs for people who reflect."}
							</p>

							{/* Surah Reference */}

							<p className="text-[#660033] font-medium mt-4 font-pinyon">
								{moduleData.reference ?? "Ar-Rum, 30:21"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
