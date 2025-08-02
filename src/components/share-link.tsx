import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { InvitationWithModules } from "@/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ShareLinkCard({
	activeInvitation,
}: {
	activeInvitation: InvitationWithModules;
}) {
	const [slug, setSlug] = useState(activeInvitation.slug);
	const [guestName, setGuestName] = useState("Muhamad Danang Priambodo");

	// Construct the URL with the guestName URL-encoded
	const constructedUrl = `${window.location.origin}/w/${slug}?to=${encodeURIComponent(guestName)}`;

	// Function to copy the constructed URL to clipboard
	const copyToClipboard = () => {
		navigator.clipboard.writeText(constructedUrl);
		toast.success("Link copied to clipboard!");
	};

	useEffect(() => {
		setSlug(activeInvitation.slug);
	}, [activeInvitation.slug]);

	return (
		<Card className="overflow-clip flex justify-between">
			<div>
				<CardHeader className="pb-3">
					<CardTitle className="">Bagikan tautan undangan ke tamu</CardTitle>
					<CardDescription className="text-balance leading-relaxed text-black dark:text-white">
						Tambahkan nama tamu, dan undangan siap untuk dibagikan!
					</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col gap-4 items-start pb-3">
					<div className="w-full">
						<Label
							className="block text-black dark:text-white text-sm font-bold mb-2"
							htmlFor="guest_name"
						>
							Nama Tamu
						</Label>
						<Input
							type="text"
							id="guest_name"
							value={guestName}
							onChange={e => setGuestName(e.target.value)}
							placeholder="Masukkan nama tamu"
							className="w-full"
						/>
					</div>
					<div className="w-full">
						<label
							className="block text-black dark:text-white text-sm font-bold mb-2"
							htmlFor="guest_name"
						>
							Tautan Undangan
						</label>
						<div className="flex flex-col gap-2">
							<p className="break-all">{constructedUrl}</p>
							<Button onClick={copyToClipboard} size="sm" className="">
								Salin Tautan
							</Button>
						</div>
					</div>
					{/* Copy to Clipboard Button */}
				</CardContent>
				<CardFooter>
					<div className="text-sm flex flex-col gap-2">
						<div>
							Atau Anda bisa menggunakan template Google Sheet berikut untuk memasukkan nama tamu
							sekaligus:{" "}
						</div>
						<Link
							href="https://docs.google.com/spreadsheets/d/1Y-wvuK8DJkSAITsa_M5zlD3kE3JGefZVlfb6g_8VmqE/copy"
							target="_blank"
							className="underline text-accent"
						>
							Template Google Sheet
						</Link>
					</div>
				</CardFooter>
			</div>
		</Card>
	);
}
