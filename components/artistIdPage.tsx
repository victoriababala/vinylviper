"use client";
import React from "react";
import { NavBar } from "@/components/navbar";
import Image from "next/image";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Loading } from "@/components/loading";
import { cn, headFont } from "@/lib/utils";
import { ItemCard } from "@/components/itemCard";
import { Id } from "@/convex/_generated/dataModel";


interface ArtistIdPageProps {
  artistId: string;
}

const ArtistIdPage = ({ artistId }: ArtistIdPageProps) => {
  const albums = useQuery(api.albums.getAlbumByArtist, {
    artist_id: artistId as Id<"artists">,
  });
  const artist = useQuery(api.artists.getArtistByID, {
    id: artistId as Id<"artists">,
  });

  if (!artist || !albums)
    return (
      <div className="text-white text-center mt-20">
        <Loading />
      </div>
    );
  return (
    <main className="min-h-screen text-white mt-16">
      {/* Navigation Bar */}
      <NavBar activePage={2} />

      {/* Artist Section */}
      <div className="container mx-auto px-4 py-10">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={artist.image_url}
            alt={artist.name}
            width={224} // md:w-56 (56 * 4 = 224)
            height={224} // md:h-56 (56 * 4 = 224)
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover shadow-lg"
          />

          {/* Artist Info */}
          <div>
            <h1
              className={cn(
                "text-6xl md:text-5xl font-bold",
                headFont.className
              )}
            >
              {artist.name}
            </h1>
            <p className="text-xl  mt-2">{artist.genre}</p>
            <p className="mt-4 max-w-xl text-lg">{artist.bio}</p>
          </div>
        </motion.div>

        {/* Albums Section */}
        <h2 className="text-3xl font-bold mt-8">Discography</h2>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {albums.length === 0 ? (
            <p className="text-center col-span-full mt-4 text-lg">
              No albums found.
            </p>
          ) : (
            albums.map((album) => (
              <ItemCard
                key={album._id}
                item={{
                  ...album,
                  artist_name: artist.name,
                  type: "album",
                }}
              />
            ))
          )}
        </motion.div>
      </div>
    </main>
  );
};

export default ArtistIdPage;
