"use client";

import { useState, useEffect, useCallback } from "react";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface WeddingWishModuleData {
	title: string;
	description: string;
}

interface WeddingWish {
	id: string;
	guest_name: string;
	wish_message: string;
	created_at: string;
}

interface WeddingWishesResponse {
	wishes: WeddingWish[];
	pagination: {
		page: number;
		limit: number;
		totalCount: number;
		hasMore: boolean;
	};
}

export const WeddingWishes = ({
	data,
	invitationId,
}: {
	data: InputJsonValue;
	invitationId: string;
}) => {
	const moduleData = data as unknown as WeddingWishModuleData;
	const [wishes, setWishes] = useState<WeddingWish[]>([]);
	const [loading, setLoading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [guestName, setGuestName] = useState("");
	const [wishMessage, setWishMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const fetchWishes = useCallback(
		async (pageNum: number, reset = false) => {
			if (!invitationId) return;

			setLoading(true);
			try {
				const response = await fetch(
					`/api/wedding-wishes?invitation_id=${invitationId}&page=${pageNum}&limit=5`
				);

				if (!response.ok) {
					throw new Error("Failed to fetch wishes");
				}

				const data: WeddingWishesResponse = await response.json();

				if (reset) {
					setWishes(data.wishes);
				} else {
					setWishes(prev => [...prev, ...data.wishes]);
				}

				setHasMore(data.pagination.hasMore);
				setPage(pageNum);
			} catch (error) {
				console.error("Error fetching wishes:", error);
				toast.error("Failed to load wishes");
			} finally {
				setLoading(false);
			}
		},
		[invitationId]
	);

	const loadMoreWishes = useCallback(() => {
		if (!loading && hasMore) {
			fetchWishes(page + 1);
		}
	}, [loading, hasMore, fetchWishes, page]);

	// Auto-fill guest name from query params
	useEffect(() => {
		if (typeof window !== "undefined") {
			const urlParams = new URLSearchParams(window.location.search);
			const toParam = urlParams.get("to");
			setGuestName(toParam || "Anonymous");
		}
	}, []);

	// Fetch initial wishes
	useEffect(() => {
		if (invitationId) {
			fetchWishes(1, true);
		}
	}, [invitationId, fetchWishes]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!invitationId) {
			toast.error("Invitation ID is required");
			return;
		}

		if (!guestName.trim()) {
			toast.error("Please enter your name");
			return;
		}

		if (!wishMessage.trim()) {
			toast.error("Please enter your wish message");
			return;
		}

		setSubmitting(true);

		try {
			const response = await fetch("/api/wedding-wishes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					invitation_id: invitationId,
					guest_name: guestName.trim(),
					wish_message: wishMessage.trim(),
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to submit wish");
			}

			toast.success("Your wish has been submitted successfully!");
			setWishMessage("");
			setIsSubmitted(true);

			// Refresh wishes to show the new one
			fetchWishes(1, true);
		} catch (error) {
			console.error("Wish submission error:", error);
			toast.error(error instanceof Error ? error.message : "Failed to submit wish");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="text-center py-12 bg-white">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-4xl font-bold font-shadows text-gray-800 mb-4">
					{moduleData?.title || "Wedding Wishes"}
				</h1>
				<p className="text-lg text-gray-600 font-shadows mb-8">
					{moduleData?.description || "Leave your wishes for the happy couple"}
				</p>

				{/* Wish Form */}
				<Card className="max-w-2xl mx-auto mb-8">
					<CardHeader>
						<CardTitle className="text-xl font-shadows">Share Your Wishes</CardTitle>
					</CardHeader>
					<CardContent>
						{isSubmitted ? (
							<div className="text-center py-6">
								<div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
									<svg
										className="w-8 h-8 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-semibold text-gray-800 mb-2">Thank You!</h3>
								<p className="text-gray-600 mb-4">Your wish has been submitted successfully.</p>
								<Button
									onClick={() => setIsSubmitted(false)}
									variant="outline"
									className="font-shadows"
								>
									Submit Another Wish
								</Button>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="guest_name" className="font-shadows">
										Your Name
									</Label>
									<Input
										id="guest_name"
										type="text"
										value={guestName}
										onChange={e => setGuestName(e.target.value)}
										placeholder="Enter your name"
										className="font-shadows"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="wish_message" className="font-shadows">
										Your Wish
									</Label>
									<Textarea
										id="wish_message"
										value={wishMessage}
										onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
											setWishMessage(e.target.value)
										}
										placeholder="Share your wishes for the happy couple..."
										className="min-h-[100px] font-shadows"
										required
									/>
								</div>
								<Button type="submit" disabled={submitting} className="w-full font-shadows">
									{submitting ? "Submitting..." : "Submit Wish"}
								</Button>
							</form>
						)}
					</CardContent>
				</Card>

				{/* Wishes Display */}
				{wishes.length > 0 && (
					<div className="space-y-4">
						<h2 className="text-2xl font-bold font-shadows text-gray-800 mb-6">
							Wishes from Friends & Family
						</h2>
						<div className="grid gap-4">
							{wishes.map(wish => (
								<Card key={wish.id} className="text-left">
									<CardContent className="p-4">
										<div className="flex justify-between items-start mb-2">
											<h3 className="font-semibold text-gray-800 font-shadows">
												{wish.guest_name}
											</h3>
											<span className="text-sm text-gray-500">
												{new Date(wish.created_at).toLocaleDateString()}
											</span>
										</div>
										<p className="text-gray-700 leading-relaxed">{wish.wish_message}</p>
									</CardContent>
								</Card>
							))}
						</div>

						{/* Load More Button */}
						{hasMore && (
							<div className="flex justify-center py-4">
								<Button
									onClick={loadMoreWishes}
									variant="outline"
									className="font-shadows"
									disabled={loading}
								>
									{loading ? "Loading..." : "Load More Wishes"}
								</Button>
							</div>
						)}
					</div>
				)}

				{wishes.length === 0 && !loading && (
					<div className="text-center py-8">
						<p className="text-gray-500 font-shadows">
							No wishes yet. Be the first to share your wishes!
						</p>
					</div>
				)}
			</div>
		</section>
	);
};
