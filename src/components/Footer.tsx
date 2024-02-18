import React from 'react'
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="pt-20 bg-white text-center">
    <div className="mx-auto w-10/12 border-t border-violet-300">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between sm:flex-row text-violet-400">
          <div className="flex items-center">
            <Link href="/" className="text-lg font-bold sm:mr-6">CampusCards</Link>
          </div>

            <div className="flex flex-grow items-center justify-evenly">
       
          </div> 
          <div className="flex items-center space-x-2 text-xl">
          </div>
        </div>
        <p className="text-sm text-violet-400 sm:mt-6">
          CampusCards, All rights reserved. ©{new Date().getFullYear()}
        </p>
      </div>
    </div>
  </footer>
);
};

export default Footer