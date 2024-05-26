import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const TrackWorkout = () => {
  const [date, setDate] = useState(new Date());
  const [workouts, setWorkouts] = useState([]);
  const [currentWorkout, setCurrentWorkout] = useState({ type: '', sets: '', reps: '', weight: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const standardWorkouts = [
    'Bicep Curl',
    'Push Ups',
    'Incline Chest Flies',
    'Squats',
    'Deadlift',
    'Bench Press',
    'Pull Ups',
    'Dips',
    'Lunges'
  ];

  const handleAddWorkout = () => {
    setWorkouts([...workouts, { ...currentWorkout, date: moment(date).toISOString() }]);
    setCurrentWorkout({ type: '', sets: '', reps: '', weight: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found, please log in again.');
        return;
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      await axios.post('http://localhost:5001/api/workouts/bulk', { workouts }, config);
      setMessage('Workouts logged successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setMessage('Error logging workouts');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorkout({ ...currentWorkout, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Track Workouts</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Date</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Workout Type</label>
            <select
              name="type"
              value={currentWorkout.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a workout</option>
              {standardWorkouts.map((workout) => (
                <option key={workout} value={workout}>
                  {workout}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Sets</label>
            <input
              type="number"
              name="sets"
              value={currentWorkout.sets}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Reps</label>
            <input
              type="number"
              name="reps"
              value={currentWorkout.reps}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Weight (KG)</label>
            <input
              type="number"
              name="weight"
              value={currentWorkout.weight}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="button"
            onClick={handleAddWorkout}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Add Workout
          </button>
          {workouts.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xl font-bold mb-2">Workouts for {moment(date).format('DD/MM/YYYY')}</h3>
              <ul className="space-y-2">
                {workouts.map((workout, index) => (
                  <li key={index} className="flex justify-between bg-gray-200 p-2 rounded-lg">
                    <span>{workout.type}</span>
                    <span>{workout.sets} sets</span>
                    <span>{workout.reps} reps</span>
                    <span>{workout.weight} kg</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Log Workouts
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrackWorkout;
