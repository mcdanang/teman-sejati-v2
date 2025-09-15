"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { useSearchParams } from "next/navigation";

type ModuleData = {
	envelope_image: string;
};

export const Opening = ({ data }: { data: ModuleData }) => {
	const moduleData = data as ModuleData;
	const searchParams = useSearchParams();
	const to = searchParams.get("to");

	return (
		<section className="text-center py-12 bg-[#660033] flex flex-col items-center">
			<motion.div
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
				className="text-6xl mx-auto font-pinyon text-white space-y-1 z-10"
			>
				<h1>You&apos;re</h1>
			</motion.div>

			<div className="relative w-[300px] h-[640px]">
				<Image
					src={moduleData?.envelope_image ?? "/designs/classic/envelope_back.png"}
					alt="Invitation"
					className="object-cover absolute top-55 left-0"
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
						className="object-cover absolute top-25 left-0 -rotate-12"
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
						className="object-cover absolute top-30 right-10 -rotate-6"
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
						src={moduleData?.envelope_image ?? "/designs/classic/round_front.png"}
						alt="Invitation"
						className="object-cover absolute top-40 left-15"
						width={200}
						height={200}
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
						className="object-cover absolute top-45 -right-3 rotate-6"
						width={80}
						height={80}
					/>
				</motion.div>
				<motion.div
					whileInView={{ translateY: -75, translateX: 15 }}
					transition={{ duration: 1, ease: "easeInOut" }}
					whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
				>
					<Image
						src={moduleData?.envelope_image ?? "/designs/classic/round_back.png"}
						alt="Invitation"
						className="object-cover absolute top-80 right-0 rotate-12"
						width={180}
						height={180}
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
						className="object-cover absolute top-70 left-5 -rotate-12"
						width={200}
						height={200}
					/>
				</motion.div>

				<Image
					src={moduleData?.envelope_image ?? "/designs/classic/envelope_front.png"}
					alt="Invitation"
					className="object-cover absolute top-55 left-0"
					width={300}
					height={300}
				/>
				<div className="absolute bottom-3 left-7 text-black bg-white p-3 rounded-lg text-[0.5rem] w-28 h-16 text-left flex flex-col justify-between">
					<p>Dear,</p>
					<p className="">{to || "Guest"}</p>
				</div>
			</div>

			<motion.div
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
				className="text-6xl mx-auto font-pinyon text-white space-y-1 z-10"
			>
				<h1>invited</h1>
			</motion.div>
		</section>
	);
};
