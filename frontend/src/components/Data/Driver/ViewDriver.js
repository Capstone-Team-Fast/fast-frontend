import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DriverService from '../../../services/DriverService';

const driverService = new DriverService();

/**
 * This component is used to view individual driver information stored 
 * in the database.
 */
class  ViewDriver  extends  Component {

/**
 * The constructor method initializes the component's state object and
 * binds the methods of the component to the current instance.
 * @param {Object} props The properties passed to the component.
 */
constructor(props) { 
    super(props);
    const {id} = props.match.params
    this.state = {'id': id,'user': '', 'first_name': '', 'last_name': '', 
                    'phone': '', 'availability': 
                    {'sunday': false, 'monday': false, 'tuesday': false, 
                    'wednesday': false, 'thursday': false, 'friday': false, 
                    'saturday': false, 'id': ''}, 
                    'employee_status': '', 'capacity': '', 'languages': []
                };

    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday',
                    'Friday', 'Saturday']
    this.showLanguages = this.showLanguages.bind(this)
    this.showAvailability = this.showAvailability.bind(this)
}

/**
 * Life cycle hook that is called after the component is first rendered.
 */
componentDidMount() {
    var self = this
    driverService.getDriver(self.state.id).then(function (result) {
        self.setState(result);
    })  
    
}

/**
 * Method to map the array of language objects stored in the component's 
 * state to a list of language names.
 * @returns The list of language names for the driver.
 */
showLanguages() {
    let languages = []
    this.state.languages.map(l => {
        languages.push(l.name)
    });
    return languages
}

/**
 * Method to map the availability object stored in the component's 
 * state to a list of strings denoting a driver's availability for 
 * each day of the week..
 * @returns The list of the driver's availability for each day of the 
 *          week.
 */
showAvailability() {
    let availability = []
    for (let key in this.state.availability) {
        if (key !== "id" && this.state.availability[key] === true)
        {
            availability.push("Available");
        }
        if (key !== "id" && this.state.availability[key] === false)
        {
            availability.push("Not Available");
        }
    }
    return availability
}


/**
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
render() {
    
    return (
        <Container className="card mt-2">
            <Row className="card-header">
                <Col>
                    <Row className="d-flex flex-row">
                        <Col sm={8} className="h2">Driver Detail</Col>
                        <Col sm={4} className="justify-content-end btn-sm d-flex flex-row">
                            <Button href="/data">Return</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="card-body">
                <h2 className="title">General Information</h2>
                <Table className="striped bordered hover table table-bordered table-striped mb-0">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Capacity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr key={this.state.id}>
                            <td>{this.state.id}</td>
                            <td>{this.state.first_name}</td>
                            <td>{this.state.last_name}</td>
                            <td>{this.state.phone}</td>
                            <td>{this.state.capacity}</td>
                            <td>{this.state.employee_status}</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>

            <Row className="card-body">
                <h2 className="title">Availability</h2>
                <Table className="striped bordered hover table table-bordered table-striped mb-0">
                    <thead>
                        <tr>
                            {this.days.map(d => 
                                <th>{d}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                            <tr key={this.state.availability}>
                            {this.showAvailability().map(d => 
                                <td>{d}</td>)}
                        </tr>
                    </tbody>
                </Table>
            </Row>
            
            <Row className="card-body">
                <h2 className="title">Languages</h2>
                <Table className="striped bordered hover table table-bordered table-striped mb-0">
                    <thead>
                        <tr>
                        <th colSpan={this.showLanguages().length}>Languages Selected</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr key={this.state.languages}>
                            {this.showLanguages().map(l => 
                                <td>{l}</td>)}
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}
}
export default ViewDriver