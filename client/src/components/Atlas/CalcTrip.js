import React, {Component} from 'react';
import { isJsonResponseValid } from "../../utils/restfulAPI";

import { LOG, PROTOCOL_VERSION } from "../../utils/constants";
import * as tripSchema from "../../../schemas/ResponseTrip";


export default class CalcTrip extends Component {
  constructor(props) {
    super(props);
  }

  handleCalculateTrip() {
    if(this.props.placesDistance.length > 0) {
      this.props.sendRequest(this.createTripJson())
        .then(response => this.processTripResponse(response));
    }
  }

  createTripJson(){
    let placesLatLngString = _.cloneDeep(this.props.placesDistance);
    placesLatLngString.map((place) => {
      place.latitude = place.lat.toString();
      delete place.lat;
      place.longitude = place.lng.toString();
      delete place.lng;
      return place;
    });

    return {requestType: "trip", requestVersion: PROTOCOL_VERSION,
      places: placesLatLngString,
      options: {
        title: this.state.tripTitle,
        earthRadius: this.state.earthRadius.toString(),
        response: this.props.optTrip ? "1.0" : "0.0",
        units: this.props.units ? this.props.units.toLowerCase() : "kilometers"
      }
    };
  }

  processTripResponse(tripResponse) {
    if(!isJsonResponseValid(tripResponse, tripSchema)) {
      const message = "Trip Response Not Valid. Check The Server.";
      LOG.error(message);
      this.props.setParentState({tripDistances: []});
      this.props.createSnackBar(message);
    } else {
      this.props.setParentState({tripDistances: tripResponse.distances});
    }
  }
}