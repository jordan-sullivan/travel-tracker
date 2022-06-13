import './css/styles.css';
import './images/sands.jpg'
import dayjs from 'dayjs';
dayjs().format();
import { fetchAll } from "./api-calls.js";
import Traveler from "./classes/Traveler.js";
import Trip from "./classes/Trip.js";
import Destination from "./classes/Destination.js";

// - - - - - Global Variables - - - - - //
let travelers, trips, destinations, travelersData, destinationsData, tripsData; 
let randomUserID, currentTraveler;

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
});

const makeRandomUser = () => {
    return Math.floor(Math.random() * 50);
};

const getAllData = (randomUserID) => {
    fetchAll(randomUserID) 
    .then(data => {
        travelersData = data[0].travelers;
        tripsData = data[1].trips;
        destinationsData = data[2].destinations;
        travelers = travelersData.map(trav => new Traveler(trav));
        trips = tripsData.map(trip => new Trip(tripsData, randomUserID));
        destinations = destinationsData.map(dest => new Destination(dest));
        loadTravelerInfo();
        //nextfunctions();
    });
}
//displayYearlyTripCost();

const loadTravelerInfo = () => {
    //console.log(travelers)
    currentTraveler = travelers.find(traveler => traveler.id === randomUserID )
    console.log("currentTraveler", currentTraveler)
    
    
     welcomeMessage.innerText = `Hi ${currentTraveler.returnFirstName()},`;
     todaysDate.innerText = `${dayjs(Date.now()).format('dddd, MMMM D, YYYY')}`;
     //displayYearlyTripCost();
};


const displayYearlyTripCost = () => {
    yearlySpending.innerText = `$${tripsData.getYearsTripCost(destinationsData)}`;
};



