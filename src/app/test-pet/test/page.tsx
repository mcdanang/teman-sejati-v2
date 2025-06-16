import { designs } from "@/lib/designs";

export default function TestPage() {
	const design = designs["classic"];

	// Simulate invitation content loaded from DB
	const invitationContent = {
		order: ["cover", "eventDetails"],
		modules: {
			cover: {
				title: "Bismillahirrahmanirrahim",
				subtitle: "Dengan izin Allah, kami akan menikah",
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
		},
	};

	const orderedModules = invitationContent.order ?? design.defaultOrder;

	return (
		<div className="min-h-screen bg-gray-100 space-y-6">
			{orderedModules.map(moduleId => {
				const moduleData = design.modules[moduleId as keyof typeof design.modules];
				if (!moduleData) return null;

				const Component = moduleData.Component;
				const data =
					invitationContent.modules[moduleId as keyof typeof invitationContent.modules] ?? {};
				return <Component key={moduleId} data={data} />;
			})}
		</div>
	);
}
