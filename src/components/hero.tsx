"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
	return (
		<section className="relative flex flex-col md:flex-row min-h-screen bg-background">
			{/* Left Side */}
			<div className="flex-1 bg-background p-10 md:p-20 relative overflow-hidden flex justify-center">
				<div className="absolute w-40 h-40 bg-secondary rounded-full top-20 left-10 opacity-70"></div>
				<div className="absolute w-60 h-60 bg-secondary rounded-full bottom-10 left-20 opacity-50"></div>
			</div>

			{/* Right Side */}
			<div className="flex-1 bg-muted p-10 flex items-center justify-center relative clip-diagonal "></div>

			<div className="px-6 absolute flex flex-col md:flex-row w-full md:justify-evenly items-center top-0 left-0 h-screen md:h-full">
				<div className="max-w-xl relative z-10 flex flex-col justify-center h-full mt-16 md:mt-0 gap-4">
					<h1 className="text-3xl md:text-6xl font-serif font-bold text-accent leading-tight">
						Rayakan Cinta dengan Undangan Digital yang Berkesan
					</h1>
					<p className="text-gray-600 text-sm md:text-lg max-w-sm">
						Buat undangan pernikahan yang indah, personal, dan mudah dibagikan. Ceritakan kisah
						cinta Anda dengan desain yang tak terlupakan.
					</p>
					<div className="flex flex-wrap gap-4">
						<Button>Buat Undangan Sekarang</Button>
						<Button variant="outline">Lihat Contoh</Button>
					</div>
				</div>
				<HeroCard />
			</div>

			<style jsx>{`
				.clip-diagonal {
					clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
				}

				@media (max-width: 768px) {
					.clip-diagonal {
						/* horizontal diagonal at the bottom */
						clip-path: polygon(0 10%, 100% 0, 100% 100%, 0% 100%);
					}
				}
			`}</style>
		</section>
	);
}

function HeroCard() {
	return (
		<CardContainer className="inter-var">
			<CardBody className="bg-transparent relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[40rem] h-auto rounded-xl p-6">
				<CardItem translateZ="100" className="w-full mb-4 mt-10">
					<Image
						src="/hero.png"
						height="1000"
						width="1000"
						className="h-60 md:h-[28rem] w-full object-cover rounded-xl group-hover/card:shadow-xl"
						alt="Couple Silhouette"
					/>
				</CardItem>
				<CardItem
					translateZ="50"
					className="text-xl text-center w-full text-neutral-600 dark:text-white"
				>
					Satu undangan, sejuta makna.
				</CardItem>
			</CardBody>
		</CardContainer>
	);
}
