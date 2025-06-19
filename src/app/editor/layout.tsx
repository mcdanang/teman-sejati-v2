"use client";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<SessionProvider>{children}</SessionProvider>
		</main>
	);
}
