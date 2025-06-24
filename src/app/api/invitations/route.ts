import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getUniqueSlug } from "@/helper";

export async function GET() {
	try {
		const session = await auth();
		if (!session || !session.user?.email) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const invitations = await prisma.invitation.findMany({
			where: { user_id: user.id },
			include: {
				Modules: {
					orderBy: { order: "asc" },
				},
			},
			orderBy: { index: "asc" },
		});

		return NextResponse.json({ invitations }, { status: 200 });
	} catch (error) {
		console.error("Error fetching invitations:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}

// POST /api/member/invitations
export async function POST(req: Request) {
	try {
		const session = await auth();
		if (!session || !session.user?.email) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}

		const user = await prisma.user.findUnique({
			where: { email: session.user.email },
		});

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		const body = await req.json();

		const { is_paid, is_published, Modules, design, desktop_bg } = body;
		const index =
			(await prisma.invitation.count({
				where: {
					user_id: user.id,
				},
			})) + 1;

		const slug = await getUniqueSlug("undangan");

		const newInvitation = await prisma.invitation.create({
			data: {
				user_id: user.id,
				slug,
				index,
				is_paid,
				is_published,
				design,
				desktop_bg,
				Modules: {
					create:
						Modules?.map((mod: Prisma.ModuleCreateInput) => ({
							order: mod.order,
							name: mod.name,
							url: mod.url,
							content: mod.content,
						})) ?? [],
				},
			},
			include: {
				Modules: true,
			},
		});

		return NextResponse.json(newInvitation);
	} catch (error) {
		console.error("Error creating invitation:", error);
		return NextResponse.json({ message: "Internal server error" }, { status: 500 });
	}
}
