import { Authenticated, Unauthenticated } from "convex/react";
import Favorite from "./favorite";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoritePlaceholderProps {
  id: string; // Song or Album ID
  itemType: "album" | "song";
}

const FavoritePlaceholder = ({ id, itemType }: FavoritePlaceholderProps) => {
  return (
    <>
      <Authenticated>
        <Favorite id={id} itemType={itemType} />
      </Authenticated>
      <Unauthenticated>
        <div className="cursor-pointer">
          <Heart
            className={cn("h-6 w-6 ml-4 text-gray-400 hover:text-white")}
            onClick={() => redirect("../signIn")}
          />
        </div>
      </Unauthenticated>
    </>
  );
};

export default FavoritePlaceholder;