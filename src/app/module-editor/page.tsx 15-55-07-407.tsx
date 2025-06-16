import { designs } from "@/lib/designs";
import { ModuleEditor } from "@/components/editor/module-editor";

export default function EditPage() {
	const selectedDesign = "classic"; // Simulate selected design
	const selectedModule = "cover"; // Simulate selected module

	const moduleData = designs[selectedDesign].modules[selectedModule];

	// Simulate invitation content loaded from DB
	const invitationContent = {
		order: ["cover", "eventDetails", "photoGallery"],
		desktopBackground: "/designs/classic/bg.webp",
		modules: {
			cover: {
				title: "Bismillahirrahmanirrahim",
				subtitle: "Dengan izin Allah, kami akan menikah",
				image1: "/designs/classic/couple.svg",
			},
			eventDetails: {
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
			photoGallery: {
				title: "Photo Gallery",
				photos: [
					"/designs/classic/photo1.jpg",
					"/designs/classic/photo2.jpg",
					"/designs/classic/photo3.jpg",
					"/designs/classic/photo4.jpg",
					"/designs/classic/photo5.jpg",
					"/designs/classic/photo6.jpg",
					"/designs/classic/photo7.jpg",
				],
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
