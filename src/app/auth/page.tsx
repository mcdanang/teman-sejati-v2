import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInWithProvider } from "@/components/auth-components";

export default function Dashboard() {
	return (
		<div className="min-h-svh lg:grid lg:grid-cols-2 bg-background">
			<div className="flex items-center justify-center py-12">
				<Card className="mx-auto w-96">
					<CardHeader>
						<CardTitle className="text-2xl">Login</CardTitle>
						<CardDescription>Please login to continue.</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4">
							<SignInWithProvider provider="google" className="w-full" />
						</div>
					</CardContent>
				</Card>
			</div>
			<div className="hidden lg:block m-auto text-center text-xs">
				<Image
					src="/images/login-pic2.svg" // Path to your image
					alt="Description of image"
					width={400} // Desired width
					height={400} // Desired height
					className="m-auto" // Additional Tailwind CSS classes if needed
				/>
				<a href="https://storyset.com/work">Work illustrations by Storyset</a>
			</div>
		</div>
	);
}
