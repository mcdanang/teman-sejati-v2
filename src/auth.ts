import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./lib/prisma";
import { LoginMethodType } from "@prisma/client";

declare module "next-auth" {
	interface Session {
		user?: {
			id?: string;
			login_id?: string;
			name?: string | null;
			email?: string | null;
			image?: string | null;
		};
	}
}

export const config = {
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID as string,
			clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
		}),
	],
	callbacks: {
		async signIn({ user, account }) {
			if (account?.provider === "google") {
				const existingUser = await prisma.user.findUnique({
					where: {
						email: user?.email as string,
					},
				});

				if (!existingUser) {
					const newUser = {
						login_id: user?.id as string,
						login_method: LoginMethodType.GOOGLE,
						email: user?.email as string,
						name: user?.name as string,
					};

					await prisma.user.create({
						data: newUser,
					});
				}
				return true;
			}
			return false;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			// session.accessToken = token.accessToken;?
			if (session.user) {
				session.user.login_id = token.sub;

				const user = await prisma.user.findUnique({
					where: { email: session.user.email ?? undefined },
				});
				session.user.id = user?.id;
			}

			return session;
		},
	},
	pages: {
		signIn: "/auth",
	},
} satisfies NextAuthOptions;

export function auth(
	...args:
		| [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, config);
}
