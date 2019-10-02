# Simple-Nodejs-App-with-Redis-integrated

## Prerequisite
- Before try this app, make sure that you already installed Redis server on your PC. If not, please go to https://redis.io/download to install

## Description
- This is Nodejs app allows get the total number of public repositories of any user on Github.
- This app use Redis to cache the result for the first request, so from the following requests with same username, the result will be get from the memory without sending a new request to github page.

## Get your hands dirty
To try this app, clone this repo and run the following commands :
- Install all dependencies: npm i
- Start the app: nodemon index.js
- Open the browser and go to http://localhost:5000/repos/<username\>, fill the username by any github username you want to see the result.
- Example: http://localhost:5000/repos/danptit
- The result should be like this: User danptit has 13 public repositories on Github