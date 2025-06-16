import Footer from "@/components/footers";
import Navbar from "@/components/Navbar";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<Navbar />
			<main className="min-h-svh">{children}</main>
			<Footer />
		</section>
	);
}
