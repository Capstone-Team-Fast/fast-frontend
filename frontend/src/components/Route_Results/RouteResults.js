import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import RouteService from '../../services/RouteService'
import RecipientService from '../../services/RecipientService'
import DriverService from '../../services/DriverService'

const  routeService  =  new  RouteService();
const  recipientService  =  new  RecipientService();
const  driverService  =  new  DriverService();

/**
 * This component is used to display route information for all 
 * selected drivers with links to view individual route information.
 */
class  RouteResults  extends  Component {

/**
 * The constructor method initializes the component's state object and
 * binds the methods of the component to the current instance.
 * @param {Object} props The properties passed to the component.
 */
constructor(props) {
     super(props);
     const {id} = props.match.params
     this.state  = {
         routeList: {id: id, routes:[], others:[]},
         recipients: [],
         drivers: [],
         missing: false
     };

     this.getRecipientName = this.getRecipientName.bind(this)
     this.getPhone = this.getPhone.bind(this)
     this.getDriverName = this.getDriverName.bind(this)
     this.getCapacity = this.getCapacity.bind(this)
     this.getEmployeeStatus = this.getEmployeeStatus.bind(this)
     this.getMissingName = this.getMissingName.bind(this)
     this.getMissingPhone = this.getMissingPhone.bind(this)
     this.getMissingAddress = this.getMissingAddress.bind(this)
}

/**
 * Life cycle hook that is called after the component is first rendered.
 */
componentDidMount() {
    recipientService.getRecipients().then(result => {
        this.setState({
            recipients: result
        })
    })

    driverService.getDrivers().then(result => {
        this.setState({
            drivers: result
        })
    })

    routeService.getRouteList(this.state.routeList.id).then(result => {
        console.log(this.state.routeList)
        let missing = false 
        if (result.solver_status !== 1) {
            missing = true
        }
        this.setState({
            routeList: result,        
            missing: missing
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
    console.log(this.state)
}

/**
 * Function to return full name for missing recipients. Called 
 * for each client that is missing from the route list.
 * @param {Number} id Recipient id from the missing list.
 * @returns Client's full name.
 */
 getMissingName(id) {
    let clients = this.state.recipients
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === id) {
            return clients[i].first_name + " " + clients[i].last_name
        }
    }
}

/**
 * Function to return address for missing recipients. Called 
 * for each client that is missing from the route list.
 * @param {Number} id Recipient id from the missing list.
 * @returns Client's address.
 */
 getMissingAddress(id) {
    let clients = this.state.recipients
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === id) {
            let location = clients[i].location
            let address = location.address + " " + location.city 
            + " " + location.state + " " + location.zipcode
            return address
        }
    }
    return 
}

/**
 * Function to return phone number for missing recipients. Called 
 * for each client that is missing from the route list.
 * @param {Number} id Recipient id from the missing list.
 * @returns Client's phone number.
 */
getMissingPhone(id) {
    let clients = this.state.recipients
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === id) {
            return clients[i].phone
        }
    }

}

/**
 * Function to return phone number for individual recipients. Called 
 * for each client in the itinerary for each driver's route.
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
 * Function to return full name for individual drivers. Called 
 * for each driver in the route list.
 * @param {Object} route Route object from the route list.
 * @returns Driver's full name.
 */
getDriverName(route) {
    let drivers = this.state.drivers
    for (let i = 0; i < drivers.length; i++) {
        if (drivers[i].id === route.assigned_to) {
            return drivers[i].first_name + " " + drivers[i].last_name
        }
    }
    return ""
}

/**
 * Function to return capacity for individual drivers. Called 
 * for each driver in the route list.
 * @param {Object} route Route object from the route list.
 * @returns Driver's capacity.
 */
getCapacity(route) {
    let drivers = this.state.drivers
    for (let i = 0; i < drivers.length; i++) {
        if (drivers[i].id === route.assigned_to) {
            return drivers[i].capacity
        }
    }
    return ""
}

/**
 * Function to return employee staus for individual drivers. Called 
 * for each driver in the route list.
 * @param {Object} route Route object from the route list.
 * @returns Driver's employee status.
 */
getEmployeeStatus(route) {
    let drivers = this.state.drivers
    for (let i = 0; i < drivers.length; i++) {
        if (drivers[i].id === route.assigned_to) {
            return drivers[i].employee_status
        }
    }
    return ""
}


/**
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
render() {
    return (
        <Container>
            {console.log(this.state.missing)}
            {
                this.state.missing ? 
                <Card className="mb-4 mt-4">
                    <Card.Title className="card-header border-dark bg-red">
                    <Col>
                        <Row >
                            <Col sm={8} className="title text-light">
                               {this.state.routeList.description}
                            </Col>
                        </Row>
                    </Col>
                </Card.Title>

                <Card.Title className="card-header border-dark mt-4 mb-4 bg-red">
                    <Col>
                        <Row >
                            <Col sm={8} className="title text-light">
                               {this.state.routeList.message}
                            </Col>
                        </Row>
                    </Col>
                </Card.Title>

                    <Card.Title className="card-header border-dark bg-grey">
                        <Col>
                            <Row >
                                <Col sm={8} className="title">
                                   Unassigned Clients 
                                </Col>
                            </Row>
                        </Col>
                    </Card.Title>
                    <Card.Body className="card-body pl-1 pr-1 pt-1">
                    <Table className="hover table mb-0">
                        {this.state.routeList.others.map(c => 
                                <tr>
                                    <td>{this.getMissingName(c)}</td>
                                    <td>{this.getMissingAddress(c)}</td>
                                    <td>{this.getMissingPhone(c)}</td>
                                </tr>
                            
                        )}
                    </Table>
                    </Card.Body>
                </Card> 
                :
                <Card border="dark" className="mb-4 mt-4">
                <Card.Title className="card-header border-dark bg-green">
                    <Col>
                        <Row >
                            <Col sm={8} className="title text-light">
                               {this.state.routeList.description} 
                            </Col>
                        </Row>
                    </Col>
                </Card.Title>
            </Card>}
            {this.state.routeList.routes.map(r =>
            <Card border="dark" className="mb-4 mt-4">
            <Card.Title className="card-header border-dark bg-grey">
                <Col>
                    <Row className="d-flex flex-row">
                        <Col sm={8} className="title">
                            {this.getDriverName(r)}
                        </Col>
                        <Col sm={4} className="justify-content-end d-flex flex-row">
                            <Button href={"/routeResults/driverRoute/" 
                                + r.id + "/" + r.assigned_to} 
                                target="_blank">Print</Button>
                        </Col>   
                    </Row>
                </Col>
            </Card.Title>
            <Card.Header className="pt-1 pl-1 pr-1 pb-1 border-dark bg-grey">
            <Table className="hover table  mb-0">
                    <thead>
                        <tr>
                            <th>Capacity</th>
                            <th>Total Quantity</th>
                            <th>Expected Distance Traveled (in Miles)</th>
                            <th>Expected Duration (in Minutes)</th>
                            <th>Employee Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.getCapacity(r)}</td>
                            <td>{r.total_quantity}</td>
                            <td>{Math.round(r.total_distance)}</td>
                            <td>{Math.round(r.total_duration)}</td>
                            <td>{this.getEmployeeStatus(r)}</td>
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
                {r.itinerary.map( l =>                     
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
            )}            
      </Container>
    );
}
}
export  default  RouteResults