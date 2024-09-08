import Link from "next/link";
import React, { useState } from "react";
import { FaCalendarAlt, FaSignOutAlt, FaUser, FaUserCircle } from "react-icons/fa";
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  const handleSignOut = async () => {
    // Eliminar cookies o datos del localStorage
    localStorage.removeItem('loginToken'); // Reemplaza 'nombreDeLaCookie' por el nombre de la cookie que deseas eliminar
    localStorage.removeItem('room'); // Puedes eliminar más cookies si es necesario
    localStorage.removeItem('userDataLogin'); 
    localStorage.removeItem('nextauth.message')
    localStorage.removeItem('uidFirebaseGoogleLogin')
    localStorage.removeItem('nextauth.message')
    // Cerrar sesión utilizando NextAuth
    await signOut(); 

    // Redirigir al usuario después de cerrar sesión
    router.push('/');
  };
  const handleLinkClick = () => {
    setIsOpen(false); // Cerrar el dropdown al hacer clic en un enlace
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-gray-800 hover:text-gray-600 focus:outline-none p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-150 ease-in-out">
        <FaUserCircle className="text-3xl" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <ul className="py-1">
            <li>
              <Link href="/profile" passHref>
                <div
                  onClick={handleLinkClick}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200">
                  <FaUser className="mr-2 text-gray-600" />
                  Profile
                </div>
              </Link>
            </li>
            <li>
              <Link href="/reservations" passHref>
                <div
                  onClick={handleLinkClick}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200">
                  <FaCalendarAlt className="mr-2 text-gray-600" />
                  Reservations
                </div>
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut} className="w-full text-left">
                <div className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md transition-colors duration-200">
                  <FaSignOutAlt className="mr-2 text-gray-600" />
                  Log out
                </div>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

