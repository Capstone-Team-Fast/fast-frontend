import  React, { Component } from  'react';
import { CSVLink } from "react-csv";
import Spinner from 'react-bootstrap/Spinner'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RecipientService from '../../../services/RecipientService';
import LocationService from '../../../services/LocationService';
import SearchService from '../../../services/SearchService';
import FileService from '../../../services/FileService';
import { DialogBox } from '../../Utils/DialogBox';
import Stack from 'react-bootstrap/Stack';

const recipientService = new RecipientService();
const locationService = new LocationService();
const searchService = new SearchService();
const fileService = new FileService();
const headers = ["Phone", "Firstname", "Lastname", "Address", "City", "State", "Zipcode", "Center", "Room_Number", "Language", "Quantity"];


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
            locations: [],
            filtered_recipients: [], 
            filtered_locations: [],
            fileContent: [],
            new_recipients: [],
            show: false,
            allShow: false,
            recipientToDelete: {},
            allRecipientsDelete: [],
            locationToDelete: {},
            sorted: false,
            loading: false
        };
        this.fileInput = React.createRef();
        this.handleRecipientDelete = this.handleRecipientDelete.bind(this);
        this.handleAllRecipientsDelete = this.handleAllRecipientsDelete.bind(this);
        this.handleLocationDelete = this.handleLocationDelete.bind(this);
        this.handleAllLocationsDelete = this.handleAllLocationsDelete.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.readFile = this.readFile.bind(this);
        this.refreshRecipients = this.refreshRecipients.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleAllShow = this.handleAllShow.bind(this);
        this.handleUploadSubmit = this.handleUploadSubmit.bind(this);
    }

    /**
     * Life cycle hook that is called after the component is first rendered.
     */
    componentDidMount() {
        var  self  =  this;
        recipientService.getRecipients().then(function (result) {
            self.setState({ recipients:  result, filtered_recipients: result});
        });

        locationService.getLocations().then((result) => {
            this.setState({
                locations: result,
            });
        });
    }

    sortColumn(key) {
        const isSorted = this.state.sorted;
        if (key === 'firstname') {
            if (this.state.sorted) {
                this.state.recipients.sort((recipient1, recipient2) => {return recipient2.first_name.localeCompare(recipient1.first_name)});
            } else {
                this.state.recipients.sort((recipient1, recipient2) => {return recipient1.first_name.localeCompare(recipient2.first_name)});
            }
        } else if (key === 'lastname') {
            if (this.state.sorted) {
                this.state.recipients.sort((recipient1, recipient2) => {return recipient2.last_name.localeCompare(recipient1.last_name)});
            } else {
                this.state.recipients.sort((recipient1, recipient2) => {return recipient1.last_name.localeCompare(recipient2.last_name)});
            }
        } else if (key === 'quantity') {
            if (this.state.sorted) {
                this.state.recipients.sort((recipient1, recipient2) => {return recipient2.quantity - recipient1.quantity});
            } else {
                this.state.recipients.sort((recipient1, recipient2) => {return recipient1.quantity - recipient2.quantity});
            }
        } else if (key == 'address') {
            if (this.state.sorted) {
                this.state.recipients.sort((recipient1, recipient2) => {return recipient2.location.address.localeCompare(recipient1.location.address)});
            } else {
                this.state.recipients.sort((recipient1, recipient2) => {return recipient1.location.address.localeCompare(recipient2.location.address)});
            }
        }
        this.setState({recipients: this.state.recipients, sorted: !isSorted});
    }

    refreshRecipients(){
        var  self  =  this;
        recipientService.getRecipients().then(function (result) {
            self.setState({ recipients:  result, filtered_recipients: result, loading: false});
            });
    }

    handleClose() {
        this.setState({show: false, allShow: false});
    }
    
    // For deleting 1 or all recipients with associated locations
    handleSave() {
        this.handleClose();
        if (this.state.show) {
            this.handleRecipientDelete(this.state.recipientToDelete);
            this.handleLocationDelete(this.state.locationToDelete);
            this.setState({recipientToDelete: {}, locationToDelete: {}});
        }
        else if (this.state.allShow) {
            this.handleAllRecipientsDelete(this.state.allRecipientsDelete);
            this.handleAllLocationsDelete(this.state.allLocationsDelete);
            this.setState({ allRecipientsDelete: [], allLocationsDelete: [] });
        }
    }
    
    // For deleting 1 recipient and associated location
    handleShow(e, r) {
        e.preventDefault();
        this.setState({show: true, recipientToDelete: r, locationToDelete: r.location});
    }
    
    // For deleting all recipients and associated locations
    handleAllShow(e, r) {
        e.preventDefault();
        let locsToDelete = [];
        for (let i = 0; i < r.length; i++) {
            locsToDelete.push(r[i].location);
        }
        this.setState({allShow: true, allRecipientsDelete: r, allLocationsDelete: locsToDelete});
    }

