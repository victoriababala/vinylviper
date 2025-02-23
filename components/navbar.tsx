import { cn } from "@/lib/utils";

interface NavBarProps {
  activePage: number;
}

enum ActivePage {
  Main = 0,
  Artists,
  Albums,
}
export const NavBar = ({ activePage }: NavBarProps) => {
  return (
    <nav className="absolute top-0 w-full flex justify-between items-center p-6">
      <div className="flex gap-6 text-lg">
        <a
          href={`/`}
          className={cn(
            "text-white hover:underline ",
            activePage === ActivePage.Main ? "underline" : ""
          )}
        >
          Main
        </a>
        <a
          href={`/artists`}
          className={cn(
            "text-white hover:underline ",
            activePage === ActivePage.Artists ? "underline" : ""
          )}
        >
          Artists
        </a>
        <a
          href={`/albums`}
          className={cn(
            "text-white hover:underline ",
            activePage === ActivePage.Albums ? "underline" : ""
          )}
        >
          Albums
        </a>
      </div>
      <div className="flex gap-4">
        <button className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black">
          Sign in
        </button>
        <button className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black">
          Sign Up
        </button>
      </div>
    </nav>
  );
};
