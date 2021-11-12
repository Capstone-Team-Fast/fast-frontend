import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Driver from '../Data/Driver/Driver.js';
import Recipient from '../Data/Recipient/Recipient.js';
import LocationService from '../../services/LocationService'



//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';

const  locationService  =  new  LocationService();

class  Routing  extends  Component {

constructor(props) {
     super(props);
     this.state  = {
         locations: [],
     };

     this.getCenter = this.getCenter.bind(this)
}

//     this.handleDriverDelete  =  this.handleDriverDelete.bind(this);
// }

componentDidMount() {
     var  self  =  this;
     locationService.getLocations().then(function (result) {
         self.setState({ locations:  result});
     });
}

getCenter(location) {
  if (location.is_center) {
    return location.address;
  }
}

// }
// handleDriverDelete(e,pk){
//     var  self  =  this;
//     driverService.deleteDriver({pk :  pk}).then(()=>{
//         var  newArr  =  self.state.drivers.filter(function(obj) {
//             return  obj.pk  !==  pk;
//         });

//         self.setState({drivers:  newArr})
//     });
// }


render() {

    return (
      <Container>
        <Form>
        <Driver></Driver>
        <Recipient></Recipient>
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
        <Row>
          <Col>
            <Button className="mr-2 mt-4 btn" variant="primary" type="submit">Submit</Button>
          </Col>
        </Row>  
        </Form>   
      </Container>
    
    
   

    );


      
        
  }
}
export  default  Routing;
    
