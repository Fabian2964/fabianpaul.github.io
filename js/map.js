import {journeys} from "./destinations.js"

export default function initMap() {
  var mapOptions = { 
    zoom: 2,
    center: {lat: 30, lng: 20},
    minZoom: 2,
    maxZoom: 6,
    streetViewControl: false,
    mapTypeControl: false,
    zoomControl: true,
    mapTypeId: 'terrain'
    };
  

  //make map with specified mapOptions
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);


    //designate panning and zooming bounds
    var allowedBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(-20.0,-180.0), //southwest corner
        new google.maps.LatLng(40.0,180.0)   //northeast corner
    );

    var lastValidCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function() {
        if (allowedBounds.contains(map.getCenter())) {
        // still within valid bounds, save the last valid position
            lastValidCenter = map.getCenter();
            return; 
        }

        // not valid anymore, return to last valid position
            map.panTo(lastValidCenter);
    });
  

  let destNames = []
  let destImg = []
  let destRegion = []
  let destlong = []
  let destlat = []
  let destyear = []
  let desttitle = []

  for (let i = 0; i < journeys.length; i++) {
    destNames.push(journeys[i].country);
    destImg.push(journeys[i].images[0]);
    destRegion.push(journeys[i].continent);
    destlong.push(journeys[i].long);
    destlat.push(journeys[i].lat);
    destyear.push(journeys[i].year);
    desttitle.push(journeys[i].title);
    console.log(journeys[i])
    let coordtemp = {position: new google.maps.LatLng(journeys[i].long, journeys[i].lat)};
  }



  const infoWindows = [];
  const markers = [];

  for (let i = 0; i < destNames.length; i++) {
    const contentString = 
    '<div id="window-content">'+
      '<div id="window-top">' +
        '<img id="map-img" src=images/' + destImg[i] + '>' + 
      '</div>'+
      '<div id="window-bottom">' +
        '<h1 id="firstHeading">'+destNames[i]+'</h1>'+
          '<p>' + desttitle[i] + '</p>'+
          '<p>' + destyear[i] + '</p>'+
      '</div>' +
    '</div>'; 
    infoWindows[i] = new google.maps.InfoWindow({
      content: contentString,
      minWidth: 150,
      maxWidth: 150
    })

    markers[i] = new google.maps.Marker({
      position: new google.maps.LatLng(destlong[i], destlat[i]),
      icon:  { 
        url: 'images/countrypin.png',
        scaledSize : new google.maps.Size(20, 30) 
      },
      map: map
    });
  }


  var infoWindowEnabled = [true]


  //open and close the content window at each marker
  for (let i = 0; i < destNames.length; i++) {
    markers[i].addListener('click', function() {
      if (infoWindowEnabled[i]) {
        infoWindows[i].close(map, markers[i]);
        infoWindowEnabled[i] = false;
      } else {
          for (let i = 0; i < destNames.length; i++) {
              infoWindows[i].close(map, markers[i]);
              infoWindowEnabled[i] = false;
            }
            infoWindows[i].open(map, markers[i]);
            infoWindowEnabled[i] = true;
        }
    });
  };


  //resize the marker icon if the zoom level changes
  google.maps.event.addListener(map, 'zoom_changed', function() {
    var currentZoom = map.getZoom();
    const sizeDim = 15*currentZoom;
    for (let i = 0; i < destNames.length; i++) {
      markers[i].icon.scaledSize = new google.maps.Size(sizeDim, sizeDim);
      markers[i].icon.size =  new google.maps.Size(sizeDim, sizeDim);
    }
  });

  //for getting map coordinates when you click somewhere on the map
  google.maps.event.addListener(map, 'click', function (event) {
    displayCoordinates(event.latLng);               
  });

  function displayCoordinates(pnt) {
    var lat = pnt.lat();
    lat = lat.toFixed(4);
    var lng = pnt.lng();
    lng = lng.toFixed(4);
    console.log("new google.maps.LatLng(" + lat + ", " + lng + ")");
  }

}

window.initMap = initMap;