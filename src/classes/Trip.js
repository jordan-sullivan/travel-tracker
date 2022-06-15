import dayjs from "dayjs"
import Destination from "./Destination"

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