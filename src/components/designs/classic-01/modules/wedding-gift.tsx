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
				className="ml-2 font-shadows"
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
		<section className="text-center py-12 bg-white">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-4xl font-bold font-shadows text-gray-800 mb-4">Wedding Gift</h1>
				<p className="text-lg text-gray-600 font-shadows mb-8">
					Your presence is the greatest gift, but if you wish to give something
				</p>

				<div className="flex flex-col gap-4">
					{/* Address Card */}
					<Card className="text-left">
						<CardHeader>
							<CardTitle className="flex items-center text-xl font-shadows text-gray-800">
								<MapPin className="h-5 w-5 mr-2 text-red-500" />
								{moduleData?.address_name || "Home Address"}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<p className="text-gray-700 leading-relaxed font-shadows">
										{moduleData?.address_detail || "Jl. Example Street No. 123, City, Country"}
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
					<Card className="text-left">
						<CardHeader>
							<CardTitle className="flex items-center text-xl font-shadows text-gray-800">
								<CreditCard className="h-5 w-5 mr-2 text-blue-500" />
								Bank Account
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div>
									<div className="mb-2">
										<p className="text-sm text-gray-500 font-shadows">Bank Name</p>
										<p className="text-gray-800 font-semibold font-shadows">
											{moduleData?.bank_name || "Bank Name"}
										</p>
									</div>
									<div className="mb-2">
										<p className="text-sm text-gray-500 font-shadows">Account Name</p>
										<p className="text-gray-800 font-semibold font-shadows">
											{moduleData?.account_name || "John & Jane Doe"}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500 font-shadows">Account Number</p>
										<p className="text-gray-800 font-semibold font-shadows text-lg">
											{moduleData?.bank_account_number || "1234567890"}
										</p>
									</div>
								</div>
								<div className="flex flex-wrap gap-2">
									<CopyButton
										text={moduleData?.bank_account_number || "1234567890"}
										itemType="accountNumber"
										label="Number"
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Additional Message */}
				<div className="mt-8 max-w-2xl mx-auto">
					<Card className="bg-gray-50 border-gray-200">
						<CardContent className="p-6">
							<p className="text-gray-600 font-shadows leading-relaxed">
								Your presence at our wedding is the greatest gift we could ask for. However, if you
								would like to give us something to help us start our new life together, we would be
								deeply grateful. Thank you for your love and support!
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
};
