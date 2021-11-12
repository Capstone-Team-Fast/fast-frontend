import axios from 'axios';
const API_URL = 'http://3.144.105.249:8000';

export default class RecipientService{

    constructor(){}


    getRecipients() {
        const url = `${API_URL}/api/clients/`;
        //const url = `${API_URL}/clients/`;
        return axios.get(url).then(response => response.data);
    }

    getRecipientsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url).then(response => response.data);
    }

    getRecipient(pk) {
        const url = `${API_URL}/api/clients/${pk}/`;
        //const url = `${API_URL}/clients/${pk}`;
        return axios.get(url).then(response => response.data);
    }

    deleteRecipient(recipient){
        const url = `${API_URL}/api/clients/${recipient.pk}`;
        //const url = `${API_URL}/clients/${recipient.pk}`;
        return axios.delete(url);
    }

    // Do we need a method on the backend to handle the creation of 
    // multiple recipients at one time?
    createRecipients(recipients) {
        const url = `${API_URL}/api/clients/`;
        //const url = `${API_URL}/clients/`;
        return axios.post(url, recipients).then(response => response.data);
    }

    createRecipient(recipient){
        const url = `${API_URL}/api/clients/`;
        //const url = `${API_URL}/clients/`;
        return axios.post(url,recipient).then(response => response.data);
    }

    updateRecipient(recipient){
        const url = `${API_URL}/api/clients/${recipient.id}/`;
        //const url = `${API_URL}/clients/${recipient.pk}`;
        return axios.put(url,recipient);
    }
}