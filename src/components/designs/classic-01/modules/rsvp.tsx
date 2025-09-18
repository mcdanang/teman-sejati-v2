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

export const RSVP = ({ data, invitationId }: { data: InputJsonValue; invitationId?: string }) => {
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
			<section
				className="text-center py-16 bg-[#d6c6b3] overflow-hidden h-dvh flex items-center justify-center"
				style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
			>
				<Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm border-[#660033]/20 shadow-lg">
					<CardContent className="pt-6">
						<div className="text-center">
							<div className="w-16 h-16 mx-auto mb-4 bg-[#660033] rounded-full flex items-center justify-center">
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
							<h2 className="text-2xl font-bold text-[#660033] font-pinyon mb-2">Thank You!</h2>
							<p className="text-[#660033]/80 font-edensor">
								Your RSVP has been submitted successfully. We look forward to celebrating with you!
							</p>
						</div>
					</CardContent>
				</Card>
			</section>
		);
	}

	return (
		<section
			className="text-center py-16 bg-[#d6c6b3] overflow-hidden flex items-center justify-center"
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			<div className="w-full mx-auto px-8">
				<Card className="bg-white/90 backdrop-blur-sm border-[#660033]/20 shadow-lg">
					<CardHeader>
						<CardTitle className="text-[#660033] font-pinyon text-4xl">RSVP</CardTitle>
						<CardDescription className="text-lg text-[#660033]/80 font-edensor mb-8">
							Will you attend our wedding?
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Guest Name */}
							<div className="space-y-2">
								<Label htmlFor="guest_name" className="text-[#660033] font-edensor font-medium">
									Your Name *
								</Label>
								<Input
									id="guest_name"
									type="text"
									value={rsvpData.guest_name}
									onChange={e => handleInputChange("guest_name", e.target.value)}
									placeholder="Enter your full name"
									className="bg-white/80 border-[#660033]/30 text-[#660033] placeholder:text-[#660033]/60 focus:border-[#660033]"
									required
								/>
							</div>

							{/* Attendance Toggle */}
							<div className="space-y-3">
								<Label className="text-[#660033] font-edensor font-medium block">
									Will you attend our wedding?
								</Label>
								<div className="flex items-center justify-center space-x-4">
									<span
										className={`font-edensor ${!rsvpData.will_attend ? "text-[#660033]" : "text-[#660033]/60"}`}
									>
										No
									</span>
									<Switch
										checked={rsvpData.will_attend}
										onCheckedChange={checked => handleInputChange("will_attend", checked)}
										className="data-[state=checked]:bg-[#660033] data-[state=unchecked]:bg-[#660033]/30"
									/>
									<span
										className={`font-edensor ${rsvpData.will_attend ? "text-[#660033]" : "text-[#660033]/60"}`}
									>
										Yes
									</span>
								</div>
							</div>

							{/* People Count - only show if attending */}
							{rsvpData.will_attend && (
								<div className="space-y-2">
									<Label htmlFor="people_count" className="text-[#660033] font-edensor font-medium">
										Number of people (including you) *
									</Label>
									<Input
										id="people_count"
										type="number"
										min="1"
										max={maxPeopleCount}
										value={rsvpData.people_count}
										onChange={e => handleInputChange("people_count", parseInt(e.target.value) || 1)}
										className="bg-white/80 border-[#660033]/30 text-[#660033] placeholder:text-[#660033]/60 focus:border-[#660033]"
										required
									/>
								</div>
							)}

							{/* Submit Button */}
							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-[#660033] hover:bg-[#660033]/90 text-white border border-[#660033] font-edensor font-medium"
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
