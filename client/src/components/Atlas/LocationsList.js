import React, {Component} from 'react';
import {Row, Col, Button, ButtonGroup, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, ModalHeader, ModalFooter, ModalBody} from 'reactstrap';

import CalcTrip from "./CalcTrip";

import LocationIcon from '@material-ui/icons/GpsFixed';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default class LocationsList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const toggle = () => {
      let isOpen = !this.props.listModalOpen;
      this.props.setParentState({listModalOpen: isOpen});
    };
    return (
      <Modal isOpen={this.props.listModalOpen} toggle={toggle} scrollable={true}>
        <ModalHeader toggle={toggle}>Locations</ModalHeader>
        <ModalBody>{this.renderLocationsList()}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderLocationsList() {
    return (
      <ListGroup key={"loclist"}>
        <ListGroupItem active>Select Locations </ListGroupItem>
        {this.renderIfPropExists("Current Location", this.props.userPosition)}
        {this.renderIfPropExists(this.props.markerPosition ? this.props.markerPosition.name : "Marker Location", this.props.markerPosition)}
        {this.props.placesSelected.map((place) =>
          this.renderLocationItem(place.name, Number(place.latitude), Number(place.longitude))
        )}
      </ListGroup>
    );
  }

  renderIfPropExists(name, prop) {
    if(prop != null) {
      return this.renderLocationItem(name, prop.lat, prop.lng);
    }
  }

  renderLocationItem(name, lat, lng) {
    return (
      <ListGroupItem 
        key={name}
        color={this.props.placesDistance.filter(val => val.name == name).length != 0 ? "primary":"white"}
      >
        <Row>
          <Col>
            <ListGroupItemHeading>{name}</ListGroupItemHeading>
            <ListGroupItemText>Lat: {lat.toFixed(2)} Lng: {lng.toFixed(2)}</ListGroupItemText>
          </Col>
          <Col xs="auto">
            {this.renderLocationItemBtns(name, lat, lng)}
          </Col>
        </Row>
      </ListGroupItem>
    );
  }

  renderLocationItemBtns(name, lat, lng) {
    return (
      <ButtonGroup vertical size="sm">
        <Button onClick={() => this.handleLocationSelect(name, lat, lng)}>
          {this.props.placesDistance.filter(val => val.name == name).length != 0 ? 
            <RemoveIcon fontSize="small"/> :
            <AddIcon fontSize="small"/>
          } 
        </Button>
        <Button onClick={async () => {
          await this.props.setParentState({listModalOpen:false})
          await this.props.flyToLocation({lat, lng})
        }}>
          <LocationIcon fontSize="small"/>
        </Button>
        <Button onClick={() => this.handleLocationRemove(name)} disabled={name=="Current Location"}>
          <DeleteIcon fontSize="small"/>
        </Button>
      </ButtonGroup>
    );
  }

  handleLocationRemove(name) {
    if(name == (this.props.markerPosition ? this.props.markerPosition.name : 'Marker Location')) {
      this.props.setParentState({markerPosition: null});
    } else {
      this.removeItem(name, this.props.placesSelected, 'placesSelected');
    }

    //this.removeItem(this.props.tripDistance[this.props.placesDistance.index(name)]);
    this.removeItem(name, this.props.placesDistance, 'placesDistance');
  }

  removeItem(name, places, propName) {
    let index = places.findIndex(place => place.name == name);
    if(index != -1) {
      let temp = places;
      temp.splice(index, 1);
      this.props.setParentState({[propName]: temp});
    }
  }

  handleLocationSelect(name, lat, lng) {
    let newSelect = {name, lat, lng};

    const placeSelected = this.props.placesSelected.filter(place =>
      place.name == name && place.latitude == lat && place.longitude == lng
    );
    if(placeSelected.length != 0) {
      const placeKeys = Object.keys(placeSelected[0]);
      placeKeys.map((key) => {
        if(key != "name" && key != "latitude" && key != "longitude") {
          newSelect[key] = placeSelected[0][key];
        }
        return key;
      });
    }

    if(this.props.placesDistance.filter(val => val.name == name).length == 0) {
      this.props.setParentState({placesDistance: [...this.props.placesDistance, newSelect]});
    } else {
      let temp = this.props.placesDistance.filter(val => val.name != name);
      this.props.setParentState({placesDistance: temp});
    }

    //new CalcTrip(this.props).handleCalculateTrip();
  }
}