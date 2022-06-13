// class Destination {
//     constructor(destinationData) {
//         this.id = destinationData.id;
//         this.destination = destinationData.destination;
//         this.estimatedLodgingCostPerDay = destinationData.estimatedLodgingCostPerDay;
//         this.estimatedFlightCostPerPerson = destinationData.estimatedFlightCostPerPerson;
//         this.image = destinationData.image;
//         this.alt = destinationData.alt;
//     };
// };
class Destination {
    constructor(singleDest) {
        this.id = singleDest.id;
        this.destination = singleDest.destination;
        this.estimatedLodgingCostPerDay = singleDest.estimatedLodgingCostPerDay;
        this.estimatedFlightCostPerPerson = singleDest.estimatedFlightCostPerPerson;
        this.image = singleDest.image;
        this.alt = singleDest.alt;
    }
}




export default Destination