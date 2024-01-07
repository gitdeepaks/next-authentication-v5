/**
 *These are array of routes donot require authentication
//  *@type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verfication"];

/**
 *These are array of routes  are used for authentication
 these routes will redirect to logged in users to /settings
//  *@type {string[]}
 */

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
];

/**
 *The prefix for API authentication routes
 ROutes that
 
//  *@type {string}
 */

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
