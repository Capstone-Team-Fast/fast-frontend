import React, { Component } from 'react';
import { CSVLink } from "react-csv";
import Spinner from 'react-bootstrap/Spinner'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DriverService from '../../../services/DriverService';
import SearchService from '../../../services/SearchService';
import FileService from '../../../services/FileService';
import { DialogBox } from '../../Utils/DialogBox';
import Stack from 'react-bootstrap/Stack';

const driverService = new DriverService();
const searchService = new SearchService();
const fileService = new FileService();
const headers = ["Firstname", "Lastname", "Role", "Availability", "Language", "Phone", "Capacity"]

/**
 * This component is used to display driver information on the application's
 * Data page.
 */
class Driver extends Component {

  /**
 * The constructor method initializes the component's state object and
 * binds the methods of the component to the current instance.
 * @param {Object} props The properties passed to the component.
 */
constructor(props) {
    super(props);
    this.state = {
        drivers: [],
        filtered: [],
        fileContent: [],
        new_drivers: [],
        show: false,
        allShow: false,
        driverToDelete: {},
        allDriversDelete: [],
        sorted: false,
        loading: false
    };
    this.fileInput = React.createRef();
    this.handleDriverDelete = this.handleDriverDelete.bind(this);
    this.handleAllDriversDelete = this.handleAllDriversDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.readFile = this.readFile.bind(this);
    this.refreshDrivers = this.refreshDrivers.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleAllShow = this.handleAllShow.bind(this);
    this.sortColumn = this.sortColumn.bind(this);
    this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
}
  
/**
 * Life cycle hook that is called after the component is first rendered.
 */
componentDidMount() {
    var  self  =  this;
    driverService.getDrivers().then(function (result) {
        self.setState({ drivers:  result, filtered: result});
    });
}

refreshDrivers(){
    var self = this;
    driverService.getDrivers().then(function (result) {
        self.setState({ drivers: result, filtered: result, loading: false });
    });
}

sortColumn(key) {
    const isSorted = this.state.sorted;
    if (key === 'firstname') {
        if (this.state.sorted) {
            this.state.drivers.sort((driver1, driver2) => {return driver2.first_name.localeCompare(driver1.first_name)});
        } else {
            this.state.drivers.sort((driver1, driver2) => {return driver1.first_name.localeCompare(driver2.first_name)});
        }
    } else if (key === 'lastname') {
        if (this.state.sorted) {
            this.state.drivers.sort((driver1, driver2) => {return driver2.last_name.localeCompare(driver1.last_name)});
        } else {
            this.state.drivers.sort((driver1, driver2) => {return driver1.last_name.localeCompare(driver2.last_name)});
        }
    } else if (key === 'phone') {
        if (this.state.sorted) {
            this.state.drivers.sort((driver1, driver2) => {return driver2.phone.localeCompare(driver1.phone)});
        } else {
            this.state.drivers.sort((driver1, driver2) => {return driver1.phone.localeCompare(driver2.phone)});
        }
    }
    this.setState({drivers: this.state.drivers, sorted: !isSorted});
}

handleClose() {
    this.setState({show: false, allShow: false});
}

// For deleting 1 or all drivers
handleSave() {
    this.handleClose();
    if (this.state.show) {
        this.handleDriverDelete(this.state.driverToDelete);
        this.setState({driverToDelete: {}});
    }
    else if (this.state.allShow) {
        this.handleAllDriversDelete(this.state.allDriversDelete);
        this.setState({ allDriversDelete: [] });
    }
}

  // For deleting 1 driver
handleShow(e, d) {
    e.preventDefault();
    this.setState({show: true, driverToDelete: d});
}
  
// For deleting all drivers
handleAllShow(e, d) {
    e.preventDefault();
    this.setState({allShow: true, allDriversDelete: d});
}

/**
 * Event handler used to delete a driver from the database when the 
 * user clicks on the delete button.
 * @param {Object} d The driver object to be deleted.
 */
handleDriverDelete(d) {
    var self = this;
    driverService.deleteDriver(d).then(() => {
        var newArr = self.state.drivers.filter(function (obj) {
            return obj.id !== d.id;
        });
        self.setState({ drivers: newArr, filtered: newArr })
    });
}
  
