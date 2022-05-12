import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

/**
 * This class provides a method to connect to the backend database
 * for the retrieval of all locations stored in the database.
 */
export default class DriverService{

    /**
     * This method connects to the backend database to
     * retrieve a list of all locations stored in the database.
     * @returns The list of locations, as JSON objects, stored in the
     *          database.
     */
    getLocations() {
        const url = `${API_URL}/api/locations/`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * This method deletes a location from the database.
     * @param {Object} location The object representing the location to be deleted.
     * @returns A response code indicating success or failure of the HTTP
     *          deletion request.
     */
     deleteLocation(location){
        const url = `${API_URL}/api/locations/${location.id}/`;
        return axios.delete(url);
    }
}