# NEU-Event-Hub
A One stop solution to display events in and around Northeastern University so that students can socialize and network

## Frontend Architecture

* React v18 and react-bootstrap were used to build the front end of the application 

## Backend Architecture

* Node and Express.js were used to build the backend application

![Getting Started](./readme-images/Backend-Architecture.drawio.png)


### Steps to run **only** backend code 

* Go inside server directory using command `cd server`
* Run `npm i ` or `npm install` to install the dependencies present in package.json
* Add a new hidden file called .evn which will have all your project config including database host, port etc 
* After successful installation of dependencies, run `npm run start` to start the application
* Use Postman to hit the APIs with out any front end application to test and develop the APIs  

### Steps to run **only** Frontend code

* Go inside client directory using command `cd client`
* Run `npm i ` or `npm install` to install the dependencies present in package.json
* After successful installation of dependencies, run `npm run dev` to start the application

### Steps to run the application as whole ( Front-end and Back-end) 

* Open the terminal and run `npm start` this will start running server
* In second terminal run `npm run dev` this will run the frontend application
* Command `npm run build` will build the application with the necessary static files
* If above build command was used, `npm start` will start the front and backend application which will be running on same port
