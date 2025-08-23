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
	const moduleData = data as ModuleData;
	console.log(moduleData);

	const items = [
		{
			image: "/designs/classic/photo1.jpg",
			className: "absolute top-10 left-[20%] rotate-[-5deg]",
		},
		{
			image: "/designs/classic/photo2.jpg",
			className: "absolute top-40 left-[25%] rotate-[-7deg]",
		},
		{
			image: "/designs/classic/photo3.jpg",
			className: "absolute top-5 left-[40%] rotate-[8deg]",
		},
		{
			image: "/designs/classic/photo4.jpg",
			className: "absolute top-32 left-[55%] rotate-[10deg]",
		},
		{
			image: "/designs/classic/photo5.jpg",
			className: "absolute top-20 right-[35%] rotate-[2deg]",
		},
		{
			image: "/designs/classic/photo6.jpg",
			className: "absolute top-24 left-[45%] rotate-[-7deg]",
		},
		{
			image: "/designs/classic/photo7.jpg",
			className: "absolute top-8 left-[30%] rotate-[4deg]",
		},
	];

	return (
		<section className="text-center py-12 bg-[#660033]">
			<DraggableCard items={items} />
		</section>
	);
};
