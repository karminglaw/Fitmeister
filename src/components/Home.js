import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md text-center w-96">
        <h1 className="text-4xl font-bold mb-6">Welcome to FitMeister</h1>
        <p className="mb-6 text-gray-700">Track your fitness journey with us.</p>
        <div className="space-y-4">
          <Link to="/register">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Register
            </button>
          </Link>
          <Link to="/login">
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-4">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
