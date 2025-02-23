"use client";
import { api } from "@/convex/_generated/api";
import { cn, formatDuration, headFont } from "@/lib/utils";
import { useQuery } from "convex/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loading } from "@/components/loading";
import NavigationArrows from "@/components/navigationArrows";
import { NavBar } from "@/components/navbar";
import Favorite from "@/components/favorite";
import FavoritePlaceholder from "@/components/favoritePlaceholder";

export default function Albums() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Fetch albums from Convex
  const queryResult = useQuery(api.albums.getAlbumsWithSongs);
  const albumsData = useMemo(() => queryResult || [], [queryResult]);
  // Preload images for smoother transitions
  useEffect(() => {
    albumsData.forEach((album) => {
      const img = new Image();
      img.src = album.cover_url;
    });
  }, [albumsData]);

  // Navigation functions
  const nextAlbum = () => {
    setCurrentIndex((prev) => (prev + 1) % albumsData.length);
  };

  const prevAlbum = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + albumsData.length) % albumsData.length
    );
  };

  // Handle loading state
  if (!albumsData.length) {
    return <Loading />;
  }

  // Current album data
  const currentAlbum = albumsData[currentIndex];
  return (
    <main>
      <NavBar activePage={2} />
      <div className="flex flex-row items-center justify-center mt-20">
        {/* Album Display */}
        <div className="flex flex-col items-center justify-center mx-auto">
          <div className="flex items-center justify-center mt-18 relative w-full max-w-5xl">
            {/* Previous Album (blurred side image) */}
            <motion.div
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 overflow-hidden rounded-lg hidden md:block"
            >
              <img
                src={
                  albumsData[
                    (currentIndex - 1 + albumsData.length) % albumsData.length
                  ]?.cover_url
                }
                alt="Previous Album"
                className="w-full h-full object-cover blur-sm"
              />
            </motion.div>

            {/* Main Album Image with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative w-96 h-96 rounded-lg overflow-hidden shadow-2xl mx-6"
              >
                <img
                  src={currentAlbum.cover_url}
                  alt="Album cover"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next Album (blurred side image) */}
            <motion.div
              initial={{ opacity: 0.5, scale: 0.9 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 overflow-hidden rounded-lg hidden md:block"
            >
              <img
                src={
                  albumsData[(currentIndex + 1) % albumsData.length]?.cover_url
                }
                alt="Next Album"
                className="w-full h-full object-cover blur-sm"
              />
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <NavigationArrows prevAlbum={prevAlbum} nextAlbum={nextAlbum} />
        </div>
        {/* Album Details */}
        <div className="bg-zinc-950/20 p-6 mt-1 rounded-lg shadow-lg text-left w-fit min-w-96 ml-auto">
          <h2
            className={cn("text-4xl font-bold text-white", headFont.className)}
          >
            <Link
              href={`/album/${albumsData[currentIndex]._id}`}
              className="hover:text-gray-400 transition-colors duration-300"
            >
              {albumsData[currentIndex].title}
            </Link>
          </h2>
          <p
            className={cn("text-2xl font-bold text-white", headFont.className)}
          >
            <Link
              href={`/artist/${albumsData[currentIndex].artist_id}`}
              className="hover:text-gray-400 transition-colors duration-300"
            >
              {albumsData[currentIndex].artist_name || "Unknown Artist"}
            </Link>
          </p>
          <ul className="mt-4">
            {albumsData[currentIndex].songs.map((track, index) => (
              <li
                key={index}
                className="flex justify-between text-md text-white p-1"
              >
                <span className="flex-grow mr-2 truncate">
                  {track.track_number + "."} {track.title}
                </span>

                <span className="ml-4">{formatDuration(track.duration)}</span>
                <FavoritePlaceholder id={track.id} itemType="song" />
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
          <FavoritePlaceholder id={currentAlbum._id} itemType="album" />
            <span className="font-bold text-lg text-white">
              {currentAlbum.release_date}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
