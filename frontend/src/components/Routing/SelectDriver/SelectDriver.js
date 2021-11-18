import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DriverService from '../../../services/DriverService';
import Multiselect from 'multiselect-react-dropdown';


//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';

const  driverService  =  new  DriverService();

class  SelectDriver  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        drivers: [],
        selectedDrivers: [],
        selectedNumber: 0
    };

    this.handleDriverDelete  =  this.handleDriverDelete.bind(this);
    this.onSelect  =  this.onSelect.bind(this);
    this.getEventValues  =  this.getEventValues.bind(this);
}

componentDidMount() {
    var  self  =  this;
    driverService.getDrivers().then(function (result) {
        console.log(result);
        self.setState({ drivers:  result});
    });
}

getEventValues(event) {
    var  self  =  this;
    console.log(self.state.selectedNumber);
    console.log(event[self.state.selectedNumber].id);
    self.setState({selectedNumber: (self.state.selectedNumber + 1) });
    console.log(self.state.selectedNumber);
    return event[self.state.selectedNumber].id;
    
}

onSelect(event){
    let id = this.getEventValues(event);
    const newDrivers = this.state.selectedDrivers.concat({ id });
    this.setState({selectedDrivers: newDrivers});
}


handleDriverDelete(e, d){
    var  self  =  this;

    driverService.deleteDriver(d).then(()=>{
        var  newArr  =  self.state.drivers.filter(function(obj) {
            return  obj.id  !==  d.id;
        });

        self.setState({drivers:  newArr})
    });
}

handleSubmit(){

}


render() {

    return (
        <Container className="card">
            <Row className="card-header">
                <Col>
                    <Row >
                        <Col sm={2} className="table-title title">Drivers</Col>
                        <Col sm={10} class="mt-3">
                        <Form onSubmit={this.handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group>
                                    <Multiselect
                                    options={this.state.drivers} // Options to display in the dropdown
                                    onSelect={this.onSelect} // Function will trigger on select 
                                    displayValue="first_name" // Property name to display in the dropdown options
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                   
                                />
                                </Form.Group>
                            </Row>  
                        </Form>
                        </Col>   
                    </Row>
                </Col>
            </Row>
        </Container>
    );
        
  }
}
export  default  SelectDriver;