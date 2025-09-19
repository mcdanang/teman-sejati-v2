import { InputJsonValue } from "@prisma/client/runtime/library";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ModuleData = {
	title?: string;
	subtitle?: string;
	image?: string;
};

export const Closing = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section
			className="text-center py-16 bg-[#d6c6b3] overflow-hidden flex items-center justify-center"
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			<div className="max-w-4xl mx-auto px-4">
				{/* Main Content */}
				<div className="mb-12">
					<h1 className="text-5xl font-bold font-pinyon text-[#660033] mb-6">
						{moduleData.title ?? "Terima Kasih"}
					</h1>
					<div className="max-w-3xl mx-auto">
						<p className="text-md text-[#660033]/80 font-edensor leading-relaxed font-semibold">
							{moduleData.subtitle ??
								//translate to english
								"Thank you for your presence and prayers from all of you. We appreciate your love and support. May Allah SWT reward you with the best."}
						</p>
					</div>
				</div>
				{/* Image Section */}
				<div className="flex justify-center mb-12">
					<div className="relative">
						<Image
							src={moduleData.image ?? "/designs/classic/couple.svg"}
							alt="Wedding Couple"
							className="rounded-2xl shadow-2xl"
							width={500}
							height={400}
							priority
						/>
						{/* Decorative elements */}
						<div className="absolute -top-4 -left-4 w-8 h-8 bg-[#660033]/20 rounded-full opacity-60"></div>
						<div className="absolute -bottom-4 -right-4 w-6 h-6 bg-[#660033]/30 rounded-full opacity-60"></div>
						<div className="absolute top-1/2 -right-6 w-4 h-4 bg-[#660033]/40 rounded-full opacity-60"></div>
					</div>
				</div>

				{/* Powered by Teman Sejati */}
				<div className="flex flex-col items-center gap-2">
					<div className="flex items-center gap-2">
						<p className="text-sm text-[#660033]/70 font-edensor">
							Powered by{" "}
							<Link
								href="https://teman-sejati.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#660033] font-edensor font-semibold"
							>
								Teman Sejati
							</Link>
						</p>
						{/* <Image src="/images/logo1.svg" alt="Teman Sejati" width={100} height={100} /> */}
					</div>
				</div>
			</div>
		</section>
	);
};
