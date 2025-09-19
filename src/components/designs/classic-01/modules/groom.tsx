// import { Button } from "@/components/ui/button";
import { InputJsonValue } from "@prisma/client/runtime/library";
// import { Instagram } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

type ModuleData = {
	full_name?: string;
	description?: string;
	image?: string;
	instagram?: string;
};

export const Groom = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section
			className="text-center flex flex-col justify-center items-center gap-4 bg-[#660033] min-h-svh"
			style={{ backgroundImage: "url('/designs/classic/bg-red.png')" }}
		>
			<div className="flex flex-col items-center gap-4">
				<motion.h1
					className="text-4xl font-bold font-edensor text-white max-w-sm"
					whileInView={{
						scale: 1.05,
						transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
					}}
				>
					{moduleData.full_name ?? "John Doe"}
				</motion.h1>
				<motion.p
					className="text-lg font-edensor text-white max-w-72 mx-auto"
					whileInView={{
						scale: 1.05,
						transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
					}}
				>
					{moduleData.description ?? "Son of Mr. and Mrs. Doe"}
				</motion.p>
				<motion.div
					className="flex justify-center"
					whileInView={{
						scale: 1.05,
						transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
					}}
				>
					<Image
						src={moduleData.image ?? "/designs/classic/doodle2.png"}
						alt="Couple"
						className="mt-10"
						width={300}
						height={300}
					/>
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
