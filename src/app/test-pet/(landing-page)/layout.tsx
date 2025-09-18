import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function LandingPageLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<Navbar />
			<main className="min-h-svh">{children}</main>
			<Footer />
		</section>
	);
}
