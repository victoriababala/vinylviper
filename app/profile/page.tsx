"use client";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Id } from "@/convex/_generated/dataModel";
import { NavBar } from "@/components/navbar";
import { ItemCard } from "@/components/itemCard";
import { cn, headFont } from "@/lib/utils";
import { useRouter } from "next/navigation";
import FavoritePlaceholder from "@/components/favoritePlaceholder";

const ProfilePage = () => {
  const user = useQuery(api.favorites.getUser)?.user_id;
  const favorites = useQuery(api.favorites.getUserFavorites, {
    user_id: user as Id<"users">,
  });

  if (!favorites) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
      </div>
    );
  }

  return (
    <>
      <div className=" mx-auto p-6  min-h-screen text-white mt-8">
        <h1
          className={cn(
            "text-4xl font-bold text-center mb-6",
            headFont.className
          )}
        >
          Your Profile
        </h1>

        {/* Favorite Songs Carousel */}
        <div className="mb-12">
          <h2 className={cn("text-3xl font-semibold mb-4", headFont.className)}>
            Favorited Songs
          </h2>
          {favorites.favoriteSongs.length === 0 ? (
            <p className="text-gray-200 opacity-80">No favorite songs yet.</p>
          ) : (
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true, type: "fraction" }}
              modules={[EffectCoverflow, Pagination]}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="p-2 mySwiper"
            >
              {favorites.favoriteSongs.map((song) => (
                <SwiperSlide
                  key={song.id}
                  className=" p-4 backdrop-blur-md mb-12"
                >
                  <div className="relative w-full h-full flex flex-col items-center">
                    <ItemCard
                      key={song.id}
                      item={{
                        ...song,
                        artist_name: song.artistName,
                        cover_url: song.albumCover,
                        album_title: song.albumTitle,
                        _id: song.id,
                        type: "song",
                      }}
                    />
                    {/* Favorite Heart Icon Positioned in the Top-Right */}
                    <div className="absolute top-2 right-2">
                      <FavoritePlaceholder id={song.id} itemType="song" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Favorite Albums Carousel */}
        <div>
          <h2
            className={cn("text-3xl font-semibold mb-4 ", headFont.className)}
          >
            Favorited Albums
          </h2>
          {favorites.favoriteAlbums.length === 0 ? (
            <p className="text-gray-200 opacity-80">No favorite albums yet.</p>
          ) : (
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true, type: "fraction" }}
              modules={[EffectCoverflow, Pagination]}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="p-4 mySwiper"
            >
              {favorites.favoriteAlbums.map((album) => (
                <SwiperSlide
                  key={album.id}
                  className="relative p-4 backdrop-blur-md mb-8"
                >
                  {/* Album Card */}
                  <div className="relative w-full h-full flex flex-col items-center">
                    <ItemCard
                      key={album.id}
                      item={{
                        ...album,
                        artist_name: album.artistName,
                        cover_url: album.coverUrl,
                        _id: album.id,
                        type: "album",
                      }}
                    />
                    {/* Favorite Heart Icon Positioned in the Top-Right */}
                    <div className="absolute top-2 right-2">
                      <FavoritePlaceholder id={album.id} itemType="album" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
};

const Page = () => {
  const redirect = useRouter();
  const handleRedirect = (page: string) => {
    redirect.push(`/${page}`);
  };
  return (
    <>
      <NavBar activePage={2} />
      <Authenticated>
        <ProfilePage />
      </Authenticated>
      <Unauthenticated>
        <div className="flex items-center justify-center h-screen  text-white">
          <div className="text-center">
            <h1 className={cn("text-4xl font-bold mb-6", headFont.className)}>
              Profile Page
            </h1>
            <p className="text-white  mb-4">
              This is a profile page. You can only see this page if you are
              authenticated.
            </p>
            <button
              className="btn bg-zinc-600 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleRedirect("signIn")}
            >
              Login
            </button>
          </div>
        </div>
      </Unauthenticated>
    </>
  );
};

export default Page;
