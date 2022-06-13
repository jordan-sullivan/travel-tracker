import dayjs from "dayjs"
import Destination from "./Destination"

// class Trip {
//     constructor(singleTrip) {
//         this.id = singleTrip.id;
//         this.userID = singleTrip.userID;
//         this.destinationID = singleTrip.destinationID;
//         this.travelers = singleTrip.travelers;
//         this.date = singleTrip.date;
//         this.duration = singleTrip.duration;
//         this.status = singleTrip.status;
//         this.suggestedActivities = singleTrip.suggestedActivities;
//     };

//     getSingleTripCost(tripID, lodgingCost, flightCost) {
//         //const singleTrip = this.travelerTripData.find(trip => trip.id === tripID);
//         const lodgingCostPerDay = singleTrip.duration * lodgingCost;
//         const flightCostPerPerson = singleTrip.travelers * flightCost;
//         const totalTripCost = lodgingCostPerDay + flightCostPerPerson;
//         const includingAgentsFee = totalTripCost * 1.1
//         return parseInt(includingAgentsFee.toFixed(2))
//     }

//     getYearsTripCost(destinationsData) {
//         const currentYearsTrips = this.travelerTripData.filter(trip => trip.date.includes("2022"));
//         let yearlyTripTotal = destinationsData.reduce((sum, currentDestination) => {
//             currentYearsTrips.forEach(trip => {
//                 if (trip.destinationID === currentDestination.id) {
//                     sum += trip.duration * currentDestination.estimatedLodgingCostPerDay;
//                     sum += trip.travelers * currentDestination.estimatedFlightCostPerPerson;
//                 }
//             })
//             return sum;
//         }, 0);
//         let agentsFee = 1.1 * yearlyTripTotal;
//         return Math.round(agentsFee);
//     }

//     getDestination(destinationData) {
//         const destination = destinationData.find(dest => dest.id === this.destinationID);
//         return new Destination(destination);
//     }

//     getPastTrips() {
//         const pastTrips = this.travelerTripData.filter(trip => dayjs(trip.date).add([trip.duration], "day").isBefore(Date.now()));
//         return pastTrips
//     }


//     getUpcomingTrips() {
//         const upcomingTrips = this.travelerTripData.filter(trip => dayjs(trip.date).add([trip.duration], "day").isAfter(Date.now()));
//         return upcomingTrips
//     }

//     getPresentTrip() {
//         const presentTrip = this.travelerTripData.filter(trip => dayjs(trip.date).add([trip.duration], "day") === (Date.now()));
//         return presentTrip
//     }

//     getPendingTrips() {
//         return this.travelerTripData.filter(trip => trip.status === "pending")
//     }

// }



class Trip {
    constructor(singleTrip) {
        this.id = singleTrip.id;
        this.userID = singleTrip.userID;
        this.destinationID = singleTrip.destinationID;
        this.travelers = singleTrip.travelers;
        this.date = singleTrip.date;
        this.duration = singleTrip.duration;
        this.status = singleTrip.status;
        this.suggestedActivities = singleTrip.suggestedActivities;
        this.startDateTimeStamp = 0;
        this.endDateTimeStamp = 0;
        this.tripCost = 0;
    }

    getTripTimeStamps() {
        const startTime = new Date(this.date).getTime();
        const addedTime = new Date(this.date).getDate() + this.duration;
        const endTime = new Date(this.date).setDate(addedTime);
        this.startDateTimeStamp = startTime;
        this.endDateTimeStamp = endTime;
    }

    calculateTripCost(destinations) {
        const matchedDestination = destinations.find(dest => dest.id === this.destinationID);
        const lodgingTotal = matchedDestination.estimatedLodgingCostPerDay * this.duration;
        const flightTotal = matchedDestination.estimatedFlightCostPerPerson * this.travelers;
        const tripTotal = ((lodgingTotal + flightTotal) * 1.1);
        this.tripCost = ~~(tripTotal)
        return this.tripCost;
    }

    calculateCostPerPersonPerTrip(totalCost) {
        const perPerson = totalCost / this.travelers;
        return ~~(perPerson);
    }
}
export default Trip