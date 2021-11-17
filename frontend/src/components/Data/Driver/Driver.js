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
        filterWord: ''
    };

    this.handleDriverDelete  =  this.handleDriverDelete.bind(this);
}

componentDidMount() {
    var  self  =  this;
    driverService.getDrivers().then(function (result) {
        console.log(result.data);
        self.setState({ drivers:  result});
    });

}
handleDriverDelete(e, d){
    var  self  =  this;
    console.log(d);

    driverService.deleteDriver(d).then(()=>{
        console.log("43");
        var  newArr  =  self.state.drivers.filter(function(obj) {
            return  obj.id  !==  d.id;
        });

        self.setState({drivers:  newArr})
    });
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
                                        onChange={event => this.setState({filterWord: event.target.value})}
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
                    {this.state.drivers.filter((d) => {
                                if (this.state.filterWord == "")
                                {
                                    return d;
                                }
                                else if(d.first_name.toLowerCase().includes(this.state.filterWord.toLowerCase()))
                                {
                                    return d;
                                }
                                else if(d.last_name.toLowerCase().includes(this.state.filterWord.toLowerCase()))
                                {
                                    return d;
                                }
                        }).map( d  =>
                            <tr  key={d.id}>
                            <td>{d.first_name}</td>
                            <td>{d.last_name}</td>
                            <td>{d.phone}</td>
                            <td >
                                <Button className="mr-2" href={"/updateDriver/" + d.id}>Edit</Button>
                                <Button  onClick={(e)=>  this.handleDriverDelete(e, d) }> Delete</Button>
                            </td>
                        </tr>)}
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