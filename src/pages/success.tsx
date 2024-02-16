import React from 'react';
import '../styles/globals.css';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

 

const SuccessPage = () => {


  return (
    <div>
    <Navbar />
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white mb-20 shadow-xl rounded-xl p-8 md:p-12 lg:p-16 text-center max-w-lg mx-auto">
        <IoMdCheckmarkCircleOutline className="text-purple-400 mx-auto text-6xl" />
        <h1 className="text-purple-400 text-3xl font-bold mt-4">Thank You!</h1>
        <p className="text-gray-600 mt-4">Your message has been sent successfully. We appreciate you using CampusCards.</p>
        <div className="flex flex-rows gap-2">
        <div
          className="mt-8 bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-300 transition duration-300">
          <Link href='/'>Send Another Message</Link>
          </div>

        <div
          className="mt-8 text-gray-700 font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-200">
          <Link href='/'>Return Home</Link>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SuccessPage;
