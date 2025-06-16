"use client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Invitation } from "@prisma/client";

export default function Dashboard() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	async function createNewHandler() {
		setIsLoading(true);
		try {
			const response = await fetch("/api/member/invitations", {
				method: "POST",
			});

			if (!response.ok) {
				throw new Error("Failed to create new invitation");
			}

			const result = await response.json();

			router.push("/member/invitations/" + result.id + "/edit");
		} catch (error) {
			toast("Error creating invitation", {
				description: error instanceof Error ? error.message : String(error),
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex min-h-screen w-full flex-col">
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-8">
				<Card className="col-span-4 mt-8 overflow-clip flex justify-between">
					<div>
						<CardHeader className="pb-3">
							<CardTitle className="text-sandy-brown-500">
								Mulai Buat Undangan Pernikahan Impianmu
							</CardTitle>
							<CardDescription className="text-balance leading-relaxed text-black dark:text-white">
								Desain undangan digital elegan untuk hari spesialmu hanya dalam beberapa klik.
								<br />
								Cukup tambahkan detail pernikahanmu, dan undangan siap digunakan!
							</CardDescription>
						</CardHeader>
						<CardFooter>
							{isLoading ? (
								<Button disabled className="w-60">
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Membuat...
								</Button>
							) : (
								<Button className="w-60" onClick={createNewHandler}>
									Buat undangan baru
								</Button>
							)}
						</CardFooter>
					</div>
				</Card>

				{/* <ShareLinkCard /> */}
			</main>
		</div>
	);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ShareLinkCard() {
	const [userInvitations, setUserInvitations] = useState<Invitation[]>([]);

	const fetchUserInvitations = useCallback(async () => {
		try {
			const response = await fetch(`/api/member/invitations?limit=${100}`);
			if (!response.ok) {
				throw new Error("Failed to fetch user invitations data");
			}
			const data = await response.json();

			setUserInvitations(data.invitations);
			setSlug(data.invitations[0]?.slug);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		fetchUserInvitations();
	}, [fetchUserInvitations]);

	const [slug, setSlug] = useState("");
	const [guestName, setGuestName] = useState("Mr. Danang");

	// Construct the URL with the guestName URL-encoded
	const constructedUrl = `${window.location.origin}/wedding/${slug}?to=${encodeURIComponent(guestName)}`;

	// Function to copy the constructed URL to clipboard
	const copyToClipboard = () => {
		navigator.clipboard.writeText(constructedUrl);
		toast("Link copied to clipboard!", {
			// description: "Link copied to clipboard!",
		});
	};

	return (
		<Card className="col-span-4 overflow-clip flex justify-between">
			<div>
				<CardHeader className="pb-3">
					<CardTitle className="text-burnt-sienna-500">Share public link to your guest</CardTitle>
					<CardDescription className="text-balance leading-relaxed text-black dark:text-white">
						Choose your invitation slug, add your guest name, and your invitation is ready to go!
					</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col sm:flex-row gap-4 items-start pb-3">
					<div className="">
						<label
							className="block text-black dark:text-white text-sm font-bold mb-2"
							htmlFor="slug"
						>
							Invitation Slug
						</label>
						<select
							id="slug"
							value={slug}
							onChange={e => setSlug(e.target.value)}
							className="w-full px-3 py-2 border rounded-md text-sm"
						>
							{userInvitations.map(invitation => (
								<option key={invitation.id} value={invitation.slug}>
									{invitation.slug}
								</option>
							))}
						</select>
					</div>
					<div className="mr-10">
						<label
							className="block text-black dark:text-white text-sm font-bold mb-2"
							htmlFor="guest_name"
						>
							Guest Name
						</label>
						<input
							type="text"
							id="guest_name"
							value={guestName}
							onChange={e => setGuestName(e.target.value)}
							className="w-full px-3 py-2 border rounded-md text-sm"
							placeholder="Enter guest name"
						/>
					</div>
					<div className="">
						<label
							className="block text-black dark:text-white text-sm font-bold mb-2"
							htmlFor="guest_name"
						>
							Public URL
						</label>
						<div className="flex gap-2 items-center">
							<Button
								onClick={copyToClipboard}
								size="sm"
								className="bg-accent text-white py-2 px-4 rounded hover:bg-persian-green-500"
							>
								Copy Link
							</Button>
							<p className="text-persian-green-700 hover:text-persian-green-500 break-all">
								{constructedUrl}
							</p>
						</div>
					</div>
					{/* Copy to Clipboard Button */}
				</CardContent>
				<CardFooter>
					<div className="text-sm text-slate-500">
						Or you can use this{" "}
						<Link
							href="https://docs.google.com/spreadsheets/d/1Y-wvuK8DJkSAITsa_M5zlD3kE3JGefZVlfb6g_8VmqE/copy"
							target="_blank"
							className="underline text-persian-green-600"
						>
							Google Sheet Template
						</Link>
					</div>
				</CardFooter>
			</div>
		</Card>
	);
}
