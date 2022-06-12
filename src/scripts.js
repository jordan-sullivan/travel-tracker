import './css/styles.css';
import './images/sands.jpg'
import dayjs from 'dayjs';
dayjs().format();
import { fetchAll } from "./api-calls.js";
import Traveler from "./classes/Traveler.js";
import Trip from "./classes/Trip.js";

// Global Variables //
//let travelersData, destinationsData, tripsData;

//Event listeners//
window.addEventListener("load", () => {
    getAllData();
});

const getAllData = () => {
        fetchAll()
            .then(data => {
               const travelersData = data[0].travelers;
               console.log("TRAVELERS DATA", travelersData)

                const tripsData = data[1].trips;
                console.log("TRIPS DATA", tripsData)

                const destinationsData = data[2].destinations;
                console.log("DESTINATIONS DATA", destinationsData)

                //const singleTravelerData = data[3].travelers;
                //console.log("SINGLE TRAVELERS DATA", singleTravelerData)

                //want to make each a new instanciation of 

                //const traveler = new Traveler(travelersData)
                //console.log("traveleRR", traveler)//just a sad object of undefined-ness

                const travelers = travelersData.map(trav => new Traveler(trav));
                console.log("allTravelers", travelers) // array of all 50 Travelers

                //const trips = tripsData.map(trip => new Trip(trip));
                //console.log("allTrips", trips);

                //const allDestinations = destinationsData.map(dest => new Destination(dest));
                //console.log("allDestinations", allDestinations)
            })
    }

