
# react-passport-express
A starter/template application using React/Redux in the front-end and Express/Passport in the back-end. It has user authentication with login, registration, and username/password change functionality.

## Why?
Although I've made various small applications focusing on back-end technologies, I haven't done much with front-end libraries. I recently rebuilt my personal website using React/NextJS and I have become more interested in learning more front-end development.

## Getting Started

 1. Clone the repository

 > git clone https://github.com/ad3m3r5/react-passport-express.git

 2. Install necessary packages
 
>  npm install

3. Edit the MongoDB/mongoose (database) configuration in server/config/database.js

> Ex. > 'url' : 'mongodb://127.0.0.1:27017/react-passport-express'

 4. Start your MongoDB server

 5. Start the server and application front-end

>  npm run dev

## Tech/Software Used

 - [NodeJS](https://nodejs.org/en/)
 - [npm](https://www.npmjs.com/)
 - [MongoDB](https://www.mongodb.com/)
 - [VS Code](https://code.visualstudio.com/)

Main Packages Used

 - [React](https://reactjs.org/)
 - [Material-UI](https://material-ui.com/)
 - [Redux](https://redux.js.org/)
 - [Redux Persist](https://github.com/rt2zz/redux-persist)
 - [axios](https://github.com/axios/axios)
 - [ExpressJS](https://expressjs.com/)
 - [Passport](http://www.passportjs.org/)
 - [Mongoose](https://mongoosejs.com/)
 - [Concurrently](https://github.com/kimmobrunfeldt/concurrently)
 - [bcrypt.js](https://github.com/dcodeIO/bcrypt.js)

## Screenshots
User login
![Login Page](https://user-images.githubusercontent.com/11009228/73156045-73d24700-40aa-11ea-9e72-908925cb810b.png)
Profile: Change Username
![Profile Page: Change Username](https://user-images.githubusercontent.com/11009228/73156076-8cdaf800-40aa-11ea-944b-c8424acf1350.png)
Profile: Update Password
![Profile Page: Update Password](https://user-images.githubusercontent.com/11009228/73156113-aa0fc680-40aa-11ea-81e9-a884fa28213b.png)