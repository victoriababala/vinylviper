"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

interface FavoriteProps {
  id: string; // Song or Album ID
  itemType: "album" | "song";
}

const Favorite = ({ id, itemType }: FavoriteProps) => {
  // Fetch user's favorite songs/albums
  const userId = useQuery(api.favorites.getUser)?.user_id;
//   if (!userId) return <></>;
  const favoriteSongs = useQuery(api.favorites.getFavoriteSongs, { user_id: userId as Id<"users"> });
  const favoriteAlbums = useQuery(api.favorites.getFavoriteAlbums, { user_id: userId as Id<"users"> });

  // Check if the current item is favorited
  const isFavorite =
    itemType === "song"
      ? favoriteSongs?.some((fav) => fav.song_id === id)
      : favoriteAlbums?.some((fav) => fav.album_id === id);

  // Use correct mutation dynamically
  const favoriteMutation = useMutation(
    itemType === "song" ? api.favorites.favoriteSong : api.favorites.favoriteAlbum
  );

  const unfavoriteMutation = useMutation(
    itemType === "song" ? api.favorites.unfavoriteSong : api.favorites.unfavoriteAlbum
  );

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await unfavoriteMutation({ id });
        toast.success(`${itemType === "song" ? "Song" : "Album"} removed from favorites.`);
      } else {
        await favoriteMutation({ id });
        toast.success(`${itemType === "song" ? "Song" : "Album"} added to favorites.`);
      }
    } catch (error) {
      toast.error("Failed to update favorite status." + error);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className="cursor-pointer transition-opacity hover:opacity-80"
    >
      <Heart
        className={cn(
          "h-6 w-6 ml-4 transition",
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-white"
        )}
      />
    </button>
  );
};

export default Favorite;

