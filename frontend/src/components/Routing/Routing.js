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
         drivers: [],
         recipients:[],
         deliveryLimit: '', 
         duration: ''
     };

     this.getCenter = this.getCenter.bind(this);
     this.handleDriverCallback = this.handleDriverCallback.bind(this)
}

componentDidMount() {
     var  self  =  this;
     locationService.getLocations().then(function (result) {
         self.setState({ locations:  result});
     });
}

handleDriverCallback = (id, deselect) =>{
  if (deselect){
    this.setState({drivers: this.state.drivers.filter(function(d) { 
      return d !== id; 
    })});
    console.log("55", this.state.drivers);
  }
  else{
    const newDrivers = this.state.drivers.concat({ id });
    this.setState({drivers : newDrivers});
    console.log("60", this.state.drivers);
  }
}

handleRecipientCallback = (id, deselect) =>{
  if (deselect){
    this.setState({recipients: this.state.recipients.filter(function(r) { 
      return r !== id; 
    })});
  }
  else{
    const newRecipients = this.state.recipients.concat({ id });
    this.setState({recipients : newRecipients});
  }
}

getCenter(location) {
  if (location.is_center) {
    return location.address;
  }
}

handleSubmit = (event) => {
  event.preventDefault();
  routeService.createRoute(this.state);
  
  //#TODO: how to redirect to view route??
  //this.setState({redirect: "/"});
  console.log(this.state)
}

render() {

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
        <Row className="mt-4">
        <Form.Group as={Col} controlId="formGridDeliveryLimit">
          <Form.Label className="title">Delivery Limit</Form.Label>
          <Form.Control type="number" placeholder="Driver Delivery Limit"
                        onChange={this.handleChange} name="delivery_limit" min="1"/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDurationLimit">
          <Form.Label className="title">Duration</Form.Label>
          <Form.Control type="number" placeholder="Duration Limit in Hours"
                        onChange={this.handleChange} name="duration_limit" min="1"/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridDeparture">
          <Form.Label className="title">Departure Location</Form.Label>
          <Form.Select onChange={this.handleChange} name="departure_location">
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
    
