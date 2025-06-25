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
import { useEffect } from "react";

export const CoverSchema = z.object({
	title: z
		.string({ error: "Judul tidak boleh kosong" })
		.min(1, { message: "Judul tidak boleh kosong" }),
	subtitle: z.string().optional(),
});

export type CoverData = z.infer<typeof CoverSchema>;

export function CoverModuleForm() {
	const { activeInvitation } = useInvitations();
	const coverModule = activeInvitation?.Modules.find(mod => mod.name === "Cover");
	const moduleData = coverModule?.content as CoverData;

	console.log("Cover moduleData:", moduleData);

	const form = useForm<z.infer<typeof CoverSchema>>({
		resolver: zodResolver(CoverSchema),
	});

	useEffect(() => {
		if (moduleData) {
			form.reset(moduleData);
		}
	}, [moduleData, form]);

	const onSubmit = (values: z.infer<typeof CoverSchema>) => {
		try {
			toast(
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(values, null, 2)}</code>
				</pre>
			);
			// if (!activeInvitation || !coverModule) return;
			// updateModule(activeInvitation.id, coverModule.id, {
			// 	content: values,
			// });
		} catch (error) {
			console.error("Form submission error", error);
			toast.error("Failed to submit the form. Please try again.");
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
						</div>
						<SheetFooter className="mt-auto">
							<Button type="submit">Simpan perubahan</Button>
							<SheetClose asChild>
								<Button variant="outline">Tutup</Button>
							</SheetClose>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
