import  React, { Component } from  'react';
import { Redirect } from 'react-router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'
import DriverService from '../../../services/DriverService';

class  AddDriver  extends  Component {

constructor(props) {
    super(props);
    this.state = {'user': {}, 'phone': '', 'availability': {'sunday': false,
                    'monday': false, 'tuesday': false, 'wednesday': false, 
                    'thursday': false, 'friday': false, 'saturday': false}, 
                    'employee_status': '', 'capacity': '', 'languages': []
                };
    this.languages = ['English', 'Spanish', 'Arabic', 'Chinese', 'German', 'French',
                        'Hindi', 'Russian', 'Portugese', 'Other'];
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                    'Friday', 'Saturday']
    
    this.driverService = new DriverService();
    this.handleChange = this.handleChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getEventValues = this.getEventValues.bind(this);
}

getEventValues(event) {
    let [value, name, id] = [   event.target.value, 
                                event.target.name, 
                                event.target.id];
    return [value, name, id];
}

handleNameChange(event) {
    let [value, name, id] = this.getEventValues(event);
    this.setState(prevState => ({
        [name]: {
             ...prevState[name],
            [id]: value
        }    
    }
    ));
}

handleAvailabilityChange(event) {
    let [value, name, id] = this.getEventValues(event);
    let checked = event.target.checked 
    this.setState(prevState => ({
            [name]: {
                 ...prevState[name],
                [id.toLowerCase()]: checked
            }    
        }
        ));
}

handleLanguageChange(event) {
    let [value, name, id] = this.getEventValues(event);
    if (event.target.checked) {
        this.setState({
            languages: this.state.languages.concat(id)
        });
    }
    else {
        var newArr = this.state.languages.filter( l => {
            return l !== id;
        })
        this.setState({languages:  newArr});
    }
}

handleChange(event) {
    let [value, name] = this.getEventValues(event);
    this.setState({
        [name]: value
    });
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
            <h1>Add a New Driver</h1>
            <Form onSubmit={this.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="first_name">First Name</Form.Label>
                        <Form.Control type="text" name="user" id="first_name"
                            onChange={this.handleNameChange} required placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="last_name">Last Name</Form.Label>
                        <Form.Control type="text" name="user" id="last_name"
                        onChange={this.handleNameChange} required placeholder="Enter Last Name" />
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

                <Form.Group className="mb-3">
                    <Row><Form.Label>Availabilty</Form.Label></Row>
                        { this.days.map( d => 
                            <Form.Check type="checkbox" name="availability" value="true" 
                            inline label={d} id={d} 
                            onChange={this.handleAvailabilityChange} />
                        )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Row><Form.Label>Languages</Form.Label></Row>
                        { this.languages.map( l => 
                            <Form.Check type="checkbox" inline label={l} id={l}
                                name="languages" onChange={this.handleLanguageChange} />
                        )}
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
        );
    }
}
export default AddDriver;