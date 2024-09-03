import Link from 'next/link';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="text-lavenderBlush text-3xl cursor-pointer">
      <FaUserCircle className="text-lavenderBlush text-3xl cursor-pointer" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <ul className="py-1">
            <li>
                <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <button>
                    Profile
                  </button>
                </Link>
            </li>
            <li>
                <Link href="/reservations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <button>
                    Reservations
                  </button>
                </Link>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Log out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
