/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as albums from "../albums.js";
import type * as artists from "../artists.js";
import type * as auth from "../auth.js";
import type * as favorites from "../favorites.js";
import type * as http from "../http.js";
import type * as songs from "../songs.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  albums: typeof albums;
  artists: typeof artists;
  auth: typeof auth;
  favorites: typeof favorites;
  http: typeof http;
  songs: typeof songs;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
