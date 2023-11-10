import Link from "next/link";
import { useEffect, useState } from "react";
import {
  MdCenterFocusWeak,
  MdDashboardCustomize,
  MdLaptopChromebook,
  MdPhoneAndroid,
  MdSettings,
} from "react-icons/md";

const currentPageColor = "bg-emerald-900";

const NavMenu: React.FC = () => {
  const [currentLoc, setCurrentLoc] = useState("");
  useEffect(() => {
    if (window.location.href !== currentLoc) {
      setCurrentLoc(window.location.href);
      console.log("New location: ", window.location.href);
    }
  });

  return (
    <aside
      id="logo-sidebar"
      className="fixed left-0 top-0 z-40 h-screen w-52 -translate-x-full  bg-transparent pt-20 transition-transform sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-transparent px-3 pb-4">
        <ul className="space-y-2 font-medium text-slate-100">
          <li>
            <Link
              href="/"
              className="flex items-center rounded-lg p-2  hover:bg-blue-500 "
            >
              <MdDashboardCustomize />
              <span className="ml-3 flex-1 whitespace-nowrap">Home</span>
            </Link>
          </li>

          <li>
            <Link
              href="/manageRuns"
              className={`${
                currentLoc.endsWith("/manageRuns") ? currentPageColor : ""
              } flex items-center rounded-lg p-2  hover:bg-blue-500 `}
            >
              <MdCenterFocusWeak />
              <span className="ml-3 flex-1 whitespace-nowrap">Manage</span>
              <span className="ml-3 inline-flex items-center justify-center rounded-full bg-gray-200 px-2 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                Mobile
              </span>
            </Link>
          </li>

          <li>
            <Link
              href="/settings"
              className={`${
                currentLoc.endsWith("/settings") ? currentPageColor : ""
              } flex items-center rounded-lg p-2  hover:bg-blue-500 `}
            >
              <MdSettings />
              <span className="ml-3 flex-1 whitespace-nowrap">Settings</span>
              {/* <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  3
                </span> */}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default NavMenu;
