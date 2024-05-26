import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ProgressTracking = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        };
        const response = await axios.get('http://localhost:5001/api/workouts/progress', config);
        
        const workouts = response.data;
        setWorkouts(workouts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkouts();
  }, []);

  useEffect(() => {
    if (selectedWorkout) {
      const workoutData = workouts.filter(workout => workout.type === selectedWorkout);
      const dates = workoutData.map(workout => new Date(workout.date).toLocaleDateString());
      const weights = workoutData.map(workout => workout.weight);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: selectedWorkout,
            data: weights,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: false,
          },
        ],
      });
    }
  }, [selectedWorkout, workouts]);

  const handleWorkoutChange = (e) => {
    setSelectedWorkout(e.target.value);
  };

  const uniqueWorkouts = [...new Set(workouts.map(workout => workout.type))];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Progress Tracking</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Select Workout</label>
          <select
            value={selectedWorkout}
            onChange={handleWorkoutChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a workout</option>
            {uniqueWorkouts.map(workout => (
              <option key={workout} value={workout}>
                {workout}
              </option>
            ))}
          </select>
        </div>
        {chartData.labels ? (
          <Line data={chartData} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default ProgressTracking;