 /**
 * Event handler used to delete all drivers from the database when the 
 * user clicks on the delete all button.
 * @param {Object} d The drivers object to be deleted.
 */
handleAllDriversDelete(d) {
    var self = this;
    for (var i = 0; i < d.length; i++) {
        this.handleDriverDelete(d[i]);
    }
}

get_availability(availability_list) {
    let availability_template = {'sunday': false, 'monday': false, 'tuesday': false, 'wednesday': false, 
        'thursday': false, 'friday': false, 'saturday': false };
    for (var index in availability_list) {
        let day = availability_list[index].trim().toLowerCase();
        availability_template[day] = true;
    }
    return availability_template;
}

/**
 * Event handler method called when the user enters a value into the 
 * driver search box.
 * @param {Object} e The event triggered when a user enters information
 *                      into the search field.
 */
handleSearch(e) {
    let newList = searchService.findDrivers(e, this.state.drivers);
    this.setState({
        filtered: newList
    });
}

get_phone(phone) {
    if (phone.length > 0) {
        phone = phone.trim();
        phone = phone.replaceAll(/['\D']/g, '');
        if (phone.length === 10) {
            phone = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6);
        } else {
            phone = '';
        }
    }
    return phone
}

capitalize(str) {
    if (typeof(str) == 'string') {
        if (str.length > 0) {
            str = str.toLowerCase();
            str = str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
    return str;
}

get_languages(languages_list) {
    var languages = [];
    for (var index in languages_list) {
        let language_template = {};
        let language = this.capitalize(languages_list[index].trim());
        language_template.name = language;
        languages.push(language_template);
    }
    return languages;
}

readFile(event) {
    const file = event.target.files[0];
    const promise = fileService.readFile(file);
    let drivers = [];

    promise.then((data) => {
        this.setState({
            fileContent: data
        });

        for(var row in data) {
            let driver_template = {
                'user': '', 'first_name': '', 'last_name': '', 'capacity': '1', 'employee_status': '', 
                'phone': '', 'availability': {}, 'languages': []};
            
            var driver_data = data[row];
            let keys = Object.keys(driver_data)
            for (var index in keys) {
                let key = keys[index];
                let value = driver_data[key];
                delete driver_data[key];
                driver_data[key.toLowerCase()] = value;
            }
            console.log(driver_data);
            keys = Object.keys(driver_data);
            if (keys.includes('firstname')) {
                driver_template.first_name = driver_data.firstname.trim();
            } else {
                driver_template.first_name = " ";
            }
            
            if (keys.includes('lastname')) {
                driver_template.last_name = driver_data.lastname.trim();
            } else {
                driver_template.last_name = " ";
            }
            driver_template.capacity = String(driver_data.capacity);
            let employee_status = driver_data.role.toLowerCase().trim();
            if (employee_status === 'volunteer') {
                driver_template.employee_status = 'Volunteer';
            } else {
                driver_template.employee_status = 'Employee';
            }
            driver_template.availability = this.get_availability(driver_data.availability.split(','));
            driver_template.languages = this.get_languages(driver_data.language.split(','));
            driver_template.phone = this.get_phone(driver_data.phone.trim());
            drivers.push(driver_template);
        }
        this.setState({
            new_drivers: JSON.stringify(drivers)
        });
    });
}
  
  // Handle uploading Drivers when button is clicked
  handleUploadSubmit = (event) => {
    if (this.fileInput.current.value) {
        this.setState({
            loading: true
        });
        driverService.uploadDrivers(this.state.new_drivers);
        this.fileInput.current.value = '';
        this.refreshDrivers();
        this.setState({
            new_drivers: [],
        });
    }
}

/**
 * Method which returns a String of a driver's availability
 * @param {Object} driver The driver whose availability is to be returned.
 */
getDriverAvailability(driver) {
    let availability = "";
    
    if (driver.availability.sunday == true) {
        availability = availability.concat(" ", "Sunday");
    }
    if (driver.availability.monday == true) {
        availability = availability.concat(" ", "Monday");
    }
    if (driver.availability.tuesday == true) {
        availability = availability.concat(" ", "Tuesday");
    }
    if (driver.availability.wednesday == true) {
        availability = availability.concat(" ", "Wednesday");
    }
    if (driver.availability.thursday == true) {
        availability = availability.concat(" ", "Thursday");
    }
    if (driver.availability.friday == true) {
        availability = availability.concat(" ", "Friday");
    }
    if (driver.availability.saturday == true) {
        availability = availability.concat(" ", "Saturday");
    }

    availability = availability.trim();
    availability = availability.split(" ").join(", ");
    return availability;
}

/**
 * Method which returns a String of a driver's languages
 * @param {Object} driver The driver whose known languages are to be returned.
 */
getDriverLanguages(driver) {
    let languages = "";
    for (let i = 0; i < driver.languages.length; i++) {
        languages = languages.concat(" ", driver.languages[i].name);
    }

    languages = languages.trim();
    languages = languages.split(" ").join(", ");
    return languages;
}

/**
 * Method which returns an array of driver data to be used in exporting CSV file
 */
getCSVData() {
    let data = [];
    let drivers = this.state.drivers;
    for (let i = 0; i < drivers.length; i++) {
        let row = [];
        row.push(drivers[i].first_name);
        row.push(drivers[i].last_name);
        row.push(drivers[i].employee_status);
        row.push(this.getDriverAvailability(drivers[i]));
        row.push(this.getDriverLanguages(drivers[i]));
        row.push(drivers[i].phone);
        row.push(drivers[i].capacity);

        data.push(row);
    }
    return data;
  }

  /**
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
    render() {
        
        return (
            <Container className="card">
                <Row className="card-header">
                    <Col>
                        <Row className="d-flex flex-row">
                            <Col sm={2} className="table-title title">Drivers</Col>
                            <Col sm={8} class="mt-3">
                                <InputGroup class="mb-2">
                                    <InputGroup.Text/>
                                    <FormControl
                                        type="text"
                                        placeholder="Search Drivers"
                                        id="search"
                                        v-model="search"
                                        name="search"
                                        aria-label="Search"
                                        onChange={this.handleSearch}
                                    ></FormControl>
                                </InputGroup>
                            </Col>
                            <Col sm={2} className="justify-content-around d-flex flex-row">
                                <Button href="/addDriver" style={{ marginRight: 2.5 }}>Add New</Button>
                                <Button onClick={(e) => this.handleAllShow(e, searchService.findDrivers(e, this.state.drivers))} variant='primary' style={{ marginLeft: 2.5 }}>Delete All</Button>
                                <DialogBox 
                                    show={this.state.allShow} 
                                    modalTitle='Confirm Deletion'
                                    mainMessageText='Are you sure you want to delete all entries?'
                                    handleClose={this.handleClose}
                                    handleSave={this.handleSave}
                                    closeText='Cancel'
                                    saveText='Delete'
                                    buttonType='danger'
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="card-body table-wrapper-scroll-y my-custom-scrollbar">
                    <Table className="striped bordered hover table table-bordered table-striped mb-0">
                        <thead>
                            <tr>
                                <th>
                                    <Stack direction='horizontal' gap={3}>
                                        <div >First Name</div> 
                                        <div className='ms-auto'>
                                            <Button 
                                                variant='outline-secondary' 
                                                size='sm'
                                                onClick={() => this.sortColumn('firstname')}
                                            >&#8693;</Button>
                                        </div>
                                    </Stack>
                                </th>
                                <th>
                                <Stack direction='horizontal' gap={3}>
                                        <div >Last Name</div> 
                                        <div className='ms-auto'>
                                            <Button 
                                                variant='outline-secondary' 
                                                size='sm' 
                                                onClick={() => this.sortColumn('lastname')}
                                                >&#8693;</Button>
                                        </div>
                                    </Stack>
                                </th>
                                <th>
                                    <Stack direction='horizontal' gap={3}>
                                        <div >Phone Number</div>
                                        <div className='ms-auto'>
                                            <Button 
                                                variant='outline-secondary' 
                                                size='sm'
                                                onClick={() => this.sortColumn('phone')}
                                                >&#8693;</Button>
                                        </div>
                                    </Stack>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filtered.map(d =>
                                <tr key={d.id}>
                                    <td>{d.first_name}</td>
                                    <td>{d.last_name}</td>
                                    <td>{d.phone}</td>
                                    <td >
                                        <Button className="mr-2" href={"/driverDetail/" + d.id} variant='primary'>View</Button>
                                        <Button className="mr-2" href={"/updateDriver/" + d.id} variant='primary'>Edit</Button>
                                        <Button onClick={(e) => this.handleShow(e, d)} variant='primary'> Delete</Button>
                                        <DialogBox 
                                            show={this.state.show} 
                                            modalTitle='Confirm Deletion'
                                            mainMessageText='Are you sure you want to delete this entry?'
                                            handleClose={this.handleClose}
                                            handleSave={this.handleSave}
                                            closeText='Cancel'
                                            saveText='Delete'
                                            buttonType='danger'
                                        />
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
                </Row>
                <Row className="justify-content-md-left mt-2 pt-2 mb-2 title border-top">
                    <Col xs md="auto" className="h4">File Upload</Col>
                </Row>
                <Row>
                    <Col md="auto" className="ml-4">
                        <Row>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Control type="file" onChange={(e) => {
                                    this.readFile(e);
                                }} ref= {this.fileInput} accept='.csv, .xls, .xlsx'/>
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col sm={2} className="d-flex flex-row">
                                <Button className="mx-1" onClick={this.handleUploadSubmit}>
                                    {this.state.loading ?
                                        <Spinner
                                            animation="border" role="status" style={{ height: 25, width: 25 }}>
                                        </Spinner> : "Add Drivers"}
                                </Button>
                            </Col>
                            <Col>
                            <CSVLink
                                data={this.getCSVData()}
                                headers={headers}
                                filename='drivers.csv'
                            >Download Drivers</CSVLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }  
}
export default Driver;
