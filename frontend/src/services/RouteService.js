import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

/**
 * This class provides methods to connect to the backend database
 * for the creation and retrieval of routes.
 */
export default class RouteService{

    /**
     * This method connects to the backend database to
     * retrieve routes stored in the database.
     * @returns The list of routes, as JSON objects, stored in the
     *          database.
     */
     getRoutes() {
        const url = `${API_URL}/api/routes/`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * This method connects to the backend database to
     * retrieve a list of all route lists stored in the database.
     * @returns a list of all route lists, as JSON objects, stored in the
     *          database.
     */
    getRouteLists() {
        console.log("getRouteLists")
        const url = `${API_URL}/api/routeList/`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * This method connects to the backend database to
     * retrieve a single route list stored in the database.
     * @returns a single route list, as JSON objects, stored in the
     *          database.
     */
     getRouteList(pk) {
        console.log("getRouteList")
        const url = `${API_URL}/api/routeList/${pk}/`;
        return axios.get(url).then(response => response.data);
    }    

    /**
     * This method deletes a route list from the database.
     * @param {Object} routeList The object representing the route list to be deleted.
     * @returns A response code indicating success or failure of the HTTP
     *          deletion request.
     */
    deleteRouteList(routeList){
        console.log("deleteRouteList")
        const url = `${API_URL}/api/routeList/${routeList.id}/`;
        return axios.delete(url);
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