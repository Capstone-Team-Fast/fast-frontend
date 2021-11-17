import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import RecipientService from '../../../services/RecipientService';
import Form from 'react-bootstrap/Form';
import Multiselect from 'multiselect-react-dropdown';
//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';

const recipientService = new RecipientService();


class  SelectRecipient  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        recipients: [],
        selectedRecipients: []
    };
}

componentDidMount() {
    var  self  =  this;
    recipientService.getRecipients().then(function (result) {
        console.log(result);
        self.setState({ recipients:  result});
    })
}

handleRecipientDelete(e, r){
    var  self  =  this;
    recipientService.deleteRecipient(r).then(()=>{
        var  newArr  =  self.state.recipients.filter(function(obj) {
            return  obj.id  !==  r.id;
        });

        self.setState({recipients:  newArr})
    });
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
                                    // onSelect={this.onSelect} // Function will trigger on select event
                                    // onRemove={this.onRemove} // Function will trigger on remove event
                                    displayValue="first_name"
                                    // Property name to display in the dropdown options
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