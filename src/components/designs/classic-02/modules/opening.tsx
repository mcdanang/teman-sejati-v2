"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import React, { Suspense, useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
import { InputJsonValue } from "@prisma/client/runtime/library";
// import { useOverlayContext } from "../../../main-invitation";

type OpeningModuleData = {
	envelope_image?: string;
};

const OpeningContent = ({ data }: { data: InputJsonValue; invitationId?: string }) => {
	const moduleData = data as OpeningModuleData;
	// const searchParams = useSearchParams();
	// const to = searchParams.get("to");
	const [isOverlayOpen, setIsOverlayOpen] = useState(true);

	const handleEnvelopeClick = () => {
		setIsOverlayOpen(false);
	};

	// Prevent scrolling when overlay is open
	useEffect(() => {
		if (isOverlayOpen) {
			// Disable scrolling on body and main container
			document.body.style.overflow = "hidden";
			document.body.style.touchAction = "none";

			// Find and disable scrolling on the main invitation container
			const mainContainer = document.querySelector(".snap-y");
			if (mainContainer) {
				(mainContainer as HTMLElement).style.overflow = "hidden";
				(mainContainer as HTMLElement).style.touchAction = "none";
			}
		} else {
			// Re-enable scrolling
			document.body.style.overflow = "";
			document.body.style.touchAction = "";

			// Re-enable scrolling on main container
			const mainContainer = document.querySelector(".snap-y");
			if (mainContainer) {
				(mainContainer as HTMLElement).style.overflow = "auto";
				(mainContainer as HTMLElement).style.touchAction = "auto";
			}
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = "";
			document.body.style.touchAction = "";
			const mainContainer = document.querySelector(".snap-y");
			if (mainContainer) {
				(mainContainer as HTMLElement).style.overflow = "auto";
				(mainContainer as HTMLElement).style.touchAction = "auto";
			}
		};
	}, [isOverlayOpen]);

	return (
		<section
			className={`text-center flex flex-col justify-evenly items-center min-h-svh relative ${isOverlayOpen ? "overflow-hidden" : ""}`}
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			{/* Centered Frame with Quotes */}
			<motion.div
				className="relative flex items-center justify-center"
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{
					opacity: isOverlayOpen ? 0 : 1,
					scale: isOverlayOpen ? 0.8 : 1,
				}}
				transition={{
					delay: isOverlayOpen ? 0 : 0.3,
					duration: 0.8,
					ease: "easeOut",
					type: "spring",
					bounce: 0.4,
				}}
			>
				{/* Burgundy Frame */}
				<div className="relative">
					<div className="w-[500px] h-full bg-transparent"></div>

					{/* Quotes Content Overlay */}
					<motion.div
						className="absolute inset-0 flex flex-col items-center justify-center px-18"
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{
							opacity: isOverlayOpen ? 0 : 1,
							scale: isOverlayOpen ? 0.8 : 1,
						}}
						transition={{
							delay: isOverlayOpen ? 0 : 0.3,
							duration: 0.8,
							ease: "easeOut",
							type: "spring",
							bounce: 0.4,
						}}
					>
						<div className="text-center max-w-xs flex flex-col gap-8">
							{/* Arabic Text */}

							<p className="leading-relaxed text-[#660033] font-arabic mt-4">
								{
									"وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ"
								}
							</p>

							{/* Translation */}

							<p className=" text-[#660033] italic text-center font-edensor font-medium">
								{
									"Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
								}
							</p>

							{/* Surah Reference */}

							<p className="text-[#660033] font-medium font-pinyon">{"Ar-Rum, 30:21"}</p>
						</div>
					</motion.div>
				</div>
			</motion.div>
			{/* Overlay Layer */}
			<AnimatePresence>
				{isOverlayOpen && (
					<motion.div
						initial={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.6, ease: "easeInOut" }}
						onClick={handleEnvelopeClick}
						style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
						className="absolute inset-0 bg-gradient-to-b from-[#660033] to-[#4a0025] flex flex-col items-center justify-center z-40 cursor-pointer px-4"
					>
						{/* Arabic Bismillah */}
						<motion.div
							initial={{ opacity: 0, y: -30, scale: 0.8 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{
								delay: 0.3,
								duration: 1.2,
								type: "spring",
								bounce: 0.4,
							}}
							whileHover={{ scale: 1.05 }}
							className="text-center mb-8"
						>
							<p className="leading-relaxed text-[#660033] font-arabic mt-4 mb-6 text-xl">
								{"اَلسَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ"}
							</p>
						</motion.div>

						{/* Dear Guest */}
						{/* <motion.div
							initial={{ opacity: 0, x: -50, rotateY: -90 }}
							animate={{ opacity: 1, x: 0, rotateY: 0 }}
							transition={{
								delay: 0.5,
								duration: 1,
								type: "spring",
								bounce: 0.5,
							}}
							whileHover={{
								scale: 1.1,
								rotateZ: [0, -2, 2, 0],
								transition: { duration: 0.3 },
							}}
							className="text-center mb-8"
						>
							<motion.div className="text-[#660033] px-4 py-2 text-center font-edensor">
								<motion.p
									className="text-xs opacity-70 font-semibold"
									initial={{ opacity: 0 }}
									animate={{ opacity: 0.7 }}
									transition={{ delay: 0.8, duration: 0.5 }}
								>
									Yth,
								</motion.p>
								<motion.p
									className="text-lg font-semibold"
									initial={{ opacity: 0, scale: 0.5 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										delay: 1,
										duration: 0.6,
										type: "spring",
										bounce: 0.6,
									}}
								>
									{to ? to : "Guest"}
								</motion.p>
							</motion.div>
						</motion.div> */}

						{/* Envelope Display */}
						<motion.div
							initial={{ opacity: 0, scale: 0.3, rotateY: 180 }}
							animate={{ opacity: 1, scale: 1, rotateY: 0 }}
							transition={{
								delay: 0.7,
								duration: 1.2,
								type: "spring",
								bounce: 0.6,
							}}
							whileHover={{
								scale: 1.1,
								rotateZ: [0, -5, 5, 0],
								y: -10,
								transition: { duration: 0.4 },
							}}
							whileTap={{ scale: 0.95 }}
							className="relative mb-8"
						>
							<motion.div
								transition={{
									duration: 4,
									repeat: Infinity,
									repeatType: "reverse",
									ease: "easeInOut",
								}}
							>
								<Image
									src={moduleData?.envelope_image ?? "/designs/classic/envelope-gold-closed.png"}
									alt="Click to open invitation"
									width={250}
									height={250}
									className="object-cover shadow-2xl shadow-black/50"
								/>
							</motion.div>

							{/* Glowing effect around envelope */}
							<motion.div
								className="absolute inset-0"
								animate={{
									boxShadow: [
										"0 0 0px rgba(214, 198, 179, 0)",
										"0 0 20px rgba(214, 198, 179, 0.3)",
										"0 0 40px rgba(214, 198, 179, 0.1)",
										"0 0 0px rgba(214, 198, 179, 0)",
									],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									repeatType: "reverse",
								}}
							/>
						</motion.div>

						{/* Tap to Open */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 0.9,
								duration: 0.8,
								type: "spring",
								bounce: 0.3,
							}}
							className="text-center"
						>
							<motion.p
								className="text-sm font-edensor text-[#660033]/60 text-center font-semibold"
								animate={{
									opacity: [0.6, 1, 0.6],
									scale: [1, 1.05, 1],
									y: [0, -2, 0],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatType: "reverse",
									ease: "easeInOut",
								}}
							>
								Klik untuk membuka
							</motion.p>

							{/* Animated arrow or pointer */}
							<motion.div
								className="flex justify-center mt-2"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.5, duration: 0.5 }}
							>
								<motion.div
									className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#660033]/40"
									animate={{
										y: [0, 5, 0],
										opacity: [0.4, 0.8, 0.4],
									}}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										repeatType: "reverse",
										ease: "easeInOut",
									}}
									style={{ transform: "rotate(180deg)" }}
								/>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export const Opening = ({
	data,
	invitationId,
}: {
	data: InputJsonValue;
	invitationId?: string;
}) => {
	return (
		<Suspense
			fallback={<div className="min-h-svh flex items-center justify-center">Loading...</div>}
		>
			<OpeningContent data={data} invitationId={invitationId} />
		</Suspense>
	);
};
