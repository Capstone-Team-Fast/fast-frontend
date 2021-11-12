import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import Driver from '../Data/Driver/Driver.js';
import Recipient from '../Data/Recipient/Recipient.js';



//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';


class  Routing  extends  Component {

// constructor(props) {
//     super(props);
//     this.state  = {
//         drivers: [],
//     };

//     this.handleDriverDelete  =  this.handleDriverDelete.bind(this);
// }

// componentDidMount() {
//     var  self  =  this;
//     driverService.getDrivers().then(function (result) {
//         console.log(result.data);
//         self.setState({ drivers:  result});
//     });

// }
// handleDriverDelete(e, r){
//     var  self  =  this;
//     driverService.deleteDriver(r).then(()=>{
//         var  newArr  =  self.state.drivers.filter(function(obj) {
//             return  obj.id  !==  r.id;
//         });

//         self.setState({drivers:  newArr})
//     });
// }


render() {

    return (
      <Container>
        <Driver></Driver>
        <Recipient></Recipient>
      </Container>
    
    
   

    );


      
        
  }
}
export  default  Routing;
    
