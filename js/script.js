import destination from "./destination_class.js";
import {journeys, journeys_all, brazil, austria, usa_1} from "./destinations.js";
import initMap from "./map.js";


/*Navigation Bar: Collect Journey Data and create Dropdowns
-----------------------------------------------------------------------------*/

let list_years = []
let list_timeperiod = []
let list_regions = []
let list_countries = []

function create_lists() {
    for (let i = 0; i < journeys_all.length; i++) {
        if (list_timeperiod.indexOf(journeys_all[i].year) === -1) {
            list_timeperiod.push(journeys_all[i].year)
        }
        if (list_regions.indexOf(journeys_all[i].continent) === -1) {
            list_regions.push(journeys_all[i].continent)
        }
        if (list_countries.indexOf(journeys_all[i].country) === -1) {
            list_countries.push(journeys_all[i].country)
        }
        if (list_years.indexOf(journeys_all[i].year) === -1) {
            list_years.push(journeys_all[i].year)
        }
    }

    for (let i = 0; i < list_timeperiod.length; i++) {
        let dest_yr = document.createElement("a");
        dest_yr.setAttribute('href', '#');
        dest_yr.innerHTML = `${list_timeperiod[i]}`
        let element_yrlist = document.getElementById("dropdown-year");
        element_yrlist.appendChild(dest_yr);
    }
    for (let i = 0; i < list_regions.length; i++) {
        let dest_regions = document.createElement("a");
        dest_regions.setAttribute('href', '#');
        dest_regions.innerHTML = `${list_regions[i]}`
        let element_regionslist = document.getElementById("dropdown-regions");
        element_regionslist.appendChild(dest_regions);
    }
    for (let i = 0; i < list_countries.length; i++) {
        let dest_countries = document.createElement("a");
        dest_countries.setAttribute('href', '#');
        dest_countries.innerHTML = `${list_countries[i]}`
        let element_countrieslist = document.getElementById("dropdown-countries");
        element_countrieslist.appendChild(dest_countries);
    }
}

create_lists();

/*Statistics-Section: Calculate Statistics and generate HTML elements 
-----------------------------------------------------------------------------*/

function toNumber(value) {
    return Number(value);
 }

let yrs = list_years.map(toNumber)
let countries_visited = list_countries.length;
let outside_europe = list_regions.filter(x => x !== "Europe").length;
let average_countries = Math.round(countries_visited / (new Date().getFullYear() - Math.min.apply(null, list_years.map(toNumber)))*10)/10 ; 

const statistics = (countries_visited, outside_europe, average_countries) => {
    return `
    <div class="grid-item-statistics grid-img"><img class= "img-countries-visited" src="images/countries.jpg" alt="countries visited"></div>
    <div class="grid-item-statistics"># countries visited: ${countries_visited}</div>
    <div class="grid-item-statistics grid-img"><img class= "img-continents-visited" src="images/continents.jpg" alt="countries visited"></div>
    <div class="grid-item-statistics"># countries outside of Europe: ${outside_europe}</div>
    <div class="grid-item-statistics grid-img"><img class= "img-avg-countries-visited" src="images/average-symbol.jpg" alt="countries visited"></div>
    <div class="grid-item-statistics">Avg countries visited per year: ${average_countries}</div>
    `;
};

let statistics_dom = statistics(countries_visited,outside_europe,average_countries);
let statistics_item = document.createElement("div");
statistics_item.setAttribute("class", "statistics-container");
statistics_item.innerHTML = statistics_dom;
let element = document.getElementById("statistics-elements");
element.appendChild(statistics_item);


/*Journey-Details (below map) 
-----------------------------------------------------------------------------*/

const markup = (dest) => {
    return `
    <div class="post-it">
        <h2 class="Journey-Item-Header">${dest.title}</h2>
        <ul class="Journey-Item-List">
            <li>Continent: ${dest.continent}</li>
            <li>Country: ${dest.country}</li>
            <li>City: ${dest.city}</li>
            <li>Year: ${dest.year}</li>
            <li>Duration: ${dest.start_month} to ${dest.end_month}</li>
            <li>Travel Partners: ${dest.travel_partners}</li>
            <li>Interesting Facts about the Country: <a class="Journey-Link" href="${dest.link}">${dest.link}</a></li>
        <p>${dest.description}</p>
        </ul>
    </div>
  `;
  };

