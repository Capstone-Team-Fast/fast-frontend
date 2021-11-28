import axios from 'axios';
const API_URL = 'http://3.144.105.249:8000';

export default class RecipientService{

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
        const url = `${API_URL}/api/clients/${recipient.id}/`;
        //const url = `${API_URL}/clients/${recipient.pk}`;
        return axios.delete(url);
    }

    uploadRecipients(recipients){
        const url = `${API_URL}/api/clients/bulk/`;
        if (recipients.length > 0) {
            console.log('Saving File to ' + url);
            console.log(recipients);
            return axios.post(url, recipients).then(response => response.data);
        }
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