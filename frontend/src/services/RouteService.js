import axios from 'axios';
const API_URL = 'http://3.144.105.249:8000';

/**
 * This class provides methods to connect to the backend database
 * for the creation and retrieval of routes.
 */
export default class RouteService{

    /**
     * This method connects to the backend database to
     * retrieve a list of all routes stored in the database.
     * @returns The list of routes, as JSON objects, stored in the
     *          database.
     */
     getRoutes() {
        const url = `${API_URL}/api/routes/`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * This method connects to the backend database to retrieve
     * the information for a specific route, based on the value 
     * for that route's primary key.
     * @param {Number} pk - The primary key of the route to be retrieved.
     * @returns The route information, as a JSON object, for a specific route.
     */
     getRoute(pk) {
        const url = `${API_URL}/api/routes/${pk}/`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * This method creates a new route in the backend database.
     * @param {Object} route A JSON object used to create a new
     *                  route in the backend database.
     * @returns A JSON object of the route that has been created, or 
     *          an error message if the request fails.
     */
     createRoute(route){
        const url = `${API_URL}/api/routes/`;
        return axios.post(url,route).then(response => response.data);
    }
}