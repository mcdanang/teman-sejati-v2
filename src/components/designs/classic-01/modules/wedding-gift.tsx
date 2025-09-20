"use client";

import { useState } from "react";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, MapPin, CreditCard, Check } from "lucide-react";

interface WeddingGiftModuleData {
	address_name: string;
	address_detail: string;
	bank_name: string;
	bank_account_number: string;
	account_name: string;
}

export const WeddingGift = ({ data }: { data: InputJsonValue }) => {
	const moduleData = data as unknown as WeddingGiftModuleData;
	const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

	const copyToClipboard = async (text: string, itemType: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedItems(prev => new Set(prev).add(itemType));
			toast.success(`${itemType} copied to clipboard!`);

			// Reset the copied state after 2 seconds
			setTimeout(() => {
				setCopiedItems(prev => {
					const newSet = new Set(prev);
					newSet.delete(itemType);
					return newSet;
				});
			}, 2000);
		} catch (error) {
			console.error("Failed to copy:", error);
			toast.error("Failed to copy to clipboard");
		}
	};

	const CopyButton = ({
		text,
		itemType,
		label,
	}: {
		text: string;
		itemType: string;
		label: string;
	}) => {
		const isCopied = copiedItems.has(itemType);

		return (
			<Button
				onClick={() => copyToClipboard(text, itemType)}
				variant="outline"
				size="sm"
				className="ml-2 font-edensor border-[#660033] text-[#660033] hover:bg-[#660033] hover:text-white"
			>
				{isCopied ? (
					<>
						<Check className="h-4 w-4 mr-1" />
						Copied!
					</>
				) : (
					<>
						<Copy className="h-4 w-4 mr-1" />
						Copy {label}
					</>
				)}
			</Button>
		);
	};

	return (
		<section
			className="text-center py-16 bg-[#d6c6b3] overflow-hidden min-h-svh flex items-center justify-center px-4"
			style={{ backgroundImage: "url('/designs/classic/bg-cream.png')" }}
		>
			<div className="max-w-sm mx-auto">
				<h1 className="text-4xl font-bold font-edensor text-[#660033] mb-4">Wedding Gift</h1>
				<p className="text-md text-[#660033]/80 font-edensor mb-8 font-semibold">
					Your presence at our wedding is the greatest gift we could ask for. However, if you would
					like to give us something, we would be deeply grateful!
				</p>

				<div className="flex flex-col gap-4">
					{/* Address Card */}
					<Card className="text-left bg-white/90 backdrop-blur-sm border-[#660033]/20 shadow-lg">
						<CardHeader>
							<CardTitle className="flex items-center text-xl font-edensor text-[#660033]">
								<MapPin className="h-5 w-5 mr-2 text-[#660033]" />
								{moduleData?.address_name || "Rumah Danang"}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<p className="text-[#660033] leading-relaxed font-edensor font-semibold">
										{moduleData?.address_detail ||
											"Jl. Cemara Raya No. 8, RT 09/RW 13, Baktijaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16418"}
									</p>
								</div>
								<div className="flex items-center">
									<CopyButton
										text={moduleData?.address_detail || "Jl. Example Street No. 123, City, Country"}
										itemType="address"
										label="Address"
									/>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Bank Account Card */}
					<Card className="text-left bg-white/90 backdrop-blur-sm border-[#660033]/20 shadow-lg">
						<CardHeader>
							<CardTitle className="flex items-center text-xl font-edensor text-[#660033]">
								<CreditCard className="h-5 w-5 mr-2 text-[#660033]" />
								Bank Account
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<div className="mb-2">
										<p className="text-sm text-[#660033]/70 font-edensor">Bank Name</p>
										<p className="text-[#660033] font-semibold font-edensor">
											{moduleData?.bank_name || "Bank Mandiri"}
										</p>
									</div>
									<div className="mb-2">
										<p className="text-sm text-[#660033]/70 font-edensor">Account Name</p>
										<p className="text-[#660033] font-semibold font-edensor">
											{moduleData?.account_name || "Muhamad Danang Priambodo"}
										</p>
									</div>
									<div>
										<p className="text-sm text-[#660033]/70 font-edensor">Account Number</p>
										<p className="text-[#660033] font-semibold font-edensor text-lg">
											{moduleData?.bank_account_number || "700010201460"}
										</p>
									</div>
								</div>
								<div className="flex flex-wrap gap-2">
									<CopyButton
										text={moduleData?.bank_account_number || "700010201460"}
										itemType="accountNumber"
										label="Number"
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Additional Message */}
				{/* <div className="mt-8 max-w-2xl mx-auto">
					<Card className="bg-white/90 backdrop-blur-sm border-[#660033]/20 shadow-lg">
						<CardContent className="p-6">
							<p className="text-[#660033] font-edensor leading-relaxed">
								Your presence at our wedding is the greatest gift we could ask for. However, if you
								would like to give us something to help us start our new life together, we would be
								deeply grateful. Thank you for your love and support!
							</p>
						</CardContent>
					</Card>
				</div> */}
			</div>
		</section>
	);
};
