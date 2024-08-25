/**
 * an array of routes that are accessible to public
 */
export const publicRoutes = [
    "/"
];

/**
 * an array of routes that are accessible to authenticated users
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
];


/**
 * the prefix for the api authanitcation routes
 * Routes that start with this prefix are considered to be authentication routes
 */
export const apiAuthPrefix = "/api/auth";

/**
 * the default redirect path after login
 * This is where the user is redirected to after login
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";