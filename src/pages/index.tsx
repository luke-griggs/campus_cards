import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FiLock } from "react-icons/fi"; // Importing lock icon from react-icons
import "../styles/globals.css"; // Ensure this contains the necessary responsive utilities
import { db } from '../../firebase.js';
import { RiH5 } from "react-icons/ri";
import { loadStripe } from '@stripe/stripe-js';
import { addMessage } from '../../services/firestoreService.js'



const Home: React.FC = () => {

const [phoneNumber, setPhoneNumber] = useState('');
const [message, setMessage] = useState('');

const stripePromise = loadStripe('pk_test_51Og8qVGV5b2yzFdB8bLNWswkjM6gsZpxum7jzlTijbrUwzIIxsTDsLprB3VtUHCMHzghPgPiP9MHZQIp0nOcKtYs00Fdwr8LDn');

const handleSubmit = async(e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent the default form submission
    if (!phoneNumber || !message) {
      alert('Oh no! Please enter a valid phone number and message'); // Show alert if fields are empty
    } else {
      try {

        const docId = await addMessage(phoneNumber, message);

        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber, message, docId}),
        });

        const session = await response.json();

        // Redirect to Stripe Checkout
        const stripe = await stripePromise;

        if (stripe) {
            await stripe.redirectToCheckout({ sessionId: session.id});
        } else {
            console.log('Stripe.js has not loaded yet.');
        }

        } catch (error) {
            console.error('Error:', error);
            alert('Error processing payment. Please try again.');
        }
    }
  };



  return (
    <div className="bg-gradient-to-bl from-purple-400 to-blue-300 min-h-screen flex flex-col text-gray-800">
      <Navbar />
      <main className="flex-grow">
        <section className="text-center py-16 px-4">
          <h1 className="text-6xl font-bold mb-4 text-white">
            Encourage Your College Student
          </h1>
          <p className="text-xl mb-6 text-white">
            Send your student some motivation, or just let them know they're
            missed.
          </p>
        </section>
        <div className="flex justify-center items-center">
          <div className="w-11/12 md:w-3/4 bg-white shadow-2xl rounded-2xl overflow-hidden lg:flex flex-col lg:flex-row transform transition duration-500 hover:scale-105">
            {/* Image Section */}
            <div className="lg:w-1/2 bg-white flex justify-center items-center p-8 lg:items-start lg:p-16">
              <img
                src="/images/phone_image.png"
                alt="Phone"
                className="max-w-xs sm:max-w-sm md:max-w-sm"
              />
            </div>
            {/* Form Section */}
            <div className="lg:w-1/2 p-8 lg:p-16">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                Send a Loving Message!
              </h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="recipient"
                    className="block mb-2 text-sm text-gray-600 font-semibold"
                  >
                    phone number
                  </label>
                  <input
                    type="text"
                    id="recipient"
                    name="recipient"
                    placeholder="Enter their phone number"
                    className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-indigo-300"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm text-gray-600 font-semibold"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Type your message"
                    className="w-full px-4 py-2 border rounded-md text-gray-700 focus:ring focus:ring-indigo-300"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <a
                 /* href="https://buy.stripe.com/test_6oEaGU0ORcOoaXe3cc"*/
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div onClick={handleSubmit}className="w-full text-center bg-[#38b6ff] text-white px-4 py-3 mt-2 rounded-md hover:bg-blue-300 focus:outline-none focus:bg-indigo-700">
                    Send Message
                  </div>
                </a>
              </form>
              <div className="mt-4 flex items-center justify-center text-gray-600 text-xs">
                <FiLock className="mr-2 text-sm" />
                We guarantee 100% privacy. Your data will not be shared.
              </div>
            </div>
          </div>
        </div>
        <section className="bg-gray-100 py-16 px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-2xl px-8 text-left font-bold text-gray-700 mb-4">
              How It Works
            </h2>
            <p className="text-sm text-gray-600 text-left px-8">
              CampusCards makes it easy to send a loving or encouraging
              anonymous message to your college student. Just enter the
              recipient's phone number, type your heartfelt message, and hit
              send. We'll take care of the rest, ensuring your message is
              delivered securely and privately. We understand the importance of
              staying connected, especially when distance separates you from
              your loved ones. With CampusCards, you can bridge that gap with
              just a few clicks.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
