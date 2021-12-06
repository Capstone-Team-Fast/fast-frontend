import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import RouteService from '../../services/RouteService'
import RecipientService from '../../services/RecipientService'
import DriverService from '../../services/DriverService'

const  recipientService  =  new  RecipientService();
const  routeService  =  new  RouteService();
const  driverService  =  new  DriverService();


/**
 * This component is used to display route information for an 
 * individual driver.
 */
class  DriverRoute  extends  Component {

/**
 * The constructor method initializes the component's state object and
 * binds the methods of the component to the current instance.
 * @param {Object} props The properties passed to the component.
 */
constructor(props) {
     super(props);
     this.state  = {
         route: {itinerary: [], total_distance: "", total_duration: "",
                    total_quantity: "", first_name: "", last_name: ""},
         recipients: [],
         driver: { capacity: "", employee_status: ""}
     };

     this.getRecipientName = this.getRecipientName.bind(this)
     this.getPhone = this.getPhone.bind(this)
}

/**
 * Life cycle hook that is called after the component is first rendered.
 */
componentDidMount() {
    let params = this.props.match.params 
    
    recipientService.getRecipients().then(result => {
        this.setState({
            recipients: result
        })
    })  

    routeService.getRoute(params.routeId).then(result => {
        this.setState({
            route: result
        })
    })

    driverService.getDriver(params.driverId).then(result => {
        this.setState({
            driver: result
        })
    })
}

/**
 * Function to return full name for individual recipients. Called 
 * for each client in the itinerary for each driver's route.
 * @param {Object} recipient Recipient object from the route.
 * @returns Client's full name.
 */
 getRecipientName(recipient) {
    let clients = this.state.recipients
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === recipient.id) {
            return clients[i].first_name + " " + clients[i].last_name
        }
    }
}

/**
 * Function to return phone number for individual recipients. Called 
 * for each client in the itinerary for the driver's route.
 * @param {Object} recipient Recipient object from the route.
 * @returns Client's phone number.
 */
getPhone(recipient) {
    let clients = this.state.recipients
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === recipient.id) {
            return clients[i].phone
        }
    }
}

/**
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
render() {
    return ( 
        <Container>
            <Card border="dark" className="mb-4 mt-4">
            <Card.Title className="card-header border-dark bg-grey">
                <Col>
                    <Row >
                        <Col sm={10} className="title">
                            {this.state.driver.first_name
                                + " " + this.state.driver.last_name}
                        </Col>
                    </Row>
                </Col>
            </Card.Title>
            <Card.Header className="pt-1 pl-1 pr-1 pb-1 border-dark bg-grey">
            <Table className="hover table mb-0">
                    <thead>
                        <tr>
                            <th>Capacity</th>
                            <th>Total Quantity</th>
                            <th>Total Distance</th>
                            <th>Total Duration (minutes)</th>
                            <th>Employee Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.driver.capacity}</td>
                            <td>{this.state.route.total_quantity}</td>
                            <td>{Math.round(this.state.route.total_distance)}</td>
                            <td>{Math.round(this.state.route.total_duration)}</td>
                            <td>{this.state.driver.employee_status}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Header>
            <Card.Subtitle className="pb-2 pt-4 pl-4 title">
                Delivery List
            </Card.Subtitle>
            <Card.Body className="card-body pl-1 pr-1 pt-1">
                <Table className="hover table mb-0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Phone Number</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                {this.state.route.itinerary.map( l =>                     
                        <tr>
                            <td>{this.getRecipientName(l)}</td>
                            <td>{l.address.address}</td>
                            <td>{l.address.city}</td>
                            <td>{l.address.state}</td>
                            <td>{l.address.zipcode}</td>
                            <td>{this.getPhone(l)}</td>
                            <td>{l.demand}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </Card.Body>
            </Card>         
      </Container>
    );
}
} export  default  DriverRoute
