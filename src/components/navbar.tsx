"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				isScrolled ? "backdrop-blur-md py-1 bg-background shadow-md" : "py-4 bg-transparent"
			}`}
		>
			<div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
				{/* <div className="text-xl font-serif font-bold text-primary">Teman Sejati</div> */}
				<div className="flex items-center p-2">
					<Link className="flex items-center" href="/">
						<Image src={"/images/logo1.svg"} alt="logo" width={120} height={120} />
					</Link>
				</div>
				<nav className="hidden md:flex space-x-16 text-slate-500 font-medium">
					<a href="#" className="group hover:text-primary duration-200 transition">
						Fitur
						<span className="block max-w-0 group-hover:max-w-full duration-200 transition-all h-0.5 bg-primary"></span>
					</a>
					<a href="#" className="group hover:text-primary duration-200 transition">
						Contoh Undangan
						<span className="block max-w-0 group-hover:max-w-full duration-200 transition-all h-0.5 bg-primary"></span>
					</a>
					<a href="#" className="group hover:text-primary duration-200 transition">
						Harga
						<span className="block max-w-0 group-hover:max-w-full duration-200 transition-all h-0.5 bg-primary"></span>
					</a>
					<a href="#" className="group hover:text-primary duration-200 transition">
						Cara Kerja
						<span className="block max-w-0 group-hover:max-w-full duration-200 transition-all h-0.5 bg-primary"></span>
					</a>
					<a href="#" className="group hover:text-primary duration-200 transition">
						FAQ
						<span className="block max-w-0 group-hover:max-w-full duration-200 transition-all h-0.5 bg-primary"></span>
					</a>
				</nav>
				<div className="flex items-center space-x-4">
					<Link href="/member/dashboard">
						<Button className="">Buat Undangan</Button>
					</Link>
				</div>
			</div>
		</header>
	);
}
