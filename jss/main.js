 
$("#listview").on("click", function(){
  $(".list-section").animate({"left":0});
  $(".list-section").animate({"top":0}, 1000);
});


$("nav").on("click", function(){
  $("nav").css({"background-color": "blue"});
});

var map
var markers = []

// after the geojson is loaded, iterate through the map data to create markers
// and add the pop up (info) windows
function loadMarkers() {
  console.log('creating markers')
  var infoWindow = new google.maps.InfoWindow()
  map.data.forEach(function(feature) {
    
    // geojson format is [longitude, latitude] but google maps marker position attribute
    // expects [latitude, longitude]
    var latitude = feature.getGeometry().get().lat()
    var longitude = feature.getGeometry().get().lng()
    var titleText = feature.getProperty('title')
    var descriptionText = feature.getProperty('description')
    var showtimeText = feature.getProperty('time')

    var marker = new google.maps.Marker({
      position: {lat: latitude, lng:longitude},
      title: titleText,
      map: map
     });
    
    var markerInfo = "<div><h3>" + titleText + "</h3><p>Performers: " + descriptionText + "</p></div>"
    
    // by default the infoWindow for each marker will stay open unless manually closed
    // using setContent and opening the window whenever a marker is clicked will
    // cause the prior infoWindow to close

    marker.addListener('click', function() {
          infoWindow.close()
          infoWindow.setContent(markerInfo)
          infoWindow.open(map, marker)
        });
    markers.push(marker)
  });
}

//HOW TO CREATE A MAP
function initMap() {
  map_options = {
    zoom: 13,
       //above changes zoom of map - higher the number, closer to the point
    mapTypeId: google.maps.MapTypeId.roadmap,
       //above changes type of map - ex satellite, roadmap, etc
    center: {lat: 40.738565, lng: -73.976958}
       //above sets center of the map
  }
  
  map_document = document.getElementById('map')
        //grabs value of div with ID name of 'map' and assigns it to map_document
  map = new google.maps.Map(map_document,map_options);
      //using Map constructor- pass map_options and map div (aka map_document) to create 'map' object
  geojson_url = "https://raw.githubusercontent.com/Hunters2018/Final__project/master/json/main.json";
  console.log('loading geojson')
  map.data.loadGeoJson(geojson_url, null, loadMarkers) ;

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

// google.maps.event.addDomListener(window, 'load', initMap);
  //means that the initMap function will be called when the window is loaded

//-------

//geo location: 
 // var map, infoWindow;
 //      function initMap() {
 //        map = new google.maps.Map(document.getElementById('map'), {
 //          center: {lat: 40.738565, lng: -73.976958},
 //          zoom: 13
 //        });
 //        infoWindow = new google.maps.InfoWindow;

 //        // Try HTML5 geolocation.
 //        if (navigator.geolocation) {
 //          navigator.geolocation.getCurrentPosition(function(position) {
 //            var pos = {
 //              lat: position.coords.latitude,
 //              lng: position.coords.longitude
 //            };

 //            infoWindow.setPosition(pos);
 //            infoWindow.setContent('Location found.');
 //            infoWindow.open(map);
 //            map.setCenter(pos);
 //          }, function() {
 //            handleLocationError(true, infoWindow, map.getCenter());
 //          });
 //        } else {
 //          // Browser doesn't support Geolocation
 //          handleLocationError(false, infoWindow, map.getCenter());
 //        }
 //      }

 //      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
 //        infoWindow.setPosition(pos);
 //        infoWindow.setContent(browserHasGeolocation ?
 //                              'Error: The Geolocation service failed.' :
 //                              'Error: Your browser doesn\'t support geolocation.');
 //        infoWindow.open(map);
 //      }


