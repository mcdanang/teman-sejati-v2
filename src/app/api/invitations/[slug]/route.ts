import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const invitation = await prisma.invitation.findUnique({
		where: { slug },
		include: {
			Modules: {
				orderBy: { order: "asc" },
			},
		},
	});
	return NextResponse.json(invitation);
}

export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { slug } = await params;
		const body = await request.json();

		// Verify the invitation belongs to the user
		const invitation = await prisma.invitation.findFirst({
			where: {
				slug: slug,
				user_id: session.user.id,
			},
		});

		if (!invitation) {
			return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
		}

		// Update the invitation
		const updatedInvitation = await prisma.invitation.update({
			where: {
				slug: slug,
			},
			data: {
				...body,
			},
			select: {
				id: true,
				slug: true,
				design: true,
				desktop_bg: true,
				background_music: true,
				is_paid: true,
				is_published: true,
				created_at: true,
			},
		});

		return NextResponse.json(updatedInvitation);
	} catch (error) {
		console.error("Error updating invitation:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
