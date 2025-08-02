"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
	CheckCircle,
	XCircle,
	Clock,
	CreditCard,
	MessageCircle,
	Info,
	Edit,
	X,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useInvitations } from "@/hooks/use-invitations";
import Link from "next/link";
import ShareLinkCard from "@/components/share-link";

import { InvitationWithModules } from "@/types";

export default function Page() {
	const { data: session, status } = useSession();
	const [invitation, setInvitation] = useState<InvitationWithModules | null>(null);
	const [loading, setLoading] = useState(true);
	const [editingSlug, setEditingSlug] = useState(false);
	const [newSlug, setNewSlug] = useState("");
	const [slugLoading, setSlugLoading] = useState(false);
	const { activeInvitation } = useInvitations();

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

	const handlePublishToggle = async (slug: string, currentStatus: boolean) => {
		if (!session?.user?.id) return;

		try {
			const response = await fetch(`/api/invitations/${slug}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					is_published: !currentStatus,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to update publish status");
			}

			// Update local state
			setInvitation(prev => (prev ? { ...prev, is_published: !currentStatus } : null));

			toast.success(currentStatus ? "Undangan dibatalkan publikasinya" : "Undangan dipublikasikan");
		} catch (error) {
			console.error("Error updating publish status:", error);
			toast.error("Gagal memperbarui status publikasi");
		}
	};

	const handleSlugEdit = () => {
		setEditingSlug(true);
		setNewSlug(invitation?.slug || "");
	};

	const handleSlugSave = async () => {
		if (!session?.user?.id || !invitation) return;

		const trimmedSlug = newSlug.trim();
		if (!trimmedSlug) {
			toast.error("Slug tidak boleh kosong");
			return;
		}

		if (trimmedSlug === invitation.slug) {
			setEditingSlug(false);
			return;
		}

		setSlugLoading(true);
		try {
			// First check if slug is unique
			const checkResponse = await fetch(
				`/api/invitations/check-slug?slug=${encodeURIComponent(trimmedSlug)}`
			);
			if (!checkResponse.ok) {
				throw new Error("Failed to check slug availability");
			}

			const checkData = await checkResponse.json();
			if (!checkData.available) {
				toast.error("Slug sudah digunakan, silakan pilih yang lain");
				return;
			}

			// Update the slug
			const response = await fetch(`/api/invitations/${invitation.slug}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					slug: trimmedSlug,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to update slug");
			}

			const updatedInvitation = await response.json();
			setInvitation(updatedInvitation);
			setEditingSlug(false);
			toast.success("Slug berhasil diperbarui");
		} catch (error) {
			console.error("Error updating slug:", error);
			toast.error("Gagal memperbarui slug");
		} finally {
			setSlugLoading(false);
		}
	};

	const handleSlugCancel = () => {
		setEditingSlug(false);
		setNewSlug("");
	};

	const getStatusBadge = (invitation: InvitationWithModules) => {
		if (!invitation.is_paid) {
			return (
				<Badge variant="destructive" className="flex items-center gap-1">
					<CreditCard className="h-3 w-3" />
					Pembayaran Diperlukan
				</Badge>
			);
		}
		if (invitation.is_published) {
			return (
				<Badge variant="default" className="flex items-center gap-1 bg-green-600">
					<CheckCircle className="h-3 w-3" />
					Dipublikasikan
				</Badge>
			);
		}
		return (
			<Badge variant="secondary" className="flex items-center gap-1">
				<Clock className="h-3 w-3" />
				Belum Dipublikasikan
			</Badge>
		);
	};

	const getActionButton = (invitation: InvitationWithModules) => {
		if (!invitation.is_paid) {
			return (
				<div className="space-y-2">
					<Button
						onClick={() => window.open("https://pay.doku.com/p-link/p/3LyLjISU8f", "_blank")}
						className="w-full"
						variant="default"
					>
						<CreditCard className="h-4 w-4 mr-2" />
						Bayar Sekarang
					</Button>
					<Button
						onClick={() => window.open("http://wa.me/6285710945738", "_blank")}
						className="w-full"
						variant="outline"
					>
						<MessageCircle className="h-4 w-4 mr-2" />
						Kirim Bukti Pembayaran
					</Button>
				</div>
			);
		}

		return (
			<Button
				onClick={() => handlePublishToggle(invitation.slug, invitation.is_published)}
				variant={invitation.is_published ? "destructive" : "default"}
				className="w-full"
			>
				{invitation.is_published ? (
					<>
						<XCircle className="h-4 w-4 mr-2" />
						Batalkan Publikasi
					</>
				) : (
					<>
						<CheckCircle className="h-4 w-4 mr-2" />
						Publikasikan
					</>
				)}
			</Button>
		);
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
										<BreadcrumbPage>Bagikan Undangan</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</div>
					</header>
					<div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full overflow-hidden">
						<div className="bg-white flex-1 rounded-xl h-full overflow-scroll shadow-xl p-6">
							<div className="flex items-center justify-between mb-6">
								<div>
									<h2 className="text-xl font-semibold">Bagikan Undangan</h2>
									<p className="text-sm text-muted-foreground mt-1">
										Kelola status publikasi undangan Anda
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
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<Card key={invitation.id}>
											<CardHeader>
												<div className="flex flex-col items-start justify-between gap-2">
													<div className="flex gap-2">{getStatusBadge(invitation)}</div>

													<CardTitle className="text-lg">
														{invitation.design
															.replace(/-/g, " ")
															.replace(/\b\w/g, l => l.toUpperCase())}
													</CardTitle>
													<CardDescription className="flex flex-col h-16">
														Tautan:{" "}
														{editingSlug ? (
															<div className="flex flex-col gap-2">
																<div className="flex items-center">
																	<Label htmlFor="slug-input" className="text-accent">
																		{process.env.NEXT_PUBLIC_API_URL}/w/
																	</Label>
																	<Input
																		id="slug-input"
																		value={newSlug}
																		onChange={e => setNewSlug(e.target.value)}
																		placeholder="masukkan-slug-baru"
																		className="h-6 px-1"
																	/>
																</div>
																<div className="flex items-center gap-2">
																	<Button
																		size="sm"
																		onClick={handleSlugSave}
																		disabled={slugLoading}
																		className="h-8 px-2"
																	>
																		{slugLoading ? (
																			<span className="animate-spin">⏳</span>
																		) : (
																			<span>Simpan</span>
																		)}
																	</Button>
																	<Button
																		size="sm"
																		variant="outline"
																		onClick={handleSlugCancel}
																		disabled={slugLoading}
																		className="h-8 px-2"
																	>
																		<X className="h-3 w-3" />
																	</Button>
																</div>
															</div>
														) : (
															<div className="flex items-center gap-2">
																<Link
																	href={`${process.env.NEXT_PUBLIC_API_URL}/w/${invitation.slug}`}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="text-accent font-medium"
																>
																	{process.env.NEXT_PUBLIC_API_URL}/w/{invitation.slug}
																</Link>
																<Button
																	size="sm"
																	variant="ghost"
																	onClick={handleSlugEdit}
																	className="h-6 w-6 p-0"
																>
																	<Edit className="h-3 w-3" />
																</Button>
															</div>
														)}
													</CardDescription>
												</div>
											</CardHeader>
											<CardContent className="pt-0">
												<div className="space-y-4">
													<div className="text-sm text-muted-foreground">
														Dibuat: {new Date(invitation.created_at).toLocaleDateString("id-ID")}
													</div>

													{!invitation.is_paid && (
														<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
															<div className="flex flex-col items-start gap-2">
																<div className="flex items-center gap-2">
																	<Image
																		src="/images/qris-logo.svg"
																		alt="QRIS"
																		width={24}
																		height={24}
																	/>
																	<Image
																		src="/images/ovo-logo.svg"
																		alt="OVO"
																		width={24}
																		height={24}
																	/>
																</div>
																<div className="text-sm">
																	<div className="flex items-center gap-2 mb-1">
																		<p className="font-medium text-yellow-800">
																			Pembayaran Diperlukan
																		</p>
																		<Tooltip>
																			<TooltipTrigger asChild>
																				<Info className="h-4 w-4 text-yellow-600 cursor-help" />
																			</TooltipTrigger>
																			<TooltipContent>
																				<p className="max-w-sm">
																					Konfirmasi bukti pembayaran membutuhkan waktu maksimal 1
																					hari kerja sejak pengiriman bukti pembayaran.
																				</p>
																			</TooltipContent>
																		</Tooltip>
																	</div>
																	<p className="text-yellow-700">
																		Lengkapi pembayaran untuk mempublikasikan undangan Anda. Setelah
																		pembayaran, kirim bukti ke WhatsApp kami.
																	</p>
																</div>
															</div>
														</div>
													)}

													{invitation.is_paid && invitation.is_published && (
														<div className="bg-green-50 border border-green-200 rounded-lg p-3">
															<div className="flex items-start gap-2">
																<CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
																<div className="text-sm">
																	<p className="font-medium text-green-800 mb-1">
																		Aktif & Dipublikasikan
																	</p>
																	<p className="text-green-700">
																		Undangan Anda aktif dan dapat diakses oleh pengunjung.
																	</p>
																</div>
															</div>
														</div>
													)}

													{getActionButton(invitation)}
												</div>
											</CardContent>
										</Card>
										<ShareLinkCard activeInvitation={invitation} />
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
