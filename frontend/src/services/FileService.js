import * as XLSX from 'xlsx'
import axios from 'axios';

const API_URL = 'http://3.144.105.249:8000';

export default class FileService{

    convertFileFromExcel(fileText) {
        return 
    }

    convertFileToExcel(file) {
    }

    saveFile(drivers){
        const url = `${API_URL}/api/drivers/bulk/`;
        if (drivers.length > 0) {
            console.log('Saving File to ' + url);
            console.log(drivers);
            // return axios.post(url, drivers).then(response => response.data);
            return axios({
                method: 'post',
                url: url,
                data: drivers
            }).then((response) => {console.log(response.data); console.log(response.status)})
        }
    }

    readFile(file) {
        const promise = new Promise((resolve, reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const workbook = XLSX.read(bufferArray, {type: 'buffer'});
                const worksheetname = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetname];
                const data = XLSX.utils.sheet_to_json(worksheet);

                resolve(data);
            };

            fileReader.onerror = ((error) => {
                reject(error);
            });
        });
        return promise;
    }
}