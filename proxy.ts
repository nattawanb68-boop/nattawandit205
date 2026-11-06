import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const user = await verifyToken(request.cookies.get("token")?.value);
  if (!user) return NextResponse.redirect(new URL("/login", request.url));
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};