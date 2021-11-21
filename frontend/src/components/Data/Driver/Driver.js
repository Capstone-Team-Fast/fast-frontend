import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DriverService from '../../../services/DriverService';
import SearchService from '../../../services/SearchService';
import FileService from '../../../services/FileService';


//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';

const  driverService  =  new  DriverService();
const  searchService = new SearchService();
const  fileService = new FileService();

class  Driver  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        drivers: [],
        filtered: [],
        fileText: ""
    };

    this.handleDriverDelete  =  this.handleDriverDelete.bind(this);
    this.handleSearch  =  this.handleSearch.bind(this);
    this.readFile = this.readFile.bind(this)
    this.handleBulkUpload = this.handleBulkUpload.bind(this)
}

componentDidMount() {
    var  self  =  this;
    driverService.getDrivers().then(function (result) {
        self.setState({ drivers:  result, filtered: result});
    });
}

handleDriverDelete(e, d){
    var  self  =  this;
    console.log(d);

    driverService.deleteDriver(d).then(()=>{
        var  newArr  =  self.state.drivers.filter(function(obj) {
            return  obj.id  !==  d.id;
        });

        self.setState({drivers:  newArr, filtered: newArr})
    });
}

handleSearch(e) {
    let newList = searchService.findDrivers(e, this.state.drivers);
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
    let drivers = fileService.convertFileFromExcel(this.state.fileText)
    driverService.createDrivers()
    this.setState({
        fileText: ""
    });
    window.location.reload()
    */
}

render() {

    return (
        <Container className="card">
            <Row className="card-header">
                <Col>
                    <Row >
                        <Col sm={2} className="table-title title">Drivers</Col>
                        <Col sm={8} class="mt-3">
                            <InputGroup class="mb-2">
                                <InputGroup.Text>
                                {// <Search icon="search"></Search>
                                }
                                </InputGroup.Text>
                                <FormControl
                                        type="text"
                                        placeholder="Search Drivers"
                                        id="search"
                                        v-model="search"
                                        name="search"
                                        aria-label="Search"
                                        onChange={this.handleSearch}
                                ></FormControl>
                            </InputGroup>
                        </Col>
                        <Col sm={2}> 
                            <Button href="/addDriver">Add New</Button>
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
                            <th>Phone Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.filtered.map( d  =>
                            <tr  key={d.id}>
                            <td>{d.first_name}</td>
                            <td>{d.last_name}</td>
                            <td>{d.phone}</td>
                            <td >
                                <Button className="mr-2" href={"/driverDetail/" + d.id}>View</Button>
                                <Button className="mr-2" href={"/updateDriver/" + d.id}>Edit</Button>
                                <Button  onClick={(e)=>  this.handleDriverDelete(e, d) }> Delete</Button>
                            </td>
                        </tr>)}
                    </tbody>
                </Table>
            </Row>
            <Row className="justify-content-md-left mt-2 pt-2 mb-2 title border-top">
                <Col xs md="auto" className="h4">File Upload</Col>
            </Row>
            <Row>
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
                                onClick={this.handleBulkUpload}>Add Drivers</Button>
                        </Col>   
                    </Row>
                </Col>
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
export  default  Driver;