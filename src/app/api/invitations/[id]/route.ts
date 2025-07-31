import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { id } = params;
		const body = await request.json();

		// Verify the invitation belongs to the user
		const invitation = await prisma.invitation.findFirst({
			where: {
				id: id,
				user_id: session.user.id,
			},
		});

		if (!invitation) {
			return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
		}

		// Update the invitation
		const updatedInvitation = await prisma.invitation.update({
			where: {
				id: id,
			},
			data: {
				...body,
			},
			select: {
				id: true,
				slug: true,
				design: true,
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