/**
 * Event handler used to delete a recipient from the database when the 
 * user clicks on the delete button.
 * @param {Object} r The recipient object to be deleted.
 */
handleRecipientDelete(r){
    var  self  =  this;
    recipientService.deleteRecipient(r).then(()=>{
        var  newArr  =  self.state.recipients.filter(function(obj) {
            return  obj.id  !==  r.id;
        });
        self.setState({recipients:  newArr, filtered_recipients: newArr})
    });
}

/**
* Event handler used to delete all recipients from the database when the 
* user clicks on the delete all button.
* @param {Object} r The recipients object to be deleted.
*/
handleAllRecipientsDelete(r) {
    var self = this;
    for (var i = 0; i < r.length; i++) {
        this.handleRecipientDelete(r[i]);
    }
}

/**
 * Event handler used to delete a location from the database when the 
 * user clicks on the delete button.
 * @param {Object} loc The location object to be deleted.
 */
 handleLocationDelete(loc){
    let  self  =  this;
    locationService.deleteLocation(loc).then(()=>{
        let  newArr  =  self.state.locations.filter(function(obj) {
            return  obj.id  !==  loc.id;
        });
        self.setState({locations: newArr, filtered_locations: newArr})
    });
} 

/**
* Event handler used to delete all locations except ones designated as center from the database when the 
* user clicks on the delete all button.
* @param {Object} locs the array of locations to be deleted.
*/
handleAllLocationsDelete(locs) {
    let notCenterLocs = locs.filter(loc => loc.is_center == false)
    for (var i = 0; i < notCenterLocs.length; i++) {
        this.handleLocationDelete(notCenterLocs[i]);
    }
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
        filtered_recipients: newList
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
        if (phone.length > 0) {
            phone = phone.trim();
            phone = phone.replaceAll(/['\D']/g, '');
            if (phone.length === 10) {
                phone = phone.slice(0, 3) + '-' + phone.slice(3, 6) + '-' + phone.slice(6);
            } else {
                phone = '';
            }
        }
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
                let keys = Object.keys(recipient_data)
                for (var index in keys) {
                    let key = keys[index];
                    let value = recipient_data[key];
                    delete recipient_data[key];
                    recipient_data[key.toLowerCase()] = value;
                }
                keys = Object.keys(recipient_data);
                if (keys.includes('firstname')) {
                    recipient_template.first_name = recipient_data.firstname.trim();
                } else {
                    recipient_template.first_name = " ";
                }
                
                if (keys.includes('lastname')) {
                    recipient_template.last_name = recipient_data.lastname.trim();
                } else {
                    recipient_template.last_name = " ";
                }

                recipient_template.languages = this.get_languages(recipient_data.language.split(','));
                recipient_template.phone = this.get_phone(recipient_data.phone);
                recipient_template.location.address = recipient_data.address.trim();
                if (keys.includes('room_number')) {
                    recipient_template.location.room_number = recipient_data.room_number;
                }
                recipient_template.location.city = this.capitalize(recipient_data.city.trim());
                recipient_template.location.state = recipient_data.state.trim().toUpperCase();
                recipient_template.location.zipcode = this.capitalize(recipient_data.zipcode);
                recipient_template.quantity = String(recipient_data.quantity);
                if (recipient_data.center === 1) {
                    recipient_template.location.is_center = true;
                }
                recipients.push(recipient_template);
            }
            this.setState({
                new_recipients: JSON.stringify(recipients)
            });
        });
    }
    
    // Handles upload Recipients button when clicked
    handleUploadSubmit = (event) => {
        if (this.fileInput.current.value) {
            this.setState({
                loading: true
            });
            recipientService.uploadRecipients(this.state.new_recipients);
            this.fileInput.current.value = '';
            this.refreshRecipients();
            this.setState({
                new_recipients: [],
            });
        }
    }

/**
 * Method which returns a String of a recipients's languages
 * @param {Object} recipient The driver whose known languages are to be returned.
 */
 getRecipientLanguages(recipient) {
    let languages = "";
    for (let i = 0; i < recipient.languages.length; i++) {
        languages = languages.concat(" ", recipient.languages[i].name);
    }

    languages = languages.trim();
    languages = languages.split(" ").join(", ");
    return languages;
}

