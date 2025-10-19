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
			image: "/designs/classic/gallery/photo1.jpg",
			className: "absolute top-30 left-[20%] rotate-[-5deg]",
		},
		{
			image: "/designs/classic/gallery/photo2.jpg",
			className: "absolute top-60 left-[5%] rotate-[-7deg]",
		},
		{
			image: "/designs/classic/gallery/photo3.jpg",
			className: "absolute top-80 left-[40%] rotate-[8deg]",
		},
		{
			image: "/designs/classic/gallery/photo4.jpg",
			className: "absolute top-52 left-[55%] rotate-[10deg]",
		},
		{
			image: "/designs/classic/gallery/photo5.jpg",
			className: "absolute top-40 right-[35%] rotate-[2deg]",
		},
		{
			image: "/designs/classic/gallery/photo6.jpg",
			className: "absolute top-80 left-[45%] rotate-[-7deg]",
		},
		{
			image: "/designs/classic/gallery/photo7.jpg",
			className: "absolute top-28 left-[30%] rotate-[4deg]",
		},
		{
			image: "/designs/classic/gallery/photo8.jpg",
			className: "absolute top-28 left-[30%] rotate-[4deg]",
		},
		{
			image: "/designs/classic/gallery/photo9.jpg",
			className: "absolute top-28 left-[15%] rotate-[2deg]",
		},
		{
			image: "/designs/classic/gallery/photo10.jpg",
			className: "absolute top-20 left-[34%] rotate-[8deg]",
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
