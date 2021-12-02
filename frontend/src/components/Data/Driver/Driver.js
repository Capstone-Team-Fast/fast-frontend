import React, { Component } from 'react';

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
import { Link } from 'react-router-dom';

const driverService = new DriverService();
const searchService = new SearchService();
const fileService = new FileService();


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
            new_drivers: []
        };
        this.fileInput = React.createRef();
        this.handleDriverDelete = this.handleDriverDelete.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.readFile = this.readFile.bind(this);
        this.refreshDrivers = this.refreshDrivers.bind(this);
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
          self.setState({ drivers: result, filtered: result });
      });
  }

/**
 * Event handler used to delete a driver from the database when the 
 * user clicks on the delete button.
 * @param {Object} e The event triggered when the user clicks on the 
 * q                 Delete button.
 * @param {Object} d The driver object to be deleted.
 */
    handleDriverDelete(e, d) {
        var self = this;
        console.log(d);

        driverService.deleteDriver(d).then(() => {
            var newArr = self.state.drivers.filter(function (obj) {
                return obj.id !== d.id;
            });
            self.setState({ drivers: newArr, filtered: newArr })
        });
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
            if (phone.length == 10) {
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
                    'user': '', 'first_name': '', 'last_name': '', 'capacity': 0, 'employee_status': '', 
                    'phone': '', 'availability': {}, 'languages': []};
                
                var driver_data = data[row];
                const keys = Object.keys(driver_data)
                for (var index in keys) {
                    let key = keys[index];
                    let value = driver_data[key];
                    delete driver_data[key];
                    driver_data[key.toLowerCase()] = value;
                }
                driver_template.first_name = driver_data.firstname.trim();
                driver_template.last_name = driver_data.lastname.trim();
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

  /**
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
    render() {
        return (
            <Container className="card">
                <Row className="card-header">
                    <Col>
                        <Row >
                            <Col sm={2} className="table-title title">Drivers</Col>
                            <Col sm={8} class="mt-3">
                                <InputGroup class="mb-2">
                                    <InputGroup.Text>
                                        {// <Search icon="search"></Search>
                                        }
                                    </InputGroup.Text>
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
                            <Col sm={2}>
                                <Button href="/addDriver">Add New</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="card-body table-wrapper-scroll-y my-custom-scrollbar">
                    <Table className="striped bordered hover table table-bordered table-striped mb-0">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
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
                                        <Button className="mr-2" href={"/driverDetail/" + d.id}>View</Button>
                                        <Button className="mr-2" href={"/updateDriver/" + d.id}>Edit</Button>
                                        <Button onClick={(e) => this.handleDriverDelete(e, d)}> Delete</Button>
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
                                {/* <Link to={{
                                    pathname: "/previewDrivers",
                                    state: this.state.new_drivers
                                }}>
                                    <Button className="mx-1">Preview</Button>
                                </Link> */}
                                <Button className="mx-1" onClick={() => {
                                    driverService.uploadDrivers(this.state.new_drivers);
                                    this.setState({
                                        new_drivers: [],
                                    });
                                    this.fileInput.current.value = '';
                                    this.refreshDrivers();
                                }}>Add Drivers</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }  
}
export default Driver;