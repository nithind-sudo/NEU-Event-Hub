# NEU-Event-Hub
A One stop solution to display events in and around Northeastern University so that students can socialize and network
Our mission is to connect students with live entertainment experiences and to make it easier for them to enjoy their favorite events, whether it's a music concert, a sports game, a theater show, or any other type of live event. 
We provide a secure, reliable, and user-friendly platform for buying and selling tickets, and we offer a wide range of services to help students get the most out of their event experience.

![WhatsApp Image 2023-04-21 at 8 08 57 PM](https://user-images.githubusercontent.com/73957962/233752628-ac8fa976-4ce0-4b5a-abd1-46eb42515e26.jpeg)


## Frontend Architecture

* React v18 and react-bootstrap were used to build the front end of the application 

## Backend Architecture

* Node and Express.js were used to build the backend application

![Getting Started](./readme-images/Backend-Architecture.drawio.png)


### Steps to run **only** backend code 

* Go inside server directory using command `cd server`
* Run `npm i ` or `npm install` to install the dependencies present in package.json
* Add a new hidden file called **`.env`** which will have all your project config including database host, port etc 
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

### Contributors
- Nithin Dornipadu
- Sai Tej Sankara
- Akhilesh Kavitkar
- Kaustubh Lawale

### PPT Link:
https://www.canva.com/design/DAFgtQDfA8U/ro2D02Gf2m3hpdLeDORsDg/edit?utm_content=DAFgtQDfA8U&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
