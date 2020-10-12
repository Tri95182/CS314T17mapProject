import React, {Component} from 'react';
import {Row, Col, Button, ButtonGroup, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';

import Distance from "./Distance";

import LocationIcon from '@material-ui/icons/GpsFixed';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

export default class LocationsList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      return (
        <div>
            {this.renderLocationsList()}
        </div>
      );
  }

  renderLocationsList() {
    return (
      <ListGroup key={"loclist"}>
        <ListGroupItem active>Select Locations </ListGroupItem>
        <Distance 
          placesDistance={this.props.placesDistance}
          distanceBetween={this.props.distanceBetween}
          setParentState={this.props.setParentState}
          createSnackBar={this.props.createSnackBar}
        />
        {this.props.userPosition != null ?
          this.renderLocationItem("Current Location", this.props.userPosition.lat, this.props.userPosition.lng) : ""
        }
        {this.props.markerPosition != null ?
          this.renderLocationItem("Marker Location", this.props.markerPosition.lat, this.props.markerPosition.lng) : ""
        }
        {this.props.placesSelected.map((place) =>
          this.renderLocationItem(place.name, Number(place.latitude), Number(place.longitude))
        )}
      </ListGroup>
    );
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
        <Button onClick={() => this.props.flyToLocation({lat, lng})}>
          <LocationIcon fontSize="small"/>
        </Button>
        <Button onClick={() => this.handleLocationRemove(name)} disabled={name=="Current Location"}>
          <DeleteIcon fontSize="small"/>
        </Button>
      </ButtonGroup>
    );
  }

  handleLocationRemove(name) {
    if(name == 'Marker Location') {
      this.props.setParentState({markerPosition: null});
    } else {
      let index = this.props.placesSelected.findIndex(place => place.name == name);
      if(index != -1) {
        let temp = this.props.placesSelected;
        temp.splice(index, 1);
        this.props.setParentState({placesSelected: temp});
      }
    }

    let distanceIndex = this.props.placesDistance.findIndex(place => place.name == name);
    if(distanceIndex != -1) {
      let temp = this.props.placesDistance;
      temp.splice(distanceIndex, 1);
      this.props.setParentState({placesDistance: temp});
    }
  }

  handleLocationSelect(name, lat, lng) {
    let newSelect = {name, lat, lng};
    if(this.props.placesDistance.filter(val => val.name == name).length == 0) {
      
      if(this.props.placesDistance.length >= 2) {
        let temp = this.props.placesDistance.splice(0,1);
        this.props.setParentState({placesDistance: temp});
      }

      this.props.setParentState({placesDistance: [...this.props.placesDistance, newSelect]});
    } else {
      let temp = this.props.placesDistance.filter(val => val.name != name);
      this.props.setParentState({placesDistance: temp});
    }
  }

}