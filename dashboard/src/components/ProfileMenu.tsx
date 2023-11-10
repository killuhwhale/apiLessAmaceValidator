import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ProfileMenu: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(false);
  const iconRef = useRef<HTMLImageElement>(null);
  const { data: sessionData } = useSession();

  useEffect(() => {
    if (ref.current) return;
    console.log("INit", ref.current);
    window.document.addEventListener("click", (ev) => {
      if (!showDropdown && ev.target !== iconRef.current) {
        setShowDropdown(false);
      }
    });
    ref.current = true;
  }, [ref.current]);

  return (
    <div className="z-50 flex  items-center">
      <div className="ml-3 flex flex-col items-end">
        <div>
          <button
            type="button"
            id="profileBtn"
            className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="dropdown-user"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <span className="sr-only">Open user menu</span>
            <img
              ref={iconRef}
              className="h-10 w-10 rounded-full"
              src={
                sessionData && sessionData.user && sessionData.user.image
                  ? sessionData.user.image
                  : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              }
              alt="user photo"
            />
          </button>
        </div>
        <div
          className={`my-10  ${
            showDropdown ? "" : "hidden"
          } absolute list-none divide-y divide-gray-100 rounded bg-slate-900 text-base  shadow `}
          id="dropdown-user"
        >
          <div className="px-4 py-3" role="none">
            <p className="text-sm text-white " role="none">
              No GCP API Version
            </p>
          </div>
          <ul className="py-1" role="none">
            <li>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
                role="menuitem"
              >
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
