import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;
		const body = await request.json();

		// Validate the module exists
		const existingModule = await prisma.module.findUnique({
			where: { id },
		});

		if (!existingModule) {
			return NextResponse.json({ error: "Module not found" }, { status: 404 });
		}

		// Update the module
		const updatedModule = await prisma.module.update({
			where: { id },
			data: {
				content: body.content,
				// Add other fields that might need updating
				...(body.name && { name: body.name }),
				...(body.order !== undefined && { order: body.order }),
				...(body.url && { url: body.url }),
			},
		});

		return NextResponse.json(updatedModule);
	} catch (error) {
		console.error("Error updating module:", error);
		return NextResponse.json({ error: "Failed to update module" }, { status: 500 });
	}
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const { id } = await params;

		const moduleData = await prisma.module.findUnique({
			where: { id },
		});

		if (!moduleData) {
			return NextResponse.json({ error: "Module not found" }, { status: 404 });
		}

		return NextResponse.json(moduleData);
	} catch (error) {
		console.error("Error fetching module:", error);
		return NextResponse.json({ error: "Failed to fetch module" }, { status: 500 });
	}
}
