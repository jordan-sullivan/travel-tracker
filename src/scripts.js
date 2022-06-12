import './css/styles.css';
import './images/sands.jpg'
import dayjs from 'dayjs';
dayjs().format();
import { fetchAll } from "./api-calls.js";
import Traveler from "./classes/Traveler.js";
import Trip from "./classes/Trip.js";

// Global Variables //
let travelersData, destinationsData, tripsData;

//Event listeners//
window.addEventListener("load", () => {
    getAllData();
});

const getAllData = () => {
        fetchAll()
            .then(data => {
               const travelersData = data[0].travelers;
                const tripsData = data[1].trips;
                const destinationsData = data[2].destinations;
                //const singleTravelerData = data[3].travelers;

                //const traveler = new Traveler(travelersData)
                //console.log("traveleRR", traveler)//just a sad object of undefined-ness

                const travelers = travelersData.map(trav => new Traveler(trav));
                console.log("travelers", travelers) // array of all 50 Travelers

                //const allTrips = tripsData.map(trip => new Trip(trip));
                //console.log("allTrips", allTrips);
                //const allDestinations = destinationsData.map(dest => new Destination(dest));
            })
    }

