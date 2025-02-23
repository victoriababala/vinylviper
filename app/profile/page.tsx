"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Id } from "@/convex/_generated/dataModel";
import { NavBar } from "@/components/navbar";

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
    <NavBar  activePage={2} />
      <div className=" mx-auto p-6  min-h-screen text-white">
        <h1 className="text-3xl font-bold text-center mb-6">Your Profile</h1>

        {/* Favorite Songs Carousel */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4 opacity-80">
            Favorited Songs
          </h2>
          {favorites.favoriteSongs.length === 0 ? (
            <p className="text-gray-400 opacity-80">No favorite songs yet.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={15}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="p-2"
            >
              {favorites.favoriteSongs.map((song) => (
                <SwiperSlide
                  key={song.id}
                  className="bg-gray-900/20 shadow-lg rounded-lg p-4 backdrop-blur-md"
                >
                  {song.albumCover && (
                    <Image
                      src={song.albumCover}
                      alt={song.title}
                      width={300}
                      height={300}
                      className="rounded-lg object-cover mx-auto"
                    />
                  )}
                  <div className="text-center mt-2">
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-gray-400">{song.artistName}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Favorite Albums Carousel */}
        <div>
          <h2 className="text-xl font-semibold mb-4 opacity-80">
            Favorited Albums
          </h2>
          {favorites.favoriteAlbums.length === 0 ? (
            <p className="text-gray-400 opacity-80">No favorite albums yet.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={15}
              slidesPerView={2}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="p-2"
            >
              {favorites.favoriteAlbums.map((album) => (
                <SwiperSlide
                  key={album.id}
                  className="bg-gray-900/20 shadow-lg rounded-lg p-4 backdrop-blur-md"
                >
                  {album.coverUrl && (
                    <Image
                      src={album.coverUrl}
                      alt={album.title}
                      width={150}
                      height={150}
                      className="rounded-lg object-cover mx-auto"
                    />
                  )}
                  <div className="text-center mt-2">
                    <p className="font-medium">{album.title}</p>
                    <p className="text-sm text-gray-400">{album.artistName}</p>
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

export default ProfilePage;
