import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import RecipientService from '../../../services/RecipientService';

const recipientService = new RecipientService();

class  ViewRecipient  extends  Component {

constructor(props) { 
    super(props);
    const {id} = props.match.params
    this.state = {'id': id, 'first_name': '', 'last_name': '', 'quantity': '', 
                    'phone': '', 'languages': [], 'location': { 'is_center': false,
                    'latitude': '','longitude': ''}
                };
    this.showLanguages = this.showLanguages.bind(this)
}

componentDidMount() {
    var self = this
    recipientService.getRecipient(self.state.id).then(function (result) {
        self.setState(result);
    })  
    
}

showLanguages() {
    let languages = []
    this.state.languages.map(l => {
        languages.push(l.name)});
    return languages
}


render() {
    
    return (
        <Container className="card mt-2">
            <Row className="card-header">
                <Col>
                    <Row>
                        <Col sm={8} className="h2">Recipient Detail</Col>
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
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr key={this.state.id}>
                            <td>{this.state.id}</td>
                            <td>{this.state.first_name}</td>
                            <td>{this.state.last_name}</td>
                            <td>{this.state.phone}</td>
                            <td>{this.state.quantity}</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <Row className="card-body">
                <h2 className="title">Address Information</h2>
                <Table className="striped bordered hover table table-bordered table-striped mb-0">
                    <thead>
                        <tr>
                            <th>Address</th>
                            <th>Room Number</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip Code</th>
                            <th>Center?</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr key={this.state.location.address}>
                            <td>{this.state.location.address}</td>
                            <td>{this.state.location.room_number ? this.state.location.room_number : "N/A"}</td>
                            <td>{this.state.location.city}</td>
                            <td>{this.state.location.state}</td>
                            <td>{this.state.location.zipcode}</td>
                            <td>{this.state.location.is_center ? "Yes" : "No"}</td>
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
export default ViewRecipient