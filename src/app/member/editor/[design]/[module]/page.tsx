import { DesignKey, designs, ModuleKey } from "@/lib/designs";
import { ModuleEditor } from "@/components/editor/module-editor";

export default async function EditPage({
	params,
}: {
	params: Promise<{ module: ModuleKey; design: DesignKey }>;
}) {
	const { design: selectedDesign, module: selectedModule } = await params;

	const moduleData = designs[selectedDesign].modules[selectedModule];

	if (!moduleData) {
		return <div>Module not found</div>;
	}

	// Simulate invitation content loaded from DB
	const invitationContent = {
		order: [
			"Cover",
			"Opening",
			"Quotes",
			"Mempelai Pria",
			"Mempelai Wanita",
			"Waktu",
			"Lokasi",
			"RSVP",
			"Gallery",
			"Wedding Gift",
			"Wedding Wishes",
			"Closing",
		],
		desktopBackground: "/designs/classic/bg.webp",
		modules: {
			Cover: {
				title: "Bismillahirrahmanirrahim",
				subtitle: "Dengan izin Allah, kami akan menikah",
				image1: "/designs/classic/couple.svg",
			},
			Opening: {
				title: "Wedding Invitation",
				subtitle: "We are getting married",
				description: "Please join us to celebrate our special day",
			},
			Quotes: {
				verse:
					"وَمِنْ ءَايَـٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَـَٔايَـٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ",
				translation:
					"And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them. And He has placed between you compassion and mercy. Surely in this are signs for people who reflect.",
				reference: "Surah Ar-Rum, 30:21",
			},
			"Mempelai Pria": {
				full_name: "John Doe",
				description: "Son of Mr. & Mrs. Doe",
				image: "/designs/classic/photo1.jpg",
			},
			"Mempelai Wanita": {
				full_name: "Jane Smith",
				description: "Daughter of Mr. & Mrs. Smith",
				image: "/designs/classic/photo2.jpg",
			},
			Waktu: {
				akad_date: "2025-05-10",
				akad_time: "09:00",
				resepsi_date: "2025-05-10",
				resepsi_time: "11:00",
			},
			Lokasi: {
				akad_location: "Masjid Raya Jakarta",
				resepsi_location: "Gedung Serbaguna Jakarta",
				map_url: "https://maps.google.com",
			},
			RSVP: {
				invitation_id: "test-invitation",
				max_people_count: "2",
			},
			Gallery: {
				title: "Photo Gallery",
				subtitle: "Our beautiful moments together",
				image: "/designs/classic/photo1.jpg",
			},
			"Wedding Gift": {
				address_name: "Home Address",
				address_detail: "Jl. Example Street No. 123, City, Country",
				bank_name: "Bank Example",
				bank_account_number: "1234567890",
				account_name: "John & Jane Doe",
			},
			"Wedding Wishes": {
				title: "Wedding Wishes",
				description: "Leave your wishes for the happy couple",
			},
			Closing: {
				title: "Terima Kasih",
				subtitle:
					"Atas kehadiran dan doa restu dari Bapak/Ibu/Saudara/i sekalian, kami ucapkan terima kasih yang sebesar-besarnya. Semoga Allah SWT membalas kebaikan Bapak/Ibu/Saudara/i sekalian dengan yang lebih baik.",
				image: "/designs/classic/couple.svg",
			},
		},
	};

	return (
		<ModuleEditor
			moduleData={moduleData}
			data={invitationContent.modules[selectedModule]}
			desktopBackground={invitationContent.desktopBackground}
		/>
	);
}
