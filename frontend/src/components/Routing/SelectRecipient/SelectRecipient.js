import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RecipientService from '../../../services/RecipientService';
import Form from 'react-bootstrap/Form';
import Multiselect from 'multiselect-react-dropdown';


//import Search from 'react-bootstrap-icons';

const recipientService = new RecipientService();


class  SelectRecipient  extends  Component {

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
    recipientService.getRecipients().then(function (result) {
        console.log(result);
        self.setState({ recipients:  result});
    })
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
    self.props.parentCallback(id, false);
}

onDeselect(event){
    var self = this;
    let id = self.getEventValues(event);
    self.setState({selectedNumber: (self.state.selectedNumber - 1) });
    //passing driver id to parent component in Routing.js
    self.props.parentCallback(id, true);
}


render() {

    return (
        <Container className="card mt-2">
            <Row className="card-header">
                <Col>
                    <Row>
                        <Col sm={2} className="table-title title">Recipients</Col>
                        <Col sm={10} class="mt-3"> 
                            <Form>
                                <Multiselect
                                    options={this.state.recipients} // Options to display in the dropdown
                                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                    onSelect={this.onSelect} // Function will trigger on select event
                                    onRemove={this.onDeselect} // Function will trigger on remove event
                                    displayValue="first_name"
                                />
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>

    );
        
  }
}
export  default  SelectRecipient;