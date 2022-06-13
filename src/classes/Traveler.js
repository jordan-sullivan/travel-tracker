import Trip from "./Trip"

// class Traveler {
//     constructor(travelersData) {
//         this.id = travelersData.id;
//         this.name = travelersData.name;
//         this.travelerType = travelersData.travelerType;
//         this.allTrips = []; 
//     }

//     returnFirstName() {
//         const firstName = this.name.split(" ")[0];
//         return firstName;
//     }

//     listAllTrips(tripsData) {
//         tripsData.forEach(trip => {
//             if (this.id === trip.userID) {
//                 this.allTrips.push(new Trip(trip));
//             };
//         })
//     };
// }

class Traveler {
    constructor(singleTraveler) {
        this.id = singleTraveler.id;
        this.name = singleTraveler.name;
        this.travelerType = singleTraveler.travelerType;
        this.username = `customer${singleTraveler.id}`;
        this.trips = [];
        this.amountSpent = 0;
    }

    sortTrips() {
        this.trips.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });
    }

    findTrips(tripsData, destinationsData) {
        tripsData.forEach(trip => {
            if (trip.userID === this.id) {
                this.trips.push(new Trip(trip));
            }
        });
        this.trips.forEach(trip => trip.getTripTimeStamps());
        this.trips.forEach(trip => trip.calculateTripCost(destinationsData));
        this.sortTrips();
    }

    findPastTrips(todayDate) {
        const todayTimeStamp = new Date(todayDate).getTime();
        const pastTrips = this.trips.filter(trip => trip.endDateTimeStamp < todayTimeStamp);
        return pastTrips;
    }

    findPresentTrips(todayDate) {
        const todayTimeStamp = new Date(todayDate).getTime();
        const presentTrips = this.trips.filter(trip => trip.startDateTimeStamp <= todayTimeStamp && trip.endDateTimeStamp >= todayTimeStamp);
        return presentTrips;
    }

    findUpcomingTrips(todayDate) {
        const todayTimeStamp = new Date(todayDate).getTime();
        const upcomingTrips = this.trips.filter(trip => trip.startDateTimeStamp > todayTimeStamp);
        return upcomingTrips;
    }

    findPendingTrips() {
        const pendingTrips = this.trips.filter(trip => trip.status === 'pending');
        return pendingTrips;
    }

    calculateTotalAmountSpent(todayDate, destinationsData) {
        const currentYear = todayDate.toString().split(' ')[3];
        this.amountSpent = this.trips.reduce((sum, trip) => {
            let tripYear = trip.date.split('/')[0];
            if (tripYear === currentYear) {
                sum += trip.calculateTripCost(destinationsData);
            }
            return sum;
        }, 0)
    }

}

export default Traveler;