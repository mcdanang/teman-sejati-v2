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
				<h1>and</h1>
			</motion.div>

			<div className="relative w-[calc(300px*4/5)] h-[calc(640px*4/5)]">
				<Image
					src={moduleData?.envelope_image ?? "/designs/classic/envelope-burgundy-front.png"}
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
				<h1>you are invited</h1>
			</motion.div>
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
