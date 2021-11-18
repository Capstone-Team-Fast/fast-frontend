import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import RecipientService from '../../../services/RecipientService';
import SearchService from '../../../services/SearchService';
//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';

const recipientService = new RecipientService();
const searchService = new SearchService();


class  Recipient  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        recipients: [],
        filtered: []
    };

    this.handleRecipientDelete = this.handleRecipientDelete.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
}

componentDidMount() {
    var  self  =  this;
    recipientService.getRecipients().then(function (result) {
        console.log(result);
        self.setState({ recipients:  result, filtered: result});
    });
    console.log(this.state.filtered)

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

handleSearch(e) {
    let newList = searchService.findRecipients(e, this.state.recipients);
    this.setState({
        filtered: newList
    });
}


render() {

    return (
        <Container className="card mt-2">
            <Row className="card-header">
                <Col>
                    <Row>
                        <Col sm={2} className="table-title title">Recipients</Col>
                        <Col sm={8} class="mt-3"> 
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
                                            onChange={this.handleSearch}
                                         //ref="title"
                                ></FormControl>
                            </InputGroup>
                        </Col>
                        <Col sm={2}> 
                            <Button href="/addRecipient">Add New</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="card-body table-wrapper-scroll-y my-custom-scrollbar">
                <Table className="striped bordered hover table table-bordered table-striped mb-0">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filtered.map( r  =>
                            <tr  key={r.id}>
                            <td>{r.first_name}</td>
                            <td>{r.last_name}</td>
                            <td>{r.location.address}</td>
                            <td>
                                <Button className="mr-2" href={"/recipientDetail/" + r.id}>View</Button>
                                <Button className="mr-2" href={"/updateRecipient/" + r.id}>Edit</Button>
                                <Button  onClick={(e)=>  this.handleRecipientDelete(e,r) }> Delete</Button>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </Row>
        </Container>

    );
        
  }
}
export  default  Recipient;