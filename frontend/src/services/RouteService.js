import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class RouteService{

    getRoutes() {
        const url = `${API_URL}/api/routes/`;
        return axios.get(url).then(response => response.data);
    }

    getRoute(pk) {
        const url = `${API_URL}/api/routes/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    createRoute(route){
        const url = `${API_URL}/api/routes/`;
        return axios.post(url,route).then(response => response.data);
    }
}