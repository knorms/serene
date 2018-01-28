var express = require("express");

 //use the application off of express.
 var app = express();

 //define the route for "/"
 app.get("/", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/index.html");
 });
 app.get("/songs", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/home.html");
 });

 //start the server
 app.listen(3000);

 console.log("Something awesome to happen at http://localhost:3000");

 var googleMapsClient = require('@google/maps').createClient({
   key: 'AIzaSyDhskVUhvYcIl1o33qJdqWvZOxplkczOHE'
 });
