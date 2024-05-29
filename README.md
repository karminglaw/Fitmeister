FitMeister: A Tailored Fitness Progress Tracker

Overview
FitMeister is a personalized fitness progress tracker designed to help users record their personal workout data and monitor their progress over time. The app supports tracking of various workouts, calculates BMI, and allows users to document their fitness journey with photos and notes. It is built with a focus on Personal Record tracking and Progressive Overload, ensuring users can systematically track their improvements and stay motivated.

Motivation
I created FitMeister to address the need for a simple yet comprehensive fitness tracking tool. Many existing apps either lack necessary features or are overly complicated. FitMeister is designed to be user-friendly while providing all the essential tools needed for effective fitness tracking, emphasizing progressive overload and personal record tracking.

How to Run
Prerequisites
MongoDB: Ensure you have a MongoDB instance running and obtain the connection string.
JWT Token: Generate a JWT secret key for authentication.
Steps to Run
Set Up Environment Variables:

Create a .env file in the root of your project with the following content:
makefile
Copy code
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Replace your_mongodb_connection_string with your actual MongoDB connection string.
Replace your_jwt_secret_key with your generated JWT secret key.
Install Dependencies:

bash
Copy code
npm install
Start the Server:

bash
Copy code
node server.js
Start the React App:

bash
Copy code
npm start
Access the App:

Open your browser and navigate to http://localhost:3000 to start using FitMeister.
Technologies Used
Frontend: React, Material-UI
Backend: Node.js, Express
Database: MongoDB
Authentication: JWT (JSON Web Tokens)


License
This project is licensed under the MIT License.
