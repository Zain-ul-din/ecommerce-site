import { NextResponse } from "next/server";
import getUserAuth from "../Helpers/Auth";
import { cookieName } from "../Helpers/constants";

const userPages = [
  "/user/profile",
  "/user/orders",
  "/user/cart",
  "/user/checkout",
];
const stuffPages = ["/product/upload", "/category/upload", "/admin/orders"];
const adminPages = ["/admin/users", "/admin/products"];
const adminDynamicPages = ["/user/update/", "/product/upload"];

export default function middleware(req) {
  // user pages redirects
  if (userPages.find((p) => p === req.nextUrl.pathname))
    if (getUserAuth(req.cookies[cookieName]) === "unkown")
      return NextResponse.redirect(new URL(`/login`, req.url));

  // stuff admin pages
  if (stuffPages.find((p) => p === req.nextUrl.pathname)) {
    const authUser = getUserAuth(req.cookies[cookieName]);
    if (authUser !== "admin" && authUser !== "stuff")
      return NextResponse.redirect(new URL(`/login`, req.url));
  }

  // admin pages
  if (adminPages.find((p) => p === req.nextUrl.pathname)) {
    const authUser = getUserAuth(req.cookies[cookieName]);
    if (authUser !== "admin")
      return NextResponse.redirect(new URL(`/login`, req.url));
  }

  // matchs dynamic pages
  if (
    adminDynamicPages.find(
      (p) =>
        req.nextUrl.pathname.includes(p) &&
        req.nextUrl.pathname.length > p.length
    )
  ) {
    const authUser = getUserAuth(req.cookies[cookieName]);
    if (authUser !== "admin")
      return NextResponse.redirect(new URL(`/login`, req.url));
  }
}