const links = (dest, pic_no) => {
    return `
    <div class="slideshow-container" id="Container-${dest.id}">
        <div class="Slide-${dest.id} fade" id="Slide-${dest.id}">
            <div class="numbertext">${pic_no+1} / 4</div>
            <img src="images/${dest.images[pic_no]}" style="width:100%">
        </div>
        <a class="prev prev-${dest.id}">&#10094;</a>
        <a class="next next-${dest.id}">&#10095;</a>
    </div>
    `
};


// Input Content & Pictures of second and next Journeys below the Map
function insert_journeys () {
    for (let i = 0; i < journeys.length; i++) {
        let destpics_object = journeys[i];
        let destitem_pics = links(destpics_object, 0);
        let grid_item_pics = document.createElement("div");
        grid_item_pics.setAttribute("class", "grid-item-pic fade fadeOut");
        grid_item_pics.setAttribute("id", `journey-pics-${destpics_object.id}`);
        grid_item_pics.innerHTML = destitem_pics;
        let element_pics = document.getElementById("journey-det");
        element_pics.appendChild(grid_item_pics);
        
        let dest_object = journeys[i];
        let destitem = markup(dest_object);
        let grid_item = document.createElement("div");
        grid_item.setAttribute("class", "grid-item-journey fade fadeOut");
        grid_item.setAttribute("id", `journey-${dest_object.id}`);
        grid_item.innerHTML = destitem;
        let element = document.getElementById("journey-det");
        element.appendChild(grid_item);
    }
}

insert_journeys();

// Create Picture Toggle to flip journey pictures
function picture_toggle() {

    let next_no = 0;

    for (let i = 0; i < journeys.length; i++) {
        let dest_object = journeys[i];
        let id = dest_object.id
        let toggle_prev = ".prev-"+id
        let backwards = document.querySelector(toggle_prev)

        let toggle_next = ".next-"+id
        let next = document.querySelector(toggle_next)

        let prev_no = 0;

        backwards.addEventListener("click", function (event) {
            if (prev_no === 0) {
                let prev_no = 0
            } else {prev_no--}

            let pic_new = 
            `
                <div class="numbertext">${prev_no+1} / 4</div>
                <img src="images/${dest_object.images[prev_no]}" style="width:100%">
            `
            let grid_item_pics = document.createElement("div");
            grid_item_pics.setAttribute("class", `Slide-${dest_object.id} fade`);
            grid_item_pics.setAttribute("id", `Slide-${dest_object.id}`)
            grid_item_pics.innerHTML = pic_new;
            let element_pics = document.getElementById(`Slide-${dest_object.id}`);
            let parent_element = document.getElementById(`Container-${dest_object.id}`);
            parent_element.replaceChild(grid_item_pics, element_pics);
        })

        next.addEventListener("click", function (event) {
            if (prev_no === 3) {
                let prev_no = 3 
            } else {prev_no++}

            let pic_new = 
            `
                <div class="numbertext">${prev_no+1} / 4</div>
                <img src="images/${dest_object.images[prev_no]}" style="width:100%">
            `
            let grid_item_pics = document.createElement("div");
            grid_item_pics.setAttribute("class", `Slide-${dest_object.id} fade`);
            grid_item_pics.setAttribute("id", `Slide-${dest_object.id}`)
            grid_item_pics.innerHTML = pic_new;
            let element_pics = document.getElementById(`Slide-${dest_object.id}`);
            let parent_element = document.getElementById(`Container-${dest_object.id}`);
            parent_element.replaceChild(grid_item_pics, element_pics);
        })
    }
}

picture_toggle();

// Set Fading Options for Elements 
const observerOptions = {
    root: null,
    rootMargin: "0px",  
    threshold: 0.1
  };
  
function observerCallback(entries, observer) {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    // fade in observed elements that are in view
    entry.target.classList.replace('fadeOut', 'fadeIn');
    } else {
    // fade out observed elements that are not in view
    entry.target.classList.replace('fadeIn', 'fadeOut');
    }
});
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
const fadeElms = document.querySelectorAll('.fade');
fadeElms.forEach(el => observer.observe(el));


/*Drop-Down functionality to choose year, region, country) 
-----------------------------------------------------------------------------*/

const set_year = document.querySelector('.dropdown-content-year');
set_year.addEventListener('click', handleClick, false);

const set_regions = document.querySelector('.dropdown-content-regions');
set_regions.addEventListener('click', handleClick, false);

