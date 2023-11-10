"use client";
import { NextPage } from "next";
import Header from "./Header";
import NavMenu from "./NavMenu";
import exp from "constants";
import { ReactNode, useEffect } from "react";

import { useRouter } from "next/router";
const PageLayout: NextPage<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();

  // "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fsettings"

  /** from-sky-800 to-fuchsia-300 */
  return (
    <div className=" min-h-screen w-full bg-gradient-to-b from-slate-600 to-sky-900">
      <Header />
      <NavMenu />
      <div className="p-4 sm:ml-48">
        <div className="mt-14 rounded-tl-lg border-l border-t border-dashed border-gray-200 p-4 dark:border-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
};
export default PageLayout;
