"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Image as ImageIcon, Video, Music, Upload } from "lucide-react";
import { toast } from "sonner";

// Media item type
type MediaItem = {
	public_id: string;
	resource_type: string;
	secure_url: string;
	original_filename?: string;
};

interface MediaSelectorProps {
	onSelect: (urls: string[]) => void;
	multiple?: boolean;
	allowedTypes?: ("image" | "video" | "audio")[];
	trigger?: React.ReactNode;
}

export function MediaSelector({
	onSelect,
	multiple = false,
	allowedTypes = ["image", "video", "audio"],
	trigger,
}: MediaSelectorProps) {
	const { data: session } = useSession();
	const [media, setMedia] = useState<MediaItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [selectedItems, setSelectedItems] = useState<MediaItem[]>([]);
	const [open, setOpen] = useState(false);
	const [activeTab, setActiveTab] = useState<"images" | "videos" | "audios">(() => {
		// Set default tab based on allowed types
		if (allowedTypes.includes("image")) return "images";
		if (allowedTypes.includes("video")) return "videos";
		if (allowedTypes.includes("audio")) return "audios";
		return "images"; // fallback
	});

	// Helper function to get filename from public_id or original_filename
	const getFileName = (item: MediaItem) => {
		if (item.original_filename) {
			return item.original_filename;
		}
		// Extract filename from public_id (remove folder path and extension)
		const parts = item.public_id.split("/");
		const filename = parts[parts.length - 1];
		return filename;
	};

	const getTabName = (tab: "images" | "videos" | "audios") => {
		switch (tab) {
			case "images":
				return "Gambar";
			case "videos":
				return "Audio/Video";
			case "audios":
				return "Audio";
			default:
				return "Gambar";
		}
	};

	// Fetch media from Cloudinary
	useEffect(() => {
		if (!session?.user?.id) return;
		setLoading(true);
		fetch(`/api/media/list?user_id=${session.user.id}`)
			.then(res => res.json())
			.then(data => setMedia(data.resources))
			.finally(() => setLoading(false));
	}, [session?.user?.id]);

	// Upload handler
	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files?.length) return;
		if (!session?.user?.id) {
			toast.error("Silakan login untuk mengunggah media");
			return;
		}
		const file = e.target.files[0];
		setUploading(true);

		try {
			// Get signature from backend
			const res = await fetch("/api/media/sign", {
				method: "POST",
				body: JSON.stringify({ folder: `teman-sejati-2/${session.user.id}`, action: "upload" }),
				headers: { "Content-Type": "application/json" },
			});
			const { signature, timestamp } = await res.json();

			const formData = new FormData();
			formData.append("file", file);
			formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
			formData.append("timestamp", timestamp);
			formData.append("signature", signature);
			formData.append("folder", `teman-sejati-2/${session.user.id}`);

			const uploadRes = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
				{ method: "POST", body: formData }
			);
			const uploadData = await uploadRes.json();
			setMedia(m => [uploadData, ...m]);
			toast.success("Media uploaded successfully!");
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Failed to upload media");
		} finally {
			setUploading(false);
		}
	};

	// Handle item selection
	const handleItemClick = (item: MediaItem) => {
		if (multiple) {
			setSelectedItems(prev => {
				const isSelected = prev.some(selected => selected.public_id === item.public_id);
				if (isSelected) {
					return prev.filter(selected => selected.public_id !== item.public_id);
				} else {
					return [...prev, item];
				}
			});
		} else {
			setSelectedItems([item]);
		}
	};

	// Handle confirm selection
	const handleConfirm = () => {
		const urls = selectedItems.map(item => item.secure_url);
		onSelect(urls);
		setSelectedItems([]);
		setOpen(false);
	};

	// Filter media by type
	const images = media.filter(item => item.resource_type === "image");
	const videos = media.filter(item => item.resource_type === "video");
	const audios = media.filter(item => item.resource_type === "audio");

	// Check if item is selected
	const isSelected = (item: MediaItem) => {
		return selectedItems.some(selected => selected.public_id === item.public_id);
	};

	// Get current media items based on active tab
	const getCurrentMedia = () => {
		switch (activeTab) {
			case "images":
				return images;
			case "videos":
				return videos;
			case "audios":
				return audios;
			default:
				return images;
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger || (
					<Button variant="outline" size="sm">
						<ImageIcon className="h-4 w-4 mr-2" />
						Pilih Media
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Pilih Media</DialogTitle>
					<DialogDescription>
						{multiple
							? "Pilih beberapa media untuk digunakan di modul anda."
							: "Pilih satu media untuk digunakan di modul anda."}
					</DialogDescription>
				</DialogHeader>

				<div className="flex flex-col flex-1 min-h-0">
					{/* Upload section */}
					<div className="mb-4 border rounded-lg">
						{session?.user?.id ? (
							<>
								<label
									htmlFor="media-upload"
									className="flex items-center gap-2 cursor-pointer hover:bg-secondary/10 p-2 rounded transition-colors"
								>
									<Upload className="h-4 w-4" />
									<span>Unggah media baru</span>
									<Input
										id="media-upload"
										type="file"
										accept={allowedTypes.map(type => type + "/*").join(",")}
										onChange={handleUpload}
										className="hidden"
									/>
								</label>
								{uploading && <p className="text-sm text-muted-foreground p-2">Uploading...</p>}
							</>
						) : (
							<div className="flex items-center gap-2 p-2 text-muted-foreground">
								<Upload className="h-4 w-4" />
								<span>Silakan login untuk mengunggah media</span>
							</div>
						)}
					</div>

					{/* Tab buttons */}
					<div className="flex gap-2 mb-4">
						{allowedTypes.includes("image") && (
							<Button
								variant={activeTab === "images" ? "default" : "outline"}
								size="sm"
								onClick={() => setActiveTab("images")}
								className="flex items-center gap-2"
							>
								<ImageIcon className="h-4 w-4" />
								{getTabName("images")} ({images.length})
							</Button>
						)}
						{allowedTypes.includes("video") && (
							<Button
								variant={activeTab === "videos" ? "default" : "outline"}
								size="sm"
								onClick={() => setActiveTab("videos")}
								className="flex items-center gap-2"
							>
								<Video className="h-4 w-4" />
								{getTabName("videos")} ({videos.length})
							</Button>
						)}
						{/* {allowedTypes.includes("audio") && (
							<Button
								variant={activeTab === "audios" ? "default" : "outline"}
								size="sm"
								onClick={() => setActiveTab("audios")}
								className="flex items-center gap-2"
							>
								<Music className="h-4 w-4" />
								{getTabName("audios")} ({audios.length})
							</Button>
						)} */}
					</div>

					{/* Media content - scrollable area */}
					{loading ? (
						<div className="flex items-center justify-center h-64">
							<span>Memuat media...</span>
						</div>
					) : (
						<div className="flex-1 overflow-y-auto min-h-0">
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-1">
								{getCurrentMedia().length === 0 ? (
									<div className="col-span-full text-center text-muted-foreground py-8">
										Tidak ada {getTabName(activeTab)} ditemukan.
									</div>
								) : (
									getCurrentMedia().map(item => (
										<Card
											key={item.public_id}
											className={`cursor-pointer transition-all hover:shadow-md ${
												isSelected(item) ? "ring-2 ring-primary" : ""
											}`}
											onClick={() => handleItemClick(item)}
										>
											<CardContent className="">
												<div className="relative aspect-square rounded-md overflow-hidden">
													{item.resource_type === "image" ? (
														<Image
															src={item.secure_url}
															alt={getFileName(item)}
															fill
															className="object-cover"
														/>
													) : item.resource_type === "video" ? (
														<div className="w-full h-full">
															<video
																src={item.secure_url}
																controls
																className="w-full h-full object-cover"
																style={{ aspectRatio: 1 }}
															/>
														</div>
													) : (
														<div className="w-full h-full bg-gray-100 flex items-center justify-center">
															<Music className="h-8 w-8 text-gray-400" />
														</div>
													)}
													{isSelected(item) && (
														<div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
															<Check className="h-6 w-6 text-primary-foreground" />
														</div>
													)}
												</div>
												{/* <div className="mt-2">
													<p className="text-xs text-muted-foreground truncate">
														{getFileName(item)}
													</p>
												</div> */}
											</CardContent>
										</Card>
									))
								)}
							</div>
						</div>
					)}

					{/* Footer with selection info and confirm button */}
					<div className="flex items-center justify-between pt-4 border-t mt-4">
						<div className="flex items-center gap-2">
							{selectedItems.length > 0 && (
								<span className="text-sm text-muted-foreground">
									{selectedItems.length} dipilih
								</span>
							)}
						</div>
						<div className="flex gap-2">
							<Button variant="outline" onClick={() => setOpen(false)}>
								Batal
							</Button>
							<Button onClick={handleConfirm} disabled={selectedItems.length === 0}>
								Pilih {selectedItems.length > 0 ? `(${selectedItems.length})` : ""}
							</Button>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
