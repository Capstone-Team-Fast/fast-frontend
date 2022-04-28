import  React, { Component } from  'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import RecipientService from '../../../services/RecipientService';
import Link from 'react-router-dom/Link';

/**
 * This component is used to update individual recipient information stored 
 * in the database.
 */
 class  UpdateRecipient  extends  Component {

/**
 * The constructor method initializes the component's state object and
 * binds the methods of the component to the current instance.
 * @param {Object} props The properties passed to the component.
 */
constructor(props) {
    super(props);
    const {id} = props.match.params; 
    this.state = {'id': id, 'first_name': '', 'last_name': '', 'quantity': '', 
                    'phone': '', 'comments': '', 'languages': [], 'location': { 'is_center': false,
                    'latitude': '','longitude': ''}
                };
    this.states = ['Choose...', 'KS', 'IA', 'NE', 'SD'];
    this.languages = ['English', 'Spanish', 'Arabic', 'Chinese', 'German', 'French',
                        'Hindi', 'Russian', 'Portuguese', 'Other'];
    
    this.recipientService = new RecipientService();
    this.handleChange = this.handleChange.bind(this);
    this.handleObjectChange = this.handleObjectChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getEventValues = this.getEventValues.bind(this);
    this.getEventIDValue = this.getEventIDValue.bind(this);
    this.checkLanguage = this.checkLanguage.bind(this);
    this.getCenter = this.getCenter.bind(this);
}

/**
 * Life cycle hook that is called after the component is first rendered.
 */
componentDidMount() {
    var self = this 
    self.recipientService.getRecipient(self.state.id).then(function (result) {
        self.setState(result);
    })  
    
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
 * This method retrieves the id property of the event that has been triggered.
 * @param {Object} event The event that has been triggered.
 * @returns The id property of the triggered event.
 */
 getEventIDValue(event) {
    return event.target.id;
}


/**
 * Generic event handler that is called to update the component's state 
 * when the user changes the value of a form field associated with a property 
 * of the component's state that is an object.
 * @param {Object} event The event that is triggered on a change of value
 *                          to a form field.
 */
handleObjectChange(event) {
    let [value, name, id] = this.getEventValues(event);
    if (id === "is_center") {
        value = (value === "No") ? false : true 
    }

    this.setState(prevState => ({
        [name]: {
             ...prevState[name],
            [id]: value
        }, 
        saved: false    
    }
    ));
}

/**
 * Event handler that is called to update the component's state
 * when the user changes the value of the form field associated 
 * with a recipient's phone number.
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
 * Event handler that is called to update the component's state when
 * the user changes the values of the form fields associated with a 
 * recipient's languages.
 * @param {Object} event The event that is triggered on a change of value
 *                          to the language fields in the form.
 */
handleLanguageChange(event) {
    let id = this.getEventIDValue(event);
    if (event.target.checked) {
        this.setState({
            languages: this.state.languages.concat({'name': id}),
            saved: false
        });
    }
    else {
        var newArr = this.state.languages.filter( l => {
            return l.name !== id
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
    let [value, name] = this.getEventValues(event);
    this.setState({
        [name]: value,
        saved: false
    });
}

/**
 * Event handler that is called upon form submission to update a recipient's 
 * information in the database and redirect the user to the Data page.
 * @param {Object} event The submission event that is triggered on  
 *                          submission of the form.
 */
 handleSubmit = (event) => {
    event.preventDefault();
    this.recipientService.updateRecipient(this.state).then(result => {
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
 * whether the language passed as a parameter is stored in the recipient's state.
 * @param {String} language The name of a language.
 * @returns True if the language is stored in the current recipient's state, 
 *          false otherwise.
 */
checkLanguage(language) {
    for (let i = 0; i < this.state.languages.length; i++) {
        if (this.state.languages[i].name === language)
            return true 
    }
}

/**
 * Method called to prepopulate the 'Central Location?' field of the form 
 * based on the value stored in the recipient's state.
 * @returns Yes if the recipient's location is the central departure location,
 *          false otherwise.
 */
getCenter() {
    return (this.state.location.is_center) ? "Yes" : "No" ; 
}

/**
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
render() {
    return (
        <Container>
            <h1 className="h2">Update Recipient Data</h1>
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
                        required onChange={this.handleChange} />
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
                            required name="quantity" min="1"/>
                </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="address">Address</Form.Label>
                    <Form.Control type="text" name="location" id="address" 
                    required value={this.state.location.address}  onChange={this.handleObjectChange} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label htmlFor="room_number">Apartment Number</Form.Label>
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
                        required onChange={this.handleObjectChange} value={this.state.location.city} />
                    </Form.Group>

                    <Form.Group as={Col} >
                        <Form.Label htmlFor="state">State</Form.Label>
                        <Form.Select onChange={this.handleObjectChange} value={this.state.location.state}
                            required name="location" id="state">
                        { this.states.map( s => 
                            <option>{s}</option>
                        )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label htmlFor="zipcode">Zip</Form.Label>
                        <Form.Control type="text" pattern="[0-9]{5}" onChange={this.handleObjectChange} 
                            required name="location" id="zipcode" placeholder="#####" minlength="5" maxlength="5" value={this.state.location.zipcode}/>
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
                    value={this.state.comments}
                                name="comments" onChange={this.handleChange}/>
                </InputGroup>
                </Row>

                <Button variant="primary" className="mr-4" 
                    onClick={this.handleSubmit}>Submit
                </Button>
                <Link to="/">
                    <Button variant="secondary">Return</Button>
                </Link>
                {this.state.saved ?
                    <Row className='text-success h4 mb-4 mt-2'>Recipient Updated!</Row> :
                    <Row className='mb-4'></Row> }
            </Form>
        </Container>
        );
    }
}
export default UpdateRecipient;
