const expect = chai.expect;
import chai from 'chai';
import Traveler from "../src/classes/Traveler";
//import Nomad from "../src/classes/Nomad";
//import Destination from "../src/classes/Destination";
//import Trip from "../src/classes/Trip";
import { travelersData, trips, destinations } from "./sample-test-data"

describe ("Traveler", () => {
    let traveler20, traveler21, traveler22, traveler23;

    beforeEach(() => {
        traveler20 = new Traveler(travelersData[0]);
        traveler21 = new Traveler(travelersData[1]);
        traveler22 = new Traveler(travelersData[2]);
        traveler23 = new Traveler(travelersData[3]);

        //tripsData = new Trip(trips);
        //destinationsData = new Destination(destinations)
    });

    
    it("should be a function", () => {
        expect(Traveler).to.be.a("function");
    });

    it("should be an instance of Traveler", () => {
        expect(traveler23).to.be.an.instanceof(Traveler);
    });

    it("should represent a single traveler2 data", () => {
        expect(traveler23.id).to.deep.equal(23);
        expect(traveler23.name).to.equal("Welsh Giffin");
        expect(traveler23.travelerType).to.equal("thrill-seeker");
    });

    // it("should be able to store a traveler2s hydration data", () => {
    //     expect(traveler23.hydrationData).to.deep.equal(hydration);
    // });

    // it("should be able to store a traveler2s sleep data", () => {
    //     expect(traveler23.sleepData).to.deep.equal(sleep);
    // });
    // it("should be able to store a traveler2s activity data", () => {
    //     expect(traveler23.activityData).to.deep.equal(activity);
    // });
    // it("should be able to return a traveler2s first name", () => {
    //     expect(traveler23.returntraveler2irstName()).to.equal("Lani");
    // });
    // it("should be able to return a message if a traveler2has no first name", () => {
    //     expect(traveler22.returntraveler2irstName()).to.equal("Oops it looks like your name is missing from our database");
    // });
})