const expect = chai.expect;
import chai from 'chai';
import Traveler from "../src/classes/Traveler";
// import Destination from "./Destination"
import { travelersData, tripData, destinationsData} from "./sample-test-data"

describe ("Traveler", () => {
    let traveler20, traveler21, traveler22, traveler23, date;

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

    it("should store a different single traveler's information", () => {
        expect(traveler22.id).to.deep.equal(22);
        expect(traveler22.name).to.equal("Gus Courtenay");
        expect(traveler22.travelerType).to.equal("foodie");
    });

    it("should store a username for each traveler logging in", () => {
        expect(traveler20.username).to.equal("traveler20");
        expect(traveler21.username).to.equal("traveler21");
        expect(traveler22.username).to.equal("traveler22");
    });

    it("should be able to return a traveler's past trips", () => {
        date = "2022/06/10"
        traveler20.findTrips(tripData, destinationsData);
        const previousTrips = traveler20.findPastTrips(date)
        expect(previousTrips).to.deep.equal([
            {
            "date": "2020/09/06",
            "destinationID": 15,
            "duration": 0,
            "endDateTimeStamp": 1599372000000,
            "id": 45,
            "startDateTimeStamp": 1599372000000,
            "status": "approved",
            "suggestedActivities": [],
            "travelers": 1,
            "tripCost": 990,
            "userID": 20,
         }]
      )
    });

    it("should be able to return a traveler's present trips", () => {
        date = "2022/06/10"
        traveler20.findTrips(tripData, destinationsData);
        const pastTrips = traveler20.findPresentTrips(date)
        expect(pastTrips).to.deep.equal([])
    });

    it("should be able to return a traveler's upcoming trips", () => {
        date = "2022/06/10"
        traveler23.findTrips(tripData, destinationsData);
        const upcomingTrips = traveler23.findUpcomingTrips(date)
        expect(upcomingTrips).to.deep.equal([
            {
            "date": "2022/07/14",
            "destinationID": 21,
            "duration": 19,
            "endDateTimeStamp": 1659420000000,
            "id": 56,
            "startDateTimeStamp": 1657778400000,
            "status": "pending",
            "suggestedActivities": [],
            "travelers": 3,
            "tripCost": 3245,
            "userID": 23,
         }
      ])
    });
})