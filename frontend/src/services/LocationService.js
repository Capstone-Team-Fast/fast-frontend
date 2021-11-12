import axios from 'axios';
const API_URL = 'http://3.144.105.249:8000';

export default class DriverService{

    constructor(){}


    getLocations() {
        const url = `${API_URL}/api/locations/`;
        return axios.get(url).then(response => response.data);
    }
}