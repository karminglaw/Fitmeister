import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();
  const username = location.state?.username || 'User';

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-96">
        <h2 className="text-2xl font-bold mb-4">Hello, {username}</h2>
        <div className="space-y-4">
          <Link to="/track-workout">
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 mt-2">
              Track Workout
            </button>
          </Link>
          <Link to="/previous-workouts">
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300 mt-2">
              Previous Workouts
            </button>
          </Link>
          <Link to="/calculate-bmi">
            <button className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300 mt-2">
              Calculate BMI
            </button>
          </Link>
          <Link to="/progress-tracking">
            <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition duration-300 mt-2">
              Track Progress
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
