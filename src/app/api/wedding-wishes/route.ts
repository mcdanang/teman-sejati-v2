import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { invitation_id, guest_name, wish_message } = body;

		// Validate required fields
		if (!invitation_id || !guest_name || !wish_message) {
			return NextResponse.json(
				{ error: "Missing required fields: invitation_id, guest_name, wish_message" },
				{ status: 400 }
			);
		}

		// Check if invitation exists
		const invitation = await prisma.invitation.findUnique({
			where: { id: invitation_id },
		});

		if (!invitation) {
			return NextResponse.json({ error: "Invitation not found" }, { status: 404 });
		}

		// Create wedding wish record
		const weddingWish = await prisma.weddingWish.create({
			data: {
				invitation_id,
				guest_name,
				wish_message,
			},
		});

		return NextResponse.json(weddingWish, { status: 201 });
	} catch (error) {
		console.error("Error creating wedding wish:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const invitation_id = searchParams.get("invitation_id");
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "5");
		const offset = (page - 1) * limit;

		if (!invitation_id) {
			return NextResponse.json({ error: "invitation_id parameter is required" }, { status: 400 });
		}

		// Get wedding wishes with pagination
		const [wishes, totalCount] = await Promise.all([
			prisma.weddingWish.findMany({
				where: { invitation_id },
				orderBy: { created_at: "desc" },
				skip: offset,
				take: limit,
			}),
			prisma.weddingWish.count({
				where: { invitation_id },
			}),
		]);

		const hasMore = offset + wishes.length < totalCount;

		return NextResponse.json(
			{
				wishes,
				pagination: {
					page,
					limit,
					totalCount,
					hasMore,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching wedding wishes:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
