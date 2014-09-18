#Recipe Tracker App
Our super cool app that is used as a group project for DGM RIA (Rich Internet Apps)

##Summary
[Summary goes here]

##Technologies Used
For this project we will be using a modifided MEAN stack.
We have decided aginst using the express router to serve the front end for the sake of simplicity. Therfore, the project serves the front end staticly from the /app folder. However, the data API will use the new express 4 routing options to provide RESTful endpoint used for data manipulation.
###Frontend
The frontend will be using Angular.js and Bootstrap and will be the focus of this project.
###Backend
The back end will be using Node with the Express framework to serve static files, and provide back end API. The backend will also use MongoDB with Mongoose for data object modeling. 

##Getting Started
Node is required.
####Install Dependancies.
Backend dependancies:

    npm install
Frontend dependancies:

    bower install

Start the server (I recommend nodemon):

Install nodemon, if needed.

    npm install -g nodemon

Then start the server:

    nodemon start
