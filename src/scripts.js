//IMPORTS //

import "./css/styles.css";
//import "./images/sands.jpg"
//import dayjs from "dayjs";
//dayjs().format();
import Traveler from "./classes/Traveler.js";
import Trip from "./classes/Trip.js";
import Destination from "./classes/Destination.js";
import { fetchAll, postNewTrip } from "./api-calls.js";

//GLOBAL VARIABLES//

let traveler, travelers, allDestinations, allTrips;
let fetchSingleTravelerData, fetchTravelersData, fetchTripsData, fetchDestinationsData;
let date = new Date();

// QUERY SELECTORS //

const letsBookATripButton = document.getElementById("letsBookATrip")
const bookForm = document.getElementById("bookingForm")
//const mainPage = document.getElementById("mainPage")
const estimatedTripCostBtn = document.getElementById("costBtn")
const bookButton = document.querySelector(".book-btn")
const closeModal = document.querySelector(".close-modal");
let navButtons = document.querySelectorAll(".nav-btn");
//let allTripBtn = document.getElementById("allTrips");

//EVENT LISTENERS//

window.addEventListener("load", function () {
    getAllData();
    navButtons.forEach(button => button.addEventListener("click", loadCards))
});

bookButton.addEventListener("click", function() {
  bookNewTrip(event);
});

// TRAVELER'S FUNCTIONS //
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
    if (btnID === "all") {
        cardHeader = "ALL TRIPS";
        trips = traveler.trips;
    }
    if (btnID === "past") {
        cardHeader = "PAST TRIPS";
        trips = traveler.findPastTrips(date);
        console.log("pasttrips", trips);
    }
    if (btnID === "present") {
        cardHeader = "PRESENT TRIPS";
        trips = traveler.findPresentTrips(date);
        console.log("presenttrips", trips);
    }
    if (btnID === "future") {
        cardHeader = "FUTURE TRIPS";
        trips = traveler.findUpcomingTrips(date);
        console.log("futuretrips", trips);
    }
    if (btnID === "pending") {
        cardHeader = "PENDING TRIPS"
        trips = traveler.findPendingTrips();
        console.log("pendingtrips", trips);
    }
    displayCardSectionHeader(cardHeader)
    displayTripCards(trips, allDestinations)
};

const displayTravelerName = (traveler) => {
    const greetingMsg = document.querySelector(".main-title");
    const firstName = traveler.name.split(" ")[0];
    greetingMsg.innerText = ` ✈ ${firstName}'s travel tracker`;
};

const displayYearlyTotal = (total) => {
    const totalSpent = document.getElementById("totalSpent");
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    })
    if (total !== 0) {
        totalSpent.innerText = `${formatter.format(total)}`;
    } else {
        totalSpent.innerText = "$0 spent in 2022";
    }
};

const displayCardSectionHeader = (header) => {
    const newHeader = document.getElementById("tripCardsHeader")
    newHeader.innerText = `${header}`;
};

const displayTripCards = (travelerTrips, allDestinations) => {
    let cardContainer = document.getElementById("tripCardsContainer")
    cardContainer.innerHTML = " ";
    if (travelerTrips.length > 0) {
        travelerTrips.forEach(trip => {
            let destination = allDestinations.find(dest => dest.id === trip.destinationID)
            let splitDate = trip.date.split("/");
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
            cardContainer.insertAdjacentHTML("beforeend", cardInfo);
        });
    } else {
        cardContainer.innerHTML = `<article class="no-trip">There are no trips that match this description, sorry.</article>`
    }
};

// BOOKING FORM / POST REQUESTS //
const showBookingForm = () => {
    toggleView(bookForm)
    loadPlacesDropdown(allDestinations)
};

const loadPlacesDropdown = (allDestinations) => {
    const placesDropdown = document.getElementById("destinationChoices")
    let destNames = allDestinations.sort((a, b) => a.destination.localeCompare(b.destination))
    destNames.forEach(place => {
        let destSelect = `
        <option class="form-fields" value="${place.id}" required>${place.destination}</option>`
        placesDropdown.insertAdjacentHTML("beforeend", destSelect)
       
    });
};

const showTripCosts = (event) => {
    event.preventDefault()
    const formTripData = loadFormValues();
    const newTrip = new Trip(formTripData)
    const formFields = checkFormFields(newTrip);
    if (!formFields) {
        alert("Please check to make sure all fields are filled out and departure date is a future date.")
    } else {
        const tripCost = newTrip.calculateTripCost(allDestinations)
        const perPerson = newTrip.calculateCostPerPersonPerTrip(tripCost)
        displayTripCostsModal(tripCost, perPerson)
    }
};

