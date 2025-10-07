import { Button } from "@/components/ui/button";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import React from "react";

type ModuleData = {
	image?: string;
	akadDate?: string;
	akadDay?: string;
	akadTime?: string;
	resepsiDate?: string;
	resepsiTime?: string;
	google_calendar_url?: string;
	// add other fields as needed
};

export const Waktu = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as ModuleData;

	return (
		<section
			className="text-center relative min-h-svh flex items-end justify-center bg-[#dccbb8]"
			// style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			{/* <h1 className="text-4xl font-bold">{moduleData.title ?? "Waktu Title"}</h1>
			<p className="mt-2 text-lg text-gray-500">{moduleData.subtitle ?? "Waktu Subtitle"}</p> */}
			<div className="flex justify-center">
				<Image
					src={moduleData.image ?? "/designs/classic/main-illustration-compressed.png"}
					alt="Couple"
					className=""
					width={800}
					height={800}
				/>
			</div>

			{/* Content */}
			<div className="absolute top-0 left-0 w-full h-full flex-1 z-10 flex flex-col gap-4 py-16 px-4 items-center font-medium ">
				<div className="w-full z-10 flex flex-col gap-4 py-16 px-4 items-center font-medium ">
					{/* Title */}
					<div>
						<h1 className="text-4xl font-semibold text-[#660033] font-edensor">
							{moduleData.akadDay ?? "Saturday,"}
						</h1>
						<h1 className="text-4xl font-semibold text-[#660033] font-edensor">
							{moduleData.akadDate ?? "15 November 2025"}
						</h1>
					</div>
					<p className="text-lg text-[#660033] font-edensor font-semibold">
						Akad: {moduleData.akadTime ?? "7.30 - 9.30 WIB"}
					</p>
					<p className="text-lg text-[#660033] font-edensor font-semibold">
						Reception: {moduleData.resepsiTime ?? "10.30 - 13.00 WIB"}
					</p>
					<Button
						variant="outline"
						className="flex justify-center w-fit items-center border-[#660033] gap-2 hover:bg-gray-100/10 mt-4"
					>
						<a
							href={moduleData.google_calendar_url ?? "https://www.google.com"}
							className="flex items-center gap-2"
							target="_blank"
							rel="noopener noreferrer"
						>
							<CalendarDays className="h-6 w-6 text-[#660033]" />
							<p className="text-[#660033] font-edensor font-medium">Add to Calendar</p>
						</a>
					</Button>
				</div>
			</div>
		</section>
	);
};
