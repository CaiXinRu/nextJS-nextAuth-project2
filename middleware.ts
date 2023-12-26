// 使用 withAuth 來進行權限驗證。通過 callbacks.authorized 檢查 token 的有效性，
// 以控制對特定路由的訪問權限並決定是否執行 middleware function。
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // console.log(req.nextauth.token)
    // console.log(req.nextUrl)
    const { token } = req.nextauth;
    const { pathname, origin } = req.nextUrl;

    if (pathname.startsWith("/dashboard") && token?.role !== "admin") {
      return NextResponse.redirect(`${origin}/unauthorized`);
    }
  },
  {
    callbacks: {
      // If `authorized` returns `true`, the middleware function will execute.
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/profile", "/dashboard/:path*"] };
