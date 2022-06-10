class Trip {
    constructor(tripData, userID) {
        this.allTripData = tripData;
        this.travelerTripData = tripData.filter(trip => trip.userID === userID);
        this.tripID = tripData.id;
        this.userID = tripData.userID;
        console.log("UserID", userID)
        this.destinationID = this.travelerTripData.map(trip => trip.destinationID);
        console.log("destID", this.destinationID);
        this.travelers = tripData.travelers;
        this.date = tripData.date;
        this.duration = tripData.duration;
        this.status = tripData.status;
    }

}

export default Trip