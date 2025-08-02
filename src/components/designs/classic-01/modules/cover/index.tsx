import { Data } from "@/components/module-form/cover";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

export const Cover = ({ data }: { data: Data }) => {
	const searchParams = useSearchParams();
	const guestName = searchParams.get("to");
	return (
		<section className="text-center py-12 bg-white">
			<h1 className="text-4xl font-bold">{data?.title ?? "Cover Title"}</h1>
			<p className="mt-2 text-lg text-gray-500">{data?.subtitle ?? "Cover Subtitle"}</p>
			<div className="flex justify-center">
				<Image
					src={data?.image ?? "/designs/classic/couple.svg"}
					alt="Couple"
					className="mt-6 rounded-lg shadow-lg"
					width={400}
					height={300}
				/>
			</div>
			<div className="flex justify-center">
				<p className="text-sm text-gray-500">Kepada Yth.</p>
				{/* guest name from query params */}
				<p className="text-sm text-gray-500">{guestName}</p>
			</div>
		</section>
	);
};
