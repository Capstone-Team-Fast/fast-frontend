import  React, { Component } from  'react';
import { Redirect } from 'react-router';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import RecipientService from '../../../services/RecipientService';

class  UpdateRecipient  extends  Component {

constructor(props) {
    super(props);
    const {id} = props.match.params; 
    this.state = {'id': id, 'first_name': '', 'last_name': '', 'quantity': '', 
                    'phone': '', 'languages': [], 'location': { 'is_center': false,
                    'latitude': '','longitude': ''}
                };
    this.states = ['Choose...', 'KS', 'IA', 'NE', 'SD'];
    this.languages = ['English', 'Spanish', 'Arabic', 'Chinese', 'German', 'French',
                        'Hindi', 'Russian', 'Portugese', 'Other'];
    
    this.recipientService = new RecipientService();
    this.handleChange = this.handleChange.bind(this);
    this.handleObjectChange = this.handleObjectChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getEventValues = this.getEventValues.bind(this);
    this.getEventIDValue = this.getEventIDValue.bind(this);
    this.checkLanguage = this.checkLanguage.bind(this)
    this.getCenter = this.getCenter.bind(this)
}

componentDidMount() {
    var self = this 
    self.recipientService.getRecipient(self.state.id).then(function (result) {
        self.setState(result);
    })  
    
}

getEventValues(event) {
    let [value, name, id] = [   event.target.value, 
                                event.target.name, 
                                event.target.id];
    return [value, name, id];
}

getEventIDValue(event) {
    return event.target.id;
}


handleObjectChange(event) {
    let [value, name, id] = this.getEventValues(event);
    if (id === "is_center") {
        value = (value === "No") ? false : true 
    }

    this.setState(prevState => ({
        [name]: {
             ...prevState[name],
            [id]: value
        }    
    }
    ));
    console.log(JSON.stringify(this.state))
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


handleLanguageChange(event) {
    let id = this.getEventIDValue(event);
    if (event.target.checked) {
        this.setState({
            languages: this.state.languages.concat({'name': id})
        });
    }
    else {
        var newArr = this.state.languages.filter( l => {
            return l.name !== id
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

checkLanguage(language) {
    for (let i = 0; i < this.state.languages.length; i++) {
        if (this.state.languages[i].name === language)
            return true 
    }
}

getCenter() {
    return (this.state.location.is_center) ? "Yes" : "No" ; 
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
                        <Form.Control type="text" name="first_name" value={this.state.first_name}
                            onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="last_name">Last Name</Form.Label>
                        <Form.Control type="text" name="last_name" value={this.state.last_name}
                        onChange={this.handleChange} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} className="mb-3" controlId="formGridPhone">
                        <Form.Label>Phone Number</Form.Label>
                        
                        <Form.Control  type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        onChange={this.handlePhoneChange} value={this.state.phone}
                        required placeholder="402-345-6789" name="phone" maxlength="12"/>
                    </Form.Group>

                <Form.Group as={Col}>
                        <Form.Label htmlFor="quantity">Quantity</Form.Label> 
                        <Form.Control type="number" onChange={this.handleChange} 
                            name="quantity" min="0"/>
                </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control type="text" name="location" id="address" 
                    value={this.state.location.address}  onChange={this.handleObjectChange} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="room_number">Address 2</Form.Label>
                        <Form.Control type="text" name="location" id="room_number"
                        onChange={this.handleObjectChange} value={this.state.location.room_number} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="is_center">Central Location?</Form.Label> 
                        <Form.Select onChange={this.handleObjectChange}
                            name="location" id="is_center" 
                            value={this.getCenter()}>
                            <option>No</option>
                            <option>Yes</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="city">City</Form.Label>
                        <Form.Control type="text" name="location" id="city" 
                        onChange={this.handleObjectChange} value={this.state.location.city} />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label htmlFor="state">State</Form.Label>
                        <Form.Select onChange={this.handleObjectChange} value={this.state.location.state}
                            name="location" id="state">
                        { this.states.map( s => 
                            <option>{s}</option>
                        )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="zipcode">Zip</Form.Label>
                        <Form.Control type="number" onChange={this.handleObjectChange} 
                            name="location" id="zipcode" value={this.state.location.zipcode}/>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" id="formGridCheckbox">
                    <Row><Form.Label>Languages</Form.Label></Row>
                        { this.languages.map( l => 
                            <Form.Check type="checkbox" inline label={l} id={l} 
                                checked={this.checkLanguage(l)}
                                name="language" onChange={this.handleLanguageChange} />
                        )}
                </Form.Group>

                <Row className="mb-3">
                <InputGroup>
                    <InputGroup.Text>Comments</InputGroup.Text>
                    <FormControl as="textarea" aria-label="With textarea" 
                                name="comments" onChange={this.handleChange}/>
                </InputGroup>
                </Row>

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
        );
    }
}
export default UpdateRecipient;
