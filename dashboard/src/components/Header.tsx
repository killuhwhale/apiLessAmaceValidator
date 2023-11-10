"use client";

import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

const Header: React.FC = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/" className="ml-2 flex md:mr-24">
              <img
                src="images/alien_head.png"
                className="mr-3  h-12 rounded-md"
                alt="App Logo"
              />
              <span className="ml-3 self-center whitespace-nowrap text-xl font-semibold text-stone-50 sm:text-2xl">
                App Val
              </span>
            </Link>
          </div>
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Header;
