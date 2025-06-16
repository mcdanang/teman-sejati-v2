"use client";

import React from "react";

export const EventDetails = ({ data }: { data: Record<string, string | string[]> }) => {
	return (
		<section className="bg-white py-12 px-4 max-w-2xl mx-auto">
			<h2 className="text-2xl font-semibold text-center mb-6">{data.mainTitle}</h2>

			<div className="mb-8">
				<h3 className="text-xl font-bold">{data.akadTitle}</h3>
				<p className="text-gray-700">
					{data.akadDate} {data.akadTime}
				</p>
				<p className="text-gray-500">{data.akadLocation}</p>
			</div>

			<div>
				<h3 className="text-xl font-bold">{data.resepsiTitle}</h3>
				<p className="text-gray-700">
					{data.resepsiDate} {data.resepsiTime}
				</p>
				<p className="text-gray-500">{data.resepsiLocation}</p>
			</div>
		</section>
	);
};
