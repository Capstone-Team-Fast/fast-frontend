import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DriverService from '../../../services/DriverService';
import Link from 'react-router-dom/Link'

/**
 * This component is used to update individual driver information stored 
 * in the database.
 */
class  UpdateDriver  extends  Component {

/**
 * The constructor method initializes the component's state object and
 * binds the methods of the component to the current instance.
 * @param {Object} props The properties passed to the component.
 */
constructor(props) {
    super(props);
    const {id} = props.match.params; 
    this.state = {'id': id,'user': '', 'first_name': '', 'last_name': '', 
                    'phone': '', 'availability': 
                    {'sunday': false, 'monday': false, 'tuesday': false, 
                    'wednesday': false, 'thursday': false, 'friday': false, 
                    'saturday': false, 'id': ''}, 
                    'employee_status': '', 'capacity': '', 'languages': []
                };
    this.languages = ['English', 'Spanish', 'Arabic', 'Chinese', 'German', 'French',
                        'Hindi', 'Russian', 'Portuguese', 'Other'];
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                    'Friday', 'Saturday']
    
    this.driverService = new DriverService()
    this.handleChange = this.handleChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getEventValue = this.getEventValue.bind(this);
    this.getEventName = this.getEventName.bind(this);
    this.getEventID = this.getEventID.bind(this);
    this.checkLanguage = this.checkLanguage.bind(this)
    this.getAvailability = this.getAvailability.bind(this)
}

/**
 * Life cycle hook that is called after the component is first rendered.
 */
componentDidMount() {
    var self = this 
    self.driverService.getDriver(self.state.id).then(function (result) {
        self.setState(result);
    })     
}

/**
 * This method retrieves the value property of the event that has been triggered.
 * @param {Object} event The event that has been triggered.
 * @returns The value property of the triggered event.
 */
getEventValue(event) {
    return event.target.value ;
}

/**
 * This method retrieves the name property of the event that has been triggered.
 * @param {Object} event The event that has been triggered.
 * @returns The name property of the triggered event.
 */
getEventName(event) {
    return event.target.name;
}

/**
 * This method retrieves the id property of the event that has been triggered.
 * @param {Object} event The event that has been triggered.
 * @returns The id property of the triggered event.
 */
getEventID(event) {
    return event.target.id ;
}

/**
 * Event handler that is called to update the component's state when
 * the user changes the values of the form fields associated with a 
 * driver's availability.
 * @param {Object} event The event that is triggered on a change of value
 *                          to the availability fields in the form.
 */
handleAvailabilityChange(event) {
    let name = this.getEventName(event);
    let id = this.getEventID(event);
    let checked = event.target.checked 
    this.setState(prevState => ({
            [name]: {
                 ...prevState[name],
                [id.toLowerCase()]: checked
            },
            saved: false    
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
    let id = this.getEventID(event);
    if (event.target.checked) {
        this.setState({
            languages: this.state.languages.concat({'name': id}),
            saved: false
        });
    }
    else {
        var newArr = this.state.languages.filter( l => {
            return l.name !== id;
        })
        this.setState({languages:  newArr, saved: false});
    }
}

/**
 * Generic event handler that is called to update the component's state 
 * when the user changes the value of a form field that does not require 
 * special handling.
 * @param {Object} event The event that is triggered on a change of value
 *                          to a generic form field.
 */
handleChange(event) {
    let value = this.getEventValue(event);
    let name = this.getEventName(event);
    this.setState({
        [name]: value,
        saved: false
    });
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
        'phone': phone,
        saved: false
    });
}

/**
 * Event handler that is called upon form submission to update the 
 * driver's in the database and redirect the user to the Data page.
 * @param {Object} event The submission event that is triggered on  
 *                          submission of the form.
 */
 handleSubmit = (event) => {
    event.preventDefault();
    this.driverService.updateDriver(this.state).then(result => {
        if (result.data.id === this.state.id) {
            this.setState({
                saved: true 
            })
        }
        else {
            this.setState({
                saved: false 
            })
        }});
}

/**
 * Method called to prepopulate the language fields of the form based on
 * whether the language passed as a parameter is stored in the driver's state.
 * @param {String} language The name of a language.
 * @returns True if the language is stored in the current driver's state, 
 *          false otherwise.
 */
checkLanguage(language) {
    for (let i = 0; i < this.state.languages.length; i++) {
        if (this.state.languages[i].name === language)
            return true 
    }
}

/**
 * Method called to prepopulate the availability fields of the form based on
 * whether the day passed as a parameter is stored in the driver's state.
 * @param {String} day The name of a day.
 * @returns True if the day is stored in the current driver's state, 
 *          false otherwise.
 */
 getAvailability(day) {
    day = day.toLowerCase()
    return this.state.availability[day] ;
}

/**
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
render() {
    return (
        <Container>
            <h1 className="h2">Update Driver Data</h1>
            <Form onSubmit={this.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="first_name">First Name</Form.Label>
                        <Form.Control type="text" name="first_name" value={this.state.first_name}
                            required onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="last_name">Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={this.state.last_name}
                        required onChange={this.handleChange}  />
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
                        <Form.Select onChange={this.handleChange} name="employee_status"
                            value={this.state.employee_status}>
                            <option>Employee</option>
                            <option>Volunteer</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCapacity">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control type="number" value={this.state.capacity}
                        required onChange={this.handleChange} name="capacity" min="0"/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Row><Form.Label>Availabilty</Form.Label></Row>
                        { this.days.map( d => 
                            <Form.Check type="checkbox" name="availability" 
                                        checked={this.getAvailability(d)} 
                                        inline label={d} id={d} 
                                        onChange={this.handleAvailabilityChange} />
                        )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Row><Form.Label>Languages</Form.Label></Row>
                        { this.languages.map( l => 
                            <Form.Check type="checkbox" inline label={l} id={l}
                                checked={this.checkLanguage(l)}
                                name="languages" onChange={this.handleLanguageChange} />
                        )}
                </Form.Group>

                <Button variant="primary" className="mr-4" 
                    onClick={this.handleSubmit}>Submit</Button>
                <Link to="/">
                    <Button variant="secondary">Return</Button>
                </Link>
                {this.state.saved ?
                    <Row className='text-success h4 mt-2 mb-4'>Driver Updated!</Row> :
                    <Row></Row> }
            </Form>
        </Container>
        );
    }
}
export default UpdateDriver;