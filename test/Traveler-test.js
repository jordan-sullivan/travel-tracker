const expect = chai.expect;
import chai from 'chai';
import Traveler from "../src/classes/Traveler";
import { travelersData} from "./sample-test-data"

describe ("Traveler", () => {
    let traveler20, traveler21, traveler22, traveler23;

    beforeEach(() => {
        traveler20 = new Traveler(travelersData[0]);
        traveler21 = new Traveler(travelersData[1]);
        traveler22 = new Traveler(travelersData[2]);
        traveler23 = new Traveler(travelersData[3]);
    });
    
    it("should be a function", () => {
        expect(Traveler).to.be.a("function");
    });

    it("should be an instance of Traveler", () => {
        expect(traveler21).to.be.an.instanceof(Traveler);
        expect(traveler23).to.be.an.instanceof(Traveler);
    });

    it("should store a single traveler's information", () => {
        expect(traveler23.id).to.deep.equal(23);
        expect(traveler23.name).to.equal("Welsh Giffin");
        expect(traveler23.travelerType).to.equal("thrill-seeker");
    });

    it("should be able to return a traveler's first name", () => {
        expect(traveler20.returnFirstName()).to.equal("Gregg");
        expect(traveler23.returnFirstName()).to.equal("Welsh");
        expect(traveler22.returnFirstName()).to.equal("Gus");
    });

})