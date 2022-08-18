/* <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDn0xjfckqD40txkDANthif7G5BFhGir4&callback=initMap"></script> */

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;
let service;
var searchbtn = document.querySelector(".search-btn")
var inputVal = document.querySelector(".inputVal")

//coordinates to Minneapolis, MN to initialize
var lat = 44.986;
var lon = -93.258;

var pos = {lat: lat, lng: lon };

//requested location

var request = {
  location: pos,
  radius: '8046',
  type: ['park']
};



function initMap() {

  map = new google.maps.Map(document.querySelector(".map"), {
    center: pos,
    zoom: 15,
  });

  
  infoWindow = new google.maps.InfoWindow();
 
  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.open(map);
          map.setCenter(pos);
          createMarker({lat:map.center.lat(),lng:map.center.lng()});

          request.location = pos;


          servicePan = new google.maps.places.PlacesService(map);
          servicePan.nearbySearch(request, callback);

          createMarker({lat:map.center.lat(),lng:map.center.lng()});
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  
  

  
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

  createMarker({lat:map.center.lat(),lng:map.center.lng()});
 
}



//render markers on the page
function callback(results, status) {


  console.log(results);
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      // console.log(results[i]);
      createMarker({lat:results[i].geometry.location.lat(),lng:results[i].geometry.location.lng()});
    }
  }
}

function createMarker(resultObj){

  // console.log(resultObj)
  
  var locLat = resultObj.lat;
  var locLon = resultObj.lng;
    
  new google.maps.Marker({
  position: {lat: locLat, lng: locLon},
  map,
  title: "Hello World!",
  });

    
}







function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

searchbtn.addEventListener('click', function () {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputVal.value + ',USA&APPID=deea8678f358f6e59a970dd133b9edc3')
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {

          lat = data.coord.lat
          lon = data.coord.lon
          initMap();

        })
      }
    })
  }
)


window.initMap = initMap;