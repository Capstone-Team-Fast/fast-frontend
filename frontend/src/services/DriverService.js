import axios from 'axios';
const API_URL = 'http://3.144.105.249:8000';

/**
 * This class provides methods to connect to the backend database
 * for the creation, update, retrieval, and deletion of drivers.
 */
export default class DriverService {

    /**
     * This method connects to the backend database to
     * retrieve a list of all drivers stored in the database.
     * @returns The list of drivers, as JSON objects, stored in the
     *          database.
     */
    getDrivers() {
        const url = `${API_URL}/api/drivers/`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * This method connects to the backend database to retrieve
     * the information for a specific driver, based on the value 
     * for that driver's primary key.
     * @param {Number} pk - The primary key of the driver to be retrieved.
     * @returns The driver information, as a JSON object, for a specific driver.
     */
    getDriver(pk) {
        const url = `${API_URL}/api/drivers/${pk}/`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * This method deletes a driver from the database.
     * @param {Object} driver The object representing the driver to be deleted.
     * @returns A response code indicating success or failure of the HTTP
     *          deletion request.
     */
    deleteDriver(driver){
        const url = `${API_URL}/api/drivers/${driver.id}/`;
        return axios.delete(url);
    }

    uploadDrivers(drivers){
        const url = `${API_URL}/api/drivers/`;
        if (drivers.length > 0) {
            // console.log('Saving File to ' + url);
            // console.log(drivers);
            for (const driver of JSON.parse(drivers)) {
                axios.post(url, driver).then(response => {
                    console.log(response.status);
                    console.log(response.data);
                });
            }
        }
        return;
    }

    /**
     * This method creates a new driver in the backend database.
     * @param {Object} driver A JSON driver object used to create a new driver
     *                  in the backend database.
     * @returns A JSON object of the driver that has been created, or 
     *          an error message if the request fails.
     */
    createDriver(driver){
        const url = `${API_URL}/api/drivers/`;
        console.log(driver);
        return axios.post(url,driver).then(response => {
            console.log(response.status);
            console.log(response.data);
        });
    }

    /**
     * This method updates the information for a driver in the database 
     * based on the driver object passed as a parameter to the method.
     * @param {Object} driver The updated driver object to be stored in the 
     *                  database.
     * @returns A JSON object of the driver that has been updated, or 
     *          an error message if the request fails.
     */
    updateDriver(driver){
        const url = `${API_URL}/api/drivers/${driver.id}/`;
        return axios.put(url,driver);
    }
}