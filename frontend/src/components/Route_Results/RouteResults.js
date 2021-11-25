import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import RouteService from '../../services/RouteService'

const  routeService  =  new  RouteService();

class  RouteResults  extends  Component {

constructor(props) {
     super(props);
     const {id} = props.match.params
     this.state  = {
         drivers: ["Bob", "Fred", "Ted", "Ned"],
         route: {id: id},
         counter: 0
     };

     this.fakeRoute =  {'routes': [
        {
            'id': 1,
            'created_on': '2021-10-19T20:44:43.125437Z',
            'total_quantity': 9,
            'total_distance': 10.2,
            'total_duration': 11.3,
            'assigned_to': {
                'id': 1,
                'first_name': 'First_1',
                'last_name': 'Last_1',
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
                    'id': 2,
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
                'first_name': 'First_2',
                'last_name': 'Last_2',
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
                    'id': 2,
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
            ],
        }
    ]
    }
}

componentDidMount() {
    let routes = routeService.getRoutes()
    console.log(routes)
}

render() {
    return (
        <Container>
            {this.fakeRoute.routes.map(r =>
            <Card border="dark" className="mb-4 mt-4">
            <Card.Title className="card-header border-dark">
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
            <Card.Header className="pt-1 pl-1 pr-1 pb-1 border-dark">
            <Table className="hover table table-bordered table-striped mb-0">
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
                <Table className="hover table table-bordered table-striped mb-0">
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                {r.itinerary.map( l =>                     
                        <tr>
                            <td>{l.address.address}</td>
                            <td>{l.address.city}</td>
                            <td>{l.address.state}</td>
                            <td>{l.address.zipcode}</td>
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