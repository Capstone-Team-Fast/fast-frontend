import * as XLSX from 'xlsx'

export default class FileService{

    convertFileFromExcel(fileText) {
        return 
    }

    convertFileToExcel(file) {
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