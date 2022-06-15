const expect = chai.expect;
import chai from 'chai';
import Traveler from "../src/classes/Traveler";
//import Destination from "../src/classes/Destination";
import Trip from "../src/classes/Trip";
import { travelersData, tripData, destinationsData } from "./sample-test-data"


describe("Trip", () => {
    let trip169, trip114, trip56, trip57;

    beforeEach(() => {

        trip169 = new Trip(tripData[0]);
        trip114 = new Trip(tripData[1]);
        trip56 = new Trip(tripData[2]);
        trip57 = new Trip(tripData[3]);
    });

    it("should be a function", () => {
        expect(Trip).to.be.a("function");
    });

    it("should be an instance of Trip", () => {
        expect(trip56).to.be.an.instanceof(Trip);
        expect(trip57).to.be.an.instanceof(Trip);
    });

    it('should have an id', () => {
        expect(trip169.id).to.equal(169);
        expect(trip114.id).to.equal(114);
    });

    it("should have a user ID", () => {
        expect(trip169.userID).to.equal(23);
        expect(trip114.userID).to.equal(23);
    });

    it("should have a destination ID", () => {
        expect(trip169.destinationID).to.equal(15);
        expect(trip56.destinationID).to.equal(21);
        expect(trip57.destinationID).to.equal(17);
    });

    it("should have a total number of travelers", () => {
        expect(trip169.travelers).to.equal(1);
        expect(trip57.travelers).to.equal(2);
    });

    it('should be able to get a start date time stamp', () => {
        trip169.getTripTimeStamps();
        expect(trip169.startDateTimeStamp).to.equal(1641970800000);
    });

    it('should be able to get an end date time stamp', () => {
        trip56.getTripTimeStamps();
        expect(trip56.endDateTimeStamp).to.equal(1659420000000);
    });

    it("should calculate the cost of a single traveler's trip including a 10% agent fee", () => {
        expect(trip169.calculateTripCost(destinationsData)).to.equal(1738.00);
        expect(trip114.calculateTripCost(destinationsData)).to.equal(2915.00);
    });


})
