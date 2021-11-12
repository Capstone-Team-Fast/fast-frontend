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
        pageTitle: props.pageTitle,
        column3: props.column3,
        columns: props.columns

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
    driverService.deleteDriver(d).then(()=>{
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
                        <Col sm={2} className="table-title title">{this.state.pageTitle}</Col>
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
                                        //ref="title"
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
                            {for int i: columns
                            
                            }
                            <th>{this.state.column3}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.drivers.map( d  =>
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