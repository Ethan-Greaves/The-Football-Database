<h1 align="center">⚽ The Football Database ⚽</h1> 

<p align="center">
  <img src="https://img.shields.io/badge/Made%20by-Ethan%20Greaves-green" >
</p>

<hr>
<h4 align="center"><a  href="https://intense-depths-50398.herokuapp.com/">Live Demo</a></h4>
<hr>

## Overview 📖
The Football Database is a web application created using Node.js/Express. Users can search for any football team or player and a fetch request is made to [The Sports DB API](https://www.thesportsdb.com/api.php) to give back information. An authentication system was also created with the help of [Passport.js](http://www.passportjs.org/) which allows users to login and add favourites which appears on the home page.

## Technologies used 👨‍💻

* HTML
* CSS/SCSS
* Bootstrap 4
* JavaScript (ES6)
* Embedded JavaScript (EJS)
* Node.js
* Express
* MongoDB
* Mongoose
* Fetch
* Heroku

## Visuals 🎬
<p>Add any team or player to your favourites:</p>
<img src="./Readme/Gifs/AddingFavourites.gif" width="auto" />

<p>Register, login and logout:</p>
<img src="./Readme/Gifs/Authentication.gif" width="auto" />

<p>Search across the app to find anything or anyone:</p>
<img src="./Readme/Gifs/Searching.gif" width="auto" />


## Setup ⚙️

### Installation

Both [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/try/download/community) are required for the application to run so make sure you have these installed. 

*Versions*

* Node.js - v12.18.0 or higher
* MongoDB - v4.4.1 or higher

Clone the repository to your local system then in the terminal at the root folder run: 
```bash
npm install
```
to acquire the node_Modules and dependencies for this project.

### Usage

*If Node.js and MongoDB are installed locally...*

In the terminal go to the drive where MongoDB is installed and run this command
```bash
mongod
```
then naviagte back to the project root folder and run:
```bash
node app.js
```

The Express server should then start on port 3000 and the website can be viewed on your LocalHost.
