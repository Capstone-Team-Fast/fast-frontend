import  React, { Component } from  'react';
import Spinner from 'react-bootstrap/Spinner'
import ProgressBar from 'react-bootstrap/ProgressBar'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SelectDriver from './SelectDriver/SelectDriver.js';
import SelectRecipient from './SelectRecipient/SelectRecipient.js';
import LocationService from '../../services/LocationService'
import RouteService from '../../services/RouteService'

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
         errorDurDel: '',
         errorDurDelMessage: '',
         errorDriRec: '',
         errorDriRecMessage: '',
         errorDurationColor: '',
         errorDeliveryColor: '',
         progressBar: 0,
         progressBarMessage: '',
         showProgressBar: false
     };

    //  this.getCenter = this.getCenter.bind(this);
     this.handleDriverCallback = this.handleDriverCallback.bind(this);
     this.handleChange = this.handleChange.bind(this);
     this.handleDuration = this.handleDuration.bind(this);
     this.handleDeparture = this.handleDeparture.bind(this);
     this.handleDeliveryLimit = this.handleDeliveryLimit.bind(this);
     this.getEventValues = this.getEventValues.bind(this);
     this.handleDurDelError = this.handleDurDelError.bind(this);
     this.handleDriRecError = this.handleDriRecError.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
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
    this.setState({
      errorDriRec: false
    })
}

handleRecipientCallback = (event) =>{
  const newRecipients = event.map(e => e.id)
    this.setState(prevState => ({
      route: {               // object that we want to update
      ...prevState.route,    // keep all other key-value pairs
      client_ids : newRecipients
      }}));
      console.log(this.state)  
    this.setState({
      errorDriRec: false
    })
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
    errorDurDel: false,
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
    errorDurDel: false,
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
  
handleDurDelError() {
  if (!(this.delivery_limit) && !(this.duration_limit)) {
    this.setState({
      errorDurDel: true,
      errorDurDelMessage: 'ERROR: Delivery Limit and Duration are empty',
      errorDurationColor: 'red',
      errorDeliveryColor: 'red'
    })
  }
  else if (!(this.duration_limit)) {
    this.setState({
      errorDurDel: true,
      errorDurDelMessage: 'ERROR: Duration is empty',
      errorDurationColor: 'red'
    })
  }
  else if (!(this.delivery_limit)) {
    this.setState({
      errorDurDel: true,
      errorDurDelMessage: 'ERROR: Delivery Limit is empty',
      errorDeliveryColor: 'red'
    })
  }
}

handleDriRecError() {
  let driverLength = this.state.route.driver_ids.length
  let recipientLength = this.state.route.client_ids.length
  if (driverLength === 0 && recipientLength === 0) {
    this.setState({
      errorDriRec: true,
      errorDriRecMessage: 'ERROR: No Driver(s) or Recipient(s) selected'
    })
  }
  else if (driverLength === 0) {
    this.setState({
      errorDriRec: true,
      errorDriRecMessage: "ERROR: No Driver(s) selected"
    })
  }
  else if (recipientLength === 0) {
    this.setState({
      errorDriRec: true,
      errorDriRecMessage: "ERROR: No Recipient(s) selected"
    })
  }
}

handleSubmit = (event) => {
  let driverLength = this.state.route.driver_ids.length
  let recipientLength = this.state.route.client_ids.length
  if (this.delivery_limit && this.duration_limit && driverLength > 0 && recipientLength > 0) {
    event.preventDefault();
    this.setState({
      loading: true,
      errorDurDel: false,
      errorDriRec: false,
      showProgressBar: true,
      progressBar: 0,
      progressBarMessage: 'Creating Route...'
    });
    setTimeout(() => { this.setState({ progressBar: 50 }); }, 500);
    routeService.createRoute(this.state.route).then(result => {
      this.setState({
        progressBar: 100,
        progressBarMessage: 'Finalizing Route...'
      });
      routeService.getRouteList(result.id).then(routeResult => {
        let redirect = "/routeResults/" + routeResult.id 
        setTimeout(() => { window.open(redirect, "_blank"); }, 2500);
        setTimeout(() => { this.setState({ loading: false, progressBar: 0, progressBarMessage: '', showProgressBar: false }); }, 2500);
      });
    });
  }
  else {
    this.handleDurDelError();
    this.handleDriRecError();
  }
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
          
        <br/>
        <SelectDriver parentCallback = {this.handleDriverCallback}/>
        <SelectRecipient parentCallback = {this.handleRecipientCallback} />
       
        <Row>
         <Col sm={0} className="d-flex flex-row">
          <Button className="mr-2 mt-4 btn" variant="primary" disabled={this.state.loading}
                onClick={handleSubmit}>
                  {this.state.loading ?  
                    <Spinner
                      animation="border" role="status" style={{ height: 25, width: 25 }}>
                    </Spinner> : "Create Route"}
          </Button>
            {this.state.showProgressBar ?
                        <ProgressBar style={{ width: 400, marginTop: 45 }} animated now={this.state.progressBar}/> : ''}
         </Col>
            <h3 className="btn" style={{ fontSize: 20, marginTop: -38 }}> { this.state.progressBarMessage } </h3>
        </Row>
        {this.state.errorDurDel ? 
                    <h3 className='errorDurDel' style={{ fontSize: 20, color: "red", marginTop: 10 }}> { this.state.errorDurDelMessage } </h3> : ""}
        {this.state.errorDriRec ?
                    <h3 className='errorDriRec' style={{ fontSize: 20, color: "red", marginTop: 10 }}> { this.state.errorDriRecMessage } </h3> : ""}
        </Form> 
      </Container>
    );
  }
}
export  default  Routing;
