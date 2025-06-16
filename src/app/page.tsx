"use client";

import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";

export default function LandingPage() {
	return (
		<div className="relative min-h-screen w-full">
			<Navbar />

			<main className="">
				<HeroSection />
			</main>

			<Footer />
		</div>
	);
}
