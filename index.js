var express = require("express");

 //use the application off of express.
var app = express();

 //define the route for "/"
 app.get("/", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/index.html");
 });
 app.get("/resources", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/home.html");
 });
 app.get("/maps", function (request, response){
     //show this file when the "/" is requested
     response.sendFile(__dirname+"/maps.html");
 });

app.use(express.static(__dirname + '/public'));

 //start the server
 function getAccessToken() {
   wx.request({
     url: 'https://accounts.spotify.com/api/token',
     method: 'POST',
     data: {
       grant_type: 'client_credentials'
     },
     header: {
       'Authorization': 'Basic ' + btoa('4121e92307f54414aba6961a1ca595ba:7630003c1a2e464b9654b3cad497335f'),
       'Content-Type': 'application/x-www-form-urlencoded'
     },
     success: function(res) {
       console.log('getAccessToken-S');
       console.log(res.data);
       that.setData({
         token: res.data
       })
     },
     complete: function() {
       console.log('getAccessToken-C');
     }
   });
 }

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
