import { InputJsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

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
					<motion.div
						className="absolute inset-0 flex flex-col items-center justify-center px-18"
						initial={{ opacity: 0, y: -30, scale: 0.8 }}
						whileInView={{ opacity: 1, y: 0, scale: 1 }}
						transition={{
							delay: 0.3,
							duration: 1.2,
							type: "spring",
							bounce: 0.4,
						}}
					>
						<div className="text-center max-w-xs flex flex-col gap-10">
							<Image
								src="/designs/classic/bismillah.png"
								alt="Bismillah"
								width={500}
								height={50}
								className="object-contain px-4"
							/>

							{/* Translation */}

							<p className=" text-[#660033] text-center font-edensor font-semibold text-xl">
								{moduleData.translation ??
									"Dengan memohon rahmat dan ridho Allah subhanallahu wata’ala, kami mengundang Bapak/Ibu, Saudara/i untuk menghadiri tasyakuran pernikahan putra-putri kami"}
							</p>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};
