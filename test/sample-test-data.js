export const travelers = [
    {
        id: 20,
        name: "Gregg Tours",
        travelerType: "thrill-seeker"
    },
    {
        id: 21,
        name: "Kevin Sellars",
        travelerType: "shopper"
    },
    {
        id: 22,
        name: "Gus Courtenay",
        travelerType: "foodie"
    },
    {
        id: 23,
        name: "Welsh Giffin",
        travelerType: "thrill-seeker"
    }
];

export const trips = [
    {
        id: 169,
        userID: 23,
        destinationID: 15,
        travelers: 1,
        date: "2020/01/12",
        duration: 17,
        status: "approved",
        suggestedActivities: []
    },
    {
        id: 114,
        userID: 23,
        destinationID: 9,
        travelers: 1,
        date: "2020/03/14",
        duration: 17,
        status: "approved",
        suggestedActivities: []
    },
    {
        id: 10,
        userID: 23,
        destinationID: 50,
        travelers: 6,
        date: "2022/07/23",
        duration: 17,
        status: "approved",
        suggestedActivities: []
    },
    {
        id: 56,
        userID: 23,
        destinationID: 21,
        travelers: 3,
        date: "2022/07/14",
        duration: 19,
        status: "pending",
        suggestedActivities: []
    },
    {
        id: 57,
        userID: 23,
        destinationID: 17,
        travelers: 2,
        date: "2019/07/04",
        duration: 20,
        status: "denied",
        suggestedActivities: []
    },
    {
        id: 45,
        userID: 20,
        destinationID: 15,
        travelers: 1,
        date: "2020/09/06",
        duration: 0,
        status: "denied",
        suggestedActivities: []
    }
];

export const destinations = [
    {
        id: 15,
        destination: "Manila, Philippines",
        estimatedLodgingCostPerDay: 40,
        estimatedFlightCostPerPerson: 900,
        image: "https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "colorful buildings near the water with docked boats"
    },
    {
        id: 9,
        destination: "Amsterdam, Netherlands",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 950,
        image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "canal with boats and trees and buildings along the side"
    },
    {
        id: 50,
        destination: "Hobart, Tasmania",
        estimatedLodgingCostPerDay: 1400,
        estimatedFlightCostPerPerson: 75,
        image: "https://images.unsplash.com/photo-1506982724953-b1fbe939e1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
        alt: "person sitting on brown rock in front of small body of water"
    },
    {
        id: 21,
        destination: "Tulum, Mexico",
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 350,
        image: "https://images.unsplash.com/photo-1501619593928-bef49688c888?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "a donkey standing on the beach"
    },
    {
        id: 17,
        destination: "Jaipur, India",
        estimatedLodgingCostPerDay: 30,
        estimatedFlightCostPerPerson: 1200,
        image: "https://images.unsplash.com/photo-1534758607507-754e582adfa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        alt: "a courtyard with trees and mountain in the distance"
    }
];

