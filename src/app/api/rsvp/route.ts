import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { invitation_id, guest_name, will_attend, people_count } = body;

		// Validate required fields
		if (!invitation_id || !guest_name || typeof will_attend !== "boolean" || !people_count) {
			return NextResponse.json(
				{ error: "Missing required fields: invitation_id, guest_name, will_attend, people_count" },
				{ status: 400 }
			);
		}

		// Validate people_count is a positive integer
		if (typeof people_count !== "number" || people_count < 1) {
			return NextResponse.json(
				{ error: "people_count must be a positive integer" },
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

		// Create RSVP record
		const rsvp = await prisma.rSVP.create({
			data: {
				invitation_id,
				guest_name,
				will_attend,
				people_count,
			},
		});

		return NextResponse.json(rsvp, { status: 201 });
	} catch (error) {
		console.error("Error creating RSVP:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const invitation_id = searchParams.get("invitation_id");

		if (!invitation_id) {
			return NextResponse.json({ error: "invitation_id parameter is required" }, { status: 400 });
		}

		// Get all RSVPs for the invitation
		const rsvps = await prisma.rSVP.findMany({
			where: { invitation_id },
			orderBy: { created_at: "desc" },
		});

		return NextResponse.json({ rsvps }, { status: 200 });
	} catch (error) {
		console.error("Error fetching RSVPs:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
