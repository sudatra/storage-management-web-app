import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if(request.cookies.has('appwrite-session') && (url.pathname === '/sign-in' || url.pathname === '/sign-up')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}