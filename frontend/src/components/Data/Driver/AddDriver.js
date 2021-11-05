import  React, { Component } from  'react';
import { Redirect } from 'react-router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DriverService from '../../../services/DriverService';

class  AddDriver  extends  Component {

constructor(props) {
    super(props);
    this.state = {'first_name': '', 'last_name': '', 'phone': '',
                    'availability': [], 'employee_status': '', 'capacity': '',
                    'languages': []
                };
    this.languages = ['English', 'Spanish', 'Arabic', 'Chinese', 'German', 'French',
                        'Hindi', 'Russian', 'Portugese', 'Other'];
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                    'Friday', 'Saturday']
    
    this.driverService = new DriverService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    const value = event.target.value 
    const name = event.target.name 
    console.log(name)

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
        console.log(this.state)
    }
    else if (name === "availability") {
        const id = event.target.id
        let found = false;
        for (let day in this.state.availability) {
            console.log("id = " + id + "\nDay = " + day)
            if (id === this.state.availability[day]) {
                this.state.availability.splice(day, 1);
                found = true;
                break;
            }
        }
        if (!found) {
            this.state.availability.push(id)
        }
        console.log(this.state)

    }
    else {
        this.setState({
            [name]: value
        });
    }
    
    console.log("Name = " + name + "\nValue= " + value)
    console.log(this.state)
}

handleSubmit = (event) => {
    event.preventDefault();
    this.driverService.createDriver(this.state);
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

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="formGridPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control  onChange={this.handleChange} 
                        required placeholder="402-345-6789" name="phone"/>
                    </Form.Group>
                    <Form.Group as={Col} className="mb-3" controlId="formGridStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Select onChange={this.handleChange} name="employee_status">
                            <option>Choose...</option>
                            <option>Employee</option>
                            <option>Volunteer</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridCapacity">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control type="number" placeholder="Vehicle Capacity"
                        onChange={this.handleChange} name="capacity" min="0"/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox1">
                    <Row><Form.Label>Availabilty</Form.Label></Row>
                        { this.days.map( d => 
                            <Form.Check type="checkbox" inline label={d} id={d}
                                name="availability" onChange={this.handleChange} />
                        )}
                </Form.Group>

                <Form.Group className="mb-3" id="formGridCheckbox2">
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
export default AddDriver;