const set_countries = document.querySelector('.dropdown-content-countries');
set_countries.addEventListener('click', handleClick, false);

function handleClick(e) {
  // Extract the nodeName and textContent from clicked element
  const {nodeName, textContent} = e.target;
  // If it's a button, log the text
  if (nodeName === 'A') {
    var selection_dropdown = textContent;
    }

    var journeys = []

    for (let i = 0; i < journeys_all.length; i++) {
        if (journeys_all[i].year == selection_dropdown || journeys_all[i].continent == selection_dropdown || journeys_all[i].country == selection_dropdown) {
            journeys.push(journeys_all[i]);
        } else if (selection_dropdown == "All") {journeys = journeys_all}
    }

    insert_journeys_selection(journeys);

    let next_no = 0;

    for (let i = 0; i < journeys.length; i++) {
        let dest_object = journeys[i];
        let id = dest_object.id
        let toggle_prev = ".prev-"+id
        // console.log(toggle_prev)
        let backwards = document.querySelector(toggle_prev)

        let toggle_next = ".next-"+id
        // console.log(toggle_next)
        let next = document.querySelector(toggle_next)

        let prev_no = 0;

        backwards.addEventListener("click", function (event) {
            if (prev_no === 0) {
                let prev_no = 0
            } else {prev_no--}

            let pic_new = 
            `
                <div class="numbertext">${prev_no+1} / 4</div>
                <img src="images/${dest_object.images[prev_no]}" style="width:100%">
            `
            let grid_item_pics = document.createElement("div");
            grid_item_pics.setAttribute("class", `Slide-${dest_object.id} fade`);
            grid_item_pics.setAttribute("id", `Slide-${dest_object.id}`)
            grid_item_pics.innerHTML = pic_new;
            let element_pics = document.getElementById(`Slide-${dest_object.id}`);
            let parent_element = document.getElementById(`Container-${dest_object.id}`);
            parent_element.replaceChild(grid_item_pics, element_pics);
        })

        next.addEventListener("click", function (event) {
            if (prev_no === 3) {
                let prev_no = 3 
            } else {prev_no++}

            let pic_new = 
            `
                <div class="numbertext">${prev_no+1} / 4</div>
                <img src="images/${dest_object.images[prev_no]}" style="width:100%">
            `
            let grid_item_pics = document.createElement("div");
            grid_item_pics.setAttribute("class", `Slide-${dest_object.id} fade`);
            grid_item_pics.setAttribute("id", `Slide-${dest_object.id}`)
            grid_item_pics.innerHTML = pic_new;
            let element_pics = document.getElementById(`Slide-${dest_object.id}`);
            let parent_element = document.getElementById(`Container-${dest_object.id}`);
            parent_element.replaceChild(grid_item_pics, element_pics);
        })
    }

    let map_Toreplace = document.getElementById('map')
    while (map_Toreplace.firstChild) {
        map_Toreplace.removeChild(map_Toreplace.firstChild);
  }
  
    /*---------- InitMap inside click-event ------------*/
    function initMap() {
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
      
      initMap();
    /*---------- InitMap inside click-event ------------*/

}

function insert_journeys_selection (journeys) {
    
    [].forEach.call(document.querySelectorAll('.grid-item-journey'), function(e) {
        e.parentNode.removeChild(e);
      });

    [].forEach.call(document.querySelectorAll('.grid-item-pic'), function(e) {
        e.parentNode.removeChild(e);
      });

    
    for (let i = 0; i < journeys.length; i++) {
        let dest_object = journeys[i];
        let destitem = markup(dest_object);
        let grid_item = document.createElement("div");
        grid_item.setAttribute("class", "grid-item-journey fade fadeOut");
        grid_item.setAttribute("id", `journey-${dest_object.id}`);
        grid_item.innerHTML = destitem;
        let element = document.getElementById("journey-det");
        element.appendChild(grid_item);
    
        let destpics_object = journeys[i];
        let destitem_pics = links(destpics_object, 0);
        let grid_item_pics = document.createElement("div");
        grid_item_pics.setAttribute("class", "grid-item-pic fade fadeOut");
        grid_item_pics.setAttribute("id", `journey-pics-${dest_object.id}`);
        grid_item_pics.innerHTML = destitem_pics;
        let element_pics = document.getElementById("journey-det");
        element_pics.appendChild(grid_item_pics);
    }
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const fadeElms = document.querySelectorAll('.fade');
    fadeElms.forEach(el => observer.observe(el));
}