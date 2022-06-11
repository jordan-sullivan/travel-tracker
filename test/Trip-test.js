const expect = chai.expect;
import chai from 'chai';
import Traveler from "../src/classes/Traveler";
//import Destination from "../src/classes/Destination";
import Trip from "../src/classes/Trip";
import { travelersData, tripData, destinationsData } from "./sample-test-data"


describe("Trip", () => {
    let traveler20, traveler23, traveler20Trips, traveler23Trips;

    beforeEach(() => {
        traveler20 = new Traveler(travelersData[0]);
        traveler23 = new Traveler(travelersData[3]);

        traveler20Trips = new Trip(tripData, 20);
        traveler23Trips = new Trip(tripData, 23);
    });

    it("should be a function", () => {
        expect(Trip).to.be.a("function");
    });

    it("should be an instance of Trip", () => {
        expect(traveler20Trips).to.be.an.instanceof(Trip);
        expect(traveler23Trips).to.be.an.instanceof(Trip);
    });

    it("should find and store all trips for a specific traveler", () => {
        expect(traveler23Trips.travelerTripData.length).to.equal(4);
        expect(traveler20Trips.travelerTripData.length).to.equal(1);
    });

    it("should be able to return a travelers' destination ids of all trips regardless of status", () => {
        expect(traveler23Trips.destinationID).to.deep.equal([15, 9, 21, 17]);
        expect(traveler20Trips.destinationID).to.deep.equal([15]);
    });

    it("should calculate the cost of a single traveler's trip ", () => {
        expect(traveler23Trips.getSingleTripCost(169, 40, 900)).to.equal(1738.00);
        expect(traveler23Trips.getSingleTripCost(114, 100, 950)).to.equal(2915.00);
        expect(traveler23Trips.getSingleTripCost(56, 100, 350)).to.equal(3245.00);
    });

    it("should calculate all trips taken this year for a specific traveler", () => {
        expect(traveler23Trips.getYearsTripCost(destinationsData)).to.equal(4983.00);
        expect(traveler20Trips.getYearsTripCost(destinationsData)).to.equal(0.00);
    });

})
