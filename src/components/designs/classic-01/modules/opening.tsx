"use client";
import Image from "next/image";
import { motion } from "motion/react";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { InputJsonValue } from "@prisma/client/runtime/library";

type OpeningModuleData = {
	envelope_image?: string;
};

const OpeningContent = ({ data }: { data: InputJsonValue; invitationId?: string }) => {
	const moduleData = data as OpeningModuleData;
	const searchParams = useSearchParams();
	const to = searchParams.get("to");
	// const [isOverlayOpen, setIsOverlayOpen] = useState(true);

	// const handleEnvelopeClick = () => {
	//	setIsOverlayOpen(false);
	// };

	return (
		<section
			className="text-center flex flex-col justify-evenly items-center min-h-svh"
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			<motion.div
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
				className="text-5xl mx-auto font-pinyon text-black space-y-1 z-10"
			>
				<h1>We are pleased</h1>
			</motion.div>

			<div className="relative w-[calc(300px*4/5)] h-[calc(640px*4/5)]">
				<Image
					src={moduleData?.envelope_image ?? "/designs/classic/amplop-back.png"}
					alt="Invitation"
					className="object-cover absolute top-55 left-0 shadow-lg shadow-[#660033]"
					width={(300 * 4) / 5}
					height={(300 * 4) / 5}
				/>
				<motion.div
					whileInView={{ translateY: -75, translateX: -15 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
				>
					<Image
						src={moduleData?.envelope_image ?? "/designs/classic/hard-cover-burgundy-back.png"}
						alt="Invitation"
						className="object-cover absolute top-20 -left-4 -rotate-[12deg] shadow-[0_0_2px_0_rgba(0,0,0,0.5)]"
						width={(250 * 4) / 5}
						height={(250 * 4) / 5}
					/>
				</motion.div>
				<motion.div
					whileInView={{ translateY: -100, translateX: -7.5 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
				>
					<Image
						src={moduleData?.envelope_image ?? "/designs/classic/photobox-2.jpeg"}
						alt="Invitation"
						className="object-cover absolute top-30 right-10 -rotate-6 grayscale shadow-[0_0_2px_0_rgba(0,0,0,0.5)]"
						width={(80 * 4) / 5}
						height={(80 * 4) / 5}
					/>
				</motion.div>
				<motion.div
					whileInView={{ translateY: -50 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
				>
					<Image
						src={moduleData?.envelope_image ?? "/designs/classic/round_back.png"}
						alt="Invitation"
						className="object-cover absolute top-45 left-25"
						width={(180 * 4) / 5}
						height={(180 * 4) / 5}
					/>
				</motion.div>
				<motion.div
					whileInView={{ translateY: -100, translateX: 7.5 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
				>
					<Image
						src={moduleData?.envelope_image ?? "/designs/classic/photobox-1.png"}
						alt="Invitation"
						className="object-cover absolute top-45 -right-3 rotate-6 grayscale shadow-[0_0_2px_0_rgba(0,0,0,0.5)]"
						width={(80 * 4) / 5}
						height={(80 * 4) / 5}
					/>
				</motion.div>
				<motion.div
					whileInView={{ translateY: -75, translateX: -15 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
				>
					<Image
						src={moduleData?.envelope_image ?? "/designs/classic/hard-cover-burgundy-front.png"}
						alt="Invitation"
						className="object-cover absolute top-65 -left-2 -rotate-12 shadow-[0_0_2px_0_rgba(0,0,0,0.5)]"
						width={(200 * 4) / 5}
						height={(200 * 4) / 5}
					/>
				</motion.div>
				<motion.div
					whileInView={{ translateY: -75, translateX: 15 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
				>
					<Image
						src={moduleData?.envelope_image ?? "/designs/classic/round_front.png"}
						alt="Invitation"
						className="object-cover absolute top-70 -right-7 rotate-[20deg]"
						width={(240 * 4) / 5}
						height={(240 * 4) / 5}
					/>
				</motion.div>

				<Image
					src={moduleData?.envelope_image ?? "/designs/classic/envelope-burgundy-front.png"}
					alt="Invitation"
					className="object-cover absolute top-55 left-0"
					width={(300 * 4) / 5}
					height={(300 * 4) / 5}
				/>
				<div className="absolute -bottom-10 left-7 text-[#d6c6b3] border border-[#d6c6b3] px-3 py-1 rounded-lg w-38 h-18 text-left flex flex-col justify-between font-edensor font-bold">
					<p className="text-xs">dear,</p>
					<p className="text-sm">{to || "Muhamad Danang Priambodo"}</p>
				</div>
			</div>

			<motion.div
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
				className="text-5xl mx-auto font-pinyon text-black space-y-1 z-10 mt-10"
			>
				<h1>to invite you</h1>
			</motion.div>

			{/* Overlay Layer - Commented Out */}
			{/* <AnimatePresence>
				{isOverlayOpen && (
					<motion.div
						initial={{ y: 0 }}
						exit={{ y: "-100%" }}
						transition={{ duration: 0.8, ease: "easeInOut" }}
						onClick={handleEnvelopeClick}
						className="absolute inset-0 bg-gradient-to-b from-[#660033] to-[#4a0025] flex flex-col items-center justify-center z-50 cursor-pointer"
					>
						{/* Welcome Text */}
			{/* <motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							className="text-center mb-8"
						>
							<h1 className="text-4xl font-pinyon text-[#d6c6b3] mb-4">You&apos;re Invited</h1>
							<p className="text-lg font-edensor text-[#d6c6b3]/80">To our special day</p>
						</motion.div>

						{/* Envelope Display */}
			{/* <motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.6, duration: 0.8 }}
							whileHover={{ scale: 1.05 }}
							className="relative mb-20"
						>
							<Image
								src={moduleData?.envelope_image ?? "/designs/classic/amplop-full.png"}
								alt="Click to open invitation"
								width={200}
								height={200}
								className="object-cover shadow-2xl shadow-black/50"
							/>

							{/* Tap instruction */}
			{/* <motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.2, duration: 0.8 }}
								className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
							>
								<p className="text-sm font-edensor text-[#d6c6b3]/60 text-center">
									Tap anywhere to open
								</p>
							</motion.div>
						</motion.div>

						{/* Guest Name */}
			{/* {to && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.9, duration: 0.8 }}
								className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
							>
								<div className="text-[#d6c6b3] border border-[#d6c6b3] px-4 py-2 rounded-lg text-center font-edensor">
									<p className="text-xs opacity-70">dear,</p>
									<p className="text-sm font-semibold">{to}</p>
								</div>
							</motion.div>
						)}
					</motion.div>
				)}
			</AnimatePresence> */}
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
