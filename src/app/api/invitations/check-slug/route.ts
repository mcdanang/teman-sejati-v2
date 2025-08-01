import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
	try {
		const session = await auth();
		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const slug = searchParams.get("slug");

		if (!slug) {
			return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 });
		}

		// Check if slug exists (excluding the current user's invitations)
		const existingInvitation = await prisma.invitation.findFirst({
			where: {
				slug: slug,
				user_id: {
					not: session.user.id,
				},
			},
		});

		return NextResponse.json({
			available: !existingInvitation,
			slug: slug,
		});
	} catch (error) {
		console.error("Error checking slug availability:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
