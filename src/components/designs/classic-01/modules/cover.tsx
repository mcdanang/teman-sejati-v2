"use client";
import Image from "next/image";
import { motion } from "motion/react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { InputJsonValue } from "@prisma/client/runtime/library";

type CoverModuleData = {
	envelope_image?: string;
};

export const Cover = ({ data }: { data: InputJsonValue; invitationId?: string }) => {
	const moduleData = data as CoverModuleData;
	const searchParams = useSearchParams();
	const to = searchParams.get("to");

	return (
		<section className="text-center bg-white flex flex-col justify-evenly items-center h-dvh">
			<motion.div
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
				className="text-6xl mx-auto font-pinyon text-black space-y-1 z-10"
			>
				<h1>We are pleased</h1>
			</motion.div>

			<div className="relative w-[300px] h-[640px]">
				<Image
					src={moduleData?.envelope_image ?? "/designs/classic/amplop-back.png"}
					alt="Invitation"
					className="object-cover absolute top-55 left-0 shadow-2xl shadow-[#660033]"
					width={300}
					height={300}
				/>
				<motion.div
					whileInView={{ translateY: -75, translateX: -15 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
				>
					<Image
						src={moduleData?.envelope_image ?? "/designs/classic/main_back.png"}
						alt="Invitation"
						className="object-cover absolute top-20 -left-4 -rotate-[12deg] shadow-lg"
						width={250}
						height={250}
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
						className="object-cover absolute top-30 right-10 -rotate-6 grayscale"
						width={80}
						height={80}
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
						width={180}
						height={180}
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
						className="object-cover absolute top-45 -right-3 rotate-6 grayscale"
						width={80}
						height={80}
					/>
				</motion.div>
				<motion.div
					whileInView={{ translateY: -75, translateX: -15 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
				>
					<Image
						src={moduleData?.envelope_image ?? "/designs/classic/main_front.png"}
						alt="Invitation"
						className="object-cover absolute top-65 -left-2 -rotate-12"
						width={200}
						height={200}
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
						className="object-cover absolute top-70 -right-10 rotate-[20deg]"
						width={240}
						height={240}
					/>
				</motion.div>

				<Image
					src={moduleData?.envelope_image ?? "/designs/classic/amplop-front.png"}
					alt="Invitation"
					className="object-cover absolute top-55 left-0"
					width={300}
					height={300}
				/>
				<div className="absolute bottom-2 left-7 text-[#d6c6b3] border border-[#d6c6b3] px-3 py-1 rounded-lg w-42 h-22 text-left flex flex-col justify-between font-edensor font-bold">
					<p>dear,</p>
					<p className="">{to || "Muhamad Danang Priambodo"}</p>
				</div>
			</div>

			<motion.div
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
				className="text-6xl mx-auto font-pinyon text-black space-y-1 z-10 mt-6"
			>
				<h1>to invite you</h1>
			</motion.div>
		</section>
	);
};
