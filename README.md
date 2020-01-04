# BookMoth-App
BookMoth-App is web app made with JavaScript, React, Redux, MongoDb, Node.js. Project was bootstrapped with Create React App. Registered users can upload datas of physical books that they possess, modify, delete and update its data. Simplified: users create their own personal library and as that keep track of their books collection. [Open app](https://bookmoth-react.herokuapp.com/)

___

## Motivation
At first I chose this project because I wanted to solve problems with keeping track of my books collection. Second thing is, that I wanted to make something that I can show as project for Portfolio as Web Developer, and that  will not be just a bunch of short algorythm's programs but something usefull. The project was growing and also my knowledge of programming, debugging, testing and using a lot different of technologies.

___

## Technologies
This is the list of technologies that I use in project:

* JavaScript
* ReactJs - Application is bootstrapped with **creat-react-app**
* Redux - managing application state.
* axios - Promise based HTTP client for the browser and node.js
* MongoDB - database, host in the cloud with MongoDB Atlas,
* mongoose - MongoDB object modeling tool designed to work in an asynchronous environment with Node.js.
* Node.js and Express - for backend api routes
* AWS S3 - uploading images in bucket
* bootstrap - styles
* SCSS - styles
* heroku - hosting application.

___

## Get started

* If you just want check the app click on [Open app](https://bookmoth-react.herokuapp.com/)

### Run application on local machine

1. If you don't have pre-installed install:

      - NodeJs from https://nodejs.org/en/
      - git https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

2. Go to terminal and create or/and navigate to folder where you want to initialize project<br />

3. clone or download zip

      - copy link provided from clone or download button
      - run command in terminal: `git clone <coppied_link>`
      - install npm: `npm install` to get node_modules installed<br />

4. Run app on localhost: `npm run start-dev` and application will run on **localhost:3000**<br />

If you want to use and manipulate with data from MongoDB, you should create your own Atlas MongoDB account and AWS account, and porivde credentials in folder: `server/config/`, where you need to create folder `dev.js` and provide credentials there like:

```
module.exports = {
  DB_URI: "your mongo db uri from Atlas",
  SECRET_KEY: "your secret key from atlas",
  AWS_ACCESS_KEY_ID: "your access keyId from AWS",
  AWS_SECRET_KEY: "your secret key from AWS"
}
```
---
## Folder structure for front-end in /src

* **/componetns** - folder for react components
* **/store** - redux related logic
* **/store/services** - axios and auth services
* **/store/services** - auth logic that relates to communicate with API
* **/styles** - all styles files are here <br />


## Folder structure for back-end in /server
* **/index.js** - core of backend, connect with Node, mongodb
* **/services** - handle acces to aws s3 bucket
* **/routes** - api requests are handled here
* **/models** - models, mongoose schemas, for mongodb
* **/handler** - error authMiddleware handler for connection error
* **/controllers** - auth controllers, handle registration, login and authMiddleware
* **/config** - credentials
---
## Available Scripts

In the project directory, you can run:

### `npm run start-dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. Currently the project doesn't contain any tests

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

---
Background photos are from [Unsplash](https://unsplash.com/s/photos/books) created by amazing artists: Roman Mager @roman_lazygeek, Henry Be
@henry_be, Emily Rudolph, Eli Francis, hannah grace
