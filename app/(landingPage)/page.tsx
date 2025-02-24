"use client";
import ChatBotDialog from "@/components/chat-bot-dialog";
import { NavBar } from "@/components/navbar";
import { cn, headFont } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";


const LandingPage = () => {
  const redirect = useRouter();
  const handleRedirect = (page: string) => {
    redirect.push(`/${page}`);
  };
  
  return (
    <div className={`bg-gradient-to-l from-stone-900 to-red-800`}>
      <section className="min-h-screen flex flex-col items-center justify-center relative">
        {/* Navbar */}
        <NavBar activePage={0} />

        {/* Logo & Branding */}
        <div className="flex flex-col items-center text-center">
          <div className="mt-40 flex items-center text-6xl font-bold">
            <span
              className={cn(
                " pr-24 text-white text-[140px] ",
                headFont.className
              )}
            >
              Vinyl
            </span>
            <div className="w-48 h-48 rounded-full flex items-center justify-center">
              {/* Placeholder for Logo */}
              <Image
                src="/main_logo.svg"
                alt="Vinyl Logo"
                width={300}
                height={300}
              />
            </div>
            <span
              className={cn(
                "pl-24 text-white text-[140px]",
                headFont.className
              )}
            >
              Viper
            </span>
          </div>

          {/* Slogan */}
          <p className="mt-48 text-xl text-white font-semibold">
            Slither Through Sounds, Bite Into Beats
          </p>

          {/* CTA Button */}
          <button
            onClick={() => handleRedirect("artists")}
            className=" text-white mt-6 px-6 py-3 border border-white rounded-full text-lg hover:bg-white hover:text-black"
          >
            Get Started
          </button>
        </div>
      </section>

      <section>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="bg-zinc-950/20 flex flex-col lg:flex-row items-center rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="mt-4 ml-auto lg:mt-0 lg:w-1/2">
                <h2
                  className={cn(
                    "text-7xl font-bold text-white",
                    headFont.className
                  )}
                >
                  Discover & Explore
                </h2>
                <p className="mt-16 text-3xl text-white">
                  Dive into an ever-growing catalog of artists, bands, and their
                  discographies.
                  <br />
                  <br />
                  Find hidden gems, explore legendary albums, and build your
                  perfect music collection.
                </p>
              </div>

              <Image
                src="/images/guitars.jpg"
                alt="Guitars"
                width={480}
                height={640}
                className="w-1/3 h-3/4 object-cover rounded-lg ml-auto"
              />
            </div>
            <div className="bg-zinc-950/20 flex flex-col lg:flex-row items-center rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
              <Image
                src="/images/concert.jpg"
                alt="Guitars"
                width={480}
                height={640}
                className="w-1/3 h-3/4 object-cover rounded-lg mr-auto"
              />
              <div className="mt-4 ml-auto lg:mt-0 lg:w-1/2">
                <h2
                  className={cn(
                    "text-7xl font-bold text-white",
                    headFont.className
                  )}
                >
                  Save Your Favorites
                </h2>
                <p className="mt-16 text-3xl text-white">
                  Add songs and albums to your personal library.
                  <br />
                  <br />
                  Whether it’s classic or the latest hits, keep your favorites
                  just a click away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ChatBotDialog />
    </div>
  );
};

export default LandingPage;
