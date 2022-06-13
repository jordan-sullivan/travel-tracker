import './css/styles.css';
import './images/sands.jpg'
import dayjs from 'dayjs';
dayjs().format();
import { fetchAll } from "./api-calls.js";
import Traveler from "./classes/Traveler.js";
import Trip from "./classes/Trip.js";

// - - - - - Global Variables - - - - - //
let travelers, currentTraveler, trips, travelersData, destinationsData, tripsData;

// - - - - - Query Selectors - - - - - //
const pastTripsDisplay = document.querySelector(".past-trips")
const currentTripsDisplay = document.querySelector(".current-trips")
const upcomingTripsDisplay = document.querySelector(".upcoming-trips")
const yearlySpending = document.querySelector(".yearly-spending")

// - - - - - - Event listeners - - - - - //
window.addEventListener("load", () => {
    //makeRandomUser();
    getAllData();
    //displayYearlyTripCost();
});

 const makeRandomUser = (travelersData) => {
     console.log("RANDTRAVDATA", travelersData)
    //travelers = travelersData.map(traveler => new Traveler(travelersData));
    currentTraveler = travelers[Math.floor(Math.random() * travelersData.length)];
};
// return a current traveler (Global?) has an ids
// currentTrav.id  pass this thoruhg as trip user ID 
console.log(currentTraveler)

const getAllData = () => {
        fetchAll() 
            .then(data => {
                const travelersData = data[0].travelers;
                //console.log("TRAVELERS DATA", travelersData)

                const tripsData = data[1].trips;
                //console.log("TRIPS DATA", tripsData)

                const destinationsData = data[2].destinations;
                //console.log("DESTINATIONS DATA", destinationsData)
                //take out of .then, and do cascading functions after 
                //id needs to be acceessible everywhere i go 

                //const singleTravelerData = data[3].travelers;
                //console.log("SINGLE TRAVELERS DATA", singleTravelerData)

                // const singleTraveler = new Traveler(trip.travelerTripData))
                // console.log("traveleRR", singleTraveler)//just a sad object of undefined-ness

                travelers = travelersData.map(trav => new Traveler(trav));
                console.log("allTravelers", travelers) // array of all 50 Travelers
                
                trips = tripsData.map(trip => new Trip(tripsData));
                // console.log("travTriipsData", travelerTripData);
                console.log("Trips", trips)

                //const allDestinations = destinationsData.map(dest => new Destination(dest));
                //console.log("allDestinations", allDestinations)
                //make new Destination class. 

            });
    }

// const loadTravelerInfo = (traveler) => {
//     welcomeMessage.innerText = `Hi, ${traveler.returnFirstName()},`;
//     todaysDate.innerText = `${dayjs(Date.now()).format('ddd MMM D YYYY')}`;
//     displayYearlyTripCost();
// };


// const displayYearlyTripCost = () => {
//     yearlySpending.innerText = `$${tripsData.getYearsTripCost(destinationsData)}`;
// };



