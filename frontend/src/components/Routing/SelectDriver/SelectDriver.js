import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DriverService from '../../../services/DriverService';
import Multiselect from 'multiselect-react-dropdown';


//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';

const  driverService  =  new  DriverService();

class  SelectDriver  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        selectedNumber: 0
    };

    this.onSelect  =  this.onSelect.bind(this);
    this.onDeselect  =  this.onDeselect.bind(this);
    this.getEventValues  =  this.getEventValues.bind(this);
}

componentDidMount() {
    var  self  =  this;
    driverService.getDrivers().then(function (result) {
        self.setState({ drivers:  result});
    });
}

getEventValues(event) {
    var  self  =  this;
    return event[self.state.selectedNumber].id;
    
}

onSelect(event){
    var self = this;
    let id = this.getEventValues(event);
    self.setState({selectedNumber: (self.state.selectedNumber + 1) });
    //passing driver id to parent component in Routing.js
    this.props.parentCallback(id, false);
}

onDeselect(event){
    var self = this;
    let id = this.getEventValues(event);
    self.setState({selectedNumber: (self.state.selectedNumber - 1) });
    //passing driver id to parent component in Routing.js
    this.props.parentCallback(id, true);
}

render() {

    return (
        <Container className="card">
            <Row className="card-header">
                <Col>
                    <Row >
                        <Col sm={2} className="table-title title">Drivers</Col>
                        <Col sm={10} class="mt-3">
                            <Row className="mb-3">
                                 <Multiselect
                                    options={this.state.drivers} // Options to display in the dropdown
                                    onSelect={this.onSelect} // Function will trigger on select 
                                    displayValue="first_name" // Property name to display in the dropdown options
                                    onRemove={this.onDeselect} // Function will trigger on remove events
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                />
                            </Row>  
                        </Col>   
                    </Row>
                </Col>
            </Row>
        </Container>
    );
        
  }
}
export  default  SelectDriver;