import  React, { Component } from  'react';
import { Redirect } from 'react-router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PhoneInput from 'react-phone-number-input'
import DriverService from '../../../services/DriverService';
import Link from 'react-router-dom/Link';

/**
 * This component is used to add individual drivers to the database.
 */
class  AddDriver  extends  Component {

/**
 * The constructor method initializes the component's state object and
 * binds the methods of the component to the current instance.
 * @param {Object} props The properties passed to the component.
 */
constructor(props) {
    super(props);
    this.state = {
        'user': '', 'first_name': '', 'last_name': '', 
        'phone': '', 'availability': {'sunday': false,
        'monday': false, 'tuesday': false, 'wednesday': false, 
        'thursday': false, 'friday': false, 'saturday': false}, 
        'employee_status': '', 'capacity': '', 'languages': []
    };
    this.languages = ['English', 'Spanish', 'Arabic', 'Chinese', 'German', 'French',
                        'Hindi', 'Russian', 'Portuguese', 'Other'];
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

/**
 * This method retrieves the value, name, and id properties of the 
 * event that has been triggered.
 * @param {Object} event The event that has been triggered.
 * @returns The value, name, and id properties of the triggered event.
 */
getEventValues(event) {
    let [value, name, id] = [   event.target.value, 
                                event.target.name, 
                                event.target.id];
    return [value, name, id];
}

/**
 * Event handler that is called to update the component's state when
 * the user changes the values of the form fields associated with a 
 * driver's availability.
 * @param {Object} event The event that is triggered on a change of value
 *                          to the availability fields in the form.
 */
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

/**
 * Event handler that is called to update the component's state when
 * the user changes the values of the form fields associated with a 
 * driver's languages.
 * @param {Object} event The event that is triggered on a change of value
 *                          to the language fields in the form.
 */
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
}

/**
 * Event handler that is called to update the component's state
 * when the user changes the value of the form field associated 
 * with a driver's phone number.
 * @param {Object} event The event that is triggered on a change of value
 *                          to the phone number field in the form.
 */
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
}

/**
 * Generic event handler that is called to update the component's state 
 * when the user changes the value of a form field that does not require 
 * special handling.
 * @param {Object} event The event that is triggered on a change of value
 *                          to a generic form field.
 */
handleChange(event) {
    let [value, name] = this.getEventValues(event);
    this.setState({
        [name]: value
    });
}

/**
 * Event handler that is called upon form submission to create a new 
 * driver in the database and redirect the user to the Data page.
 * @param {Object} event The submission event that is triggered on  
 *                          submission of the form.
 */
handleSubmit = (event) => {
    event.preventDefault();
    this.driverService.createDriver(this.state).then( result => {
        this.setState({redirect: "/"});
    });
}

/**
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect}/>
    }

    return (
        <Container>
            <h1 className="h2">Driver's Details</h1>
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
                            <option>Employee</option>
                            <option>Volunteer</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCapacity">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control type="number" placeholder="Vehicle Capacity"
                        required onChange={this.handleChange} name="capacity" min="0"/>
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

                <Button variant="primary" className="mr-4" type="submit">Submit</Button>
                <Link to="/">
                    <Button variant="secondary">Cancel</Button>
                </Link>
            </Form>
        </Container>
        );
    }
}
export default AddDriver;