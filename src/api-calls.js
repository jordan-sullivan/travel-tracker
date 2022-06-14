const fetchAPIData = (type) => {
    return fetch(`http://localhost:3001/api/v1/${type}`)
        .then(response => response.json())
        .catch(err => displayError(err))
}

const fetchSingleTraveler = (id) => {
    return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
        .then(response => response.json())
        .catch(err => displayError(err))
}

const fetchAll = () => {
    return Promise.all([
        fetchAPIData('travelers'),
        
        fetchAPIData('trips'),
        fetchAPIData('destinations'),
        fetchSingleTraveler('2')
    ])
        .catch(err => displayError(err))
}

const postNewTrip = (newTrip) => {
    return fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(newTrip),
        headers: {
            "Content-Type":"application/json"
        }
    })
    .then(response => response.json())
    .catch(err => displayError(err))
}

const displayError = (errMsg) => {
    const bookingError = document.getElementById('bookingError');
    const msg = errMsg.message === 'Failed to fetch' ?
        "An error has occured. Please try again later." : errMsg;
    bookingError.innerText = `An error has occured, please try again later.`;
}

export { fetchAll, postNewTrip }