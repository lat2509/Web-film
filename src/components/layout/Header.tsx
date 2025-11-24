import { Plus, Search, X } from "lucide-react";
import { IoSearchSharp } from "react-icons/io5";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import HoverDropdown from "../common/HoverDropdown";
import { useState, useEffect } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

const Header = () => {
  const [delele, setDelete] = useState(false);
  const [textInput, setTextInput] = useState("");
  const router = useRouterState();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isHomePage = router.location.pathname === '/';
  useEffect(() => {
    setIsSearchOpen(false);
    setTextInput("");
    setDelete(false);
  }, [router.location.pathname]);
  const showSearchBar = isHomePage || isSearchOpen;
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate({ to: path });
  }
  return (
    <>
      <div className="flex h-16 w-full justify-center bg-[#032541]">
        <div className="flex min-w-4/6 flex-row justify-between px-10">
          <div className="flex flex-row items-center">
            <Link to="/">
              <img src="/images/movie_logo2.png" alt="movie" className="mr-4 h-8" />
            </Link>
            <ul className="flex flex-row gap-2 py-2 text-[14px] font-bold text-white">
              <li className="mr-4 hover:cursor-pointer">
                <HoverDropdown label="Movies">
                  <DropdownMenu.DropdownMenuItem
                    onSelect={() => {
                      handleNavigate('/movie/popular')
                    }}
                    className="mt-1.5 py-2 pr-12 pl-4 outline-none hover:bg-gray-200"
                  >
                    Popular
                  </DropdownMenu.DropdownMenuItem>
                  <DropdownMenu.DropdownMenuItem
                    onSelect={() => {
                      handleNavigate('/movie/now-playing')
                    }}
                    className="py-2 pr-12 pl-4 outline-none hover:bg-gray-200">
                    Now Playing
                  </DropdownMenu.DropdownMenuItem>
                  <DropdownMenu.DropdownMenuItem
                    onSelect={() => {
                      handleNavigate('/movie/upcoming')
                    }}
                    className="py-2 pr-12 pl-4 outline-none hover:bg-gray-200">
                    Upcoming
                  </DropdownMenu.DropdownMenuItem>
                  <DropdownMenu.DropdownMenuItem
                    onSelect={() => {
                      handleNavigate('/movie/top-rated')
                    }}
                    className="mb-1.5 py-2 pr-12 pl-4 outline-none hover:bg-gray-200">
                    Top Rated
                  </DropdownMenu.DropdownMenuItem>
                </HoverDropdown>
              </li>
              <li className="mr-4 hover:cursor-pointer">
                <HoverDropdown label="TV Shows">
                  <DropdownMenu.DropdownMenuItem
                    onSelect={() => {
                      handleNavigate('/tv/popular');
                    }}
                    className="mt-1.5 py-2 pr-12 pl-4 outline-none hover:bg-gray-200">
                    Popular
                  </DropdownMenu.DropdownMenuItem>
                  <DropdownMenu.DropdownMenuItem
                    onSelect={() => {
                      handleNavigate('/tv/airing-today');
                    }}
                    className="py-2 pr-12 pl-4 outline-none hover:bg-gray-200">
                    Airing Today
                  </DropdownMenu.DropdownMenuItem>
                  <DropdownMenu.DropdownMenuItem
                    onSelect={() => {
                      handleNavigate('/tv/on-the-air');
                    }}
                    className="py-2 pr-12 pl-4 outline-none hover:bg-gray-200">
                    On TV
                  </DropdownMenu.DropdownMenuItem>
                  <DropdownMenu.DropdownMenuItem onSelect={() => {
                    handleNavigate('/tv/top-rated');
                  }}
                    className="mb-1.5 py-2 pr-12 pl-4 outline-none hover:bg-gray-200">
                    Top Rated
                  </DropdownMenu.DropdownMenuItem>
                </HoverDropdown>
              </li>
            </ul>
          </div>
          <div className="flex">
            <ul className="flex flex-row items-center gap-2 py-2 text-[16px] font-bold text-white">
              <li className="ml-4 hover:cursor-pointer">
                <a href="">
                  <Plus />
                </a>
              </li>
              <li className="ml-4 hover:cursor-pointer">đăng nhập</li>
              <li className="ml-4 hover:cursor-pointer">
                {isSearchOpen && !isHomePage ?
                  (<button className="hover:cursor-pointer" onClick={() => { setIsSearchOpen(false) }}><X /></button>)
                  : (<button className="hover:cursor-pointer" onClick={() => { setIsSearchOpen(true) }}><Search /></button>)}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {
        showSearchBar &&
        (<div className={isHomePage ? "sticky top-0 z-10 h-11 w-full bg-white shadow-2xs" : "absolute z-10 h-11 w-full bg-white shadow-2xs"}>
          <div className="h-11 px-10">
            <form className="flex h-11 items-center">
              <label htmlFor="search" className="flex w-full flex-row hover:cursor-text">
                <IoSearchSharp className="mt-1 text-2xl" />
                <input
                  type="text"
                  id="search"
                  value={textInput}
                  onChange={(e) => {
                    setDelete(true);
                    setTextInput(e.target.value);
                  }}
                  placeholder="Search for a movie, tv show,..."
                  className="w-full border-0 p-2 text-gray-400 italic outline-0"
                  autoComplete=""
                />
                {delele && (
                  <button
                    onClick={(e) => {
                      (e.preventDefault(), setTextInput(""), setDelete(false));
                    }}
                    className="hover:cursor-pointer"
                  >
                    <X className="text-gray-500" />
                  </button>
                )}
              </label>
            </form>
          </div>
        </div>)
      }
    </>
  );
};

export default Header;
