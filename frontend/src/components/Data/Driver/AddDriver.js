import  React, { Component } from  'react';
import { Redirect } from 'react-router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PhoneInput from 'react-phone-number-input'
import DriverService from '../../../services/DriverService';


class  AddDriver  extends  Component {

constructor(props) {
    super(props);
    this.state = {'user': '', 'first_name': '', 'last_name': '', 
                    'phone': '', 'availability': {'sunday': false,
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
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
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
        console.log(this.state)
}

handleLanguageChange(event) {
    let [value, name, id] = this.getEventValues(event);
    if (event.target.checked) {
        this.setState({
            languages: this.state.languages.concat({'name':id})
        });
    }
    else {
        var newArr = this.state.languages.filter( l => {
            return l.name !== id;
        })
        this.setState({languages:  newArr});
    }
    console.log(this.state)
}

handlePhoneChange(event) {
    let value = event.target.value.replace(/[^\d]/g, "")
    let phone =""

    if (value.length < 4) {
        phone = value 
    }
    else if (value.length < 7) {
        phone = value.slice(0, 3) + "-" + value.slice(3)
    }
    else {
        phone = value.slice(0,3) + "-" + value.slice(3,6) + "-" +
            value.slice(6)
    }
    
    this.setState({
        'phone': phone
    });
    console.log(this.state)
}

handleChange(event) {
    let [value, name] = this.getEventValues(event);
    this.setState({
        [name]: value
    });
    console.log(this.state)
}

handleSubmit = (event) => {
    event.preventDefault();
    this.driverService.createDriver(this.state);
    this.setState({redirect: "/"});
    console.log(this.state)
}
    
render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect}/>
    }

    return (
        <Container>
            <h1>Add a New Driver</h1>
            <Form onSubmit={this.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="first_name">First Name</Form.Label>
                        <Form.Control type="text" name="first_name" 
                            onChange={this.handleChange} required placeholder="Enter First Name" />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="last_name">Last Name</Form.Label>
                        <Form.Control type="text" name="last_name"
                        onChange={this.handleChange} required placeholder="Enter Last Name" />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="formGridPhone">
                        <Form.Label>Phone Number</Form.Label>
                        
                        <Form.Control  type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        onChange={this.handlePhoneChange} value={this.state.phone}
                        required placeholder="402-345-6789" name="phone" maxlength="12"/>
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