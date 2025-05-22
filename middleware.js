import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/create",
  "/course(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Exclude Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:css|js|json|jpg|jpeg|png|gif|svg|woff2?|ttf|eot|mp4|webm|wav|mp3|m4a|aac|oga)).*)",
    // Always apply to API routes
    "/api/(.*)",
    "/trpc/(.*)",
  ],
};
