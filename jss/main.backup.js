
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

//image carousel
$(".carousel-arrow").on("click", function(){
  $(".events").animate({"left":"-100%"}, 500);
  $(".events2").animate({"left":"0%"}, 500);
  $(".carousel-arrow2").toggle();
  $(".carousel-arrow").toggle();
})

$(".carousel-arrow2").on("click", function(){
  $(".events2").animate({"left":"100%"}, 500);
  $(".events").animate({"left":"0%"}, 500);
  $(".carousel-arrow2").toggle();
  $(".carousel-arrow").toggle();
})


//mapstuff 
var map;
var markerTest;

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

    //// TEST ///
    var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    markerTest = new google.maps.Marker({
        position: myLatlng,
        title:"Hello World!"
    });

    // To add the marker to the map, call setMap();
    markerTest.setMap(map);
    //// TEST ///
    
    // loadMarkers();
    console.log(markers);
 
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

function loadMarkers(){
  geojson_url = "https://raw.githubusercontent.com/Hunters2018/Final__project/master/json/main.json";
    console.log('loading geojson')
    map.data.loadGeoJson(geojson_url, null, createMarkers) ;
}


var markers = []

//iterate through the map json Features to create markers + info window
function createMarkers() {
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
    var cityText = feature.getProperty('city')
    var showText = feature.getProperty('show')
    var dateText = feature.getProperty('date')
    var coverText = feature.getProperty('cover')
    var showtypeText = feature.getProperty('showtype')
    var addressText = feature.getProperty('address')
    var timeText = feature.getProperty('time')


//below attributes are all required for markers//
    var marker = new google.maps.Marker({
      position: {lat: latitude, lng:longitude},
      title: titleText,
      map: map,
     });
    
    var content = "<div class='infowindow-text'><span class='infowindow-header'>" + titleText + "</span><p>Performers: " + descriptionText +"</br>" + timeText +"</br>"+ addressText +"</br>" + showtypeText + "</p></div>"
    

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

var shows;

//get the shows from the json file
$.getJSON( "https://raw.githubusercontent.com/Hunters2018/Final__project/master/json/main.json", function( data ) {
  shows = data["features"];
});

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

 function clearMarkers() {
  setMapOnAll(null);
}

 $("nav").on("click", function(){
  clearMarkers();
  console.log("test");
 })     


$(".selecter").on("change", function (){
  // initMap();
  // debugger;
  var option = $(this).val();
  var dropdown = $(this).attr("data-dropdown");
  // console.log(option, dropdown,map);
  markerTest.setMap(null);
  
  for (var i=0; i< shows.length; i++){
    map.data.setStyle({visible: false});

    // console.log(shows[i]["properties"]["city"])
    // console.log(shows[i]["geometry"]["coordinates"][1])
    if (option === shows[i]["properties"]["city"]){
      // console.log(shows[i]);
      // console.log(markers[i]);
      // markers[i].setVisible(true);
      // markers[i].setMap(map);
    } else {
      // markers[i].setVisible(false);
    }
  }
})

// for each select, it goes through once and kicks out elements that dont match
// returns result after everything has gone through it? 
// array of results empty to start
// for each on all markers
// each time after that, does it match, does it match, final result equal to that 



//var city
//var performer 
//var show type
//var cover

// $(.city option).on("change", function){
//   city= $(this).html();
//   consolelog(city);
// });

//function applyFilter() {
//for (var i=0; i< shows.length; i++){
//   if (option === shows[i]["properties"]["city"] && if (option === shows[i]["properties"][""]))
//}

