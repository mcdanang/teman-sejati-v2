"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

// Media item type
type MediaItem = {
	public_id: string;
	resource_type: string;
	secure_url: string;
	original_filename?: string;
};

export default function Page() {
	const { data: session, status } = useSession();
	const [media, setMedia] = useState<MediaItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [uploading, setUploading] = useState(false);

	// Helper function to get filename from public_id or original_filename
	const getFileName = (item: MediaItem) => {
		console.log(item);
		if (item.original_filename) {
			return item.original_filename;
		}
		// Extract filename from public_id (remove folder path and extension)
		const parts = item.public_id.split("/");
		const filename = parts[parts.length - 1];
		return filename;
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
			console.error("User not logged in");
			return;
		}
		const file = e.target.files[0];
		setUploading(true);
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
		setUploading(false);
	};

	// Delete handler
	const handleDelete = async (public_id: string, resource_type: string) => {
		try {
			// Get signature from backend
			const res = await fetch("/api/media/sign", {
				method: "POST",
				body: JSON.stringify({ public_id, action: "delete" }),
				headers: { "Content-Type": "application/json" },
			});
			const { signature, timestamp } = await res.json();

			// Use the correct delete endpoint based on resource type
			const endpoint = resource_type === "image" ? "image/destroy" : `${resource_type}/destroy`;
			const deleteRes = await fetch(
				`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${endpoint}`,
				{
					method: "POST",
					body: JSON.stringify({
						public_id,
						signature,
						timestamp,
						api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
					}),
					headers: { "Content-Type": "application/json" },
				}
			);

			if (!deleteRes.ok) {
				const errorData = await deleteRes.json();
				console.error("Delete error:", errorData);
				throw new Error("Failed to delete media");
			}

			setMedia(m => m.filter(item => item.public_id !== public_id));
		} catch (error) {
			console.error("Delete error:", error);
			// You might want to show a toast notification here
		}
	};

	return (
		<SidebarProvider>
			<AppSidebar session={session} status={status} />
			<SidebarInset className="h-full">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbPage>Undangan</BreadcrumbPage>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Media</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full overflow-hidden">
					<div className="bg-white flex-1 rounded-xl h-full overflow-scroll shadow-xl p-6">
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-semibold">Media</h2>
							<div className="flex items-center gap-2">
								{session?.user?.id ? (
									<label htmlFor="media-upload">
										<Button asChild variant="outline" size="sm" disabled={uploading}>
											<span>{uploading ? "Uploading..." : "Upload Media"}</span>
										</Button>
										<Input
											id="media-upload"
											type="file"
											accept="image/*,audio/*,video/*"
											onChange={handleUpload}
											className="hidden"
										/>
									</label>
								) : (
									<Button variant="outline" size="sm" disabled>
										Please log in to upload
									</Button>
								)}
							</div>
						</div>
						<Separator className="mb-6" />
						{loading ? (
							<div className="flex items-center justify-center h-[70vh]">
								<span>Loading media...</span>
							</div>
						) : (
							<div className="grid grid-cols-1 sm:grid-cols-2 h-[70vh] md:grid-cols-3 lg:grid-cols-4 gap-6">
								{media.length === 0 ? (
									<div className="col-span-full text-center text-muted-foreground">
										No media found.
									</div>
								) : (
									media.map(item => (
										<Card key={item.public_id} className="overflow-hidden">
											<CardContent className="flex flex-col items-center justify-center p-4">
												<div className="h-48 w-48 relative flex items-center justify-center rounded-md overflow-hidden mb-3">
													{item.resource_type === "image" && (
														<Image
															src={item.secure_url}
															alt=""
															fill
															className="object-cover"
															style={{ objectFit: "cover" }}
														/>
													)}
													{item.resource_type === "video" && (
														<div>
															<video
																src={item.secure_url}
																controls
																className="w-full h-full object-cover"
																style={{ aspectRatio: 1 }}
															/>
														</div>
													)}
													{item.resource_type === "audio" && (
														<div className="w-full h-full flex flex-col items-center justify-center">
															<div>tes</div>
															<audio src={item.secure_url} controls className="w-32" />
														</div>
													)}
												</div>
												<div className="text-sm text-muted-foreground text-center truncate w-full">
													{getFileName(item)}
												</div>
											</CardContent>
											<CardFooter className="flex justify-end">
												<AlertDialog>
													<AlertDialogTrigger asChild>
														<Button variant="destructive" size="sm">
															Delete
														</Button>
													</AlertDialogTrigger>
													<AlertDialogContent>
														<AlertDialogHeader>
															<AlertDialogTitle>Delete Media</AlertDialogTitle>
															<AlertDialogDescription>
																Are you sure you want to delete this media? This action cannot be
																undone.
															</AlertDialogDescription>
														</AlertDialogHeader>
														<AlertDialogFooter>
															<AlertDialogCancel>Cancel</AlertDialogCancel>
															<AlertDialogAction
																onClick={() => handleDelete(item.public_id, item.resource_type)}
																className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
															>
																Delete
															</AlertDialogAction>
														</AlertDialogFooter>
													</AlertDialogContent>
												</AlertDialog>
											</CardFooter>
										</Card>
									))
								)}
							</div>
						)}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
