import  React, { Component } from  'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import DriverService from '../../../services/DriverService';


//import Search from 'react-bootstrap-icons/Search';


//import Search from 'react-bootstrap-icons';

const  driverService  =  new  DriverService();

class  Driver  extends  Component {

constructor(props) {
    super(props);
    this.state  = {
        drivers: [],
    };

    this.handleDriverDelete  =  this.handleDriverDelete.bind(this);
    this.dummy = { pk: 5, nothing: 6};  // Dummy value to get updateDriver route working
}

componentDidMount() {
    var  self  =  this;
    driverService.getDrivers().then(function (result) {
        console.log(result.data);
        self.setState({ drivers:  result});
    });

}
handleDriverDelete(e,pk){
    var  self  =  this;
    driverService.deleteDriver({pk :  pk}).then(()=>{
        var  newArr  =  self.state.drivers.filter(function(obj) {
            return  obj.pk  !==  pk;
        });

        self.setState({drivers:  newArr})
    });
}


render() {

    return (
        <Container>
            <Row>
                <Col sm={9} className="table-title">Drivers</Col>
                <Col sm={3}> 
                    <Button href="/addDriver">Add New</Button>
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
                            <th>Phone Number</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.drivers.map( d  =>
                            <tr  key={d.id}>
                            <td>{d.first_name}</td>
                            <td>{d.last_name}</td>
                            <td>{d.phone}</td>
                            <td>
                                <Button>EDIT</Button>
                                <Button  onClick={(e)=>  this.handleDriverDelete(e,d.pk) }> Delete</Button>
                            </td>
                        </tr>)}
                        <tr>
                            <td>Hardcoded First Name</td>
                            <td>Hardcoded Last Name</td>
                            <td>Hardcoded Phone Number</td>
                            <td >
                                <Button href={"/updateDriver/" + this.dummy.pk}>
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
export  default  Driver;