import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * next-intl's own "as-needed" redirect (stripping a redundant /es prefix)
 * uses a 307. Para SEO necesitamos que ese colapso sea permanente (301), así
 * que lo interceptamos antes de delegarle el resto al middleware de next-intl.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `/${routing.defaultLocale}` || pathname.startsWith(`/${routing.defaultLocale}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${routing.defaultLocale}`.length) || "/";
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(es|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