const loadFormValues = () => {
    const destinationID = document.getElementById("destinationChoices").value;
    const departureDate = document.getElementById("departureDateInput").value;
    const changeDate = departureDate.split("-");
    const fixedDate = changeDate.join("/");
    const tripLength = document.getElementById("durationInput").value;
    const numOfTravelers = document.getElementById("travelersInput").value;
    let postedTrip = {
        "id": allTrips.length + 1,
        "userID": traveler.id,
        "destinationID": parseInt(destinationID),
        "travelers": parseInt(numOfTravelers),
        "date": fixedDate,
        "duration": parseInt(tripLength),
        "status": "pending",
        "suggestedActivities": []
    }
    return postedTrip;
};

// MODAL & FORM FUNCTIONS //

const checkFormFields = (newTrip) => {
    const departureDate = document.getElementById("departureDateInput").value;
    const changeDate = departureDate.split("-");
    const fixedDate = changeDate.join("/");
    const checkDate = new Date(fixedDate).getTime();
    let filledOut = true;
    if (!newTrip.destinationID || !newTrip.date || !newTrip.duration || !newTrip.travelers || checkDate < date) {
        filledOut = false;
    }
    return filledOut;
};

const displayTripCostsModal = (cost, perPerson) => {
    const costModal = document.getElementById("costModal")
    costModal.classList.remove("hidden");
    costModal.innerHTML = `
    <article class="modal-content" id="modalContent">
    <button class="close-modal" id="closeModal">&times;</button>
    <div class="trip-costs" id="tripCosts">
    <label for="trip-cost">ESTIMATED TRIP COST:</label>
    <p class="trip-cost">$${cost}</p>
    <label for="trip-cost-per-person">COST PER PERSON:</label>
    <p class="trip-cost-per-person">$${perPerson}</p>
    <p class="agent-note">*please note: prices includes a 10% agent fee</p><br><br>
    </div>
    </article>`;
};

// const closeModalWindow = (event) => {
//     if (event.target.id === "closeModal") {
//         hideModal()
//     }
// };

// const hideModal = () => {
//     const costModal = document.getElementById("costModal")
//     this.toggleView(costModal)
// };

const bookNewTrip = (event) => {
    event.preventDefault();
    const postData = loadFormValues();
    const newTrip = new Trip(postData);
    const formFields = checkFormFields(newTrip);
    if (!formFields) {
        alert("Please fill out all fields and check that departure date is today or later.")
    } else {
        postNewTrip(newTrip)
        .then(response => {
            console.log(response.message);
            if (response.message !== "404 error") {
                getAllData(traveler.id);
                displayBookingModal(newTrip, allDestinations);
            } else {
                displayPostErrorMessage();
            }
        })
    }
};

const displayBookingModal = (newTrip, allDestinations) => {
    const dest = findBookedDestination(newTrip, allDestinations);
    const bookModal = document.getElementById("bookModal");
    toggleView(bookModal)
    bookModal.innerHTML = `
    <article class="book-modal-content" id="bookModalContent">
    <button class="close-modal" id="bookCloseModal">&times;</button>
      <div class="booking-confirm-msg">
        <label for="booking-msg" class="booking-msg">YOUR VACATION TO:</label>
        <p class="booking-msg-info">${dest.destination} for ${newTrip.duration} days</p>
        <label for="booking-msg" class="booking-msg">has been booked and is being reviewed by your travel agent.</label>
      </div>
    </article>`;
    //need to move this below to happen when we click out of x for confirmation modal 
    let cardHeader = "PENDING TRIPS"
    displayCardSectionHeader(cardHeader)
}; 

const findBookedDestination = (newTrip, allDestinations) => {
    const matchedDest = allDestinations.find(d => d.id === newTrip.destinationID)
    return matchedDest;
};

// const formFields = () => {
//     const bookingForm = document.getElementById("bookingForm")
//     bookingForm.reset();
// };

const displayPostErrorMessage = () => {
    const bookingError = document.getElementById("bookingError");
    const bookingForm = document.getElementById("bookingForm")
    bookingError.innerText = "Unable to connect. Please try again later.";
    setTimeout(() => {
        toggleView(bookingError);
    }, 4000)
    setTimeout(() => {
        toggleView(bookingForm)
    }, 4000)
};

const toggleView = (element) => {
    element.classList.toggle("hidden")
};

const closeBookWindow = (event) => {
    if (event.target.id === "bookCloseModal") {
        hideBookingModal()
    }
};


estimatedTripCostBtn.addEventListener("click", function () {
    showTripCosts(event)
});

letsBookATripButton.addEventListener("click", showBookingForm);

// closeModal.addEventListener("click", function () {
//     closeModalWindow(event)
// });

const closeModalWindow = (event) =>{
    if (event.target.id === 'closeModal') {
        hideModal()
    }
};

const hideModal = () => {
    const costModal = document.getElementById('costModal')
    toggleView(costModal)
}