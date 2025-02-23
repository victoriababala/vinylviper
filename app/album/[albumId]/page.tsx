"use client";
import { NavBar } from "@/components/navbar";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { Loading } from "@/components/loading";
import { cn, formatDuration, headFont } from "@/lib/utils";
import Link from "next/link";
import Favorite from "@/components/favorite";
import FavoritePlaceholder from "@/components/favoritePlaceholder";

interface AlbumIdPageProps {
  params: { albumId: string };
}

const AlbumIdPage = (props: AlbumIdPageProps) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  const params = React.use(props.params);
  const songs = useQuery(api.songs.getSongsByAlbum, {
    album_id: params.albumId,
  });
  const album = useQuery(api.albums.getAlbumByID, { id: params.albumId });

  if (!hydrated || !album || !songs) return <Loading />;

  return (
    <main className="min-h-screen  text-white mt-12">
      <NavBar activePage={2} />
      <div className="container mx-auto px-4 py-10">
        {/* Album Details */}
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-48 h-48 md:w-60 md:h-60 rounded-lg overflow-hidden shadow-lg">
            <img
              src={album.cover_url}
              alt={album.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1
              className={cn(
                "text-4xl md:text-5xl font-bold text-white",
                headFont.className
              )}
            >
              {album.title}
            </h1>

            <p className={cn("text-2xl text-white mt-4 ", headFont.className)}>
              <Link
                href={`/artist/${album.artist_id}`}
                className="hover:text-gray-400 transition-colors duration-300"
              >
                {album.artist_name}{" "}
              </Link>
            </p>

            <p className="text-lg text-white mt-2">
              Released: {album.release_date}
            </p>
          </div>
        </motion.div>

        {/* Songs List */}
        <h2 className={cn("text-4xl font-bold mt-12", headFont.className)}>
          Songs
        </h2>
        <motion.div
          className="mt-6 space-y-3 bg-zinc-950/20 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {songs.map((song) => (
            <motion.div
              key={song._id}
              className="flex justify-between items-center p-3  rounded-lg hover:bg-zinc-800/25 transition"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-white">
                {song.track_number}. {song.title}
              </span>
                <div className="flex items-center space-x-4">
                <span className="text-white">
                  {formatDuration(song.duration)}
                </span>
                <FavoritePlaceholder id={song._id} itemType="song" />
                </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

// Helper function to format duration (e.g., 180 → "3:00")

export default AlbumIdPage;
