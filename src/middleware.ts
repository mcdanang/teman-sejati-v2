// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTokenExpired(token: any) {
	const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
	return token?.exp && token.exp < currentTime;
}

// Custom middleware for API routes
async function apiMiddleware(req: NextRequest) {
	const token = await getToken({ req });

	if (!token) {
		return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	if (isTokenExpired(token)) {
		return new NextResponse(JSON.stringify({ error: "Token expired" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}

	return NextResponse.next();
}

// Middleware handler
export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Check if the request is to an API route under /api/member
	if (pathname.startsWith("/api/member")) {
		return apiMiddleware(req);
	}

	// For non-API routes, use the default next-auth middleware behavior
	const token = await getToken({ req });

	if (!token) {
		const redirectUrl = `${req.nextUrl.origin}/auth?callbackUrl=${encodeURIComponent(
			req.nextUrl.origin + req.nextUrl.pathname
		)}`;
		return NextResponse.redirect(redirectUrl);
	}

	if (isTokenExpired(token)) {
		const redirectUrl = `${req.nextUrl.origin}/auth?error=expired_token&callbackUrl=${encodeURIComponent(
			req.nextUrl.origin + req.nextUrl.pathname
		)}`;
		return NextResponse.redirect(redirectUrl);
	}

	return NextResponse.next();
}

// Apply the middleware to the desired routes
export const config = {
	matcher: ["/member/:path*", "/api/member/:path*"],
};
