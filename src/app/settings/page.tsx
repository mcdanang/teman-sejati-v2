"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CreditCard, ImageIcon, Share, Upload, Music, Play, Pause, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useInvitations } from "@/hooks/use-invitations";
import { Button } from "@/components/ui/button";
import { MediaSelector } from "@/components/media-selector";
import Image from "next/image";
import { InvitationWithModules } from "@/types";
import Link from "next/link";

export default function Page() {
	const { data: session, status } = useSession();
	const [invitation, setInvitation] = useState<InvitationWithModules | null>(null);
	const [loading, setLoading] = useState(true);
	const { activeInvitation } = useInvitations();
	const [updating, setUpdating] = useState(false);
	const [musicUpdating, setMusicUpdating] = useState(false);

	// Fetch user's invitations
	useEffect(() => {
		if (!session?.user?.id) return;
		setLoading(true);
		if (!activeInvitation) return;
		fetch(`/api/invitations/${activeInvitation?.slug}`)
			.then(res => res.json())
			.then(data => {
				setInvitation(data);
			})
			.catch(error => {
				console.error("Error fetching invitations:", error);
				toast.error("Gagal memuat undangan");
			})
			.finally(() => setLoading(false));
	}, [session?.user?.id, activeInvitation]);

	const handleBackgroundImageUpdate = async (imageUrl: string) => {
		if (!invitation || !activeInvitation) return;

		setUpdating(true);
		try {
			const response = await fetch(`/api/invitations/${activeInvitation.slug}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					desktop_bg: imageUrl,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to update background image");
			}

			// Update local state
			setInvitation(prev => (prev ? { ...prev, desktop_bg: imageUrl } : null));
			toast.success("Background image berhasil diperbarui");
		} catch (error) {
			console.error("Error updating background image:", error);
			toast.error("Gagal memperbarui background image");
		} finally {
			setUpdating(false);
		}
	};

	const handleBackgroundMusicUpdate = async (musicUrl: string) => {
		if (!invitation || !activeInvitation) return;

		setMusicUpdating(true);
		try {
			const response = await fetch(`/api/invitations/${activeInvitation.slug}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					background_music: musicUrl,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to update background music");
			}

			// Update local state
			setInvitation(prev => (prev ? { ...prev, background_music: musicUrl } : null));
			toast.success("Background music berhasil diperbarui");
		} catch (error) {
			console.error("Error updating background music:", error);
			toast.error("Gagal memperbarui background music");
		} finally {
			setMusicUpdating(false);
		}
	};

	return (
		<TooltipProvider>
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
										<BreadcrumbPage>Pengaturan Umum</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full overflow-hidden">
						<div className="bg-white flex-1 rounded-xl h-full overflow-scroll shadow-xl p-6">
							<div className="flex items-center justify-between mb-6">
								<div>
									<h2 className="text-xl font-semibold">Pengaturan Umum</h2>
									<p className="text-sm text-muted-foreground mt-1">
										Kelola pengaturan umum undangan Anda
									</p>
								</div>
							</div>
							<Separator className="mb-6" />

							{loading ? (
								<div className="flex items-center justify-center h-[70vh]">
									<span>Memuat undangan...</span>
								</div>
							) : !invitation ? (
								<div className="text-center py-12">
									<div className="text-muted-foreground mb-4">
										<CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
										<h3 className="text-lg font-medium mb-2">Tidak ada undangan ditemukan</h3>
										<p className="text-sm">
											Buat undangan terlebih dahulu untuk mengelola status publikasinya.
										</p>
									</div>
								</div>
							) : (
								invitation && (
									<div className="grid grid-cols-1 gap-6">
										<BackgroundImageCard
											invitation={invitation}
											handleBackgroundImageUpdate={handleBackgroundImageUpdate}
											updating={updating}
										/>
										<BackgroundMusicCard
											invitation={invitation}
											handleBackgroundMusicUpdate={handleBackgroundMusicUpdate}
											updating={musicUpdating}
										/>
										<ShareLinkCard invitation={invitation} />
									</div>
								)
							)}
						</div>
					</div>
				</SidebarInset>
			</SidebarProvider>
		</TooltipProvider>
	);
}

