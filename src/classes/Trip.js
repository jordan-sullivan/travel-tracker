import dayjs from "dayjs"
class Trip {
    constructor(tripData, userID) {
        this.allTripData = tripData;
        this.travelerTripData = tripData.filter(trip => trip.userID === userID);
        this.destinationID = this.travelerTripData.map(trip => trip.destinationID);
        this.tripID = tripData.id;
        this.userID = tripData.userID;
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
        const pastTrips = this.travelerTripData.filter(trip => dayjs(trip.date).add([trip.duration], "day").isBefore(Date.now()));
        return pastTrips
    }


    getUpcomingTrips(){
        const upcomingTrips = this.travelerTripData.filter(trip => dayjs(trip.date).add([trip.duration], "day").isAfter(Date.now()));
        return upcomingTrips
    }

    getPresentTrip(){
    const presentTrip = this.travelerTripData.filter(trip => dayjs(trip.date).add([trip.duration], "day") === (Date.now()));
        return presentTrip
    }

    getPendingTrips(){
    return this.travelerTripData.filter(trip => trip.status === "pending")
    }

}

export default Trip