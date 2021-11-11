import  React, { Component } from  'react';
import { Redirect } from 'react-router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipientService from '../../../services/RecipientService';

class  UpdateRecipient  extends  Component {

constructor(props) {
    super(props);
    const {id} = props.match.params; 
    this.state = {'pk': id, 'user': '', 'first_name': '', 'last_name': '', 
                    'phone': '', 'location': {}, 'languages': []
                };
    this.states = ['Choose...', 'KS', 'IA', 'NE', 'SD'];
    this.languages = ['English', 'Spanish', 'Arabic', 'Chinese', 'German', 'French',
                        'Hindi', 'Russian', 'Portugese', 'Other'];
    
    this.recipientService = new RecipientService();
    this.handleChange = this.handleChange.bind(this);
    this.handleObjectChange = this.handleObjectChange.bind(this);
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

handleObjectChange(event) {
    let [value, name, id] = this.getEventValues(event);
    this.setState(prevState => ({
        [name]: {
             ...prevState[name],
            [id]: value
        }    
    }
    ));
    console.log(this.state)
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
    this.recipientService.updateRecipient(this.state);
    this.setState({redirect: "/"});
    console.log(this.state)
}

render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }

    return (
        <Container>
            <h1>Update Recipient Data</h1>
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

                <Form.Group className="mb-3" controlId="formGridPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control  onChange={this.handleChange} 
                    required placeholder="402-345-6789" name="phone"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control type="text" name="location" id="address"
                    onChange={this.handleObjectChange} required placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="room_number">Address 2</Form.Label>
                    <Form.Control type="text" name="location" id="room_number"
                    onChange={this.handleObjectChange} placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="city">City</Form.Label>
                        <Form.Control type="text" name="location" id="city"
                        onChange={this.handleObjectChange} required />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label htmlFor="state">State</Form.Label>
                        <Form.Select onChange={this.handleObjectChange}
                            name="location" id="state">
                        { this.states.map( s => 
                            <option>{s}</option>
                        )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="zipcode">Zip</Form.Label>
                        <Form.Control type="number" onChange={this.handleObjectChange} 
                            name="location" id="zipcode"/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Row><Form.Label>Languages</Form.Label></Row>
                        { this.languages.map( l => 
                            <Form.Check type="checkbox" inline label={l} id={l}
                                name="language" onChange={this.handleLanguageChange} />
                        )}
                </Form.Group>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
        );
    }
}
export default UpdateRecipient;
