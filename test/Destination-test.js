import { expect } from "chai";
import { destinationsData } from "../test/sample-test-data";
import Destination from '../src/classes/Destination';


describe('Destination', () => {
    let destination15, destination9, destination50;

    beforeEach(() => {
        destination15 = new Destination(destinationsData[0]);
        destination9 = new Destination(destinationsData[1]);
        destination50 = new Destination(destinationsData[2])
    });

    it("should be a function", () => {
        expect(Destination).to.be.a('function');
    });

    it('should be an instance of Destination', () => {
        expect(destination15).to.be.an.instanceOf(Destination);
        expect(destination9).to.be.an.instanceOf(Destination);
    });

    it('should have an id', () => {
        expect(destination15.id).to.equal(15);
        expect(destination50.id).to.equal(50);
    });

    it('should have a destination', () => {
        expect(destination15.destination).to.equal("Manila, Philippines");
        expect(destination9.destination).to.equal("Amsterdam, Netherlands");
    });

    it('should have an estimated lodging cost per day', () => {
        expect(destination15.estimatedLodgingCostPerDay).to.equal(40);
        expect(destination9.estimatedLodgingCostPerDay).to.equal(100);
    });

    it('should have an estimated flight cost per person', () => {
        expect(destination15.estimatedFlightCostPerPerson).to.equal(900);
        expect(destination50.estimatedFlightCostPerPerson).to.equal(75);
    });

    it('should have an image source', () => {
        expect(destination9.image).to.equal("https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
    });

    it('should have an image alt description', () => {
        expect(destination9.alt).to.equal('canal with boats and trees and buildings along the side');
        expect(destination50.alt).to.equal('person sitting on brown rock in front of small body of water');
    });
});