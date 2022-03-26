import  React, { Component } from  'react';
import Spinner from 'react-bootstrap/Spinner'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SelectDriver from './SelectDriver/SelectDriver.js';
import SelectRecipient from './SelectRecipient/SelectRecipient.js';
import LocationService from '../../services/LocationService'
import RouteService from '../../services/RouteService'
import { func } from 'prop-types';

const  locationService  =  new  LocationService();
const  routeService  =  new  RouteService();

class  Routing  extends  Component {
  

constructor(props) {
     super(props);
     this.state  = {
         locations: [],
         route: {
          driver_ids:[],
          client_ids:[],
          delivery_limit: '',
          departure: {
            location: {},
          },
          duration_limit: '',
         },
         loading: false,
         error: '',
         errorMessage: '',
         errorDurationColor: '',
         errorDeliveryColor: '',
         'availability': {'sunday': true,
         'monday': true, 'tuesday': true, 'wednesday': true, 
         'thursday': true, 'friday': true, 'saturday': true},
         isSelected: false
     };
     this.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                    'Friday', 'Saturday']

    //  this.getCenter = this.getCenter.bind(this);
     this.handleDriverCallback = this.handleDriverCallback.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleDuration = this.handleDuration.bind(this);
     this.handleDeparture = this.handleDeparture.bind(this);
     this.handleDeliveryLimit = this.handleDeliveryLimit.bind(this);
     this.getEventValues = this.getEventValues.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleAvailabilityChange = this.handleAvailabilityChange.bind(this);
     this.getAvailability = this.getAvailability.bind(this);
     this.selectAllDays = this.selectAllDays.bind(this);
     this.deSelectAllDays = this.deSelectAllDays.bind(this);
}

componentDidMount() {
  var  self  =  this;
  locationService.getLocations().then(function (result) {
      let defaultLocation = {}
      for (let i = 0; i < result.length; i++) {
        // Set ISC as default address
        if (result[i].is_center && result[i].address.includes("5545")) {
          defaultLocation = result[i];
          break;
        }
      }
      
      self.setState(prevState => ({ 
          locations:  result,
          route: {                // object that we want to update
          ...prevState.route,     // keep all other key-value pairs
          departure: {
            location: defaultLocation
        }}})              
  )});
}

handleDriverCallback = (event) =>{
    const newDrivers = event.map( e => e.id)
    this.setState(prevState => ({
          route: {               // object that we want to update
          ...prevState.route,    // keep all other key-value pairs
          driver_ids : newDrivers
          }}));
          console.log(this.state)
}

handleRecipientCallback = (event) =>{
  const newRecipients = event.map(e => e.id)
    this.setState(prevState => ({
      route: {               // object that we want to update
      ...prevState.route,    // keep all other key-value pairs
      client_ids : newRecipients
      }}));
      console.log(this.state)  
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
  this.setState(prevState => ({
    route : {
    ...prevState.route,
    name: value}
  }));
}

handleDeliveryLimit(event){
  let [value, name] = this.getEventValues(event);
  this.setState(prevState => ({
    route : {
    ...prevState.route,
    delivery_limit: value},
    error: false,
    errorDurationColor: '',
    errorDeliveryColor: ''
  }));
  this.delivery_limit = value
}

handleDuration(event){
  let [value, name] = this.getEventValues(event);
  this.setState(prevState => ({
    route : {
    ...prevState.route,
    duration_limit: value},
    error: false,
    errorDurationColor: '',
    errorDeliveryColor: ''
  }));
  this.duration_limit = value
}

handleDeparture(event){
  let [value, name] = this.getEventValues(event);

  let full_location = this.state.locations.filter(function(l){
    return l.address === value;
  });

  this.setState(prevState => ({
    route : {
    ...prevState.route,
    departure: {
      ...prevState.route.departure,
      location: full_location[0]
    }
    }}));
}

/**
 * This method retrieves the value, name, and id properties of the 
 * event that has been triggered.
 * @param {Object} event The event that has been triggered.
 * @returns The value, name, and id properties of the triggered event.
 */
 getEventValues(event) {
  let [value, name] = [event.target.value, event.target.name];
  return [value, name];
}

getCenter(location) {
  if (location.is_center) {
    return location.address;
  }
  return 
}

