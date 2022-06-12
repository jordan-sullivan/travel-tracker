import './css/styles.css';
import './images/sands.jpg'
import dayjs from 'dayjs';
dayjs().format();
import { fetchAll } from "./api-calls.js";

// Global Variables //
let travelersData, destinationsData, tripsData, singleTravelerData;

//Event listeners//
window.addEventListener("load", () => {
    getAllData(userID);
});

const getAllData = (userID) => {
        fetchAll(userID)
            .then(data => {
                travelersData = data[0].travelers;
                tripsData = data[1].trips;
                destinationsData = data[2].destinations;
                singleTravelerData = data[3];

                traveler = new Traveler(singleTravelerData)
                travelers = travelersData.map(trav => new Traveler(trav));
                allTrips = tripsData.map(trip => new Trip(trip));
                allDestinations = destinationsData.map(dest => new Destination(dest));
            })
    }

