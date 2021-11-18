export default class SearchService{

    constructor(){}

    findDrivers(event, drivers) {
        let currentList = drivers;
        let newList = []
    
        if (event.target.value) {
            newList = currentList.filter(item => {
                let driverId = item.id;
                let fName = item.first_name.toLowerCase();
                let lName = item.last_name.toLowerCase();
                let phone = item.phone;
                let emp_status = item.employee_status.toLowerCase();
                const filter = event.target.value.toLowerCase();
                return driverId.toString().includes(filter) | fName.includes(filter) 
                        | lName.includes(filter) | phone.toString().includes(filter) 
                        | emp_status.includes(filter);
            });
        }
        else {
            newList = drivers;
        }
        return newList;
    }

    findRecipients(event, recipients) {
        let currentList = recipients;
        let newList = []
    
        if (event.target.value) {
            newList = currentList.filter(item => {
                let recipientId = item.id.toString();
                let fName = item.first_name.toLowerCase();
                let lName = item.last_name.toLowerCase();
                let phone = item.phone.toString();
                let address = item.location.address.toLowerCase()
                let city = item.location.city.toLowerCase() 
                let zip = item.location.zipcode.toString()
                const filter = event.target.value.toLowerCase();
                return recipientId.includes(filter) | fName.includes(filter) 
                        | lName.includes(filter) | phone.includes(filter) 
                        | address.includes(filter) 
                        | city.includes(filter) | zip.includes(filter);
            });
        }
        else {
            newList = recipients;
        }
        return newList;
    }
    



}