import dayjs from "dayjs"
class Trip {
    constructor(tripData, userID) {
        this.allTripData = tripData;
        this.travelerTripData = tripData.filter(trip => trip.userID === userID);
        this.tripID = tripData.id;
        this.userID = tripData.userID;
        this.destinationID = this.travelerTripData.map(trip => trip.destinationID);
        this.date;
        this.todaysDate;
        this.travelers = tripData.travelers;
        this.duration = tripData.duration;
        this.status = tripData.status;
    }

    getSingleTripCost(tripID, lodgingCost, flightCost) {
        const singleTrip = this.travelerTripData.find(trip => trip.id === tripID);
        const lodgingCostPerDay = singleTrip.duration * lodgingCost;
        const flightCostPerPerson = singleTrip.travelers * flightCost;
        const totalTripCost = lodgingCostPerDay + flightCostPerPerson;
        const includingAgentsFee = totalTripCost * 1.1
        return parseInt(includingAgentsFee.toFixed(2))
    }

    getYearsTripCost(destinationsData) {
        const currentYearsTrips = this.travelerTripData.filter(trip => trip.date.includes("2022"));
        let yearlyTripTotal = destinationsData.reduce((sum, currentDestination) => {
            currentYearsTrips.forEach(trip => {
                if (trip.destinationID === currentDestination.id) {
                    sum += trip.duration * currentDestination.estimatedLodgingCostPerDay;
                    sum += trip.travelers * currentDestination.estimatedFlightCostPerPerson;
                }
            })
            return sum;
        }, 0);
        let agentsFee = 1.1 * yearlyTripTotal;
        return Math.round(agentsFee);
    }

    getPastTrips() {
        //const singleTrips = this.travelerTripData.filter(trip => trip.id === tripID);
        //if the trip date is before the current date, then it is a past trip, 
        //put it in that array
        const pastTrips = this.travelerTripData
        .filter(trip => dayjs(trip.date)
        // .format("dddd, MMMM D, YYYY")
        .add([trip.duration], "day")
        .isBefore(Date.now()));
        console.log(pastTrips);//empty array-
        return pastTrips
    }


    // getUpcomingTrips(){

    // }

    // getPresentTrips(){

    // }

    // getPendingTrips(){

    // }

}

export default Trip