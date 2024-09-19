import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt } from "jose";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get("directus_session_token")?.value;

    if (cookie !== undefined) {
        try {
            const token = decodeJwt(cookie);

            if (token === null) {
                const customNextResponse = NextResponse.redirect(
                    new URL("/", request.nextUrl)
                )
                customNextResponse.cookies.delete("directus_session_token")

                return customNextResponse
            }
        } catch (error) {
            console.log(error);
            return NextResponse.redirect(new URL("/auth/signin", request.nextUrl));
        }
    } else {
        return NextResponse.redirect(new URL("/auth/signin", request.nextUrl));
    }

    NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/", "/profile", "/task/:path*"],
};