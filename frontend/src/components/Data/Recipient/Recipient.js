import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';


class  Recipient  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        //customers: [],
        //nextPageURL:  ''
    };
    this.dummy = { pk: 1792}; // Dummy variable for updateRecipient route
}

componentDidMount() {
    console.log("Method example");
}

handleDelete(e,pk){
    console.log("Method example");
}

nextPage(){
    console.log("Method example");
    
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