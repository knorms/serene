var express = require("express");

 //use the application off of express.
var app = express();

 app.get("/resources", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/home.html");
 });
 app.get("/maps", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/maps.html");
 });
 app.get("/bot", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/index.html");
 });

app.use(express.static(__dirname + '/public'));

app.listen(3000);

console.log("Something awesome to happen at http://localhost:3000");

var googleMapsClient = require('@google/maps').createClient({
   key: 'AIzaSyDhskVUhvYcIl1o33qJdqWvZOxplkczOHE'
 });
 googleMapsClient

googleMapsClient.geocode({
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
  }
});
