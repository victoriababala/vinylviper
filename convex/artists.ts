import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("artists").collect();
  },
});

export const getArtistsWithAlbums = query({
  args: {},
  handler: async (ctx) => {
    const artists = await ctx.db.query("artists").collect();
    const albums = await ctx.db.query("albums").collect();
    return artists.map((artist) => ({
      ...artist,
      albums: albums.filter((album) => album.artist_id === artist._id),
    }));
  },
});

export const getArtistByID = query({
  args: { id: v.id("artists") },
  handler: async (ctx, args) => {
    const board = await ctx.db.get(args.id);
    return board;
  },
})