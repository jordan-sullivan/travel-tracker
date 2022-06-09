const expect = chai.expect;
import chai from 'chai';
import Traveler from "../src/classes/Traveler";
//import Destination from "../src/classes/Destination";
import Trip from "../src/classes/Trip";
import { travelersData, tripData, destinations } from "./sample-test-data"


describe("Trip", () => {
    let traveler20, traveler23, trip169, trip114, trip56, trip57, trip45;

    beforeEach(() => {
        traveler20 = new Traveler(travelersData[0]);
        traveler23 = new Traveler(travelersData[3]);

        trip169 = new Trip(tripData[0]);
        trip114 = new Trip(tripData[1]);
        trip56 = new Trip(tripData[2]);
        trip57 = new Trip(tripData[3]);
        trip45 = new Trip(tripData[4]);
    });

    it("should be a function", () => {
        expect(Trip).to.be.a("function");
    });

    it("should be an instance of Trip", () => {
        expect(trip169).to.be.an.instanceof(Trip)
        expect(trip45).to.be.an.instanceof(Trip);
    });

    // it("should represent a single traveler's trips", () => {
    //     expect(traveler22.nomad).to.deep.equal({
    //         id: 22,
    //         name: "Gus Courtenay"
    //         travelerType: "foodie"
    //     })
    // });

    // it("should store a single traveler's information", () => {
    //     expect(traveler23.id).to.deep.equal(23);
    //     expect(traveler23.name).to.equal("Welsh Giffin");
    //     expect(traveler23.travelerType).to.equal("thrill-seeker");
    // });
});