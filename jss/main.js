
//toggle for map section
$("#listview").on("click", function(){
  $(".list-section").animate({"left":0}, 350);
  $(".calendar-section").animate({"right":"100%"},350);
  $("#listview").css({"color": "#0AA2FF"});
  $("#calendarview").css({"color": "black"});
  $("#mapview").css({"color": "black"});
});

$("#calendarview").on("click", function(){
  $(".calendar-section").animate({"right":0}, 350);
  $(".list-section").animate({"left":"100%"}, 350);
  $("#listview").css({"color": "black"});
  $("#calendarview").css({"color": "#0AA2FF"});
  $("#mapview").css({"color": "black"});
});

$("#mapview").on("click", function(){
  $(".calendar-section").animate({"right":"100%"},350);
  $(".list-section").animate({"left":"100%"}, 350);
  $("#listview").css({"color": "black"});
  $("#calendarview").css({"color": "black"});
  $("#mapview").css({"color": "#0AA2FF"});
})

var map;


//creating a map (note- there is script in the HTML that runs this when the page loads)
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
        //assigns map_document to value of div with ID name of 'map'
    map = new google.maps.Map(map_document,map_options);
      //using Map constructor- pass map_options and map div (aka map_document) to create 'map' object
    geojson_url = "https://raw.githubusercontent.com/Hunters2018/Final__project/master/json/main.json";
    console.log('loading geojson')
    map.data.loadGeoJson(geojson_url, null, loadMarkers) ;

  //Geolocation:
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };

  //     map.setCenter(pos);
  //   }, function() {
  //     handleLocationError(true, infoWindow, map.getCenter());
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   handleLocationError(false, infoWindow, map.getCenter());
  // }
}

//javascript for creating markers (note: LoadMarkers is called in initMap function)

var markers = []

//iterate through the map json Features to create markers + info window
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


//below attributes are all required for markers//
    var marker = new google.maps.Marker({
      position: {lat: latitude, lng:longitude},
      title: titleText,
      map: map
     });
    
    var content = "<div><h3>" + titleText + "</h3><p>Performers: " + descriptionText + "</p></div>" 
    
    // by default the infoWindow for each marker will stay open unless manually closed
    // using setContent and opening the window whenever a marker is clicked will
    // cause the prior infoWindow to close

    marker.addListener('click', function() {
          infoWindow.close()
          infoWindow.setContent(content)
          infoWindow.open(map, marker)
        });
    markers.push(marker)
  });
}



$("li").on("click", function(){
  testInitMap();
})

function testInitMap() {
  map_options = {
    zoom: 13,
       //above changes zoom of map - higher the number, closer to the point
    mapTypeId: google.maps.MapTypeId.roadmap,
       //above changes type of map - ex satellite, roadmap, etc
    center: {lat: 42.738565, lng: -73.976958}
       //above sets center of the map
  }
  
    map_document = document.getElementById('map')
        //assigns map_document to value of div with ID name of 'map'
    map = new google.maps.Map(map_document,map_options);
      //using Map constructor- pass map_options and map div (aka map_document) to create 'map' object
    geojson_url = "https://raw.githubusercontent.com/Hunters2018/Final__project/master/json/main.json";
    console.log('loading geojson')
    map.data.loadGeoJson(geojson_url, null, loadTestMarkers) ;
}

function loadTestMarkers() {
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

