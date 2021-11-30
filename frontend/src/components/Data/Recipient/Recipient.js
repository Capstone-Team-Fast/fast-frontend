import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RecipientService from '../../../services/RecipientService';
import SearchService from '../../../services/SearchService';
import FileService from '../../../services/FileService';

const recipientService = new RecipientService();
const searchService = new SearchService();
const  fileService = new FileService();


/**
 * This component is used to display recipient information on the application's
 * Data page.
 */
class Recipient extends Component {

/**
 * The constructor method initializes the component's state object and
 * binds the methods of the component to the current instance.
 * @param {Object} props The properties passed to the component.
 */
constructor(props) {
    super(props);
    this.state  = {
        recipients: [],
        filtered: [], 
        fileText: ""
    };

    this.handleRecipientDelete = this.handleRecipientDelete.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.readFile = this.readFile.bind(this)
    this.handleBulkUpload = this.handleBulkUpload.bind(this)
}

/**
 * Life cycle hook that is called after the component is first rendered.
 */
componentDidMount() {
    var  self  =  this;
    recipientService.getRecipients().then(function (result) {
        self.setState({ recipients:  result, filtered: result});
    });
}

/**
 * Event handler used to delete a recipient from the database when the 
 * user clicks on the delete button.
 * @param {Object} e The event triggered when the user clicks on the 
 * q                 Delete button.
 * @param {Object} r The recipient object to be deleted.
 */
handleRecipientDelete(e, r){
    var  self  =  this;
    recipientService.deleteRecipient(r).then(()=>{
        var  newArr  =  self.state.recipients.filter(function(obj) {
            return  obj.id  !==  r.id;
        });

        self.setState({recipients:  newArr, filtered: newArr})
    });
}

/**
 * Event handler method called when the user enters a value into the 
 * recipient search box.
 * @param {Object} e The event triggered when a user enters information
 *                      into the search field.
 */
 handleSearch(e) {
    let newList = searchService.findRecipients(e, this.state.recipients);
    this.setState({
        filtered: newList
    });
}

readFile(event) {
    const fileObj = event.target.files[0]; 
    const reader = new FileReader(); 
  
    let fileloaded = e => {
      const fileContents = e.target.result;
      const text = fileContents.substring(0,fileObj.length);
      localStorage.setItem('fileText', text)
    }

    let text = localStorage.getItem('fileText');
    fileloaded = fileloaded.bind(this);
    reader.onload = fileloaded;
    reader.readAsText(fileObj);

    this.setState({
        fileText: text
    });
}

handleBulkUpload(e) {
    /*
    let recipients = fileService.convertFileFromExcel(this.state.fileText)
    recipientService.createRecipients()
    this.setState({
        fileText: ""
    });
    window.location.reload()
    */
}

/**
 * The render method used to display the component. 
 * @returns The HTML to be rendered.
 */
render() {

    return (
        <Container className="card mt-2 mb-4">
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
                            <th>Quantity</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filtered
                        .sort((a,b) => (a.last_name.toLowerCase() > 
                            b.last_name.toLowerCase() ? 1 : -1))
                            .map( r  =>
                            <tr  key={r.id}>
                            <td>{r.first_name}</td>
                            <td>{r.last_name}</td>
                            <td>{r.quantity}</td>
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
            <Row className="justify-content-md-left mt-2 pt-2 mb-2 title border-top">
                <Col xs md="auto" className="h4">File Upload</Col>
            </Row>
            <Row classname="pb-4 mb-4">
                <Col md="auto" className="ml-4">
                    <Row>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" onChange={
                                e => this.readFile(e)}/>
                        </Form.Group>
                    </Row>
                </Col>
                <Col>
                    <Row>
                    <Col sm={2}> 
                            <Button
                                onClick={this.handleBulkUpload}>Add Recipients</Button>
                        </Col>   
                    </Row>
                </Col>
            </Row>
        </Container>

    );
        
  }
}
export  default  Recipient;