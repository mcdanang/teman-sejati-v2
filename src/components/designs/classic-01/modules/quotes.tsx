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
		<section className="relative text-center py-16 bg-[#660033] overflow-hidden">
			{/* Background Flower Images */}
			<div className="absolute inset-0 pointer-events-none">
				{/* Top Left Flower */}
				<div className="absolute top-4 left-10 transform rotate-12 opacity-50">
					<Image
						src="/designs/classic/flower2.png"
						alt="Flower decoration"
						width={120}
						height={120}
						className="object-contain"
					/>
				</div>

				{/* Top Right Flower */}
				<div className="absolute top-4 right-4 transform -rotate-15 opacity-50">
					<Image
						src="/designs/classic/flower2.png"
						alt="Flower decoration"
						width={200}
						height={200}
						className="object-contain"
					/>
				</div>

				{/* Bottom Left Flower */}
				<div className="absolute bottom-8 left-8 transform rotate-45 opacity-50">
					<Image
						src="/designs/classic/flower1.png"
						alt="Flower decoration"
						width={100}
						height={100}
						className="object-contain"
					/>
				</div>

				{/* Bottom Right Flower */}
				<div className="absolute bottom-6 right-8 transform rotate-180 opacity-50">
					<Image
						src="/designs/classic/flower2.png"
						alt="Flower decoration"
						width={100}
						height={100}
						className="object-contain"
					/>
				</div>

				{/* Bottom Center Flower */}
				<div className="absolute bottom-4 right-1/3 transform opacity-50">
					<Image
						src="/designs/classic/flower2.png"
						alt="Flower decoration"
						width={150}
						height={150}
						className="object-contain"
					/>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative z-10 max-w-2xl mx-auto px-4">
				{/* Quran Verse Card */}
				<div className="bg-white/90 w-80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mx-auto max-w-2xl border border-white/20">
					<div className="text-center">
						{/* Arabic Text */}
						<div className="mb-6">
							<p className="text-xl leading-relaxed text-gray-800 font-arabic mb-4">
								{moduleData.verse ??
									"وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ"}
							</p>
						</div>

						{/* Translation */}
						<div className="mb-4">
							<p className=" text-gray-700 leading-relaxed italic">
								{moduleData.translation ??
									"And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them. And He has placed between you compassion and mercy. Surely in this are signs for people who reflect."}
							</p>
						</div>

						{/* Surah Reference */}
						<div className="pt-4 border-t border-gray-200">
							<p className="text-sm text-gray-500 font-medium">
								— {moduleData.reference ?? "Surah Ar-Rum, 30:21"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
