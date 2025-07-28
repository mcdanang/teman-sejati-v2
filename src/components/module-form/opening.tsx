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

export const Schema = z.object({
	title: z
		.string({ error: "Judul tidak boleh kosong" })
		.min(1, { message: "Judul tidak boleh kosong" }),
	subtitle: z.string().optional(),
	video: z
		.string({ error: "Video tidak boleh kosong" })
		.min(1, { message: "Video tidak boleh kosong" })
		.refine(
			url => {
				// Check if it's a valid video URL (basic check)
				const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
				const isVideoUrl = videoExtensions.some(
					ext =>
						url.toLowerCase().includes(ext) ||
						url.includes("cloudinary.com") ||
						url.includes("res.cloudinary.com")
				);
				return isVideoUrl;
			},
			{ message: "URL harus berupa video yang valid" }
		),
});

export type Data = z.infer<typeof Schema>;

export function ModuleForm({ invitations }: { invitations: ReturnType<typeof useInvitations> }) {
	const { updateModule, activeInvitation } = invitations;
	const editedModule = activeInvitation?.Modules.find(mod => mod.name === "Opening");
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
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Judul</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="subtitle"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sub Judul</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="video"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Video</FormLabel>
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
														allowedTypes={["video"]}
														trigger={
															<Button type="button" variant="outline" size="sm">
																<Video className="h-4 w-4 mr-2" />
																{field.value ? "Ganti Video" : "Pilih Video"}
															</Button>
														}
													/>
													{field.value && (
														<div className="relative w-32 h-32 border rounded-lg overflow-hidden">
															<video
																src={field.value}
																controls
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
