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
    reader.onload = () => {
      const result = JSON.parse(reader.result);
      let alreadySeen = []
      const placesFiltered = result.places.filter((place) => {
        if(place.name && !alreadySeen.includes(place.name)) {
          alreadySeen.push(place.name)
          return place
        }
      })
      let placesLatLng = _.cloneDeep(placesFiltered);
      placesLatLng.map((place) => {
        place.lat = parseFloat(place.latitude);
        delete place.latitude;
        place.lng = parseFloat(place.longitude);
        delete place.longitude;
  
        return place;
      })
      let newSettings = {...this.props.settings};
      if(result.options.earthRadius) newSettings.earthRadius = parseFloat(result.options.earthRadius);
      this.props.setParentState({tripTitle: result.options.title});
      this.props.setGrandparentState({placesDistance: placesLatLng, placesSelected: placesFiltered, settings:newSettings});
      this.setState({fileContents: null});
    }
    reader.readAsText(this.state.fileContents);
  }

  handleFileContent(input){
    this.setState({fileContents: input.target.files[0]});
  }
}