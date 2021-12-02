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
            fileContent: [],
            new_recipients: []
        };
        this.fileInput = React.createRef();
        this.handleRecipientDelete = this.handleRecipientDelete.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.readFile = this.readFile.bind(this);
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

    refreshRecipients(){
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


    get_languages(languages_list) {
        var languages = [];
        for (var index in languages_list) {
            let language_template = {};
            let language = this.capitalize(languages_list[index].trim());
            language_template.name = language;
            languages.push(language_template);
        }
        return languages;
    }

    capitalize(str) {
        if (typeof(str) == 'string') {
            if (str.length > 0) {
                str = str.toLowerCase();
                str = str.charAt(0).toUpperCase() + str.slice(1);
            }
        }
        return str;
    }

    get_phone(phone) {
        console.log('Received ' + phone);
        if (phone.length > 0) {
            phone = phone.trim();
            phone = phone.replaceAll(/['\D']/g, '');
            if (phone.length === 10) {
                phone = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6);
            } else {
                phone = '';
            }
        }
        console.log('Returned ' + phone);
        return phone
    }

    readFile(event) {
        const file = event.target.files[0];
        const promise = fileService.readFile(file);
        let recipients = [];

        promise.then((data) => {
            this.setState({
                fileContent: data
            });

            for(var row in data) {
                let recipient_template = {
                    'user': '', 'first_name': '', 'last_name': '', 'phone' : '', 'quantity': 1, 
                    'location': {'address':'', 'city':'', 'state':'', 'room_number':'', 'zipcode':'', 
                    'is_center':false}, 'languages': []};
                
                var recipient_data = data[row];
                const keys = Object.keys(recipient_data)
                for (var index in keys) {
                    let key = keys[index];
                    let value = recipient_data[key];
                    delete recipient_data[key];
                    recipient_data[key.toLowerCase()] = value;
                }
                if ('firstname' in keys) {
                    recipient_template.first_name = recipient_data.firstname;
                } else {
                    recipient_template.first_name = " ";
                }
                
                if ('lastname' in keys) {
                    recipient_template.last_name = recipient_data.lastname;
                } else {
                    recipient_template.last_name = " ";
                }

                recipient_template.languages = this.get_languages(recipient_data.language.split(','));
                recipient_template.phone = this.get_phone(recipient_data.phone);
                recipient_template.location.address = recipient_data.address.trim();
                if ('room_number' in keys) {
                    recipient_template.location.room_number = recipient_data.room_number.trim();
                }
                recipient_template.location.city = this.capitalize(recipient_data.city.trim());
                recipient_template.location.state = this.capitalize(recipient_data.state.trim());
                recipient_template.location.zipcode = this.capitalize(recipient_data.zipcode);
                recipient_template.quantity = String(recipient_data.quantity);
                if (recipient_data.center === 1) {
                    recipient_template.location.is_center = true;
                }
                recipients.push(recipient_template);
            }
            console.log(recipients);
            this.setState({
                new_recipients: JSON.stringify(recipients)
            });
        });
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
                            {this.state.filtered.map( r  =>
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
                                        (e) => {
                                            this.readFile(e);
                                        }
                                    }
                                    ref= {this.fileInput} accept='.csv, .xls, .xlsx'
                                />
                            </Form.Group>
                        </Row>
                    </Col>
                    <Col>
                        <Row>
                            <Col sm={2} className="d-flex flex-row">
                                <Button className="mx-1" onClick={() => {
                                    recipientService.uploadRecipients(this.state.new_recipients);
                                    this.setState({
                                        new_recipients: [],
                                    });
                                    this.fileInput.current.value = '';
                                    this.refreshRecipients();
                                }}>Add Recipients</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export  default  Recipient;