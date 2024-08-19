// pages/_middleware.js
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const url = req.nextUrl.clone();
    url.pathname = `/auth/login`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/poliza"],
};
