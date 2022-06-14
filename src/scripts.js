import './css/styles.css';
import './images/sands.jpg'
//import dayjs from 'dayjs';
//dayjs().format();
import { fetchAll, postNewTrip } from "./api-calls.js";
import Traveler from "./classes/Traveler.js";
import Trip from "./classes/Trip.js";
import Destination from "./classes/Destination.js";

//Global Variables//
let traveler, travelers, allDestinations, allTrips;
let fetchSingleTravelerData, fetchTravelersData, fetchTripsData, fetchDestinationsData;
let date = new Date();

// Query Selectors //
let clickToBook = document.getElementById('clickToBook')
let bookForm = document.getElementById('bookingForm')
let mainPage = document.getElementById('mainPage')
let estimatedTripCostBtn = document.getElementById('costBtn')
const bookButton = document.querySelector(".book-btn")

let navButtons = document.querySelectorAll(".nav-btn");
let allTripBtn = document.getElementById("allTrips");

window.addEventListener('load', function () {
    getAllData();
    navButtons.forEach(button => button.addEventListener('click', loadCards))
});

//Event Listeners//

// estimatedTripCostBtn.addEventListener('click', function () {
//     showTripCosts(event)
// });
// closeCostModal.addEventListener('click', function() {
//   closeModalWindow(event)
// });
bookButton.addEventListener('click', function() {
  bookNewTrip(event);
});
// closeBookModal.addEventListener('click', function() {
//   closeBookWindow(event)
// });

const getAllData = () => {
    fetchAll()
    .then(data => {
        fetchTravelersData = data[0].travelers;
        fetchTripsData = data[1].trips;
        fetchDestinationsData = data[2].destinations;
        fetchSingleTravelerData = new Traveler(data[3]);
        traveler = fetchSingleTravelerData;
        travelers = fetchTravelersData.map(trav => new Traveler(trav));
        allTrips = fetchTripsData.map(trip => new Trip(trip));
        allDestinations = fetchDestinationsData.map(dest => new Destination(dest));
        loadTravelerData()
    })
    .catch(err => displayError(err))
}

const loadTravelerData = () => {
    traveler.findTrips(allTrips, allDestinations);
    traveler.calculateTotalAmountSpent(date, allDestinations);
    displayTravelerInfo();
};

const displayTravelerInfo = () => {
    displayTravelerName(traveler);
    displayYearlyTotal(traveler.amountSpent);
    displayCardSectionHeader("ALL TRIPS");
    displayTripCards(traveler.trips, allDestinations);
};

const loadCards = (event) => {
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
};

const displayTravelerName = (traveler) => {
    const greetingMsg = document.querySelector('.main-title');
    const firstName = traveler.name.split(' ')[0];
    greetingMsg.innerText = ` ✈ ${firstName}'s travel tracker`;
};

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
};

