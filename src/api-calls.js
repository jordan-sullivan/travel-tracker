
const fetchAPIData = (dataSet) => {
        return fetch(`http://localhost:3001/api/v1/${dataSet}`)
            .then((response) => response.json())
            //.catch((error) => console.log(error))
    };

    const fetchSingleTraveler = (id) => {
            return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
            .then((response) => response.json())
                .catch(err => console.log(err))
        }
        
    export const fetchAll = (id) => {
            return Promise.all([
                fetchAPIData("travelers"),
                fetchAPIData("trips"),
                fetchAPIData("destinations"),
                fetchSingleTraveler(`${id}`)
                ]);
                  .catch (err => console.log(err))
                 };
                

export { fetchAll }
