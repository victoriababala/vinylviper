import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  artists: defineTable({
    name: v.string(),
    bio: v.string(),
    genre: v.string(),
    image_url: v.string(),
  }),
  albums: defineTable({
    artist_id: v.id("artists"),
    title: v.string(),
    release_date: v.string(),
    cover_url: v.string(),
  }),
  songs: defineTable({
    album_id: v.id("albums"),
    artist_id: v.id("artists"),
    title: v.string(),
    duration: v.number(),
    track_number: v.number(),
  }),
  favoriteSongs: defineTable({
    user_id: v.id("users"),
    song_id: v.id("songs"),
  }).index("by_user_song", ["user_id", "song_id"]),
  favoriteAlbums: defineTable({
    user_id: v.id("users"),
    album_id: v.id("albums"),
  }).index("by_user_album", ["user_id", "album_id"]),
});