/**
 * Method which returns an array of recipient data to be used in exporting CSV file
 */
 getCSVData() {
    let data = [];
    let recipients = this.state.recipients;
    for (let i = 0; i < recipients.length; i++) {
        let row = [];
        row.push(recipients[i].phone);
        row.push(recipients[i].first_name);
        row.push(recipients[i].last_name);
        row.push(recipients[i].location.address);
        row.push(recipients[i].location.city);
        row.push(recipients[i].location.state);
        row.push(recipients[i].location.zipcode);
        if (recipients[i].location.is_center == false) {
            row.push(0);
        } else
            row.push(1);     
        row.push(recipients[i].location.room_number);
        row.push(this.getRecipientLanguages(recipients[i]));
        row.push(recipients[i].quantity);

        data.push(row);
    }
    return data;
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
                        <Row className="d-flex flex-row">
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
                            <Col sm={2} className="justify-content-around d-flex flex-row">
                                <Button href="/addRecipient" style={{ marginRight: 2.5 }}>Add New</Button>
                                <Button onClick={(e) => this.handleAllShow(e, searchService.findRecipients(e, this.state.recipients))} style={{ marginLeft: 2.5 }}>Delete All</Button>
                                <DialogBox 
                                    show={this.state.allShow} 
                                    modalTitle='Confirm Deletion'
                                    mainMessageText='Are you sure you want to delete all entries?'
                                    handleClose={this.handleClose}
                                    handleSave={this.handleSave}
                                    closeText='Cancel'
                                    saveText='Delete'
                                    buttonType='danger'
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="card-body table-wrapper-scroll-y my-custom-scrollbar">
                    <Table className="striped bordered hover table table-bordered table-striped mb-0">
                        <thead >
                            <tr>
                                <th>
                                    <Stack direction='horizontal' gap={3}>
                                        <div >First Name</div> 
                                        <div className='ms-auto'>
                                            <Button 
                                                variant='outline-secondary' 
                                                size='sm'
                                                onClick={() => this.sortColumn('firstname')}
                                                >&#8693;</Button>
                                        </div>
                                    </Stack>
                                </th>
                                <th>
                                    <Stack direction='horizontal' gap={3}>
                                        <div >Last Name</div> 
                                        <div className='ms-auto'>
                                            <Button 
                                                variant='outline-secondary' 
                                                size='sm'
                                                onClick={() => this.sortColumn('lastname')}
                                                >&#8693;</Button>
                                        </div>
                                    </Stack>
                                </th>
                                <th>
                                    <Stack direction='horizontal' gap={3}>
                                        <div >Quantity</div> 
                                        <div className='ms-auto'>
                                            <Button 
                                                variant='outline-secondary' 
                                                size='sm'
                                                onClick={() => this.sortColumn('quantity')}
                                                >&#8693;</Button>
                                        </div>
                                    </Stack>
                                </th>
                                <th>
                                    <Stack direction='horizontal' gap={3}>
                                        <div >Address</div> 
                                        <div className='ms-auto'>
                                            <Button 
                                                variant='outline-secondary' 
                                                size='sm'
                                                onClick={() => this.sortColumn('address')}
                                                >&#8693;</Button>
                                        </div>
                                    </Stack>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.filtered_recipients.map( r  =>
                                <tr  key={r.id}>
                                <td>{r.first_name}</td>
                                <td>{r.last_name}</td>
                                <td>{r.quantity}</td>
                                <td>{r.location.address}</td>
                                <td>
                                    <Button className="mr-2" href={"/recipientDetail/" + r.id}>View</Button>
                                    <Button className="mr-2" href={"/updateRecipient/" + r.id}>Edit</Button>
                                    <Button  onClick={(e) => this.handleShow(e, r)}> Delete</Button>
                                    <DialogBox 
                                        show={this.state.show} 
                                        modalTitle='Confirm Deletion'
                                        mainMessageText='Are you sure you want to delete this entry?'
                                        handleClose={this.handleClose}
                                        handleSave={this.handleSave}
                                        closeText='Cancel'
                                        saveText='Delete'
                                        buttonType='danger'
                                    />
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
                                <Button className="mx-1" onClick={this.handleUploadSubmit}>
                                    {this.state.loading ?
                                        <Spinner
                                            animation="border" role="status" style={{ height: 25, width: 25 }}>
                                        </Spinner> : "Add Recipients"}
                                </Button>
                            </Col>
                            <Col>
                                <CSVLink style={{ margin: 20}}
                                    data={this.getCSVData()}
                                    headers={headers}
                                    filename='recipients.csv'
                                >Download Recipients</CSVLink>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export  default  Recipient;
