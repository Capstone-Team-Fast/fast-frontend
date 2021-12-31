import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

export class DialogBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {show: false};
    }


    render () {
        return (
            <>
                <Modal 
                    show={this.props.show} 
                    onHide={this.props.handleClose} 
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.modalTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.mainMessageText}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}> {this.props.closeText} </Button>
                        <Button variant={this.props.buttonType} onClick={this.props.handleSave}> {this.props.saveText} </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

DialogBox.propTypes = {
    modalTitle: PropTypes.string.isRequired,
    mainMessageText: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    closeText: PropTypes.string.isRequired,
    saveText: PropTypes.string.isRequired,
    buttonType: PropTypes.string.isRequired
}