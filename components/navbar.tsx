import { cn } from "@/lib/utils";
import { Authenticated, Unauthenticated } from "convex/react";
import { useRouter } from "next/navigation";
import { SignOut } from "./SignOut";

interface NavBarProps {
  activePage: number;
}

enum ActivePage {
  Main = 0,
  Artists,
  Albums,
}
export const NavBar = ({ activePage }: NavBarProps) => {
    const redirect = useRouter();
    const handleRedirect = (page: string) => {
      redirect.push(`/${page}`);
    };
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
      <Unauthenticated>
        <div className="flex gap-4">
          <button onClick={()=> handleRedirect('signIn') } className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black">
            Sign in
          </button>
          <button className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black">
            Sign Up
          </button>
        </div>
      </Unauthenticated>
      <Authenticated>
        <div className="flex gap-4">
          <button className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black" onClick={()=> handleRedirect('profile') }>
            Profile
          </button>
          {/* <button className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black">
            Sign Out
          </button> */}
          <SignOut />
        </div>
      </Authenticated>
    </nav>
  );
};
