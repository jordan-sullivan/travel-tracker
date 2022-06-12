//Global Variables//
let apiTravelersData, apiTripsData, apiDestinationsData;

//Query Selectors//
//const postError = document.querySelector(".error");

//Functions//
const fetchData = (dataSet) => {
    return fetch(`http://localhost:3001/api/v1/${dataSet}`)
        .then((response) => response.json())
        //.catch((error) => console.log(dataSet))
};

export const fetchAll = () => {
    apiTravelersData = fetchData("travelers");
    //apiSingleTravelerData = fetchData("travelers/23");
    apiTripsData = fetchData("trips");
    apiDestinationsData = fetchData("destinations");
    return Promise.all([
        apiTravelersData,
        //apiSingleTravelerData,
        apiTripsData,
        apiDestinationsData,
    ]);
};

// export const postAll = (formData => {
//     postHydration(formData);
//     postSleep(formData);
//     postActivity(formData);
// });

// const postHydration = (formData) => {
//     fetch("http://localhost:3001/api/v1/hydration", {
//         method: "POST",
//         body: JSON.stringify({
//             userID: formData.id, date: formData.date, numOunces: formData.numberOunces
//         }),
//         headers: { "Content-type": "application/json" },
//     })
//         .then(res => throwError(res))
//         .then(json => reloadData())
//         .catch(error => {
//             console.warn(error.message)
//             displayErrorMessage(error)
//         })
// };

// const postSleep = (formData) => {
//     fetch("http://localhost:3001/api/v1/sleep", {
//         method: "POST",
//         body: JSON.stringify({
//             userID: formData.id, date: formData.date, hoursSlept: formData.hoursSlept, sleepQuality: formData.sleepQuality
//         }),
//         headers: { "Content-type": "application/json" },
//     })
//         .then(res => throwError(res))
//         .then(json => reloadData())
//         .catch(error => {
//             console.warn(error.message)
//             displayErrorMessage(error)
//         })
// };

// const postActivity = (formData) => {
//     fetch("http://localhost:3001/api/v1/activity", {
//         method: "POST",
//         body: JSON.stringify({
//             userID: formData.id, date: formData.date, flightsOfStairs: formData.flights, minutesActive: formData.mins,
//             numSteps: formData.steps
//         }),
//         headers: { "Content-type": "application/json" },
//     })
//         .then(res => throwError(res))
//         .then(json => reloadData())
//         .catch(error => {
//             console.warn(error.message)
//             displayErrorMessage(error)
//         })
// };

// const throwError = (res) => {
//     if (!res.ok) {
//         throw new Error("Please make sure all fields are filled out.");
//     } else {
//         return res.json();
//     };
// };

// const displayErrorMessage = (error) => {
//     if (error.message === "Failed to fetch") {
//         return postError.innerText = "OOPS something went wrong";
//     } else {
//         return postError.innerText = error.message;
//     };
//};
