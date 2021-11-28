import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import DriverService from '../../../services/DriverService';

const driverService = new DriverService();

class  ViewDriver  extends  Component {

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

componentDidMount() {
    var self = this
    driverService.getDriver(self.state.id).then(function (result) {
        self.setState(result, () => {console.log(JSON.stringify(self.state))});
    })  
    
}

showLanguages() {
    let languages = []
    this.state.languages.map(l => {
        languages.push(l.name)});
    return languages
}

showAvailability() {
    let availability = []
    for (let key in this.state.availability) {
        console.log(key)
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


render() {
    
    return (
        <Container className="card mt-2">
            <Row className="card-header">
                <Col>
                    <Row>
                        <Col sm={10} className="h2">Driver Detail</Col>
                        <Col sm={2}> 
                            <Button href="/">Return</Button>
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
                                <td>{d}</td>)}
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