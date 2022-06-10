const expect = chai.expect;
import chai from 'chai';
import Traveler from "../src/classes/Traveler";
//import Destination from "../src/classes/Destination";
import Trip from "../src/classes/Trip";
import { travelersData, tripData, destinations } from "./sample-test-data"


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



})