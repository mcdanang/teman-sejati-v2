"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface RSVPResponse {
	id: string;
	guest_name: string;
	will_attend: boolean;
	people_count: number;
	created_at: string;
}

interface RSVPDisplayProps {
	invitationId: string;
}

export const RSVPDisplay = ({ invitationId }: RSVPDisplayProps) => {
	const [rsvps, setRsvps] = useState<RSVPResponse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchRSVPs = async () => {
		try {
			setLoading(true);
			const response = await fetch(`/api/rsvp?invitation_id=${invitationId}`);

			if (!response.ok) {
				throw new Error("Failed to fetch RSVPs");
			}

			const data = await response.json();
			setRsvps(data.rsvps || []);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to fetch RSVPs");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRSVPs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [invitationId]);

	console.log("rsvps", rsvps);

	const attendingCount = rsvps.filter(rsvp => rsvp.will_attend).length;
	const totalGuests = rsvps.reduce(
		(sum, rsvp) => sum + (rsvp.will_attend ? rsvp.people_count : 0),
		0
	);

	if (loading) {
		return (
			<Card className="w-full">
				<CardContent className="p-6">
					<div className="flex items-center justify-center">
						<RefreshCw className="h-6 w-6 animate-spin" />
						<span className="ml-2">Loading RSVPs...</span>
					</div>
				</CardContent>
			</Card>
		);
	}

	if (error) {
		return (
			<Card className="w-full">
				<CardContent className="p-6">
					<div className="text-center">
						<p className="text-red-500 mb-4">{error}</p>
						<Button onClick={fetchRSVPs} variant="outline">
							<RefreshCw className="h-4 w-4 mr-2" />
							Retry
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			{/* Summary Stats */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card>
					<CardContent className="p-4 text-center">
						<div className="text-2xl font-bold text-green-600">{attendingCount}</div>
						<div className="text-sm text-gray-600">Attending</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 text-center">
						<div className="text-2xl font-bold text-red-600">{rsvps.length - attendingCount}</div>
						<div className="text-sm text-gray-600">Not Attending</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4 text-center">
						<div className="text-2xl font-bold text-blue-600">{totalGuests}</div>
						<div className="text-sm text-gray-600">Total Guests</div>
					</CardContent>
				</Card>
			</div>

			{/* RSVP List */}
			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>RSVP Responses ({rsvps.length})</CardTitle>
					<Button onClick={fetchRSVPs} variant="outline" size="sm">
						<RefreshCw className="h-4 w-4 mr-2" />
						Refresh
					</Button>
				</CardHeader>
				<CardContent>
					{rsvps.length === 0 ? (
						<div className="text-center py-8 text-gray-500">No RSVP responses yet.</div>
					) : (
						<div className="space-y-3">
							{rsvps.map(rsvp => (
								<div
									key={rsvp.id}
									className="flex items-center justify-between p-3 border rounded-lg"
								>
									<div className="flex-1">
										<div className="font-medium">{rsvp.guest_name}</div>
										<div className="text-sm text-gray-500">
											{new Date(rsvp.created_at).toLocaleDateString()}
										</div>
									</div>
									<div className="flex items-center space-x-2">
										<Badge
											variant={rsvp.will_attend ? "default" : "secondary"}
											className={rsvp.will_attend ? "bg-green-500" : "bg-gray-500"}
										>
											{rsvp.will_attend ? "Attending" : "Not Attending"}
										</Badge>
										{rsvp.will_attend && (
											<Badge variant="outline">
												{rsvp.people_count} {rsvp.people_count === 1 ? "guest" : "guests"}
											</Badge>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};
