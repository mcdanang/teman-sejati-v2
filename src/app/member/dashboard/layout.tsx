import UserButton from "@/components/user-button";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<Navbar />
			<main className="max-w-screen-2xl py-4 sm:px-6 md:py-6 mx-auto bg-muted">{children}</main>
		</section>
	);
}

function Navbar() {
	return (
		<header
			className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md py-1 bg-background shadow-md`}
		>
			<div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
				{/* <div className="text-xl font-serif font-bold text-primary">Teman Sejati</div> */}
				<div className="flex items-center p-2">
					<Link className="flex items-center" href="/">
						<Image src={"/images/logo1.svg"} alt="logo" width={120} height={120} />
					</Link>
				</div>

				<div className="flex items-center space-x-4">
					<UserButton />
				</div>
			</div>
		</header>
	);
}
