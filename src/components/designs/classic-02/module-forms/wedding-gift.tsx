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
import { Pen } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { InvitationWithModules } from "@/types";

export const Schema = z.object({
	address_name: z
		.string({ error: "Nama alamat tidak boleh kosong" })
		.min(1, { message: "Nama alamat tidak boleh kosong" }),
	address_detail: z
		.string({ error: "Detail alamat tidak boleh kosong" })
		.min(1, { message: "Detail alamat tidak boleh kosong" }),
	bank_name: z
		.string({ error: "Nama bank tidak boleh kosong" })
		.min(1, { message: "Nama bank tidak boleh kosong" }),
	bank_account_number: z
		.string({ error: "Nomor rekening tidak boleh kosong" })
		.min(1, { message: "Nomor rekening tidak boleh kosong" }),
	account_name: z
		.string({ error: "Nama pemilik rekening tidak boleh kosong" })
		.min(1, { message: "Nama pemilik rekening tidak boleh kosong" }),
});

export type Data = z.infer<typeof Schema>;

export function ModuleForm({ activeInvitation }: { activeInvitation: InvitationWithModules }) {
	const { updateModule } = useInvitations();
	const editedModule = activeInvitation?.Modules.find(mod => mod.name === "Wedding Gift");
	const moduleData = editedModule?.content as Data;
	const sheetCloseRef = useRef<HTMLButtonElement>(null);

	const form = useForm<z.infer<typeof Schema>>({
		resolver: zodResolver(Schema),
	});

	useEffect(() => {
		if (moduleData) {
			form.reset(moduleData);
		} else {
			// Set default values if no module data exists
			form.reset({
				address_name: "Home Address",
				address_detail: "Jl. Example Street No. 123, City, Country",
				bank_name: "Bank Name",
				bank_account_number: "1234567890",
				account_name: "John & Jane Doe",
			});
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
								name="address_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nama Alamat</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="address_detail"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Detail Alamat</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bank_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nama Bank</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="bank_account_number"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nomor Rekening</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="account_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nama Pemilik Rekening</FormLabel>
										<FormControl>
											<Input type="text" {...field} />
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
