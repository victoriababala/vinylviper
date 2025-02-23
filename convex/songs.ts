import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("songs").collect();
  },
});

// export const getSongsByAlbumAndArtist = query({
//     args: {
//         album_id: v.id("albums"),
//         artist_id: v.id("artists"),
//     },
//     handler: async (ctx, { album_id, artist_id }) => {
//         return await ctx.db
//         .query("songs")
//         .filter({ album_id, artist_id })
//         .collect();
//     },
//     });

export const getSongsByAlbum= query({
    args: {
        album_id: v.id("albums"),
    },
    handler: async ({ db }, { album_id }) => {
      const comments = await db
        .query("songs")
        .filter((q) => q.eq(q.field("album_id"), album_id))
        .order("asc",)
        .collect();
      return comments;
    },
  });