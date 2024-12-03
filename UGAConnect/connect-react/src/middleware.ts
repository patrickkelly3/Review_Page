import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function middleware(request: any) {
    const session = await auth();
    const isAuthenticated = !!session?.user;

    const reqURL = new URL(request.url); // Parse the request URL
    console.log("Middleware executed for:", reqURL.pathname, "Authenticated:", isAuthenticated);

    // Allow authenticated users to access `/profileComponent` and `/addItemComponent`
    if (isAuthenticated) {
        console.log("Authenticated user accessing:", reqURL.pathname);
        return NextResponse.next();
    }

    // Redirect unauthenticated users to login
    if (!isAuthenticated && reqURL.pathname === "/profileComponent") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/addItemComponent", "/profileComponent"],
};
