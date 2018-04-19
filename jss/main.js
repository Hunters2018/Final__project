var markers = []
var shows;
var map;

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
});

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


    //get the shows from the json file
    $.getJSON( "https://raw.githubusercontent.com/Hunters2018/Final__project/master/json/main.json", function( data ) {
      shows = data["features"];
      createMarkers();
    });

    console.log(markers);
 
}


//iterate through the map json Features to create markers + info window
function createMarkers() {
  console.log('creating markers')
  var infoWindow = new google.maps.InfoWindow()
  
  for(var i=0; i< shows.length; i++){
    
    // geojson format is [longitude, latitude] but google maps marker position attribute
    // expects [latitude, longitude]
    var latitude = shows[i].geometry.coordinates[1];
    var longitude = shows[i].geometry.coordinates[0];
    var titleText = shows[i].properties.title;
    var descriptionText = shows[i].properties.description;
    var showtimeText = shows[i].properties.time;
    var cityText = shows[i].properties.city;
    var showText = shows[i].properties.show;
    var dateText = shows[i].properties.date;
    var coverText = shows[i].properties.cover;
    var showtypeText = shows[i].properties.showtype;
    var addressText = shows[i].properties.address;
    var timeText = shows[i].properties.time;


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
  };
}


function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

$(".cityselecter").on("change", function (){
  var option = $(this).val();
  var dropdown = $(this).attr("data-dropdown");
  
  for (var i=0; i< shows.length; i++){
    map.data.setStyle({visible: false});

    // console.log(shows[i]["properties"]["city"])
    // console.log(shows[i]["geometry"]["coordinates"][1])
    if (option === shows[i]["properties"]["city"]){
      // console.log(shows[i]);
      // console.log(markers[i]);
      // markers[i].setVisible(true);
      console.log(option);
      console.log(shows[i]);

      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
})

$(".performerselecter").on("change", function (){
  var option = $(this).val();
  var dropdown = $(this).attr("data-dropdown");
  
  for (var i=0; i< shows.length; i++){
    map.data.setStyle({visible: false});

    // console.log(shows[i]["properties"]["city"])
    // console.log(shows[i]["geometry"]["coordinates"][1])
    if (option === shows[i]["properties"]["description"]){
      // console.log(shows[i]);
      // console.log(markers[i]);
      // markers[i].setVisible(true);
      console.log(option);
      console.log(shows[i]);

      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
})

$(".showtypeselecter").on("change", function (){
  var option = $(this).val();
  var dropdown = $(this).attr("data-dropdown");
  
  for (var i=0; i< shows.length; i++){
    map.data.setStyle({visible: false});

    // console.log(shows[i]["properties"]["city"])
    // console.log(shows[i]["geometry"]["coordinates"][1])
    if (option === shows[i]["properties"]["showtype"]){
      // console.log(shows[i]);
      // console.log(markers[i]);
      // markers[i].setVisible(true);
      console.log(option);
      console.log(shows[i]);

      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
})

$(".coverselecter").on("change", function (){
  var option = $(this).val();
  var dropdown = $(this).attr("data-dropdown");
  
  for (var i=0; i< shows.length; i++){
    map.data.setStyle({visible: false});

    // console.log(shows[i]["properties"]["city"])
    // console.log(shows[i]["geometry"]["coordinates"][1])
    if (option === shows[i]["properties"]["cover"]){
      // console.log(shows[i]);
      // console.log(markers[i]);
      // markers[i].setVisible(true);
      console.log(option);
      console.log(shows[i]);

      markers[i].setMap(map);
    } else {
      markers[i].setMap(null);
    }
  }
})

$(".resetButton").on("click", function() {
  initMap();
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

