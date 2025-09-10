"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { InputJsonValue } from "@prisma/client/runtime/library";

interface RSVPData {
	guest_name: string;
	will_attend: boolean;
	people_count: number;
}

interface RSVPModuleData {
	invitation_id: string;
	max_people_count: number;
}

export const RSVP = ({ data, invitationId }: { data: InputJsonValue; invitationId: string }) => {
	const moduleData = data as unknown as RSVPModuleData;
	console.log("invitationId", invitationId);
	console.log("moduleData", moduleData);
	const maxPeopleCount = moduleData?.max_people_count || 2;
	const [rsvpData, setRsvpData] = useState<RSVPData>({
		guest_name: "",
		will_attend: true,
		people_count: 1,
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!invitationId) {
			toast.error("Invitation ID is required");
			return;
		}

		if (!rsvpData.guest_name.trim()) {
			toast.error("Please enter your name");
			return;
		}

		if (rsvpData.people_count < 1) {
			toast.error("Number of people must be at least 1");
			return;
		}

		if (rsvpData.people_count > maxPeopleCount) {
			toast.error(`Number of people cannot exceed ${maxPeopleCount}`);
			return;
		}

		setIsSubmitting(true);

		try {
			const response = await fetch("/api/rsvp", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					invitation_id: invitationId,
					...rsvpData,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || "Failed to submit RSVP");
			}

			toast.success("RSVP submitted successfully!");
			setIsSubmitted(true);
		} catch (error) {
			console.error("RSVP submission error:", error);
			toast.error(error instanceof Error ? error.message : "Failed to submit RSVP");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (field: keyof RSVPData, value: string | boolean | number) => {
		setRsvpData(prev => ({
			...prev,
			[field]: value,
		}));
	};

	if (isSubmitted) {
		return (
			<section className="text-center py-12 bg-[#660033]">
				<Card className="max-w-md mx-auto bg-white/10 backdrop-blur-sm border-white/20">
					<CardContent className="pt-6">
						<div className="text-center">
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
							<h2 className="text-2xl font-bold text-white font-shadows mb-2">Thank You!</h2>
							<p className="text-white/80 font-shadows">
								Your RSVP has been submitted successfully. We look forward to celebrating with you!
							</p>
						</div>
					</CardContent>
				</Card>
			</section>
		);
	}

	return (
		<section className="text-center py-12 bg-[#660033]">
			<div className="max-w-md mx-auto px-4">
				<Card className="bg-white/10 backdrop-blur-sm border-white/20">
					<CardHeader>
						<CardTitle className="text-white font-shadows text-xl">RSVP</CardTitle>
						<CardDescription className="text-lg text-white/80 font-shadows mb-8">
							Will you attend our wedding?
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Guest Name */}
							<div className="space-y-2">
								<Label htmlFor="guest_name" className="text-white font-shadows">
									Your Name *
								</Label>
								<Input
									id="guest_name"
									type="text"
									value={rsvpData.guest_name}
									onChange={e => handleInputChange("guest_name", e.target.value)}
									placeholder="Enter your full name"
									className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
									required
								/>
							</div>

							{/* Attendance Toggle */}
							<div className="space-y-3">
								<Label className="text-white font-shadows block">
									Will you attend our wedding?
								</Label>
								<div className="flex items-center justify-center space-x-4">
									<span
										className={`font-shadows ${!rsvpData.will_attend ? "text-white" : "text-white/60"}`}
									>
										No
									</span>
									<Switch
										checked={rsvpData.will_attend}
										onCheckedChange={checked => handleInputChange("will_attend", checked)}
										className="data-[state=checked]:bg-amber-700/40 data-[state=unchecked]:bg-white/20"
									/>
									<span
										className={`font-shadows ${rsvpData.will_attend ? "text-white" : "text-white/60"}`}
									>
										Yes
									</span>
								</div>
							</div>

							{/* People Count - only show if attending */}
							{rsvpData.will_attend && (
								<div className="space-y-2">
									<Label htmlFor="people_count" className="text-white font-shadows">
										Number of people (including you) *
									</Label>
									<Input
										id="people_count"
										type="number"
										min="1"
										max={maxPeopleCount}
										value={rsvpData.people_count}
										onChange={e => handleInputChange("people_count", parseInt(e.target.value) || 1)}
										className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
										required
									/>
								</div>
							)}

							{/* Submit Button */}
							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-white/20 hover:bg-white/30 text-white border border-white/30 font-shadows"
							>
								{isSubmitting ? "Submitting..." : "Submit RSVP"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</section>
	);
};
