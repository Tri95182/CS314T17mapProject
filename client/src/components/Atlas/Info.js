import React, { Component } from "react";
import {Button, Modal, ModalBody, ModalHeader, ModalFooter, Input, Table} from 'reactstrap';
import _ from 'lodash';

export default class Info extends Component {

  constructor(props) {
    super(props);

    this.state = {
      note: ""
    }
  }

  setInitialNote() {
    this.setState({note: this.props.info && this.props.info.notes ? this.props.info.notes : ""});
  }

  render() {
    return (
      <Modal 
        isOpen={this.props.infoModalOpen}
        onOpened={() => this.setInitialNote()}
        toggle={() => this.props.toggle()}
        scrollable={true}
      >
        <ModalHeader toggle={() => this.props.toggle()}>Info</ModalHeader>
        <ModalBody>
          {this.renderInfoBody()}
        </ModalBody>
        {this.renderInfoFooter()}
      </Modal>
    );
  }

  renderInfoFooter() {
    return (
      <ModalFooter>
        <Button color="primary" onClick={() => this.props.toggle()}>Cancel</Button>
        <Button color="primary" 
          onClick={() => {
            this.handleInfoSave();
            this.props.toggle();
          }}
          disabled={
            this.props.info && ((this.props.info.notes == this.state.note) || 
            (this.props.info.notes && this.props.info.notes.length == 0 && this.state.note.length == 0) ||
            (!this.props.info.notes && this.state.note.length == 0))
          }
        >Save</Button>
      </ModalFooter>
    );
  }

  renderInfoBody() {
    return (
      <Table borderless>
        <tbody>
          {this.props.info ? Object.keys(this.props.info).map((key) =>
            key != "notes" ?
              <tr key={key}>
                <td>{key.charAt(0).toUpperCase()+key.slice(1)}</td>
                <td>{this.props.info[key]}</td>
              </tr>
          : "") : ""}
          {this.renderNotesInput()}
        </tbody>
      </Table>
    );
  }

  renderNotesInput() {
    return (
      <tr>
        <td>Notes</td>
        <td>
          <Input
            type="textarea"
            value={this.state.note}
            onChange={(input) => this.setState({note: input.target.value})}
          />
        </td>
      </tr>
    );
  }

  handleInfoSave() {
    const index = this.props.placesDistance.findIndex((place) => _.isEqual(place, this.props.info));
    if(index != -1) {
      let temp = this.props.placesDistance;
      temp[index].notes = this.state.note;
      this.props.setParentState({placesDistance: temp});
    }
  }
}