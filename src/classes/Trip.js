class Trip {
    constructor(tripData, userID) {
        this.allTripData = tripData;
        this.travelerTripData = tripData.filter(trip => trip.userID === userID);
        this.tripID = tripData.id;
        this.userID = tripData.userID;
        this.destinationID = tripData.destinationID
        this.travelers = tripData.travelers;
        this.date = tripData.date;
        this.duration = tripData.duration;
        this.status = tripData.status;
    }

}

export default Trip