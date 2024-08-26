"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userToken = localStorage.getItem("loginToken");
      setToken(JSON.parse(userToken!));
    }
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gray-900 shadow-md">
      <nav className="pt-2">
        <div className="flex justify-between items-center p-3 pl-10 mx-large">
          <div>
            <Link href="/">
              <p className="font-plus-jakarta-sans text-3xl font-extrabold text-lavenderBlush">
                CheckINN
              </p>
            </Link>
          </div>
          <div className="flex space-x-6">
            <ul className="flex space-x-6 text-lavenderBlush">
              <li>
                <Link href="/rooms">
                  <button className="bg-blue-800 text-lavenderBlush hover:bg-blue-600 focus:outline-none px-4 py-2 rounded">
                    rooms
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/reservations">
                  <button className="bg-blue-800 text-lavenderBlush hover:bg-blue-600 focus:outline-none px-4 py-2 rounded">
                    reservations
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <button className="bg-blue-800 text-lavenderBlush hover:bg-blue-600 focus:outline-none px-4 py-2 rounded">
                    Home
                  </button>
                </Link>
              </li>
              <li>
                <Link href="/aboutUs">
                  <button className="bg-blue-800 text-lavenderBlush hover:bg-blue-600 focus:outline-none px-4 py-2 rounded">
                    about
                  </button>
                </Link>
              </li>
            </ul>
          
          </div>
          <div>
          <div className="flex space-x-4 ml-auto">
              <Link href="/login">
                <button className="bg-green-600 text-lavenderBlush hover:bg-green-400 focus:outline-none px-4 py-2 rounded">
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="bg-blue-900 text-lavenderBlush hover:bg-blue-700 focus:outline-none px-4 py-2 rounded">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
