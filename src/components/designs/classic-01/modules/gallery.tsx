import { DraggableCard } from "@/components/draggable-card";
import { InputJsonValue } from "@prisma/client/runtime/library";
import React from "react";

type ModuleData = {
	title?: string;
	subtitle?: string;
	image?: string;
	// add other fields as needed
};

export const Gallery = ({ data }: { data: InputJsonValue }) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const moduleData = data as ModuleData;

	const items = [
		{
			image: "/designs/classic/photo1.jpg",
			className: "absolute top-30 left-[20%] rotate-[-5deg]",
		},
		{
			image: "/designs/classic/photo2.jpg",
			className: "absolute top-60 left-[5%] rotate-[-7deg]",
		},
		{
			image: "/designs/classic/photo3.jpg",
			className: "absolute top-5 left-[40%] rotate-[8deg]",
		},
		{
			image: "/designs/classic/photo4.jpg",
			className: "absolute top-52 left-[55%] rotate-[10deg]",
		},
		{
			image: "/designs/classic/photo5.jpg",
			className: "absolute top-40 right-[35%] rotate-[2deg]",
		},
		{
			image: "/designs/classic/photo6.jpg",
			className: "absolute top-90 left-[45%] rotate-[-7deg]",
		},
		{
			image: "/designs/classic/photo7.jpg",
			className: "absolute top-28 left-[30%] rotate-[4deg]",
		},
	];

	return (
		<section
			className="text-center bg-[#d6c6b3] overflow-hidden flex items-center justify-center min-h-svh"
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			<DraggableCard items={items} />
		</section>
	);
};
