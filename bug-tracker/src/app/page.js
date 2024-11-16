import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to Bug Tracker</h1>
        <Link to="/login" className="text-blue-500 hover:underline">
          Login to continue
        </Link>
      </div>
    </div>
  );
}