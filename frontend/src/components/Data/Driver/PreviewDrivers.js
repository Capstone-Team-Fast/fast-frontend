import { Component } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import FileService from "../../../services/FileService";

const fileService = new FileService();

export default class PreviewDrivers extends Component {
    constructor(props) {
        super(props);
        const template = [
            { ID: '', Firstname: 'First1', Lastname: 'Last1', Role: 'Role1' },
            { Firstname: 'First2', Lastname: 'Last2', Role: 'Role2' },
            { Firstname: 'First3', Lastname: 'Last3', Role: 'Role2' },
            { Firstname: 'First4', Lastname: 'Last4', Role: 'Role1' },
            { Firstname: 'First1', Lastname: 'Last1', Role: 'Role1' },
            { Firstname: 'First2', Lastname: 'Last2', Role: 'Role2' },
            { Firstname: 'First3', Lastname: 'Last3', Role: 'Role2' },
            { Firstname: 'First4', Lastname: 'Last4', Role: 'Role1' }
        ];

        this.state = this.props.location.state || { data: template };
    }

    render() {
        console.log(this.props.location);
        return (
            <Container className="card">

                <Row className="d-flex flex-row card-header">
                    <Col sm={8} className="table-title title">
                        Preview
                    </Col>
                    <Col sm={4} className="justify-content-end d-flex flex-row" >
                        <Button className="mx-1 " variant="outline-primary" onClick={
                            () => fileService.saveFile(this.state.data)
                        }>Save</Button>
                        <Button className="mx-1 " href={"/data"} variant="outline-secondary">Cancel</Button>
                    </Col>
                </Row>
                <Row className="card-body table-wrapper-scroll-y"> {/*my-custom-scrollbar*/}
                    <Table className="striped bordered hover table table-bordered table-striped mb-0">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.data.map(d =>
                                    <tr key={d.ID}>
                                        <td>{d.Firstname}</td>
                                        <td>{d.Lastname}</td>
                                        <td>{d.Role}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Row>
            </Container>
        );
    }
}