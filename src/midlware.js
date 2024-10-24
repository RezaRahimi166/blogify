import { NextResponse } from "next/server";
import { middlewareAuth } from "./utils/middlewareAuth";

export async function middleware(req) {
  // const url = req.url;
  const { pathname } = req.nextURL;

  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    const user = await middlewareAuth(req);
    if (user) {
      return NextResponse.redirect(new URL(`/`, req.nextURL));
    }
  }
  if (pathname.startsWith("/profile")) {
    // set cookie => refresh , acces =>
    //get user => user ... or !user redirect to sign in
    const user = await middlewareAuth(req);
    if (!user) {
      return NextResponse.redirect(new URL(`/signin`, req.nextURL));
    }
  }
}

export const config = {
  matcher: ["/profile/:path*", "/signin", "/signup"],
};
