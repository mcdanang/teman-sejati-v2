// import { Button } from "@/components/ui/button";
import { InputJsonValue } from "@prisma/client/runtime/library";
// import { Instagram } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

type ModuleData = {
	full_name?: string;
	father_name?: string;
	mother_name?: string;
	image?: string;
	instagram?: string;
	// Legacy support
	description?: string;
};

export const Groom = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section
			className="text-center flex flex-col justify-center items-center gap-6 bg-[#660033] min-h-svh snap-start snap-always py-12"
			style={{ backgroundImage: "url('/designs/classic/bg-red.png')" }}
		>
			<div className="flex flex-col items-center gap-6 max-w-sm mx-auto">
				{/* Title */}
				<motion.h2
					className="text-3xl font-bold font-edensor text-[#d6c6b3] mb-2"
					whileInView={{
						scale: 1.05,
						transition: { delay: 0.2, duration: 1.5, bounce: 0.7, type: "spring" },
					}}
				>
					The Groom
				</motion.h2>

				{/* Image */}
				<motion.div
					className="flex justify-center"
					whileInView={{
						scale: 1.05,
						transition: { delay: 0.4, duration: 1.5, bounce: 0.7, type: "spring" },
					}}
				>
					<Image
						src={moduleData.image ?? "/designs/classic/doodle2.png"}
						alt="The Groom"
						className="object-cover"
						width={200}
						height={200}
					/>
				</motion.div>

				{/* Name */}
				<motion.h1
					className="text-3xl font-bold font-edensor text-white"
					whileInView={{
						scale: 1.05,
						transition: { delay: 0.6, duration: 1.5, bounce: 0.7, type: "spring" },
					}}
				>
					{moduleData.full_name ?? "John Doe"}
				</motion.h1>

				{/* Parents Names */}
				<motion.div
					className="text-center space-y-1"
					whileInView={{
						scale: 1.05,
						transition: { delay: 0.8, duration: 1.5, bounce: 0.7, type: "spring" },
					}}
				>
					<p className="text-xl font-edensor text-[#d6c6b3] font-medium">
						{moduleData.father_name ?? "Putra dari Bapak Hanggoro"}
					</p>
					<p className="text-xl font-edensor text-[#d6c6b3] font-medium">
						{moduleData.mother_name ?? "& Ibu Ida Risanti Wahyuni"}
					</p>
				</motion.div>
				{/* <Button
				variant="outline"
				className="flex justify-center items-center border-white gap-2 hover:bg-gray-100/10"
			>
				<a
					href={`https://www.instagram.com/${moduleData.instagram ?? "john_doe"}`}
					className="flex items-center gap-2"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Instagram className="h-6 w-6 text-white" />
					<p className="text-white">{moduleData.instagram ?? "john_doe"}</p>
				</a>
			</Button> */}
			</div>
		</section>
	);
};
