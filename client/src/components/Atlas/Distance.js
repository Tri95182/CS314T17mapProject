import React, {Component} from 'react';
import {ListGroupItem} from 'reactstrap';
import { isJsonResponseValid, sendServerRequest } from "../../utils/restfulAPI";

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

      let distanceRequest = {requestType: "distance", requestVersion: 2,
        place1: {latitude: this.props.placesDistance[0].lat, longitude: this.props.placesDistance[0].lng},
        place2: {latitude: this.props.placesDistance[1].lat, longitude: this.props.placesDistance[1].lng},
        earthRadius: 6371.0}

      sendServerRequest(distanceRequest)
      .then(distance => {
        if (distance) { this.processDistanceResponse(distance.data); }
        else { this.props.createSnackBar("The Request To The Server Failed. Please Try Again Later."); }
      });
    }
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