handleSubmit = (event) => {
  if (this.delivery_limit && this.duration_limit &&  this.delivery_limit && this.duration_limit) {
    event.preventDefault();
    this.setState({
      loading: true,
      error: false
    });
    routeService.createRoute(this.state.route).then(result => {
      let redirect = "/routeResults/" + result.id 
      window.open(redirect, "_blank")
      this.setState({
        loading: false
      });
    });
  }
  else if (!(this.delivery_limit) && !(this.duration_limit)) {
    this.setState({
      error: true,
      errorMessage: 'ERROR: Delivery Limit and Duration are empty',
      errorDurationColor: 'red',
      errorDeliveryColor: 'red'
    })
  }
  else if (!(this.duration_limit)) {
    this.setState({
      error: true,
      errorMessage: 'ERROR: Duration is empty',
      errorDurationColor: 'red'
    })
  }
  else {
    this.setState({
      error: true,
      errorMessage: 'ERROR: Delivery Limit is empty',
      errorDeliveryColor: 'red'
    })
  }
}

handleAvailabilityChange(event) {
  let [value, name] = this.getEventValues(event)
  let id = event.target.id
  let checked = event.target.checked 
  this.setState(prevState => ({
          [name]: {
               ...prevState[name],
               [id.toLowerCase()]: checked
          }    
      }
      ));
}

getAvailability(day) {
  day = day.toLowerCase()
  return this.state.availability[day] ;
}

selectAllDays = (event) => {
  let name = "availability"
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let checked = true
  for (let i = 0; i < days.length; i++) {
    let id = days[i]
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        [id.toLowerCase()]: checked
      }
    }));
  }
  this.setState({
    isSelected: false
  })
}

deSelectAllDays = (event) => {
  let name = "availability"
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let checked = false
  for (let i = 0; i < days.length; i++) {
    let id = days[i]
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        [id.toLowerCase()]: checked
      }
    }));
  }
  this.setState({
    isSelected: true
  })
}

onSelect(event){
  //passing driver id to parent component in Routing.js
  this.props.parentCallback(event);
}


render() {

    const { handleSubmit, state } = this;

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
        <Row className="mt-4">
        <Form.Group as={Col} controlId="formGridDeliveryLimit">
          <Form.Label className="title">Delivery Limit</Form.Label>
          <Form.Control type="number" placeholder="Driver Delivery Limit" style={{ borderColor: this.state.errorDeliveryColor }}
                        required onChange={this.handleDeliveryLimit} name="delivery_limit" min="1"/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDurationLimit">
          <Form.Label className="title">Duration</Form.Label>
          <Form.Control type="number" placeholder="Duration Limit in Hours" style={{ borderColor: this.state.errorDurationColor }} 
                        required onChange={this.handleDuration} name="duration_limit" min="1"/>
        </Form.Group> 
        <Form.Group as={Col} controlId="formGridDeparture">
          <Form.Label className="title">Departure Location</Form.Label>
          <Form.Select value={this.state.route.departure.location.address} 
            onChange={this.handleDeparture} name="departure_location" required>
          { this.state.locations.map( l => {
                  if (this.getCenter(l)) {
                    return <option>{this.getCenter(l)}</option>
                  }
                  return ""
                }
                
          )}

          </Form.Select>
        </Form.Group>
        </Row> 

        <Form.Group className="mb-3" style={{ marginTop: 20 }}>
            <Row><Form.Label className="title">Driver Availability</Form.Label></Row>
            <Button className="mr-4 btn" variant="primary" onClick={this.state.isSelected ? this.selectAllDays : this.deSelectAllDays}>
              Select/Deselect All</Button>
              { this.days.map( d =>
                <Form.Check type="checkbox" name="availability" value="true"
                checked={this.getAvailability(d)}
                inline label={d} id={d}
                onChange={this.handleAvailabilityChange}
                />)}
        </Form.Group> 
          
        <br/>
        <SelectDriver parentCallback = {this.handleDriverCallback}/>
        <SelectRecipient parentCallback = {this.handleRecipientCallback} />
       
        <Button className="mr-2 mt-4 btn" variant="primary" disabled={this.state.loading}
                onClick={handleSubmit}>
                  {this.state.loading ?  
                    <Spinner
                      animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner> : "Create Route"}
        </Button>
        {this.state.error ? 
                    <h3 className='error' style={{ fontSize: 20, color: "red", marginTop: 10 }}> { this.state.errorMessage } </h3> : ""}
        </Form> 
      </Container>
    );
  }
}
export  default  Routing;