import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const isAuthPage: boolean = ((url.pathname === '/sign-in') || (url.pathname === '/sign-up'));
  const hasSession: boolean = request.cookies.has('appwrite-session');

  if(isAuthPage && !hasSession) {
    return NextResponse.next();
  }

  if(hasSession && isAuthPage) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}