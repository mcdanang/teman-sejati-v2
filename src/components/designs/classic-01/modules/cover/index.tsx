import { Data } from "@/components/module-form/cover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MailOpen } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useCoverStore } from "@/stores/cover-store";

export const Cover = ({ data }: { data: Data }) => {
	const searchParams = useSearchParams();
	const guestName = searchParams.get("to");

	const { isMovedUp, setIsMovedUp } = useCoverStore();

	// Lock scroll when cover is visible
	useEffect(() => {
		if (!isMovedUp) {
			// Lock scroll
			document.body.style.overflow = "hidden";
			document.body.style.position = "fixed";
			document.body.style.width = "100%";
		} else {
			// Unlock scroll
			document.body.style.overflow = "";
			document.body.style.position = "";
			document.body.style.width = "";
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = "";
			document.body.style.position = "";
			document.body.style.width = "";
		};
	}, [isMovedUp]);

	return (
		<section
			className={cn(
				"absolute inset-0 text-center bg-[#3a2000] z-10 min-h-lvh transition-transform duration-700 p-4 flex flex-col justify-between",
				isMovedUp ? "-translate-y-full" : "translate-y-0"
			)}
		>
			<Image
				className="object-contain object-bottom absolute bottom-0 left-0"
				src="/images/cover-flower.png"
				fill={true}
				alt="cover-flower"
			/>

			<h1 className="text-4xl font-bold text-[#c4ad8b]">{data?.title ?? "Walimatul 'Urs"}</h1>
			<div className="flex justify-center overflow-hidden">
				<div className="flex items-center justify-center bg-[#3a2000]">
					<h1
						className="
          text-[100px] 
          font-extrabold 
          uppercase 
          text-transparent 
          bg-clip-text 
          bg-center bg-cover
					leading-none
        "
						style={{
							backgroundImage: "url('/designs/classic/photo1.jpg')",
						}}
					>
						DANANG KHALISA
					</h1>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center gap-2 mb-20">
				<p className="text-sm text-[#c4ad8b]">Kepada Yth.</p>
				<p className="text-sm text-[#c4ad8b]">{guestName ?? "Tamu"}</p>

				<Button
					className="w-48 z-10 bg-green-900 hover:bg-green-900/90 mt-4"
					onClick={() => setIsMovedUp(true)}
				>
					<MailOpen className="mr-2 w-4 h-4" /> Buka Undangan
				</Button>
			</div>
		</section>
	);
};
