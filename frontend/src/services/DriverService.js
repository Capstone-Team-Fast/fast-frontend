import axios from 'axios';
const API_URL = 'http://3.144.105.249:8000';

export default class DriverService{

    constructor(){}


    getDrivers() {
        const url = `${API_URL}/api/drivers/`;
        return axios.get(url).then(response => response.data);
    }

    getDriversByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    getDriver(pk) {
        const url = `${API_URL}/api/drivers/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    deleteDriver(driver){
        const url = `${API_URL}/api/drivers/${driver.pk}`;
        return axios.delete(url);
    }

    // Do we need a method on the backend to handle the creation of 
    // multiple drivers at one time?
    createDrivers(drivers) {
        const url = `${API_URL}/api/drivers/`;
        return axios.post(url, drivers).then(response => response.data);
    }

    createDriver(driver){
        const url = `${API_URL}/api/drivers/`;
        return axios.post(url,driver).then(response => response.data);
    }

    updateDriver(driver){
        const url = `${API_URL}/api/drivers/${driver.pk}`;
        return axios.put(url,driver);
    }
}