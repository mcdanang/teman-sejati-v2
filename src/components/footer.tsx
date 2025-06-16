import Image from "next/image";
import CustomLink from "./custom-link";
import { Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-white text-slate-500 p-12 pb-6 dark:bg-slate-800">
			<div className="grid grid-cols-1 lg:grid-cols-3">
				<div className="flex flex-col col-span-1 gap-2">
					<div className="flex items-center">
						<Link className="flex gap-2 items-center" href="/">
							<Image src={"/images/logo1.svg"} alt="logo" width={190} height={80} />
						</Link>
					</div>
					<p className="mt-2 ">Temani Momen Indah Pernikahanmu</p>
					<Link
						className="transition hover:text-primary hover:translate-x-1 duration-300 flex items-center gap-2"
						href="mailto:temansejatiweb@gmail.com"
					>
						<div className="p-1 text-primary rounded-full bg-secondary">
							<Mail className="h-4 w-4" />
						</div>
						<span className="">temansejatiweb@gmail.com</span>
					</Link>
				</div>
				<div className="flex flex-col mt-8 lg:mt-0 gap-2">
					<div className="text-lg font-semibold text-primary font-serif">Perusahaan</div>
					<div className="">PT MCIDEAS WORK DIGITAL</div>
					<div className="max-w-xs">
						Jl. Cemara Raya No. 8, Baktijaya, Sukmajaya, Kota Depok 16418, Jawa Barat
					</div>
					<Link
						className="transition hover:text-primary hover:translate-x-1 duration-300 flex items-center gap-2 cursor-pointer"
						href="mailto:mcideaswork@gmail.com"
					>
						<div className="p-1 text-primary rounded-full bg-secondary">
							<Mail className="h-4 w-4 " />
						</div>
						<span className="">mcideaswork@gmail.com</span>
					</Link>
					<div className="transition hover:text-primary hover:translate-x-1 duration-300 flex items-center gap-2 cursor-pointer">
						<div className="p-1 text-primary rounded-full bg-secondary">
							<Phone className="h-4 w-4" />
						</div>
						<span className="">+62 857 1094 5738</span>
					</div>
				</div>
				<div className="grid grid-cols-1 mt-8 lg:grid-cols-2 lg:mt-0 gap-2">
					<div className="flex flex-col gap-2">
						<div className="text-lg font-semibold text-primary font-serif">Navigasi</div>
						<CustomLink
							className="transition hover:text-primary hover:translate-x-1 duration-300"
							href="/member/dashboard"
						>
							Buat Undangan
						</CustomLink>
						<CustomLink
							className="transition hover:text-primary hover:translate-x-1 duration-300"
							href="/"
						>
							Contoh Undangan
						</CustomLink>
						<CustomLink
							className="transition hover:text-primary hover:translate-x-1 duration-300"
							href="/"
						>
							Harga
						</CustomLink>
						<CustomLink
							className="transition hover:text-primary hover:translate-x-1 duration-300"
							href="/"
						>
							Cara Kerja
						</CustomLink>
						<CustomLink
							className="transition hover:text-primary hover:translate-x-1 duration-300"
							href="/"
						>
							FAQ
						</CustomLink>
					</div>
					<div className="flex flex-col gap-2">
						<div className="text-lg font-semibold text-primary font-serif">Legal</div>
						<CustomLink
							className="transition hover:text-primary hover:translate-x-1 duration-300"
							href="/terms"
						>
							Terms of Service
						</CustomLink>
						<CustomLink
							className="transition hover:text-primary hover:translate-x-1 duration-300"
							href="/privacy"
						>
							Privacy Policy
						</CustomLink>
					</div>
				</div>
			</div>
			<div className="flex flex-col sm:flex-row justify-center mt-12">
				<p>© {new Date().getFullYear()} Teman Sejati. All rights reserved.</p>
			</div>
		</footer>
	);
}
