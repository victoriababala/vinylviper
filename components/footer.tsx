import { cn, headFont } from "@/lib/utils";
import Image from "next/image";
export const Footer = () => {
  return (
    <footer className="w-full mt-20 text-center py-6 bg-opacity-50">
      <div className="text-3xl font-bold flex justify-center items-center gap-4">
        <span className={cn("pl-24 text-white text-6xl", headFont.className)}>
          Vinyl
        </span>
        <div className="w-12 h-12 rounded-full">
          <Image
            src="/main_logo.svg"
            alt="Vinyl Logo"
            width={300}
            height={300}
          />
        </div>
        <span className={cn("pr-24 text-white text-6xl", headFont.className)}>
          Viper
        </span>
      </div>

      <div className="mt-4">
        <p className="text-white font-semibold">PHONE</p>
        <p className="text-white">(123) 456-7890</p>

        <p className="text-white mt-2 font-semibold">EMAIL</p>
        <p className="text-white">VINYLVIPER@GMAIL.COM</p>
      </div>

      <p className="text-white mt-6 text-sm">&copy; 2025 Vinyl Viper</p>
    </footer>
  );
};
