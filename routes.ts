/**
 * An array of routes that are acessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = ["/member"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to "/"
 * @type {string[]}
 */

export const authRoutes: string[] = ["/sign-in"];

/**
 * The prefix for API authentication routes
 * These routes that start with this prefix are used for API 
 authentication purposes
 * @type {string}
 */

export const apiAuthPrefix: string = "/api";

/**
 * The default redirect path after logging
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT: string = "/rugby-payment";

/**
 * The default redirect path after signing out
 * @type {string}
 */

export const DEFAULT_SIGNOUT_REDIRECT: string = "/sign-in";
