// import { Button } from "@/components/ui/button";
import { InputJsonValue } from "@prisma/client/runtime/library";
// import { Instagram } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

type ModuleData = {
	full_name?: string;
	description?: string;
	image?: string;
	instagram?: string;
};

export const Bride = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section className="text-center flex flex-col items-center gap-4 py-12 bg-[#660033]">
			<motion.h1
				className="text-4xl font-bold font-cedarville text-white"
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
			>
				{moduleData.full_name ?? "Jane Doe"}
			</motion.h1>
			<motion.p
				className="mt-2 text-lg font-cedarville text-white max-w-72 mx-auto"
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
			>
				{moduleData.description ?? "Daughter of Mr. and Mrs. Doe"}
			</motion.p>
			<motion.div
				className="flex justify-center"
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
			>
				<Image
					src={moduleData.image ?? "/designs/classic/doodle3.png"}
					alt="Couple"
					className=""
					width={150}
					height={150}
				/>
			</motion.div>
			{/* <Button
				variant="outline"
				className="flex justify-center items-center border-white gap-2 hover:bg-gray-100/10"
			>
				<a
					href={`https://www.instagram.com/${moduleData.instagram ?? "jane_doe"}`}
					className="flex items-center gap-2"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Instagram className="h-6 w-6 text-white" />
					<p className="text-white">{moduleData.instagram ?? "jane_doe"}</p>
				</a>
			</Button> */}
		</section>
	);
};
