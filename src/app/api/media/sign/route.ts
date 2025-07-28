import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
	const { folder, public_id, action } = await request.json();
	const timestamp = Math.round(new Date().getTime() / 1000);

	let signature;
	if (action === "upload") {
		signature = cloudinary.v2.utils.api_sign_request(
			{ timestamp, folder },
			process.env.CLOUDINARY_API_SECRET!
		);
	} else if (action === "delete") {
		signature = cloudinary.v2.utils.api_sign_request(
			{ public_id, timestamp },
			process.env.CLOUDINARY_API_SECRET!
		);
	}

	return NextResponse.json({ signature, timestamp });
}
