import React, {Component} from 'react';
import {Row, Col, Button, ButtonGroup, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, ModalHeader, ModalFooter, ModalBody, Collapse} from 'reactstrap';
import _ from 'lodash';
import getUnicodeFlagIcon from 'country-flag-icons/unicode'

import CalcTrip from "./CalcTrip";

import LocationIcon from '@material-ui/icons/GpsFixed';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

export default class LocationsList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      optionsOpen: false
    }
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
          <Button color="primary" onClick={() => {
            this.props.setParentState({listModalOpen: false, searchModalOpen: true});
          }}>Open Search</Button>
          <Button color="primary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderListHeader() {
    return (
      <ListGroupItem active>
        <Row>
          <Col>
            <ListGroupItemText>Select Locations</ListGroupItemText>
          </Col>
          <Col xs="auto">
            <Button size="sm" onClick={() => {
              const temp = !this.state.optionsOpen; 
              this.setState({optionsOpen: temp});
            }}>{this.state.optionsOpen ? <MenuOpenIcon fontSize="small"/> : <MenuIcon fontSize="small"/>}</Button>
          </Col>
        </Row>
      </ListGroupItem>
    );
  }

  renderListOptions() {
    return (
      <Collapse isOpen={this.state.optionsOpen}>
        <ListGroupItem className="loclist-button-center" active>
          {this.renderOptionButton(AddIcon, "Select all", () => this.handleSelectAll())}
          {this.renderOptionButton(RemoveIcon, "Unselect all", () => this.handleUnselectAll())}
          {this.renderOptionButton(DeleteIcon, "Remove all", () => this.handleRemoveAll())}
        </ListGroupItem>
      </Collapse>
    );
  }

  renderOptionButton(Icon, text, onClick) {
    return (
      <Button
        className="search-item-button"
        onClick={onClick}
      >
        <Icon fontSize="small"/> {text}
      </Button>
    );
  }

  renderLocationsList() {
    return (
      <ListGroup key={"loclist"}>
        {this.renderListHeader()}
        {this.renderListOptions()}
        {this.renderIfPropExists(this.props.userPosition)}
        {this.renderIfPropExists(this.props.markerPosition)}
        {this.props.placesSelected.map((place) => {
          let tempPlace = _.cloneDeep(place);
          tempPlace.lat = parseFloat(place.latitude);
          tempPlace.lng = parseFloat(place.longitude);
          delete tempPlace.latitude;
          delete tempPlace.longitude;
          return this.renderLocationItem(tempPlace)
        })}
      </ListGroup>
    );
  }

  renderIfPropExists(prop) {
    if(prop != null) {
      return this.renderLocationItem(prop);
    }
  }

  renderLocationItem(place) {
    return (
      <ListGroupItem 
        key={place.name}
        color={this.props.placesDistance.filter(val => val.name == place.name).length != 0 ? "primary":"white"}
      >
        <Row>
          <Col>
            <ListGroupItemHeading>{place.name}</ListGroupItemHeading>
            <ListGroupItemText>
              {place.country_code ? getUnicodeFlagIcon(place.country_code)+" " : ""}
              {place.municipality ? place.municipality+", " : place.town ? place.town+", " : ""}
              {place.region ? place.region+", " : place.state ? place.state+", " : ""}
              {place.country ? place.country : ""}<br/>
              Lat: {place.lat.toFixed(2)} Lng: {place.lng.toFixed(2)}
            </ListGroupItemText>
          </Col>
          <Col xs="auto">
            {this.renderLocationItemBtns(place.name, place.lat, place.lng)}
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

  handleSelectAll() {
    let newSelected = [];
    this.props.placesSelected.forEach((place) => {
      if(this.props.placesDistance.filter(val => val.name == place.name).length == 0) {
        let tempPlace = _.cloneDeep(place);
        tempPlace.lat = parseFloat(place.latitude); delete tempPlace.latitude;
        tempPlace.lng = parseFloat(place.longitude); delete tempPlace.longitude;
        newSelected.push(tempPlace);
      }
    })
    if(this.props.markerPosition && this.props.placesDistance.filter(val => val.name == this.props.markerPosition.name).length == 0) newSelected.push(this.props.markerPosition);
    if(this.props.userPosition && this.props.placesDistance.filter(val => val.name == this.props.userPosition.name).length == 0) newSelected.push(this.props.userPosition)
    this.props.setParentState({placesDistance: [...this.props.placesDistance, ...newSelected]});
  }

  handleUnselectAll() {
    this.props.setParentState({placesDistance: []});
  }

  handleRemoveAll() {
    this.props.setParentState({placesDistance: [], placesSelected: []});
    if(this.props.markerPosition) this.props.setParentState({markerPosition: null});
  }
}