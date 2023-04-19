# Accept a Payment

Build a simple checkout form to collect payment details. Included are some basic
build and run scripts you can use to start up the application.

## Running the sample

1. Build the application

~~~
npm install
~~~

2. Run the application

~~~
npm start
~~~

3. Go to [http://localhost:3000/checkout](http://localhost:3000/checkout)


{
  "name": "stripe-sample",
  "version": "0.1.0",
  "dependencies": {
    "@stripe/react-stripe-js": "^1.0.0",
    "@stripe/stripe-js": "^1.0.0",
    "express": "^4.17.1",
    "react": "^16.9.0",
    "react-dom": "^16.9.0",
    "react-scripts": "^3.4.0",
    "stripe": "^8.202.0"
  },
  "devDependencies": {
    "concurrently": "4.1.2"
  },
  "homepage": "http://localhost:3000/checkout",
  "proxy": "http://localhost:4242",
  "scripts": {
    "start-client": "react-scripts start",
    "start-server": "node server.js",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "start": "concurrently \"yarn start-client\" \"yarn start-server\""
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
Use these dependencies in package.json