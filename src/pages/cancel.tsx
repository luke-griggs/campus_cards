import React from 'react'
import '../styles/globals.css';
import { CiFaceFrown } from "react-icons/ci";
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const cancel = () => {


  return (
        <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white mb-10 shadow-xl rounded-xl p-8 md:p-12 lg:p-16 text-center max-w-lg mx-auto">
          <CiFaceFrown className="text-red-400 mx-auto text-6xl" />
            <h1 className="text-red-400 text-3xl font-bold mt-4">Sorry, your transaction was canceled</h1>
            <p className="text-gray-600 mt-6">Click <a className="font-bold" href="phonenumber">here</a> to contact support</p>
            <div className="flex justify-center">
          
            <button
              className="mt-4 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-200">
              Return Home
            </button>
            </div>
          </div>
        </div>
        </div>
      );
    };


export default cancel