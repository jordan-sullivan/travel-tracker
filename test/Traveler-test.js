const expect = chai.expect;
import chai from 'chai';
import Traveler from "../src/classes/Traveler";
//import Destination from "../src/classes/Destination";
import Trip from "../src/classes/Trip";
import { travelersData, tripData, destinations } from "./sample-test-data"

describe ("Traveler", () => {
    let traveler20, traveler21, traveler22, traveler23, trips;

    beforeEach(() => {
        traveler20 = new Traveler(travelersData[0]);
        traveler21 = new Traveler(travelersData[1]);
        traveler22 = new Traveler(travelersData[2]);
        traveler23 = new Traveler(travelersData[3]);

        trips = new Trip(tripData);
    });

    
    it("should be a function", () => {
        expect(Traveler).to.be.a("function");
    });

    it("should be an instance of Traveler", () => {
        expect(traveler21).to.be.an.instanceof(Traveler)
        expect(traveler23).to.be.an.instanceof(Traveler);
    });

    // it("should represent a single traveler's data", () => {
    //     expect(traveler22.nomad).to.deep.equal({
    //         id: 22,
    //         name: "Gus Courtenay",
    //         travelerType: "foodie"
    //     })
    // });

    it("should store a single traveler's information", () => {
        expect(traveler23.id).to.deep.equal(23);
        expect(traveler23.name).to.equal("Welsh Giffin");
        expect(traveler23.travelerType).to.equal("thrill-seeker");
    });


    // it("should be able to store a traveler's specific trip data", () => {
    //     expect(tripData).to.deep.equal()
    // });


    it("should be able to return a traveler's first name", () => {
        expect(traveler20.returnFirstName()).to.equal("Gregg");
        expect(traveler23.returnFirstName()).to.equal("Welsh");
    });

})