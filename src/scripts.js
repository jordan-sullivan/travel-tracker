import './css/styles.css';
import './images/sands.jpg'
import dayjs from 'dayjs';
dayjs().format();
import { fetchAll } from "./api-calls.js";
import Traveler from "./classes/Traveler.js";
import Trip from "./classes/Trip.js";
import Destination from "./classes/Destination.js";

// - - - - - Global Variables - - - - - //
let travelers, trips, destinations, travelersData, destinationsData, tripsData, randomUserID, currentTraveler;

// - - - - - Query Selectors - - - - - //
const pastTripsDisplay = document.querySelector(".past-trips")
const currentTripsDisplay = document.querySelector(".current-trips")
const upcomingTripsDisplay = document.querySelector(".upcoming-trips")
const yearlySpending = document.querySelector(".yearly-spending")
const welcomeMessage = document.querySelector(".welcome-message")
const todaysDate = document.querySelector(".todays-date")

// - - - - - - Event listeners - - - - - //
window.addEventListener("load", () => {
    randomUserID = makeRandomUser();
    console.log("RANDOM USER ID #", randomUserID)
    getAllData(randomUserID);
    //displayYearlyTripCost();
});

const makeRandomUser = () => {
    return Math.floor(Math.random() * 50);
};

const getAllData = (randomUserID) => {
    fetchAll(randomUserID) 
    .then(data => {
        travelersData = data[0].travelers;
        //console.log("TRAVELERS DATA", travelersData)
        tripsData = data[1].trips;
        //console.log("TRIPS DATA", tripsData)
        destinationsData = data[2].destinations;
        
        //console.log("DESTINATIONS DATA", destinationsData)
        travelers = travelersData.map(trav => new Traveler(trav));
        //console.log("TRAVELERS", travelers)

        trips = tripsData.map(trip => new Trip(tripsData, randomUserID));
        console.log("TRIPS", trips)

        destinations = destinationsData.map(dest => new Destination(dest));
        //console.log("allDestinations", destinations)
        
        loadTravelerInfo();
        nextfunctions();
    });
}

const loadTravelerInfo = () => {
     console.log(travelers)
     currentTraveler = travelers.find(traveler => traveler.id === randomUserID )
     console.log("currentTraveler", currentTraveler)
    
     welcomeMessage.innerText = `Hi ${randomUserID},`;
     todaysDate.innerText = `${dayjs(Date.now()).format('dddd, MMMM D, YYYY')}`;
     //displayYearlyTripCost();
};


const displayYearlyTripCost = () => {
    yearlySpending.innerText = `$${tripsData.getYearsTripCost(destinationsData)}`;
};



