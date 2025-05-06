# SA-ID Testing Web App
A responsive web application built to validate South African ID numbers, calculate age, and authenticate users using HTML, CSS, JavaScript, React, and MongoDB.
About
This project is a full-stack web application designed to validate South African ID numbers. It checks the validity of an ID, calculates the user's age, and authenticates users via a MongoDB database. The app achieves a 98% accuracy rate in validation tests and provides a seamless user experience across devices.
##Features
Validates South African ID numbers based on standard rules (e.g., checksum, date of birth).

Calculates the user's age from the ID number.

Authenticates users with MongoDB for secure access.

Responsive design for desktop and mobile devices.

Built with React for a dynamic front-end and MongoDB for back-end data storage.

##Tech Stack
Front-End: HTML, CSS, JavaScript, React

Back-End: Node.js, Express

Database: MongoDB

Tools: Git, Visual Studio Code

#Prerequisites
Before running the project, ensure you have the following installed:
Node.js (v14 or higher)

MongoDB (local or cloud instance like MongoDB Atlas)

Git

#Setup Instructions
Clone the Repository  
bash

git clone https://github.com/Stephan-23/SA_ID_TESTING_WEBAPP.git
cd sa-id-tester

#Install Dependencies
Navigate to the project root and install the required packages for both front-end and back-end:  
bash

npm install

##Set Up Environment Variables
Create a .env file in the root directory and add your MongoDB connection string:  

MONGODB_URI=your_mongodb_connection_string
PORT=5000

##Deployment
Deploying on Vercel
sa-id-tester-demo.netlify.app
##Usage
Open the app in your browser.
Login/Sinup
Enter a South African ID number in the input field.

The app will validate the ID, display the calculated age, and authenticate the user if registered in the MongoDB database.

View error messages for invalid IDs or authentication failures.

##Project Structure

sa-id-tester/
├── client/               # Front-end (React)
│   ├── src/              # React components, styles, and logic
│   └── public/           # Static assets
├── src/                  # Back-end (Node.js/Express)
│   ├── routes/           # API routes
│   ├── models/           # MongoDB schemas
│   └── index.js          # Entry point for the back-end
├── .env                  # Environment variables (not tracked)
├── package.json          # Project dependencies
└── README.md             # This file

##Contributing
Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Make your changes and commit (git commit -m "Add your feature").

Push to the branch (git push origin feature/your-feature).

Open a pull request.
Author
Thembinkosi Dladla
LinkedIn | GitHub
