import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import sideImage from '../assets/side-image.jpg'; // Adjust the path to your image file

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col lg:flex-row mx-6">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            src={sideImage}
            alt="Bug Tracker"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 flex flex-col justify-center p-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to Bug Tracker</h1>
          <p className="mb-4 text-gray-600">
            Track and manage your bugs efficiently with our platform.
          </p>
          <Link
            to="/login"
            className="inline-block text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-lg transition"
          >
            Login to continue
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
