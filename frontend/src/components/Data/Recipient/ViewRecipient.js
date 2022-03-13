import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import RecipientService from '../../../services/RecipientService';

const recipientService = new RecipientService();

/**
 * This component is used to view individual recipient information stored 
 * in the database.
 */
class  ViewRecipient  extends  Component {

/**
 * The constructor method initializes the component's state object and
 * binds the methods of the component to the current instance.
 * @param {Object} props The properties passed to the component.
 */
constructor(props) { 
    super(props);
    const {id} = props.match.params
    this.state = {'id': id, 'first_name': '', 'last_name': '', 'quantity': '', 
                    'phone': '', 'languages': [], 'location': { 'is_center': false,
                    'latitude': '','longitude': ''}
                };
    this.showLanguages = this.showLanguages.bind(this)
}

/**
 * Life cycle hook that is called after the component is first rendered.
 */
componentDidMount() {
    var self = this
    recipientService.getRecipient(self.state.id).then(function (result) {
        self.setState(result);
        console.log(result)
    })  
    
}

/**
 * Method to map the array of language objects stored in the component's 
 * state to a list of language names.
 * @returns The list of language names for the recipient.
 */
showLanguages() {
    let languages = []
    this.state.languages.map(l => {
        languages.push(l.name)});
    return languages
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
                        <Col sm={8} className="h2">Recipient Detail</Col>
                        <Col sm={4} className="justify-content-end btn-sm d-flex flex-row">
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
                            <th>Apt #</th>
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
            <Row className="card-body">
                <h2 className="title">Recipient Notes</h2>
                <Table className="striped bordered hover table table-bordered table-striped mb-0">
                    <thead>
                        <tr>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr key={this.state.comments}>
                            <td>{this.state.comments}</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}
}
export default ViewRecipient
