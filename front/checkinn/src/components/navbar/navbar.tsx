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

  //________________________________________________________________________

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-purple shadow-md">
      <nav className="pt-2">
        <div className="flex justify-between items-center p-3 pl-10 mx-large">
          <div>
            <Link href="/">
              <p className="font-plus-jakarta-sans text-3xl font-extrabold text-lavenderBlush ">
                CheckINN
              </p>
            </Link>
          </div>
          <div>
            <ul className="flex space-x-6  text-lavenderBlush">
              <li>
                <Link href="/rooms">
                  <span>rooms</span>
                </Link>
              </li>{" "}
              <li>
                <Link href="/reservations">
                  <span>reservations</span>
                </Link>
              </li>{" "}
              <li>
                <Link href="/route3">
                  <span>route3</span>
                </Link>
              </li>
              <li>
                <Link href="/aboutUs">
                  <span>about</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>{/* div para usuario y botones    */}</div>
        </div>
      </nav>
    </div>
  );
};
