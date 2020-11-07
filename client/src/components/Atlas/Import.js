import React, { Component } from "react";
import {Button, Modal, ModalBody, ModalHeader, ModalFooter, Input, FormGroup, Label, FormText, Col} from 'reactstrap';

export default class Import extends Component {

  constructor(props) {
    super(props);

    this.handleFileContent = this.handleFileContent.bind(this)

    this.state = {
        fileContents:null
      }
  }

  render() {
    return (
      <Modal 
        isOpen={this.props.importModalOpen}
        toggle={() => this.props.toggle()}
      >
        <ModalHeader toggle={() => this.props.toggle()}>Import</ModalHeader>
        {this.renderImportBody()}
        {this.renderImportFooter()}
      </Modal>
    );
  }

  renderImportBody() {
    return (
      <ModalBody>
        <FormGroup row>
          <Label for="file" sm={2}>File</Label>
          <Col sm={10}>
            <Input type="file" onChange={this.handleFileContent}/>
            <FormText color="muted">
              Import a trip json file.
            </FormText>
          </Col>
        </FormGroup>
      </ModalBody>
    )
  }

  renderImportFooter() {
    return (
        <ModalFooter>
          <Button color="primary" onClick={() => this.props.toggle()}>Cancel</Button>
          <Button color="primary"
                  onClick={() => {
                    this.handleLoadFile();
                    this.props.toggle();
                  }
                  //disabled?
                  }>Load</Button>
        </ModalFooter>
    );
  }

  handleLoadFile() {
    let reader = new FileReader();
    let ths = this;
    reader.onloadend = function () {
      ths.props.setParentState({itemImport:reader.result});
    }
    reader.readAsText(this.state.fileContents);
  }

  handleFileContent(input){
    this.setState({fileContents: input.target.files[0]});
  }
}