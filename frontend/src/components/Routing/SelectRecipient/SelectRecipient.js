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
    this.state  = { };

    this.onSelect  =  this.onSelect.bind(this);
    this.onDeselect  =  this.onDeselect.bind(this);
}

componentDidMount() {
    var  self  =  this;
    recipientService.getRecipients().then(function (result) {
        result.map(r => r.display_info = r.first_name + " " 
                        + r.last_name + " (Quantity: " + r.quantity + ")")
        self.setState({ recipients:  result});
    })
}

onSelect(event){
    //passing driver id to parent component in Routing.js
    this.props.parentCallback(event, false);
}

onDeselect(event){
    //passing driver id to parent component in Routing.js
    this.props.parentCallback(event, true);
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
                                    displayValue="display_info"
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