"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';

export const NavBar: React.FC = () => {
  const pathname = usePathname();
  const { user, error, isLoading } = useUser();
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
          <div className="flex space-x-4 ml-auto">
            {user ? (
              <div className="flex items-center space-x-4">
                <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                <p className="text-lavenderBlush">{user.name}</p>
                <Link href="/api/auth/logout">
                  <button className="bg-red-600 text-lavenderBlush hover:bg-red-400 focus:outline-none px-4 py-2 rounded">
                    Logout
                  </button>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/api/auth/login">
                  <button className="bg-green-600 text-lavenderBlush hover:bg-green-400 focus:outline-none px-4 py-2 rounded">
                    Login
                  </button>
                </Link>
                <Link href="/api/auth/register">
                  <button className="bg-blue-900 text-lavenderBlush hover:bg-blue-700 focus:outline-none px-4 py-2 rounded">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
