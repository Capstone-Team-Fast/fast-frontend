import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import RecipientService from '../../../services/RecipientService';
//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';

const recipientService = new RecipientService();


class  Recipient  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        recipients: [],
    };
    this.dummy = { pk: 3}; // Dummy variable for updateRecipient route
}

componentDidMount() {
    var  self  =  this;
    recipientService.getRecipients().then(function (result) {
        console.log(result);
        self.setState({ recipients:  result});
    });

}
handleRecipientDelete(e,pk){
    var  self  =  this;
    recipientService.deleteRecipient({pk :  pk}).then(()=>{
        var  newArr  =  self.state.recipients.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({recipients:  newArr})
    });
}

render() {

    return (
        <Container>
            <Row>
                <Col sm={9} className="table-title">Recipients</Col>
                <Col sm={3}> 
                    <Button href="/addRecipient">Add New</Button>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col cols="9" class="mt-3">
                    <InputGroup class="mb-2">
                        <InputGroup.Text>
                        {// <Search icon="search"></Search>
                        }
                        </InputGroup.Text>
                        <FormControl
                                type="text"
                                placeholder="Search recipients"
                                id="search"
                                v-model="search"
                                name="search"
                                aria-label="Search"
                                //ref="title"
                        ></FormControl>
                    </InputGroup>
                </Col>
            </Row>
            <br/>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Language</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.recipients.map( r  =>
                            <tr  key={r.id}>
                            <td>{r.first_name}</td>
                            <td>{r.last_name}</td>
                            <td>{r.address}</td>
                            <td>{r.language}</td>
                            <td>
                                <Button>EDIT</Button>
                                <Button  onClick={(e)=>  this.handleRecipientDelete(e,r.pk) }> Delete</Button>
                            </td>
                        </tr>)}
                        <tr>
                            <td>Hardcoded First Name</td>
                            <td>Hardcoded Last Name</td>
                            <td>Hardcoded Address</td>
                            <td>Hardcoded Language</td>
                            <td >
                                <Button href={"/updateRecipient/" + this.dummy.pk}>
                                Edit
                                </Button>
                                {' '}
                                <Button>
                                Delete
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>

    );



        {/*<b-container>
            <div className="input-group">
                    <div className="form-outline">
                        <input id="search-input" type="search" id="form1" className="form-control"/>
                    {// <label className="form-label" htmlFor="form1">Search</label>
                        }
                    </div>
                    <button id="search-button" type="button" className="btn btn-primary">
                        Search
                        <i className="fas fa-search"></i>
                    </button>
                </div>

        </b-container>
                    */}
      
        
  }
}
export  default  Recipient;