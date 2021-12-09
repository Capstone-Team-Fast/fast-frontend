/**
 * This class provides methods to search the lists of drivers and recipients
 * for based on the current information entered into the search field(s) on
 * the Data page.
 */
 export default class SearchService{

    /**
     * This method uses two parameters - an event object that is triggered 
     * when the user enters information into the Driver search field and 
     * the list of drivers stored in the database - to return a list of drivers
     * that have relevant field values matching the value entered in the 
     * search box.
     * @param {Object} event The event triggered when a user enters information 
     *                          into the Driver search field on the Data page.
     * @param {Array} drivers The list of drivers stored in the database.
     * @returns A list of drivers that have at least one data field matching 
     *          the value entered into the search box.
     */
    findDrivers(event, drivers) {
        let currentList = drivers;
        let newList = []
    
        if (event.target.value) {
            newList = currentList.filter(item => {
                let driverId = item.id;
                let fName = item.first_name.toLowerCase();
                let lName = item.last_name.toLowerCase();
                let fullName = fName + " " + lName 
                let formalName = lName + ", " + fName
                let phone = item.phone;
                let emp_status = item.employee_status.toLowerCase();
                const filter = event.target.value.toLowerCase();
                return driverId.toString().includes(filter) | fullName.includes(filter) 
                        | formalName.includes(filter) | phone.toString().includes(filter) 
                        | emp_status.includes(filter);
            });
        }
        else {
            newList = drivers;
        }
        return newList;
    }

    /**
     * This method uses two parameters - an event object that is triggered 
     * when the user enters information into the Recipient search field and 
     * the list of recipients stored in the database - to return a list of 
     * recipients that have relevant field values matching the value entered in the 
     * search box.
     * @param {Object} event The event triggered when a user enters information 
     *                          into the Recipient search field on the Data page.
     * @param {Array} recipients The list of recipients stored in the database.
     * @returns A list of recipients that have at least one data field matching 
     *          the value entered into the search box.
     */
     findRecipients(event, recipients) {
        let currentList = recipients;
        let newList = []
    
        if (event.target.value) {
            newList = currentList.filter(item => {
                let recipientId = item.id.toString();
                let fName = item.first_name.toLowerCase();
                let lName = item.last_name.toLowerCase();
                let fullName = fName + " " + lName 
                let formalName = lName + ", " + fName
                let phone = item.phone.toString();
                let address = item.location.address.toLowerCase()
                let city = item.location.city.toLowerCase() 
                let zip = item.location.zipcode.toString()
                let isCenter = item.location.is_center
                const filter = event.target.value.toLowerCase();
                return (recipientId.includes(filter) | fullName.includes(filter) 
                        | formalName.includes(filter) | phone.includes(filter) 
                        | address.includes(filter) 
                        | city.includes(filter) | zip.includes(filter)) && 
                        !(isCenter);
            });
        }
        else {
            newList = recipients;
        }
        return newList;
    }
}