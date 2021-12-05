import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import RouteService from '../../services/RouteService'
import RecipientService from '../../services/RecipientService'

const  routeService  =  new  RouteService();
const  recipientService  =  new  RecipientService();

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
         drivers: ["Bob", "Fred", "Ted", "Ned"],
         route: {id: id},
         recipients: []
     };
     

     this.getFirstName = this.getFirstName.bind(this)
     this.getLastName = this.getLastName.bind(this)
     this.getPhone = this.getPhone.bind(this)

     this.fakeRoute =  {'routes': [
        {
            'id': 1,
            'created_on': '2021-10-19T20:44:43.125437Z',
            'total_quantity': 9,
            'total_distance': 10.2,
            'total_duration': 11.3,
            'assigned_to': {
                'id': 1,
                'first_name': 'Lee',
                'last_name': 'Corso',
                'capacity': 50,
                'employee_status': 'P',
                'availability': [
                    {'id': 1, 'day': 'Sunday'}, {'id': 2, 'day': 'Monday'}, {'id': 3, 'day': 'Tuesday'}
                ],
                'languages': [
                    {'id': 1, 'language': 'English'}, {'id': 2, 'language': 'French'},
                    {'id': 3, 'language': 'Spanish'}
                ],
            },
            'itinerary': [
                {
                    'id': 7,
                    'is_center': true,
                    'address': {
                        'id': 1,
                        'address': 'Center',
                        'city': 'Omaha',
                        'state': 'NE',
                        'zipcode': 68111,
                        'coordinates': {'latitude': 98.23, 'longitude': -23.23}
                    }
                },
                {
                    'id': 13,
                    'is_center': true,
                    'address': {
                        'id': 3,
                        'address': 'Customer_1',
                        'city': 'Omaha',
                        'state': 'NE',
                        'zipcode': 68123,
                        'coordinates': {'latitude': 98.23, 'longitude': -23.23}
                    },
                    'demand': 9,
                    'languages': [
                        {'id': 1, 'language': 'English'}, {'id': 2, 'language': 'French'},
                        {'id': 3, 'language': 'Spanish'}
                    ]
                },
                {
                    'id': 14,
                    'is_center': true,
                    'address': {
                        'id': 1,
                        'address': 'Center',
                        'city': 'Omaha',
                        'state': 'NE',
                        'zipcode': 68111,
                        'coordinates': {'latitude': 98.23, 'longitude': -23.23}
                    }
                },
            ],
        },
        {
            'id': 2,
            'created_on': '2021-10-19T20:44:43.125437Z',
            'total_quantity': 9,
            'total_distance': 10.2,
            'total_duration': 11.3,
            'assigned_to': {
                'id': 2,
                'first_name': 'Kirk',
                'last_name': 'Herbstreit',
                'capacity': 10,
                'employee_status': 'P',
                'availability': [
                    {'id': 1, 'day': 'Sunday'}, {'id': 2, 'day': 'Monday'}, {'id': 3, 'day': 'Tuesday'}
                ],
                'languages': [
                    {'id': 1, 'language': 'English'}, {'id': 2, 'language': 'French'},
                    {'id': 3, 'language': 'Spanish'}
                ],
            },
            'itinerary': [
                {
                    'id': 1,
                    'is_center': true,
                    'address': {
                        'id': 1,
                        'address': 'Center',
                        'city': 'Omaha',
                        'state': 'NE',
                        'zipcode': 68111,
                        'coordinates': {'latitude': 98.23, 'longitude': -23.23}
                    }
                },
                {
                    'id': 10,
                    'is_center': false,
                    'address': {
                        'id': 3,
                        'address': 'Customer_1',
                        'city': 'Omaha',
                        'state': 'NE',
                        'zipcode': 68123,
                        'coordinates': {'latitude': 98.23, 'longitude': -23.23}
                    },
                    'demand': 9,
                    'languages': [
                        {'id': 1, 'language': 'English'}, {'id': 2, 'language': 'French'},
                        {'id': 3, 'language': 'Spanish'}
                    ]
                },
                {
                    'id': 12,
                    'is_center': true,
                    'address': {
                        'id': 1,
                        'address': 'Center',
                        'city': 'Omaha',
                        'state': 'NE',
                        'zipcode': 68111,
                        'coordinates': {'latitude': 98.23, 'longitude': -23.23}
                    }
                },
            ],
        }
    ]
    }
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
    
    // let routes = routeService.getRoutes()
    // console.log(routes)
}

/**
 * Function to return first name for individual recipients. Called 
 * for each client in the itinerary for each driver's route.
 * @param {Object} recipient Recipient object from the route.
 * @returns Client's first name.
 */
getFirstName(recipient) {
    let clients = this.state.recipients
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === recipient.id) {
            return clients[i].first_name
        }
    }
}

/**
 * Function to return last name for individual recipients. Called 
 * for each client in the itinerary for each driver's route.
 * @param {Object} recipient Recipient object from the route.
 * @returns Client's last name.
 */
getLastName(recipient) {
    let clients = this.state.recipients
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id === recipient.id) {
            return clients[i].last_name
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
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
render() {
    return (
        <Container>
            {this.fakeRoute.routes.map(r =>
            <Card border="dark" className="mb-4 mt-4">
            <Card.Title className="card-header border-dark bg-grey">
                <Col>
                    <Row >
                        <Col sm={8} className="title">
                            {r.assigned_to.first_name + " " + r.assigned_to.last_name}
                        </Col>
                        <Col sm={4}> 
                            <Button href={"/routeResults/driverRoute/" + r.id} 
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
                            <th>Total Distance</th>
                            <th>Total Duration (minutes)</th>
                            <th>Employee Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{r.assigned_to.capacity}</td>
                            <td>{r.total_quantity}</td>
                            <td>{r.total_distance}</td>
                            <td>{r.total_duration}</td>
                            <td>{r.assigned_to.employee_status}</td>
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
                            <th>First Name</th>
                            <th>Last Name</th>
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
                            <td>{this.getFirstName(l)}</td>
                            <td>{this.getLastName(l)}</td>
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