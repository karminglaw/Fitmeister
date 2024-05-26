import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'; // Import moment for date formatting

const PreviousWorkouts = () => {
  const [groupedWorkouts, setGroupedWorkouts] = useState({});

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
        
        const workouts = response.data;
        
        // Group workouts by type
        const grouped = workouts.reduce((acc, workout) => {
          if (!acc[workout.type]) {
            acc[workout.type] = [];
          }
          acc[workout.type].push(workout);
          return acc;
        }, {});

        setGroupedWorkouts(grouped);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWorkouts();
  }, []);

  const deleteWorkout = async (id, type) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      };
      await axios.delete(`http://localhost:5001/api/workouts/${id}`, config);
      setGroupedWorkouts(prevGrouped => {
        const updated = { ...prevGrouped };
        updated[type] = updated[type].filter(workout => workout._id !== id);
        if (updated[type].length === 0) {
          delete updated[type];
        }
        return updated;
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Previous Workouts</h2>
        <div className="overflow-x-auto">
          {Object.keys(groupedWorkouts).map((type) => (
            <div key={type} className="mb-8">
              <h3 className="text-xl font-bold mb-4">{type}</h3>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Sets</th>
                    <th className="py-2 px-4 border-b">Reps</th>
                    <th className="py-2 px-4 border-b">Weight (KG)</th>
                    <th className="py-2 px-4 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedWorkouts[type].map((workout) => (
                    <tr key={workout._id}>
                      <td className="py-2 px-4 border-b">{moment(workout.date).format('DD/MM/YYYY')}</td>
                      <td className="py-2 px-4 border-b">{workout.sets}</td>
                      <td className="py-2 px-4 border-b">{workout.reps}</td>
                      <td className="py-2 px-4 border-b">{workout.weight}</td>
                      <td className="py-2 px-4 border-b">
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded"
                          onClick={() => deleteWorkout(workout._id, type)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviousWorkouts;
