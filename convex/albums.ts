import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("albums").collect();
  },
});

export const getAlbums = query({
  args: {},
  handler: async (ctx) => {
    const albums = await ctx.db
      .query("albums")
      .order("desc")
      .collect();

    // Fetch artist names based on artist_id
    const artists = await ctx.db
      .query("artists")
      .collect();
    // Merge artist details into albums
    return albums.map((album) => ({
      ...album,
      artist_name: artists.find((artist) => artist._id === album.artist_id)?.name || "Unknown Artist",
    }));
  },
});

export const getAlbumsWithSongs = query({
  args: {},
  handler: async (ctx) => {
    // Fetch albums
    const albums = await ctx.db
      .query("albums")
      .order("desc")
      .collect();

    // Fetch all artists and songs
    const artists = await ctx.db.query("artists").collect();
    const songs = await ctx.db.query("songs").collect();
    // Merge artist names and songs into albums
    return albums.map((album) => ({
      ...album,
      artist_name: artists.find((artist) => artist._id === album.artist_id)?.name || "Unknown Artist",
      songs: songs
        .filter((song) => song.album_id === album._id)
        .map((song) => ({
          id: song._id,
          title: song.title,
          duration: song.duration,
          track_number: song.track_number,
        })),
    }));
  },
});

export const getAlbumByArtist = query({
  args: {
    artist_id: v.string(),
  },
  handler: async (ctx, { artist_id }) => {
    return await ctx.db
      .query("albums")
      .filter((q) => q.eq(q.field("artist_id"), artist_id))
      .collect();
  },
});

export const getAlbumByID = query({
  args: { id: v.id("albums") },
  handler: async (ctx, args) => {
    const album = await ctx.db.get(args.id);
    if (!album) {
      return null;
    }

    const artist = await ctx.db.get(album.artist_id);
    return {
      ...album,
      artist_name: artist?.name || "Unknown Artist",
      artist_id: artist?._id || null,
    };
  },
});