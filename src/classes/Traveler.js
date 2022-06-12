class Traveler {
    constructor(travelersData) {
        this.id = travelersData.id;
        this.name = travelersData.name;
        this.travelerType = travelersData.travelerType;
    }
    returnFirstName() {
        const firstName = this.name.split(" ")[0];
        return firstName;
    }
}

export default Traveler;