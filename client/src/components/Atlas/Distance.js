import React, {Component} from 'react';
import {ListGroupItem} from 'reactstrap';
import { isJsonResponseValid } from "../../utils/restfulAPI";

import { LOG } from "../../utils/constants";
import * as distanceSchema from "../../../schemas/ResponseDistance";

export default class Distance extends Component {

  constructor(props) {
    super(props);
    this.handleDistance = this.handleDistance.bind(this);
  }

  render() {
    return (
      <ListGroupItem 
        tag="button" 
        onClick={this.handleDistance}
      >
        Distance: {this.props.distanceBetween} KM
      </ListGroupItem>
    );
  }

  handleDistance(){
    if(this.props.placesDistance.length == 2){

      let distanceRequest = {requestType: "distance", requestVersion: 3,
        place1: this.getRequestPlace(this.props.placesDistance[0]),
        place2: this.getRequestPlace(this.props.placesDistance[1]),
        earthRadius: 6371.0}

      this.props.sendRequest(distanceRequest)
      .then(response => this.processDistanceResponse(response));
    }
  }

  getRequestPlace(place) {
    return {latitude: place.lat.toString(), longitude: place.lng.toString()};
  }

  processDistanceResponse(distanceResponse) {
    if(!isJsonResponseValid(distanceResponse, distanceSchema)) {
      let message = "Distance Response Not Valid. Check The Server.";
      LOG.error(message);
      this.props.setParentState({distanceBetween: 0});
      this.props.createSnackBar(message);
    } else {
      this.props.setParentState({distanceBetween: distanceResponse.distance});
    }
  }

}