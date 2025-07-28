import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const user_id = searchParams.get("user_id");
	if (!user_id) return NextResponse.json({ resources: [] });

	const resources = await cloudinary.v2.search
		.expression(`folder:teman-sejati-2/${user_id}`)
		.sort_by("created_at", "desc")
		.max_results(30)
		.execute();

	return NextResponse.json(resources);
}
