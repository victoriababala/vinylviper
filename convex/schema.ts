import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
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
  users: defineTable({
    username: v.string(),
    email: v.string(),
    password_hash: v.string(),
  }),
  favoriteSongs: defineTable({
    user_id: v.id("users"),
    song_id: v.id("songs"),
  }),
  favoriteAlbums: defineTable({
    user_id: v.id("users"),
    album_id: v.id("albums"),
  }),
});
