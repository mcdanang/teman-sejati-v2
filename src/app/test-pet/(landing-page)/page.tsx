import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import Hero from "@/components/Hero";
import React from "react";
import ZoomableImage from "@/components/ui/zoomable-image";

export default function Home() {
	return (
		<>
			<Hero />
			<HowItWorks />
			<div className="container">
				{/* <Pricing /> */}
				<FAQ />
			</div>
		</>
	);
}

const data = [
	{
		title: "Create your invitation",
		content: (
			<div>
				<p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
					Start by clicking &quot;Create a new invitation&quot;. We&apos;ll then create a template for your
					invitation.
				</p>
				<div className="grid grid-cols-1 gap-4">
					<ZoomableImage
						src="/images/create-invitation.png"
						alt="create invitation"
						width={1200}
						height={1200}
						className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
					/>
				</div>
			</div>
		),
	},
	{
		title: "Edit your data",
		content: (
			<div>
				<p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
					Edit your invitation data. Add some background music and your best photos.
				</p>
				<div className="grid grid-cols-1 gap-4">
					<ZoomableImage
						src="/images/edit-invitation-1.png"
						alt="edit invitation"
						width={1200}
						height={1200}
						className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
					/>
					<ZoomableImage
						src="/images/edit-invitation-2.png"
						alt="edit invitation"
						width={1200}
						height={1200}
						className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
					/>
				</div>
			</div>
		),
	},
	{
		title: "Publish your invitation to the world",
		content: (
			<div>
				<p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
					Share your creation with friends and family. Your invitation is now ready to be seen by the world!
				</p>

				<div className="grid grid-cols-1 gap-4">
					<ZoomableImage
						src="/images/publish-invitation-1.png"
						alt="publish invitation"
						width={1200}
						height={1200}
						className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
					/>
					<ZoomableImage
						src="/images/publish-invitation-2.png"
						alt="publish invitation"
						width={1200}
						height={1200}
						className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
					/>
				</div>
			</div>
		),
	},
];

function HowItWorks() {
	return (
		<section className="py-16" id="how-it-works">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center">How It Works</h2>
				<div className="w-full">
					<Timeline data={data} />
				</div>
			</div>
		</section>
	);
}
