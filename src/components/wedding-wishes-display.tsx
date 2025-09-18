"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { RefreshCw, Heart, Calendar, User } from "lucide-react";

interface WeddingWish {
	id: string;
	guest_name: string;
	wish_message: string;
	created_at: string;
}

interface WeddingWishesDisplayProps {
	invitationId: string;
}

export function WeddingWishesDisplay({ invitationId }: WeddingWishesDisplayProps) {
	const [wishes, setWishes] = useState<WeddingWish[]>([]);
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchWishes = async () => {
		try {
			setError(null);
			const response = await fetch(`/api/wedding-wishes?invitation_id=${invitationId}&limit=100`);

			if (!response.ok) {
				throw new Error("Failed to fetch wedding wishes");
			}

			const data = await response.json();
			setWishes(data.wishes || []);
		} catch (error) {
			console.error("Error fetching wedding wishes:", error);
			setError("Failed to load wedding wishes");
			toast.error("Failed to load wedding wishes");
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	const handleRefresh = async () => {
		setRefreshing(true);
		await fetchWishes();
		toast.success("Wedding wishes refreshed");
	};

	useEffect(() => {
		if (invitationId) {
			fetchWishes();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invitationId]);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("id-ID", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-[50vh]">
				<div className="text-center">
					<RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
					<p className="text-gray-500">Loading wedding wishes...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<div className="text-red-500 mb-4">
					<h3 className="text-lg font-medium mb-2">Error loading wishes</h3>
					<p className="text-sm">{error}</p>
				</div>
				<Button onClick={handleRefresh} variant="outline">
					<RefreshCw className="h-4 w-4 mr-2" />
					Try Again
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header with stats and refresh */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<Heart className="h-5 w-5 text-red-500" />
						<h3 className="text-lg font-semibold">Wedding Wishes</h3>
					</div>
					<Badge variant="secondary" className="font-shadows">
						{wishes.length} wishes
					</Badge>
				</div>
				<Button onClick={handleRefresh} disabled={refreshing} variant="outline" size="sm">
					<RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
					{refreshing ? "Refreshing..." : "Refresh"}
				</Button>
			</div>

			{/* Wishes list */}
			{wishes.length === 0 ? (
				<Card>
					<CardContent className="text-center py-12">
						<Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-500 mb-2">No wishes yet</h3>
						<p className="text-sm text-gray-400">
							Wedding wishes from your guests will appear here once they start submitting them.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="grid gap-4">
					{wishes.map(wish => (
						<Card key={wish.id} className="hover:shadow-md transition-shadow">
							<CardHeader className="pb-3">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<User className="h-4 w-4 text-gray-500" />
										<CardTitle className="text-base font-shadows text-gray-800">
											{wish.guest_name}
										</CardTitle>
									</div>
									<div className="flex items-center gap-1 text-xs text-gray-500">
										<Calendar className="h-3 w-3" />
										{formatDate(wish.created_at)}
									</div>
								</div>
							</CardHeader>
							<CardContent className="pt-0">
								<p className="text-gray-700 leading-relaxed font-shadows">{wish.wish_message}</p>
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
