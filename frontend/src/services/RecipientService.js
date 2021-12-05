import axios from 'axios';
const API_URL = 'http://3.144.105.249:8000';

/**
 * This class provides methods to connect to the backend database
 * for the creation, update, retrieval, and deletion of recipients.
 */
export default class RecipientService{

    /**
     * This method connects to the backend database to
     * retrieve a list of all recipients stored in the database.
     * @returns The list of recipients, as JSON objects, stored in the
     *          database.
     */
    getRecipients() {
        const url = `${API_URL}/api/clients/`;
        //const url = `${API_URL}/clients/`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * This method connects to the backend database to retrieve
     * the information for a specific recipient, based on the value 
     * for that recipient's primary key.
     * @param {Number} pk - The primary key of the recipient to be retrieved.
     * @returns The recipient information, as a JSON object, for a specific recipient.
     */
     getRecipient(pk) {
        const url = `${API_URL}/api/clients/${pk}/`;
        return axios.get(url).then(response => response.data);
    }

    /**
     * This method deletes a recipient from the database.
     * @param {Object} recipient The object representing the recipient to be deleted.
     * @returns A response code indicating success or failure of the HTTP
     *          deletion request.
     */
    deleteRecipient(recipient){
        const url = `${API_URL}/api/clients/${recipient.id}/`;
        return axios.delete(url);
    }

    uploadRecipients(recipients){
        const url = `${API_URL}/api/clients/`;
        if (recipients.length > 0) {
            console.log('Saving File to ' + url);
            console.log(recipients);
            for (const recipient of JSON.parse(recipients)) {
                axios.post(url, recipient).then(response => response.data);
            }
            return;
        }
    }

    /**
     * This method creates a new recipient in the backend database.
     * @param {Object} recipient A JSON driver object used to create a new
     *                  recipient in the backend database.
     * @returns A JSON object of the recipient that has been created, or 
     *          an error message if the request fails.
     */
     createRecipient(recipient){
        const url = `${API_URL}/api/clients/`;
        //const url = `${API_URL}/clients/`;
        return axios.post(url,recipient).then(response => response.data);
    }

    /**
     * This method updates the information for a recipient in the database 
     * based on the recipient object passed as a parameter to the method.
     * @param {Object} recipient The updated recipient object to be stored in the 
     *                  database.
     * @returns A JSON object of the recipient that has been updated, or 
     *          an error message if the request fails.
     */
     updateRecipient(recipient){
        const url = `${API_URL}/api/clients/${recipient.id}/`;
        //const url = `${API_URL}/clients/${recipient.pk}`;
        return axios.put(url,recipient);
    }
}