import Trip from "./Trip"

class Traveler {
    constructor(travelersData) {
        this.id = travelersData.id;
        this.name = travelersData.name;
        this.travelerType = travelersData.travelerType;
        this.allTrips = []; 
    }

    returnFirstName() {
        const firstName = this.name.split(" ")[0];
        return firstName;
    }

    listAllTrips(tripData) {
        tripData.forEach(trip => {
            if (this.id === trip.userID) {
                this.allTrips.push(new Trip(tripData));
            };
        })
        return this.allTrips;
    };
}

export default Traveler;