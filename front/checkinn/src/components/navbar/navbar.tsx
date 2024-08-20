"use client";
import Link from "next/link";

export const NavBar: React.FC = () => {
  //________________________________________________________________________

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-darkMode-grey3 shadow-md">
      <nav className="pt-2">
        <div className="flex justify-between items-center p-3 mx-large">
          <div>
            <Link href="/">
              <p className="font-plus-jakarta-sans text-3xl font-extrabold text-wine ">
                CheckINN
              </p>
            </Link>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>
                <Link href="/1">page1</Link>
              </li>
              <li>
                <Link href="/2">page2</Link>
              </li>
              <li>
                <Link href="/3">page3</Link>
              </li>
              <li>
                <Link href="/4">page4</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
