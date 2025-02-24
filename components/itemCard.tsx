"use client";
import React from "react";
import { motion } from "framer-motion";

interface ItemCardProps {
  item: {
    _id: string;
    title: string;
    artist_name: string;
    cover_url: string;
    album_title?: string; // Only for songs
    type: "album" | "song";
  };
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <motion.div
      key={item._id}
      className="bg-zinc-950/30 p-3 rounded-lg shadow-lg hover:scale-105 transition-transform flex flex-col items-center text-center"
      whileHover={{ scale: 1.05 }}
    >
      <a href={item.type === "song" ? `#` : `../${item.type}/${item._id}`}>
        <div className="w-full aspect-square overflow-hidden rounded-lg">
          <img
            src={item.cover_url}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="mt-3 text-lg font-bold">{item.title}</h3>
        <p className="text-sm text-gray-200">{item.artist_name}</p>
        {item.type === "song" && (
          <p className="text-xs text-gray-200">{item.album_title}</p>
        )}
      </a>
    </motion.div>
  );
};
