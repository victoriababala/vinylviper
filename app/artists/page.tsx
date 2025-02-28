"use client";
import React from "react";
import { api } from "@/convex/_generated/api";
import { cn, headFont } from "@/lib/utils";
import { useQuery } from "convex/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loading } from "@/components/loading";
import NavigationArrows from "@/components/navigationArrows";
import { NavBar } from "@/components/navbar";
import { useRouter } from "next/navigation";
import FavoritePlaceholder from "@/components/favoritePlaceholder";

export default function Albums() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  // Fetch albums from Convex
  const queryResult = useQuery(api.artists.getArtistsWithAlbums);
  const artistsData = useMemo(() => queryResult || [], [queryResult]);
  // Preload images for smoother transitions
  useEffect(() => {
    artistsData.forEach((album) => {
      const img = new Image();
      img.src = album.image_url;
    });
  }, [artistsData]);

  // Navigation functions
  const nextAlbum = () => {
    setCurrentIndex((prev) => (prev + 1) % artistsData.length);
  };

  const prevAlbum = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + artistsData.length) % artistsData.length
    );
  };
  const handleDiscography = (artistId: string) => {
    router.push(`/artist/${artistId}`);
  };
  // Handle loading state
  if (!artistsData.length) {
    return <Loading />;
  }

  // Current album data
  const currentArtist = artistsData[currentIndex];
  return (
    <main>
      <NavBar activePage={1} />
      <div className="flex flex-col md:flex-row items-center justify-center mt-20">
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
                  artistsData[
                    (currentIndex - 1 + artistsData.length) % artistsData.length
                  ]?.image_url
                }
                alt="Previous Artist"
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
                  src={currentArtist.image_url}
                  alt="Artist image"
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
                  artistsData[(currentIndex + 1) % artistsData.length]
                    ?.image_url
                }
                alt="Next Artist"
                className="w-full h-full object-cover blur-sm"
              />
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <NavigationArrows prevAlbum={prevAlbum} nextAlbum={nextAlbum} />
        </div>
        {/* Album Details */}
        <div className="bg-zinc-950/20 p-6 mt-1 md:p-6  md:mt-1  rounded-lg shadow-lg text-left  w-fit min-w-96 ml-auto">
          <h2 className={cn("text-4xl  text-white", headFont.className)}>
            {artistsData[currentIndex].name}
          </h2>
          <p className="text-lg font-semibold  mt-1 flex justify-between md:text-md text-white p-1">
            {artistsData[currentIndex].bio || "No info available"}
          </p>
          <ul className="mt-4">
            {artistsData[currentIndex].albums.map((album, index) => (
              <li
                key={index}
                className="flex justify-between text-md  p-1   text-sm md:text-md text-white "
              >
                <span className="flex-grow mr-2 truncate">
                  <Link
                    href={`/album/${album._id}`}
                    className="hover:text-gray-400 transition-colors duration-300"
                  >
                    {index + 1 + "."} {album.title}
                  </Link>
                </span>
                <FavoritePlaceholder id={album._id} itemType="album" />
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg text-white">Genre:</span>
            <span className="font-bold text-lg text-white">
              {currentArtist.genre}
            </span>
          </div>
          <button
            className="text-white border mt-1 mr-1 border-white px-4 py-2 rounded-full hover:bg-white hover:text-black "
            onClick={() => handleDiscography(currentArtist._id)}
          >
            Discography
          </button>
        </div>
      </div>
    </main>
  );
}
