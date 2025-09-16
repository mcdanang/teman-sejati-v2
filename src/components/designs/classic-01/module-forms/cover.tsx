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
import { Pen, Video } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { MediaSelector } from "@/components/media-selector";
import { InvitationWithModules } from "@/types";
import Image from "next/image";

export const Schema = z.object({
	images: z.array(z.string()).optional().default([]),
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

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className="absolute top-2 right-2 lg:opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1 shadow hover:bg-gray-100"
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
								name="images"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gambar</FormLabel>
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
																<Video className="h-4 w-4 mr-2" />
																{field.value ? "Ganti Gambar" : "Pilih Gambar"}
															</Button>
														}
													/>
													{field.value && (
														<div className="relative w-32 h-32 border rounded-lg overflow-hidden">
															<Image
																src={field.value[0]}
																alt="Gambar"
																className="w-full h-full object-cover"
																style={{ aspectRatio: 1 }}
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
