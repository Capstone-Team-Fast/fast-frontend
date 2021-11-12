import  React, { Component, useState } from  'react';
import { Redirect } from 'react-router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DriverService from '../../../services/DriverService';

class  UpdateDriver  extends  Component {

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
                        'Hindi', 'Russian', 'Portugese', 'Other'];
    this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                    'Friday', 'Saturday']
    
    this.driverService = new DriverService()
    this.handleChange = this.handleChange.bind(this);
    this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getEventValue = this.getEventValue.bind(this);
    this.getEventName = this.getEventName.bind(this);
    this.getEventID = this.getEventID.bind(this);
    this.checkLanguage = this.checkLanguage.bind(this)
    this.getAvailability = this.getAvailability.bind(this)
}

componentDidMount() {
    var self = this 
    self.driverService.getDriver(self.state.id).then(function (result) {
        self.setState(result, () => {console.log(self.state)});
    })     
}

getEventValue(event) {
    return event.target.value ;
}

getEventName(event) {
    return event.target.name;
}

getEventID(event) {
    return event.target.id ;
}

handleAvailabilityChange(event) {
    let name = this.getEventName(event);
    let id = this.getEventID(event);
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
    let id = this.getEventID(event);
    if (event.target.checked) {
        this.setState({
            languages: this.state.languages.concat({'name': id})
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

handleChange(event) {
    let value = this.getEventValue(event);
    let name = this.getEventName(event);
    this.setState({
        [name]: value
    });
    console.log(this.state)
}

handleSubmit = (event) => {
    event.preventDefault();
    this.driverService.updateDriver(this.state);
    this.setState({redirect: "/"});
    console.log(this.state)
}

checkLanguage(language) {
    for (let i = 0; i < this.state.languages.length; i++) {
        if (this.state.languages[i].name === language)
            return true 
    }
}

getAvailability(day) {
    day = day.toLowerCase()
    return this.state.availability[day] ;
}

render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }

    return (
        <Container>
            <h1>Update Driver Data</h1>
            <Form onSubmit={this.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="first_name">First Name</Form.Label>
                        <Form.Control type="text" name="first_name" value={this.state.first_name}
                            onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="last_name">Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={this.state.last_name}
                        onChange={this.handleChange}  />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} className="mb-3" controlId="formGridPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control  onChange={this.handleChange} name="phone"
                            value={this.state.phone}/>
                    </Form.Group>

                    <Form.Group as={Col} className="mb-3" controlId="formGridStatus">
                        <Form.Label>Status</Form.Label>
                        <Form.Select onChange={this.handleChange} name="employee_status"
                            value={this.state.employee_status}>
                            <option>Choose...</option>
                            <option>Employee</option>
                            <option>Volunteer</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCapacity">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control type="number" value={this.state.capacity}
                        onChange={this.handleChange} name="capacity" min="0"/>
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

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
        );
    }
}
export default UpdateDriver;