import destination from "./destination_class.js";

let brazil = new destination(
    "Brazil-1",
    "South-America",
    "Brazil",
    ["Porto-Alegre", "Sao-Paulo", "Rio de Janeiro"],
    "June",
    "July", 
    "2014",
    "Visit to FIFA World Cup",
    "During the exam phase of my masters studies in London I decided to experience the world cup firsthand. I traveled to Porto Alegre to view Germany play. Afterwards I flew to Sao Paulo to meet an old friend from Venezuela. Together we subsequently went to Rio de Janeiro to explore the city before flying back home.",
    ["Alvaro and his sister"],
    -42.6,
    -22,
    ["brazil_1.jpg", "brazil_2.jpg", "brazil_3.jpg", "brazil_4.jpg"],
    "https://www.nationsonline.org/oneworld/brazil.htm"
)

let austria = new destination(
    "Austria-1",
    "Europe",
    "Austria",
    ["Vienna"],
    "October",
    "October", 
    "2014",
    "City-Trip with family",
    "For a couple of years my family and I try to do a city-trip once a year. This year my brother, mother and partner/boyfriend traveled to Vienna. We stayed in a great 25 hours hotel and visited famous sites such as Schönbrunn or Weltmuseum.",
    ["Brother", "Mother", "mother's partner / boyfriend)"],
    16.4,
    48.2,
    ["vienna_1.JPG", "vienna_2.jpg", "vienna_3.jpg", "vienna_4.jpg"],
    "https://www.wien.info/en"
)

let usa_1 = new destination(
    "USA-1",
    "North-America",
    "USA",
    ["Portland", "Gallatin", "Durham"],
    "March",
    "March", 
    "2014",
    "US roadtrip after foreign studies",
    "Roadtrip after my foriegn masters studies at Duke University in North Carolina to Portland, Tennessee crossing the smokey mountains.",
    ["Mother"],
    -86,
    36,
    ["portland_1.jpg", "portland_2.jpg", "portland_3.jpg", "portland_4.jpg"],
    "https://cityofportlandtn.gov/"
)

let spain_1 = new destination(
    "Spain-1",
    "Europe",
    "Spain",
    ["Barcelona"],
    "March",
    "March", 
    "2016",
    "Trip to Barcelona to visit friend",
    "For my holiday in 2015 I travelled to Barcelona after visiting Portugal to see my friend from Venezuela. We explored the city and saw impressive buildings of Gaudi and other artists.",
    ["No other"],
    2,
    41,
    ["barcelona_1.jpg", "barcelona_2.jpg", "barcelona_3.jpg", "barcelona_4.jpg"],
    "https://www.spain.info/de/reiseziel/barcelona/"
)

let portugal_1 = new destination(
    "Portugal-1",
    "Europe",
    "Portugal",
    ["Cascais", "Lisboa", "Porto"],
    "March",
    "March", 
    "2016",
    "Trip to Portugal to visit friend",
    "For my holiday in 2015 I travelled to Cascais to see a friend from work. We explored Lisboa and went surfing.",
    ["No other"],
    -9,
    39,
    ["portugal_1.jpg", "portugal_2.jpg", "portugal_3.jpg", "portugal_4.jpg"],
    "https://www.cascais-portugal.com/index.html"
)

let israel_1 = new destination(
    "Israel-1",
    "Middle East",
    "Israel",
    ["Jerusalem", "Tel Aviv"],
    "May",
    "May", 
    "2016",
    "Trip to Israel w/ family",
    "For our yearly family trip we chose to visit Israel. We started in Tel Aviv and drove to Jerusalem by bus to see some of the most sacred places of world religions.",
    ["Mother", "Brother", "Mother's boyfriend/partner"],
    35,
    32,
    ["israel_1.jpg", "israel_2.jpg", "israel_3.jpg", "israel_4.jpg"],
    "https://en.wikipedia.org/wiki/Jerusalem"
)




let journeys = [brazil, austria, usa_1, spain_1, portugal_1, israel_1]
const journeys_all = [brazil, austria, usa_1, spain_1, portugal_1, israel_1]

export {journeys, journeys_all, brazil, austria, usa_1, spain_1, portugal_1, israel_1};
