const API_KEY_GMAPS="AIzaSyAOx84cbtaUHLxIvp3q5VFvCogpqG670nU"

//const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=${API_KEY_GMAPS}`

let NodeGeocoder = require('node-geocoder');
 
let options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: API_KEY_GMAPS, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);
 
// Using callback
geocoder.geocode('caboto 450 caba', function(err, res) {
  console.log(res);
});
