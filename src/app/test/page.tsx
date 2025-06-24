import { designs } from "@/lib/designs";

export default function TestPage() {
	const design = designs["classic"];

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

	const orderedModules = invitationContent.order;

	return (
		<div
			className={`w-screen bg-fixed bg-gray-100 bg-cover bg-center`}
			style={{
				backgroundImage: `url(${invitationContent.desktopBackground})`,
			}}
		>
			<div className="max-w-md mx-auto min-h-screen bg-white p-4 space-y-6 shadow-lg overflow-hidden">
				{orderedModules.map(moduleId => {
					const moduleData = design.modules[moduleId as keyof typeof design.modules];
					if (!moduleData) return null;

					const Component = moduleData.Component;
					const data =
						invitationContent.modules[moduleId as keyof typeof invitationContent.modules] ?? {};
					return <Component key={moduleId} data={data} />;
				})}
			</div>
		</div>
	);
}
