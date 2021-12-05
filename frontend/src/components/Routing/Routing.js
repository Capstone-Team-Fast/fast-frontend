import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SelectDriver from './SelectDriver/SelectDriver.js';
import SelectRecipient from './SelectRecipient/SelectRecipient.js';
import LocationService from '../../services/LocationService'
import RouteService from '../../services/RouteService'



//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';

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
          }
          // duration_limit: '',
         }
     };

    //  this.getCenter = this.getCenter.bind(this);
     this.handleDriverCallback = this.handleDriverCallback.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleDuration = this.handleDuration.bind(this);
     this.handleDeparture = this.handleDeparture.bind(this);
     this.handleDeliveryLimit = this.handleDeliveryLimit.bind(this);
     this.getEventValues = this.getEventValues.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
}

componentDidMount() {
  var  self  =  this;
  locationService.getLocations().then(function (result) {
      self.setState({ locations:  result});
  });
}

handleDriverCallback = (id, deselect) =>{
  if (deselect){
    this.setState(prevState => ({
          route: {               // object that we want to update
          ...prevState.route,    // keep all other key-value pairs
          driver_ids : this.state.route.driver_ids.filter(function(d) { 
            return d !== id; 
          })}}));
  }
  else{
    if (this.state.route.driver_ids != null)
    {
      const newDrivers = this.state.route.driver_ids.concat({ id });
      this.setState(prevState => ({
        route : {
        ...prevState.route,
        driver_ids: newDrivers}
      }));
    }
    else{
      this.setState(prevState => ({
        route : {
        ...prevState.route,
        driver_ids: id}
      }));
    }
    
  }
}

handleRecipientCallback = (id, deselect) =>{
  if (deselect){
    this.setState(prevState => ({
      route: {               // object that we want to update
      ...prevState.route,    // keep all other key-value pairs
      client_ids : this.state.route.client_ids.filter(function(r) { 
        return r !== id; 
      })}}));
  }
  else{
    if(this.state.route.client_ids != null){
        const newRecipients = this.state.route.client_ids.concat({ id });
        this.setState(prevState => ({
          route : {
          ...prevState.route,
          client_ids: newRecipients}
        }));
    }
    else{
      this.setState(prevState => ({
        route : {
        ...prevState.route,
        client_ids: id}
      }));
    }
    
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
    delivery_limit: value}
  }));
}

handleDuration(event){
  let [value, name] = this.getEventValues(event);
  this.setState(prevState => ({
    route : {
    ...prevState.route,
    duration_limit: value}
  }));
}

handleDeparture(event){
  let [value, name] = this.getEventValues(event);
  this.setState(prevState => ({
    route : {
    ...prevState.route,
    departure: {
      ...prevState.route.departure,
      location: value
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
}

handleSubmit = (event) => {
  event.preventDefault();
  console.log(this.state.route);
  routeService.createRoute(this.state.route);
  
  //#TODO: how to redirect to view route??
  //this.setState({redirect: "/"});
}

render() {

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
        <Row className="mt-4">
        <Form.Group as={Col} controlId="formGridDeliveryLimit">
          <Form.Label className="title">Delivery Limit</Form.Label>
          <Form.Control type="number" placeholder="Driver Delivery Limit"
                        onChange={this.handleDeliveryLimit} name="delivery_limit" min="1"/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDurationLimit">
          <Form.Label className="title">Duration</Form.Label>
          <Form.Control type="number" placeholder="Duration Limit in Hours"
                        onChange={this.handleDuration} name="duration_limit" min="1"/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDeparture">
          <Form.Label className="title">Departure Location</Form.Label>
          <Form.Select onChange={this.handleDeparture} name="departure_location">
          { this.state.locations.map( l => 
                <option>{this.getCenter(l)}</option>
            )}

          </Form.Select>
        </Form.Group>
        </Row>   
          
        <br/>
        <SelectDriver parentCallback = {this.handleDriverCallback}></SelectDriver>
        <SelectRecipient parentCallback = {this.handleRecipientCallback}></SelectRecipient>
       
        
        <Button className="mr-2 mt-4 btn" variant="primary" type="submit" >Create Route</Button>
        </Form> 
      </Container>
    
    
   

    );


      
        
  }
}
export  default  Routing;
    
