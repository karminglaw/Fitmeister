import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PreviousWorkouts = () => {
  const [workouts, setWorkouts] = useState([]);

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
        const response = await axios.get('http://localhost:5001/api/workouts', config);
        setWorkouts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Previous Workouts</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Workout Type</th>
                <th className="py-2 px-4 border-b">Sets</th>
                <th className="py-2 px-4 border-b">Reps</th>
                <th className="py-2 px-4 border-b">Weight (KG)</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id}>
                  <td className="py-2 px-4 border-b">{new Date(workout.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b">{workout.type}</td>
                  <td className="py-2 px-4 border-b">{workout.sets}</td>
                  <td className="py-2 px-4 border-b">{workout.reps}</td>
                  <td className="py-2 px-4 border-b">{workout.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PreviousWorkouts;