const BackgroundImageCard = ({
	invitation,
	handleBackgroundImageUpdate,
	updating,
}: {
	invitation: InvitationWithModules;
	handleBackgroundImageUpdate: (imageUrl: string) => void;
	updating: boolean;
}) => {
	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col items-start justify-between gap-2">
					<CardTitle className="text-lg flex items-center gap-2">
						<ImageIcon className="h-5 w-5" />
						Gambar Latar Belakang
					</CardTitle>
					<CardDescription>
						Upload gambar latar belakang untuk undangan Anda. Gambar ini akan digunakan sebagai
						latar belakang utama undangan.
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="space-y-4">
					{/* Current Background Image Preview */}
					{invitation.desktop_bg && (
						<div className="space-y-2">
							<p className="text-sm font-medium text-gray-700">Gambar Latar Belakang Saat Ini:</p>
							<div className="relative w-full h-48 border rounded-lg overflow-hidden">
								<Image
									src={invitation.desktop_bg}
									alt="Current background"
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 50vw"
								/>
							</div>
						</div>
					)}

					<div className="flex space-x-2 items-center">
						{/* Upload New Background Image */}
						<div className="space-y-2">
							<MediaSelector
								onSelect={urls => {
									if (urls.length > 0) {
										handleBackgroundImageUpdate(urls[0]);
									}
								}}
								allowedTypes={["image"]}
								trigger={
									<Button
										type="button"
										variant="outline"
										size="sm"
										disabled={updating}
										className="w-full sm:w-auto"
									>
										<Upload className="h-4 w-4 mr-2" />
										{updating
											? "Mengupload..."
											: invitation.desktop_bg
												? "Ganti Gambar"
												: "Pilih Gambar"}
									</Button>
								}
							/>
						</div>

						{/* Remove Background Image */}
						{invitation.desktop_bg && (
							<div>
								<Button
									type="button"
									variant="destructive"
									size="sm"
									onClick={() => handleBackgroundImageUpdate("")}
									disabled={updating}
								>
									Hapus Gambar
								</Button>
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const BackgroundMusicCard = ({
	invitation,
	handleBackgroundMusicUpdate,
	updating,
}: {
	invitation: InvitationWithModules;
	handleBackgroundMusicUpdate: (musicUrl: string) => void;
	updating: boolean;
}) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

	// Initialize audio when background_music changes
	useEffect(() => {
		if (invitation.background_music) {
			const newAudio = new Audio(invitation.background_music);
			newAudio.loop = true;
			setAudio(newAudio);
		} else {
			setAudio(null);
		}

		return () => {
			if (audio) {
				audio.pause();
				audio.src = "";
			}
		};
	}, [invitation.background_music]);

	const togglePlay = () => {
		if (!audio) return;

		if (isPlaying) {
			audio.pause();
			setIsPlaying(false);
		} else {
			audio.play().catch(error => {
				console.error("Error playing audio:", error);
				toast.error("Gagal memutar musik");
			});
			setIsPlaying(true);
		}
	};

	// Get filename from URL
	const getFileName = (url: string) => {
		try {
			const urlObj = new URL(url);
			const pathname = urlObj.pathname;
			const filename = pathname.split("/").pop() || "Unknown file";
			return filename;
		} catch {
			return "Unknown file";
		}
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex flex-col items-start justify-between gap-2">
					<CardTitle className="text-lg flex items-center gap-2">
						<Music className="h-5 w-5" />
						Musik Latar Belakang
					</CardTitle>
					<CardDescription>
						Upload musik latar belakang untuk undangan Anda. Musik ini akan diputar secara otomatis
						saat undangan dibuka.
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="space-y-4">
					{/* Current Background Music Preview */}
					{invitation.background_music && (
						<div className="space-y-2">
							<p className="text-sm font-medium text-gray-700">Musik Latar Belakang Saat Ini:</p>
							<div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
								<div className="flex items-center gap-3">
									<Music className="h-8 w-8 text-gray-500" />
									<div>
										<p className="text-sm font-medium text-gray-900">
											{getFileName(invitation.background_music)}
										</p>
										<p className="text-xs text-gray-500">Background Music</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={togglePlay}
										disabled={!audio}
									>
										{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
									</Button>
								</div>
							</div>
						</div>
					)}

					<div className="flex space-x-2 items-center">
						{/* Upload New Background Music */}
						<div className="space-y-2">
							<MediaSelector
								onSelect={urls => {
									if (urls.length > 0) {
										handleBackgroundMusicUpdate(urls[0]);
									}
								}}
								allowedTypes={["audio", "video"]}
								trigger={
									<Button
										type="button"
										variant="outline"
										size="sm"
										disabled={updating}
										className="w-full sm:w-auto"
									>
										<Upload className="h-4 w-4 mr-2" />
										{updating
											? "Mengupload..."
											: invitation.background_music
												? "Ganti Musik"
												: "Pilih Musik"}
									</Button>
								}
							/>
						</div>

						{/* Remove Background Music */}
						{invitation.background_music && (
							<div>
								<Button
									type="button"
									variant="destructive"
									size="sm"
									onClick={() => {
										if (audio) {
											audio.pause();
											setIsPlaying(false);
										}
										handleBackgroundMusicUpdate("");
									}}
									disabled={updating}
								>
									<Trash2 className="h-4 w-4 mr-1" />
									Hapus Musik
								</Button>
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const ShareLinkCard = ({ invitation }: { invitation: InvitationWithModules }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Informasi Undangan</CardTitle>
				<CardDescription>Detail informasi undangan Anda</CardDescription>
			</CardHeader>
			<CardContent className="pt-0">
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium">Judul:</span>
						<span className="text-sm text-gray-600">{invitation.slug}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium">Design:</span>
						<span className="text-sm text-gray-600">{invitation.design}</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium">Status Publikasi:</span>
						<span
							className={`text-sm px-2 py-1 rounded-full ${
								invitation.is_published
									? "bg-green-100 text-green-800"
									: "bg-yellow-100 text-yellow-800"
							}`}
						>
							{invitation.is_published ? "Dipublikasi" : "Draft"}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm font-medium">Status Pembayaran:</span>
						<span
							className={`text-sm px-2 py-1 rounded-full ${
								invitation.is_paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
							}`}
						>
							{invitation.is_paid ? "Lunas" : "Belum Lunas"}
						</span>
					</div>
					<div className="flex justify-end items-center">
						<Button size="sm" asChild>
							<Link href={`/publish`}>
								<Share className="h-4 w-4 mr-2" />
								Bagikan Undangan
							</Link>
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
