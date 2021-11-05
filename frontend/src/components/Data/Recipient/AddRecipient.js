import  React, { Component } from  'react';
import { Redirect } from 'react-router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipientService from '../../../services/RecipientService';

class  AddRecipient  extends  Component {

constructor(props) {
    super(props);
    this.state = {'first_name': '', 'last_name': '', 'phone': '',
                    'address': '', 'room_number': '', 'city': '',
                    'state': '','zipcode': '', 'languages': []
                };
    this.states = ['Choose...', 'KS', 'IA', 'NE', 'SD'];
    this.languages = ['English', 'Spanish', 'Arabic', 'Chinese', 'German', 'French',
                        'Hindi', 'Russian', 'Portugese', 'Other'];
    
    this.recipientService = new RecipientService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    const value = event.target.value 
    const name = event.target.name 

    if (name === "language") {
        const id = event.target.id
        let found = false;
        for (let language in this.state.languages) {
            console.log("id = " + id + "\nlanguage = " + language)
            if (id === this.state.languages[language]) {
                this.state.languages.splice(language, 1);
                found = true;
                break;
            }
        }
        if (!found) {
            this.state.languages.push(id)
        }
    }
    else {
        this.setState({
            [name]: value
        });
    }
}

handleSubmit = (event) => {
    event.preventDefault();
    this.recipientService.createRecipient(this.state);
    this.setState({redirect: "/"});
}
    
render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }

    return (
        <Container>
            <Form onSubmit={this.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" name="first_name"
                            onChange={this.handleChange} required placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" name="last_name"
                        onChange={this.handleChange} required placeholder="Enter Last Name" />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control  onChange={this.handleChange} 
                    required placeholder="402-345-6789" name="phone"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address"
                    onChange={this.handleChange} required placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control type="text" name="room_number"
                    onChange={this.handleChange} placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city"
                        onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Select onChange={this.handleChange}
                            name="state">
                        { this.states.map( s => 
                            <option>{s}</option>
                        )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="number"
                        onChange={this.handleChange} name="zipcode"/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Row><Form.Label>Languages</Form.Label></Row>
                        { this.languages.map( l => 
                            <Form.Check type="checkbox" inline label={l} id={l}
                                name="language" onChange={this.handleChange} />
                        )}
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
        );
    }
}
export default AddRecipient;