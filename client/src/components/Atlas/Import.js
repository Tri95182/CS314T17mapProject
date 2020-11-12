import React, { Component } from "react";
import {Button, Modal, ModalBody, ModalHeader, ModalFooter, Input, FormGroup, Label, FormText, Col} from 'reactstrap';
import _ from 'lodash';

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
          <Button color="primary" onClick={() => {
            this.props.toggle();
            this.setState({fileContents: null});
          }}>Cancel</Button>
          <Button color="primary"
            onClick={() => {
              this.handleLoadFile();
              this.props.toggle();
            }}
            disabled={this.state.fileContents == null}
          >Load</Button>
        </ModalFooter>
    );
  }

  handleLoadFile() {
    let reader = new FileReader();
    let ths = this;
    reader.onloadend = function () {
      const result = JSON.parse(reader.result);
      let placesLatLng = _.cloneDeep(result.places);
      placesLatLng.map((place) => {
        place.lat = parseFloat(place.latitude);
        delete place.latitude;
        place.lng = parseFloat(place.longitude);
        delete place.longitude;
  
        return place;
      })
      ths.props.setParentState({tripTitle: result.options.title, earthRadius: result.options.earthRadius});
      ths.props.setGrandparentState({placesDistance: placesLatLng, placesSelected: result.places});
      ths.setState({fileContents: null});
    }
    reader.readAsText(this.state.fileContents);
  }

  handleFileContent(input){
    this.setState({fileContents: input.target.files[0]});
  }
}