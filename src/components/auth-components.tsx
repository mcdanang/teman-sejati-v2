"use client";
import { signIn, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

const providerIcons = {
	google: "/images/google-icon.svg",
	// Add other providers and their icon paths here
};

export function SignIn({
	provider,
	...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
	return (
		<form
			action={async () => {
				await signIn(provider);
			}}
		>
			<Button {...props}>Sign In</Button>
		</form>
	);
}

interface SignInWithProviderProps extends React.ComponentPropsWithRef<typeof Button> {
	provider?: string;
}

export function SignInWithProvider({ provider, ...props }: SignInWithProviderProps) {
	const iconSrc = provider
		? providerIcons[provider.toLowerCase() as keyof typeof providerIcons]
		: null;
	return (
		<form
			action={async () => {
				await signIn(provider, { callbackUrl: "/member/dashboard" });
			}}
		>
			<Button {...props} variant="outline">
				{iconSrc && (
					<Image src={iconSrc} alt={`${provider} Icon`} width={20} height={20} className="mr-4" />
				)}
				Login with <span className="capitalize">&nbsp;{provider}</span>
			</Button>
		</form>
	);
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
	return (
		<form
			action={async () => {
				await signOut({ callbackUrl: "/" });
			}}
			className="w-full"
		>
			<Button variant="ghost" className="w-full p-0" {...props}>
				Sign Out
			</Button>
		</form>
	);
}
