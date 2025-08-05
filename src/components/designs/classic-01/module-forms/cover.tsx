"use client";
import * as z from "zod/v4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	Form,
	FormControl,
	// FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useInvitations } from "@/hooks/use-invitations";
import { Pen, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { MediaSelector } from "@/components/media-selector";
import Image from "next/image";
import { InvitationWithModules } from "@/types";
import { useCoverStore } from "@/stores/cover-store";
import { cn } from "@/lib/utils";

export const Schema = z.object({
	groom_short_name: z
		.string({ error: "Nama pria tidak boleh kosong" })
		.min(1, { message: "Nama pria tidak boleh kosong" }),
	bride_short_name: z
		.string({ error: "Nama perempuan tidak boleh kosong" })
		.min(1, { message: "Nama perempuan tidak boleh kosong" }),
	image: z
		.string({ error: "Gambar tidak boleh kosong" })
		.min(1, { message: "Gambar tidak boleh kosong" })
		.url({ message: "URL gambar tidak valid" })
		.refine(
			url => {
				// Check if it's a valid image URL (basic check)
				const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
				const isImageUrl = imageExtensions.some(
					ext =>
						url.toLowerCase().includes(ext) ||
						url.includes("cloudinary.com") ||
						url.includes("res.cloudinary.com")
				);
				return isImageUrl;
			},
			{ message: "URL harus berupa gambar yang valid" }
		),
});

export type Data = z.infer<typeof Schema>;

export function ModuleForm({ activeInvitation }: { activeInvitation: InvitationWithModules }) {
	const { updateModule } = useInvitations();
	const editedModule = activeInvitation?.Modules.find(mod => mod.name === "Cover");
	const moduleData = editedModule?.content as Data;
	const sheetCloseRef = useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof Schema>>({
		resolver: zodResolver(Schema),
	});

	useEffect(() => {
		if (moduleData) {
			form.reset(moduleData);
		}
	}, [moduleData, form, activeInvitation]);

	const onSubmit = async (values: z.infer<typeof Schema>) => {
		try {
			if (!activeInvitation || !editedModule) return;

			const updatedModule = {
				...editedModule,
				invitation_id: activeInvitation.id,
				id: editedModule?.id ?? "", // Ensure id is always a string
				content: values, // Updated JSON content
			};

			// Show loading toast
			const loadingToast = toast.loading("Menyimpan perubahan...");

			await updateModule(activeInvitation.id, updatedModule);

			// Dismiss loading toast and show success
			toast.dismiss(loadingToast);
			toast.success("Perubahan berhasil disimpan.");

			// Auto-close the sheet
			sheetCloseRef.current?.click();
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Gagal menyimpan perubahan.");
		}
	};

	const { isMovedUp } = useCoverStore();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className={cn(
						"absolute z-30 top-2 right-2 lg:opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow hover:bg-gray-100",
						isMovedUp && "hidden"
					)}
					aria-label="Edit module"
				>
					<Pen className="h-4 w-4 text-gray-600" />
				</Button>
			</SheetTrigger>
			<SheetContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
						<SheetHeader>
							<SheetTitle>Edit modul</SheetTitle>
							<SheetDescription>
								Lakukan perubahan data pada modul Anda di sini. Klik simpan saat Anda sudah selesai.
							</SheetDescription>
						</SheetHeader>
						<div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">
							<FormField
								control={form.control}
								name="groom_short_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Nama Singkat Pengantin Pria</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="bride_short_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Nama Singkat Pengantin Perempuan</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="image"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Gambar</FormLabel>
										<FormControl>
											<div className="space-y-3">
												{/* Hidden input for form validation */}
												<Input type="text" {...field} className="hidden" />
												<div className="flex flex-col gap-3">
													<MediaSelector
														onSelect={urls => {
															if (urls.length > 0) {
																field.onChange(urls[0]);
																// Trigger validation after setting the value
																field.onBlur();
															}
														}}
														allowedTypes={["image"]}
														trigger={
															<Button type="button" variant="outline" size="sm">
																<ImageIcon className="h-4 w-4 mr-2" />
																{field.value ? "Ganti Gambar" : "Pilih Gambar"}
															</Button>
														}
													/>
													{field.value && (
														<div className="relative w-16 h-16 border rounded-lg overflow-hidden">
															<Image
																src={field.value}
																alt="Selected image preview"
																fill
																className="object-cover"
																onError={e => {
																	// Hide the image if it fails to load
																	e.currentTarget.style.display = "none";
																}}
															/>
														</div>
													)}
												</div>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<SheetFooter className="mt-auto">
							<Button type="submit">Simpan perubahan</Button>
							<SheetClose asChild>
								<Button ref={sheetCloseRef} variant="outline">
									Tutup
								</Button>
							</SheetClose>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
