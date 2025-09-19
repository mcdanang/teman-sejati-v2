import Image from "next/image";
import React from "react";
import { Data } from "../module-forms/opening";
import { motion } from "motion/react";
import { InputJsonValue } from "@prisma/client/runtime/library";

export const Opening = ({ data }: { data: InputJsonValue; invitationId?: string }) => {
	const moduleData = data as Data;
	return (
		<section
			className="text-center bg-cover bg-center bg-no-repeat flex flex-col items-center min-h-svh"
			style={{ backgroundImage: "url('/designs/classic/bg-red.png')" }}
		>
			<div className="flex flex-col justify-evenly items-center h-lvh">
				<motion.div
					whileInView={{
						scale: 1.05,
						transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
					}}
					className="text-6xl mx-auto font-pinyon text-[#d6c6b3] -rotate-12 space-y-3 translate-y-12"
				>
					<h1>{moduleData?.groom_short_name ?? "John"}</h1>
					<div className="flex">
						<h1 className="text-4xl font-alex-brush font-light translate-x-2 -translate-y-2">&</h1>
						<h1>{moduleData?.bride_short_name ?? "Jane"}</h1>
					</div>
				</motion.div>

				<div className="flex w-fit justify-center bg-black/80 p-3">
					<Image
						src={moduleData?.image ?? "/designs/classic/prewedding-dancing.gif"}
						alt="Couple"
						className="object-cover"
						width={300}
						height={300}
					/>
				</div>

				<motion.div
					whileInView={{
						scale: 1.05,
						transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
					}}
					className="text-6xl mx-auto font-pinyon text-[#d6c6b3] -rotate-12 space-y-1 -translate-y-12"
				>
					<h1>are getting</h1>
					<h1>married</h1>
				</motion.div>

				{/* <motion.div
				whileInView={{
					scale: 1.05,
					transition: { delay: 0.3, duration: 2, bounce: 0.7, type: "spring" },
				}}
				className="text-6xl mx-auto font-pinyon text-[#d6c6b3] space-y-1 mt-10"
			>
				<h1>and...</h1>
			</motion.div> */}
			</div>
		</section>
	);
};
