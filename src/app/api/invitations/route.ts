import { NextResponse } from "next/server";
import { nanoid } from "nanoid"; // to generate a slug
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

// GET /api/member/invitations
export async function GET() {
	const session = await auth();
	if (!session || !session.user?.email) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const invitations = await prisma.invitation.findMany({
		where: {
			User: {
				email: session.user.email,
			},
		},
		orderBy: { created_at: "asc" },
	});

	return NextResponse.json({ invitations });
}

// POST /api/member/invitations
export async function POST(req: Request) {
	const session = await auth();
	if (!session || !session.user?.email) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();

	// Optional: allow partial input from client or define your defaults
	const newInvitation = await prisma.invitation.create({
		data: {
			slug: body.slug ?? nanoid(8),
			index: body.index ?? 0,
			is_paid: body.is_paid ?? false,
			is_published: body.is_published ?? false,
			User: {
				connect: {
					email: session.user.email,
				},
			},
		},
	});

	return NextResponse.json(newInvitation);
}
