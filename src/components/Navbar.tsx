import React from 'react';
import { BsHouseHeart } from "react-icons/bs";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="flex h-full items-center py-3">
        <div className="flex h-full items-center">
          {/* Logo and name */}
          <span className="mr-6 flex flex-row">
            <a href="#" className="flex items-center py-5 pl-4">
              <BsHouseHeart className="text-violet-400 w-7 h-7"/>
              <span className="font-bold text-3xl text-violet-400 pl-2">Campus Cards</span>
            </a>
          </span>

          {/* Placeholder for the rest of the navbar content */}
          <div className="flex-1 flex items-center justify-end">
            {/* Primary Nav Items */}
            <div className="hidden md:flex items-center space-x-1">
              {/* Items here */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;