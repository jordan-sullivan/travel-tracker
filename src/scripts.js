import './css/styles.css';
import './images/sands.jpg'
//import dayjs from 'dayjs';
//dayjs().format();
import { fetchAll } from "./api-calls.js";
import Traveler from "./classes/Traveler.js";
import Trip from "./classes/Trip.js";
import Destination from "./classes/Destination.js";

//Global Variables//
let traveler, travelers;
let allDestinations, allTrips;
let date = new Date();
let fetchSingleTravelerData, fetchTravelersData, fetchTripsData, fetchDestinationsData;


// Query Selectors //
let navButtons = document.querySelectorAll(".nav-btn")
//let allTripBtn = document.getElementById("allTrips")


//Event Lsisterners//
window.addEventListener("load", function () {
    fetchAll()
    .then(data => {
        fetchTravelersData = data[0].travelers;
        //console.log(fetchTravelersData);
        fetchTripsData = data[1].trips;
        // console.log(fetchTripsData);
        fetchDestinationsData = data[2].destinations;
        // console.log(fetchDestinationsData);
        fetchSingleTravelerData = new Traveler(data[3]);
        //console.log("Single TravelerData", fetchSingleTravelerData);
        traveler = fetchSingleTravelerData;
        travelers = fetchTravelersData.map(trav => new Traveler(trav));
        allTrips = fetchTripsData.map(trip => new Trip(trip));
        allDestinations = fetchDestinationsData.map(dest => new Destination(dest));
        renderTraveler()
    })
    .catch(err => displayError(err))
    navButtons.forEach(button => button.addEventListener('click', renderCards))
})

const renderTraveler = () => {
    traveler.findTrips(allTrips, allDestinations);
    traveler.calculateTotalAmountSpent(date, allDestinations);
    displayTravelerInfo();
}

const displayTravelerInfo = () => {
    displayTravelerName(traveler);
    displayYearlyTotal(traveler.amountSpent);
    displayCardSectionHeader('ALL TRIPS');
    displayTripCards(traveler.trips, allDestinations);
}

const renderCards = (event) => {
    let btnID = event.target.id;
    let trips, cardHeader;
    if (btnID === 'all') {
        cardHeader = 'ALL TRIPS';
        trips = traveler.trips;
    }
    if (btnID === 'past') {
        cardHeader = 'PAST TRIPS';
        trips = traveler.findPastTrips(date);
        console.log('pasttrips', trips);
    }
    if (btnID === 'present') {
        cardHeader = 'PRESENT TRIPS';
        trips = traveler.findPresentTrips(date);
        console.log('presenttrips', trips);
    }
    if (btnID === 'future') {
        cardHeader = 'FUTURE TRIPS';
        trips = traveler.findUpcomingTrips(date);
        console.log('futuretrips', trips);
    }
    if (btnID === 'pending') {
        cardHeader = 'PENDING TRIPS'
        trips = traveler.findPendingTrips();
        console.log('pendingtrips', trips);
    }
    displayCardSectionHeader(cardHeader)
    displayTripCards(trips, allDestinations)
}

const displayTravelerName = (traveler) => {
    const greetingMsg = document.getElementById('greetingMsg');
    const firstName = traveler.name.split(' ')[0];
    greetingMsg.innerText = `Hi ${firstName},`;
}

const displayYearlyTotal = (total) => {
    const totalSpent = document.getElementById('totalSpent');
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    if (total !== 0) {
        totalSpent.innerText = `${formatter.format(total)}`;
    } else {
        totalSpent.innerText = '$0 spent in 2022';
    }
}

const displayCardSectionHeader = (header) => {
    const newHeader = document.getElementById('tripCardsHeader')
    newHeader.innerText = `${header}`;
}

const displayTripCards = (travelerTrips, allDestinations) => {
    let cardContainer = document.getElementById('tripCardsContainer')
    cardContainer.innerHTML = '';

    if (travelerTrips.length > 0) {
        travelerTrips.forEach(trip => {
            let destination = allDestinations.find(dest => dest.id === trip.destinationID)
            let splitDate = trip.date.split('/');
            let updateDate = `${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`;
            let cardInfo = `
          <article class="trip-card">
            <div class="img-wrapper">
              <h3 class="destination-name">${destination.destination}</h3>
              <img class="trip-img" src=${destination.image} alt=${destination.alt}>
            </div>
            <p>trip date: ${updateDate}</p>
            <p>travelers: ${trip.travelers}</p>
            <p>duration: ${trip.duration}</p>
            <p>status: ${trip.status}</p>
          </article>`;
            cardContainer.insertAdjacentHTML('beforeend', cardInfo);
        });
    } else {
        cardContainer.innerHTML = `<article class='no-trip'>There are no trips that match this description, sorry.</article>`
    }
}


