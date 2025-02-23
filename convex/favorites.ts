import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Favorite a song
export const favoriteSong = mutation({
  args: { id: v.string() }, // Only song ID needed
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user_id = identity.subject.split("|")[0] as Id<"users">;

    // Check if song is already favorited
    const existingFavorite = await ctx.db
      .query("favoriteSongs")
      .withIndex("by_user_song", (q) =>
        q.eq("user_id", user_id).eq("song_id", id as Id<"songs">)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Song already favorited");
    }

    await ctx.db.insert("favoriteSongs", {
      user_id,
      song_id: id as Id<"songs">,
    });

    return { success: true };
  },
});

export const unfavoriteSong = mutation({
  args: { id: v.string() }, // Only song ID needed
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user_id = identity.subject.split("|")[0] as Id<"users">;

    const existingFavorite = await ctx.db
      .query("favoriteSongs")
      .withIndex("by_user_song", (q) =>
        q.eq("user_id", user_id).eq("song_id", id as Id<"songs">)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Song not found in favorites");
    }

    await ctx.db.delete(existingFavorite._id);

    return { success: true };
  },
});

// Favorite an album
export const favoriteAlbum = mutation({
  args: { id: v.id("albums") }, // Only album ID needed
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user_id = identity.subject.split("|")[0] as Id<"users">;

    const existingFavorite = await ctx.db
      .query("favoriteAlbums")
      .withIndex("by_user_album", (q) =>
        q.eq("user_id", user_id).eq("album_id", id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Album already favorited");
    }

    await ctx.db.insert("favoriteAlbums", {
      user_id,
      album_id: id,
    });

    return { success: true };
  },
});

export const unfavoriteAlbum = mutation({
  args: { id: v.id("albums") }, // Only album ID needed
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user_id = identity.subject.split("|")[0] as Id<"users">;

    const existingFavorite = await ctx.db
      .query("favoriteAlbums")
      .withIndex("by_user_album", (q) =>
        q.eq("user_id", user_id).eq("album_id", id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Album not found in favorites");
    }

    await ctx.db.delete(existingFavorite._id);

    return { success: true };
  },
});

export const getFavoriteSongs = query({
  args: { user_id: v.id("users") },
  handler: async (ctx, { user_id }) => {
    return await ctx.db
      .query("favoriteSongs")
      .filter((q) => q.eq(q.field("user_id"), user_id))
      .collect();
  },
});

export const getFavoriteAlbums = query({
  args: { user_id: v.id("users") },
  handler: async (ctx, { user_id }) => {
    return await ctx.db
      .query("favoriteAlbums")
      .filter((q) => q.eq(q.field("user_id"), user_id))
      .collect();
  },
});

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user_id = identity.subject.split("|")[0];
    return { user_id };
  },
});

export const getUserFavorites = query({
  args: { user_id: v.id("users") },
  handler: async (ctx, { user_id }) => {
    // Fetch favorite songs
    const favoriteSongs = await ctx.db
      .query("favoriteSongs")
      .filter((q) => q.eq(q.field("user_id"), user_id))
      .collect();

    // Fetch song details (title, album_id, artist_id)
    const songs = await Promise.all(
      favoriteSongs.map(async (fav) => {
        const song = await ctx.db.get(fav.song_id);
        if (!song) return null;

        const album = await ctx.db.get(song.album_id);
        const artist = await ctx.db.get(song.artist_id);

        return {
          id: song._id,
          title: song.title,
          artistName: artist?.name ?? "Unknown Artist",
          albumTitle: album?.title ?? "Unknown Album",
          albumCover: album?.cover_url ?? "",
        };
      })
    );

    // Fetch favorite albums
    const favoriteAlbums = await ctx.db
      .query("favoriteAlbums")
      .filter((q) => q.eq(q.field("user_id"), user_id))
      .collect();

    // Fetch album details
    const albums = await Promise.all(
      favoriteAlbums.map(async (fav) => {
        const album = await ctx.db.get(fav.album_id);
        if (!album) return null;

        const artist = await ctx.db.get(album.artist_id);

        return {
          id: album._id,
          title: album.title,
          coverUrl: album.cover_url,
          artistName: artist?.name ?? "Unknown Artist",
        };
      })
    );

    return {
      favoriteSongs: songs.filter((s) => s !== null),
      favoriteAlbums: albums.filter((a) => a !== null),
    };
  },
});
