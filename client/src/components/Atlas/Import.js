import React, { Component } from "react";
import {Button, Modal, ModalBody, ModalHeader, ModalFooter, Input, FormGroup, Label, FormText, Col} from 'reactstrap';

export default class Import extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal 
        isOpen={this.props.importModalOpen}
        toggle={() => this.props.toggle()}
        scrollable={true}
      >
        <ModalHeader toggle={() => this.props.toggle()}>Import</ModalHeader>
          {this.renderImportBody()}
          {this.renderImportFooter()}
      </Modal>
    );
  }

  renderImportFooter() {
    return (
      <ModalFooter>
        <Button color="primary" onClick={() => this.props.toggle()}>Cancel</Button>
      </ModalFooter>
    );
  }

  renderImportBody() {
    return (
      <ModalBody>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>File</Label>
          <Col sm={10}>
            <Input type="file" name="file" id="exampleFile" />
            <FormText color="muted">
              Import a trip json file.
            </FormText>
          </Col>
        </FormGroup>
      </ModalBody>
    )
  }
}