const displayCardSectionHeader = (header) => {
    const newHeader = document.getElementById('tripCardsHeader')
    newHeader.innerText = `${header}`;
};

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
            <p> ✧ trip date: ${updateDate}</p>
            <p> ✧ for ${trip.duration} days</p>
            <p> ✧ travelers: ${trip.travelers} people</p>
            <p> ✦ status: ${trip.status}</p>
            </article>`;
            cardContainer.insertAdjacentHTML('beforeend', cardInfo);
        });
    } else {
        cardContainer.innerHTML = `<article class='no-trip'>There are no trips that match this description, sorry.</article>`
    }
};

// Booking Form / POST Functions //
const showBookingForm = () => {
    toggleView(bookForm)
    loadPlacesDropdown(allDestinations)
};

const toggleView = (element) => {
    element.classList.toggle('hidden')
};

const loadPlacesDropdown = (allDestinations) => {
    const placesDropdown = document.getElementById('destinationChoices')
    let destNames = allDestinations.sort((a, b) => a.destination.localeCompare(b.destination))
    destNames.forEach(place => {
        let destSelect = `
        <option class='form-fields' value='${place.id}' required>${place.destination}</option>`
        placesDropdown.insertAdjacentHTML('beforeend', destSelect)
       
    });
};

const showTripCosts = (event) => {
    event.preventDefault()
    const formTripData = loadFormValues();
    const newTrip = new Trip(formTripData)
    const formFields = checkFormFields(newTrip);
    if (!formFields) {
        alert('Please check to make sure all fields are filled out and departure date is a future date.')
    } else {
        const tripCost = newTrip.calculateTripCost(allDestinations)
        const perPerson = newTrip.calculateCostPerPersonPerTrip(tripCost)
        displayTripCostsModal(tripCost, perPerson)
    }
};

const loadFormValues = () => {
    const destinationID = document.getElementById('destinationChoices').value;
    const departureDate = document.getElementById('departureDateInput').value;
    const changeDate = departureDate.split('-');
    const fixedDate = changeDate.join('/');
    const tripLength = document.getElementById('durationInput').value;
    const numOfTravelers = document.getElementById('travelersInput').value;
    let postTripObject = {
        "id": allTrips.length + 1,
        "userID": traveler.id,
        "destinationID": parseInt(destinationID),
        "travelers": parseInt(numOfTravelers),
        "date": fixedDate,
        "duration": parseInt(tripLength),
        "status": "pending",
        "suggestedActivities": []
    }
    return postTripObject;
};

const checkFormFields = (newTrip) => {
    const departureDate = document.getElementById('departureDateInput').value;
    const changeDate = departureDate.split('-');
    const fixedDate = changeDate.join('/');
    const checkDate = new Date(fixedDate).getTime();
    let filledOut = true;
    if (!newTrip.destinationID || !newTrip.date || !newTrip.duration || !newTrip.travelers || checkDate < date) {
        filledOut = false;
    }
    return filledOut;
};

const displayTripCostsModal = (cost, perPerson) => {
    const costModal = document.getElementById('costModal')
    costModal.classList.remove('hidden');
    costModal.innerHTML = `
    <article class="modal-content" id='modalContent'>
    <span class="close-modal" id="closeModal">&times;</span>
    <div class='trip-costs' id='tripCosts'>
    <label for='trip-cost'>ESTIMATED TRIP COST:</label>
    <p class='trip-cost'>$${cost}</p>
    <label for='trip-cost-per-person'>COST PER PERSON:</label>
    <p class='trip-cost-per-person'>$${perPerson}</p>
    <p class="agent-note">*please note: prices includes a 10% agent fee</p><br><br>
    </div>
    </article>`;
};

const closeModalWindow = (event) => {
    if (event.target.id === 'closeModal') {
        hideModal()
    }
};

const hideModal = () => {
    const costModal = document.getElementById('costModal')
    this.toggleView(costModal)
};

const bookNewTrip = (event) => {
    event.preventDefault()
    const postTripObj = loadFormValues();
    const newTrip = new Trip(postTripObj)
    console.log("NEWTRIP", newTrip)
    const formFields = checkFormFields(newTrip);
    if (!formFields) {
        alert('Please check to make sure all fields are filled out and departure date is today or later.')
    } else {
        postNewTrip(newTrip)
        .then(response => {
            console.log(response.message);
            if (response.message !== '404 error') {
                getAllData(traveler.id);
                displayBookingModal(newTrip, allDestinations);
                //NEED TO MAKE THIS
            } else {
                displayPostErrorModal();
            }
        })
    }
};

// const closeBookWindow = (event) => {
//     //WHAT IS CALLING THJIOS
//     if (event.target.id === 'bookCloseModal') {
//         hideBookingModal()
//         //WHERE IS THIS?
//     }
// }


estimatedTripCostBtn.addEventListener('click', function () {
    showTripCosts(event)
});

clickToBook.addEventListener('click', showBookingForm);

// closeModal.addEventListener('click', function () {
//     closeModalWindow(event)
// });