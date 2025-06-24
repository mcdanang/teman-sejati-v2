import { Culture } from "@/lib/designs";

export const eventDetailsConfig = {
	schema: {
		akadDate: "string",
		akadTime: "string",
		akadLocation: "string",
		resepsiDate: "string",
		resepsiTime: "string",
		resepsiLocation: "string",
	},
	defaultTexts: {
		islamic: {
			mainTitle: "Acara Pernikahan",
			akadTitle: "Akad Nikah",
			resepsiTitle: "Resepsi",
			akadDate: "Sabtu, 10 Mei 2025",
			akadTime: "09.00 WIB",
			akadLocation: "Masjid Raya Jakarta",
			resepsiDate: "Sabtu, 10 Mei 2025",
			resepsiTime: "11.00 WIB - selesai",
			resepsiLocation: "Gedung Serbaguna Jakarta",
		},
		christian: {
			mainTitle: "Perayaan Pernikahan",
			akadTitle: "Pemberkatan Pernikahan",
			resepsiTitle: "Resepsi",
			akadDate: "Sabtu, 10 Mei 2025",
			akadTime: "09.00 WIB",
			akadLocation: "Masjid Raya Jakarta",
			resepsiDate: "Sabtu, 10 Mei 2025",
			resepsiTime: "11.00 WIB - selesai",
			resepsiLocation: "Gedung Serbaguna Jakarta",
		},
	} satisfies Partial<Record<Culture, Record<string, string>>>,
};
